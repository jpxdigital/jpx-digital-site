# Roadmap de Integrações n8n — JPX Digital

Integrações e workflows identificados como próximos passos, organizados por fase da jornada do cliente e prioridade.

Stack atual: HubSpot CRM · n8n v2.23.4 · PDF Service · Zoho SMTP · Telegram Bot · Evolution API (instalada, sem uso)

---

## Fase 1 — Prospecção / Lead

| App | Integração | Para quê | Prioridade |
|---|---|---|---|
| **Cal.com** | Webhook → n8n → HubSpot | Reunião agendada cria deal automaticamente no HubSpot + notifica Telegram | Alta |
| **LinkedIn** | n8n node nativo | Capturar mensagens diretas → criar contato no HubSpot | Média |
| **Google Sheets** | n8n node nativo | Pipeline de leads em planilha como backup do CRM | Baixa |

---

## Fase 2 — Proposta → Fechamento

| App | Integração | Para quê | Prioridade |
|---|---|---|---|
| **WhatsApp (Evolution API)** | Já instalado na jpx-n8n :8080 | Enviar proposta por WhatsApp com link do PDF — taxa de abertura superior ao e-mail | Alta |
| **ZapSign** | HTTP Request no n8n após gerar SOW | Assinatura digital brasileira do SOW e contrato — URL do doc assinado gravada no HubSpot | Alta |
| **Stripe / Pagar.me** | HTTP Request após proposta aceita | Gerar link de pagamento de entrada automaticamente | Média |

---

## Fase 3 — Onboarding / Implantação

| App | Integração | Para quê | Prioridade |
|---|---|---|---|
| **ClickUp / Trello / Notion** | API REST via n8n | Criar projeto automaticamente quando deal fecha, com tarefas do checklist de implantação pré-populadas | Alta |
| **Google Drive** | n8n node nativo | Criar pasta do cliente com documentos gerados (proposta, SOW, checklist) organizados automaticamente | Média |
| **Slack** | n8n node nativo | Canal do projeto criado automaticamente, notificações de marcos | Baixa |

---

## Fase 4 — Suporte / Pós-venda

| App | Integração | Para quê | Prioridade |
|---|---|---|---|
| **NPS (Tally / Typeform)** | Webhook → n8n → HubSpot | Pesquisa de satisfação 30 dias pós-implantação, resultado gravado no deal do HubSpot | Alta |
| **Alertas de vencimento de certificados** | Cron n8n → HubSpot → Telegram/WhatsApp | Notificar cliente e equipe 60/30/7 dias antes do vencimento de certificados ICP-Brasil | Alta |
| **Freshdesk / Zendesk** | Webhook de e-mail → n8n | Abrir ticket automaticamente quando cliente responde e-mail com assunto específico | Média |

---

## Operação interna / Alertas

| App | Integração | Para quê | Prioridade |
|---|---|---|---|
| **Grafana Webhooks → n8n** | Alert Manager → n8n → Telegram | Incidente detectado no Prometheus cria ticket + notifica Telegram em tempo real | Alta |
| **GitHub Actions → n8n** | Webhook de deploy → n8n → Telegram | Deploy concluído ou falha notificado no Telegram | Média |
| **Cron n8n — relatório semanal** | Cron → HubSpot API → Telegram | Toda segunda-feira: deals por estágio, propostas enviadas, conversão da semana | Média |

---

## Evolution API — decisão pendente

Está instalada e rodando em `jpx-n8n` (porta 8080, PostgreSQL ativo), consumindo ~150 MB de RAM sem uso.

**Opção A — Ativar:** conectar um número WhatsApp e usar para envio de proposta + onboarding + NPS. Retorno imediato alto.

**Opção B — Desligar:** `docker compose down evolution evolution_db` — libera ~150 MB RAM e simplifica a VM.

Decidir antes de configurar qualquer workflow de WhatsApp.

---

## Próximos 3 passos recomendados

Em ordem de esforço vs. retorno:

1. **WhatsApp via Evolution API** — infraestrutura já existe, só precisa de número conectado e um workflow no n8n para enviar o PDF da proposta por WhatsApp após geração.

2. **Cal.com** — open source, pode ser self-hosted na jpx-n8n ou usar o cloud gratuito. Webhook de reunião agendada → deal HubSpot → Telegram. Elimina etapa manual do comercial.

3. **ZapSign** — API REST simples, plano pago mas baixo custo. Integra via HTTP Request no n8n logo após a geração do SOW. URL do documento assinado volta para o HubSpot.

---

## HubSpot — workflow nativo pendente

Configurar no HubSpot (Automações → Workflows) para disparar o webhook de produção automaticamente:

```
Trigger: Deal — dealstage muda para "Proposta Solicitada" (ID: 1385066797)
Ação: Webhook POST https://n8n.jpxdigital.com.br/webhook/gerar-proposta
Body: {"objectId":"{{dealId}}","propertyName":"dealstage","propertyValue":"1385066797"}
```

Requer scope `automation` no HubSpot PAT, ou configuração manual no portal HubSpot.
