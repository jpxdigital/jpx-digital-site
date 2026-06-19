# Health Checks — /health, /ready, /live

## Três endpoints, três propósitos

| Endpoint | Propósito | Falha quando |
|---|---|---|
| `GET /api/health` | Estado geral da aplicação | Sempre responde — usado pelo CI/CD |
| `GET /api/ready` | Pronto para receber tráfego | Dependências (Redis, etc.) indisponíveis |
| `GET /api/live` | Processo vivo e respondendo | Deadlock ou OOM — reinicia o container |

### `/api/health` — General health

Retorna sempre 200 (exceto se o processo Node.js morreu).
Usado pelo CI/CD para confirmar que o deploy foi bem-sucedido.

```json
{
  "status": "ok",
  "version": "sha-abc1234",
  "timestamp": "2026-06-18T15:30:00.000Z"
}
```

### `/api/ready` — Readiness probe

Verifica se todas as dependências estão acessíveis.
Se retornar 503, o load balancer/Nginx não deve enviar tráfego ao container.

```json
{
  "status": "ready",
  "checks": {
    "app": "ok",
    "redis": "ok"
  },
  "timestamp": "2026-06-18T15:30:00.000Z"
}
```

Se Redis estiver indisponível:
```json
{
  "status": "not_ready",
  "checks": {
    "app": "ok",
    "redis": "error"
  }
}
```
→ HTTP 503

### `/api/live` — Liveness probe

Verifica apenas se o processo está vivo (responde HTTP).
Se retornar 503 ou não responder, o container deve ser reiniciado.

```json
{
  "status": "alive",
  "uptime": 3600,
  "timestamp": "2026-06-18T15:30:00.000Z"
}
```

## Integração com monitoramento

### Prometheus — scrape via blackbox_exporter

```yaml
# prometheus.yml
- job_name: jpx_health
  metrics_path: /probe
  params:
    module: [http_2xx]
  static_configs:
    - targets:
        - http://nextjs:3000/api/health
        - http://nextjs:3000/api/ready
        - http://nextjs:3000/api/live
  relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: blackbox_exporter:9115
```

### Grafana — alerta de disponibilidade

Alerta quando `/api/ready` retorna != 200 por mais de 2 minutos:
- Canal: WhatsApp (via n8n) + e-mail
- Mensagem: "Site JPX Digital indisponível — {endpoint} retornou {status}"

### Docker Compose — healthcheck nativo

No `deploy/vm1/docker-compose.yml`, o container Next.js já tem `HEALTHCHECK` no Dockerfile:
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1
```

Quando implementar Redis client no projeto, substituir por:
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/ready || exit 1
```

## Implementação dos endpoints

Os três endpoints já estão implementados em:
- `src/app/api/health/route.ts` — health geral (implementado)
- `src/app/api/ready/route.ts` — readiness (implementar quando Redis client instalado)
- `src/app/api/live/route.ts` — liveness (implementar junto com ready)

Quando instalar o pacote `redis`:
```bash
npm install redis
```

Atualizar `src/app/api/ready/route.ts` para testar a conexão Redis antes de retornar 200.
