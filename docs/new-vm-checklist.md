# Checklist — Criar e Configurar Nova VM na OCI

Use este checklist sempre que criar uma nova VM para a plataforma JPX Digital.
Garante padronização entre ambientes e facilita o onboarding de novos ambientes.

## 1. Provisionamento OCI

- [ ] Shape: **VM.Standard.A1.Flex** (Ampere ARM) — custo-benefício superior
  - Site (VM1): 2 OCPU, 12 GB RAM, 100 GB boot volume
  - Automação (VM2): 2 OCPU, 8 GB RAM, 50 GB boot volume
  - Observabilidade (VM3): 2 OCPU, 8 GB RAM, 50 GB boot volume
- [ ] Imagem: **Ubuntu 24.04 LTS** (ARM64)
- [ ] SSH Key: usar a key do repositório de segredos (não criar nova por default)
- [ ] VCN: `jpx-vcn` (criar se não existir)
- [ ] Subnet: `jpx-subnet-publica`
- [ ] Public IP: atribuir IP público estático (Reserved IP)

## 2. Security List OCI (Ingress)

- [ ] Porta 22 (SSH): apenas do IP do escritório / VPN (não 0.0.0.0/0)
- [ ] Porta 80 (HTTP): apenas IPs Cloudflare (ver [cloudflare.md](./cloudflare.md))
- [ ] Porta 443 (HTTPS): apenas IPs Cloudflare
- [ ] Outras portas: todas bloqueadas por padrão

## 3. Sistema Operacional

```bash
# Conectar via SSH
ssh ubuntu@<IP>

# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Timezone Brasil
sudo timedatectl set-timezone America/Sao_Paulo

# Hostname descritivo
sudo hostnamectl set-hostname jpx-<nome>-vm<numero>
# Exemplo: jpx-site-vm1, jpx-auto-vm2, jpx-obs-vm3

# Configurar NTP
sudo apt install -y chrony
sudo systemctl enable chrony --now
```

## 4. Hardening básico

```bash
# Fail2ban — bloqueia IPs com tentativas de login excessivas
sudo apt install -y fail2ban
sudo systemctl enable fail2ban --now

# ufw — firewall de SO (camada adicional além do Security List OCI)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from <IP_ESCRITORIO> to any port 22
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Desabilitar login SSH por senha (usar apenas key)
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# Desabilitar root SSH
sudo sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

## 5. Docker

```bash
# Instalar Docker (método oficial)
curl -fsSL https://get.docker.com | sh

# Adicionar ubuntu ao grupo docker
sudo usermod -aG docker ubuntu
newgrp docker

# Verificar
docker run --rm hello-world

# docker compose v2 (já incluído com Docker Engine moderno)
docker compose version
```

## 6. Estrutura de diretórios

```bash
sudo mkdir -p /srv/sites
sudo mkdir -p /srv/scripts
sudo mkdir -p /srv/backups
sudo chown -R ubuntu:ubuntu /srv
```

## 7. Copiar configurações

```bash
# Copiar os arquivos do diretório deploy/ correspondente ao papel da VM
# Exemplo para VM1 (site):
scp deploy/vm1/* ubuntu@<IP>:/srv/sites/jpxdigital/

# Criar .env a partir do exemplo
cp /srv/sites/jpxdigital/.env.example /srv/sites/jpxdigital/.env
nano /srv/sites/jpxdigital/.env  # preencher valores reais

# Nunca commitar o .env com valores reais
```

## 8. Systemd — reiniciar containers no boot

```bash
sudo tee /etc/systemd/system/jpx-<nome>.service <<EOF
[Unit]
Description=JPX Digital — <nome>
Requires=docker.service
After=docker.service network-online.target

[Service]
WorkingDirectory=/srv/sites/<nome>
ExecStart=/usr/bin/docker compose up
ExecStop=/usr/bin/docker compose down
Restart=always
RestartSec=10
User=ubuntu

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable jpx-<nome>
sudo systemctl start jpx-<nome>
```

## 9. Cloudflare DNS

- [ ] Adicionar registro A no Cloudflare apontando para o IP público da VM
- [ ] Proxied: ✅ (laranja) para dominíos web
- [ ] Proxied: ❌ (cinza/DNS only) para registros internos ou MX

## 10. Backup dos scripts

- [ ] Copiar scripts de backup para `/srv/scripts/`
- [ ] Configurar cron: `sudo crontab -e`
- [ ] Testar execução manual do script antes de confiar no cron
- [ ] Verificar que o bucket OCI Object Storage está acessível

## 11. Verificação final

- [ ] `docker compose ps` — todos os containers `Up`
- [ ] `curl http://localhost:<porta>/api/health` — HTTP 200
- [ ] SSH funciona com key (senha desabilitada)
- [ ] ufw ativo: `sudo ufw status`
- [ ] fail2ban ativo: `sudo fail2ban-client status`
- [ ] Timezone correto: `date`
- [ ] Cloudflare DNS aponta para IP correto
- [ ] Acesso HTTPS funciona via Cloudflare

## Nomenclatura padrão

| Item | Padrão | Exemplo |
|---|---|---|
| VM hostname | `jpx-<função>-vm<n>` | `jpx-site-vm1` |
| Container name | `jpx_<serviço>` | `jpx_nextjs` |
| Volume name | `jpx_<serviço>_<dado>` | `jpx_postgres_data` |
| Network name | `jpx_<escopo>` | `jpx_backend` |
| Bucket OCI | `jpxdigital-<finalidade>` | `jpxdigital-backups` |
| Subdomínio interno | `<serviço>.jpxdigital.internal` | `grafana.jpxdigital.internal` |
