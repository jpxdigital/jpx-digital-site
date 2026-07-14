# Homologação — 2026-07-13
## JPX Digital Platform v1.4.0

**Executor:** João Martins (auditor) + Claude Code (executor)
**Versão:** v1.4.0
**Estado:** Em execução — P0 em aberto (H1.2)

---

## Progresso

| Fase | Testes | Aprovados | Falhas P0 | Estado |
|---|---|---|---|---|
| H1.1 Site | 12 | 12 | 0 | ✅ APROVADO |
| H1.2 Microsoft 365 | 7/9 | 5 | 1 (016) | 🔴 INTERROMPIDA |
| H1.3 Microsoft Bookings | 5 | 0 | 0 | ⏳ Aguardando H1.2 |
| H1.4 HubSpot | 5 | 0 | 0 | ⏳ Aguardando H1.2 |
| H1.5 n8n e Workflows | 7 | 0 | 0 | ⏳ Aguardando H1.2 |
| H1.6 PDF Service | 3 | 0 | 0 | ⏳ Aguardando H1.2 |
| H1.7 Monitoramento | 3 | 0 | 0 | ⏳ Aguardando H1.2 |
| H1.8 Segurança | 4 | 0 | 0 | ⏳ Aguardando H1.2 |
| H2 — Comercial | 32 | 0 | 0 | ⏳ Aguardando H1 |
| Gold Path | 26 | 0 | 0 | ⏳ Aguardando H2 |

---

## Log de execução

### H1.1 — Site (2026-07-13) ✅ APROVADO

- 001 a 008: PASS
- 009: FAIL P2 — Schema.org sem CNPJ/legalName + logo 404
  - **Correção:** `legalName`, `taxID`, logo corrigido para `jpx-logo-email.png`, email para `contato@`
  - **Commit:** `4ed0c37`
  - **Reteste:** PASS — confirmado em produção
- 010 a 012: PASS
- **Resultado final: 12/12 APROVADO**

### H1.2 — Microsoft 365 (2026-07-13) 🔴 INTERROMPIDA

| # | Resultado | Observação |
|---|---|---|
| 013 | ✅ PASS | jp@jpxdigital.com.br recebe e-mail externo |
| 014 | ✅ PASS | contato@ recebe (alias → caixa jp@) |
| 015 | ✅ PASS | comercial@ recebe (alias → caixa jp@) |
| 016 | ❌ P0 FAIL | Envio bloqueado: `550 5.7.708 AS(8562)` — tenant novo restrito pelo Exchange Online |
| 017 | ✅ PASS | DNS: MX, SPF, DKIM selector1+2, DMARC p=reject — todos corretos |
| 018 | ✅ PASS | Assinatura instalada no Outlook pelo auditor |
| 019 | ⏳ | Teams — não testado (aguardando resolução P0) |

**P0 016 — Ação requerida:**
1. Acessar `admin.microsoft.com → Suporte → Novo pedido de serviço` e relatar erro 550 5.7.708 AS(8562)
2. Verificar `protection.office.com → Revisão → Entidades restritas` → Desbloquear jp@jpxdigital.com.br
3. Aguardar liberação Microsoft (pode levar 1-5 dias úteis)

**Sessão interrompida:** 2026-07-14 — aguardando resolução P0 para retomar H1.2 e continuar H1.3 a H1.8
