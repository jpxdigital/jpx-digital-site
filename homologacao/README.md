# Evidências de Homologação — JPX Digital Platform

Cada execução de homologação gera uma pasta com data.
As evidências aqui documentam por que um teste foi marcado como aprovado ou reprovado.

---

## Estrutura

```
homologacao/
└── AAAA-MM-DD/              — data da execução
    ├── screenshots/          — capturas de tela por módulo (H1.1-001.png, etc.)
    ├── logs/                 — exports de logs do n8n, Grafana, terminal
    └── exports/              — JSON de workflows, exports do HubSpot, PDFs gerados
```

## Convenção de nomes

| Tipo | Formato | Exemplo |
|---|---|---|
| Screenshot | `H{fase}.{módulo}-{nnn}.png` | `H1.1-001.png` |
| Log n8n | `n8n-exec-{nnn}.json` | `n8n-exec-065.json` |
| Export workflow | `WF-{nnn}-{nome}.json` | `WF-001-jas-core.json` |
| PDF de teste | `{tipo}-teste-{data}.pdf` | `proposta-teste-2026-07-13.pdf` |

## Como referenciar no checklist

Na coluna "Evidência" do checklist, usar:
- `screenshot H1.1-001` — para screenshots
- `n8n exec #065` — para execuções do n8n
- `log homologacao/2026-07-13/logs/arquivo.txt` — para logs
- `URL: https://...` — para estados verificáveis online

---

## Histórico de execuções

| Data | Versão | H1 | H2 | Gold Path | Resultado |
|---|---|---|---|---|---|
| 2026-07-13 | v1.4.0 | ⏳ | ⏳ | ⏳ | Pendente |
