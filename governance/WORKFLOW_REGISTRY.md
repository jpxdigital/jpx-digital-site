# WORKFLOW REGISTRY — n8n JPX Digital

Inventário oficial de todos os workflows. Toda alteração deve atualizar este registro.

Última atualização: 2026-07-13

---

## Registro

| ID | Nome | Webhook | Arquivo | Estado | Sprint | Versão |
|---|---|---|---|---|---|---|
| WF-001 | JAS Core Intake | `/webhook/jpx-jas` | `n8n-workflows/jas-core-intake.json` | Produção | Sprint 1 | v1.1 |
| WF-002 | JAS QA — Cenário 001 | `/webhook/jas-qa-run` | `n8n-workflows/jas-qa-scenario-001.json` | Produção | Sprint 1 | v1.0 |
| WF-003 | JAS QA — Cenário 002 | — | `n8n-workflows/jas-qa-scenario-002.json` | Rascunho | Sprint 2 | v0.1 |
| WF-004 | Gerar Proposta PDF | `/webhook/gerar-proposta` | `n8n-workflows/gerar-proposta.json` | Produção | — | v1.0 |
| WF-005 | Proposta Comercial | `/webhook/gerar-proposta` | `n8n-workflows/proposta-comercial.json` | Produção | — | v1.0 |
| WF-006 | Boas-vindas Lead | — (trigger interno) | `n8n-workflows/boas-vindas-lead.json` | Produção | — | v1.0 |
| WF-007 | Boas-vindas (legado) | — | `n8n-workflows/boas-vindas.json` | Legado | — | v0.9 |
| WF-008 | Cal.com Booking | `/webhook/cal-booking` | `docs/n8n-cal-booking-workflow.json` | Produção | — | v1.0 |
| WF-009 | HubSpot Deal Router | `/webhook/hubspot-deals` | `docs/n8n-hubspot-router-workflow.json` | Produção | — | v1.0 |
| WF-010 | Gerar SOW | `/webhook/gerar-sow` | — (só no n8n) | Produção | — | v1.0 |
| WF-011 | Checklist Assessment | `/webhook/gerar-checklist-assessment` | — (só no n8n) | Produção | — | v1.0 |
| WF-012 | Checklist Implantação | `/webhook/gerar-checklist-implantacao` | — (só no n8n) | Produção | — | v1.0 |
| WF-013 | Kit Onboarding | `/webhook/gerar-onboarding-kit` | — (só no n8n) | Produção | — | v1.0 |
| WF-014 | Follow-up Proposta 7 dias | — (schedule) | — (só no n8n) | Produção | — | v1.0 |

---

## Estados válidos

| Estado | Significado |
|---|---|
| Produção | Ativo, testado, em uso |
| Homologação | Desenvolvido, aguardando aprovação |
| Rascunho | Em desenvolvimento |
| Legado | Substituído, manter por histórico |
| Desativado | Parado intencionalmente |

---

## Regra de versionamento

- `v1.0` — primeira versão em produção
- `v1.x` — correções e melhorias sem quebra de contrato
- `v2.0` — mudança de estrutura de dados ou contrato de entrada/saída

## Próximos workflows previstos

| ID | Nome | Sprint | Prioridade |
|---|---|---|---|
| WF-015 | ZapSign — Assinatura SOW | — | P5 |
| WF-016 | JAS Score JPX | Sprint 2 | Pós-cliente |
| WF-017 | JAS Qualificação Claude | Sprint 2 | Pós-cliente |
