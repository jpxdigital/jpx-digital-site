# CHECKLIST DE HOMOLOGAÇÃO OPERACIONAL
# JPX Digital Platform — v1.4.0

**Objetivo:** validar que todos os sistemas funcionam ponta a ponta antes da prospecção ativa.
**Responsável:** João Martins

Legenda de prioridade: 🔴 P0 Bloqueador · 🟠 P1 Alta · 🟡 P2 Média · 🟢 P3 Baixa
Legenda de resultado: ✅ OK · ❌ FALHA · ⏭️ PULADO (justificar)
Coluna Evidência: screenshot / URL / log / "n8n exec #NNN" — o que comprova o resultado

> **Critério de aprovação por fase:**
> - H1 Técnica: zero P0 com falha
> - H2 Comercial: Gold Path executado sem falha (ver `GOLD-PATH.md`)
>
> **Regra operacional — P0 externo:** Bloqueadores P0 causados por fornecedores externos (Microsoft, HubSpot, Cloudflare etc.) impedem a aprovação final do GO-LIVE, mas não impedem a execução de testes de módulos independentes. A homologação dos módulos não afetados deve continuar em paralelo enquanto o chamado de suporte está aberto.

---

# H1 — HOMOLOGAÇÃO TÉCNICA

*Infraestrutura e integrações. Executar antes da H2.*
Data de execução: ___________ Resultado: [ ] APROVADO [ ] REPROVADO

---

## H1.1 — Site

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 001 | Home carrega | https://jpxdigital.com.br | Página exibe sem erro JS | 🟠 | | |
| 002 | HTTPS redirect | http://jpxdigital.com.br | Redireciona para HTTPS | 🔴 | | |
| 003 | SSL válido | Cadeado no browser | Verde, vence 2026-09-17 | 🔴 | | |
| 004 | Nav completa | Clicar em cada item | Todos os links sem 404 | 🟠 | | |
| 005 | Favicon | Qualquer página | Ícone JPX navy na aba | 🟢 | | |
| 006 | Health check | /api/health | Retorna 200 | 🟠 | | |
| 007 | Sitemap | /sitemap.xml | XML válido com URLs | 🟡 | | |
| 008 | Robots.txt | /robots.txt | /admin e /api bloqueados | 🟡 | | |
| 009 | Schema.org | DevTools → `application/ld+json` | CNPJ 57.454.973/0001-18 | 🟡 | | |
| 010 | Footer legal | Rodapé do site | "JPX Digital Tecnologia LTDA · CNPJ: 57.454.973/0001-18" | 🔴 | | |
| 011 | Privacidade | /privacidade | Razão social e CNPJ corretos | 🟡 | | |
| 012 | Sala-cofre desativada | /servicos/sala-cofre | 404 ou não aparece no hub | 🟢 | | |

## H1.2 — Microsoft 365 / Exchange

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 013 | Receber e-mail | Enviar para jp@jpxdigital.com.br | E-mail chega no Outlook | 🔴 | ✅ | Recebido em jp@jpxdigital.com.br — 2026-07-14 | |
| 014 | Alias contato@ | Enviar para contato@jpxdigital.com.br | Chega em joao@ | 🔴 | ✅ | contato@ redirecionado para joao@ — 2026-07-14 | |
| 015 | Alias comercial@ | Enviar para comercial@jpxdigital.com.br | Chega em joao@ | 🔴 | ✅ | comercial@ redirecionado para joao@ — 2026-07-14 | |
| 016 | Envio com jp@ | Novo e-mail → remetente jp@ | Sai com endereço correto | 🟠 | ✅ | Enviado jp@→zfilltecnologia@gmail.com, resposta recebida — 2026-07-19. P0 anterior (550 5.7.708) resolvido | |
| 017 | SPF/DKIM/DMARC | Enviar para Gmail → ver headers | SPF pass · DKIM pass · DMARC pass | 🔴 | ✅ | MX, SPF, DKIM (selector1+2), DMARC p=reject — todos corretos — 2026-07-14 | |
| 018 | Assinatura no Outlook | Novo e-mail | Logo, contatos e botão Bookings aparecem | 🟠 | ✅ | Assinatura instalada manualmente no Outlook — 2026-07-14 | |
| 019 | Teams acessível | Abrir Teams | Login com joao@ sem erro | 🟠 | ✅ | Teams aberto com jp@jpxdigital.com.br — 2026-07-19 | |

## H1.3 — Microsoft Bookings

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 020 | Link abre | Clicar no link da assinatura | Página de agendamento carrega | 🔴 | | |
| 021 | Horários corretos | Ver calendário | Seg–Qui disponível, Sex–Dom bloqueados | 🔴 | | |
| 022 | Agendamento funciona | Selecionar slot e preencher dados | Confirmação exibida | 🔴 | | |
| 023 | E-mail de confirmação | Após 022, verificar e-mail do teste | E-mail de confirmação recebido | 🟠 | | |
| 024 | Evento no Outlook | Após 022, verificar joao@ | Evento criado no calendário | 🟠 | | |

## H1.4 — HubSpot CRM

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 025 | Pipeline visível | HubSpot → Negócios | Pipeline JPX com 9 fases | 🔴 | ✅ | Screenshot 2026-07-16: Pipeline JPX, 9 fases confirmadas |
| 026 | Propriedades Deal | Abrir um deal | Grupo "Dados Comerciais JPX" com 12 propriedades | 🟠 | ❌ | Grupo existe mas vazio — propriedades visíveis no deal estão em outro grupo. Ação: mapear e mover as 12 propriedades para o grupo correto |
| 027 | Propriedades Contato | Abrir um contato | Grupo "Perfil de Decisão JPX" com 3 propriedades | 🟡 | ❌ | Grupo existe mas vazio. Mesma causa do 026 — propriedades não associadas ao grupo correto |
| 028 | Propriedades Company | Abrir uma empresa | Grupo "Perfil Técnico JPX" com 11 propriedades | 🟡 | ❌ | Grupo existe mas vazio. Mesma causa dos testes 026 e 027 |
| 029 | Token válido | Verificar logs n8n | Sem erros 401/403 nas últimas 24h | 🔴 | ✅ | n8n overview: 0 failed executions, 0% failure rate — 2026-07-16 |

## H1.5 — n8n e Workflows

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 030 | n8n acessível | n8n.jpxdigital.com.br | Painel carrega e login funciona | 🔴 | ✅ | Login realizado em 2026-07-16 |
| 031 | WF-001 JAS Core ativo | Lista de workflows | jas-core-intake-v1-0 = "Active" | 🔴 | ✅ | jas_core_intake_webhook = Published |
| 032 | WF-002 JAS QA ativo | Lista de workflows | jas-qa-scenario-001 = "Active" | 🔴 | ✅ | JAS QA Cenário 001 e 002 = Published |
| 033 | WF-006 Boas-vindas ativo | Lista de workflows | boas-vindas-lead = "Active" | 🟠 | ✅ | Boas-vindas — Lead JPX Digital = Published |
| 034 | WF-008 Cal.com ativo | Lista de workflows | cal-booking = "Active" | 🟠 | ✅ | Cal.com — Booking Created = Published |
| 035 | WF-009 Deal Router ativo | Lista de workflows | hubspot-deals = "Active" | 🟠 | ✅ | HubSpot — Deal Stage Router = Published |
| 036 | JAS QA Smoke Test | POST /webhook/jas-qa-run | PASS: PostgreSQL, HubSpot, Telegram OK | 🔴 | ✅ | Executado via Schedule Trigger em 2026-07-16 — Succeeded |

## H1.6 — PDF Service

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 037 | Health check | https://pdf.jpxdigital.com.br/health | Retorna 200 | 🟠 | ✅ | curl retornou {"status":"ok"} — 2026-07-16 |
| 038 | Gerar proposta | Executar WF-004 via n8n | PDF gerado com logo e dados corretos | 🟠 | | |
| 039 | PDF no OCI Storage | Após 038, verificar bucket jpx-documentos | Arquivo em propostas/{ano-mes}/ | 🟡 | | |

## H1.7 — Monitoramento

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 040 | Grafana acessível | SSH tunnel → http://localhost:3001 | Dashboard carrega | 🟡 | | |
| 041 | Prometheus targets | Grafana → Explore → targets | 4 VMs com status UP | 🟡 | | |
| 042 | Loki recebe logs | Grafana → Explore → Loki | Logs das VMs chegando | 🟡 | | |

## H1.8 — Segurança

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 043 | Cloudflare WAF | Cloudflare → Security → WAF | Regras ativas | 🟠 | | |
| 044 | Rate limiting | 10+ POSTs rápidos para /api/leads | 429 após limite | 🟡 | | |
| 045 | KEYS.md não exposto | https://jpxdigital.com.br/KEYS.md | 404 | 🔴 | | |
| 046 | Turnstile ativo | Inspecionar formulário /contato | Campo Turnstile presente | 🟠 | | |

---

# H2 — HOMOLOGAÇÃO COMERCIAL

*Fluxo de ponta a ponta. Executar após H1 aprovada.*
*Ver também `GOLD-PATH.md` para o teste integrado completo.*
Data de execução: ___________ Resultado: [ ] APROVADO [ ] REPROVADO

---

## H2.1 — Formulário Site → HubSpot

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 047 | Formulário renderiza | /contato | Campos visíveis e funcionais | 🟠 | | |
| 048 | Validação obrigatórios | Submeter vazio | Erro nos campos, não envia | 🟠 | | |
| 049 | Submissão válida | Preencher e submeter com dados reais | Mensagem de sucesso | 🔴 | | |
| 050 | Lead no HubSpot | Após 049 → HubSpot → Contatos | Contato criado com nome e e-mail | 🔴 | | |
| 051 | Deal no HubSpot | Após 049 → HubSpot → Negócios | Deal criado e associado ao contato | 🔴 | | |
| 052 | Notificação Telegram | Após 049 → Telegram | Mensagem de novo lead recebida | 🔴 | | |
| 053 | E-mail boas-vindas | Após 049 → caixa do e-mail de teste | E-mail de boas-vindas recebido via Resend | 🟠 | | |

## H2.2 — Helena Chatbot

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 054 | Helena abre | Clicar no ícone no site | Janela abre com boas-vindas | 🟠 | | |
| 055 | Navegar em serviço | Selecionar "Backup Corporativo" | Resposta relevante exibida | 🟡 | | |
| 056 | CTA especialista | Selecionar "Falar com especialista" | Duas opções: Bookings e WhatsApp | 🔴 | | |
| 057 | CTA Bookings | Clicar em "Agendar reunião" | Abre link do Bookings | 🔴 | | |
| 058 | CTA WhatsApp | Clicar em "Falar pelo WhatsApp" | Abre wa.me/5518981890607 | 🔴 | | |

## H2.3 — JAS WhatsApp (chip 2: +55 18 98189-0607)

> Testar com número pessoal (+55 18 9 3085-2246)

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 059 | Boas-vindas | Enviar "Oi" para chip 2 | Receber *JPX DIGITAL* + menu em até 10s | 🔴 | | |
| 060 | Menu com 6 opções | Ver mensagem | 6 opções numeradas com descrição em itálico | 🔴 | | |
| 061 | Opção 1 → nome | Responder "1" | Pergunta nome completo | 🔴 | | |
| 062 | Coleta nome | Digitar nome | Pergunta empresa | 🔴 | | |
| 063 | Coleta empresa | Digitar empresa | Envia link com "*Assessment Executivo*" | 🔴 | | |
| 064 | Link Bookings correto | Ver mensagem | URL do Bookings presente e correto | 🔴 | | |
| 065 | HubSpot — contato | Verificar HubSpot | Contato com nome e empresa criado/atualizado | 🔴 | | |
| 066 | HubSpot — deal | Verificar HubSpot | Deal com serviço "Assessment Executivo" | 🔴 | | |
| 067 | Telegram notificação | Verificar Telegram | Notificação com nome, empresa e serviço | 🔴 | | |
| 068 | Opção diferente → link correto | Usar outro número, responder "3" (FinOps) | Mensagem menciona "*FinOps*" | 🟠 | | |
| 069 | Opção 6 → HUMAN_TAKEOVER | Responder "6", descrever necessidade | Telegram recebe alerta de HUMAN_TAKEOVER | 🔴 | | |
| 070 | Dedup | Enviar mesma mensagem 2x em 30s | Segunda sem resposta duplicada | 🟠 | | |

## H2.4 — Geração de Documentos

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 071 | Proposta via n8n | Executar WF-004/005 com dados de teste | PDF com logo, nome do cliente e serviço corretos | 🟠 | | |
| 072 | SOW via n8n | Executar WF-010 | PDF gerado sem erro | 🟠 | | |
| 073 | Checklist Assessment | Executar WF-011 | PDF gerado | 🟡 | | |
| 074 | Kit Onboarding | Executar WF-013 | PDF gerado | 🟡 | | |

## H2.5 — Identidade e Integridade

| # | Teste | Como testar | Critério de aceite | P | Resultado | Evidência | Ação |
|---|---|---|---|---|---|---|---|
| 075 | Logo e-mail | https://jpxdigital.com.br/jpx-logo-email.png | Imagem carrega | 🟠 | | |
| 076 | Assinatura HTML | https://jpxdigital.com.br/assinatura-joao.html | Layout correto: logo, contatos, botão Bookings | 🟠 | | |
| 077 | WhatsApp links consistentes | Site + JAS + Assinatura | Todos apontam para 5518981890607 | 🔴 | | |
| 078 | Bookings links consistentes | Helena + Assinatura + JAS | Todos usam o mesmo link | 🔴 | | |

---

## Resumo de execução

### H1 — Técnica (46 testes)

| Módulo | P0 🔴 | P1 🟠 | P2 🟡 | P3 🟢 | OK | Falha |
|---|---|---|---|---|---|---|
| Site | 3 | 3 | 4 | 2 | | |
| M365 / Exchange | 4 | 3 | 0 | 0 | | |
| Bookings | 3 | 2 | 0 | 0 | | |
| HubSpot | 2 | 2 | 2 | 0 | | |
| n8n | 4 | 3 | 0 | 0 | | |
| PDF Service | 0 | 2 | 1 | 0 | | |
| Monitoramento | 0 | 0 | 3 | 0 | | |
| Segurança | 1 | 2 | 1 | 0 | | |
| **Total H1** | **17** | **17** | **11** | **2** | | |

### H2 — Comercial (32 testes)

| Módulo | P0 🔴 | P1 🟠 | P2 🟡 | P3 🟢 | OK | Falha |
|---|---|---|---|---|---|---|
| Formulário → HubSpot | 4 | 3 | 0 | 0 | | |
| Helena | 3 | 1 | 1 | 0 | | |
| JAS WhatsApp | 10 | 2 | 0 | 0 | | |
| Geração Docs | 0 | 2 | 2 | 0 | | |
| Identidade | 2 | 2 | 0 | 0 | | |
| **Total H2** | **19** | **10** | **3** | **0** | | |

---

## Falhas encontradas

| # | Fase | Descrição | P | Ação | Resolvido |
|---|---|---|---|---|---|
| | | | | | |

---

## Decisão de aprovação

**H1 aprovada quando:** zero P0 com falha
**H2 aprovada quando:** Gold Path executado 100% (ver `GOLD-PATH.md`)
**Liberado para prospecção quando:** H1 ✅ + H2 ✅ + HOMOLOGATION-REPORT.md assinado
