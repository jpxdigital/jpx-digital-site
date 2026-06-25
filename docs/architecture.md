# Arquitetura da Plataforma JPX Digital

## Visão geral

```
Internet
  │
  ▼
Cloudflare (DNS + CDN + WAF + DDoS + Bot Management)
  │
  ├──► [sa-saopaulo-1]  ──────────────────────────────────────────────
  │    VM1 — Site (jpx-vm)          VM2 — Automação (jpx-n8n)
  │    ├── Nginx (80/443)            ├── n8n 2.x (5678, interno)
  │    ├── Next.js 15 (3000)         ├── PostgreSQL 16 (5432, interno)
  │    └── Watchtower                ├── cloudflared (Tunnel → n8n.jpxdigital.com.br)
  │                                  └── Evolution API (desligada — WhatsApp futuro)
  │
  └──► [us-ashburn-1]  ──────────────────────────────────────────────
       VM3 — Observabilidade              VM4 — PDF & Docs (vm-ashburn-1)
       ├── Grafana (3001, SSH tunnel)     ├── PDF Service — Node+Puppeteer (HTTPS)
       ├── Prometheus (9090, interno)     └── OCI Object Storage (bucket jpx-documentos)
       ├── Loki (3100, interno)
       ├── Promtail (coleta de todas as VMs)
       ├── Node Exporter (9100)
       └── cAdvisor (8080, interno)
```

**Regiões OCI:**

| VM | Nome | Região | IP | Papel |
|----|------|---------|-----|-------|
| VM1 | jpx-vm | sa-saopaulo-1 | estático (Nginx) | Site principal (Next.js) |
| VM2 | jpx-n8n | sa-saopaulo-1 | 137.131.205.54 (efêmero) | Automação — n8n + PostgreSQL |
| VM3 | vm-ashburn-2 | us-ashburn-1 | 141.148.50.123 | Observabilidade (Grafana + Prometheus + Loki) |
| VM4 | vm-ashburn-1 | us-ashburn-1 | 129.80.120.133 | PDF Service (Puppeteer) |

> **IP efêmero:** jpx-n8n não tem IP reservado. Acesso estável via Cloudflare Tunnel (`n8n.jpxdigital.com.br`) ou pelo IP atual no momento do SSH.

**Por que Ashburn para observabilidade e PDF?**
- Monitoramento em região separada: se São Paulo tiver problemas, os alertas continuam funcionando
- PDF generation (Puppeteer) é CPU-intensivo — isolar em VM dedicada protege o n8n
- OCI Object Storage em Ashburn: latência menor para downloads de documentos

## Fluxo de um lead

```
Visitante preenche formulário
  │
  ▼
Next.js /api/leads
  ├── Validação MX do domínio de e-mail
  ├── Cloudflare Turnstile (anti-spam)
  ├── HubSpot: cria contato (PAT Private App)
  └── n8n webhook /webhook/jpx-lead (fire-and-forget)
        ├── E-mail de boas-vindas (Zoho SMTP)
        └── Notificação interna (Telegram)
```

Ver jornada completa do cliente em `docs/fluxo-cliente.md`.

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

## Serviços em standby

Serviços criados mas não expostos no site — mantidos para uso futuro.

| Serviço | Página | JSON API | Como reativar |
|---|---|---|---|
| **Sala Cofre** | `src/app/servicos/sala-cofre/_page.disabled` | `src/data/services/sala-cofre.json` | Renomear `_page.disabled` → `page.tsx` e fazer deploy |

> Páginas com extensão `_page.disabled` não são roteadas pelo Next.js e não aparecem no site nem no deploy. O JSON de dados existe mas não é referenciado em nenhum lugar do código.

---

## Helena IA — Ecossistema

A Helena é a assistente de TI com IA da JPX Digital, hospedada em `helena.jpxdigital.com.br`, construída como SPA Vite/React no repositório `jpx-suportedocker`.

### Infraestrutura

```
helena.jpxdigital.com.br
  │
  ▼
Cloudflare (DNS + CDN)
  │
  ▼
VM1 (jpx-vm) — Nginx
  ├── Frontend: Vite/React SPA  (porta 3001 → /srv/sites/helena/)
  └── Backend:  Node.js/Express (porta 3002 → /srv/sites/helena-api/)
        ├── Groq (fallback 1)
        ├── Cerebras (fallback 2)
        ├── Gemini (fallback 3)
        └── SambaNova (fallback 4)
```

Deploy via GitHub Actions (`jpx-suportedocker`) → SSH → Docker Compose → Watchtower.

### Funcionalidades implementadas

| Feature | Status | Detalhe |
|---|---|---|
| Chat IA público (sem login) | ✅ | Endpoint `/api/chat-publico` — cascade Groq → Cerebras → Gemini → SambaNova |
| Identidade visual JPX | ✅ | Navy `#0A2463` + grid, nav branca sticky, footer escuro 3 colunas |
| Avatar Helena SVG | ✅ | Componente `HelenaAvatar({ size })` — substitui todo uso de 🤖 |
| Quick reply buttons | ✅ | 4 sugestões aparecem após saudação; somem após 1ª interação |
| Chat scroll fix | ✅ | `scrollTop = scrollHeight` no container — não desloca a página inteira |
| Cadastro → Telegram | ✅ | `POST /api/signup` notifica `TELEGRAM_TOKEN` / `TELEGRAM_CHAT_ID` |
| System prompt de serviços | ✅ | Helena conhece 20 serviços JPX Digital com URLs e pode direcionar leads |
| Seção Helena em jpxdigital.com.br | ✅ | Foco em usuário final não técnico (PC lento, impressora, Wi-Fi) |

### Variáveis de ambiente (`.env` na VM — não versionado)

```
TELEGRAM_TOKEN=...
TELEGRAM_CHAT_ID=...
GROQ_API_KEY=...
CEREBRAS_API_KEY=...
GEMINI_API_KEY=...
SAMBANOVA_API_KEY=...
EMPRESA=Helena
```

### Páginas do SPA

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `Landing.jsx` | Landing pública com chat demo e quick replies |
| `/login` | `Login.jsx` | Login com e-mail/senha |
| `/signup` | `Signup.jsx` | Cadastro — dispara notificação Telegram |
| `/chat` | `Chat.jsx` | Chat autenticado com histórico |
| `/segmentos/:slug` | `LandingSegmento.jsx` | Landing por profissão (advocacia, medicina, etc.) |

> **`LandingHelena.jsx`** existe no repositório mas a rota `/helena` foi removida do `App.jsx`. Arquivo mantido como referência.

---

## Posicionamento — Hero do site principal

O card "Seu gestor saberia responder?" no hero de `src/app/page.tsx` usa perguntas de dor mapeadas diretamente para serviços:

| Pergunta no card | Serviço JPX |
|---|---|
| *Se sofrer ransomware hoje, em quanto tempo recupera os dados?* | Disaster Recovery · Backup Corporativo |
| *Se o servidor principal falhar, quanto tempo ficará fora do ar?* | Business Continuity · Infraestrutura |
| *Seu backup do Microsoft 365 está realmente protegido?* | Backup Microsoft 365 |
| *Você sabe exatamente quanto desperdício tem na cloud?* | FinOps · Cloud Computing |
| *A operação continua funcionando durante uma falha de TI?* | Business Continuity · Suporte Gerenciado |

Rodapé do card: *"Se alguma trouxe dúvida, você precisa de um diagnóstico — antes de precisar de um milagre."* → CTA aponta para `/contato`.

---

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
