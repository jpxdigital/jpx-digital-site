# JPX Digital — Documentação Operacional

Índice de documentação para operação, deploy e expansão da plataforma JPX Digital.

## Documentos

| Arquivo | Conteúdo |
|---------|----------|
| [architecture.md](./architecture.md) | Arquitetura completa — VMs, containers, rede, fluxos |
| [observability.md](./observability.md) | Stack de observabilidade — Grafana, Prometheus, Loki |
| [backup-strategy.md](./backup-strategy.md) | Estratégia completa de backup e testes de restauração |
| [cloudflare.md](./cloudflare.md) | Configuração Cloudflare — WAF, Cache, Zero Trust, Origin Certs |
| [health-checks.md](./health-checks.md) | Endpoints /health /ready /live e integração com monitoramento |
| [deploy.md](./deploy.md) | Procedimento de deploy, rollback e hot-fix |
| [disaster-recovery.md](./disaster-recovery.md) | Runbook de recuperação de desastres |
| [new-vm-checklist.md](./new-vm-checklist.md) | Checklist para criar e configurar novas VMs na OCI |
| [naming-conventions.md](./naming-conventions.md) | Convenções de nomenclatura para containers, volumes, domínios |

## Princípios da plataforma

- **Tudo em Docker** — sem software instalado diretamente no SO além do Docker Engine
- **Sem PM2** — systemd inicia o Docker Compose no boot; Docker Compose gerencia os containers
- **PostgreSQL desde o primeiro dia** — nunca SQLite em produção
- **Watchtower** na VM de automação — n8n atualizado automaticamente às 4h
- **CI/CD via GitHub Actions** — deploy sem acesso manual; rollback automático se o health check falhar
- **Cloudflare na frente** — DNS, CDN, WAF e DDoS; as VMs aceitam conexões apenas de IPs Cloudflare
- **Backups testados** — backup sem teste de restauração não é backup

## Estado atual (junho 2026)

| Componente | VM | Status |
|------------|----|--------|
| Next.js 15 (site) | VM1 | ✅ produção |
| Nginx (reverse proxy) | VM1 | ✅ produção |
| Redis (rate limit) | VM1 | ✅ produção |
| n8n (automação) | VM2 | ✅ produção |
| PostgreSQL (n8n DB) | VM2 | ✅ produção |
| Watchtower | VM2 | ✅ produção |
| Grafana + Prometheus + Loki | — | 📋 pendente (próxima VM ou VM1) |
| Backup automatizado | — | 📋 pendente |
