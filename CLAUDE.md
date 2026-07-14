# CLAUDE.md — JPX Digital Platform

Instruções obrigatórias para toda sessão de IA neste projeto.

---

## Protocolo obrigatório antes de qualquer implementação

Antes de escrever código ou alterar qualquer arquivo, responder estas seis perguntas:

1. **Qual Sprint?** — Está no escopo do sprint atual em `governance/SPRINT.md`?
2. **Qual módulo?** — Site / Infra / JAS / n8n / HubSpot / M365 / Docs?
3. **Qual documento rege isso?** — Existe JMS, JAS-ARC, JAS-STD ou doc em `docs/` que define o comportamento esperado?
4. **Existe workflow semelhante?** — Verificar `governance/WORKFLOW_REGISTRY.md` antes de criar algo novo.
5. **Vai alterar produção?** — Se sim, descrever o impacto e confirmar com o usuário.
6. **Critério de aceite?** — Como saber que está funcionando corretamente?

Se não conseguir responder todas as seis, não implementar. Perguntar ao usuário primeiro.

---

## Contexto do projeto

**Empresa:** JPX Digital Tecnologia LTDA — CNPJ 57.454.973/0001-18
**Nome comercial:** JPX Digital
**Site:** https://jpxdigital.com.br
**E-mail:** jp@jpxdigital.com.br

**Modelo de negócio:** consultoria boutique premium — 10 a 15 clientes recorrentes de médio porte. Não é MSP de massa. Qualidade de vida e autonomia são critérios de decisão.

---

## Arquivos de referência

| O que precisa | Onde está |
|---|---|
| Estado atual de tudo | `governance/STATUS.md` |
| Sprint em andamento | `governance/SPRINT.md` |
| Planejamento futuro | `governance/ROADMAP.md` |
| Histórico de mudanças | `governance/CHANGELOG.md` |
| Versões em produção | `governance/RELEASES.md` |
| Mapa do sistema | `governance/SYSTEM_MAP.md` |
| Inventário de workflows | `governance/WORKFLOW_REGISTRY.md` |
| Credenciais | `KEYS.md` (gitignored — nunca commitar) |
| Arquitetura JAS | `/home/petruzz/jas/JAS-ARC-001.md` |
| Processos comerciais | `/home/petruzz/jpx-jms/02-comercial/` |

---

## Regras invioláveis

- **Nunca commitar KEYS.md** nem qualquer arquivo com credenciais
- **Nunca acessar VMs diretamente** para mudanças — somente via GitHub (deploy automático)
- **Nunca criar workflow n8n** sem registrar em `governance/WORKFLOW_REGISTRY.md`
- **Nunca iniciar JAS Sprint 2+** antes do primeiro Assessment vendido
- **Sempre atualizar** `governance/CHANGELOG.md` após mudanças relevantes
- **Sempre atualizar** `governance/STATUS.md` quando o estado de um módulo mudar
- **Sempre responder em português do Brasil**

---

## Deploy

Push para `main` → GitHub Actions → deploy automático para:
- `deploy.yml` → jpx-vm (site)
- `build-pdf-service.yml` → vm-ashburn-1 (PDF)
- `deploy-jas-bridge.yml` → jpx-n8n (JAS) ⚠️ ainda manual via SCP

---

## Identidade visual

- Cores: navy `#0A2463` (primária), azul `#0078D4` (secundária)
- Tipografia: Manrope (headings) + Inter (body)
- Padrão logo: texto `JPX` navy + `Digital` azul — igual ao site
