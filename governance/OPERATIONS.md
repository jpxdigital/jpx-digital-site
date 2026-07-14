# OPERATIONS — JPX Digital Platform

Manual do operador. Responde quatro perguntas:
1. Como inicia o dia?
2. Como encerra o dia?
3. Como identificar um incidente?
4. Como recuperar a operação?

---

## 1. Abertura do dia (08:00 — 10 min)

Checklist diário de saúde da plataforma. Executar antes de qualquer atendimento.

```
[ ] Site         https://jpxdigital.com.br — abre sem erro?
[ ] n8n          n8n.jpxdigital.com.br — acessível e sem execuções com erro?
[ ] JAS          Enviar "teste" para chip 2 (+55 18 98189-0607) — responde?
[ ] HubSpot      Abrir HubSpot — algum lead novo desde ontem?
[ ] Outlook      Verificar jp@jpxdigital.com.br — e-mails sem resposta?
[ ] Teams        Abrir Teams — alguma mensagem ou reunião hoje?
[ ] Telegram     Verificar @jpxdigital_bot — algum alerta de HUMAN_TAKEOVER ou erro?
```

**Tempo esperado:** 10 minutos.
**Se algum item falhar:** consultar `governance/ROLLBACK.md` → cenário correspondente.

---

## 2. Rotina durante o dia

### Leads e atendimento

| Gatilho | Ação | Prazo |
|---|---|---|
| Notificação Telegram — novo lead | Acessar HubSpot → verificar contato e deal criados | Até 1h |
| Notificação Telegram — HUMAN_TAKEOVER | Assumir conversa pelo WhatsApp pessoal | Até 30 min |
| E-mail em contato@ / comercial@ | Responder usando joao@jpxdigital.com.br com assinatura | Até 4h |
| Reunião no Bookings/Teams | Preparar com JMS-CX-001 (padrão de reunião executiva) | Antes da reunião |
| Após reunião de Assessment | Atualizar deal HubSpot → gerar proposta (WF-004) | Até 24h |

### Gestão de deals (HubSpot)

Manter o pipeline atualizado. Um deal parado > 7 dias em um estágio precisa de ação ou descarte.

| Estágio | Ação esperada |
|---|---|
| Novo Lead | Qualificar em até 24h |
| Assessment Agendado | Confirmar 1 dia antes |
| Proposta em Elaboração | Enviar em até 48h após reunião |
| Proposta Enviada | Follow-up em 7 dias (WF-014 automático) |
| Contrato Assinado | Iniciar onboarding em até 3 dias úteis |
| Em Onboarding | Primeira entrega em até 15 dias |

---

## 3. Encerramento do dia (17:30 — 5 min)

```
[ ] n8n          Verificar execuções com erro hoje — há algum workflow falhando?
[ ] HubSpot      Deals atualizados com o que aconteceu hoje?
[ ] Outlook      Caixa de entrada zerada (ou arquivada)?
[ ] Telegram     Algum alerta sem resposta?
[ ] Backup       n8n ainda sincronizando automaticamente? (verificar semanalmente)
[ ] Changelog    Alguma mudança relevante feita hoje? → registrar em governance/CHANGELOG.md
```

**Tempo esperado:** 5 minutos.

---

## 4. Identificação de incidentes

### O que É um incidente

| Severidade | Definição | Exemplos |
|---|---|---|
| 🔴 P0 — Crítico | Plataforma comercial indisponível | Site fora, JAS sem responder, HubSpot não recebendo leads |
| 🟠 P1 — Alto | Funcionalidade principal degradada | n8n com erros, Bookings sem horários, PDF não gerando |
| 🟡 P2 — Médio | Funcionalidade secundária afetada | Monitoramento offline, e-mail lento, favicon errado |
| 🟢 P3 — Baixo | Cosmético ou não urgente | Texto desatualizado, badge errado, log verboso |

### O que NÃO é incidente

- n8n crash-loop no boot (comportamento conhecido — aguardar reinício automático)
- Queries de inicialização do jas-bridge retornando 0 rows (esperado)
- `isEmpty null` nos logs do n8n (esperado)
- `$json` SSH warnings no n8n (esperado)
- Ver `governance/CHECKLIST-HOMOLOGACAO.md` seção de erros conhecidos

### Critério de escalada

```
P0 → Agir imediatamente → consultar ROLLBACK.md → registrar incidente
P1 → Agir no mesmo dia → consultar ROLLBACK.md
P2 → Agir na próxima janela de manutenção
P3 → Registrar no backlog → resolver quando conveniente
```

---

## 5. Recuperação da operação

Para cada cenário de falha, o plano já está documentado em `governance/ROLLBACK.md`.

Sequência padrão de resposta a incidente:

```
1. IDENTIFICAR  — Qual serviço? Qual sintoma? Qual severidade?
         ↓
2. CONTER       — Ativar contingência do ROLLBACK.md (não improvisar)
         ↓
3. RESTAURAR    — Seguir os passos do cenário correspondente
         ↓
4. VERIFICAR    — Confirmar que o serviço voltou ao normal
         ↓
5. REGISTRAR    — Preencher tabela de incidentes no ROLLBACK.md
         ↓
6. INVESTIGAR   — Entender a causa raiz (fazer isso DEPOIS de restaurar)
```

---

## 6. Manutenção periódica

| Frequência | Ação |
|---|---|
| Semanal | Verificar execuções n8n com erro na semana |
| Semanal | Backup manual dos workflows n8n (exportar JSON) |
| Mensal | Verificar validade do SSL (vence 2026-09-17) |
| A cada 90 dias | Rotacionar token HubSpot PAT |
| A cada release | Executar Gold Path completo (`governance/GOLD-PATH.md`) |
| A cada mudança crítica | Executar Gold Path (JAS, HubSpot, n8n, Bookings, Teams) |

---

## 7. Quando executar o Gold Path (teste de regressão)

O Gold Path não é só para homologação. É o teste de regressão da plataforma.

**Executar sempre que alterar:**

| Módulo alterado | Executa Gold Path? |
|---|---|
| JAS (jas-bridge, WF-001) | ✅ Obrigatório |
| n8n (qualquer workflow crítico) | ✅ Obrigatório |
| HubSpot (pipeline, propriedades, token) | ✅ Obrigatório |
| Microsoft Bookings | ✅ Obrigatório |
| Microsoft Teams | ✅ Obrigatório |
| Site (formulário, ChatBot Helena) | ✅ Obrigatório |
| PDF Service | 🟡 Recomendado |
| Identidade visual | ❌ Não necessário |
| Documentação | ❌ Não necessário |

---

## 8. Contatos de emergência

| Serviço | Canal de suporte | SLA esperado |
|---|---|---|
| Microsoft 365 | admin.microsoft.com → Suporte | 4h (plano Business Basic) |
| Cloudflare | dash.cloudflare.com → Help | Comunidade / tickets |
| OCI | cloud.oracle.com → Support | 4h (Always Free) |
| HubSpot | app.hubspot.com → Help | Chat / tickets |
| Resend | resend.com/support | E-mail |
