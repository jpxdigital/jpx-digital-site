# SYSTEM MAP — JPX Digital Platform

Mapa de todos os componentes e seus relacionamentos.
Última atualização: 2026-07-13

---

## Diagrama de dependências

```
ENTRADA DE LEADS
════════════════

Site (jpxdigital.com.br)              WhatsApp (chip 2: +55 18 98189-0607)
│                                      │
│ formulário /contato                  │ Baileys (jas-bridge)
│                                      │
▼                                      ▼
API /api/leads ──────────────────► n8n (n8n.jpxdigital.com.br)
│                                  │
├─► HubSpot CRM ◄──────────────────┤
│   (Hub ID 51571768)               │
│                                   ├─► PostgreSQL (jas_sessions, jas_events)
├─► Telegram (notificação)          │
│   (@jpxdigital_bot)               ├─► Telegram (notificação HUMAN_TAKEOVER)
│                                   │
└─► Resend (e-mail transacional)    └─► Resend (e-mail transacional)


GERAÇÃO DE DOCUMENTOS
═════════════════════

n8n ──► PDF Service (pdf.jpxdigital.com.br)
│       │
│       ├─► Handlebars (templates em /srv/pdf-service/templates/)
│       │   ├── proposta.html
│       │   ├── sow.html
│       │   ├── checklist-assessment.html
│       │   ├── checklist-implantacao.html
│       │   └── onboarding-kit.html
│       │
│       └─► OCI Object Storage (bucket: jpx-documentos)
│           ├── propostas/{ano-mes}/
│           ├── contratos/
│           ├── sow/
│           └── onboarding/
│
└─► ZapSign (SOW — pendente)


AGENDAMENTO
═══════════

JAS (WhatsApp) ──► Microsoft Bookings (link direto)
Site Helena    ──► Microsoft Bookings (link direto)
               ──► WhatsApp (wa.me/5518981890607)
Cal.com        ──► Outlook Calendar (joao@jpxdigital.com.br)
               ──► n8n webhook (/webhook/cal-booking)


COMUNICAÇÃO CORPORATIVA
═══════════════════════

joao@jpxdigital.com.br ─► Microsoft 365 Exchange
Teams                  ─► Microsoft 365
Bookings               ─► Microsoft 365
aliases (10x)          ─► joao@jpxdigital.com.br


INFRAESTRUTURA
══════════════

GitHub (jpxdigital/jpx-digital-site)
│
├── push main ──► GitHub Actions
│                │
│                ├── deploy.yml ──────────────► jpx-vm (VM1) — Site
│                ├── build-pdf-service.yml ──► vm-ashburn-1 (VM3) — PDF
│                └── deploy-jas-bridge.yml ──► jpx-n8n (VM2) — JAS ⚠️ manual SCP ainda
│
Cloudflare (DNS + WAF + CDN)
│
├── jpxdigital.com.br ──► jpx-vm (168.75.81.244) via Nginx
├── n8n.jpxdigital.com.br ──► jpx-n8n via Cloudflare Tunnel
├── pdf.jpxdigital.com.br ──► vm-ashburn-1 via Cloudflare Tunnel
└── suporte.jpxdigital.com.br ──► (portal suporte)


MONITORAMENTO
═════════════

vm-ashburn-2 (141.148.50.123)
│
├── Prometheus ──► scrape node-exporter de todas as 4 VMs (porta 9100)
│               └── scrape cAdvisor (containers)
│
├── Loki ──► recebe Promtail de todas as 4 VMs (porta 3100)
│
└── Grafana ──► dashboards (acesso via SSH tunnel :3001)
```

---

## Inventário de serviços externos

| Serviço | Uso | Autenticação | Responsável |
|---|---|---|---|
| HubSpot | CRM | PAT token (KEYS.md) | jpx |
| Resend | E-mail transacional | API Key (KEYS.md) | jpx |
| Cloudflare | DNS + CDN + Tunnels | API Token (KEYS.md) | jpx |
| Microsoft 365 | E-mail + Reuniões + Bookings | Admin Global | joao@jpxdigital.com.br |
| Cal.com | Agendamento alternativo | OAuth M365 | joao@jpxdigital.com.br |
| Telegram | Notificações | Bot Token (KEYS.md) | jpx |
| OCI | VMs + Object Storage | OCI CLI profiles (KEYS.md) | jpx |
| GitHub | Código + CI/CD | SSH + gh CLI | jpx |
| ZapSign | Assinatura digital SOW | API Key (pendente) | jpx |
| Cloudflare Turnstile | Anti-spam formulário | Site Key (KEYS.md) | jpx |

---

## Portas e endpoints internos

| Serviço | VM | Porta | Exposição |
|---|---|---|---|
| Next.js | jpx-vm | 3000 | via Nginx |
| n8n | jpx-n8n | 5678 | via Cloudflare Tunnel |
| jas-bridge | jpx-n8n | 3001 | interno (rede Docker) |
| PDF Service | vm-ashburn-1 | 3100 | via Cloudflare Tunnel |
| Grafana | vm-ashburn-2 | 3001 | SSH tunnel |
| Prometheus | vm-ashburn-2 | 9090 | interno |
| Loki | vm-ashburn-2 | 3100 | interno |
| Node Exporter | todas | 9100 | só vm-ashburn-2 |
| PostgreSQL (n8n) | jpx-n8n | 5432 | interno |
