---
name: project-infra-oci
description: VMs OCI, regiões, CLI profiles, papéis de cada VM e detalhes de acesso
metadata:
  type: project
---

## VMs OCI Always Free

| VM | Região | CLI Profile | Papel |
|----|--------|-------------|-------|
| VM1 | sa-saopaulo-1 | `jpx` (padrão) | Site principal (Next.js + Nginx + Redis) |
| VM2 | sa-saopaulo-1 | `jpx` (padrão) | Automação (n8n + PostgreSQL + Redis + Watchtower) |
| VM3 | us-ashburn-1  | `jpx-ashburn`  | Observabilidade (Grafana + Prometheus + Loki + Promtail) |
| VM4 | us-ashburn-1  | `jpx-ashburn`  | Documentos (Puppeteer PDF + OCI Object Storage bucket jpx-documentos) |

**Why:** VMs 3 e 4 foram criadas em Ashburn (us-ashburn-1) em junho de 2026.
Observabilidade em região separada garante alertas mesmo se São Paulo tiver problemas.
Puppeteer em VM dedicada protege n8n de picos de CPU na geração de PDF.

**How to apply:** Ao sugerir onde rodar algo novo, considerar o papel de cada VM antes de colocar tudo em VM1 ou VM2.

## CLI OCI

```bash
# São Paulo (padrão)
oci os bucket list --profile jpx

# Ashburn
oci os bucket list --profile jpx-ashburn
```

## OCI Object Storage

- Bucket: `jpx-documentos` (a criar na VM4 / us-ashburn-1)
- Estrutura: `propostas/`, `contratos/`, `sow/`, `onboarding/`
- Acesso: pre-authenticated requests com expiração de 7 dias

## Ports internos (nunca expostos ao host)

| Serviço | Porta | VM |
|---------|-------|----|
| Next.js | 3000 | VM1 |
| Redis | 6379 | VM1, VM2 |
| n8n | 5678 | VM2 |
| PostgreSQL | 5432 | VM2 |
| Grafana | 3001 | VM3 |
| Prometheus | 9090 | VM3 |
| Loki | 3100 | VM3 |
| Node Exporter | 9100 | todas |
| cAdvisor | 8080 | todas |
