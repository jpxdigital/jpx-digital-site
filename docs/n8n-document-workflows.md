# Workflows n8n — JPX Digital

Documentação dos workflows ativos: 1 de captura de leads, 1 de agendamento Cal.com, 1 router HubSpot e 5 de geração automática de PDFs.

**n8n:** https://n8n.jpxdigital.com.br (v2.23.4) · **DB:** PostgreSQL 16

---

## Visão geral

O HubSpot envia **todos** os eventos de `dealstage` para um único webhook router. O router despacha internamente para o workflow correto via HTTP (localhost). Cada workflow também pode ser acionado manualmente via curl.

```
HubSpot (dealstage change)
        │
        ▼
  /webhook/hubspot-deals  ← URL configurada no HubSpot Private App
  (HubSpot — Deal Stage Router)   ID: fPRIQp8WawTEZQ9V
        │
        ├── propertyValue = 1385066797 ──► /webhook/gerar-proposta   (Proposta Solicitada)
        ├── propertyValue = closedwon  ──► /webhook/gerar-sow        (Fechado/Ganho)
        │
        │   ── Stages futuros (requer criação no pipeline HubSpot) ──
        ├── propertyValue = <stage-assessment>   ──► /webhook/gerar-checklist-assessment
        ├── propertyValue = <stage-implantacao>  ──► /webhook/gerar-checklist-implantacao
        └── propertyValue = <stage-onboarding>   ──► /webhook/gerar-onboarding-kit

  n8n (webhook de cada workflow)
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
| Telegram 400 "can't parse entities" | URLs OCI têm underscores — Telegram tenta parsear como Markdown | `additionalFields.parse_mode: ''` no nó Telegram |
| Telegram "invalid syntax" | Emojis em expressões `={{ }}` | Texto sem emojis no campo `text` |
| `$env.TELEGRAM_CHAT_ID` não resolve | Variável não propagada no runner | Hardcode: `8384975992` |
| JS Task Runner: token expirado em 30s | TTL padrão muito curto | `N8N_RUNNERS_GRANT_TOKEN_TTL=120` no docker-compose |

---

## Banco de dados — PostgreSQL

Migrado de SQLite para PostgreSQL 16 em 2026-06-22.

- Container: `n8n-postgres` · Banco: `n8n` · User: `n8n`
- Volume: `n8n_pg_data` (persistente)

### Atenção ao migrar ou restaurar

Após migrar dados para PostgreSQL, dois campos podem ficar NULL e impedir o registro de webhooks:

```sql
-- 1. Preencher activeVersionId (pode ficar NULL após migração)
UPDATE workflow_entity
SET "activeVersionId" = "versionId"
WHERE active = true AND "activeVersionId" IS NULL;

-- 2. Popular workflow_published_version (n8n 2.x exige versão publicada)
INSERT INTO workflow_published_version ("workflowId", "publishedVersionId", "createdAt", "updatedAt")
SELECT id, "versionId", NOW(), NOW()
FROM workflow_entity
WHERE active = true
ON CONFLICT ("workflowId") DO UPDATE
  SET "publishedVersionId" = EXCLUDED."publishedVersionId",
      "updatedAt" = NOW();
```

Após executar os SQLs, reiniciar o n8n. No boot, o log deve mostrar:
```
Finished building workflow dependency index. Processed 0 draft workflows, 6 published workflows.
Activated workflow "..." (ID: ...)
```

Se ainda mostrar `0 published workflows`, verificar se `workflow_history` contém os `versionId` referenciados.

---

## Router — HubSpot — Deal Stage Router

**ID:** `fPRIQp8WawTEZQ9V`
**Webhook:** `POST /webhook/hubspot-deals`
**Trigger:** HubSpot Private App — assinatura `deal.propertyChange` → `dealstage`

### Função

Ponto de entrada único para todos os eventos de mudança de stage no HubSpot. Evita configurar múltiplos webhooks no HubSpot (que só aceita uma URL por Private App). O router lê `body[0].propertyValue` e faz um POST interno para o webhook do workflow correto via `http://localhost:5678/webhook/<path>`.

### Stages ativos

| Stage HubSpot | ID / valor | Workflow acionado |
|---|---|---|
| Proposta Solicitada | `1385066797` | `gerar-proposta` |
| Fechado/Ganho | `closedwon` | `gerar-sow` |

Qualquer outro stage é ignorado silenciosamente (sem erro).

### Como adicionar um novo stage

1. **Criar o stage no HubSpot** — Pipeline → Editar → Adicionar estágio (ex: "Em Assessment")
2. **Copiar o ID do stage** — visível na URL ou via API: `GET /crm/v3/pipelines/deals`
3. **Adicionar IF + HTTP node no router** no n8n:
   - IF: `$json.body[0].propertyValue === '<id-do-stage>'`
   - HTTP POST: `http://localhost:5678/webhook/gerar-checklist-assessment`
4. Salvar e o router já passa a despachar o novo stage

### Stages planejados (sem stage HubSpot criado ainda)

| Fase | Workflow alvo | Status |
|---|---|---|
| Em Assessment | `gerar-checklist-assessment` | 🔵 aguarda stage no HubSpot |
| Em Implantação | `gerar-checklist-implantacao` | 🔵 aguarda stage no HubSpot |
| Em Onboarding | `gerar-onboarding-kit` | 🔵 aguarda stage no HubSpot |

> Enquanto os stages não existem no pipeline, esses workflows continuam sendo acionados manualmente via curl (ver seção "Como acionar manualmente").

### Payload recebido (formato HubSpot)

```json
[{
  "objectId": "61407805236",
  "propertyName": "dealstage",
  "propertyValue": "closedwon",
  "appId": 51571768
}]
```

O router extrai `body[0].propertyValue` para roteamento e encaminha o array original para o sub-workflow.

---

## 0. Boas-vindas — Lead JPX Digital

**ID:** `wEQaaMyFdumbc94E`
**Webhook produção:** `POST /webhook/jpx-lead`
**Trigger:** `/api/leads` do site Next.js (fire-and-forget)

### Payload esperado

```json
{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "phone": "11999999999",
  "interest": "monitoramento",
  "message": "Quero saber mais sobre o serviço"
}
```

### Nós (4)

| # | Nome | Tipo | Descrição |
|---|---|---|---|
| 1 | Webhook | Webhook | `POST /webhook/jpx-lead` |
| 2 | Montar E-mail | Set | Monta variáveis `name`, `email`, `phone`, `interest`, `message` para uso nos nós seguintes |
| 3 | Zoho SMTP — Boas-vindas | E-mail | Envia e-mail de boas-vindas ao lead via `jp@jpxdigital.com.br` |
| 4 | Telegram — Notificação interna | Telegram | Chat `8384975992` — notifica novo lead com dados preenchidos |

---

## 1. JPX — Gerar Proposta Comercial

**ID:** `83e497fe-12ce-45e1-b571-ccb60e8e435b`  
**Webhook produção:** `POST /webhook/gerar-proposta`  
**Template PDF:** `proposta`  
**Pasta OCI:** `propostas/{ano-mes}/`

### Trigger

Disparado automaticamente pelo **HubSpot Private App Webhook** quando um deal muda para o estágio **"Proposta Solicitada"** (ID: `1385066797`).

- HubSpot Private App ID: `51571768`
- Assinatura: `deal.propertyChange` → propriedade `dealstage`
- URL do webhook: `https://n8n.jpxdigital.com.br/webhook/gerar-proposta`

O HubSpot envia um array — o workflow lê `body[0].objectId` e `body[0].propertyValue`.

Payload recebido:
```json
[{
  "objectId": "61407805236",
  "propertyName": "dealstage",
  "propertyValue": "1385066797",
  "appId": 51571768
}]
```

**Requisitos do deal para o workflow funcionar:**
- Ter um contato associado (associação v4 HubSpot)
- Propriedade `service_slug` preenchida

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

## Próximo: ZapSign — Assinatura Digital do SOW

**Status:** 🔵 Aguardando token da API (conta ainda não criada — 2026-06-24)

### Contexto

Após o SOW ser gerado e carregado no OCI, o cliente ainda precisa assinar manualmente. O ZapSign automatiza isso: recebe a URL do PDF, cria o documento para assinatura e envia o link por e-mail ao cliente sem intervenção humana.

### O que criar na conta ZapSign

1. Acessar **zapsign.com.br** → criar conta
2. Dashboard → **Integrações** → **API** → copiar o **Token de API**

### Modificação no workflow `dy8FELtqgO7g99pP` (JPX — Gerar SOW)

Inserir **3 novos nós** entre "Gerar PDF" e "Telegram":

```
Gerar PDF — pdf.jpxdigital.com.br
  │
  ▼
[NOVO] ZapSign — Criar documento
  POST https://api.zapsign.com.br/api/v1/docs/
  Body:
  {
    "name": "SOW — <empresa>",
    "url_pdf": "<url OCI do PDF>",
    "signers": [{ "name": "<nome contato>", "email": "<email contato>" }],
    "send_automatic_email": true,
    "lang": "pt-br"
  }
  Retorna: { doc_token, signers[0].link }
  │
  ▼
[NOVO] HubSpot — Atualizar deal com link ZapSign
  PATCH /crm/v3/objects/deals/<dealId>
  Body: { "properties": { "sow_zapsign_link": "<link>" } }
  (requer propriedade custom criada no HubSpot)
  │
  ▼
Telegram — Notificação interna  ← atualizar texto para incluir link ZapSign
```

### Propriedade custom necessária no HubSpot

Criar em HubSpot → Configurações → Propriedades → Deals:
- **Nome interno:** `sow_zapsign_link`
- **Tipo:** Texto de linha única
- **Rótulo:** SOW — Link de Assinatura (ZapSign)

### Credencial n8n a criar

Após ter o token, criar em n8n → Credentials → Header Auth:
- **Name:** `ZapSign API`
- **Name (header):** `Authorization`
- **Value:** `Bearer <TOKEN>`

---

## Pendências

- [x] **HubSpot trigger para `gerar-proposta`** — ✅ configurado e testado end-to-end (2026-06-22)
- [x] **HubSpot trigger para `gerar-sow`** — ✅ via router `/webhook/hubspot-deals`, dispara em `closedwon`
- [ ] **ZapSign — assinatura digital SOW** — criar conta em zapsign.com.br → obter token → implementar (ver seção acima)
- [ ] **Stages Assessment / Implantação / Onboarding no HubSpot** — criar stages no pipeline → adicionar IF+HTTP no router → automação completa (ver seção Router)
- [ ] Limpar deal de teste `61407805236` e contato `230102103635` do HubSpot
- [ ] Remover endpoint `/echo` e debug logs do PDF service (`/srv/pdf-service/server.js`)
