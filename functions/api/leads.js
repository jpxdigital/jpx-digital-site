export async function onRequestPost(context) {
  const { HUBSPOT_TOKEN } = context.env

  if (!HUBSPOT_TOKEN) {
    return respond({ error: 'Server misconfigured' }, 500)
  }

  let body
  try {
    body = await context.request.json()
  } catch {
    return respond({ error: 'JSON inválido' }, 400)
  }

  const { name, email, phone, company, interest, message } = body

  if (!name?.trim() || !email?.trim()) {
    return respond({ error: 'Nome e e-mail são obrigatórios' }, 400)
  }

  const authHeaders = {
    'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
    'Content-Type': 'application/json',
  }

  // 1. Create contact (409 = already exists, fetch by email instead)
  const nameParts = name.trim().split(' ')
  const contactPayload = {
    properties: {
      firstname: nameParts[0],
      lastname: nameParts.slice(1).join(' '),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() ?? '',
      company: company?.trim() ?? '',
      hs_lead_source: 'WEBSITE',
      message: message?.trim() ?? '',
    }
  }

  let contactId
  const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify(contactPayload),
  })

  if (contactRes.status === 409) {
    const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        filterGroups: [{
          filters: [{ propertyName: 'email', operator: 'EQ', value: email.trim().toLowerCase() }]
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
    return respond({ error: 'Erro ao criar contato no CRM', detail }, 502)
  }

  // 2. Create deal in default pipeline (first stage)
  const closedate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

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
      }
    }),
  })

  let dealId
  if (dealRes.ok) {
    const dealData = await dealRes.json()
    dealId = dealData.id

    // 3. Associate contact ↔ deal (typeId 3 = Contact to Deal, HUBSPOT_DEFINED)
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

  return respond({ success: true, contactId, dealId })
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: cors() })
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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
