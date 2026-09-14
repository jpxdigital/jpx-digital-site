# CHANGELOG — JPX Digital Platform

Registro de todas as alterações relevantes na plataforma.
Formato: `[DATA] Módulo — Descrição (commit ou referência)`

---

## 2026-09-14 (tarde, continuação — infra ashburn confirmada ao vivo)

- `[INFRA]` Chave `~/.ssh/oci-ashburn` (ausente nesta sessão/máquina) recebida do usuário e testada — **resolve a inconsistência anterior**: confirmado ao vivo que vm-ashburn-1 = PDF Service (`jpx-pdf`, `jpx-pdf-cloudflared`) e vm-ashburn-2 = Monitoramento (Grafana+Prometheus+Loki+cAdvisor+node-exporter), batendo com `STATUS.md`. O arquivo `deploy/vm4-ashburn/docker-compose.yml` no repo está **desatualizado** (mostra cloudflared+pdf, não o stack de monitoramento real) — limpeza pendente, baixa prioridade
- `[SITE]` 🆕 Achado: containers `jpx-suporte-frontend`/`jpx-suporte-api` rodando há 2 meses na VM1 (mesma VM do site) — app "Portal de Suporte" (`suporte.jpxdigital.com.br`, MySQL próprio, usa Gemini/OpenRouter/Groq/Cohere) nunca documentado em `STATUS.md`/`SYSTEM_MAP.md`. Chave Cohere adicionada ao `KEYS.md` (não estava lá)

## 2026-09-14 (tarde — automação de deploy n8n + investigação SMTP)

- `[N8N]` ✅ **Automação de deploy do n8n desbloqueada.** Causa raiz do Cloudflare Access travado: a política do Service Token estava com **Ação "Allow"** em vez de **"Service Auth"** — a própria Cloudflare confirma no aviso da UI: "Para tokens de serviço, use a ação Service Auth, não Permitir. Usar Permitir... provavelmente é uma configuração incorreta." Corrigido na política `github-actions-service-auth`. Testado: `HTTP 200` na API do n8n via Service Token, antes sempre `302` (`service_token_status: false`)
- `[N8N]` ✅ **Automação de deploy 100% validada em produção real.** Secrets configurados no GitHub, primeira execução real falhou (`HTTP 403 error code: 1010` — Cloudflare bloqueando a assinatura de bot do `urllib` do Python), corrigido reescrevendo o step em bash+jq+curl. Segunda execução: **3/3 workflows atualizados com sucesso** via push normal em `main`, sem clique manual no n8n. P13 resolvido em `STATUS.md`
- `[N8N]` `.github/workflows/deploy-n8n-workflows.yml` criado — atualiza workflows no n8n via API a cada push em `n8n-workflows/*.json`. Mapa de arquivo→ID em `n8n-workflows/.deploy-map.json`, cobrindo por enquanto só os 3 arquivos com correspondência 1:1 sem ambiguidade: `jas-core-intake.json`, `jas-qa-scenario-001.json`, `boas-vindas-lead.json`. Secrets necessários (`CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`, `N8N_API_KEY`) pendentes de configuração no GitHub pelo usuário (sem permissão de admin de secrets via `gh` CLI)
- `[N8N]` Testado via API: `PUT /api/v1/workflows/{id}` aceita `{name, nodes, connections, settings}` — validado com update idempotente em `jas-qa-scenario-001` (HTTP 200)
- `[SITE]` 🔴 **DKIM real falhando nos e-mails via Zoho** — confirmado com teste real (não hipótese): disparado WF-006 de verdade, e-mail chegou no Gmail com `DKIM: 'FAIL'` (`DMARC: 'PASS'` só por alinhamento de SPF). IP de envio `165.173.182.52` → reverse DNS `sender5-of-o52.zoho.com` — confirma que o envio é via Zoho de verdade (a credencial "Resend SMTP" no n8n, ID `WgJQhvWq8zsqFbSW`, usada por WF-005/006/018, está com nome desatualizado mas host real já é Zoho). O registro DNS `zoho._domainkey` existe e é válido, mas a assinatura DKIM efetiva falha — hipótese provável é o Zoho não estar configurado pra assinar com essa chave (precisa confirmar no painel Zoho Mail). Isso provavelmente explica o e-mail de teste anterior ("Thiago" QA) ter caído em spam num tenant Microsoft 365
- `[GOVERNANÇA]` **Decisão em avaliação:** migrar envio transacional (WF-005 Proposta, WF-006 Boas-vindas, WF-018 Envio Avulso) de Zoho SMTP pra Microsoft 365 SMTP AUTH, já que o DKIM do M365 já está corretamente configurado e verificado (não descoberto agora, já sabíamos de antes) — eliminaria o problema de DKIM sem depender de configuração externa ao Zoho
- `[M365]` **Estrutura de contas mapeada:** login/UPN real é **`joao@jpxdigital.com.br`** (licença Microsoft 365 Business Basic) — `jp@jpxdigital.com.br` é só um endereço SMTP secundário/alias na MESMA conta, não uma conta separada (havia confusão sobre isso). Existe também um UPN redundante `JoaoMartins@JPXDIGITAL.onmicrosoft.com` (mesma licença, provavelmente placeholder automático do M365, não usado). **Confirmado:** todas as 10 shared mailboxes (`contato@`, `comercial@`, `assessment@`, `onboarding@`, `contratos@`, `financeiro@`, `projetos@`, `operacoes@`, `privacidade@`, `relatorios@`) têm permissão **"Enviar como" (Send As)** liberada para `joao@jpxdigital.com.br` — confirma que uma única credencial SMTP AUTH nessa conta basta para enviar em nome de qualquer uma dessas caixas, sem precisar senha própria em cada uma
- `[SITE]` ✅ **DKIM do Zoho corrigido de vez — causa raiz encontrada e resolvida.** Eram DOIS problemas empilhados: (1) o registro DNS `zoho._domainkey.jpxdigital.com.br` continha a chave pública de um domínio **completamente diferente** (`zerofill.com.br`, outro domínio gerenciado na mesma conta Zoho — provável copiar-colar cruzado na configuração original); (2) mesmo corrigindo o valor, o **seletor estava errado** — o Zoho assina `jpxdigital.com.br` usando o seletor `zmail`, não `zoho`. Corrigido: criado registro `zmail._domainkey.jpxdigital.com.br` com a chave correta (copiada direto do painel do Zoho pra esse domínio específico, usando o botão de copiar — uma tentativa manual anterior teve erro de transcrição I/l). **Testado com e-mail real, 2ª vez:** `DKIM: 'PASS' com o domínio jpxdigital.com.br` (antes: `FAIL`). Registro antigo `zoho._domainkey` (com o valor certo agora, mas seletor que o Zoho não usa) deixado no ar, órfão e inofensivo — limpeza cosmética pra depois
- `[M365]` Tentativa de migrar envio de Zoho pra M365 **abortada** — `535 5.7.3 Authentication unsuccessful` mesmo com SMTP AUTH habilitado na caixa; causa: "Padrões de segurança" (Security Defaults) ativado no tenant bloqueia autenticação básica pra qualquer conta, sem exceção possível (diferente de Conditional Access, que permitiria isentar só uma conta — provavelmente não disponível no plano Business Basic). Credencial do n8n revertida pros valores originais do Zoho. Caminho correto pra usar M365 no futuro seria OAuth2/Graph API, não usuário+senha — maior escopo, não perseguido agora já que o Zoho foi corrigido
- `[M365]` ✅ **Confirmado: "SMTP autenticado" está habilitado** para `joao@jpxdigital.com.br` (Microsoft 365 Admin Center → Usuários ativos → conta → aba Email → "Gerenciar aplicativos de e-mail"). Os 3 requisitos pra migrar o envio transacional do Zoho pro M365 estão prontos: SMTP AUTH habilitado + Send As nas 10 shared mailboxes + DKIM M365 já verificado. Falta decidir se migra de fato (precisa da senha da conta pra configurar a credencial no n8n) e resolver o DKIM do Zoho antes seria a alternativa mais simples se o problema for só configuração no painel Zoho

## 2026-09-14 (madrugada — fix da condição de corrida, parte 2)

- `[N8N]` ✅ **P11b corrigido**: condição de corrida na criação de contato HubSpot. Query do nó "Criar Sessão" ajustada mais uma vez: `RETURNING ... CASE WHEN xmax = 0 THEN estado ELSE 'MENU' END AS estado ...`. Como esse nó só é executado quando o fluxo já acredita que a sessão é nova, qualquer conflito (`xmax != 0`) ali é por definição uma segunda mensagem da mesma rajada — forçar `estado = 'MENU'` nesse caso faz o nó "Verificar Estado" (que checa `estado === 'NEW'`) automaticamente parar de mandar duplicatas pro caminho de criação de contato/deal, sem precisar alterar a condição desse nó. Testado com 3 requisições simultâneas: 1 sessão + **1 contato só** no HubSpot (antes do fix: 3 contatos). WF-001 sobe pra v1.4
- `[GOVERNANÇA]` Dados de teste limpos (1 contato + 1 deal no HubSpot, 1 sessão + 2 eventos + 3 dedups no banco JAS)

## 2026-09-14 (madrugada — fix da condição de corrida)

- `[N8N]` ✅ **P11a corrigido**: condição de corrida em `jas_sessions`. Migração aplicada no banco `evolution` (container `evolution_db`): removidas as 4 duplicatas reais existentes (mesma sessão mantida por telefone, a mais recente) + criado `UNIQUE INDEX jas_sessions_telefone_active_uniq ON jas_sessions (telefone) WHERE human_takeover = false`. Nó "Criar Sessão" do WF-001 alterado para `INSERT ... ON CONFLICT (telefone) WHERE human_takeover = false DO UPDATE ... RETURNING` — atômico, sem race. **Testado com 3 requisições verdadeiramente simultâneas** (bash `&`/`wait`) do mesmo número: resultado = 1 sessão só, estado MENU correto. Sem essa mudança, o teste replicava o bug (múltiplas sessões)
- `[N8N]` 🔴 **P11b — novo achado**: o mesmo teste de 3 mensagens simultâneas, apesar da sessão correta, ainda gerou **3 contatos duplicados no HubSpot**. Causa: "Buscar Contato HubSpot" (busca por telefone antes de criar) não tem proteção contra concorrência — HubSpot não impõe unicidade por telefone (só por e-mail), e a checagem "existe?" de 3 execuções paralelas todas veem "não existe" antes de qualquer criar. É um problema distinto do de sessão, mais difícil de resolver (API do HubSpot não oferece upsert atômico por telefone). Não corrigido — registrado como pendência própria (P11b)
- `[GOVERNANÇA]` Dados de teste do teste de concorrência limpos (3 contatos + 3 deals no HubSpot, 1 sessão + 6 eventos + 3 dedups no banco JAS)

## 2026-09-13 (continuação — teste Gold Path Etapa 1 e 2)

- `[N8N]` 🔴 **Achado crítico confirmado e reproduzido**: condição de corrida em "Buscar Sessão" (WF-001). Teste controlado — 4 mensagens em sequência rápida (~4s) do mesmo número via webhook sintético — gerou **4 sessões e 4 contatos HubSpot duplicados** para o mesmo telefone, cada mensagem tratada como conversa nova (nenhuma progrediu no estado MENU → COLETANDO_NOME → COLETANDO_EMPRESA). Confirma a hipótese da auditoria original (contatos "Visitante" duplicados 2-3x no mesmo dia). Causa raiz: `SELECT ... WHERE telefone = X` não enxerga sessão recém-inserida por mensagem anterior antes do commit — sem lock nem constraint. **Correção recomendada:** `UNIQUE` constraint em `jas_sessions.telefone` (parcial, `WHERE human_takeover = false`) + `INSERT ... ON CONFLICT DO UPDATE/NOTHING` atômico, substituindo o padrão atual de SELECT-depois-INSERT. **Não corrigido nesta sessão** — fica como pendência própria (P11 em `STATUS.md`), fora do escopo do fix do `@lid`
- `[N8N]` Metodologia de teste validada: dado que o Gold Path exige "número de teste diferente do chip 2" e não havia segundo número disponível, o teste foi feito simulando o payload da Evolution API diretamente contra o webhook do n8n (`POST /webhook/jas-intake` com header `x-jas-secret`) — reproduz o fluxo real ponta a ponta (sessão, HubSpot, Telegram) sem depender de WhatsApp físico. Documentado aqui como alternativa válida para futuras homologações do JAS quando não houver chip extra disponível
- `[SITE]` Achado (Etapa 2 do teste): `/api/leads` não atualiza nome/empresa de um contato HubSpot já existente em submissões repetidas (caminho 409) — só cria um deal novo associado ao contato antigo, sem PATCH nas propriedades do contato. Registrado como P12, não corrigido nesta sessão
- `[GOVERNANÇA]` Dados de teste limpos integralmente após os testes: 7 contatos + 8 deals de teste apagados no HubSpot (voltou aos 30 contatos originais), 7 sessões + 12 eventos + 10 registros de dedup apagados em `jas_sessions`/`jas_events`/`jas_message_dedup` (banco `evolution`, container `evolution_db`)
- `[N8N]` WF-001 (JAS Core Intake) v1.1 → v1.2 — **bug crítico de dados corrigido**: contatos WhatsApp com JID `@lid` (Linked ID, privacidade de número ativada) tinham o LID de 14-15 dígitos gravado como se fosse telefone real no HubSpot (`phone` property). Auditoria via API do HubSpot encontrou 26 de 30 contatos (87%) afetados desde 07/07/2026, incluindo nomes reais de empresas (ex: "Comercial Botton Odontologia", "Atendimento Oral Sin Maringa"). Fix: nó "Extrair e Normalizar" agora detecta `@lid` (`is_lid`) e usa um campo separado `hubspot_phone` (vazio quando é LID) para a property `phone` do HubSpot — nunca mais escreve LID como telefone. Notificações no Telegram também ajustadas para mostrar "via WhatsApp (sem número direto — @lid)" em vez do número inválido. `phone_raw`/`phone` (chave de correlação de sessão) mantidos intactos — roteamento de resposta no WhatsApp e deduplicação de sessão não foram alterados. **Não corrigido nesta mudança:** duplicação de contato (3x mesmo LID no mesmo dia) parece ser condição de corrida na criação de sessão, causa raiz distinta — requer investigação separada (constraint/upsert em `jas_sessions`). ✅ **Aplicado manualmente em produção em 13/09/2026** (deploy do n8n é manual — código-fonte deste repo foi colado nos 5 nós via UI do n8n, conferido nó a nó). ⚠️ Gold Path ainda deve ser re-executado antes de considerar encerrado. ⚠️ Aproveitando a sessão: descoberto que a instância n8n nunca teve o setup inicial de owner concluído (usada só via DB direto até então) — conta de owner criada (jp@jpxdigital.com.br) e API key gerada para automação futura de deploy
- `[SITE]` Bug corrigido: `/api/health` sempre retornava `"version":"local"` em vez do SHA do commit. Causa: `deploy.yml` já passava o build-arg `NEXT_PUBLIC_COMMIT_SHA=${{ github.sha }}`, mas o `Dockerfile` nunca declarava `ARG`/`ENV` correspondente no estágio `builder` (só existia para `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) — o build-arg era descartado silenciosamente pelo Docker. Testado localmente com `docker build --build-arg` + `docker run`, confirmado `version` refletindo o SHA passado
- `[SITE]` Segurança: Next.js `15.5.22` → `15.5.25` — corrige RCE não-autenticado crítico na API de Image Optimization (AVIF, habilitado em `next.config.ts`) e RCE em servidores Windows (GHSA-p293-qw3h-jr36, GHSA-2xp9-vwfh-vxw4). `npm audit fix` também corrigiu `nanoid` e `sharp` (altas). Restou 1 alta em `postcss` (dependência interna do Next) — só resolve com Next 16 (breaking change), registrado como pendência técnica separada, risco baixo (exige processar CSS/source map não confiável)
- `[SITE]` Modo manutenção **revertido** — decisão de negócio mudou: site volta ao ar normalmente, redesign será feito com o site no ar (não mais offline). `MAINTENANCE_MODE` voltou a `false` em `src/lib/maintenance.ts`. Código do gate (`src/middleware.ts`, `/manutencao`) mantido no repo, desativado, pronto para reativar se necessário — agora com bypass automático em dev local (`NODE_ENV !== 'production'`) adicionado no meio do processo
- `[SITE]` Modo manutenção ativado por decisão de negócio: site público substituído por página "em construção" (`/manutencao`) enquanto um redesign é feito. Implementado via `src/lib/maintenance.ts` (flag) + `src/middleware.ts` (gate com 503 + Retry-After, preserva indexação SEO) — todas as rotas homologadas (formulário, Helena, HubSpot, JAS) permanecem intactas no código, apenas inacessíveis publicamente. `/api/*` explicitamente excluído do gate para não quebrar o health check do `deploy.yml`. Página de manutenção mantém WhatsApp (98189-0607) e e-mail (jp@jpxdigital.com.br) para não interromper captação de leads durante a Fase 2
- `[GOVERNANÇA]` GO-LIVE técnico de 2026-07-22 (H1 46/46, H2 32/32) declarado válido e congelado — não invalidado pelo modo manutenção. Gold Path deverá ser re-executado antes do site voltar ao ar com o redesign
- `[GOVERNANÇA]` Tag `v1.5.0` confirmada já existente no remoto (`ed79b52`, 23/07/2026) — item 1 do `SPRINT.md` estava desatualizado como pendente
- `[N8N]` WF-018 (Envio Avulso) promovido de `dev` para `main`

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
