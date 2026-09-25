# HOMOLOGATION REPORT — JPX Digital Platform

Histórico oficial de homologações. Cada execução gera uma entrada neste documento.
Não apagar registros anteriores — empilhar em ordem cronológica reversa (mais recente primeiro).

---

## TEMPLATE — copiar para cada nova execução

```
### Homologação #N — vX.Y.Z — DD/MM/AAAA

**Executor:** João Martins
**Versão da plataforma:** vX.Y.Z
**Data início:** DD/MM/AAAA HH:MM
**Data fim:** DD/MM/AAAA HH:MM

#### H1 — Técnica
- Testes executados: XX / 46
- Aprovados: XX
- Falhas: XX (P0: X · P1: X · P2: X · P3: X)
- Resultado: ✅ APROVADA / ❌ REPROVADA

#### H2 — Comercial
- Testes executados: XX / 32
- Aprovados: XX
- Falhas: XX
- Resultado: ✅ APROVADA / ❌ REPROVADA

#### Gold Path
- Steps executados: XX / 26
- Falhas: XX
- Resultado: ✅ APROVADO / ❌ REPROVADO

#### Bloqueadores encontrados
| # | Teste | Descrição | Resolvido em |
|---|---|---|---|
| | | | |

#### Decisão final
[ ] ✅ LIBERADO PARA PROSPECÇÃO ATIVA
[ ] ❌ PERMANECER EM HOMOLOGAÇÃO

**Assinatura:** _________________________ **Data:** ___________
**Notas:**
```

---

## Execuções realizadas

### Homologação #2 — v1.6.0 — 21/09/2026 (Gold Path de regressão)

**Executor:** João Martins + Claude Code
**Versão da plataforma:** v1.6.0 (baseline `c3b58d7`)
**Data início:** 2026-09-20
**Data fim:** 2026-09-21
**Escopo:** Gold Path completo (26 steps) como teste de regressão antes da prospecção real. H1/H2 completas não foram reexecutadas — mudanças desde a v1.5.0 cobertas pelo Gold Path + testes pontuais registrados no `CHANGELOG.md` (13–14/09 e 20/09)

#### Gold Path
- Steps executados: 26 / 26
- OK: 23 · Não verificáveis: 2 (GP-19 e-mail fictício; GP-26 estágio inexistente — P17) · Passo manual não testado: 1 (GP-15)
- Falhas nas etapas críticas (1, 2, 4): 0 após correção
- Resultado: ✅ APROVADO

#### Bloqueadores encontrados
| # | Teste | Descrição | Resolvido em |
|---|---|---|---|
| F07 | GP-05/06 | Regressão P0 no WF-001: contatos `@lid` nunca tinham nome/empresa atualizado no HubSpot (busca por `phone` vazio) — corrigido com `jas_whatsapp_correlation_id` (WF-001 v1.5) | 2026-09-20 |

#### Achados não bloqueadores
- P16 — deal do WF-001 não grava o serviço selecionado
- P17 — estágio "Em Onboarding" (GP-26) não existe no Pipeline JPX

#### Decisão final
[x] ✅ LIBERADO PARA PROSPECÇÃO ATIVA (a partir de 21/09/2026)

**Assinatura:** _________________________ (pendente — João) **Data:** ___________
**Notas:** Gold Path usou o celular pessoal do usuário (`@lid` real). Dados de teste apagados ao final. ETAPA 3 (Teams A/V) confirmada manualmente pelo usuário.

---

### Homologação #1 — v1.4.0 — 22/07/2026

**Executor:** João Martins
**Versão da plataforma:** v1.4.0
**Data início:** 2026-07-14
**Data fim:** 2026-07-22

#### H1 — Técnica
- Testes executados: 46 / 46
- Aprovados: 46
- Falhas: 0 (P0: 0 · P1: 0 · P2: 0 · P3: 0)
- Resultado: ✅ APROVADA

#### H2 — Comercial
- Testes executados: 32 / 32
- Aprovados: 32
- Falhas: 0
- Resultado: ✅ APROVADA

#### Bloqueadores encontrados e resolvidos
| # | Teste | Descrição | Resolvido em |
|---|---|---|---|
| F01 | H1.2 | Exchange 550 5.7.708 — envio bloqueado por usuário convidado | 2026-07-19 |
| F02 | H1.6 | Estágio "Proposta Solicitada" não existia no Pipeline JPX | 2026-07-22 |
| F03 | H1.6 | WF-004/009 com stage ID desatualizado | 2026-07-22 |
| F04 | H1.6 | WF-004 e WF-006 com credencial Resend SMTP inválida | 2026-07-22 |
| F05 | H2.1 | HUBSPOT_TOKEN expirado no servidor (HTTP 401) | 2026-07-22 |
| F06 | H2.4 | WF-011/013 com expressão URL incorreta (body.objectId) | 2026-07-22 |

#### Decisão final
[x] ✅ LIBERADO PARA PROSPECÇÃO ATIVA

**Assinatura:** João Martins **Data:** 2026-07-22
**Notas:** Plataforma validada ponta a ponta. 78 testes executados — 78 aprovados. Zero P0 em aberto. Pendências não bloqueadoras: WF-011/013 a adicionar no WF-009, Grafana datasources a configurar, migração jpx-n8n para A1.Flex agendada.
