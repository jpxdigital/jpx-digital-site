import { NextRequest, NextResponse } from 'next/server'

function isAuthorized(req: NextRequest): boolean {
  const secret = req.headers.get('x-admin-secret')
  return Boolean(secret && secret === process.env.ADMIN_SECRET)
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return json({ error: 'Não autorizado' }, 401)

  const { CF_ACCOUNT_ID, CF_API_TOKEN, CF_PROJECT_NAME } = process.env
  if (!CF_ACCOUNT_ID || !CF_API_TOKEN || !CF_PROJECT_NAME) {
    return json({ error: 'Variáveis CF_ não configuradas no ambiente' }, 500)
  }

  const end = new Date()
  const start = new Date(Date.now() - 29 * 24 * 60 * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().split('T')[0]

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
      Authorization: `Bearer ${CF_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  const cfJson = await res.json()
  if (cfJson.errors?.length) {
    return json({ error: 'Erro GraphQL', detail: cfJson.errors }, 502)
  }

  const groups =
    cfJson?.data?.viewer?.accounts?.[0]?.pagesProjectsAdaptiveGroups ?? []

  const totals = groups.reduce(
    (acc: { requests: number; pageViews: number }, g: { sum: { requests: number; pageViews: number } }) => ({
      requests: acc.requests + (g.sum.requests ?? 0),
      pageViews: acc.pageViews + (g.sum.pageViews ?? 0),
    }),
    { requests: 0, pageViews: 0 }
  )

  return json({
    success: true,
    period: { start: fmt(start), end: fmt(end) },
    totals,
    daily: groups.map((g: { dimensions: { date: string }; sum: { requests: number; pageViews: number } }) => ({
      date: g.dimensions.date,
      requests: g.sum.requests ?? 0,
      pageViews: g.sum.pageViews ?? 0,
    })),
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { 'Access-Control-Allow-Headers': 'Content-Type, x-admin-secret' },
  })
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}
