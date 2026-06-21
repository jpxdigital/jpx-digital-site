# Automação de Serviços — Single Source of Truth

## Conceito

Cada serviço JPX é cadastrado **uma única vez** como um objeto JSON.
A partir desse cadastro, todos os sistemas da empresa consomem os mesmos dados:

```
src/data/services/backup-corporativo.json
        │
        ├─→ Página do site          (Next.js / ServiceLayout)
        ├─→ Proposta comercial      (n8n → PDF → OCI Storage)
        ├─→ Checklist de implantação (n8n → PDF → OCI Storage)
        ├─→ SOW / Escopo            (n8n → PDF → OCI Storage)
        ├─→ Contrato                (n8n → PDF + assinatura → OCI Storage)
        ├─→ Onboarding do cliente   (n8n → e-mail/PDF)
        └─→ CRM (HubSpot)           (n8n → produto + deal + pipeline)
```

**Princípio:** o dado muda em um lugar → todos os outputs refletem automaticamente.

---

## Estrutura do JSON de serviço

Localização: `src/data/services/<slug>.json` e `src/data/segments/<slug>.json`

```jsonc
{
  // ── Identificação ──────────────────────────────────────────────────
  "slug": "backup-corporativo",           // URL: /servicos/backup-corporativo
  "category": "Continuidade & Segurança", // Tag no CRM / categoria de produto

  // ── Hero (site + proposta) ──────────────────────────────────────────
  "heroHeadline": "Backup Corporativo — RPO e RTO Definidos, Testados e Garantidos.",
  "heroSub": "...",
  "ctaLabel": "Solicitar Backup Readiness Assessment",

  // ── Problema de negócio (site + proposta: contexto executivo) ───────
  "problem": {
    "headline": "...",
    "body": ["...", "..."]
  },

  // ── Assessment (site + proposta: porta de entrada / escopo inicial) ─
  "assessment": {
    "name": "Backup Readiness Assessment",
    "body": "...",
    "checklist": [           // → checklist de assessment em PDF
      "Levantamento dos ativos críticos",
      "Avaliação do backup atual",
      "Definição de RPO e RTO"
    ]
  },

  // ── Processo (site + SOW: como o trabalho é executado) ──────────────
  "process": {
    "title": "Como implementamos",
    "steps": [               // → seções do SOW
      { "title": "Mapeamento", "desc": "..." },
      { "title": "Implantação", "desc": "..." }
    ]
  },

  // ── Benefícios (proposta: seção de valor para o decisor) ─────────────
  "benefits": [
    { "title": "Proteção comprovada", "desc": "..." }
  ],

  // ── Entregáveis (proposta + contrato + onboarding) ───────────────────
  "deliverables": [
    "Relatório de Backup Readiness Assessment",
    "Arquitetura de backup documentada",
    "Configuração em produção com agente",
    "Primeiro teste de restore documentado",
    "Relatório mensal de monitoramento"
  ],

  // ── Diferenciais (proposta: por que JPX) ─────────────────────────────
  "differentials": [
    { "title": "Restore testado mensalmente", "desc": "..." }
  ],

  // ── Ambientes suportados (proposta técnica / SOW) ────────────────────
  "supportedEnvironments": [            // campo opcional
    { "categoria": "On-premise", "itens": ["Windows Server", "Linux"] },
    { "categoria": "Cloud", "itens": ["OCI", "Azure", "AWS"] }
  ],

  // ── FAQ (site + onboarding: perguntas frequentes do cliente) ─────────
  "faqs": [
    { "question": "...", "answer": "..." }
  ]
}
```

> **O que NÃO fica no JSON:** schemas JSON-LD para SEO (gerados no `page.tsx`),
> preços/valores (variam por cliente), e dados de clientes.

---

## Mapa: campo → output

| Campo JSON | Site | Proposta | Checklist | SOW | Contrato | Onboarding | CRM |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `slug` | URL | nº referência | — | referência | referência | — | produto ID |
| `category` | tag | categoria | — | — | — | — | pipeline |
| `heroHeadline` | h1 | título | cabeçalho | título | objeto | assunto e-mail | nome do deal |
| `heroSub` | subtítulo | subtítulo | — | escopo resumo | — | — | descrição |
| `ctaLabel` | botão CTA | — | — | — | — | — | primeiro passo |
| `problem.headline` | seção problema | contexto | — | justificativa | — | — | — |
| `problem.body` | parágrafos | contexto | — | justificativa | — | — | — |
| `assessment.name` | seção assessment | nome proposta | título doc | fase 1 | objeto contrato | tarefa onboarding | nome do deal |
| `assessment.checklist` | lista visual | escopo assessment | ✅ checklist | escopo fase 1 | escopo anexo | kit boas-vindas | — |
| `process.steps` | seção processo | cronograma | — | ✅ seções SOW | escopo anexo | roteiro onboarding | tarefas CRM |
| `benefits` | seção benefícios | valor para decisor | — | — | — | — | — |
| `deliverables` | seção entregáveis | ✅ lista proposta | — | ✅ lista SOW | ✅ objeto contrato | ✅ kit entregáveis | tarefas CRM |
| `differentials` | seção diferenciais | por que JPX | — | — | — | — | — |
| `supportedEnvironments` | seção técnica | escopo técnico | — | requisitos | escopo técnico | — | — |
| `faqs` | seção FAQ | — | — | — | — | ✅ FAQ onboarding | — |

---

## Armazenamento de documentos

**OCI Object Storage** — bucket privado, pre-authenticated URLs com expiração.

```
jpx-documentos/                          ← bucket privado
├── propostas/
│   └── {ano-mes}/
│       └── {cliente-slug}-{servico-slug}.pdf
├── contratos/
│   └── {ano-mes}/
│       └── {cliente-slug}-contrato-assinado.pdf
├── sow/
│   └── {cliente-slug}-{servico-slug}-sow.pdf
└── onboarding/
    └── {cliente-slug}-onboarding-kit.pdf
```

**URL compartilhada com o cliente:** pre-authenticated request com 7 dias de expiração.
O link é gerado programaticamente pelo n8n após o upload e enviado por e-mail.

---

## Fluxo de automação — Proposta Comercial

```
Gatilho: deal criado no HubSpot (estágio "Proposta Solicitada")
  │
  ▼
n8n Workflow: gerar-proposta
  │
  ├─1─ Busca JSON do serviço (slug do deal)
  │      GET src/data/services/{slug}.json  ou  API interna
  │
  ├─2─ Busca dados do cliente (HubSpot)
  │      nome, empresa, CNPJ, e-mail, segmento
  │
  ├─3─ Preenche template HTML da proposta
  │      /templates/proposta.html + dados JSON + dados cliente
  │
  ├─4─ Converte HTML → PDF
  │      Puppeteer (rodando na VM2)
  │
  ├─5─ Upload PDF → OCI Object Storage
  │      bucket: jpx-documentos/propostas/{ano-mes}/
  │
  ├─6─ Gera pre-authenticated URL (7 dias)
  │
  ├─7─ Atualiza deal no HubSpot
  │      anexa URL do PDF + muda estágio → "Proposta Enviada"
  │
  └─8─ Envia e-mail ao cliente (Zoho SMTP)
         assunto: "Proposta {assessment.name} — JPX Digital"
         corpo:   link para o PDF + próximos passos
```

## Fluxo de automação — Onboarding do Cliente

```
Gatilho: deal fechado no HubSpot (estágio "Contrato Assinado")
  │
  ▼
n8n Workflow: onboarding-cliente
  │
  ├─1─ Busca JSON do serviço
  ├─2─ Cria tarefas no HubSpot a partir de process.steps
  ├─3─ Gera PDF do kit de onboarding (deliverables + faqs + cronograma)
  ├─4─ Upload PDF → OCI (onboarding/)
  ├─5─ Envia e-mail de boas-vindas com link do kit
  └─6─ Notificação interna (Telegram) para equipe técnica
```

---

## Templates de documentos

Localização: `docs/doc-gen/`

| Template | Input | Output |
|---|---|---|
| `proposta.html` | service JSON + client data | Proposta comercial PDF |
| `sow.html` | service JSON + client data + datas | SOW / Escopo PDF |
| `checklist-assessment.html` | `assessment.checklist` | Checklist de assessment PDF |
| `checklist-implantacao.html` | `process.steps` + `deliverables` | Checklist de implantação PDF |
| `onboarding-kit.html` | service JSON + client data | Kit de onboarding PDF |

---

## Stack de ferramentas (Cenário Startup Enxuta)

| Ferramenta | Papel na automação | Custo |
|---|---|---|
| `src/data/services/*.json` | fonte única de dados | R$ 0 |
| Next.js / ServiceLayout | renderiza páginas do site | R$ 0 |
| n8n (self-hosted, VM2 OCI) | orquestra todos os fluxos | R$ 0 |
| Puppeteer (VM2 OCI) | gera PDFs a partir de HTML | R$ 0 |
| OCI Object Storage | armazena PDFs com signed URLs | R$ 0 |
| HubSpot CRM Free | pipeline, deals, tarefas | R$ 0 |
| Zoho Mail | disparo de e-mails transacionais | R$ 0 |
| Telegram Bot | notificações internas | R$ 0 |
| **Total** | | **~R$ 4/mês** (só domínio) |

---

## Adicionando um novo serviço

1. Criar `src/data/services/<slug>.json` seguindo o schema acima
2. Criar `src/app/servicos/<slug>/page.tsx` importando o JSON (30 linhas)
3. O serviço automaticamente:
   - aparece no site via ServiceLayout
   - fica disponível para geração de proposta pelo n8n
   - pode ser associado a um deal no HubSpot

Nenhuma outra área da operação precisa ser atualizada manualmente.

---

## Próximos passos

- [ ] Criar templates HTML em `docs/doc-gen/` (proposta, SOW, checklist)
- [ ] Configurar Puppeteer na VM2 para geração de PDF
- [ ] Criar bucket `jpx-documentos` no OCI Object Storage
- [ ] Criar workflow n8n `gerar-proposta` consumindo os JSONs
- [ ] Integrar HubSpot: mapear `slug` do serviço ao campo de produto no deal
