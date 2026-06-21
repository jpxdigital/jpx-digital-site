# Prompt — Diagrama Arquitetural JPX Digital

Use este prompt em qualquer IA generativa (ChatGPT, Claude, Gemini) ou ferramenta de diagramas com suporte a linguagem natural (Eraser.io, Lucidchart AI, draw.io AI).

---

## Prompt

Gere um diagrama arquitetural completo do ambiente de produção da empresa **JPX Digital** (consultoria de TI). O diagrama deve cobrir toda a infraestrutura em nuvem, containers Docker, serviços, fluxos de dados e integrações externas descritos abaixo. Use um layout claro com agrupamentos por ambiente/VM. O estilo deve ser **professional cloud architecture diagram** (similar ao estilo AWS Architecture / Google Cloud diagrams).

---

### AMBIENTES E VMs

O ambiente roda sobre **Oracle Cloud Infrastructure (OCI)** em duas regiões. Todas as VMs são shape E2.1.Micro (1 vCPU, 1 GB RAM).

---

#### VM 1 — jpx-vm | São Paulo (sa-saopaulo-1) | IP fixo 168.75.81.244

**Sistema:** Ubuntu, Nginx 1.24 instalado no host (não Docker)

**Containers Docker:**

| Container | Imagem | Porta interna | Descrição |
|---|---|---|---|
| `jpx_nextjs` | `ghcr.io/jpxdigital/jpxdigital-site:latest` | 127.0.0.1:3000 | Site institucional Next.js 15 SSG |
| `jpx-suporte-frontend-1` | `ghcr.io/jpxdigital/jpx-suporte-frontend` | 127.0.0.1:8080 | Portal de suporte (frontend React) |
| `jpx-suporte-api-1` | `ghcr.io/jpxdigital/jpx-suporte-api` | 3001 (interno) | API REST do portal de suporte (Node.js) |
| `node-exporter` | `prom/node-exporter:latest` | 9100 (host) | Métricas do sistema → Prometheus |
| `promtail` | `grafana/promtail:3.5.0` | — | Coleta logs do host → Loki |

**Nginx virtual hosts (proxy reverso, SSL Let's Encrypt):**
- `jpxdigital.com.br` / `www.jpxdigital.com.br` → 127.0.0.1:3000 (Next.js)
- `suporte.jpxdigital.com.br` → 127.0.0.1:8080 (portal suporte)
- `helena.jpxdigital.com.br` → 127.0.0.1:8080
- `ia-free.jpxdigital.com.br` → 127.0.0.1:8080

**Banco de dados externo (acessado pela API do portal):**
- MySQL HeatWave (OCI managed) — IP interno 10.0.1.227, usuário `jpxsuporte`

---

#### VM 2 — jpx-n8n | São Paulo (sa-saopaulo-1) | IP efêmero 137.131.205.54

**Containers Docker:**

| Container | Imagem | Porta interna | Descrição |
|---|---|---|---|
| `n8n` | `n8nio/n8n:latest` | 127.0.0.1:5678 | Plataforma de automação n8n v2.23.4 (SQLite) |
| `cloudflared` | `cloudflare/cloudflared:latest` | network_mode: service:n8n | Cloudflare Tunnel → n8n.jpxdigital.com.br |
| `evolution` | `atendai/evolution-api:latest` | 127.0.0.1:8080 | Evolution API (WhatsApp gateway, sem uso ativo) |
| `evolution_db` | `postgres:16-alpine` | 5432 (interno) | PostgreSQL para Evolution API |
| `node-exporter` | `prom/node-exporter:latest` | 9100 (host) | Métricas → Prometheus |
| `promtail` | `grafana/promtail:3.5.0` | — | Logs → Loki |

**Redes Docker:**
- `n8n_default` (bridge): n8n + cloudflared
- `evolution_default` (bridge): evolution + evolution_db

**Workflows ativos no n8n:**
1. **Boas-vindas — Lead JPX Digital** — webhook de formulário de contato → e-mail Zoho → Telegram
2. **JPX — Gerar Proposta Comercial** — trigger: HubSpot webhook → busca deal/contato → PDF service → HubSpot update → e-mail Zoho → Telegram
3. **JPX — Gerar SOW** — trigger: webhook manual → HubSpot → PDF service → Telegram
4. **JPX — Gerar Checklist de Assessment** — trigger: webhook manual → HubSpot → PDF service → Telegram
5. **JPX — Gerar Checklist de Implantação** — trigger: webhook manual → HubSpot → PDF service → Telegram
6. **JPX — Gerar Kit de Onboarding** — trigger: webhook manual → HubSpot → PDF service → Telegram

---

#### VM 3 — vm-ashburn-1 | Ashburn (us-ashburn-1) | IP efêmero 129.80.120.133

**Containers Docker:**

| Container | Imagem | Porta interna | Descrição |
|---|---|---|---|
| `jpx-pdf` | `jpx-pdf:latest` (custom) | 127.0.0.1:3100 | PDF Service: Node.js + Express + Puppeteer + Handlebars |
| `jpx-pdf-cloudflared` | `cloudflare/cloudflared:latest` | network_mode: host | Cloudflare Tunnel → pdf.jpxdigital.com.br |
| `jpx-pdf-node-exporter-1` | `prom/node-exporter:latest` | 0.0.0.0:9100 | Métricas → Prometheus |
| `promtail` | `grafana/promtail:3.5.0` | — | Logs → Loki |

**PDF Service — detalhes:**
- Templates Handlebars: `proposta.html`, `sow.html`, `checklist-assessment.html`, `checklist-implantacao.html`, `onboarding-kit.html`
- Endpoint principal: `POST /generate-upload` — renderiza HTML → Puppeteer → PDF → upload OCI → retorna PAR URL
- Autenticação OCI via HTTP Signatures (API key)

**OCI Object Storage (acesso via HTTP Signatures pelo PDF service):**
- Bucket: `jpx-documentos` (região Ashburn, namespace `idn9vuw0dbep`)
- Pastas: `propostas/`, `sow/`, `checklists/assessment/`, `checklists/implantacao/`, `onboarding/`
- PDFs ficam com Pre-Authenticated Request URL válida por 7 dias

---

#### VM 4 — vm-ashburn-2 | Ashburn (us-ashburn-1) | IP efêmero 141.148.50.123

**Containers Docker (stack de observabilidade):**

| Container | Imagem | Porta | Descrição |
|---|---|---|---|
| `monitoring-grafana-1` | `grafana/grafana:latest` | 127.0.0.1:3001 | Dashboards (acesso via SSH tunnel) |
| `monitoring-prometheus-1` | `prom/prometheus:latest` | 127.0.0.1:9090 | Coleta métricas das 4 VMs |
| `monitoring-loki-1` | `grafana/loki:3.5.0` | 0.0.0.0:3100 | Agregação de logs (recebe Promtail de todas as VMs) |
| `monitoring-cadvisor-1` | `gcr.io/cadvisor/cadvisor:v0.51.0` | 127.0.0.1:8080 | Métricas de containers Docker |
| `monitoring-node-exporter-1` | `prom/node-exporter:latest` | 0.0.0.0:9100 | Métricas do próprio host |
| `promtail` | `grafana/promtail:3.5.0` | — | Logs da VM → Loki (local) |

**Prometheus scrape targets:**
- `node-exporter:9100` (vm-ashburn-2, Docker service)
- `129.80.120.133:9100` (vm-ashburn-1)
- `168.75.81.244:9100` (jpx-vm)
- `137.131.205.54:9100` (jpx-n8n)
- `cadvisor:8080` (containers vm-ashburn-2)

---

### SERVIÇOS EXTERNOS

| Serviço | Papel no sistema |
|---|---|
| **Cloudflare** | DNS autoritativo, SSL/TLS Full Strict para jpxdigital.com.br, 2 Tunnels (n8n + PDF service) |
| **GitHub** (jpxdigital/jpx-digital-site) | Repositório mono-repo, branch `main` → CI/CD |
| **GitHub Actions** | `deploy.yml`: build + push site → GHCR → SSH deploy jpx-vm. `build-pdf-service.yml`: build + push PDF service → GHCR → SSH deploy vm-ashburn-1 |
| **GHCR** (ghcr.io/jpxdigital) | Registry de imagens Docker: site, suporte-api, suporte-frontend |
| **HubSpot CRM** | Deals + Contacts. Dispara webhook para n8n quando deal muda de estágio. Recebe PATCH de volta com URL do PDF e nova stage |
| **Zoho SMTP** (jp@jpxdigital.com.br) | Envio de e-mails: boas-vindas a leads e proposta comercial com PDF anexo/link |
| **Telegram Bot** | Notificações internas (chat_id: 8384975992): novo lead, documento gerado |
| **OCI MySQL HeatWave** | Banco de dados do portal de suporte (IP interno 10.0.1.227) |
| **OCI Object Storage** | Armazenamento de PDFs gerados (bucket jpx-documentos, Ashburn) |

---

### FLUXOS PRINCIPAIS

**Fluxo 1 — Deploy do site institucional:**
```
Developer → git push main → GitHub → GitHub Actions (deploy.yml)
→ docker build linux/amd64 → push GHCR
→ SSH jpx-vm → docker pull jpxdigital-site:latest → container restart
→ Nginx :443 → jpx_nextjs :3000 → jpxdigital.com.br (Cloudflare SSL)
```

**Fluxo 2 — Geração de Proposta Comercial (mais completo):**
```
HubSpot: deal → estágio "Proposta Solicitada"
→ HubSpot Webhook POST → Cloudflare Tunnel → n8n :5678
→ n8n: Filtrar (valida dealstage)
→ n8n: GET HubSpot API (deal + contato)
→ n8n: GET jpxdigital.com.br/api/services/{slug} (JSON do serviço)
→ n8n: Code node — monta payload {template, client, service, meta}
→ n8n: POST pdf.jpxdigital.com.br/generate-upload (form-urlencoded)
   → PDF Service: Puppeteer renderiza proposta.html (Handlebars)
   → PDF Service: PUT OCI Object Storage (HTTP Signatures)
   → OCI: Pre-Auth URL 7 dias
   → PDF Service: retorna {url, objectName, expiresAt} → n8n
→ n8n: PATCH HubSpot — grava proposal_pdf_url + dealstage "Proposta Enviada"
→ n8n: Zoho SMTP — e-mail com link do PDF ao cliente
→ n8n: Telegram — "Proposta gerada! Cliente: X Empresa: Y"
```

**Fluxo 3 — Geração de outros documentos (SOW, Checklists, Kit):**
```
curl POST /webhook/gerar-{tipo} {"objectId": "..."}
→ Cloudflare Tunnel → n8n
→ mesmo fluxo HubSpot + PDF service
→ sem PATCH HubSpot e sem e-mail
→ Telegram: "{Documento} gerado! Cliente: X"
```

**Fluxo 4 — Observabilidade:**
```
Promtail (jpx-vm, jpx-n8n, vm-ashburn-1, vm-ashburn-2)
→ push logs → Loki :3100 (vm-ashburn-2)

Prometheus (vm-ashburn-2)
→ scrape Node Exporter :9100 (todas as 4 VMs)
→ scrape cAdvisor :8080 (containers vm-ashburn-2)

Grafana :3001 (vm-ashburn-2)
→ datasource: Prometheus + Loki
→ acesso via SSH tunnel: ssh -L 3001:localhost:3001 ubuntu@141.148.50.123
```

**Fluxo 5 — Portal de Suporte:**
```
Cliente → suporte.jpxdigital.com.br (Cloudflare SSL)
→ Nginx jpx-vm → jpx-suporte-frontend :8080 (React)
→ React → jpx-suporte-api :3001 (Node.js REST)
→ API → MySQL HeatWave 10.0.1.227 (OCI managed)
```

---

### RESTRIÇÕES DE REDE (importante para o diagrama)

- n8n (:5678) e Evolution API (:8080) são expostos SOMENTE em `127.0.0.1` — acessíveis apenas via Cloudflare Tunnel ou SSH
- PDF Service (:3100) é exposto SOMENTE em `127.0.0.1` — acessível apenas via Cloudflare Tunnel
- Grafana (:3001), Prometheus (:9090), cAdvisor (:8080) são locais — acessíveis via SSH tunnel
- Node Exporter (:9100) na jpx-vm e jpx-n8n são restritos por iptables ao IP 141.148.50.123 (Prometheus)
- MySQL HeatWave: acesso apenas por IP interno OCI (VCN privada)
- Loki (:3100) na vm-ashburn-2 está em `0.0.0.0` — recebe Promtail de todas as VMs

---

### TECNOLOGIAS (para legenda/ícones)

- **Linguagens/Runtimes:** Node.js 22, Next.js 15 (App Router, SSG), TypeScript, Python (scripts de manutenção)
- **Containers:** Docker, Docker Compose
- **Banco de dados:** SQLite (n8n), PostgreSQL 16 (Evolution API), MySQL HeatWave (portal suporte)
- **Automação:** n8n v2.23.4 com JS Task Runner
- **PDF:** Puppeteer (headless Chromium) + Handlebars (templates HTML)
- **Observabilidade:** Prometheus, Loki, Grafana, cAdvisor, Node Exporter, Promtail
- **CI/CD:** GitHub Actions, GHCR (GitHub Container Registry)
- **CDN/Proxy:** Cloudflare (DNS, SSL Full Strict, Argo Tunnels)
- **Cloud:** Oracle Cloud Infrastructure (OCI) — E2.1.Micro free tier
- **Proxy reverso:** Nginx 1.24
- **CRM:** HubSpot
- **Messaging:** Telegram Bot API, Zoho SMTP, Evolution API (WhatsApp)
- **Storage:** OCI Object Storage com Pre-Authenticated Requests

---

### INSTRUÇÃO FINAL PARA A IA

Gere o diagrama com os seguintes critérios:
1. **Agrupe** os componentes por VM/ambiente usando caixas/swimlanes
2. **Distinga** claramente: containers Docker (ícone de baleia/contêiner), serviços externos (nuvem), rede/proxy (cilindro ou símbolo de rede)
3. **Mostre as portas** nas conexões entre serviços
4. **Use cores diferentes** por categoria: CI/CD (laranja), VMs SP (azul escuro), VMs Ashburn (roxo), externos (verde), observabilidade (amarelo), storage (cinza)
5. **Inclua os fluxos de dados** como setas direcionadas, com label indicando o protocolo (HTTPS, HTTP, SMTP, Webhook, etc.)
6. **Destaque** que n8n e PDF service são acessados exclusivamente via Cloudflare Tunnel (não expostos diretamente à internet)
7. O diagrama deve ser lido de cima para baixo: **Dev → CI/CD → Cloudflare → VMs → Serviços Externos**
