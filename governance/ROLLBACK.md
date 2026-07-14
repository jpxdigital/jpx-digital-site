# ROLLBACK PLAN — JPX Digital Platform

Respostas predefinidas para falhas críticas. Consultar sob pressão — não improvisar.
Cada cenário tem prazo, ação e responsável.

---

## Princípio geral

> Nunca tente corrigir a causa raiz durante um incidente ativo.
> Primeiro restaure o serviço. Depois investigue.

---

## Cenários

### C1 — Site indisponível (jpxdigital.com.br)

**Sintoma:** site retorna 5xx, timeout ou não abre.

| Passo | Ação | Prazo |
|---|---|---|
| 1 | Verificar Cloudflare → status do tunnel jpx-vm | 1 min |
| 2 | Verificar container Next.js na jpx-vm: `docker ps` (via GitHub Actions ou log de deploy) | 2 min |
| 3 | Se container caiu: fazer push de qualquer commit vazio em `main` para forçar redeploy | 5 min |
| 4 | Se deploy falhar: reverter para commit anterior via `git revert HEAD && git push` | 5 min |
| 5 | Contingência: ativar página de manutenção no Cloudflare (Always Online) | 1 min |

**Responsável:** Claude Code + João
**Meta de recuperação:** < 15 min

---

### C2 — n8n indisponível

**Sintoma:** n8n.jpxdigital.com.br não abre, workflows não disparam.

| Passo | Ação | Prazo |
|---|---|---|
| 1 | Verificar Cloudflare Tunnel → jpx-n8n | 1 min |
| 2 | Checar logs da VM via Grafana (Loki) | 2 min |
| 3 | Se container n8n caiu: forçar restart via commit no `deploy/vm2/docker-compose.yml` | 5 min |
| 4 | **Contingência de leads:** ativar resposta manual — monitorar jp@jpxdigital.com.br e responder diretamente | imediato |
| 5 | **Contingência JAS:** encaminhar manualmente o atendimento pelo WhatsApp pessoal (+55 18 9 3085-2246) | imediato |

**Responsável:** João
**Meta de recuperação:** < 20 min

---

### C3 — JAS / WhatsApp desconectado

**Sintoma:** chip 2 não responde, jas-bridge sem conexão (GET /health retorna erro).

| Passo | Ação | Prazo |
|---|---|---|
| 1 | Abrir Samsung Galaxy S9+ e verificar o WhatsApp do chip 2 | 1 min |
| 2 | Se desconectado: acessar `https://n8n.jpxdigital.com.br` → verificar variável JAS_EVOLUTION_URL | 2 min |
| 3 | Reconectar via QR code: acessar `http://jas-bridge:3001/qr` (via SSH tunnel na VM jpx-n8n) | 5 min |
| 4 | **Contingência:** redirecionar link de contato do site para WhatsApp pessoal temporariamente | 5 min |
| 5 | Avisar nos canais: "Atendimento automático temporariamente indisponível — resposta em até 2h" | imediato |

**Responsável:** João
**Meta de recuperação:** < 10 min

---

### C4 — HubSpot indisponível ou token expirado

**Sintoma:** leads não aparecem no CRM, n8n retorna 401/403 nas execuções.

| Passo | Ação | Prazo |
|---|---|---|
| 1 | Acessar HubSpot → verificar status da plataforma | 1 min |
| 2 | Se token expirado: gerar novo PAT em HubSpot → Configurações → Integrações → Apps privados | 3 min |
| 3 | Atualizar variável no n8n: credencial HubSpot → novo token | 2 min |
| 4 | Testar: submeter lead de teste pelo formulário | 2 min |
| 5 | **Contingência:** registrar leads manualmente em planilha temporária até restauração | imediato |
| 6 | Atualizar KEYS.md com novo token e data de rotação | 2 min |

**Responsável:** João
**Meta de recuperação:** < 10 min

---

### C5 — PDF Service indisponível

**Sintoma:** geração de proposta falha, pdf.jpxdigital.com.br não responde.

| Passo | Ação | Prazo |
|---|---|---|
| 1 | Verificar Cloudflare Tunnel → vm-ashburn-1 | 1 min |
| 2 | Checar health: `https://pdf.jpxdigital.com.br/health` | 1 min |
| 3 | Forçar redeploy via commit em `deploy/pdf-service/` | 5 min |
| 4 | **Contingência:** usar templates locais em `docs/doc-gen/` para gerar proposta manualmente no browser | imediato |

**Responsável:** João
**Meta de recuperação:** < 15 min

---

### C6 — Microsoft Bookings indisponível

**Sintoma:** link de agendamento não abre ou não permite marcar.

| Passo | Ação | Prazo |
|---|---|---|
| 1 | Verificar status M365 em `admin.microsoft.com` | 1 min |
| 2 | **Contingência:** usar Cal.com (`cal.com/jpxdigital`) como alternativa | imediato |
| 3 | Atualizar link temporariamente no ChatBot Helena (src/components/ui/ChatBot.tsx) | 5 min |
| 4 | Comunicar via WhatsApp/e-mail qualquer reunião afetada | imediato |

**Responsável:** João
**Meta de recuperação:** depende da Microsoft — usar contingência

---

### C7 — Rollback de código (regressão após deploy)

**Sintoma:** novo deploy quebrou algo que funcionava.

| Passo | Ação | Prazo |
|---|---|---|
| 1 | Identificar o commit problemático via `git log` | 1 min |
| 2 | Reverter: `git revert <hash> && git push origin main` | 3 min |
| 3 | Aguardar GitHub Actions redeployar a versão anterior | 5 min |
| 4 | Verificar que o problema foi resolvido | 2 min |
| 5 | Registrar no CHANGELOG e investigar a causa | depois |

**Responsável:** Claude Code + João
**Meta de recuperação:** < 15 min

---

## Registro de incidentes

Preencher após cada incidente resolvido.

| Data | Cenário | Duração | Causa raiz | Ação corretiva |
|---|---|---|---|---|
| | | | | |
