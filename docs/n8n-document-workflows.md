# Workflows n8n — Geração de Documentos JPX Digital

Documentação completa dos 5 workflows de geração automática de PDFs, integração HubSpot e notificações.

---

## Visão geral

Cada workflow é acionado por um webhook HTTP (POST), busca dados do HubSpot, monta um payload de template, chama o PDF Service, e notifica via Telegram. O workflow de Proposta Comercial adicionalmente atualiza o deal no HubSpot e envia o PDF por e-mail.

```
HubSpot / chamada manual
        │
        ▼
  n8n (webhook)
        │
   Filtrar / validar
        │
   Buscar dados (HubSpot API)
        │
   Buscar serviço (jpxdigital.com.br/api/services)
        │
   Montar payload (Code node)
        │
   PDF Service (pdf.jpxdigital.com.br)
        │  └─ Puppeteer → Handlebars → PDF
        │  └─ Upload OCI Object Storage
        │  └─ PAR URL (7 dias)
        │
   [Atualizar HubSpot + Enviar e-mail]  ← só Proposta Comercial
        │
   Telegram — Notificação interna
```

---

## Infraestrutura

| Componente | Endereço | VM |
|---|---|---|
| n8n | https://n8n.jpxdigital.com.br | jpx-n8n — 137.131.205.54 (SP) |
| PDF Service | https://pdf.jpxdigital.com.br | vm-ashburn-1 — 129.80.120.133 (Ashburn) |
| OCI Object Storage | bucket `jpx-documentos` (Ashburn) | — |
| HubSpot | portal `jpxdigital` | — |

**Nota de deploy:** O IP da jpx-n8n é efêmero — acessar via Cloudflare Tunnel ou pelo IP no momento do deploy.

---

## Bugs conhecidos / workarounds

| Problema | Causa | Solução aplicada |
|---|---|---|
| `contentType: json` envia `{"":""}` | Bug n8n httpRequest v4 | Usar `form-urlencoded` com campo `payload` |
| Telegram "invalid syntax" | Emojis em expressões `={{ }}` | Texto sem emojis no campo `text` |
| `$env.TELEGRAM_CHAT_ID` não resolve | Variável não propagada no runner | Hardcode: `8384975992` |
| JS Task Runner: token expirado em 30s | TTL padrão muito curto | `N8N_RUNNERS_GRANT_TOKEN_TTL=120` no docker-compose |

---

## 1. JPX — Gerar Proposta Comercial

**ID:** `83e497fe-12ce-45e1-b571-ccb60e8e435b`  
**Webhook produção:** `POST /webhook/gerar-proposta`  
**Template PDF:** `proposta`  
**Pasta OCI:** `propostas/{ano-mes}/`

### Trigger

Chamado pelo HubSpot Workflow quando um deal muda para o estágio **"Proposta Solicitada"** (ID: `1385066797`).

Payload esperado:
```json
{
  "objectId": "61407805236",
  "propertyName": "dealstage",
  "propertyValue": "1385066797"
}
```

### Nós (13)

| # | Nome | Tipo | Descrição |
|---|---|---|---|
| 1 | HubSpot — Deal: Proposta Solicitada | Webhook | Recebe o POST do HubSpot |
| 2 | Filtrar — estágio Proposta Solicitada | IF | Valida `body.propertyValue == '1385066797'` |
| 3 | HubSpot — Buscar deal completo | HTTP GET | `GET /crm/v3/objects/deals/{objectId}?properties=dealname,service_slug,...` |
| 4 | HubSpot — Buscar contato do deal | HTTP GET | `GET /crm/v4/objects/deals/{dealId}/associations/contacts` |
| 5 | HubSpot — Dados do contato | HTTP GET | `GET /crm/v3/objects/contacts/{contactId}?properties=firstname,lastname,email,company` |
| 6 | Ler JSON do serviço | HTTP GET | `GET https://jpxdigital.com.br/api/services/{service_slug}` |
| 7 | Parse JSON do serviço | Set | Extrai o objeto JSON do campo `data` |
| 8 | Adicionar num aos steps | Code | Gera `proposalNumber` (JPX-YYYY-NNN), adiciona `stepNumber` a cada item de escopo |
| 9 | Montar payload do template | Code | Monta `{ template: 'proposta', data: { client, deal, service, meta } }` |
| 10 | Gerar PDF — pdf.jpxdigital.com.br | HTTP POST | `POST /generate-upload` → devolve `{ url, objectName, proposalNumber, expiresAt }` |
| 11 | HubSpot — Atualizar deal | HTTP PATCH | Grava `proposal_pdf_url`, `proposal_sent_date`, muda `dealstage` para "Proposta Enviada" (`1385078826`) |
| 12 | Zoho SMTP — Enviar proposta ao cliente | E-mail | Envia PDF (link PAR) ao contato via jp@jpxdigital.com.br |
| 13 | Telegram — Notificação interna | Telegram | Chat `8384975992` — texto: `Proposta gerada!\n\nCliente: {nome}\n...` |

---

## 2. JPX — Gerar SOW

**ID:** `dy8FELtqgO7g99pP`  
**Webhook produção:** `POST /webhook/gerar-sow`  
**Template PDF:** `sow`  
**Pasta OCI:** `sow/{ano-mes}/`

### Trigger

Chamada manual ou pelo HubSpot quando o projeto entra na fase de **Statement of Work**.

Payload esperado:
```json
{ "objectId": "61407805236" }
```

### Nós (11)

| # | Nome | Tipo | Descrição |
|---|---|---|---|
| 1 | Webhook | Webhook | `POST /webhook/gerar-sow` |
| 2 | Filtrar | IF | Valida presença de `body.objectId` |
| 3 | HubSpot — Buscar deal | HTTP GET | Busca deal com propriedades |
| 4 | HubSpot — Buscar contato do deal | HTTP GET | Associations deal → contacts |
| 5 | HubSpot — Dados do contato | HTTP GET | Dados do contato principal |
| 6 | Ler JSON do serviço | HTTP GET | JSON do serviço em `/api/services/{slug}` |
| 7 | Parse JSON do serviço | Set | Extrai campo `data` |
| 8 | Adicionar num aos steps | Code | Numera os itens do escopo |
| 9 | Montar payload | Code | `{ template: 'sow', data: { client, deal, service, meta } }` — `docNum: JPX-SOW-YYYY-NNN`, `outputPath: sow/{ano-mes}/...` |
| 10 | Gerar PDF — pdf.jpxdigital.com.br | HTTP POST | `POST /generate-upload` |
| 11 | Telegram — Notificação interna | Telegram | `SOW gerado!\n\nCliente: {nome}\n...` |

---

## 3. JPX — Gerar Checklist de Assessment

**ID:** `mD9kcL0h2cTPS1Km`  
**Webhook produção:** `POST /webhook/gerar-checklist-assessment`  
**Template PDF:** `checklist-assessment`  
**Pasta OCI:** `checklists/assessment/{ano-mes}/`

### Trigger

Chamada manual quando inicia o assessment técnico do cliente.

Payload:
```json
{ "objectId": "61407805236" }
```

### Nós (11)

Idêntica à estrutura do SOW, com variações no Montar payload:

| Diferença | Valor |
|---|---|
| `template` | `checklist-assessment` |
| `docNum` | `JPX-ASS-YYYY-NNN` |
| `outputPath` | `checklists/assessment/{ano-mes}/{empresa}-{slug}.pdf` |
| `meta.totalItems` | `service.assessment.checklist.length` |
| Telegram | `Checklist de Assessment gerado!\n\n...` |

---

## 4. JPX — Gerar Checklist de Implantação

**ID:** `IZNpof46f13Mqhsj`  
**Webhook produção:** `POST /webhook/gerar-checklist-implantacao`  
**Template PDF:** `checklist-implantacao`  
**Pasta OCI:** `checklists/implantacao/{ano-mes}/`

### Trigger

Chamada manual quando inicia a fase de implantação do projeto.

### Variações no Montar payload

| Campo | Valor |
|---|---|
| `template` | `checklist-implantacao` |
| `docNum` | `JPX-IMP-YYYY-NNN` |
| `outputPath` | `checklists/implantacao/{ano-mes}/...` |
| Telegram | `Checklist de Implantação gerado!\n\n...` |

---

## 5. JPX — Gerar Kit de Onboarding

**ID:** `7c7GPznT3vHbfdon`  
**Webhook produção:** `POST /webhook/gerar-onboarding-kit`  
**Template PDF:** `onboarding-kit`  
**Pasta OCI:** `onboarding/{ano-mes}/`

### Trigger

Chamada manual no início do onboarding do cliente.

### Variações no Montar payload

| Campo | Valor |
|---|---|
| `template` | `onboarding-kit` |
| `docNum` | `JPX-ONB-YYYY-NNN` |
| `outputPath` | `onboarding/{ano-mes}/...` |
| Telegram | `Kit de Onboarding gerado!\n\n...` |

---

## PDF Service — endpoint `/generate-upload`

**URL:** `POST https://pdf.jpxdigital.com.br/generate-upload`  
**Content-Type:** `application/x-www-form-urlencoded`  
**Campo:** `payload` (JSON string)

### Estrutura do payload (todos os templates exceto Proposta)

```json
{
  "template": "sow",
  "data": {
    "client": {
      "name": "Empresa XYZ",
      "contact": "João Silva",
      "company": "Empresa XYZ",
      "initials": "EX",
      "cnpj": null,
      "email": "joao@empresa.com",
      "segment": "saude"
    },
    "service": { },
    "meta": {
      "date": "21 de junho de 2026",
      "docNumber": "JPX-SOW-2026-236",
      "technician": "João Martins",
      "outputPath": "sow/2026-06/empresa-xyz-monitoramento.pdf"
    }
  }
}
```

### Resposta

```json
{
  "url": "https://objectstorage.us-ashburn-1.oraclecloud.com/p/.../n/idn9vuw0dbep/b/jpx-documentos/o/sow/2026-06/empresa-xyz.pdf",
  "objectName": "sow/2026-06/empresa-xyz.pdf",
  "proposalNumber": "JPX-SOW-2026-236",
  "expiresAt": "2026-06-28T19:00:00Z"
}
```

O PDF é armazenado no bucket `jpx-documentos` (OCI, Ashburn) com uma Pre-Authenticated Request (PAR) válida por 7 dias.

---

## Templates HTML (Handlebars)

Localizados em `/srv/pdf-service/templates/` na vm-ashburn-1:

| Arquivo | Template ID | Documento |
|---|---|---|
| `proposta.html` | `proposta` | Proposta Comercial |
| `sow.html` | `sow` | Statement of Work |
| `checklist-assessment.html` | `checklist-assessment` | Checklist de Assessment |
| `checklist-implantacao.html` | `checklist-implantacao` | Checklist de Implantação |
| `onboarding-kit.html` | `onboarding-kit` | Kit de Onboarding |

Dados de preview/teste em `docs/doc-gen/_sample-data.json`.

---

## HubSpot — Propriedades customizadas do deal

| Propriedade | Tipo | Usado em |
|---|---|---|
| `service_slug` | string | todos os workflows — identifica o serviço contratado |
| `proposal_pdf_url` | string | Proposta — URL do PDF gerado |
| `proposal_sent_date` | date | Proposta — data de envio |
| `segment` | string | todos — segmento do cliente (saude, juridico...) |

---

## Como acionar manualmente

```bash
# Gerar proposta (via HubSpot stage change)
curl -X POST https://n8n.jpxdigital.com.br/webhook/gerar-proposta \
  -H 'Content-Type: application/json' \
  -d '{"objectId":"61407805236","propertyName":"dealstage","propertyValue":"1385066797"}'

# Gerar SOW
curl -X POST https://n8n.jpxdigital.com.br/webhook/gerar-sow \
  -H 'Content-Type: application/json' \
  -d '{"objectId":"61407805236"}'

# Gerar Checklist de Assessment
curl -X POST https://n8n.jpxdigital.com.br/webhook/gerar-checklist-assessment \
  -H 'Content-Type: application/json' \
  -d '{"objectId":"61407805236"}'

# Gerar Checklist de Implantação
curl -X POST https://n8n.jpxdigital.com.br/webhook/gerar-checklist-implantacao \
  -H 'Content-Type: application/json' \
  -d '{"objectId":"61407805236"}'

# Gerar Kit de Onboarding
curl -X POST https://n8n.jpxdigital.com.br/webhook/gerar-onboarding-kit \
  -H 'Content-Type: application/json' \
  -d '{"objectId":"61407805236"}'
```

---

## Pendências

- [ ] **HubSpot Workflow nativo** — configurar automação para disparar `gerar-proposta` automaticamente quando deal muda de estágio (requer scope `automation` no PAT, ou setup manual no portal)
- [ ] Configurar automações HubSpot para SOW, checklists e kit (quando a jornada do cliente estiver mapeada no CRM)
- [ ] Limpar deal de teste `61407805236` e contato `230102103635` do HubSpot
- [ ] Remover endpoint `/echo` e debug logs do PDF service (`/srv/pdf-service/server.js`)
