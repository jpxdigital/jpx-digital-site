# Arquitetura da Plataforma JPX Digital

## Visão geral

```
Internet
  │
  ▼
Cloudflare (DNS + CDN + WAF + DDoS + Bot Management)
  │
  ├──► VM1 — Site (OCI)                VM2 — Automação (OCI)
  │    ├── Nginx (80/443)               ├── n8n (5678, interno)
  │    ├── Next.js 15 (3000)            ├── PostgreSQL (5432, interno)
  │    └── Redis (6379, interno)        ├── Redis (6379, interno)
  │                                     └── Watchtower
  │
  └──► VM3 — Observabilidade (futuro)
       ├── Grafana (3001, SSH tunnel)
       ├── Prometheus (9090, interno)
       ├── Loki (3100, interno)
       ├── Promtail
       ├── Node Exporter (9100, interno)
       ├── cAdvisor (8080, interno)
       └── Nginx Exporter (9113, interno)
```

## Fluxo de um lead

```
Visitante preenche formulário
  │
  ▼
Next.js /api/leads
  ├── Validação (campos obrigatórios, rate limit 5 req/min/IP)
  ├── HubSpot: cria contato + deal (ou atualiza existente)
  └── n8n (fire-and-forget via N8N_INTERNAL_SECRET)
        ├── E-mail de boas-vindas (Zoho SMTP)
        ├── Notificação interna (WhatsApp/Slack)
        └── CRM: atualiza pipeline + agenda follow-up
```

## Fluxo de deploy

```
git push origin main
  │
  ▼
GitHub Actions
  ├── docker build + push → GHCR (ghcr.io/jpxdigital/jpxdigital-site)
  └── SSH → VM1
        ├── docker pull nova imagem
        ├── docker compose up -d --no-deps nextjs
        ├── health check GET /api/health (até 60s)
        └── rollback automático se HTTP ≠ 200
```

## Rede e segurança

- **OCI Security List**: aceita tráfego 80/443 apenas de IPs Cloudflare (lista em cloudflare.com/ips)
- **Cloudflare Origin Certificate**: TLS entre Cloudflare e VM — sem Let's Encrypt exposto à internet
- **Redes Docker**: `frontend` (Nginx ↔ Next.js), `backend` internal (Next.js ↔ Redis); nenhum container de backend expõe porta no host
- **n8n**: nunca chamado diretamente do frontend; sempre via `/api/leads` com `N8N_INTERNAL_SECRET`

## Multi-site

Cada site na OCI segue a estrutura:

```
/srv/sites/
  jpxdigital/          ← port 3000
  landing-cloud/       ← port 3001
  landing-backup/      ← port 3002
```

Cada site tem:
- `docker-compose.yml` próprio
- Arquivo `.env` com segredos (não versionado)
- Systemd unit que reinicia o Compose no boot
- Server block Nginx próprio em `/etc/nginx/conf.d/<site>.conf`
