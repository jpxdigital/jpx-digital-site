# CHANGELOG — JPX Digital Platform

Registro de todas as alterações relevantes na plataforma.
Formato: `[DATA] Módulo — Descrição (commit ou referência)`

---

## 2026-08-19

- `[N8N]` WF-018 criado: Envio Avulso (fornecedor/procurement) — webhook genérico para disparar e-mail via Resend SMTP (`comercial@` ou `jp@jpxdigital.com.br` configurável no payload) fora do fluxo de leads/deals. Estado: Rascunho — aguarda import manual no n8n e configuração de `JPX_WEBHOOK_SECRET`. Motivado por cotação Bitdefender/Securisoft (98 servidores ACDIGITAL)
- `[SITE]` Bug corrigido: `page.tsx` órfão em `/servicos/ai-readiness-assessment` mantinha a rota ao vivo (HTTP 200) desde 23/07, apesar de o commit `332a4e5` ter marcado o serviço como desativado (só criou `_page.disabled`, sem remover o original). Arquivo removido — rota agora retorna 404, alinhada ao Acronis
- `[INFRA]` Notebook secundário migrado de 192.168.18.12 → 192.168.18.42 (IP novo)
- `[INFRA]` Sync rsync aposentado — repositórios jpx-digital-site, jpx-suporte-docker e jpx-jms migrados para Git com branch dev/main
- `[INFRA]` jpx-jms criado no GitHub (jpxdigital/jpx-jms) e inicializado nos dois notebooks
- `[INFRA]` .claude/ adicionado ao .gitignore — worktrees do Claude Code removidos do histórico
- `[INFRA]` Aliases criados nos dois WSLs: jpx-pull, jpx-push, jpx-publish (merge dev→main dispara deploy)
- `[GOVERNANÇA]` Fluxo de publicação definido: dev = rascunho entre máquinas; main = produção com deploy automático

## 2026-07-31

- `[SITE]` Segmento "Autoridades Certificadoras" ocultado do site (Footer, home, /segmentos) — página mantida no codebase; ChatBot redirecionado para /servicos/certificados-digitais
- `[SITE]` Footer.tsx e layout.tsx — número público corrigido: 93085-2246 → 98189-0607 (JAS/Helena). Número pessoal removido de todas as superfícies públicas
- `[N8N]` WF-006 boas-vindas-lead.json — CTA e rodapé do e-mail corrigidos para número JAS (98189-0607)
- `[N8N]` WF-007 boas-vindas.json (legado) — número corrigido por consistência
- `[N8N]` WF-001 jas-core-intake.json — cross-reference pós fan-out corrigido: `$('Processar Estado')` → `$('Atualizar HS?')` em Atualizar Contato HubSpot
- `[SITE]` /api/leads route.ts — e-mail de boas-vindas agora disparado apenas para novos contatos (evita duplicação em resubmissões)

## 2026-07-30

- `[COMERCIAL]` PLAYBOOK-COMERCIAL.md v1.1 — Modelo Comercial (referência rápida), ICP com perfil descritivo, 7 entregáveis do Assessment formalizados, incluso/excluído do contrato de R$ 2.000, regra de escopo fechado com 5 elementos obrigatórios
- `[COMERCIAL]` PLAYBOOK-COMERCIAL.md v1.0 — Precificação definida: Assessment R$ 990, piso recorrente R$ 2.000/mês, projetos por escopo fechado, banco de horas não comercializado
- `[COMERCIAL]` TEMPLATES-EMAIL.md criado — 7 templates institucionais prontos para uso (prospecção, follow-up, assessment, proposta, boas-vindas)
- `[SPRINT]` Fase 2 itens #2 (Playbook) e #6 (Templates) marcados como ✅
- `[GOVERNANÇA]` ROADMAP.md reescrito — reflete estado real (Fase 2 ativa, Fase 1 encerrada, backlog atualizado)
- `[GOVERNANÇA]` STATUS.md atualizado — LinkedIn ✅ concluído, pipeline 10 estágios, Econodata 25 Score A (marco 10/25), P4/P5 substituídos
- `[GOVERNANÇA]` CHANGELOG.md — 4 entradas de 2026-07-24 adicionadas retroativamente (segurança + infra)
- `[GOVERNANÇA]` SYSTEM_MAP.md — Resend substituído por Zoho SMTP no diagrama e no inventário de serviços
- `[GOVERNANÇA]` OPERATIONS.md — contato de suporte Resend → Zoho SMTP
- `[GOVERNANÇA]` WORKFLOW_REGISTRY.md — WF-015 ZapSign: prioridade P5 → P3 (alinhado com FLUXO-COMERCIAL.md)
- `[GOVERNANÇA]` PLAYBOOK-COMERCIAL.md — ICP Score JPX: "20 a 200 funcionários" → "20 a 500 colaboradores" (alinhado com posicionamento 2026-07-24)

## 2026-07-26

- `[GOVERNANÇA]` FLUXO-COMERCIAL.md criado — mapeamento completo LinkedIn → Cliente Ativo com todos os workflows n8n
- `[DOCS]` fluxo-comercial-jpx.png adicionado em docs/
- `[COMERCIAL]` LinkedIn perfil João Martins atualizado — Sobre, Headline, Experiências JPX + Zerofill
- `[DOCS]` linkedin-joao-martins.md criado com conteúdo aprovado do perfil
- `[COMERCIAL]` PLAYBOOK-COMERCIAL.md atualizado — Pipeline JPX alinhado com etapas reais do HubSpot (10 estágios)

## 2026-07-25

- `[COMERCIAL]` LinkedIn página JPX Digital Tecnologia criada e publicada — URL linkedin.com/company/jpxdigital
- `[COMERCIAL]` Logo 300x300 e banner 1128x191 gerados e publicados na página LinkedIn
- `[COMERCIAL]` Descrição, slogan, especialidades (12) e tradução em inglês configurados
- `[COMERCIAL]` Primeira publicação da página no ar com hashtags institucionais
- `[SPRINT]` Item #3 da Fase 2 concluído — LinkedIn empresa ✅
- `[INFRA]` Next.js atualizado de 15.3.4 para 15.5.22 (CVE-2025-66478 corrigido)
- `[INFRA]` Segundo notebook sincronizado via rsync — projeto espelhado em 192.168.18.12
- `[INFRA]` Cron de sync horário configurado: projeto + configs Claude → notebook secundário
- `[INFRA]` Alias jpx-sync criado em ~/.bash_aliases

## 2026-07-24

- `[SITE]` Escopo M365 corrigido para somente backup — removidas promessas de instalação, configuração e venda (escritórios.json, advocacia.json)
- `[SITE]` Serviço Acronis expandido para plataforma completa: backup, EDR, antivírus, filtragem de URL, patch management (acronis.json → backup-rmm.json)
- `[SITE]` Marca Acronis removida do site — serviço renomeado para "Backup & RMM Gerenciado" (agnóstico: Acronis ou Datto conforme ambiente)
- `[SITE]` Rota `/servicos/acronis` desativada → `_page.disabled`; nova rota `/servicos/backup-rmm` criada
- `[SITE]` Posicionamento estratégico atualizado: PME 20–500 colaboradores, boutique de arquitetura e transformação
- `[SITE]` Home: metadata + subtítulo do hero refletem o novo ICP
- `[SITE]` Sobre: nova seção "Segmentação por maturidade" (Crescimento / Estruturada / Operação crítica)
- `[SITE]` Sobre: texto "quem somos" com ICP explícito e exclusão de microempresas justificada
- `[SITE]` Sobre: callout Helena gratuita para visitantes fora do perfil atendido
- `[SEGURANÇA]` Token Cloudflare Tunnel removido do `.env.example` (commit `b7a9229`)
- `[SEGURANÇA]` Token Resend hardcoded removido do workflow boas-vindas n8n (commit `e200bcb`)
- `[INFRA]` `.env.example` adicionado ao repositório com estrutura de variáveis documentada (commit `17df2a1`)
- `[INFRA]` `.gitignore` atualizado — excluindo relatórios de auditoria, backups n8n e scripts de provisionamento (commit `c569518`)

## 2026-07-23

- `[GOVERNANÇA]` STATUS.md: GO-LIVE renomeado para "GO-LIVE técnico" — distinção entre plataforma homologada e operação comercial iniciada
- `[GOVERNANÇA]` STATUS.md: seção "Indicadores da Plataforma" adicionada (VMs, workflows, serviços, testes, release)
- `[GOVERNANÇA]` STATUS.md: seção "Fase 2 — Próxima Missão" adicionada
- `[GOVERNANÇA]` STATUS.md: n8n descritivo ("plataforma operacional homologada") em vez de percentual
- `[GOVERNANÇA]` STATUS.md: Microsoft Bookings com detalhamento do que foi homologado
- `[GOVERNANÇA]` SPRINT.md: Fase 1 encerrada formalmente (2026-07-22); Fase 2 aberta como sprint ativo
- `[GOVERNANÇA]` PLAYBOOK-COMERCIAL.md criado: discurso comercial, ICP, Score JPX, fluxo de Assessment, objeções, templates, SLAs, HubSpot e métricas

## 2026-07-19

- `[M365]` H1.2.016: P0 resolvido — envio externo jp@jpxdigital.com.br funcionando (erro 550 5.7.708 não reproduz)
- `[M365]` 10 aliases convertidos para Shared Mailboxes com Full Access + Send As + Forwarding → jp@ (assessment, comercial, contato, contratos, financeiro, onboarding, operacoes, privacidade, projetos, relatorios)

## 2026-07-14

- `[GOVERNANÇA]` CHECKLIST-HOMOLOGACAO.md: 78 testes H1+H2, colunas P/Evidência/Ação, prioridades P0–P3
- `[GOVERNANÇA]` GOLD-PATH.md: 26 steps Lead → Cliente — regressão obrigatória pré-GO-LIVE
- `[GOVERNANÇA]` GO-LIVE.md: checklist + 9 KPIs com metas (uptime, latência, e2e)
- `[GOVERNANÇA]` HOMOLOGATION-REPORT.md: template de laudo formal
- `[GOVERNANÇA]` ROLLBACK.md: 7 cenários com passos e contingência
- `[GOVERNANÇA]` OPERATIONS.md: rotinas de abertura/encerramento, incidentes P0–P3, recuperação
- `[GOVERNANÇA]` CLAUDE.md criado na raiz: 6 perguntas obrigatórias + regra P0 + ciclo de release
- `[GOVERNANÇA]` SPRINT.md reordenado: Fase 1 Homologação antes de LinkedIn/Econodata
- `[HOMOLOGAÇÃO]` H1.1 Site: 12/12 APROVADO — falha P2 Schema.org corrigida (commit `4ed0c37`)
- `[HOMOLOGAÇÃO]` H1.2 M365: INTERROMPIDA — P0 016 (envio bloqueado 550 5.7.708 AS(8562))
- `[HOMOLOGAÇÃO]` H1.2 013/014/015: PASS — todos os aliases recebem e-mail
- `[HOMOLOGAÇÃO]` H1.2 017: PASS — DNS completo e correto (MX/SPF/DKIM/DMARC)
- `[HOMOLOGAÇÃO]` H1.2 018: PASS — assinatura instalada no Outlook
- `[JMS]` JMS-COM-009 criado: padrão de experiência do cliente (SLAs, fluxos, régua de cuidado)
- `[HOMOLOGAÇÃO]` Pasta `homologacao/2026-07-13/` criada com README e subpastas de evidências

## 2026-07-13

- `[GOVERNANÇA]` Criada pasta `governance/` com STATUS, ROADMAP, SPRINT, CHANGELOG, RELEASES, SYSTEM_MAP, WORKFLOW_REGISTRY
- `[LEGAL]` Razão social corrigida: JPX Digital Tecnologia LTDA, CNPJ 57.454.973/0001-18 — commits `c44dce5`
- `[M365]` Assinatura de e-mail HTML criada (`public/assinatura-joao.html`) — commit `039127a`
- `[IDENTIDADE]` Helena: CTAs Bookings + WhatsApp no fluxo "Falar com especialista" — commit `9be452a`
- `[JAS]` Mensagem de link usa serviço escolhido no menu (ex: "reunião de *FinOps*") — commit `2aee9e2`
- `[JAS]` Fluxo E2E validado ponta a ponta com Microsoft Bookings
- `[IDENTIDADE]` Favicon + ícones PWA texto JPX navy — commits `3f95d03`, `708dccd`
- `[IDENTIDADE]` Logo e-mail hospedado em `jpxdigital.com.br/jpx-logo-email.png` — commit `798bc10`
- `[BOOKINGS]` Microsoft Bookings "Consultoria JPX Digital — 30 min" configurado

## 2026-07-07

- `[JAS]` Coleta de nome + empresa antes de enviar link — commit `df7c2a9`
- `[JAS]` Boas-vindas simplificada (sem parágrafo boutique) — commit `20036c7`
- `[JMS]` Módulo CX criado: JMS-CX-001 (Reuniões Executivas com Teams)

## 2026-07-06

- `[JAS]` LID fix: boas-vindas chegando na 1ª mensagem de contatos @lid — commit `46ef32a`

## 2026-07-05

- `[M365]` Migração completa: MX, SPF, DKIM, DMARC, aliases, Cal.com, Teams
- `[JAS]` Máquina de estados validada E2E — commit `7aa060a`
- `[JAS]` HUMAN_TAKEOVER: notificação Telegram ativa

## 2026-07-04

- `[JAS]` JAS-QA Cenário 001 com Smoke Test — PASS em 22s — commit `d744d8d`

## 2026-07-03

- `[JAS]` Sprint 1 completo: WhatsApp → dedup → sessão → HubSpot → Telegram E2E
- `[JAS]` WhatsApp chip 2 conectado (+55 18 98189-0607)

## 2026-06-29

- `[HUBSPOT]` Token PAT rotacionado
- `[N8N]` Cal.com Booking workflow testado e validado

## 2026-06-21

- `[INFRA]` Backup n8n: credentials + workflows (`.n8n-backup-2026-06-21/`)

## 2026-06-20

- `[SITE]` Design system: `.type-*` + `.container-page` aplicados globalmente (33 instâncias)

## 2026-06-19

- `[SITE]` Escala tipográfica implementada em `globals.css`

## histórico anterior

- Site Next.js v1 deployado (jpx-vm via GitHub Actions)
- 4 VMs OCI provisionadas e configuradas
- n8n instalado e workflows de documentos ativos
- PDF Service deployado (vm-ashburn-1)
- Monitoramento Grafana/Prometheus/Loki (vm-ashburn-2)
- JMS: 24 documentos aprovados
