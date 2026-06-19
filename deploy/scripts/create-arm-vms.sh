#!/bin/bash
# Script de criação das VMs ARM (A1 Flex) na OCI
# Tenta em loop até conseguir — capacidade A1 em sa-saopaulo-1 é disputada
#
# Uso: bash deploy/scripts/create-arm-vms.sh
# Deixe rodando em background: nohup bash deploy/scripts/create-arm-vms.sh &

set -e

PROFILE="jpx"
TENANCY="ocid1.tenancy.oc1..aaaaaaaaycupvrpjszzeehyin6ui7yqvfwz3fajpv7k6ogkeruvv6xwpngga"
SUBNET_PUB="ocid1.subnet.oc1.sa-saopaulo-1.aaaaaaaa46bt6amzy44nnkbxe7mv4o3bqxbvs7b2wkzrptgxhkywwfgah2wa"
IMAGE="ocid1.image.oc1.sa-saopaulo-1.aaaaaaaawvmdar75jvnrck56qxxqli2oafzdqc2wxadcnnr7zzis6fafd3dq"
AD="VLNd:SA-SAOPAULO-1-AD-1"
SSH_KEY_FILE="$HOME/.ssh/oci-jpx.pub"
BOOT_GB=60
RETRY_INTERVAL=120  # tentar a cada 2 minutos

# Tamanhos a tentar — do maior para o menor
CONFIGS=(
  '{"ocpus": 2, "memoryInGBs": 12}'
  '{"ocpus": 1, "memoryInGBs": 6}'
  '{"ocpus": 4, "memoryInGBs": 24}'
  '{"ocpus": 1, "memoryInGBs": 4}'
)

create_vm() {
  local name=$1
  local config=$2
  echo "[$(date '+%H:%M:%S')] Tentando criar $name com $config..."

  oci compute instance launch --profile "$PROFILE" \
    --compartment-id "$TENANCY" \
    --availability-domain "$AD" \
    --display-name "$name" \
    --image-id "$IMAGE" \
    --shape "VM.Standard.A1.Flex" \
    --shape-config "$config" \
    --subnet-id "$SUBNET_PUB" \
    --assign-public-ip true \
    --ssh-authorized-keys-file "$SSH_KEY_FILE" \
    --boot-volume-size-in-gbs "$BOOT_GB" \
    --query "data.{Nome:\"display-name\",IP:\"id\",Estado:\"lifecycle-state\"}" \
    --output table 2>&1
}

vm_exists() {
  local name=$1
  oci compute instance list --profile "$PROFILE" --compartment-id "$TENANCY" --all \
    --query "data[?\"display-name\"=='$name' && \"lifecycle-state\"!='TERMINATED'].\"display-name\"" \
    --output json 2>/dev/null | grep -q "$name"
}

echo "=== Criação de VMs ARM (A1 Flex) — JPX Digital ==="
echo "Tentando a cada ${RETRY_INTERVAL}s até conseguir capacidade..."
echo ""

# VM1 — Site
if vm_exists "jpx-site-vm1"; then
  echo "✓ jpx-site-vm1 já existe — pulando"
else
  while true; do
    for config in "${CONFIGS[@]}"; do
      if create_vm "jpx-site-vm1" "$config" | grep -q "PROVISIONING\|RUNNING"; then
        echo "✓ jpx-site-vm1 criada com sucesso!"
        break 2
      fi
    done
    echo "[$(date '+%H:%M:%S')] Sem capacidade. Próxima tentativa em ${RETRY_INTERVAL}s..."
    sleep "$RETRY_INTERVAL"
  done
fi

# VM2 — Automação
if vm_exists "jpx-auto-vm2"; then
  echo "✓ jpx-auto-vm2 já existe — pulando"
else
  while true; do
    for config in "${CONFIGS[@]}"; do
      if create_vm "jpx-auto-vm2" "$config" | grep -q "PROVISIONING\|RUNNING"; then
        echo "✓ jpx-auto-vm2 criada com sucesso!"
        break 2
      fi
    done
    echo "[$(date '+%H:%M:%S')] Sem capacidade. Próxima tentativa em ${RETRY_INTERVAL}s..."
    sleep "$RETRY_INTERVAL"
  done
fi

echo ""
echo "=== Verificação final ==="
oci compute instance list --profile "$PROFILE" --compartment-id "$TENANCY" --all \
  --query "data[?contains(\"display-name\", 'jpx')].{Nome:\"display-name\",Shape:shape,Estado:\"lifecycle-state\"}" \
  --output table

echo ""
echo "Próximo passo: buscar os IPs públicos e atualizar KEYS.md"
oci compute instance list-vnics --profile "$PROFILE" --compartment-id "$TENANCY" \
  --query "data[*].{VM:\"display-name\",IP:\"public-ip\"}" --output table 2>/dev/null || true
