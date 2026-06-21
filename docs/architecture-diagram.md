# Arquitetura JPX Digital — Diagrama Completo

```mermaid
flowchart TB

  %% ─────────────────────────────────────────
  %% DEV
  %% ─────────────────────────────────────────
  subgraph DEV["💻  Desenvolvimento local"]
    direction LR
    EDITOR["VS Code\n/home/petruzz/jpx-digital-site"]
    SSH_CMD["SSH / curl\ntestes manuais"]
  end

  %% ─────────────────────────────────────────
  %% CI/CD
  %% ─────────────────────────────────────────
  subgraph CICD["⚙️  CI/CD — GitHub Actions"]
    direction TB
    GH["GitHub\njpxdigital/jpx-digital-site\nbranch: main"]
    GA_SITE["Workflow: deploy.yml\nbuild linux/amd64\npush → GHCR"]
    GA_PDF["Workflow: build-pdf-service.yml\nbuild imagem PDF service\npush → GHCR"]
    GHCR["GitHub Container Registry\nghcr.io/jpxdigital/*"]
  end

  %% ─────────────────────────────────────────
  %% CLOUDFLARE
  %% ─────────────────────────────────────────
  subgraph CF["☁️  Cloudflare"]
    DNS["DNS\njpxdigital.com.br"]
    SSL["SSL/TLS Full Strict"]
    TUN_N8N["Tunnel 55e4d7d8\nn8n.jpxdigital.com.br"]
    TUN_PDF["Tunnel 79251c6f\npdf.jpxdigital.com.br"]
  end

  %% ─────────────────────────────────────────
  %% VMs OCI São Paulo
  %% ─────────────────────────────────────────
  subgraph SP["🇧🇷  OCI São Paulo — sa-saopaulo-1"]
    direction TB

    subgraph VM_SITE["jpx-vm  168.75.81.244 (IP reservado)"]
      NGINX["Nginx 1.24\nHTTPS + redirect"]
      NEXT["Next.js 15\ncontainer :3000\nSSG — 52+ páginas"]
      PROM_EXP1["Node Exporter :9100"]
      PROMTAIL1["Promtail → Loki"]
    end

    subgraph VM_N8N["jpx-n8n  137.131.205.54 (IP efêmero)"]
      N8N["n8n v2.23.4\ncontainer :5678\nSQLite"]
      CF_TUNNEL_N8N["cloudflared\nnetwork_mode: service:n8n"]
      PROM_EXP2["Node Exporter :9100"]
      PROMTAIL2["Promtail → Loki"]
      EVO["Evolution API :8080\n(sem uso ativo)"]
    end
  end

  %% ─────────────────────────────────────────
  %% VMs OCI Ashburn
  %% ─────────────────────────────────────────
  subgraph ASH["🇺🇸  OCI Ashburn — us-ashburn-1"]
    direction TB

    subgraph VM_PDF["vm-ashburn-1  129.80.120.133"]
      PDF_SVC["PDF Service\nNode.js + Express\nPuppeteer + Handlebars\ncontainer :3100"]
      CF_TUNNEL_PDF["cloudflared\nnetwork_mode: host"]
      PROM_EXP3["Node Exporter :9100"]
      PROMTAIL3["Promtail → Loki"]
      TEMPLATES["/srv/pdf-service/templates/\nproposta.html\nsow.html\nchecklist-assessment.html\nchecklist-implantacao.html\nonboarding-kit.html"]
    end

    subgraph VM_OBS["vm-ashburn-2  141.148.50.123"]
      GRAFANA["Grafana :3001\n(SSH tunnel para acesso)"]
      PROMETHEUS["Prometheus :9090\nscrape 4 VMs"]
      LOKI["Loki :3100\nrecebe Promtail"]
      CADVISOR["cAdvisor :8080"]
    end
  end

  %% ─────────────────────────────────────────
  %% OCI Storage
  %% ─────────────────────────────────────────
  subgraph OCI_STG["🗄️  OCI Object Storage — Ashburn"]
    BUCKET["Bucket: jpx-documentos\nnamespace: idn9vuw0dbep\npropostas/ · sow/\nchecklists/ · onboarding/"]
    PAR["Pre-Auth Request\nURL pública 7 dias"]
  end

  %% ─────────────────────────────────────────
  %% Externos
  %% ─────────────────────────────────────────
  subgraph EXT["🌐  Serviços externos"]
    HUBSPOT["HubSpot CRM\nDeals + Contacts\nWebhook → n8n"]
    TELEGRAM["Telegram Bot\nchat_id: 8384975992\nNotificações internas"]
    ZOHO["Zoho SMTP\njp@jpxdigital.com.br\nEnvio de propostas"]
    USUARIO["Usuário / Cliente\nnavegador"]
  end

  %% ─────────────────────────────────────────
  %% FLUXO CI/CD
  %% ─────────────────────────────────────────
  EDITOR -->|git push main| GH
  GH --> GA_SITE & GA_PDF
  GA_SITE --> GHCR
  GA_PDF --> GHCR
  GHCR -->|docker pull + restart\nSSH deploy| NEXT
  GHCR -->|docker pull + restart\nSSH deploy| PDF_SVC

  %% ─────────────────────────────────────────
  %% FLUXO SITE
  %% ─────────────────────────────────────────
  USUARIO -->|HTTPS| DNS
  DNS --> SSL --> NGINX --> NEXT
  NEXT -->|/api/services/{slug}\nJSON estático| N8N

  %% ─────────────────────────────────────────
  %% FLUXO N8N
  %% ─────────────────────────────────────────
  HUBSPOT -->|Webhook POST\n/webhook/gerar-proposta\n{objectId, dealstage}| TUN_N8N
  TUN_N8N --> N8N
  SSH_CMD -->|curl POST\nwebhooks manuais| TUN_N8N

  N8N -->|GET /crm/v3/objects/deals| HUBSPOT
  N8N -->|GET /crm/v3/objects/contacts| HUBSPOT
  N8N -->|GET /api/services/{slug}| NEXT

  %% ─────────────────────────────────────────
  %% FLUXO PDF
  %% ─────────────────────────────────────────
  N8N -->|POST /generate-upload\nform-urlencoded\ncampo: payload JSON| TUN_PDF
  TUN_PDF --> CF_TUNNEL_PDF --> PDF_SVC
  PDF_SVC --> TEMPLATES
  PDF_SVC -->|HTTP Signatures\nPUT object| BUCKET
  BUCKET --> PAR
  PAR -->|url PAR| PDF_SVC
  PDF_SVC -->|{url, objectName, expiresAt}| N8N

  %% ─────────────────────────────────────────
  %% FLUXO PÓS-PDF (só Proposta)
  %% ─────────────────────────────────────────
  N8N -->|PATCH deal\nproposal_pdf_url + dealstage| HUBSPOT
  N8N -->|SMTP\nPDF link no corpo| ZOHO
  ZOHO -->|e-mail com proposta| USUARIO

  %% ─────────────────────────────────────────
  %% NOTIFICAÇÃO
  %% ─────────────────────────────────────────
  N8N -->|Documento gerado!\nCliente + URL| TELEGRAM

  %% ─────────────────────────────────────────
  %% OBSERVABILIDADE
  %% ─────────────────────────────────────────
  PROMETHEUS -->|scrape :9100| PROM_EXP1 & PROM_EXP2 & PROM_EXP3
  PROMTAIL1 & PROMTAIL2 & PROMTAIL3 -->|logs| LOKI
  GRAFANA --> PROMETHEUS & LOKI & CADVISOR

  %% ─────────────────────────────────────────
  %% ESTILOS
  %% ─────────────────────────────────────────
  classDef vm fill:#1e3a5f,stroke:#4a9eff,color:#fff
  classDef ext fill:#2d4a22,stroke:#6abf44,color:#fff
  classDef cf fill:#f38020,stroke:#c06010,color:#fff
  classDef storage fill:#5a2d82,stroke:#9b5dd4,color:#fff
  classDef cicd fill:#24292e,stroke:#888,color:#fff
  classDef dev fill:#1a1a2e,stroke:#e94560,color:#fff

  class NEXT,NGINX,N8N,PDF_SVC,GRAFANA,PROMETHEUS,LOKI vm
  class HUBSPOT,TELEGRAM,ZOHO,USUARIO ext
  class DNS,SSL,TUN_N8N,TUN_PDF cf
  class BUCKET,PAR storage
  class GH,GA_SITE,GA_PDF,GHCR cicd
  class EDITOR,SSH_CMD dev
```

---

## Resumo dos fluxos

### 1. Deploy do site
```
git push main
  → GitHub Actions (deploy.yml)
  → build Docker linux/amd64
  → push GHCR
  → SSH jpx-vm: docker pull + container restart
  → nginx :443 → next.js :3000
  → jpxdigital.com.br (Cloudflare SSL)
```

### 2. Deploy do PDF service
```
git push main  [path: deploy/pdf-service/**]
  → GitHub Actions (build-pdf-service.yml)
  → build imagem jpx-pdf
  → push GHCR
  → SSH vm-ashburn-1: docker pull + container restart
  → pdf.jpxdigital.com.br (Cloudflare Tunnel)
```

### 3. Geração de documento (Proposta — fluxo mais completo)
```
HubSpot deal → estágio "Proposta Solicitada"
  → HubSpot Webhook POST /webhook/gerar-proposta
  → Cloudflare Tunnel → n8n
  → Filtrar (valida dealstage)
  → GET HubSpot: deal + contato
  → GET /api/services/{slug} (Next.js)
  → Code: montar payload {template, data}
  → POST pdf.jpxdigital.com.br/generate-upload
      → Puppeteer renderiza proposta.html
      → OCI Object Storage (HTTP Signatures)
      → PAR URL 7 dias
  → PATCH HubSpot: proposal_pdf_url + dealstage
  → Zoho SMTP: e-mail com PDF ao cliente
  → Telegram: notificação interna
```

### 4. Geração de documento (SOW / Checklists / Kit)
```
curl POST /webhook/gerar-{tipo}  {"objectId": "..."}
  → n8n (mesma estrutura, sem Atualizar HubSpot e sem e-mail)
  → PDF gerado em sow/ | checklists/ | onboarding/
  → Telegram: notificação interna
```

### 5. Observabilidade
```
Node Exporter :9100  (4 VMs)  →  Prometheus (vm-ashburn-2)
Promtail (4 VMs)              →  Loki (vm-ashburn-2)
cAdvisor (vm-ashburn-2)       →  Prometheus
                                   ↓
                              Grafana :3001
                         (acesso via SSH tunnel)
```

---

## Tabela de VMs

| VM | IP | Shape | Papel principal |
|---|---|---|---|
| jpx-vm | 168.75.81.244 (reservado) | E2.1.Micro 1GB | Site Next.js + Nginx |
| jpx-n8n | 137.131.205.54 (efêmero) | E2.1.Micro 1GB | n8n + automações |
| vm-ashburn-1 | 129.80.120.133 (efêmero) | E2.1.Micro 1GB | PDF Service |
| vm-ashburn-2 | 141.148.50.123 (efêmero) | E2.1.Micro 1GB | Grafana/Prometheus/Loki |
