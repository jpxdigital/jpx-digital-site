# Deploy, Rollback e Hot-fix

## Deploy normal (via CI/CD)

Todo `git push origin main` dispara o pipeline automático:

```
1. GitHub Actions: docker build + push para GHCR
2. SSH na VM1: docker pull nova imagem
3. docker compose up -d --no-deps nextjs
4. Health check: GET /api/health a cada 5s por até 60s
5. Se 200 → deploy concluído ✅
6. Se != 200 → rollback automático para imagem anterior ❌
```

**Não há passo manual.** Se precisar de algo manual, é exceção — documentar abaixo.

## Rollback manual

Se o CI/CD não conseguir fazer rollback automaticamente:

```bash
ssh ubuntu@<VM1_IP>
cd /srv/sites/jpxdigital

# Ver últimas imagens disponíveis
docker images ghcr.io/jpxdigital/jpxdigital-site --format "{{.Tag}}\t{{.CreatedAt}}"

# Restaurar imagem anterior (substituir sha-XXXXXX pelo tag anterior)
IMAGE_TAG=sha-abc1234 docker compose up -d --no-deps nextjs

# Verificar
curl http://localhost:3000/api/health
```

## Hot-fix em produção

Para correções urgentes que não podem esperar o pipeline completo:

```bash
# 1. Criar branch de hotfix
git checkout -b hotfix/descricao-curta

# 2. Fazer a correção, testar localmente
npm run build

# 3. Merge direto na main (com PR se houver tempo)
git checkout main
git merge hotfix/descricao-curta
git push origin main
# → CI/CD dispara automaticamente
```

## Deploy na VM2 (n8n)

O n8n é atualizado automaticamente pelo Watchtower às 4h da manhã.

Para forçar atualização manual:

```bash
ssh ubuntu@<VM2_IP>
cd /srv/sites/n8n

docker compose pull n8n
docker compose up -d --no-deps n8n

# Verificar
docker compose logs -f n8n --tail 50
```

## Primeiro deploy — VM1 (setup inicial)

```bash
# 1. SSH na VM
ssh ubuntu@<VM1_IP>

# 2. Instalar Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
newgrp docker

# 3. Clonar repositório de configs
mkdir -p /srv/sites/jpxdigital
cd /srv/sites/jpxdigital
cp /caminho/deploy/vm1/* .

# 4. Criar .env com todos os segredos
cp .env.example .env
nano .env  # preencher valores reais

# 5. Fazer login no GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u <github_user> --password-stdin

# 6. Subir os containers
docker compose up -d

# 7. Verificar
docker compose ps
curl http://localhost:3000/api/health

# 8. Systemd unit para reiniciar no boot
sudo tee /etc/systemd/system/jpxdigital.service <<EOF
[Unit]
Description=JPX Digital Site
Requires=docker.service
After=docker.service

[Service]
WorkingDirectory=/srv/sites/jpxdigital
ExecStart=/usr/bin/docker compose up
ExecStop=/usr/bin/docker compose down
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable jpxdigital
sudo systemctl start jpxdigital
```

## Checklist pós-deploy

- [ ] `curl https://jpxdigital.com.br/api/health` retorna 200
- [ ] `curl https://jpxdigital.com.br/api/ready` retorna 200
- [ ] Formulário de contato: preencher e verificar chegada no HubSpot
- [ ] Verificar e-mail de boas-vindas disparado pelo n8n
- [ ] Nginx logs sem erros: `docker compose logs nginx --tail 100`
- [ ] Certificado SSL válido no browser
- [ ] Cloudflare WAF ativo (verificar no dashboard)
