# FLUXO COMERCIAL — JPX Digital

Mapeamento completo do ciclo LinkedIn → Cliente Ativo.
Última atualização: 2026-07-26

Diagrama visual: `docs/fluxo-comercial-jpx.png`

---

## Visão geral

```
ATRAÇÃO → CAPTAÇÃO → AGENDAMENTO → ASSESSMENT → PROPOSTA → NEGOCIAÇÃO → ASSINATURA → ONBOARDING
```

---

## Etapas detalhadas

### 1. ATRAÇÃO

| Canal | Descrição |
|---|---|
| LinkedIn | Página JPX Digital + Perfil João Martins — conteúdo técnico 2x/semana |
| Site jpxdigital.com.br | Formulário de contato + ChatBot Helena |
| WhatsApp / JAS | WF-001 Core Intake — qualificação conversacional via IA |
| Indicação | Rede de contatos do João |

---

### 2. CAPTAÇÃO

| Sistema | Workflow | Ação |
|---|---|---|
| HubSpot | WF-009 Deal Router | Deal criado automaticamente no pipeline |
| E-mail | WF-006 Boas-vindas Lead | E-mail automático para o lead |
| Telegram | — | Notificação imediata para João |

---

### 3. AGENDAMENTO

| Sistema | Workflow | Ação |
|---|---|---|
| Microsoft Bookings / Cal.com | WF-008 Cal.com Booking | Lead agenda assessment diretamente |

---

### 4. ASSESSMENT

| Sistema | Workflow | Ação |
|---|---|---|
| n8n | WF-011 Checklist Assessment | Checklist de diagnóstico gerado automaticamente |

Duração: 60–90 minutos
Entregável: mapa de riscos + roadmap priorizado

---

### 5. PROPOSTA

| Sistema | Workflow | Ação |
|---|---|---|
| n8n + PDF Service | WF-004 Gerar Proposta PDF | Relatório PDF gerado automaticamente |
| n8n | WF-005 Proposta Comercial | Dados da proposta estruturados |

---

### 6. NEGOCIAÇÃO

| Cenário | Workflow | Ação |
|---|---|---|
| Cliente aceita | WF-010 Gerar SOW | Contrato de escopo gerado |
| Sem resposta em 7 dias | WF-014 Follow-up Proposta | E-mail de cobrança automático → retorna para Proposta |

---

### 7. ASSINATURA

| Sistema | Workflow | Estado |
|---|---|---|
| ZapSign | WF-015 ZapSign Assinatura SOW | ⚠️ Pendente — aguarda token API |

---

### 8. ONBOARDING

| Sistema | Workflow | Ação |
|---|---|---|
| n8n | WF-013 Kit Onboarding | Kit completo enviado ao cliente |

Resultado: **Cliente Ativo** no pipeline HubSpot

---

## Pendências do fluxo

| Item | Bloqueador | Prioridade |
|---|---|---|
| WF-015 ZapSign | Token API ZapSign pendente | P3 |

---

## Métricas do funil (metas Fase 2)

| Etapa | Meta |
|---|---|
| Leads captados | 25 empresas Score A prospectadas |
| Assessments agendados | 3 |
| Propostas enviadas | 3 |
| Contratos assinados | 1 (primeiro cliente recorrente) |
