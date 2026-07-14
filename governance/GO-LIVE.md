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
