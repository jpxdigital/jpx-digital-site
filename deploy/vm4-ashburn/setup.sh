#!/bin/bash
# Setup VM4 Ashburn — Cloudflare Tunnel + serviço de geração de PDF
# Rodar como: bash setup.sh

set -e

echo "==> Atualizando sistema"
sudo apt-get update -qq && sudo apt-get upgrade -y -qq

echo "==> Instalando Docker"
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

echo "==> Criando diretório do serviço"
sudo mkdir -p /srv/jpx-pdf
sudo chown $USER:$USER /srv/jpx-pdf

echo "==> Copiando arquivos"
cp docker-compose.yml /srv/jpx-pdf/
cp .env.example /srv/jpx-pdf/.env
echo ""
echo "  !! Edite /srv/jpx-pdf/.env com os valores reais antes de continuar !!"
echo "     nano /srv/jpx-pdf/.env"
echo ""

echo "==> Criando systemd unit"
sudo tee /etc/systemd/system/jpx-pdf.service > /dev/null <<EOF
[Unit]
Description=JPX PDF Service (Cloudflare Tunnel + Puppeteer)
Requires=docker.service
After=docker.service network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/srv/jpx-pdf
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=120

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable jpx-pdf

echo ""
echo "==> Setup concluído."
echo "    Próximos passos:"
echo "    1. nano /srv/jpx-pdf/.env        ← ajustar PDF_API_SECRET"
echo "    2. sudo systemctl start jpx-pdf  ← subir os containers"
echo "    3. curl https://pdf.jpxdigital.com.br/health  ← verificar"
