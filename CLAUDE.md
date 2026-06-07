# JPX Digital Site

Site institucional e de captação de leads da JPX Digital.

## Stack

- React SPA (Vite)
- Deploy: Cloudflare Pages (auto-deploy no git push)
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
  │     └──► n8n Webhook  (dispara email de boas-vindas via Zoho SMTP)
  │
  └── /admin  (painel interno)
        └──► Cloudflare Analytics + env vars
```

## Deploy

```bash
git push  # Cloudflare Pages detecta e faz deploy automático
```

## Variáveis de produção (Cloudflare Pages)

| Variável | Uso |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Acesso à API da Cloudflare |
| `HUBSPOT_TOKEN` | Integração com HubSpot CRM |
| `N8N_WEBHOOK_URL` | Webhook do n8n para email de boas-vindas |

## Relação com JPX Suporte

Este projeto é independente do jpx-suporte. O site capta leads (topo de funil);
o suporte é o produto entregue ao cliente após conversão.
