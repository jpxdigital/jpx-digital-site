process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { makeWASocket, useMultiFileAuthState, fetchLatestWaWebVersion, DisconnectReason } = require('baileys');
const http = require('http');
const fs = require('fs');

const AUTH_DIR = process.env.AUTH_DIR || '/data/auth';
const N8N_URL = process.env.N8N_URL || 'http://n8n:5678';
const WEBHOOK_PATH = '/webhook/jas-intake';
const WEBHOOK_SECRET = process.env.JAS_WEBHOOK_SECRET || '';
const PORT = 3001;
const INSTANCE = 'jpx-jas';

if (!fs.existsSync(AUTH_DIR)) fs.mkdirSync(AUTH_DIR, { recursive: true });

let currentQR = null;
let isConnected = false;

// Contas WhatsApp Business recentes usam LID (Linked Identity) em vez do número real.
// contacts.upsert/update populam o mapa lid → jid quando o Baileys sincroniza o contato.
// lidSenders guarda digits → @lid JID original para usar no /send de volta ao remetente.
const lidMap = new Map();     // lid@lid → phone@s.whatsapp.net (contacts.upsert)
const lidSenders = new Map(); // digits  → jid original (@lid ou @s.whatsapp.net)

function resolveJid(jid) {
  if (!jid || !jid.endsWith('@lid')) return jid;
  const resolved = lidMap.get(jid);
  if (resolved) {
    console.log('[bridge] LID→JID (map):', jid, '→', resolved);
    return resolved;
  }
  // Fallback: @lid → @s.whatsapp.net funciona para envio; n8n extrai só os dígitos
  const fallback = jid.replace('@lid', '@s.whatsapp.net');
  console.warn('[bridge] LID sem mapeamento, fallback:', jid, '→', fallback);
  return fallback;
}

function postToN8N(payload) {
  const body = JSON.stringify(payload);
  const opts = {
    hostname: 'n8n', port: 5678, path: WEBHOOK_PATH,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'x-jas-secret': WEBHOOK_SECRET }
  };
  const req = http.request(opts, r => { r.resume(); console.log('[n8n]', r.statusCode); });
  req.on('error', e => console.error('[n8n erro]', e.message));
  req.write(body); req.end();
}

const QR_HTML = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="25">
<title>JAS — Conectar WhatsApp</title>
<style>
  body{font-family:Arial,sans-serif;display:flex;flex-direction:column;align-items:center;
    justify-content:center;min-height:100vh;margin:0;background:#f0f4f8}
  .card{background:#fff;border-radius:12px;padding:32px;box-shadow:0 4px 20px rgba(0,0,0,.1);
    text-align:center;max-width:380px;width:90%}
  h1{color:#1a1a2e;font-size:1.4em;margin-bottom:4px}
  .sub{color:#666;font-size:.9em;margin-bottom:24px}
  #qr{margin:0 auto 16px}
  .status{padding:8px 16px;border-radius:20px;font-size:.85em;font-weight:600}
  .ok{background:#d4edda;color:#155724}
  .wait{background:#fff3cd;color:#856404}
  .timer{color:#999;font-size:.8em;margin-top:12px}
</style>
</head><body>
<div class="card">
  <h1>JPX AI System</h1>
  <p class="sub">Conectar WhatsApp — Chip 2</p>
  <div id="content">Carregando...</div>
  <p class="timer" id="timer"></p>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script>
fetch('/qr').then(r=>r.json()).then(d=>{
  var c=document.getElementById('content');
  var t=document.getElementById('timer');
  if(d.connected){
    c.innerHTML='<p class="status ok">✅ WhatsApp Conectado!</p>';
  } else if(d.qr){
    c.innerHTML='<div id="qr"></div><p class="status wait">Escaneie com o chip 2</p>';
    new QRCode(document.getElementById('qr'),{text:d.qr,width:260,height:260});
    var s=24;
    setInterval(function(){t.textContent='Atualizando em '+s+'s...';if(--s<0)location.reload();},1000);
  } else {
    c.innerHTML='<p class="status wait">Aguardando QR...</p>';
  }
}).catch(function(){document.getElementById('content').textContent='Erro ao buscar QR';});
</script>
</body></html>`;

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestWaWebVersion().catch(() => ({ version: [2,3000,1042609398] }));
  console.log('[bridge] WA version:', version);

  const sock = sockRef = makeWASocket({
    version, auth: state, printQRInTerminal: false,
    logger: { level:'silent', info:()=>{}, warn:()=>{}, error:console.error, debug:()=>{}, trace:()=>{}, child:()=>({level:'silent',info:()=>{},warn:()=>{},error:console.error,debug:()=>{},trace:()=>{}}) }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('contacts.upsert', (contacts) => {
    for (const c of contacts) {
      if (c.id && c.lid) lidMap.set(c.lid, c.id);
    }
  });

  sock.ev.on('contacts.update', (updates) => {
    for (const c of updates) {
      if (c.id && c.lid) lidMap.set(c.lid, c.id);
    }
  });

  sock.ev.on('connection.update', ({ qr, connection, lastDisconnect }) => {
    if (qr) { currentQR = qr; console.log('[bridge] QR gerado'); }
    if (connection === 'open') { isConnected = true; currentQR = null; console.log('[bridge] Conectado!'); }
    if (connection === 'close') {
      isConnected = false;
      const code = lastDisconnect?.error?.output?.statusCode;
      console.log('[bridge] Desconectado, código:', code);
      if (code !== DisconnectReason.loggedOut) setTimeout(start, 5000);
    }
  });

  sock.ev.on('messages.upsert', ({ messages, type }) => {
    if (type !== 'notify') return;
    for (const msg of messages) {
      if (msg.key.fromMe) continue;
      const msgType = msg.message ? Object.keys(msg.message)[0] : 'unknown';
      const remoteJid = msg.key.remoteJid;
      const digits = remoteJid.replace(/@.*/, '');
      lidSenders.set(digits, remoteJid);
      const resolvedJid = resolveJid(remoteJid);
      postToN8N({
        event: 'messages.upsert',
        instance: INSTANCE,
        data: {
          key: { ...msg.key, remoteJid: resolvedJid },
          message: msg.message || {},
          messageType: msgType,
          pushName: msg.pushName || '',
          messageTimestamp: msg.messageTimestamp,
          ...(resolvedJid !== remoteJid && { originalJid: remoteJid })
        }
      });
    }
  });
}

let sockRef = null;

http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(QR_HTML);
  } else if (req.url === '/qr') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ qr: currentQR, connected: isConnected }));
  } else if (req.url === '/health') {
    res.writeHead(isConnected ? 200 : 503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ connected: isConnected }));
  } else if (req.url === '/send' && req.method === 'POST') {
    let body = '';
    req.on('data', d => { body += d; });
    req.on('end', async () => {
      try {
        const { number, text } = JSON.parse(body);
        if (!sockRef || !isConnected) {
          res.writeHead(503, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'WhatsApp not connected' }));
        }
        const digits = number.replace(/\D/g, '');
        const jid = lidSenders.get(digits) || (digits + '@s.whatsapp.net');
        await sockRef.sendMessage(jid, { text });
        console.log('[bridge] Mensagem enviada para', jid, lidSenders.has(digits) ? '(LID map)' : '(fallback)');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        console.error('[bridge /send]', e.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  } else {
    res.writeHead(404); res.end('{}');
  }
}).listen(PORT, () => console.log('[bridge] HTTP na porta', PORT));

start().catch(e => { console.error('[bridge FATAL]', e); process.exit(1); });
