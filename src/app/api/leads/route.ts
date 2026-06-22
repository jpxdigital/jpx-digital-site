import { NextRequest, NextResponse } from 'next/server'

// In-memory rate limiter — upgrade para Redis na Fase 2
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60_000 // 1 min
  const limit = 5
  const entry = rateLimitMap.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '0.0.0.0'
  )
}

export async function POST(req: NextRequest) {
  const { HUBSPOT_TOKEN, N8N_WEBHOOK_URL, N8N_INTERNAL_SECRET, TURNSTILE_SECRET_KEY } = process.env

  if (!HUBSPOT_TOKEN) {
    return json({ error: 'Server misconfigured' }, 500)
  }

  const ip = getClientIp(req)
  if (!checkRateLimit(ip)) {
    return json({ error: 'Muitas requisições. Tente novamente em 1 minuto.' }, 429)
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'JSON inválido' }, 400)
  }

  const { name, email, phone, company, interest, serviceSlug, message, turnstileToken } = body as {
    name?: string; email?: string; phone?: string
    company?: string; interest?: string; serviceSlug?: string; message?: string
    turnstileToken?: string
  }

  // Validar Turnstile quando a chave secreta estiver configurada
  if (TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return json({ error: 'Verificação de segurança necessária. Recarregue a página.' }, 400)
    }
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: turnstileToken, remoteip: ip }),
    })
    const verifyData = await verifyRes.json() as { success: boolean }
    if (!verifyData.success) {
      return json({ error: 'Verificação de segurança falhou. Recarregue a página e tente novamente.' }, 400)
    }
  }

  if (!name?.trim() || !email?.trim()) {
    return json({ error: 'Nome e e-mail são obrigatórios' }, 400)
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!emailRegex.test(email.trim())) {
    return json({ error: 'Informe um e-mail válido (ex: joao@empresa.com)' }, 400)
  }

  const authHeaders = {
    Authorization: `Bearer ${HUBSPOT_TOKEN}`,
    'Content-Type': 'application/json',
  }

  // 1. Criar contato no HubSpot (409 = já existe)
  const nameParts = name.trim().split(' ')
  const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      properties: {
        firstname: nameParts[0],
        lastname: nameParts.slice(1).join(' '),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() ?? '',
        company: company?.trim() ?? '',
        hs_lead_source: 'WEBSITE',
        message: message?.trim() ?? '',
      },
    }),
  })

  let contactId: string | undefined
  if (contactRes.status === 409) {
    const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        filterGroups: [{
          filters: [{ propertyName: 'email', operator: 'EQ', value: email.trim().toLowerCase() }],
        }],
        properties: ['email'],
      }),
    })
    const searchData = await searchRes.json()
    contactId = searchData.results?.[0]?.id
  } else if (contactRes.ok) {
    const data = await contactRes.json()
    contactId = data.id
  } else {
    const detail = await contactRes.text()
    return json({ error: 'Erro ao criar contato no CRM', detail }, 502)
  }

  // 2. Criar deal
  const closedate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const description = [
    interest ? `Interesse: ${interest}` : '',
    message?.trim() ? `Mensagem: ${message.trim()}` : '',
    company?.trim() ? `Empresa: ${company.trim()}` : '',
    phone?.trim() ? `Telefone: ${phone.trim()}` : '',
  ].filter(Boolean).join('\n')

  const dealRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      properties: {
        dealname: `${name.trim()} — ${interest || 'Site JPX Digital'}`,
        pipeline: 'default',
        dealstage: 'appointmentscheduled',
        closedate,
        description,
        ...(serviceSlug ? { service_slug: serviceSlug } : {}),
      },
    }),
  })

  let dealId: string | undefined
  if (dealRes.ok) {
    const dealData = await dealRes.json()
    dealId = dealData.id
    // 3. Associar contato ao deal
    if (contactId) {
      await fetch(
        `https://api.hubapi.com/crm/v4/objects/contacts/${contactId}/associations/deals/${dealId}`,
        {
          method: 'PUT',
          headers: authHeaders,
          body: JSON.stringify([{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }]),
        }
      )
    }
  }

  // 4. Disparar n8n via webhook interno (fire-and-forget)
  // O n8n nunca é chamado diretamente pelo frontend — passa sempre por aqui
  if (N8N_WEBHOOK_URL) {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (N8N_INTERNAL_SECRET) headers['x-internal-secret'] = N8N_INTERNAL_SECRET
    fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, phone, company, interest, message }),
    }).catch(() => {})
  }

  return json({ success: true, contactId, dealId })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}
