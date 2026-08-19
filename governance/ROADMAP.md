# ROADMAP — JPX Digital Platform

Planejamento de entregas. Sem detalhes técnicos — apenas o quê e quando.
Última atualização: 2026-07-30

---

## Fase atual: Preparação Comercial (Fase 2)

Objetivo: construir os ativos comerciais e executar os primeiros contatos qualificados.
Critério de encerramento: 3 assessments agendados ou realizados.

---

## Histórico de fases concluídas

### Fase 1 — Homologação Operacional ✅ ENCERRADA (2026-07-22)

| # | Entrega | Estado |
|---|---|---|
| 1 | Assinatura de e-mail instalada no Outlook | ✅ |
| 2 | Governança completa | ✅ |
| 3 | H1 — Homologação Técnica (46 testes) | ✅ 46/46 |
| 4 | H2 — Homologação Comercial (32 testes) | ✅ 32/32 |
| 5 | Gold Path completo (26 steps) | ✅ 26/26 |
| 6 | Homologation Report assinado | ✅ |
| 7 | GO-LIVE técnico aprovado | ✅ 2026-07-22 |
| 8 | Baseline v1.5.0 | ✅ Tag criada |

---

## Sprint atual — Fase 2: Preparação Comercial (2026-07-23 →)

| # | Entrega | Responsável | Estado |
|---|---|---|---|
| 1 | Tag `v1.5.0` no git | Claude | ✅ |
| 2 | LinkedIn empresa JPX Digital | João | ✅ 2026-07-25 |
| 3 | LinkedIn perfil João Martins | João | ✅ 2026-07-26 |
| 4 | Playbook Comercial | João + Claude | 🟡 v0.1 rascunho — pendente aprovação |
| 5 | HubSpot views de prospecção | João | 🟡 1/3 criada ("Novos Leads") |
| 6 | Templates de e-mail institucional | João + Claude | ⏳ |
| 7 | Lista Econodata SP Oeste (25 Score A) | João | ⏳ |
| 8 | Primeiros 3 contatos comerciais | João | ⏳ |
| 9 | Meta: 3 assessments agendados | João | ⏳ |

---

## Backlog ordenado

### Pendências técnicas (não bloqueiam a Fase 2)

- Migração jpx-n8n para A1.Flex — risco operacional (VM 1 GB RAM travou 2x)
- Grafana datasources — configurar Prometheus + Loki (dashboards em "No data")
- WF-011/013 routing via WF-009 (closedwon)
- Deploy automático jas-bridge via GitHub Actions (hoje: SCP manual)
- ZapSign — integração assinatura SOW (aguarda token API)

### Médio prazo (após primeiro Assessment vendido)

- JAS Sprint 2 — qualificação conversacional com Claude
  - Score JPX (critérios: porte, criticidade, urgência, orçamento)
  - Fluxo de descoberta com IA
  - Persistência de contexto entre sessões
- Dashboard executivo (visão de pipeline + métricas)

### Longo prazo (pós-validação com 3+ clientes)

- JAS Sprint 3 — RAG JMS + agentes técnico e documental
- JAS Sprint 4 — agente executivo + aprovação assistida
- UptimeRobot (quando tiver mais sites/clientes)
- JMS-CX-002 — Padrão de Comunicação Executiva

---

## Sprints JAS — referência

| Sprint | Objetivo | Estado | Critério de início |
|---|---|---|---|
| Sprint 1 | Intake + HubSpot + Telegram E2E | ✅ Completo 2026-07-03 | — |
| Sprint 2 | Qualificação conversacional + Score JPX | ⏳ | Primeiro Assessment vendido |
| Sprint 3 | RAG JMS + agentes especializados | ⏳ | Sprint 2 validado |
| Sprint 4 | Agente executivo + dashboard + aprovação assistida | ⏳ | Sprint 3 validado |

---

## Regra de priorização

1. Nada entra em produção sem critério de aceite definido
2. JAS Sprint 2+ só inicia após primeiro cliente real — não otimizar antes de vender
3. Novas features só após homologação da fase atual
