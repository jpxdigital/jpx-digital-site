# CHANGELOG — JPX Digital Platform

Registro de todas as alterações relevantes na plataforma.
Formato: `[DATA] Módulo — Descrição (commit ou referência)`

---

## 2026-07-14

- `[GOVERNANÇA]` CHECKLIST-HOMOLOGACAO.md: 78 testes H1+H2, colunas P/Evidência/Ação, prioridades P0–P3
- `[GOVERNANÇA]` GOLD-PATH.md: 26 steps Lead → Cliente — regressão obrigatória pré-GO-LIVE
- `[GOVERNANÇA]` GO-LIVE.md: checklist + 9 KPIs com metas (uptime, latência, e2e)
- `[GOVERNANÇA]` HOMOLOGATION-REPORT.md: template de laudo formal
- `[GOVERNANÇA]` ROLLBACK.md: 7 cenários com passos e contingência
- `[GOVERNANÇA]` OPERATIONS.md: rotinas de abertura/encerramento, incidentes P0–P3, recuperação
- `[GOVERNANÇA]` CLAUDE.md criado na raiz: 6 perguntas obrigatórias + regra P0 + ciclo de release
- `[GOVERNANÇA]` SPRINT.md reordenado: Fase 1 Homologação antes de LinkedIn/Econodata
- `[HOMOLOGAÇÃO]` H1.1 Site: 12/12 APROVADO — falha P2 Schema.org corrigida (commit `4ed0c37`)
- `[HOMOLOGAÇÃO]` H1.2 M365: INTERROMPIDA — P0 016 (envio bloqueado 550 5.7.708 AS(8562))
- `[HOMOLOGAÇÃO]` H1.2 013/014/015: PASS — todos os aliases recebem e-mail
- `[HOMOLOGAÇÃO]` H1.2 017: PASS — DNS completo e correto (MX/SPF/DKIM/DMARC)
- `[HOMOLOGAÇÃO]` H1.2 018: PASS — assinatura instalada no Outlook
- `[JMS]` JMS-COM-009 criado: padrão de experiência do cliente (SLAs, fluxos, régua de cuidado)
- `[HOMOLOGAÇÃO]` Pasta `homologacao/2026-07-13/` criada com README e subpastas de evidências

## 2026-07-13

- `[GOVERNANÇA]` Criada pasta `governance/` com STATUS, ROADMAP, SPRINT, CHANGELOG, RELEASES, SYSTEM_MAP, WORKFLOW_REGISTRY
- `[LEGAL]` Razão social corrigida: JPX Digital Tecnologia LTDA, CNPJ 57.454.973/0001-18 — commits `c44dce5`
- `[M365]` Assinatura de e-mail HTML criada (`public/assinatura-joao.html`) — commit `039127a`
- `[IDENTIDADE]` Helena: CTAs Bookings + WhatsApp no fluxo "Falar com especialista" — commit `9be452a`
- `[JAS]` Mensagem de link usa serviço escolhido no menu (ex: "reunião de *FinOps*") — commit `2aee9e2`
- `[JAS]` Fluxo E2E validado ponta a ponta com Microsoft Bookings
- `[IDENTIDADE]` Favicon + ícones PWA texto JPX navy — commits `3f95d03`, `708dccd`
- `[IDENTIDADE]` Logo e-mail hospedado em `jpxdigital.com.br/jpx-logo-email.png` — commit `798bc10`
- `[BOOKINGS]` Microsoft Bookings "Consultoria JPX Digital — 30 min" configurado

## 2026-07-07

- `[JAS]` Coleta de nome + empresa antes de enviar link — commit `df7c2a9`
- `[JAS]` Boas-vindas simplificada (sem parágrafo boutique) — commit `20036c7`
- `[JMS]` Módulo CX criado: JMS-CX-001 (Reuniões Executivas com Teams)

## 2026-07-06

- `[JAS]` LID fix: boas-vindas chegando na 1ª mensagem de contatos @lid — commit `46ef32a`

## 2026-07-05

- `[M365]` Migração completa: MX, SPF, DKIM, DMARC, aliases, Cal.com, Teams
- `[JAS]` Máquina de estados validada E2E — commit `7aa060a`
- `[JAS]` HUMAN_TAKEOVER: notificação Telegram ativa

## 2026-07-04

- `[JAS]` JAS-QA Cenário 001 com Smoke Test — PASS em 22s — commit `d744d8d`

## 2026-07-03

- `[JAS]` Sprint 1 completo: WhatsApp → dedup → sessão → HubSpot → Telegram E2E
- `[JAS]` WhatsApp chip 2 conectado (+55 18 98189-0607)

## 2026-06-29

- `[HUBSPOT]` Token PAT rotacionado
- `[N8N]` Cal.com Booking workflow testado e validado

## 2026-06-21

- `[INFRA]` Backup n8n: credentials + workflows (`.n8n-backup-2026-06-21/`)

## 2026-06-20

- `[SITE]` Design system: `.type-*` + `.container-page` aplicados globalmente (33 instâncias)

## 2026-06-19

- `[SITE]` Escala tipográfica implementada em `globals.css`

## histórico anterior

- Site Next.js v1 deployado (jpx-vm via GitHub Actions)
- 4 VMs OCI provisionadas e configuradas
- n8n instalado e workflows de documentos ativos
- PDF Service deployado (vm-ashburn-1)
- Monitoramento Grafana/Prometheus/Loki (vm-ashburn-2)
- JMS: 24 documentos aprovados
