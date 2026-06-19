# Observabilidade — Grafana, Prometheus, Loki

## Stack completa

| Componente | Função | Porta (interna) |
|---|---|---|
| Grafana | Dashboards e alertas | 3001 (acesso via SSH tunnel) |
| Prometheus | Coleta e armazenamento de métricas | 9090 |
| Loki | Armazenamento de logs | 3100 |
| Promtail | Agente de coleta de logs | — |
| Node Exporter | Métricas do host (CPU, RAM, disco, rede) | 9100 |
| cAdvisor | Métricas dos containers Docker | 8080 |
| Nginx Exporter | Métricas Nginx (req/s, erros, conexões) | 9113 |

## O que monitorar

### Infraestrutura (Node Exporter)
- CPU: alerta se > 80% por mais de 5 minutos
- RAM: alerta se > 85%
- Disco: alerta se > 80% (+ previsão de esgotamento)
- Disco I/O: latência de leitura/escrita
- Rede: bytes in/out, erros de interface

### Containers (cAdvisor)
- CPU por container
- Memória por container (limite vs. uso real)
- Containers reiniciando (restart count)
- Uptime por container

### Nginx (Nginx Exporter)
- Requisições por segundo
- Conexões ativas
- Taxa de erros 4xx e 5xx
- Latência de resposta

### Aplicação (Next.js)
- `/api/health` — disponibilidade geral
- `/api/ready` — dependências prontas
- `/api/live` — processo respondendo
- Tempo de resposta por rota
- Taxa de erros na API /api/leads

### Logs (Loki + Promtail)
- Logs Nginx: acesso + erros
- Logs Next.js: stdout do container
- Logs do sistema: syslog/auth.log
- Queries úteis no Grafana:
  - `{job="nginx"} |= "error"` — erros Nginx
  - `{job="nginx"} |= "POST /api/leads"` — submissões de formulário
  - `{job="nginx"} | pattern "<ip> - - <_> \"<method> <path> <_>\" <status>"` — taxa de 5xx

## Deploy da stack

A stack de observabilidade está em `deploy/monitoring/docker-compose.yml`.

Pode rodar na VM1 (em paralelo com o site) ou em uma VM dedicada.

**Nunca expor as portas diretamente na internet.** Acesso via SSH tunnel:

```bash
# Acesso ao Grafana via SSH tunnel
ssh -L 3001:localhost:3001 ubuntu@<VM1_IP>
# Então abre: http://localhost:3001
```

## Alertas recomendados

Configurar no Grafana → Alerting:

| Alerta | Condição | Canal |
|---|---|---|
| Disco crítico | uso > 85% | E-mail + WhatsApp |
| Container reiniciando | restart > 3 em 10min | E-mail |
| Site indisponível | /api/health != 200 por 2min | WhatsApp |
| Taxa de erro alta | 5xx > 5% em 5min | E-mail |
| CPU sustentada | > 85% por 10min | E-mail |

## Retenção

- Prometheus: 30 dias (configurado em `prometheus.yml`)
- Loki: 30 dias (configurado em `loki.yml`)
- Grafana: dashboards versionados em `deploy/monitoring/grafana/dashboards/`

## Próximo passo

Criar VM3 (OCI — shape Ampere A1, 2 OCPU, 8 GB RAM, 50 GB disco):
1. Copiar `deploy/monitoring/` para a VM
2. Ajustar IPs dos targets no `prometheus.yml`
3. `docker compose up -d`
4. Configurar alertas no Grafana
5. Adicionar regra no OCI Security List: VM3 pode conectar em VM1:9100, 9113, 8080
