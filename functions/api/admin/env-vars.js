const CF_BASE = 'https://api.cloudflare.com/client/v4'

// GET — lista variáveis de ambiente de produção
export async function onRequestGet(context) {
  if (!auth(context)) return respond({ error: 'Não autorizado' }, 401)

  const { CF_ACCOUNT_ID, CF_API_TOKEN, CF_PROJECT_NAME } = context.env
  const res = await fetch(
    `${CF_BASE}/accounts/${CF_ACCOUNT_ID}/pages/projects/${CF_PROJECT_NAME}`,
    { headers: { 'Authorization': `Bearer ${CF_API_TOKEN}` } }
  )

  const json = await res.json()
  if (!json.success) return respond({ error: 'Erro ao buscar projeto', detail: json.errors }, 502)

  const envVars = json.result?.deployment_configs?.production?.env_vars ?? {}
  const vars = Object.entries(envVars).map(([key, cfg]) => ({
    key,
    type:   cfg.type ?? 'plain_text',
    value:  cfg.type === 'secret_text' ? '••••••••' : (cfg.value ?? ''),
    secret: cfg.type === 'secret_text',
  }))

  return respond({ success: true, vars })
}

// PUT — atualiza uma ou mais variáveis de ambiente de produção
export async function onRequestPut(context) {
  if (!auth(context)) return respond({ error: 'Não autorizado' }, 401)

  let body
  try { body = await context.request.json() } catch {
    return respond({ error: 'JSON inválido' }, 400)
  }

  // body: { vars: { KEY: "valor", KEY2: "valor2" } }
  if (!body.vars || typeof body.vars !== 'object') {
    return respond({ error: 'Campo "vars" obrigatório: { KEY: "valor" }' }, 400)
  }

  const { CF_ACCOUNT_ID, CF_API_TOKEN, CF_PROJECT_NAME } = context.env

  const env_vars = {}
  for (const [key, value] of Object.entries(body.vars)) {
    env_vars[key] = { value: String(value) }
  }

  const res = await fetch(
    `${CF_BASE}/accounts/${CF_ACCOUNT_ID}/pages/projects/${CF_PROJECT_NAME}`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deployment_configs: { production: { env_vars } }
      }),
    }
  )

  const json = await res.json()
  if (!json.success) return respond({ error: 'Erro ao atualizar', detail: json.errors }, 502)

  return respond({ success: true, updated: Object.keys(body.vars) })
}

// DELETE — remove uma variável de ambiente
export async function onRequestDelete(context) {
  if (!auth(context)) return respond({ error: 'Não autorizado' }, 401)

  const url    = new URL(context.request.url)
  const key    = url.searchParams.get('key')
  if (!key) return respond({ error: 'Parâmetro "key" obrigatório' }, 400)

  const { CF_ACCOUNT_ID, CF_API_TOKEN, CF_PROJECT_NAME } = context.env

  const res = await fetch(
    `${CF_BASE}/accounts/${CF_ACCOUNT_ID}/pages/projects/${CF_PROJECT_NAME}`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deployment_configs: { production: { env_vars: { [key]: null } } }
      }),
    }
  )

  const json = await res.json()
  if (!json.success) return respond({ error: 'Erro ao remover', detail: json.errors }, 502)

  return respond({ success: true, deleted: key })
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
    'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-secret',
  }
}
