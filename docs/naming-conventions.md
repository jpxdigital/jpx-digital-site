# Convenções de Nomenclatura

Padrões aplicados em toda a plataforma JPX Digital.
Consistência evita ambiguidade e facilita automação.

## VMs

| Padrão | Exemplo |
|---|---|
| `jpx-<função>-vm<n>` | `jpx-site-vm1`, `jpx-auto-vm2`, `jpx-obs-vm3` |

Funções: `site`, `auto` (automação), `obs` (observabilidade), `landing`

## Containers Docker

| Padrão | Exemplo |
|---|---|
| `jpx_<serviço>` | `jpx_nextjs`, `jpx_nginx`, `jpx_redis`, `jpx_postgres` |

Prefixo `jpx_` em todos para evitar conflito com outros projetos na mesma VM.

## Volumes Docker

| Padrão | Exemplo |
|---|---|
| `jpx_<serviço>_<dado>` | `jpx_postgres_data`, `jpx_redis_data`, `jpx_n8n_data` |

## Redes Docker

| Padrão | Descrição |
|---|---|
| `jpx_frontend` | Tráfego web: Nginx ↔ Next.js |
| `jpx_backend` | Tráfego interno (internal: true): Next.js ↔ Redis |
| `jpx_automation` | Tráfego VM2 (internal: true): n8n ↔ Postgres ↔ Redis |
| `jpx_monitoring` | Tráfego monitoring (internal: true) |

## Domínios e subdomínios

| Padrão | Uso |
|---|---|
| `jpxdigital.com.br` | Site principal |
| `<serviço>.jpxdigital.com.br` | Serviços públicos (ex: `n8n.jpxdigital.com.br`) |
| `<serviço>.jpxdigital.internal` | Serviços internos — nunca expostos (ex: `grafana.jpxdigital.internal`) |

## OCI Object Storage

| Padrão | Exemplo |
|---|---|
| `jpxdigital-<finalidade>` | `jpxdigital-backups`, `jpxdigital-assets` |

Objetos dentro do bucket:
```
backups/
  postgres/n8n_20260618_020000.sql.gz
  volumes/jpx_n8n_data_20260618_023000.tar.gz
assets/
  og-image.png
  ...
```

## Branches Git

| Branch | Propósito |
|---|---|
| `main` | Produção — toda push dispara CI/CD |
| `develop` | Integração antes de ir para main |
| `feature/<descrição>` | Nova funcionalidade |
| `fix/<descrição>` | Correção de bug |
| `hotfix/<descrição>` | Correção urgente em produção |

## Secrets GitHub Actions

| Secret | Descrição |
|---|---|
| `OCI_VM1_HOST` | IP público da VM1 |
| `OCI_VM2_HOST` | IP público da VM2 |
| `OCI_SSH_KEY` | Chave SSH privada para deploy |
| `HUBSPOT_TOKEN` | Token HubSpot CRM |
| `N8N_INTERNAL_SECRET` | Segredo compartilhado Next.js ↔ n8n |
| `ADMIN_SECRET` | Senha do painel /admin |
| `REDIS_PASSWORD` | Senha do Redis VM1 |

## Variáveis de ambiente (.env)

Padrão para chaves no `.env`:
- `SNAKE_UPPER_CASE` para todas as variáveis
- Prefixo `NEXT_PUBLIC_` apenas para variáveis expostas ao browser (nenhuma contém segredo)
- Variáveis de segredo nunca começam com `NEXT_PUBLIC_`

## Sites multi-tenant

Ao criar um novo site na plataforma:

```
/srv/sites/<nome-do-site>/
  docker-compose.yml
  nginx.conf
  .env                    ← nunca versionado
  .env.example            ← versionado, sem valores
```

Systemd unit: `jpx-<nome-do-site>.service`
Porta do Next.js: incrementar a partir de 3000
- jpxdigital: 3000
- landing-cloud: 3001
- landing-backup: 3002
- próximo: 3003
