# GO-LIVE — JPX Digital Platform

Requisitos mínimos para entrada em produção comercial.
Abrir este documento no dia da liberação para prospecção.

---

## Checklist de GO-LIVE

### Infraestrutura

- [ ] SSL válido (jpxdigital.com.br — vence 2026-09-17)
- [ ] 4 VMs OCI operacionais (jpx-vm, jpx-n8n, vm-ashburn-1, vm-ashburn-2)
- [ ] Cloudflare WAF ativo
- [ ] Monitoramento Grafana recebendo métricas de todas as VMs
- [ ] Backup n8n atualizado

### Comunicação

- [ ] Microsoft 365 — MX, SPF, DKIM, DMARC ativos
- [ ] Microsoft Teams operacional
- [ ] Microsoft Bookings — "Consultoria JPX Digital — 30 min" configurado
- [ ] Assinatura de e-mail instalada no Outlook
- [ ] Aliases ativos: contato@, comercial@, contratos@, privacidade@

### Site e CRM

- [ ] Site https://jpxdigital.com.br no ar e sem erro
- [ ] Formulário de contato → HubSpot funcionando
- [ ] HubSpot pipeline "Pipeline JPX" com 8 estágios
- [ ] Token HubSpot válido (rotacionar se > 90 dias)

### Automação

- [ ] n8n.jpxdigital.com.br acessível
- [ ] WF-001 JAS Core Intake ativo
- [ ] WF-002 JAS QA Smoke Test passando
- [ ] WF-006 Boas-vindas Lead ativo
- [ ] WF-008 Cal.com Booking ativo
- [ ] Templates de PDF funcionando (Proposta, SOW, Checklist, Onboarding)

### WhatsApp / JAS

- [ ] Chip 2 (+55 18 98189-0607) conectado e respondendo
- [ ] JAS boas-vindas chegando em até 10s
- [ ] JAS → HubSpot criando deal corretamente
- [ ] HUMAN_TAKEOVER gerando notificação no Telegram

### Validação de qualidade

- [ ] H1 Homologação Técnica — aprovada
- [ ] H2 Homologação Comercial — aprovada
- [ ] Gold Path — executado sem falha
- [ ] HOMOLOGATION-REPORT.md — assinado

---

## KPIs obrigatórios

Medir antes de assinar o GO-LIVE. Todos os P0 devem estar dentro da meta.

| Indicador | Meta | Como medir | P | Resultado | Status |
|---|---|---|---|---|---|
| Disponibilidade do site | ≥ 99,9% | Grafana / Cloudflare Analytics (últimos 7 dias) | 🔴 | | |
| Tempo de resposta formulário | < 3 s | DevTools → Network → POST /api/leads | 🔴 | | |
| Contato criado no HubSpot | < 10 s | Timestamp submissão vs. timestamp criação no HubSpot | 🔴 | | |
| Deal criado no HubSpot | < 10 s | Junto com o contato | 🔴 | | |
| Entrega boas-vindas WhatsApp (JAS) | < 15 s | Cronometrar da mensagem enviada à resposta recebida | 🔴 | | |
| Confirmação do Bookings (e-mail) | < 30 s | Timestamp agendamento vs. timestamp e-mail | 🟠 | | |
| Geração de proposta PDF | < 60 s | Tempo de execução do WF-004 no n8n | 🟠 | | |
| Falhas P0 no Gold Path | 0 | GOLD-PATH.md executado | 🔴 | | |
| Execuções com erro no n8n (últimas 24h) | 0 nos workflows críticos | n8n → Execuções → filtrar por erro | 🔴 | | |

---

## Decisão

```
┌─────────────────────────────────────────────┐
│                                             │
│   Todos os itens marcados?                  │
│                                             │
│   ✅ SIM → LIBERADO PARA PROSPECÇÃO ATIVA   │
│                                             │
│   ❌ NÃO → PERMANECER EM HOMOLOGAÇÃO        │
│            Resolver pendências primeiro     │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Histórico de GO-LIVEs

| Versão | Data | Responsável | Decisão |
|---|---|---|---|
| v1.4.0 | | João Martins | |
