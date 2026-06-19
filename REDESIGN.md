# JPX Digital — Plano Estratégico de Redesenho

> Documento vivo. Atualizar conforme cada fase for concluída.
> Última revisão: 2026-06-18

---

## 0. Visão estratégica — requisito fundacional

> "Não desenvolver apenas um site institucional. Desenvolver uma **plataforma de marketing** preparada para crescer durante os próximos **cinco anos**, priorizando SEO, performance, acessibilidade, escalabilidade e geração de leads qualificados."

Isso muda a mentalidade de execução em todos os pontos:

| Decisão | Mentalidade de site | Mentalidade de plataforma |
|---------|---------------------|---------------------------|
| Estrutura de pastas | Funciona hoje | Escala para 200 páginas sem refatorar |
| Componentes | Resolve o problema imediato | Reutilizável, tipado, documentado |
| SEO | Meta tags básicas | Schema completo, sitemap dinâmico, canonical, hreflang pronto |
| Blog | "adicionamos depois" | Estrutura de conteúdo desde o dia 1 (MDX ou CMS) |
| Performance | Passa no Lighthouse | Core Web Vitals ≥ 95 em produção, monitorado |
| Acessibilidade | Não é prioridade | WCAG 2.1 AA — requisito, não opcional |
| Analytics | Google Analytics básico | Eventos de conversão mapeados, funil de lead rastreado |
| Leads | Formulário genérico | Campos qualificadores, scoring, integração CRM desde o início |

---

## 1. Diagnóstico do site atual

### O que existe hoje
- Single page (Home) com hero, cards de produtos, "por que JPX" e formulário de contato
- Página `/admin` com analytics e gerenciamento de env vars
- Stack: React + Vite + Cloudflare Pages Functions
- Design dark, DM Sans + Syne, azul Microsoft como cor primária

### Problemas críticos do estado atual
1. **Posicionamento errado** — o site atual comunica "produtos de prateleira" (Bitdefender, Datto, n8n). O brief exige posicionar a JPX como *consultoria especializada*, não revendedora.
2. **Profundidade zero** — uma única página não permite SEO por serviço, não ranqueia para nenhum termo específico.
3. **Ausência de autoridade** — sem cases, sem sobre, sem equipe, sem prova social.
4. **CTAs fracos** — todos levam ao WhatsApp genérico; sem captura de lead qualificada.
5. **Público indefinido** — a linguagem atual serve qualquer PME; o brief exige falar com CEOs, CIOs e Diretores de empresas que dependem criticamente de tecnologia.

---

## 2. Estratégia de posicionamento

**Posição:** Consultoria boutique premium de TI e Cloud — não MSP de massa, não assistência técnica.

**Tom de voz:** Executivo, direto, técnico quando necessário — mas sempre voltado ao problema do cliente, não ao produto.

**Diferencial central:** "Ambientes críticos exigem especialistas que entendem o negócio, não apenas a tecnologia."

**Evitar absolutamente:**
- Frases como "somos os melhores", "a melhor solução"
- Listagem de logos de fabricantes como diferencial
- Linguagem de varejo / assistência técnica
- Preços expostos sem contexto

---

## 3. Arquitetura do site (sitemap)

```
/                                    → Home
/sobre                               → Sobre a JPX Digital
/servicos                            → Hub de Serviços
  /servicos/cloud-computing          → Cloud Computing
  /servicos/oracle-cloud-oci         → Oracle Cloud Infrastructure (OCI)
  /servicos/microsoft-azure          → Microsoft Azure
  /servicos/aws                      → Amazon Web Services
  /servicos/backup-corporativo       → Backup Corporativo
  /servicos/disaster-recovery        → Disaster Recovery
  /servicos/business-continuity      → Business Continuity
  /servicos/backup-microsoft-365     → Backup — Microsoft 365   ← (foco em backup M365)
  /servicos/finops                   → FinOps
  /servicos/virtualizacao            → Virtualização
  /servicos/containers-kubernetes    → Docker & Kubernetes
  /servicos/firewall-vpn             → Firewall & VPN
  /servicos/monitoramento            → Monitoramento
  /servicos/hardening                → Hardening
  /servicos/acronis                  → Acronis Cyber Protect
  /servicos/resiliencia-cibernetica  → Resiliência Cibernética
  /servicos/infraestrutura           → Infraestrutura Corporativa
  /servicos/suporte-gerenciado       → Suporte Gerenciado
  /servicos/migracao-de-ambientes    → Migração de Ambientes
  /servicos/consultoria-estrategica  → Consultoria Estratégica
/segmentos                           → Hub de Segmentos
  /segmentos/hospitais-clinicas      → Hospitais & Clínicas
  /segmentos/industrias              → Indústrias
  /segmentos/escritorios             → Escritórios Corporativos
  /segmentos/advocacia               → Escritórios de Advocacia
/parceiros                           → Parceiros Tecnológicos
/cases                               → Cases de Sucesso
/blog                                → Blog
/contato                             → Contato / Solicitar Assessment
/admin                               → Painel interno (mantido)
```

**Total: ~35 URLs indexáveis** — escala para 50+ com blog e cases.

### Decisão de arquitetura
Pages individuais por serviço (em vez de uma página com tabs ou accordion) por três razões:
1. **SEO**: cada URL indexa uma intenção de busca específica ("disaster recovery para hospitais", "migração Azure SP")
2. **Conversão**: o visitante que chega por busca específica encontra conteúdo exatamente para ele
3. **Autoridade**: profundidade de conteúdo por tema demonstra especialização real

---

## 4. Design System — diretrizes

### Paleta (revisada)
```
--bg-base:      #F8F9FA   (claro — quebra com dark-mode atual, transmite mais confiança corporativa)
--bg-surface:   #FFFFFF
--bg-dark:      #0A0E1A   (hero e seções de destaque)

--primary:      #0A2463   (azul marinho profundo — autoridade)
--primary-light:#1E5FAD
--accent:       #00B4D8   (azul-ciano — modernidade tech)

--text:         #111827
--text-muted:   #6B7280
--text-light:   #F9FAFB   (sobre fundos escuros)

--border:       #E5E7EB
--success:      #059669
```

### Tipografia
```
Headings: Inter (700/800) — mais neutro e corporativo que Syne
Body:     Inter (400/500)
Mono:     JetBrains Mono — para termos técnicos, métricas
```
Tamanhos: H1 56–72px, H2 40px, H3 28px, body 16–18px. Escala generosa.

### Espaçamento
Section padding: 120px vertical. Muito espaço em branco. Grid 12-colunas.

### Componentes essenciais
- **Hero:** título + subtítulo + 2 CTAs + trust bar (logos parceiros)
- **Service card:** ícone + título + 1-liner + link "Saiba mais"
- **Stat block:** número grande + rótulo (ex: "99,9% SLA", "15+ anos")
- **Testimonial / Case card:** logo empresa + resultado + citação
- **CTA section:** fundo escuro + headline + 1 CTA primário + 1 secundário
- **Nav:** logo + links principais + CTA "Solicitar Assessment" destacado
- **Footer:** links agrupados + contato + certificações

### Animações
Apenas `fade-up` suave ao entrar em viewport (Intersection Observer, sem biblioteca). Sem parallax, sem partículas.

---

## 5. SEO — estrutura por página

Cada página de serviço segue este template:

```
URL:              /servicos/[slug]
Title tag:        [Serviço] para Empresas | JPX Digital
Meta description: 155 chars com keyword principal + CTA implícito
H1:               Problema que o serviço resolve (ex: "Proteja seus dados...")
H2 (seções):      O que é | Por que importa | Como atuamos | Diferenciais | FAQ | CTA
Keywords:         1 principal + 3–5 LSI por página
Canonical:        gerado automaticamente via Metadata API
```

### SEO Técnico completo ✅ (exigência confirmada)

Cada página implementa obrigatoriamente:

#### Metadata API (Next.js nativo)
```ts
export const metadata: Metadata = {
  title: "Backup Corporativo | JPX Digital",
  description: "...",
  canonical: "https://jpxdigital.com.br/servicos/backup-corporativo",
  openGraph: { title, description, url, siteName, images, locale: "pt_BR", type: "website" },
  twitter: { card: "summary_large_image", title, description, images },
}
```

#### Schema.org JSON-LD (por tipo de página)

| Página | Schemas aplicados |
|--------|-------------------|
| Home | `Organization`, `LocalBusiness`, `WebSite` |
| Sobre | `Organization`, `AboutPage` |
| Serviço | `Service`, `BreadcrumbList`, `FAQPage` |
| Segmento | `Service`, `BreadcrumbList` |
| Contato | `ContactPage`, `LocalBusiness` |
| Blog post | `Article`, `BreadcrumbList`, `FAQPage` |

#### Performance e Core Web Vitals (meta: score ≥ 95)
- `next/image` com WebP/AVIF automático + `priority` em imagens above-the-fold
- `next/font` — fontes self-hosted, sem flash de texto, zero layout shift (CLS 0)
- `next/script` — scripts de analytics com `strategy="lazyOnload"`
- Tailwind CSS purge automático (CSS mínimo em produção)
- Framer Motion com `LazyMotion` + `domAnimation` (reduz bundle de animação em 70%)
- Compressão Brotli via Cloudflare (automático no CDN)
- Cache headers otimizados via `_headers` do Cloudflare Pages
- Lazy loading nativo em todas as imagens abaixo do fold
- Nenhuma fonte carregada de CDN externo em runtime

#### Sitemap e Robots
```ts
// app/sitemap.ts — gerado em build-time, incluindo todas as páginas de serviço e segmento
// app/robots.ts — bloqueia /admin, libera todo o resto
```

#### Breadcrumbs
Estruturados semanticamente e com Schema `BreadcrumbList` em todas as páginas de nível 2+:
```
Home → Serviços → Backup Corporativo
Home → Segmentos → Hospitais & Clínicas
```

Palavras-chave prioritárias (volume + intenção comercial):

| Keyword alvo | URL da página |
|---|---|
| Consultoria OCI | `/servicos/oracle-cloud-oci` |
| Oracle Cloud Brasil | `/servicos/oracle-cloud-oci` |
| Backup Corporativo | `/servicos/backup-corporativo` |
| Disaster Recovery | `/servicos/disaster-recovery` |
| Disaster Recovery para Hospitais | `/segmentos/hospitais-clinicas` |
| Backup Microsoft 365 | `/servicos/backup-microsoft-365` |
| Continuidade de Negócios | `/servicos/business-continuity` |
| FinOps | `/servicos/finops` |
| Docker | `/servicos/containers-kubernetes` |
| Kubernetes | `/servicos/containers-kubernetes` |
| Resiliência Cibernética | `/servicos/resiliencia-cibernetica` |
| Consultoria de Infraestrutura | `/servicos/infraestrutura` |
| Consultoria de Cloud | `/servicos/cloud-computing` |
| Backup para Empresas | `/servicos/backup-corporativo` |

> Confirmado: a página de Microsoft 365 se chama **"Backup — Microsoft 365"** no menu e na URL `/servicos/backup-microsoft-365`, com foco explícito em backup e continuidade de dados no M365.

---

## 6. Copywriting — diretrizes gerais

**Estrutura de cada headline:** Problema/resultado → não produto/feature
- ❌ "Backup em Nuvem com AES-256"
- ✅ "Seus dados críticos recuperados em minutos, não dias"

**Voz e tom:**
- Fala com quem decide (CEO, CIO, Diretor) — não com técnicos
- Usa dados reais quando disponíveis (SLA, tempo de recuperação, etc.)
- Cita contextos específicos: "para hospitais que não podem parar", "para indústrias com 24/7"
- Sem adjetivos vazios: ótimo, excelente, completo, robusto

**Estrutura de página de serviço:**
1. Headline focada no problema do cliente
2. O que acontece quando esse problema não é resolvido (urgência)
3. Nossa abordagem (metodologia, não lista de features)
4. O que você ganha (outcomes mensuráveis)
5. CTA: Solicitar Assessment gratuito

---

## 7. CTAs — hierarquia

| Tipo | Texto | Onde aparece |
|------|-------|-------------|
| Primário | "Solicitar Assessment" | Nav, hero, fim de cada página |
| Secundário | "Falar com um Especialista" | Mid-page, cards de serviço |
| Terciário | "Ver Cases" / "Saiba mais" | Cards, seções de suporte |
| Urgência | "Diagnóstico Gratuito de Segurança" | Banner topo / pop eventual |

Todos os CTAs primários abrem o formulário de contato em `/contato` (não WhatsApp direto). WhatsApp fica como opção secundária.

---

## 8. Fases de implementação

### Fase 0 — Fundação (fazer antes de tudo)
- [ ] Definir paleta final e design tokens no CSS
- [ ] Instalar Inter font (Google Fonts ou self-host)
- [ ] Criar componentes base: `Button`, `Section`, `Container`, `Badge`
- [ ] Refatorar `App.jsx` para suportar múltiplas rotas
- [ ] Criar `Layout.jsx` com Nav + Footer compartilhados

### Fase 1 — Home remodelada
- [ ] Hero: novo headline, subtítulo, 2 CTAs, trust bar com logos parceiros
- [ ] Seção "Problemas que resolvemos" (3–4 dores do cliente)
- [ ] Grid de serviços (cards com link para páginas individuais)
- [ ] Seção "Por que JPX Digital" com métricas/stats
- [ ] Seção de segmentos atendidos
- [ ] CTA section de conversão
- [ ] Footer completo reestruturado

### Fase 2 — Página Sobre
- [ ] Missão / visão em linguagem executiva
- [ ] Diferenciais com argumentação (não lista de features)
- [ ] Parceiros com contexto (o que a parceria entrega ao cliente)
- [ ] CTA para contato

### Fase 3 — Hub de Serviços + primeiras páginas individuais
- [ ] `/servicos` — índice com cards e categorias
- [ ] Primeiras 5 páginas: Cloud Computing, Backup, Disaster Recovery, Segurança, Suporte Gerenciado
- [ ] Breadcrumb + Schema markup

### Fase 4 — Restante dos serviços
- [ ] Demais 14 páginas de serviço

### Fase 5 — Segmentos
- [ ] Hub de segmentos
- [ ] 3–5 páginas de segmento com casos de uso específicos

### Fase 6 — Contato e conversão
- [ ] Página `/contato` dedicada com formulário qualificador
- [ ] Substituir campos genéricos por campos que qualificam o lead
- [ ] Manter integração HubSpot + n8n existentes

### Fase 7 — SEO técnico
- [ ] `sitemap.xml` dinâmico
- [ ] `robots.txt`
- [ ] Schema markup por tipo de página
- [ ] Open Graph / Twitter cards
- [ ] Meta tags por rota (react-helmet ou equivalente)

### Fase 8 — Blog e Cases (futuro)
- [ ] Estrutura de blog (MDX ou CMS headless)
- [ ] Primeiros 3 cases de sucesso

---

## 9. Decisões técnicas

> Última revisão: 2026-06-18 — incorporando feedback do cliente.

### ⚠️ Decisão crítica pendente: framework base

Esta escolha define toda a arquitetura antes de qualquer linha de código.

#### Opção A — Manter Vite + React SPA (stack atual)
- **Prós:** sem migração, deploy funciona hoje no Cloudflare Pages, funções existentes continuam intactas
- **Contras:** SEO depende de `react-helmet-async` (metadados no client-side, Google indexa mas com limitações), sem SSG nativo, Core Web Vitals prejudicados por bundle JS inicial, roteamento manual para ~35 páginas fica verboso

#### Opção B — Migrar para Next.js ✅ (recomendado)
- **Prós:**
  - SSR/SSG por página — cada `/servicos/[slug]` renderizado no servidor ou gerado estaticamente em build-time. O mecanismo de busca recebe a página completa imediatamente, sem depender de execução de JavaScript no navegador do usuário
  - `<Head>` nativo por rota — SEO sem gambiarra
  - File-based routing — 35 páginas = 35 arquivos, sem configuração manual de rotas
  - Image optimization nativa
  - Core Web Vitals superiores (LCP, FID, CLS)
  - Cloudflare Pages suporta Next.js via `@cloudflare/next-on-pages`
  - Functions existentes migram para `/app/api/` route handlers sem reescrever a lógica
- **Contras:** migração leva 1–2 sessões antes de começar o conteúdo real

**Recomendação:** migrar para Next.js agora, antes de criar qualquer página nova. O custo da migração é baixo (projeto pequeno) e o benefício de SEO é estrutural — não corrigível depois sem refatorar tudo.

---

### Demais decisões (revisadas com feedback)

| Questão | Decisão | Avaliação | Razão |
|---------|---------|-----------|-------|
| Tema | Light mode | ⭐⭐⭐⭐⭐ | Consultorias corporativas sérias usam interfaces claras. Dark associa a startup/SaaS |
| Heading font | **Manrope** (700/800) | ⭐⭐⭐⭐☆ | Elegante, moderno, corporativo — combinação Manrope + Inter é refinada |
| Body font | **Inter** (400/500) | ⭐⭐⭐⭐☆ | Máxima legibilidade, padrão em design corporativo |
| CSS | **Tailwind CSS** (sem Shadcn) | ⭐⭐⭐☆☆ | Tailwind acelera o dev mantendo design exclusivo — o que se evita é template copiado, não o framework |
| Componentes | Próprios (sem UI library) | ⭐⭐⭐⭐⭐ | Identidade visual única — biblioteca impõe estética genérica |
| Ícones | **Lucide React** | ⭐⭐⭐⭐⭐ | Leve, MIT, consistente, fácil de personalizar |
| SEO/meta | Next.js `<Head>` nativo (se migrar) ou `react-helmet-async` | — | Depende da decisão de framework |
| Imagens | SVG inline + WebP | — | Controle total, sem biblioteca |
| Animações | CSS + Intersection Observer nativo | — | Zero dependência, discretas |
| Forms | Manter lógica `/api/leads` | — | HubSpot + n8n já integrados, só migrar o handler |
| Analytics | Manter painel `/admin` | — | Cloudflare Analytics já configurado |

---

## 10. Stack definitiva ✅

```
Framework:     Next.js (App Router) — versão mais recente estável
Linguagem:     TypeScript (100% — sem arquivos .js no src/)
React:         React 19
Estilização:   Tailwind CSS altamente customizado (sem Shadcn, sem templates)
Ícones:        Lucide React
Animações:     Framer Motion (apenas microanimações — hover, fade, slide suave)
Imagens:       next/image (WebP/AVIF automático + lazy loading nativo)
Fontes:        next/font (self-hosted, sem Google Fonts request em runtime)
Scripts:       next/script (carregamento otimizado de scripts third-party)
SEO:           Metadata API nativa do App Router (SEM react-helmet)
Sitemap:       App Router sitemap.ts nativo (automático)
Robots:        App Router robots.ts nativo (automático)
Forms:         Route handlers /app/api/ (lógica HubSpot + n8n migrada)
Deploy:        VMs OCI + Nginx + PM2 (detalhado abaixo)
Analytics:     Cloudflare (CDN proxy) + painel /admin existente
```

### Por que sem react-helmet
Com o App Router, cada `page.tsx` exporta `metadata` diretamente:
```ts
export const metadata: Metadata = {
  title: "Backup Corporativo | JPX Digital",
  description: "...",
}
```
Mais limpo, tipado, sem overhead de client-side, processado em build-time.

---

## 10.1 Arquitetura de infraestrutura — VMs OCI

### Arquitetura final definida

```
Internet
    │
Cloudflare (DNS + CDN + WAF + DDoS)
    │
OCI Security List (firewall de rede)
    │
Nginx (reverse proxy + SSL termination)
    │
Next.js (systemd)
    │
API Routes (/api/lead)
  ├─ Validação de schema
  ├─ Rate limiting
  ├─ Logs estruturados
  └─ Captcha
    │
Redis
    │
Webhook interno (n8n nunca exposto)
    │
n8n
    │
SMTP
```

---

### 1. Desacoplamento: Next.js ↔ n8n via API Route

O n8n **nunca é chamado diretamente** pelo frontend. O fluxo é:

```
Visitante → Next.js → /api/lead → [validação + rate limit + logs + captcha] → webhook interno → n8n
```

**Por quê:**
- Webhook do n8n nunca fica exposto à internet
- n8n pode ser trocado futuramente sem alterar uma linha do frontend
- Autenticação entre serviços (shared secret entre Next.js e n8n)
- Auditoria completa: cada requisição logada antes de chegar no n8n

---

### 2. Gerenciamento de processos: systemd (não PM2)

```ini
# /etc/systemd/system/jpxdigital.service
[Unit]
Description=JPX Digital — Next.js
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/srv/sites/jpxdigital
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

**Por quê systemd em vez de PM2:**
- Inicia junto com o Linux — zero intervenção após reboot da VM
- Integração nativa com o OS (journalctl, cgroups, limites de recursos)
- Menos uma dependência no ambiente de produção
- Restart automático com backoff configurável
- PM2 permanece como opção se cluster mode for necessário no futuro

---

### 3. Hardening da VM (segurança em camadas)

```
Camada 1 — Rede:    OCI Security List (portas 22, 80, 443 apenas)
Camada 2 — OS:      Fail2ban (ban automático de IPs com tentativas de força bruta)
Camada 3 — SSH:     Autenticação somente por chave (PasswordAuthentication no)
Camada 4 — SELinux: Configurado corretamente — não desabilitado
Camada 5 — Docker:  Sem alteração nas regras do firewall do host
Camada 6 — Updates: Atualizações automáticas de segurança (unattended-upgrades)
```

Alinha com o template de hardening OCI que está sendo desenvolvido em paralelo.

---

### 4. Redis — cache e intermediação

```
Next.js → Redis → n8n
```

Mesmo que subutilizado no início, o Redis entra na arquitetura desde o dia 1.

**Casos de uso imediatos e futuros:**

| Uso | Quando |
|-----|--------|
| Rate limiting de `/api/lead` | Imediato |
| Cache de páginas ISR | Imediato |
| Sessão do painel `/admin` | Imediato |
| Cache de consultas ao HubSpot | Fase 2 |
| Filas de envio de e-mail | Fase 2 |
| Cache de conteúdo do blog | Fase 3 |

**Deploy:** Redis rodando na VM 2 (mesma VM do n8n), acessível apenas pela rede interna OCI.

---

### 5. Logs centralizados

```
Nginx logs
    │
Next.js logs (estruturado em JSON)
    │
Loki (ou OpenSearch)
    │
Grafana
```

**Stack de observabilidade:**
- **Loki + Grafana** — mais leve, ideal para começar (Grafana já pode ser útil na VM 2)
- **OpenSearch** — alternativa se precisar de full-text search nos logs

Desde o início os logs são estruturados em JSON para facilitar queries.

---

### 6. Estratégia de backup completa

Não apenas backup da VM — backup de cada componente individualmente:

| Componente | Método | Frequência |
|---|---|---|
| Código-fonte | GitHub (já) | Contínuo (git push) |
| `.env` e secrets | Vault criptografado + Git privado | A cada alteração |
| Configuração Nginx | Git (versionado) | A cada alteração |
| Certificados SSL | Certbot renova auto + backup S3/OCI Object Storage | Semanal |
| n8n workflows | Export JSON + Git | A cada alteração |
| n8n credenciais | Backup criptografado | Semanal |
| Redis snapshot | RDB dump → OCI Object Storage | Diário |
| Banco de dados (futuro) | Dump → OCI Object Storage | Diário |
| VM completa | OCI Boot Volume Backup | Semanal |

---

### 7. Plataforma multi-site — estrutura de diretórios

Em vez de pensar só no site da JPX Digital, a VM 1 é configurada como plataforma de hospedagem reutilizável:

```
/srv/
  sites/
    jpxdigital/          → site institucional JPX Digital
    landing-cloud/       → landing page: consultoria cloud
    landing-backup/      → landing page: backup corporativo
    landing-finops/      → landing page: FinOps
    cliente-01/          → futuro site de cliente gerenciado
```

**Nginx config por site:**
```nginx
# /etc/nginx/sites-available/jpxdigital
server {
    server_name jpxdigital.com.br www.jpxdigital.com.br;
    location / { proxy_pass http://localhost:3000; }
}

# /etc/nginx/sites-available/landing-cloud
server {
    server_name cloud.jpxdigital.com.br;
    location / { proxy_pass http://localhost:3001; }
}
```

**systemd por site:**
```
/etc/systemd/system/jpxdigital.service   → porta 3000
/etc/systemd/system/landing-cloud.service → porta 3001
/etc/systemd/system/landing-backup.service → porta 3002
```

Cada site é um processo Node.js independente, gerenciado pelo systemd, com porta própria. Nginx roteia pelo `server_name`. Adicionar um novo site = criar um diretório, um service file e um nginx config.

---

### O que muda no código Next.js
- `next.config.ts`: `output: 'standalone'` — gera bundle autônomo para rodar com Node.js puro
- `functions/api/` (Cloudflare) → `app/api/` (Next.js Route Handlers)
- `.env.local` na VM — não mais no painel Cloudflare Pages
- Deploy: GitHub Actions → SSH → `git pull && npm run build && systemctl restart jpxdigital`

### Requisitos a confirmar sobre as VMs
- [ ] Shape/specs — OCPUs e RAM de cada VM
- [ ] OS instalado — Oracle Linux ou Ubuntu?
- [ ] Node.js, Nginx, Redis já presentes?
- [ ] `jpxdigital.com.br` ainda no Cloudflare Pages ou já apontando para VM?

---

## 11. O que NÃO fazer

- Não adicionar CMS complicado antes de ter conteúdo validado
- Não usar UI library (MUI, Chakra) — vai brigar com o design premium
- Não colocar preços no site — o modelo é consultivo
- Não listar todos os fabricantes na home — foco no problema do cliente
- Não usar dark mode por padrão — decisores corporativos associam dark a startup, não a consultoria sólida
- Não criar páginas de blog sem estratégia de conteúdo definida

---

## Status das fases

| Fase | Status |
|------|--------|
| 0 — Fundação | ✅ Concluída |
| 1 — Home | ✅ Concluída |
| 2 — Sobre | ✅ Base criada |
| 3 — Hub Serviços + top 5 | 🔄 Hub criado, páginas individuais pendentes |
| 4 — Demais serviços | ⬜ Pendente |
| 5 — Segmentos | ⬜ Pendente |
| 6 — Contato | ✅ Concluída |
| 7 — SEO técnico | 🔄 sitemap.ts + robots.ts + OG + JSON-LD Organization ✅ / Schema por página ⬜ |
| 8 — Blog/Cases | ⬜ Futuro |

### O que foi entregue na migração (2026-06-18)
- Stack migrada: Vite → Next.js 15 + TypeScript + React 19 + Tailwind v4
- Design system: light mode, Manrope (headings) + Inter (body), paleta brand/secondary
- Layout global: Nav sticky com scroll detection + Footer completo com todos os links
- Home page: hero, serviços (6 cards), diferenciais, segmentos, CTA + formulário
- API /api/leads: migrada com rate limiting, n8n desacoplado, shared secret
- API /api/admin/analytics: migrada e tipada
- sitemap.ts: 35 URLs geradas automaticamente em build-time
- robots.ts: bloqueia /admin e /api/
- Organization + LocalBusiness Schema no layout raiz
- Páginas: /, /sobre, /servicos, /contato, /admin — todas buildando ✅
- Build: `next build` passa sem erros de TypeScript
