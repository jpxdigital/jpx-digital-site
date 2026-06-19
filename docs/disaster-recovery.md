# Runbook de Recuperação de Desastres

## Cenários cobertos

| Cenário | RTO estimado | Seção |
|---|---|---|
| Container Next.js reiniciando em loop | 5 min | [→](#container-nextjs-em-loop) |
| VM1 inacessível | 30 min | [→](#vm1-inacessível) |
| Ataque ransomware — dados criptografados | 2-4h | [→](#ransomware) |
| Banco PostgreSQL corrompido | 1-2h | [→](#postgresql-corrompido) |
| Credenciais comprometidas | 30-60 min | [→](#credenciais-comprometidas) |

---

## Container Next.js em loop

**Sintoma:** site fora do ar, `/api/health` não responde, `docker compose ps` mostra container reiniciando.

```bash
ssh ubuntu@<VM1_IP>
cd /srv/sites/jpxdigital

# Ver logs do container
docker compose logs nextjs --tail 100

# Se for erro de variável de ambiente
nano .env  # corrigir valor incorreto
docker compose up -d --no-deps nextjs

# Se for erro de imagem corrompida
docker compose pull nextjs
docker compose up -d --no-deps nextjs
```

---

## VM1 inacessível

**Sintoma:** SSH não responde, site fora do ar.

1. Verificar no console OCI se a VM está running
2. Se parada: iniciar via console OCI
3. Se running mas sem SSH: reboot via console OCI
4. Se disco cheio: conectar via console serial OCI, liberar espaço
   ```bash
   docker system prune -f  # remove imagens e containers não usados
   ```
5. Se a VM não recuperar: criar nova VM a partir do snapshot (se existir) ou do zero (ver [new-vm-checklist.md](./new-vm-checklist.md))

**Apontar DNS para VM de contingência durante recuperação:**
- Cloudflare DNS → trocar IP do `jpxdigital.com.br` para VM temporária
- TTL: mínimo 60s para propagação rápida

---

## Ransomware

**Sintoma:** arquivos criptografados, extensões desconhecidas, nota de resgate.

**Ação imediata:**
1. **Isolar** — desligar a VM afetada imediatamente via console OCI (não tente limpar — preserve evidências)
2. **Não pagar** — backups existem para isso
3. **Criar nova VM** — seguir [new-vm-checklist.md](./new-vm-checklist.md)
4. **Restaurar PostgreSQL** — seguir [backup-strategy.md](./backup-strategy.md#procedimento-de-restauração)
5. **Restaurar volumes** — n8n workflows e configurações
6. **Rotacionar TODOS os segredos** — os segredos da VM comprometida devem ser considerados expostos:
   - `N8N_INTERNAL_SECRET`
   - `HUBSPOT_TOKEN`
   - `ADMIN_SECRET`
   - `REDIS_PASSWORD`
   - Chaves SSH
   - Tokens GitHub Actions
7. **Análise forense** — antes de desligar a VM comprometida, fazer snapshot do disco para análise posterior

---

## PostgreSQL corrompido

**Sintoma:** n8n não inicia, logs mostram erro de conexão ou dados corrompidos.

```bash
# 1. Parar n8n
docker compose stop n8n

# 2. Tentar recuperação nativa do PostgreSQL
docker exec jpx_postgres pg_dumpall -U n8n > /tmp/pg_dump_attempt.sql
# Se falhar, ir para restauração de backup

# 3. Restaurar último backup
# (seguir procedimento em backup-strategy.md)

# 4. Reiniciar n8n
docker compose start n8n
docker compose logs -f n8n --tail 50
```

---

## Credenciais comprometidas

**Sintoma:** acesso não autorizado detectado, alerta de login anômalo.

**Rotação imediata:**

```bash
# 1. GitHub Actions Secrets — revogar e regerar no GitHub
# Settings → Secrets → Actions → revogar cada secret comprometido

# 2. Revogar SSH key comprometida
# OCI Console → Compute → Instance → SSH Keys → remover key comprometida
# Adicionar nova key

# 3. Rotacionar segredos no .env da VM
ssh ubuntu@<VM1_IP>
cd /srv/sites/jpxdigital
nano .env  # gerar novos valores para os segredos comprometidos
docker compose up -d  # aplicar novos valores

# 4. Revogar token HubSpot no dashboard HubSpot
# Gerar novo token → atualizar .env

# 5. Verificar logs de acesso do período suspeito
docker compose logs nginx --since "2026-06-18T00:00:00" | grep -E "POST|DELETE|PUT"
```

---

## Contatos de emergência

| Serviço | Contato de suporte |
|---|---|
| Oracle OCI | support.oracle.com |
| Cloudflare | dash.cloudflare.com → Support |
| GitHub | support.github.com |
| HubSpot | help.hubspot.com |
| Zoho (e-mail) | help.zoho.com |
