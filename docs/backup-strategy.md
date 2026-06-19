# Estratégia de Backup

## Princípio

> Um backup que nunca foi testado de restauração não é um backup — é uma esperança.

Toda estratégia aqui pressupõe **testes periódicos de restauração documentados**.

## O que fazer backup

### VM2 — Automação

| Dado | Frequência | Retenção | Destino |
|---|---|---|---|
| PostgreSQL (n8n DB) | Diário | 30 dias | OCI Object Storage |
| Volumes Docker (n8n_data) | Diário | 14 dias | OCI Object Storage |
| Redis (se persistência ativa) | Diário | 7 dias | OCI Object Storage |
| Configurações do n8n (.env) | A cada mudança | Ilimitado | Repositório privado (secrets criptografados) |

### VM1 — Site

| Dado | Frequência | Retenção | Destino |
|---|---|---|---|
| Código-fonte | Contínuo | Git history | GitHub |
| Configuração Nginx | A cada mudança | Ilimitado | Repositório privado |
| Arquivo .env | A cada mudança | Ilimitado | Cofre seguro (1Password / Bitwarden Teams) |
| Volumes Docker (redis_data) | Diário | 7 dias | OCI Object Storage |

### Certificados e segredos

| Item | Armazenamento | Observação |
|---|---|---|
| Cloudflare Origin Certificate | Repositório privado criptografado | Renovação anual |
| OCI SSH keys | 1Password / Bitwarden | Nunca no repositório principal |
| Variáveis de ambiente | Cofre seguro | Documentadas em `.env.example` (sem valores) |
| GitHub Actions Secrets | GitHub — documentar lista de secrets necessários | Ver `.github/workflows/deploy.yml` |

## Scripts de backup

### PostgreSQL — dump diário

```bash
#!/bin/bash
# /srv/scripts/backup-postgres.sh
# Executado pelo cron às 02:00 diariamente

set -euo pipefail

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/srv/backups/postgres
RETENTION_DAYS=30

mkdir -p "$BACKUP_DIR"

# Dump comprimido
docker exec jpx_postgres pg_dump \
  -U "${POSTGRES_USER:-n8n}" \
  -d "${POSTGRES_DB:-n8n}" \
  | gzip > "$BACKUP_DIR/n8n_${DATE}.sql.gz"

# Upload para OCI Object Storage
oci os object put \
  --bucket-name jpxdigital-backups \
  --name "postgres/n8n_${DATE}.sql.gz" \
  --file "$BACKUP_DIR/n8n_${DATE}.sql.gz"

# Limpeza local — mantém apenas os últimos 7 dias localmente
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +7 -delete

echo "Backup PostgreSQL concluído: n8n_${DATE}.sql.gz"
```

### Volumes Docker — backup diário

```bash
#!/bin/bash
# /srv/scripts/backup-volumes.sh

set -euo pipefail

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/srv/backups/volumes

mkdir -p "$BACKUP_DIR"

# Para cada volume crítico
for VOLUME in jpx_n8n_data jpx_postgres_data; do
  docker run --rm \
    -v "$VOLUME":/data:ro \
    -v "$BACKUP_DIR":/backup \
    alpine tar czf "/backup/${VOLUME}_${DATE}.tar.gz" -C /data .

  # Upload para OCI
  oci os object put \
    --bucket-name jpxdigital-backups \
    --name "volumes/${VOLUME}_${DATE}.tar.gz" \
    --file "$BACKUP_DIR/${VOLUME}_${DATE}.tar.gz"
done

find "$BACKUP_DIR" -name "*.tar.gz" -mtime +3 -delete
echo "Backup de volumes concluído: ${DATE}"
```

### Cron — VM2

```cron
# /etc/cron.d/jpx-backups
# PostgreSQL às 02:00
0 2 * * * root /srv/scripts/backup-postgres.sh >> /var/log/jpx-backup.log 2>&1

# Volumes às 02:30
30 2 * * * root /srv/scripts/backup-volumes.sh >> /var/log/jpx-backup.log 2>&1
```

## Procedimento de restauração

### PostgreSQL

```bash
# 1. Baixar backup do OCI
oci os object get \
  --bucket-name jpxdigital-backups \
  --name "postgres/n8n_20260618_020000.sql.gz" \
  --file /tmp/restore.sql.gz

# 2. Restaurar
gunzip -c /tmp/restore.sql.gz | docker exec -i jpx_postgres psql \
  -U n8n -d n8n
```

### Volume n8n

```bash
# 1. Parar n8n
docker compose stop n8n

# 2. Baixar e restaurar volume
oci os object get \
  --bucket-name jpxdigital-backups \
  --name "volumes/jpx_n8n_data_20260618_023000.tar.gz" \
  --file /tmp/n8n_volume.tar.gz

docker run --rm \
  -v jpx_n8n_data:/data \
  -v /tmp:/backup \
  alpine tar xzf /backup/n8n_volume.tar.gz -C /data

# 3. Reiniciar n8n
docker compose start n8n
```

## Testes de restauração

**Frequência mínima:** mensal para PostgreSQL, trimestral para volumes.

**Procedimento:**
1. Criar VM temporária na OCI (mesmo shape da VM2)
2. Instalar Docker e docker compose
3. Executar restauração conforme procedimento acima
4. Verificar: n8n inicia, workflows existem, execuções históricas acessíveis
5. Documentar: data do teste, tamanho do backup, tempo de restauração, resultado
6. Destruir VM temporária

**Registro de testes:**

| Data | Componente | Backup de | Resultado | Tempo | Responsável |
|------|-----------|-----------|-----------|-------|-------------|
| — | — | — | — | — | — |
