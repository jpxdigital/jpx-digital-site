# GOLD PATH — JPX Digital

**O teste mais importante da plataforma.**

Simula a jornada completa de um lead real, do primeiro contato até o onboarding.
Se este fluxo passar 100%, toda a cadeia comercial está operacional.

Deve ser executado antes de qualquer prospecção ativa e após qualquer mudança crítica.

---

## Pré-requisitos

- H1 (Homologação Técnica) aprovada
- HubSpot sem contato com o e-mail de teste (ou usar e-mail novo)
- Número de teste diferente do chip 2

---

## A jornada

```
LEAD
  ↓
[1] WhatsApp → JAS
  ↓
[2] Qualificação → HubSpot
  ↓
[3] Assessment agendado (Bookings)
  ↓
[4] Reunião executada (Teams)
  ↓
[5] Proposta enviada (PDF)
  ↓
[6] Contrato assinado (ZapSign) *
  ↓
[7] Onboarding iniciado (Kit PDF)
  ↓
CLIENTE

* ZapSign ainda pendente — substituir por e-mail manual nesta versão
```

---

## Execução passo a passo

### ETAPA 1 — Entrada pelo WhatsApp

| Step | Ação | Critério de aceite | Status |
|---|---|---|---|
| GP-01 | Enviar "Oi" para +55 18 98189-0607 (chip 2) | Boas-vindas recebida em até 10s com menu | |
| GP-02 | Selecionar opção "1 — Assessment Executivo" | Pergunta nome completo | |
| GP-03 | Informar nome: "Teste Gold Path" | Pergunta empresa | |
| GP-04 | Informar empresa: "Empresa Teste Ltda" | Envia link com "*Assessment Executivo*" | |
| GP-05 | Verificar HubSpot → Contatos | Contato "Teste Gold Path / Empresa Teste Ltda" criado | |
| GP-06 | Verificar HubSpot → Negócios | Deal "Assessment Executivo" associado ao contato | |
| GP-07 | Verificar Telegram | Notificação com nome, empresa e serviço recebida | |

### ETAPA 2 — Agendamento

| Step | Ação | Critério de aceite | Status |
|---|---|---|---|
| GP-08 | Clicar no link do Bookings recebido no WhatsApp | Página de agendamento abre | |
| GP-09 | Agendar slot disponível com e-mail de teste | Confirmação exibida na tela | |
| GP-10 | Verificar e-mail de teste | E-mail de confirmação recebido | |
| GP-11 | Verificar joao@jpxdigital.com.br / Outlook | Evento criado no calendário | |
| GP-12 | Atualizar deal no HubSpot para estágio "Assessment Agendado" | Deal move de estágio | |

### ETAPA 3 — Reunião de Assessment (Teams)

| Step | Ação | Critério de aceite | Status |
|---|---|---|---|
| GP-13 | Abrir Teams e iniciar reunião de teste | Teams conecta sem erro | |
| GP-14 | Verificar que câmera e microfone funcionam | A/V operacional | |
| GP-15 | Após "reunião", atualizar deal para "Proposta em Elaboração" | Deal atualizado no HubSpot | |

### ETAPA 4 — Proposta

| Step | Ação | Critério de aceite | Status |
|---|---|---|---|
| GP-16 | Executar WF-004 no n8n com dados: nome "Teste Gold Path", empresa "Empresa Teste Ltda", serviço "Assessment Executivo" | PDF gerado sem erro | |
| GP-17 | Abrir o PDF gerado | Logo JPX, nome e empresa corretos, serviço correto | |
| GP-18 | PDF salvo no OCI bucket | Arquivo em propostas/{ano-mes}/ | |
| GP-19 | Enviar PDF por e-mail usando joao@jpxdigital.com.br com assinatura | E-mail sai com assinatura correta e PDF em anexo | |
| GP-20 | Atualizar deal para "Proposta Enviada" | Deal atualizado | |

### ETAPA 5 — Contrato (manual nesta versão — ZapSign pendente)

| Step | Ação | Critério de aceite | Status |
|---|---|---|---|
| GP-21 | Executar WF-010 (SOW) com dados de teste | PDF do SOW gerado | |
| GP-22 | *(ZapSign pendente)* Simular envio por e-mail | Contrato enviado manualmente | |
| GP-23 | Atualizar deal para "Contrato Assinado" | Deal atualizado | |

### ETAPA 6 — Onboarding

| Step | Ação | Critério de aceite | Status |
|---|---|---|---|
| GP-24 | Executar WF-013 (Kit Onboarding) com dados de teste | PDF do kit gerado | |
| GP-25 | Abrir o PDF do kit | Conteúdo correto, logo e dados do cliente | |
| GP-26 | Atualizar deal para "Em Onboarding" | Deal atualizado | |

---

## Resultado

| Etapa | Steps | OK | Falha |
|---|---|---|---|
| 1 — WhatsApp / JAS | GP-01 a GP-07 | | |
| 2 — Agendamento | GP-08 a GP-12 | | |
| 3 — Reunião | GP-13 a GP-15 | | |
| 4 — Proposta | GP-16 a GP-20 | | |
| 5 — Contrato | GP-21 a GP-23 | | |
| 6 — Onboarding | GP-24 a GP-26 | | |
| **TOTAL** | **26** | | |

---

## Critério de aprovação

✅ **Gold Path aprovado:** todos os steps P0 sem falha (etapas 1, 2 e 4 são críticas)
❌ **Gold Path reprovado:** qualquer falha nas etapas 1, 2 ou 4

**Não iniciar prospecção com Gold Path reprovado.**

---

## Limpeza após o teste

- Deletar contato "Teste Gold Path" do HubSpot
- Deletar deal associado
- Deletar evento de teste do Outlook Calendar
- Deletar PDFs de teste do OCI bucket (opcional)
