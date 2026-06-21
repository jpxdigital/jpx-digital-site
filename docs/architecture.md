# Arquitetura da Plataforma JPX Digital

## Visão geral

```
Internet
  │
  ▼
Cloudflare (DNS + CDN + WAF + DDoS + Bot Management)
  │
  ├──► [sa-saopaulo-1]  ──────────────────────────────────────────────
  │    VM1 — Site                  VM2 — Automação
  │    ├── Nginx (80/443)          ├── n8n (5678, interno)
  │    ├── Next.js 15 (3000)       ├── PostgreSQL (5432, interno)
  │    └── Redis (6379, interno)   ├── Redis (6379, interno)
  │                                └── Watchtower
  │
  └──► [us-ashburn-1]  ──────────────────────────────────────────────
       VM3 — Observabilidade            VM4 — Docs & PDF
       ├── Grafana (3001, SSH tunnel)   ├── Puppeteer (geração de PDF)
       ├── Prometheus (9090, interno)   ├── Nginx (serve PDFs locais)
       ├── Loki (3100, interno)         └── OCI Object Storage (bucket jpx-documentos)
       ├── Promtail (coleta de todas as VMs)
       ├── Node Exporter (9100, interno)
       ├── cAdvisor (8080, interno)
       └── Nginx Exporter (9113, interno)
```

**Regiões OCI:**

| VM | Região | CLI Profile | Papel |
|----|--------|-------------|-------|
| VM1 | sa-saopaulo-1 | `jpx` (padrão) | Site principal (Next.js) |
| VM2 | sa-saopaulo-1 | `jpx` (padrão) | Automação (n8n + PostgreSQL) |
| VM3 | us-ashburn-1  | `jpx-ashburn`  | Observabilidade (Grafana + Prometheus + Loki) — 141.148.50.123 |
| VM4 | us-ashburn-1  | `jpx-ashburn`  | Documentos (Puppeteer PDF + Cloudflare Tunnel) — 129.80.120.133 |

**Por que Ashburn para observabilidade e docs?**
- Monitoramento em região separada: se São Paulo tiver problemas, os alertas continuam funcionando
- PDF generation (Puppeteer) é CPU-intensivo — isolar em VM dedicada protege o n8n
- OCI Object Storage em Ashburn: latência menor para clientes fora do Brasil

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
