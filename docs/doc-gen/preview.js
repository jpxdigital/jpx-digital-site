#!/usr/bin/env node
/**
 * Gera um PDF de preview a partir do template e dos dados de exemplo.
 *
 * Uso:
 *   node preview.js                          → usa _sample-data.json + proposta.html
 *   node preview.js sow                      → usa _sample-data.json + sow.html
 *   node preview.js proposta acme-data.json  → usa arquivo de dados customizado
 *
 * Dependências: npm install puppeteer handlebars
 */

const puppeteer  = require('puppeteer')
const Handlebars = require('handlebars')
const fs         = require('fs')
const path       = require('path')

const DIR = __dirname

// ── Argumentos ──────────────────────────────────────────────────────────────
const [,, templateArg = 'proposta', dataArg = '_sample-data.json'] = process.argv

const templateFile = path.join(DIR, `${templateArg}.html`)
const dataFile     = path.join(DIR, dataArg)
const outputFile   = path.join(DIR, `_preview-${templateArg}.pdf`)

if (!fs.existsSync(templateFile)) {
  console.error(`Template não encontrado: ${templateFile}`)
  process.exit(1)
}

if (!fs.existsSync(dataFile)) {
  console.error(`Dados não encontrados: ${dataFile}`)
  process.exit(1)
}

// ── Helper: step number ──────────────────────────────────────────────────────
// Os steps já chegam com campo "num" adicionado pelo n8n (ou pelo _sample-data).
// Este helper é apenas um fallback de segurança.
Handlebars.registerHelper('inc', (value) => parseInt(value) + 1)

// ── Gerar PDF ────────────────────────────────────────────────────────────────
;(async () => {
  const templateSrc = fs.readFileSync(templateFile, 'utf8')
  const data        = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

  // Remove campos de comentário antes de renderizar
  delete data._comment

  const template = Handlebars.compile(templateSrc)
  const html     = template(data)

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
  const page    = await browser.newPage()

  await page.setContent(html, { waitUntil: 'networkidle0' })

  await page.pdf({
    path:   outputFile,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  await browser.close()

  console.log(`PDF gerado: ${outputFile}`)
})()
