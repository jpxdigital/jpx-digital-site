import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import { createRateLimiter, getClientIp } from '@/lib/rateLimit'

// Mesma política do /api/leads — sem isso, o x-admin-secret podia ser
// forçado por tentativa e erro sem nenhum limite (achado da revisão de
// segurança de 2026-09-13).
const checkRateLimit = createRateLimiter({ limit: 5, windowMs: 60_000 })

function isAuthorized(req: NextRequest): boolean {
  const secret = req.headers.get('x-admin-secret')
  const expected = process.env.ADMIN_SECRET
  if (!secret || !expected) return false

  const a = Buffer.from(secret)
  const b = Buffer.from(expected)
  // Comparação em tempo constante — timingSafeEqual exige buffers do mesmo
  // tamanho, então o early-return por length continua sendo o único desvio.
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function GET(req: NextRequest) {
  if (!checkRateLimit(getClientIp(req))) {
    return json({ error: 'Muitas tentativas. Tente novamente em 1 minuto.' }, 429)
  }
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
