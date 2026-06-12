# JPX Digital Site

Site institucional e de captação de leads da JPX Digital.

## Stack

- React SPA (Vite)
- Deploy: Cloudflare Pages via Wrangler (sem conexão Git)
- Domínio: jpxdigital.com.br
- Backend: Cloudflare Functions (`/functions`)

## Fluxo

```
USUÁRIO
  │
  ▼
jpxdigital.com.br (React SPA — Cloudflare Pages)
  │
  ├── Formulário de contato
  │     │
  │     ▼
  │   /api/leads  (Cloudflare Function)
  │     ├──► HubSpot CRM  (cria contato + deal)
  │     └──► n8n Webhook  (dispara email de boas-vindas via Resend)
  │
  └── /admin  (painel interno)
        └──► Cloudflare Analytics + env vars
```

## Deploy

O projeto **não tem conexão Git** com o Cloudflare Pages — deploy sempre via Wrangler:

```bash
cd /home/petruzz/JPX/jpx-digital-site
npm run build
CLOUDFLARE_API_TOKEN=<CF_API_TOKEN> CLOUDFLARE_ACCOUNT_ID=<CF_ACCOUNT_ID> wrangler pages deploy
```

> `wrangler.toml` já define `name` e `pages_build_output_dir` — não precisa passar `--project-name` nem `dist`.

## Variáveis de produção (Cloudflare Pages → Settings → Environment variables)

| Variável | Uso |
|---|---|
| `HUBSPOT_TOKEN` | Integração com HubSpot CRM |
| `N8N_WEBHOOK_URL` | `https://n8n.jpxdigital.com.br/webhook/jpx-lead` |
| `CF_ACCOUNT_ID` | `eff25522365c546986657167afde001a` |
| `CF_API_TOKEN` | Token Cloudflare (Analytics + Pages API) |
| `CF_PROJECT_NAME` | `jpx-digital-site` |
| `ADMIN_SECRET` | Senha do painel `/admin` |

> Variáveis `plain_text` ficam disponíveis imediatamente após salvar. Variáveis `secret_text` também — redeploy só é necessário quando o **código** muda.

## Relação com JPX Suporte

Este projeto é independente do jpx-suporte. O site capta leads (topo de funil);
o suporte é o produto entregue ao cliente após conversão.
