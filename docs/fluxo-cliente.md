# Jornada do Cliente — JPX Digital

Mapeamento completo do fluxo desde o primeiro contato até o projeto entregue, com os sistemas envolvidos em cada etapa.

---

## Visão geral do funil

```
Lead (formulário)
  │
  ▼
Contato no HubSpot
  │
  ▼
Reunião de diagnóstico (manual)
  │
  ▼
Deal criado no HubSpot
  │
  ├── Estágio: Proposta Solicitada ──► Workflow gerar-proposta (automático)
  │
  ├── Estágio: Proposta Enviada ──────► (aguarda resposta do cliente)
  │
  ├── Estágio: Negociação ────────────► (manual)
  │
  ├── Estágio: Fechado/Ganho ─────────► Router → Workflow gerar-sow (automático ✅)
  │
  ├── Fase: Assessment ───────────────► Workflow gerar-checklist-assessment (manual)
  │
  ├── Fase: Implantação ──────────────► Workflow gerar-checklist-implantacao (manual)
  │
  └── Fase: Onboarding ──────────────► Workflow gerar-onboarding-kit (manual)
```

---

## Etapa 1 — Lead entra pelo formulário

**Sistema:** Site Next.js (`/api/leads`) + n8n (`/webhook/jpx-lead`)

O visitante preenche o formulário em `jpxdigital.com.br`. O backend:

1. Valida campos obrigatórios e formato de e-mail
2. Valida MX do domínio (rejeita e-mails sem DNS de e-mail válido)
3. Verifica Cloudflare Turnstile (anti-spam)
4. Cria contato no HubSpot via API (Private App)
5. Dispara `POST /webhook/jpx-lead` no n8n (fire-and-forget)

**n8n — Workflow "Boas-vindas — Lead JPX Digital":**
- Envia e-mail de boas-vindas ao lead (Zoho SMTP)
- Notifica equipe via Telegram com todos os dados

**O que fazer após receber o lead:**
- [ ] Ver lead no HubSpot (aba Contatos)
- [ ] Qualificar: é ICP? (porte, segmento, dor)
- [ ] Se qualificado → criar Deal e agendar reunião

---

## Etapa 2 — Reunião de diagnóstico

**Sistema:** Cal.com ✅ (automatizado 2026-06-24)

Agendar reunião com o prospect para entender a dor, o contexto técnico e o orçamento.

**Saída esperada:**
- Serviço/solução identificado (escolher o `service_slug` correto)
- Budget confirmado
- Tomador de decisão identificado

**No HubSpot:**
- Criar Deal se ainda não existir
- Preencher `service_slug` no deal (campo customizado — obrigatório para geração de proposta)
- Associar o contato principal ao deal

---

## Etapa 3 — Proposta Comercial (automático)

**Sistema:** HubSpot Webhook → n8n → PDF Service → OCI → Zoho SMTP

Quando o deal avança para o estágio **"Proposta Solicitada"** no HubSpot, o processo é automático:

1. HubSpot dispara webhook para `https://n8n.jpxdigital.com.br/webhook/gerar-proposta`
2. n8n busca dados do deal e do contato no HubSpot
3. n8n busca o JSON do serviço em `jpxdigital.com.br/api/services/{service_slug}`
4. PDF Service gera o PDF e faz upload no OCI Object Storage
5. n8n atualiza o deal com `proposal_pdf_url` e `proposal_sent_date`
6. n8n envia o PDF por e-mail ao contato (Zoho SMTP via `jp@jpxdigital.com.br`)
7. n8n notifica equipe no Telegram com link do PDF
8. Deal avança automaticamente para **"Proposta Enviada"**

**Pré-requisitos para funcionar:**
- Deal tem `service_slug` preenchido
- Deal tem contato associado com e-mail válido

**Acionar manualmente (se necessário):**
```bash
curl -X POST https://n8n.jpxdigital.com.br/webhook/gerar-proposta \
  -H 'Content-Type: application/json' \
  -d '[{"objectId":"DEAL_ID","propertyName":"dealstage","propertyValue":"1385066797"}]'
```

---

## Etapa 4 — Negociação e Fechamento

**Sistema:** HubSpot (manual)

- Acompanhar respostas do prospect
- Ajustar proposta se necessário (regerar PDF e reenviar manualmente)
- Registrar atividades no HubSpot (calls, e-mails, reuniões)
- Quando aceito: avançar deal para **"Fechado/Ganho"**

---

## Etapa 5 — Statement of Work (manual)

**Sistema:** n8n Webhook `POST /webhook/gerar-sow`

Após fechamento, gerar o SOW que detalha escopo, cronograma e responsabilidades.

```bash
curl -X POST https://n8n.jpxdigital.com.br/webhook/gerar-sow \
  -H 'Content-Type: application/json' \
  -d '{"objectId":"DEAL_ID"}'
```

O PDF é gerado, salvo no OCI (`sow/{ano-mes}/`) e enviado via Telegram.

**Futuro — ZapSign:** após gerar o SOW, enviar link de assinatura digital automaticamente.

---

## Etapa 6 — Assessment Técnico (manual)

**Sistema:** n8n Webhook `POST /webhook/gerar-checklist-assessment`

Checklist de levantamento técnico para entender a infraestrutura atual do cliente.

```bash
curl -X POST https://n8n.jpxdigital.com.br/webhook/gerar-checklist-assessment \
  -H 'Content-Type: application/json' \
  -d '{"objectId":"DEAL_ID"}'
```

PDF salvo no OCI (`checklists/assessment/{ano-mes}/`).

---

## Etapa 7 — Implantação (manual)

**Sistema:** n8n Webhook `POST /webhook/gerar-checklist-implantacao`

Checklist de execução da implantação com os itens do serviço contratado.

```bash
curl -X POST https://n8n.jpxdigital.com.br/webhook/gerar-checklist-implantacao \
  -H 'Content-Type: application/json' \
  -d '{"objectId":"DEAL_ID"}'
```

PDF salvo no OCI (`checklists/implantacao/{ano-mes}/`).

---

## Etapa 8 — Onboarding (manual)

**Sistema:** n8n Webhook `POST /webhook/gerar-onboarding-kit`

Kit de onboarding com materiais de boas-vindas, acessos e próximos passos para o cliente.

```bash
curl -X POST https://n8n.jpxdigital.com.br/webhook/gerar-onboarding-kit \
  -H 'Content-Type: application/json' \
  -d '{"objectId":"DEAL_ID"}'
```

PDF salvo no OCI (`onboarding/{ano-mes}/`).

---

## Tabela de status por etapa

| Etapa | Status | Sistema | Trigger |
|---|---|---|---|
| Lead entra | ✅ Automático | Site + n8n | Formulário |
| Boas-vindas e-mail | ✅ Automático | n8n + Zoho | Lead no site |
| Notificação Telegram | ✅ Automático | n8n | Lead no site |
| Reunião agendada | ✅ Automático | Cal.com + n8n | Webhook Cal.com |
| Deal criado | ✅ Automático | n8n → HubSpot | Junto com agendamento |
| Proposta gerada | ✅ Automático | n8n + PDF Service | HubSpot stage |
| Proposta enviada por e-mail | ✅ Automático | n8n + Zoho | Junto com geração |
| SOW gerado | ✅ Automático | n8n + PDF Service | HubSpot dealstage: closedwon (via Router) |
| Assinatura digital SOW | 🔵 Pendente | ZapSign | Próximo passo |
| Checklist Assessment | 🟡 Semi-manual | n8n + PDF Service | Aguarda stage HubSpot |
| Checklist Implantação | 🟡 Semi-manual | n8n + PDF Service | Aguarda stage HubSpot |
| Kit Onboarding | 🟡 Semi-manual | n8n + PDF Service | Aguarda stage HubSpot |

---

## HubSpot — Estágios do pipeline

| ID | Nome | Gatilho automático |
|---|---|---|
| `appointmentscheduled` | Reunião Agendada | — |
| `1385066797` | Proposta Solicitada | Dispara `gerar-proposta` |
| `1385078826` | Proposta Enviada | Setado pelo workflow |
| `decisionmakerboughtin` | Em Negociação | — |
| `closedwon` | Fechado/Ganho | Dispara `gerar-sow` (via Router) |
| `closedlost` | Fechado/Perdido | — |

---

## O que o deal precisa ter antes de gerar proposta

1. **`service_slug`** preenchido — identifica qual JSON de serviço usar
2. **Contato associado** com e-mail válido — para enviar a proposta
3. **Deal no estágio "Proposta Solicitada"** — ou acionar manualmente via curl

Sem esses três elementos, o workflow falha no nó de busca de dados.
