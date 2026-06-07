export async function onRequestGet(context) {
  if (!auth(context)) return respond({ error: 'Não autorizado' }, 401)

  const { CF_ACCOUNT_ID, CF_API_TOKEN, CF_PROJECT_NAME } = context.env

  if (!CF_ACCOUNT_ID || !CF_API_TOKEN || !CF_PROJECT_NAME) {
    return respond({ error: 'Variáveis CF_ não configuradas no ambiente' }, 500)
  }

  const end   = new Date()
  const start = new Date(Date.now() - 29 * 24 * 60 * 60 * 1000)
  const fmt   = (d) => d.toISOString().split('T')[0]

  const query = `{
    viewer {
      accounts(filter: { accountTag: "${CF_ACCOUNT_ID}" }) {
        pagesProjectsAdaptiveGroups(
          filter: {
            projectName: "${CF_PROJECT_NAME}"
            date_geq: "${fmt(start)}"
            date_leq: "${fmt(end)}"
          }
          limit: 30
          orderBy: [date_ASC]
        ) {
          sum { requests pageViews }
          dimensions { date }
        }
      }
    }
  }`

  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CF_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  const json = await res.json()

  if (json.errors?.length) {
    return respond({ error: 'Erro GraphQL', detail: json.errors }, 502)
  }

  const groups = json?.data?.viewer?.accounts?.[0]?.pagesProjectsAdaptiveGroups ?? []

  const totals = groups.reduce(
    (acc, g) => ({
      requests:  acc.requests  + (g.sum.requests  ?? 0),
      pageViews: acc.pageViews + (g.sum.pageViews ?? 0),
    }),
    { requests: 0, pageViews: 0 }
  )

  return respond({
    success: true,
    period: { start: fmt(start), end: fmt(end) },
    totals,
    daily: groups.map((g) => ({
      date:      g.dimensions.date,
      requests:  g.sum.requests  ?? 0,
      pageViews: g.sum.pageViews ?? 0,
    })),
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
