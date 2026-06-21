const express = require('express');
const puppeteer = require('puppeteer');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '4mb' }));

const PORT = process.env.PORT || 3000;
const TEMPLATES_DIR = process.env.TEMPLATES_DIR || '/templates';

let browser;

async function getBrowser() {
  if (!browser || !browser.connected) {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
  }
  return browser;
}

/*
  POST /generate
  Body: { template: "proposta", data: { ...handlebars context } }
  Returns: application/pdf

  POST /generate-html
  Body: { template: "proposta", data: { ...handlebars context } }
  Returns: text/html (for debugging)
*/
app.post('/generate', async (req, res) => {
  const { template, data, options = {} } = req.body;

  if (!template || !data) {
    return res.status(400).json({ error: 'template e data são obrigatórios' });
  }

  const templatePath = path.join(TEMPLATES_DIR, `${template}.html`);
  if (!fs.existsSync(templatePath)) {
    return res.status(404).json({ error: `template '${template}' não encontrado` });
  }

  try {
    const source = fs.readFileSync(templatePath, 'utf8');
    const compiled = Handlebars.compile(source);
    const html = compiled(data);

    const b = await getBrowser();
    const page = await b.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      ...options,
    });

    await page.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${template}.pdf"`,
      'Content-Length': pdf.length,
    });
    res.send(pdf);
  } catch (err) {
    console.error('[pdf-service] erro ao gerar PDF:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/generate-html', async (req, res) => {
  const { template, data } = req.body;
  if (!template || !data) {
    return res.status(400).json({ error: 'template e data são obrigatórios' });
  }
  const templatePath = path.join(TEMPLATES_DIR, `${template}.html`);
  if (!fs.existsSync(templatePath)) {
    return res.status(404).json({ error: `template '${template}' não encontrado` });
  }
  const source = fs.readFileSync(templatePath, 'utf8');
  const html = Handlebars.compile(source)(data);
  res.set('Content-Type', 'text/html').send(html);
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/templates', (_req, res) => {
  try {
    const files = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.html'));
    res.json({ templates: files.map(f => f.replace('.html', '')) });
  } catch {
    res.json({ templates: [] });
  }
});

app.listen(PORT, () => {
  console.log(`[pdf-service] porta ${PORT} — templates em ${TEMPLATES_DIR}`);
});

process.on('SIGTERM', async () => {
  if (browser) await browser.close();
  process.exit(0);
});
