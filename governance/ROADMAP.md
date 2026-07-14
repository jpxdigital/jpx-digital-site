# ROADMAP — JPX Digital Platform

Planejamento de entregas. Sem detalhes técnicos — apenas o quê e quando.
Última atualização: 2026-07-13

---

## Fase atual: Homologação Operacional

Objetivo: validar que todos os sistemas funcionam de ponta a ponta antes da primeira prospecção ativa.

---

## Sprint atual — Comercial & Governança (2026-07-13 →)

| # | Entrega | Estado |
|---|---|---|
| 1 | Assinatura e-mail Outlook instalada | 🟡 HTML pronto, instalação pendente |
| 2 | LinkedIn empresa JPX Digital | ⏳ |
| 3 | LinkedIn perfil João Martins | ⏳ |
| 4 | HubSpot views salvas | ⏳ |
| 5 | Governança (esta pasta) | 🟡 Em andamento |
| 6 | Checklist homologação operacional | ⏳ |

---

## Backlog ordenado

### Curto prazo (antes da primeira prospecção)

- Checklist homologação (~100 testes manuais de ponta a ponta)
- ZapSign — integração assinatura SOW
- Deploy automático jas-bridge via GitHub Actions

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
