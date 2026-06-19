# Cloudflare — Configuração e Recursos

## Recursos ativos (configurar no dashboard)

### DNS
- `jpxdigital.com.br` → IP VM1 (Proxied ✅ — laranja)
- `www.jpxdigital.com.br` → CNAME jpxdigital.com.br (Proxied ✅)
- `n8n.jpxdigital.com.br` → IP VM2 (Proxied ✅)
- Registros MX do Zoho (DNS Only — sem proxy)

### SSL/TLS
- **Modo:** Full (strict) — Cloudflare valida o certificado de origem
- **Origin Certificate:** gerado no Cloudflare dashboard → SSL/TLS → Origin Server
  - Instalado em `/etc/ssl/cloudflare/` na VM1
  - Referenciado no `nginx.conf` em vez do Let's Encrypt
  - Validade: 15 anos (renovar em 2041)
- **Always HTTPS:** ativado
- **HSTS:** ativado (max-age=31536000, includeSubdomains)
- **Minimum TLS Version:** 1.2
- **HTTP/3 (QUIC):** ativado

### Performance
- **Brotli:** ativado (compressão superior ao gzip para HTML/CSS/JS)
- **HTTP/2:** ativado
- **HTTP/3:** ativado
- **Speed Brain / Early Hints:** ativado quando disponível no plano

### Cache Rules (configurar em Rules → Cache Rules)

| Regra | URL | Comportamento |
|---|---|---|
| Static assets Next.js | `/_next/static/*` | Cache Everything, Edge TTL: 1 year |
| Páginas SSG | `/servicos/*`, `/segmentos/*`, `/sobre`, `/contato` | Cache Everything, Edge TTL: 1 hour |
| API routes | `/api/*` | Bypass cache |
| Admin | `/admin*` | Bypass cache |
| Health check | `/api/health`, `/api/ready`, `/api/live` | Bypass cache |

### WAF (Web Application Firewall)

**Managed Rules — ativar:**
- Cloudflare Managed Ruleset (OWASP Top 10)
- Cloudflare OWASP Core Ruleset

**Custom Rules — criar:**

```
# Bloquear acesso direto por IP (só aceitar via Cloudflare)
# Configurado no OCI Security List — não no Cloudflare

# Rate limit em /api/leads — Cloudflare Rate Limiting
# (complementa o rate limit in-app)
URL: /api/leads
Method: POST
Threshold: 10 req/min por IP
Action: Block (429)
```

### Rate Limiting (Rules → Rate Limiting)

| Endpoint | Limite | Período | Ação |
|---|---|---|---|
| `POST /api/leads` | 5 requisições | 1 minuto por IP | Block 60s |
| `POST /api/*` | 30 requisições | 1 minuto por IP | Challenge |
| `/admin*` (tentativas de login) | 5 requisições | 1 minuto por IP | Block 5min |

### Bot Management
- **Bot Fight Mode:** ativado (plano gratuito)
- **Super Bot Fight Mode:** considerar no plano Pro
- Bloqueia scrapers, scanners de vulnerabilidade e tráfego automatizado malicioso

### Transform Rules
```
# Remover header Server da resposta de origem
# (não expor versão do Nginx/Node.js)
Remove response header: Server
Remove response header: X-Powered-By
```

### Zero Trust (Cloudflare Access) — painéis administrativos

Proteger com SSO + MFA:
- `/admin` — painel de analytics
- `n8n.jpxdigital.com.br` — interface n8n
- `grafana.jpxdigital.internal` — Grafana (quando implementado)

**Configuração:**
1. Cloudflare Zero Trust dashboard → Access → Applications
2. Criar Application para cada painel
3. Policy: Allow apenas e-mail `@jpxdigital.com.br` ou e-mail específico do João
4. Habilita MFA obrigatório (TOTP ou hardware key)

Resultado: admin só acessível autenticado via Cloudflare Access, mesmo conhecendo a URL.

## OCI Security List — restringir acesso por IP Cloudflare

Nas regras de ingress da OCI, aceitar tráfego 80/443 apenas de IPs Cloudflare:

```
# IPs Cloudflare IPv4 (atualizar periodicamente)
# Fonte: https://cloudflare.com/ips-v4

103.21.244.0/22
103.22.200.0/22
103.31.4.0/22
104.16.0.0/13
104.24.0.0/14
108.162.192.0/18
131.0.196.0/22
141.101.64.0/18
162.158.0.0/15
172.64.0.0/13
173.245.48.0/20
188.114.96.0/20
190.93.240.0/20
197.234.240.0/22
198.41.128.0/17
```

Dessa forma, mesmo que alguém descubra o IP da VM, não consegue acessar diretamente — o tráfego só passa pela Cloudflare.
