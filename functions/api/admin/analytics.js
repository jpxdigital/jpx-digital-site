export async function onRequestGet(context) {
  if (!auth(context)) return respond({ error: 'Não autorizado' }, 401)

  const { CF_ACCOUNT_ID, CF_API_TOKEN } = context.env

  if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    return respond({ error: 'Variáveis CF_ não configuradas no ambiente' }, 500)
  }

  const end   = new Date()
  const start = new Date(Date.now() - 29 * 24 * 60 * 60 * 1000)
  const fmt   = (d) => d.toISOString().split('T')[0]

  const dateFilter = `date_geq: "${fmt(start)}" date_leq: "${fmt(end)}"`

  const rumQuery = `{
    viewer {
      accounts(filter: { accountTag: "${CF_ACCOUNT_ID}" }) {
        rumPageloadEventsAdaptiveGroups(
          filter: { ${dateFilter} }
          limit: 30
          orderBy: [date_ASC]
        ) {
          sum { visits }
          dimensions { date }
        }
      }
    }
  }`

  const fnQuery = `{
    viewer {
      accounts(filter: { accountTag: "${CF_ACCOUNT_ID}" }) {
        pagesFunctionsInvocationsAdaptiveGroups(
          filter: {
            ${dateFilter}
            scriptName_like: "pages-worker%"
          }
          limit: 30
          orderBy: [date_ASC]
        ) {
          sum { requests errors }
          dimensions { date }
        }
      }
    }
  }`

  const [rumRes, fnRes] = await Promise.all([
    fetch('https://api.cloudflare.com/client/v4/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: rumQuery }),
    }),
    fetch('https://api.cloudflare.com/client/v4/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: fnQuery }),
    }),
  ])

  const [rumJson, fnJson] = await Promise.all([rumRes.json(), fnRes.json()])

  if (rumJson.errors?.length || fnJson.errors?.length) {
    const errs = [...(rumJson.errors ?? []), ...(fnJson.errors ?? [])]
    return respond({ error: 'Erro GraphQL', detail: errs }, 502)
  }

  const rumGroups = rumJson?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? []
  const fnGroups  = fnJson?.data?.viewer?.accounts?.[0]?.pagesFunctionsInvocationsAdaptiveGroups ?? []

  // index by date
  const byDate = {}
  for (const g of rumGroups) {
    const d = g.dimensions.date
    byDate[d] = { date: d, requests: 0, pageViews: g.sum.visits ?? 0 }
  }
  for (const g of fnGroups) {
    const d = g.dimensions.date
    if (!byDate[d]) byDate[d] = { date: d, requests: 0, pageViews: 0 }
    byDate[d].requests += g.sum.requests ?? 0
  }

  const daily = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date))

  const totals = daily.reduce(
    (acc, g) => ({
      requests:  acc.requests  + g.requests,
      pageViews: acc.pageViews + g.pageViews,
    }),
    { requests: 0, pageViews: 0 }
  )

  return respond({
    success: true,
    period: { start: fmt(start), end: fmt(end) },
    totals,
    daily,
  })
}

export const onRequestOptions = () =>
  new Response(null, { status: 204, headers: cors() })

function auth(context) {
  const secret = context.request.headers.get('x-admin-secret')
  return secret && secret === context.env.ADMIN_SECRET
}

function respond(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors() },
  })
}

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-secret',
  }
}
