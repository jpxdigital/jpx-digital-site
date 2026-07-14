# CHECKLIST DE HOMOLOGAÇÃO OPERACIONAL
# JPX Digital Platform — v1.4.0

**Objetivo:** validar que todos os sistemas funcionam ponta a ponta antes da prospecção ativa.
**Responsável:** João Martins
**Data de execução:** ___________
**Resultado final:** [ ] APROVADO  [ ] REPROVADO

Legenda de status: ✅ OK · ❌ FALHA · ⏭️ PULADO (justificar)

---

## MÓDULO 1 — Site (jpxdigital.com.br)

### 1.1 Carregamento e navegação

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 001 | Home carrega | Acessar https://jpxdigital.com.br | Página exibe sem erro, logo visível | | |
| 002 | HTTPS redirect | Acessar http://jpxdigital.com.br | Redireciona para HTTPS automaticamente | | |
| 003 | Nav funciona | Clicar em cada item do menu | Todos os links navegam sem 404 | | |
| 004 | Footer — razão social | Ver rodapé | "JPX Digital Tecnologia LTDA · CNPJ: 57.454.973/0001-18" | | |
| 005 | Favicon exibe | Abrir qualquer página | Ícone JPX navy aparece na aba do browser | | |
| 006 | Página /sobre | Acessar /sobre | Carrega com conteúdo e sem erro JS | | |
| 007 | Página /contato | Acessar /contato | Formulário visível e campos funcionando | | |
| 008 | Página /cases | Acessar /cases | Carrega com conteúdo | | |
| 009 | Blog / Centro de Conhecimento | Acessar /blog | Lista de artigos carrega | | |
| 010 | Artigo do blog | Clicar em um artigo | Abre sem erro, conteúdo legível | | |
| 011 | Página /privacidade | Acessar /privacidade | Exibe "JPX Digital Tecnologia LTDA" e CNPJ correto | | |
| 012 | Página /admin | Acessar /admin | Carrega (acesso interno) | | |

### 1.2 Serviços e segmentos

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 013 | Hub de serviços | Acessar /servicos | Lista todos os serviços sem erro | | |
| 014 | Página de serviço — Assessment | Acessar /servicos/assessment-executivo | Carrega com conteúdo completo | | |
| 015 | Página de serviço — Backup | Acessar /servicos/backup-corporativo | Carrega com conteúdo completo | | |
| 016 | Página de serviço — DR | Acessar /servicos/disaster-recovery | Carrega com conteúdo completo | | |
| 017 | Hub de segmentos | Acessar /segmentos | Lista todos os segmentos | | |
| 018 | Segmento — Hospitais | Acessar /segmentos/hospitais-clinicas | Carrega com conteúdo completo | | |
| 019 | CTA hero | Na home, clicar no botão principal | Navega para /servicos/assessment-executivo | | |

### 1.3 SEO e metadados

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 020 | Sitemap | Acessar /sitemap.xml | XML válido com URLs do site | | |
| 021 | Robots.txt | Acessar /robots.txt | /admin e /api bloqueados | | |
| 022 | Meta description home | View Source ou DevTools → head | meta description presente e relevante | | |
| 023 | Open Graph | DevTools → head | og:title e og:image presentes | | |
| 024 | Schema.org | DevTools → procurar `application/ld+json` | JSON-LD com Organization e CNPJ correto | | |
| 025 | Health check API | Acessar /api/health | Retorna 200 com status ok | | |

---

## MÓDULO 2 — Formulário de Contato e API de Leads

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 026 | Formulário renderiza | Acessar /contato | Campos Nome, E-mail, Empresa, Mensagem visíveis | | |
| 027 | Validação obrigatórios | Submeter vazio | Erro nos campos obrigatórios, não envia | | |
| 028 | Validação e-mail inválido | Digitar "teste@" e submeter | Erro de e-mail inválido | | |
| 029 | Submissão válida | Preencher todos os campos com dados reais e submeter | Mensagem de sucesso exibida na tela | | |
| 030 | Lead no HubSpot | Após 030, acessar HubSpot → Contatos | Contato criado com nome e e-mail corretos | | |
| 031 | Deal no HubSpot | Após 030, acessar HubSpot → Negócios | Deal criado e associado ao contato | | |
| 032 | Notificação Telegram | Após 030, verificar Telegram | Mensagem de novo lead recebida no @jpxdigital_bot | | |
| 033 | E-mail boas-vindas | Após 030, verificar caixa do e-mail usado no teste | E-mail de boas-vindas recebido (remetente: comercial@jpxdigital.com.br) | | |

---

## MÓDULO 3 — Helena (Chatbot)

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 034 | Ícone aparece | Acessar o site | Ícone da Helena no canto inferior direito | | |
| 035 | Abre ao clicar | Clicar no ícone | Janela do chat abre com boas-vindas | | |
| 036 | Navegar em serviço | Selecionar "Backup Corporativo" | Resposta sobre backup exibida | | |
| 037 | Fluxo especialista | Selecionar "Falar com especialista" | Duas opções aparecem: Bookings e WhatsApp | | |
| 038 | CTA Bookings | Clicar em "Agendar reunião" | Abre link do Microsoft Bookings | | |
| 039 | CTA WhatsApp | Clicar em "Falar pelo WhatsApp" | Abre wa.me/5518981890607 | | |
| 040 | Fechar chat | Clicar no X | Janela fecha, ícone permanece | | |

---

## MÓDULO 4 — JAS (WhatsApp)

> Testar pelo número pessoal (+55 18 9 3085-2246) enviando para o chip 2 (+55 18 98189-0607)

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 041 | Boas-vindas | Enviar "Oi" para o chip 2 | Receber mensagem com *JPX DIGITAL* e menu em até 10s | | |
| 042 | Menu exibido | Ver mensagem de boas-vindas | 6 opções numeradas com descrição em itálico | | |
| 043 | Opção 1 — Assessment | Responder "1" | Pergunta nome completo | | |
| 044 | Coleta nome | Digitar nome completo | Pergunta empresa | | |
| 045 | Coleta empresa | Digitar empresa | Envia link do Bookings com texto "*Assessment Executivo*" | | |
| 046 | Link Bookings | Ver mensagem do link | URL do Bookings presente na mensagem | | |
| 047 | HubSpot — contato | Após 046, verificar HubSpot | Contato com nome e empresa criado/atualizado | | |
| 048 | HubSpot — deal | Após 046, verificar HubSpot | Deal criado com serviço "Assessment Executivo" | | |
| 049 | Telegram | Após 046, verificar Telegram | Notificação com nome, empresa e serviço | | |
| 050 | Opção 2 — Backup | Nova sessão (aguardar 1h ou usar outro número): responder "2" ao menu | Mensagem menciona "*Backup Corporativo*" no link | | |
| 051 | Opção 6 — HUMAN_TAKEOVER | Responder "6" ao menu | Pergunta sobre a necessidade | | |
| 052 | HUMAN_TAKEOVER — Telegram | Descrever a necessidade | Telegram recebe alerta de HUMAN_TAKEOVER | | |
| 053 | Dedup — mensagem duplicada | Enviar a mesma mensagem duas vezes em 30s | Segunda mensagem não gera nova resposta | | |
| 054 | Sessão persistente | Responder ao fluxo em duas etapas com 2 min de intervalo | Estado da sessão mantido (não reinicia do zero) | | |

---

## MÓDULO 5 — Microsoft Bookings

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 055 | Link abre | Clicar no link do Bookings (da assinatura ou JAS) | Página de agendamento carrega | | |
| 056 | Horários disponíveis | Ver calendário no Bookings | Seg–Qui com slots disponíveis, Sex–Dom bloqueados | | |
| 057 | Agendar reunião | Selecionar um slot e preencher dados | Confirmação exibida na tela | | |
| 058 | E-mail confirmação | Após 057, verificar e-mail do endereço usado | E-mail de confirmação recebido | | |
| 059 | Evento no Outlook | Após 057, verificar joao@jpxdigital.com.br | Evento criado no calendário | | |

---

## MÓDULO 6 — n8n e Workflows

> Acessar n8n.jpxdigital.com.br

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 060 | n8n acessível | Abrir n8n.jpxdigital.com.br | Painel carrega, login funciona | | |
| 061 | WF-001 ativo | Ver lista de workflows | jas-core-intake-v1-0 com status "Active" | | |
| 062 | WF-002 ativo | Ver lista de workflows | jas-qa-scenario-001 com status "Active" | | |
| 063 | WF-006 ativo | Ver lista de workflows | boas-vindas-lead com status "Active" | | |
| 064 | WF-008 ativo | Ver lista de workflows | cal-booking com status "Active" | | |
| 065 | WF-009 ativo | Ver lista de workflows | hubspot-deals com status "Active" | | |
| 066 | Gerar proposta | Executar WF-004/005 com dados de teste | PDF gerado sem erro | | |
| 067 | Gerar SOW | Executar WF-010 com dados de teste | PDF gerado sem erro | | |
| 068 | Gerar checklist assessment | Executar WF-011 | PDF gerado sem erro | | |
| 069 | JAS QA — smoke test | Executar WF-002 via webhook POST /webhook/jas-qa-run | PASS em todos os 3 checks (PostgreSQL, HubSpot, Telegram) | | |

---

## MÓDULO 7 — HubSpot CRM

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 070 | Pipeline visível | HubSpot → Vendas → Negócios | Pipeline JPX com 8 estágios visível | | |
| 071 | Propriedades de Deal | Abrir um deal → ver todas as propriedades | Grupo "Dados Comerciais JPX" com 12 propriedades | | |
| 072 | Propriedades de Contato | Abrir um contato | Grupo "Perfil de Decisão JPX" com 3 propriedades | | |
| 073 | Propriedades de Company | Abrir uma empresa | Grupo "Perfil Técnico JPX" com 11 propriedades | | |
| 074 | Token válido | Verificar se automações n8n estão funcionando | Nenhum erro 401/403 nos logs do n8n | | |

---

## MÓDULO 8 — PDF Service

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 075 | Health check | Acessar https://pdf.jpxdigital.com.br/health | Retorna 200 com status ok | | |
| 076 | Proposta gerada | Executar geração via n8n ou curl | PDF com logo JPX e dados corretos | | |
| 077 | PDF no OCI Storage | Após geração, verificar bucket jpx-documentos | Arquivo salvo na pasta correta (propostas/{ano-mes}/) | | |

---

## MÓDULO 9 — Microsoft 365 / Exchange

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 078 | Recebimento e-mail | Enviar e-mail para jp@jpxdigital.com.br | E-mail recebido na caixa do Outlook | | |
| 079 | Alias contato@ | Enviar para contato@jpxdigital.com.br | E-mail recebido em joao@jpxdigital.com.br | | |
| 080 | Alias comercial@ | Enviar para comercial@jpxdigital.com.br | E-mail recebido | | |
| 081 | Envio com alias | No Outlook, enviar como jp@jpxdigital.com.br | E-mail sai com remetente correto | | |
| 082 | Assinatura instalada | Criar novo e-mail no Outlook | Assinatura HTML aparece com logo, contatos e botão Bookings | | |
| 083 | Teams funcional | Abrir Microsoft Teams | Acessa sem erro, conta joao@jpxdigital.com.br | | |
| 084 | SPF/DKIM/DMARC | Enviar e-mail para Gmail pessoal e ver headers | SPF pass, DKIM pass, DMARC pass | | |

---

## MÓDULO 10 — Monitoramento

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 085 | Grafana acessível | `ssh -L 3001:localhost:3001 -i ~/.ssh/oci-ashburn ubuntu@141.148.50.123` → http://localhost:3001 | Dashboard carrega | | |
| 086 | Prometheus targets | Grafana → Explore → Prometheus → targets | 4 VMs com status UP | | |
| 087 | Loki logs | Grafana → Explore → Loki | Logs das VMs chegando | | |
| 088 | SSL válido | Verificar https://jpxdigital.com.br | Cadeado verde, certificado válido (vence 2026-09-17) | | |

---

## MÓDULO 11 — CI/CD e Deploy

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 089 | GitHub Actions | Fazer push em branch de teste → PR → merge | Workflow deploy.yml executa sem erro | | |
| 090 | Container atualizado | Após deploy, acessar o site | Versão nova em produção | | |
| 091 | Rollback | Se necessário: reverter commit e fazer push | Deploy anterior sobe automaticamente | | |

---

## MÓDULO 12 — Segurança

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 092 | Cloudflare WAF ativo | Acessar Cloudflare → Security → WAF | Regras ativas, sem bypass | | |
| 093 | Admin não indexado | Verificar /robots.txt | /admin bloqueado para crawlers | | |
| 094 | Rate limiting leads | Enviar 10+ requests rápidos para /api/leads | Request bloqueado após limite (429) | | |
| 095 | KEYS.md não exposto | Acessar https://jpxdigital.com.br/KEYS.md | 404 ou bloqueado | | |
| 096 | Turnstile ativo | Inspecionar formulário /contato | Campo Turnstile presente antes do submit | | |

---

## MÓDULO 13 — Identidade Visual

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 097 | Logo e-mail | Acessar https://jpxdigital.com.br/jpx-logo-email.png | Imagem carrega corretamente | | |
| 098 | Assinatura HTML | Abrir https://jpxdigital.com.br/assinatura-joao.html | Layout correto: logo, contatos, botão Bookings | | |
| 099 | Favicon mobile | Acessar o site no celular | Ícone JPX navy aparece ao adicionar à tela inicial | | |

---

## MÓDULO 14 — Integridade dos dados

| # | Teste | Como testar | Critério de aceite | Status | Obs |
|---|---|---|---|---|---|
| 100 | CNPJ correto no site | Inspecionar footer e /privacidade | CNPJ 57.454.973/0001-18 em todos os lugares | | |
| 101 | Razão social correta | Inspecionar footer e /privacidade | "JPX Digital Tecnologia LTDA" em todos os lugares | | |
| 102 | WhatsApp chip 2 | Verificar links wa.me no site e JAS | Todos apontam para 5518981890607 | | |
| 103 | Link Bookings consistente | Verificar Helena, assinatura e JAS | Todos usam o mesmo link do Bookings | | |

---

## Resumo de execução

| Módulo | Total | OK | Falha | Pulado |
|---|---|---|---|---|
| 1 — Site | 25 | | | |
| 2 — Leads | 8 | | | |
| 3 — Helena | 7 | | | |
| 4 — JAS | 14 | | | |
| 5 — Bookings | 5 | | | |
| 6 — n8n | 10 | | | |
| 7 — HubSpot | 5 | | | |
| 8 — PDF Service | 3 | | | |
| 9 — M365 | 7 | | | |
| 10 — Monitoramento | 4 | | | |
| 11 — CI/CD | 3 | | | |
| 12 — Segurança | 5 | | | |
| 13 — Identidade | 3 | | | |
| 14 — Integridade | 4 | | | |
| **TOTAL** | **103** | | | |

---

## Falhas encontradas

| # do teste | Descrição da falha | Severidade | Responsável | Resolvido em |
|---|---|---|---|---|
| | | | | |

**Severidade:** 🔴 Bloqueador · 🟡 Importante · ⚪ Cosmético

---

## Aprovação

A plataforma está aprovada para prospecção ativa quando:
- Zero falhas 🔴 Bloqueador
- Falhas 🟡 Importantes documentadas com plano de resolução
- Módulos 1, 2, 4, 5, 9 todos OK (críticos para o fluxo comercial)

Assinatura: _________________________ Data: ___________
