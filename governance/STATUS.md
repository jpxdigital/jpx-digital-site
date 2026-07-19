# STATUS — JPX Digital Platform

**Fonte oficial de estado do projeto.**
Última atualização: 2026-07-14

---

## Homologação H1 — Progresso

| Módulo | Status | Falhas P0 | Falhas P2 |
|---|---|---|---|
| H1.1 Site | ✅ APROVADO | 0 | 1 (Schema.org — corrigido) |
| H1.2 Microsoft 365 | 🟠 6/7 | 0 — P0 resolvido (016 ✅ 2026-07-19) | 0 |
| H1.3 Microsoft Bookings | ⬜ Pendente | — | — |
| H1.4 HubSpot | ⬜ Pendente | — | — |
| H1.5 n8n e Workflows | ⬜ Pendente | — | — |
| H1.6 PDF Service | ⬜ Pendente | — | — |
| H1.7 Monitoramento | ⬜ Pendente | — | — |
| H1.8 Segurança | ⬜ Pendente | — | — |

**Progresso H1: H1.1 ✅ H1.2 🟠 (6/7, aguarda 019 Teams) H1.5 ✅ — P0 Exchange resolvido**
**Última atualização:** 2026-07-19

---

## Resumo executivo

| Módulo | Estado | Completude | Sprint |
|---|---|---|---|
| Site Next.js | Produção | 95% | — |
| Infraestrutura OCI | Produção | 95% | — |
| Microsoft 365 / Exchange | Produção | 95% | — |
| HubSpot CRM | Produção | 85% | — |
| n8n Automações | Produção | 80% | — |
| PDF Service | Produção | 100% | — |
| Monitoramento (Grafana) | Produção | 90% | — |
| JAS — Sprint 1 | Produção | 100% | Sprint 1 ✅ |
| JAS — Sprint 2 | Não iniciado | 0% | Sprint 2 |
| JMS (documentação) | Aprovado | 100% | — |
| Identidade Visual | Produção | 95% | — |

---

## Detalhe por módulo

### SITE
- **Estado:** Produção
- **URL:** https://jpxdigital.com.br
- **Completude:** 95%
- **Pronto:** Next.js 15, 27 serviços, 5 segmentos, SEO, Blog, API leads, Admin, Helena (chatbot), Favicon, Logo e-mail
- **Pendente:** nenhum bloqueador crítico
- **Observação:** sala-cofre desativada (`_page.disabled`)

### INFRAESTRUTURA
- **Estado:** Produção
- **Completude:** 95%
- **VMs:**
  - jpx-vm (VM1) — Site ✅
  - jpx-n8n (VM2) — n8n + JAS ✅
  - vm-ashburn-1 (VM3) — PDF Service ✅
  - vm-ashburn-2 (VM4) — Monitoramento ✅
- **Pendente:** workflow de deploy automático para jpx-n8n (jas-bridge ainda é manual via SCP)

### MICROSOFT 365 / EXCHANGE
- **Estado:** Produção
- **Completude:** 95%
- **Pronto:** MX, SPF, DKIM, DMARC, 10 aliases, Cal.com, Bookings, Teams
- **Pendente:** Assinatura e-mail instalada no Outlook (HTML criado, instalação manual pendente)

### HUBSPOT
- **Estado:** Produção
- **Completude:** 85%
- **Pronto:** Pipeline 8 estágios, propriedades customizadas, token ativo
- **Pendente:** Views salvas (manual — JMS-COM-004 seção 5)

### N8N AUTOMAÇÕES
- **Estado:** Produção
- **Completude:** 80%
- **Workflows ativos:** ver `governance/WORKFLOW_REGISTRY.md`
- **Pendente:** ZapSign (aguarda token API), jas-qa-scenario-002

### JAS — JPX AI System
- **Sprint 1:** Produção ✅ (validado E2E 2026-07-13)
- **Sprint 2:** Não iniciado — qualificação conversacional com Claude
- **Sprint 3:** Não iniciado — RAG JMS + agentes técnico e documental
- **Sprint 4:** Não iniciado — agente executivo + dashboard + aprovação assistida
- **Regra:** não iniciar Sprint 2 antes do primeiro Assessment vendido

### IDENTIDADE VISUAL
- **Estado:** Produção — 95%
- **Pronto:** Favicon, ícones PWA, logo e-mail, foto perfil M365, assinatura HTML
- **Pendente:** LinkedIn empresa + perfil João Martins

---

## Pendências abertas (por prioridade)

| # | Item | Módulo | Tipo | Bloqueador |
|---|---|---|---|---|
| P1 | Instalar assinatura Outlook | M365 | Manual | Não |
| P2 | LinkedIn empresa JPX Digital | Comercial | Manual | Não |
| P3 | LinkedIn perfil João Martins | Comercial | Manual | Não |
| P4 | HubSpot views salvas | HubSpot | Manual | Não |
| P5 | ZapSign SOW | n8n | Dev | Token API |
| P6 | Checklist homologação (~100 testes) | QA | Manual | Não |
| P7 | Prospecção ativa (Econodata) | Comercial | Manual | Não |
| P8 | Deploy automático jas-bridge | Infra | Dev | Não |
| P9 | JAS Sprint 2 | JAS | Dev | Primeiro cliente |
