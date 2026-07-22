# STATUS — JPX Digital Platform

**Fonte oficial de estado do projeto.**
Última atualização: 2026-07-22

---

## Homologação — Estado Final

| Módulo | Status | Resultado |
|---|---|---|
| H1.1 Site | ✅ APROVADO | 12/12 |
| H1.2 Microsoft 365 | ✅ APROVADO | 7/7 |
| H1.3 Microsoft Bookings | ✅ APROVADO | 5/5 |
| H1.4 HubSpot | ✅ APROVADO | 5/5 |
| H1.5 n8n e Workflows | ✅ APROVADO | 7/7 |
| H1.6 PDF Service | ✅ APROVADO | 3/3 |
| H1.7 Monitoramento | ✅ APROVADO | 3/3 |
| H1.8 Segurança | ✅ APROVADO | 4/4 |
| **H1 Total** | ✅ **APROVADA** | **46/46** |
| H2.1 Formulário → HubSpot | ✅ APROVADO | 7/7 |
| H2.2 Helena Chatbot | ✅ APROVADO | 5/5 |
| H2.3 JAS WhatsApp | ✅ APROVADO | 12/12 |
| H2.4 Geração de Documentos | ✅ APROVADO | 4/4 |
| H2.5 Identidade e Integridade | ✅ APROVADO | 4/4 |
| **H2 Total** | ✅ **APROVADA** | **32/32** |
| **HOMOLOGAÇÃO GERAL** | ✅ **APROVADA** | **78/78** |

**🟢 PLATAFORMA LIBERADA PARA PROSPECÇÃO ATIVA — 2026-07-22**

---

## Resumo executivo

| Módulo | Estado | Completude |
|---|---|---|
| Site Next.js | Produção ✅ | 100% |
| Infraestrutura OCI | Produção ✅ | 95% |
| Microsoft 365 / Exchange | Produção ✅ | 100% |
| Microsoft Bookings | Produção ✅ | 100% |
| HubSpot CRM | Produção ✅ | 90% |
| n8n Automações | Produção ✅ | 85% |
| PDF Service | Produção ✅ | 100% |
| Monitoramento (Grafana) | Produção ✅ | 70% |
| JAS — Sprint 1 | Produção ✅ | 100% |
| JAS — Sprint 2 | Não iniciado | 0% |
| JMS (documentação) | Aprovado ✅ | 100% |
| Identidade Visual | Produção ✅ | 95% |

---

## Detalhe por módulo

### SITE
- **Estado:** Produção ✅
- **URL:** https://jpxdigital.com.br
- **Completude:** 100%
- **Pronto:** Next.js 15, 27 serviços, 5 segmentos, SEO, Blog, API leads, Admin, Helena (chatbot), Favicon, Logo e-mail, links externos em nova aba
- **Observação:** sala-cofre desativada (`_page.disabled`)

### INFRAESTRUTURA
- **Estado:** Produção ✅
- **Completude:** 95%
- **VMs:**
  - jpx-vm (VM1) — Site ✅
  - jpx-n8n (VM2) — n8n + JAS ✅ (migração para A1.Flex pendente)
  - vm-ashburn-1 (VM3) — PDF Service ✅
  - vm-ashburn-2 (VM4) — Monitoramento ✅
- **Pendente:** migração jpx-n8n para A1.Flex, deploy automático jas-bridge

### MICROSOFT 365 / EXCHANGE
- **Estado:** Produção ✅
- **Completude:** 100%
- **Pronto:** MX, SPF (M365 + Zoho), DKIM, DMARC, aliases, Bookings, Teams, assinatura HTML

### HUBSPOT
- **Estado:** Produção ✅
- **Completude:** 90%
- **Pronto:** Pipeline JPX (9 estágios incluindo "Proposta Solicitada"), propriedades customizadas, token ativo
- **Pendente:** WF-011/013 a adicionar no WF-009 router, views salvas

### N8N AUTOMAÇÕES
- **Estado:** Produção ✅
- **Completude:** 85%
- **Workflows ativos:** WF-001 a WF-013 (ver `governance/WORKFLOW_REGISTRY.md`)
- **Pendente:** WF-011/013 routing via WF-009, ZapSign (aguarda token API)

### JAS — JPX AI System
- **Sprint 1:** Produção ✅ (validado E2E 2026-07-22)
- **Sprint 2:** Não iniciado — qualificação conversacional com Claude
- **Regra:** não iniciar Sprint 2 antes do primeiro Assessment vendido

### MONITORAMENTO
- **Estado:** Produção ✅ (infraestrutura OK)
- **Completude:** 70%
- **Pronto:** Grafana + Prometheus + Loki ativos em vm-ashburn-2
- **Pendente:** configurar datasources no Grafana (dashboards mostram "No data")

### IDENTIDADE VISUAL
- **Estado:** Produção ✅ — 95%
- **Pronto:** Favicon, ícones PWA, logo e-mail, foto perfil M365, assinatura HTML
- **Pendente:** LinkedIn empresa + perfil João Martins

---

## Pendências abertas (não bloqueadoras)

| # | Item | Módulo | Tipo |
|---|---|---|---|
| P1 | Migração jpx-n8n para A1.Flex | Infra | Manual |
| P2 | Grafana datasources (Prometheus + Loki) | Monitoramento | Config |
| P3 | WF-011/013 routing via WF-009 | n8n | Dev |
| P4 | LinkedIn empresa JPX Digital | Comercial | Manual |
| P5 | LinkedIn perfil João Martins | Comercial | Manual |
| P6 | HubSpot views salvas | HubSpot | Manual |
| P7 | ZapSign SOW | n8n | Dev (token API) |
| P8 | Deploy automático jas-bridge | Infra | Dev |
| P9 | JAS Sprint 2 | JAS | Dev (aguarda 1º cliente) |
