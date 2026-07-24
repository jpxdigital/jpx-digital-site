# STATUS — JPX Digital Platform

**Fonte oficial de estado do projeto.**
Última atualização: 2026-07-23

---

## GO-LIVE Técnico da Plataforma

**🟢 GO-LIVE TÉCNICO APROVADO — 2026-07-22**

A plataforma passou pela homologação completa (78/78 testes). Todos os sistemas funcionam de ponta a ponta sem falhas P0.

> **Distinção importante:** GO-LIVE técnico ≠ operação comercial iniciada.
> A plataforma está homologada e pronta. A operação comercial (prospecção ativa, primeiros leads, primeiras vendas) é o objetivo da **Fase 2**, que começa agora.

---

## Homologação — Resultado Final

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

---

## Indicadores da Plataforma

| Indicador | Valor |
|---|---|
| VMs em produção | 4 |
| Workflows n8n ativos | 13 |
| Serviços publicados no site | 27 |
| Segmentos de mercado | 5 |
| Workflows homologados | 13 |
| Testes de homologação executados | 78 |
| Falhas P0 em aberto | 0 |
| Release atual | v1.5.0 |
| Plataformas integradas | 9+ |
| Documentos JMS aprovados | 24 |

---

## Resumo por Módulo

| Módulo | Estado | Descrição |
|---|---|---|
| Site Next.js | Produção ✅ | 27 serviços, 5 segmentos, SEO, Blog, Admin, Helena, formulário de leads |
| Infraestrutura OCI | Produção ✅ | 4 VMs ativas — migração jpx-n8n para A1.Flex pendente |
| Microsoft 365 / Exchange | Produção ✅ | MX, SPF, DKIM, DMARC, aliases, assinatura, foto de perfil |
| Microsoft Bookings | Produção ✅ | Página publicada, calendário sincronizado, Teams integrado, fluxo homologado |
| HubSpot CRM | Produção ✅ | Pipeline 9 estágios, propriedades customizadas, token ativo — views e dashboards a configurar |
| n8n Automações | Produção ✅ | Plataforma operacional homologada. 13 workflows ativos. Estrutura preparada para expansão. |
| PDF Service | Produção ✅ | 5 templates ativos em vm-ashburn-1 |
| Monitoramento (Grafana) | Produção ✅ | Infraestrutura operacional — datasources Prometheus/Loki a configurar |
| JAS Sprint 1 | Produção ✅ | WhatsApp → HubSpot → Telegram E2E validado em 2026-07-22 |
| JAS Sprint 2 | Não iniciado | Qualificação conversacional — aguarda primeiro Assessment vendido |
| JMS (documentação) | Aprovado ✅ | 24 documentos — base de conhecimento da operação |
| Identidade Visual | Produção ✅ | Favicon, PWA, logo e-mail, assinatura HTML, foto M365 — LinkedIn pendente |

---

## Detalhe por Módulo

### SITE
- **Estado:** Produção ✅
- **URL:** https://jpxdigital.com.br
- **Pronto:** Next.js 15, 27 serviços, 5 segmentos, SEO, Blog, API leads, Admin, Helena (chatbot), Favicon, Logo e-mail, links externos em nova aba
- **Observação:** sala-cofre desativada (`_page.disabled`)

### INFRAESTRUTURA
- **Estado:** Produção ✅ — 95%
- **VMs:**
  - jpx-vm (VM1) — Site ✅
  - jpx-n8n (VM2) — n8n + JAS ✅ (migração para A1.Flex pendente)
  - vm-ashburn-1 (VM3) — PDF Service ✅
  - vm-ashburn-2 (VM4) — Monitoramento ✅
- **Pendente:** migração jpx-n8n para A1.Flex (VM atual com 1 GB RAM, travou 2x em operação), ajuste final do monitoramento (datasources)

### MICROSOFT 365 / EXCHANGE
- **Estado:** Produção ✅
- **Pronto:** MX, SPF (M365 + Zoho), DKIM, DMARC, 10 aliases (Shared Mailboxes), Bookings, Teams, assinatura HTML, foto de perfil

### MICROSOFT BOOKINGS
- **Estado:** Produção ✅ — 100% funcional (homologado)
- **Pronto:**
  - Página de agendamento publicada
  - Calendário sincronizado com M365
  - Teams integrado (reunião gerada automaticamente)
  - E-mail de confirmação funcionando
  - Fluxo validado em homologação H1.3 (5/5)

### HUBSPOT
- **Estado:** Produção ✅ — 90%
- **Pronto:** Pipeline JPX (9 estágios), propriedades customizadas, token ativo (rotacionado 2026-06-29)
- **Pendente:** views definitivas de prospecção, dashboards de pipeline, refinamento de automações com base em uso comercial real

### N8N AUTOMAÇÕES
- **Estado:** Produção ✅
- **Plataforma operacional homologada. 13 workflows ativos. Estrutura preparada para expansão.**
- **Workflows ativos:** WF-001 a WF-013 (ver `governance/WORKFLOW_REGISTRY.md`)
- **Pendente:** WF-011/013 routing via WF-009 (closedwon), ZapSign (aguarda token API)

### JAS — JPX AI System
- **Sprint 1:** Produção ✅ — validado E2E 2026-07-22
- **Sprint 2:** Não iniciado — qualificação conversacional com Claude
- **Regra inviolável:** não iniciar Sprint 2 antes do primeiro Assessment vendido

### PDF SERVICE
- **Estado:** Produção ✅
- **Templates:** Proposta, SOW, Checklist Assessment, Checklist Implantação, Kit Onboarding
- **Host:** vm-ashburn-1

### MONITORAMENTO
- **Estado:** Produção ✅ (infraestrutura pronta)
- **Pronto:** Grafana + Prometheus + Loki ativos em vm-ashburn-2
- **Pendente:** configurar datasources no Grafana (dashboards mostram "No data")

### IDENTIDADE VISUAL
- **Estado:** Produção ✅ — 95%
- **Pronto:** Favicon, ícones PWA, logo e-mail, foto perfil M365, assinatura HTML
- **Pendente:** LinkedIn empresa JPX Digital + perfil João Martins

---

## Fase 2 — Próxima Missão

O foco mudou: a plataforma já existe. O desafio agora é **validar o modelo comercial**.

| Objetivo | Entrega |
|---|---|
| Posicionamento institucional | LinkedIn empresa + perfil João Martins |
| Material comercial premium | Playbook Comercial (`governance/PLAYBOOK-COMERCIAL.md`) |
| Processo de venda | Assessment Executivo como porta de entrada |
| Comunicação | Templates de e-mail institucional revisados |
| Pipeline inicial | Lista Econodata SP Oeste — 10 empresas Score A |
| Primeiros contatos | Reuniões comerciais — meta: 3 assessments em 60 dias |
| Métricas reais | Dados para evolução do JAS Sprint 2 |

---

## Pendências Técnicas (não bloqueantes)

| # | Item | Módulo | Prioridade |
|---|---|---|---|
| P1 | Migração jpx-n8n para A1.Flex | Infra | Alta — VM com 1 GB RAM é risco operacional |
| P2 | Grafana datasources (Prometheus + Loki) | Monitoramento | Média |
| P3 | WF-011/013 routing via WF-009 | n8n | Média |
| P4 | LinkedIn empresa JPX Digital | Comercial | Fase 2 |
| P5 | LinkedIn perfil João Martins | Comercial | Fase 2 |
| P6 | HubSpot views definitivas e dashboards | HubSpot | Fase 2 |
| P7 | ZapSign SOW | n8n | Aguarda token API |
| P8 | Deploy automático jas-bridge | Infra | Baixa |
| P9 | JAS Sprint 2 | JAS | Aguarda 1º cliente |
