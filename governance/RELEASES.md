# RELEASES — JPX Digital Platform

O que entrou em produção, por versão.
Cada release é um marco de estabilidade — não toda mudança vira release.

---

## v1.5.0 — GO-LIVE Técnico (2026-07-22)

**Módulos:** Homologação, n8n, HubSpot, JAS, Site, Governança

- Homologação completa: 78/78 testes aprovados, zero falhas P0
- H1 Técnica (46/46): Site, M365, Bookings, HubSpot, n8n, PDF, Monitoramento, Segurança
- H2 Comercial (32/32): Formulário→HubSpot, Helena, JAS WhatsApp, Geração Docs, Identidade
- WF-011/013: expressão URL corrigida (`body[0].objectId` + fallback `body.deal_id`)
- HubSpot: estágio "Proposta Solicitada" criado, stage IDs corrigidos em WF-004/009
- WF-004/006: credencial trocada de Resend para Zoho SMTP
- Helena: links externos (Bookings, WhatsApp) abrem em nova aba
- JAS: sessão antiga limpa, número +55 18 98189-0607 validado E2E
- Governança: Fase 1 encerrada, Fase 2 aberta, Playbook Comercial criado

**Baseline congelada.** A partir desta versão toda mudança segue o ciclo: CHANGELOG → implementar → Gold Path → Homologation Report → RELEASES.

---

## v1.4.0 — Governança e Identidade (2026-07-13)

**Módulos:** Governança, Identidade Visual, M365, JAS, Legal

- Criada camada de governança (`governance/`)
- Razão social corrigida: JPX Digital Tecnologia LTDA / CNPJ 57.454.973/0001-18
- Assinatura de e-mail HTML (`public/assinatura-joao.html`)
- Helena: CTAs duplos (Bookings + WhatsApp)
- JAS: mensagem de link personalizada por serviço
- JAS: fluxo E2E validado com Microsoft Bookings
- Favicon + ícones PWA texto JPX

---

## v1.3.0 — JAS Sprint 1 Completo (2026-07-03 a 2026-07-07)

**Módulos:** JAS, Microsoft 365, JMS

- JAS Sprint 1: intake E2E (WhatsApp → HubSpot → Telegram) ✅
- Máquina de estados: NEW → MENU → COLETANDO_NOME → COLETANDO_EMPRESA → LINK_ENVIADO
- LID fix: suporte a contatos @lid no Baileys
- JAS-QA Cenário 001 com Smoke Test (PASS em 22s)
- Microsoft 365 migração completa (MX, SPF, DKIM, DMARC, aliases, Teams, Cal.com)
- JMS módulo CX criado (JMS-CX-001)

---

## v1.2.0 — Automações Documentais (2026-06-29)

**Módulos:** n8n, PDF Service, HubSpot

- Workflows de documentos ativos: Proposta, SOW, Checklist Assessment, Checklist Implantação, Kit Onboarding
- Cal.com Booking workflow testado
- HubSpot Deal Router ativo
- Follow-up Proposta 7 dias ativo
- Token HubSpot rotacionado

---

## v1.1.0 — Design System e Blog (2026-06-19/20)

**Módulos:** Site

- Escala tipográfica `.type-*` implementada
- `.container-page` global (33 instâncias)
- Blog (Centro de Conhecimento): 3 artigos publicados
- Monitoramento Grafana/Prometheus/Loki operacional

---

## v1.0.0 — Plataforma Base (anterior a 2026-06-19)

**Módulos:** Site, Infra, n8n, PDF, JMS

- Site Next.js deployado (CI/CD via GitHub Actions)
- 4 VMs OCI provisionadas
- n8n instalado e operacional
- PDF Service deployado (Handlebars + 5 templates)
- JMS: 24 documentos aprovados
- 27 serviços + 5 segmentos no site
- API de leads (HubSpot + Telegram)
