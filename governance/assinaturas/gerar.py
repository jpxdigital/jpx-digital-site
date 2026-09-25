#!/usr/bin/env python3
"""Gera as assinaturas de e-mail por função (Shared Mailboxes M365).
Layout base: public/assinatura-joao.html. Uso: python3 governance/assinaturas/gerar.py
"""
import pathlib

BOOKING = "https://outlook.office.com/bookwithme/user/66cb66d8a4f04443ac6724f4dee2dc37@jpxdigital.com.br/meetingtype/AOK95PFdhEOl1ANn8yVfrA2?anonymous&ismsaljsauthenabled&ep=mlink"

# alias: (título da função, descrição curta, botão de agenda?)
FUNCOES = {
    "contato":      ("Contato", "Atendimento e informações gerais", True),
    "comercial":    ("Comercial", "Propostas e relacionamento com clientes", True),
    "assessment":   ("Assessment", "Diagnóstico de infraestrutura, cloud e segurança", True),
    "onboarding":   ("Onboarding", "Início e implantação de novos clientes", False),
    "contratos":    ("Contratos", "Contratos e documentação comercial", False),
    "financeiro":   ("Financeiro", "Faturamento e cobrança", False),
    "projetos":     ("Projetos", "Gestão de projetos e entregas", False),
    "operacoes":    ("Operações", "Suporte e operação dos ambientes", False),
    "relatorios":   ("Relatórios", "Relatórios técnicos e executivos", False),
    "privacidade":  ("Privacidade", "Proteção de dados pessoais (LGPD)", False),
}

BOTAO = f'''
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;">
        <tr>
          <td style="background-color: #0A2463; border-radius: 4px;">
            <a href="{BOOKING}" style="display: inline-block; padding: 7px 16px; color: #ffffff; font-size: 12px; font-weight: bold; text-decoration: none; white-space: nowrap;" target="_blank">&#128197; Agendar conversa &mdash; 30 min</a>
          </td>
        </tr>
      </table>'''

TEMPLATE = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
</head>
<body>
<!--
  Assinatura de e-mail — {titulo} | JPX Digital ({alias}@jpxdigital.com.br)
  GERADO por governance/assinaturas/gerar.py — não editar à mão.
  Instalação: Outlook → Configurações → Contas → Assinaturas → Nova → colar este conteúdo
  (abra o arquivo no navegador, Ctrl+A, Ctrl+C). Em "Endereço de e-mail padrão", selecione {alias}@.
-->
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #374151; line-height: 1.5;">
  <tr>
    <td style="padding: 0 20px 0 0; vertical-align: top; border-right: 3px solid #0A2463;">
      <img src="https://jpxdigital.com.br/jpx-logo-email.png" alt="JPX Digital" width="140" style="display: block; width: 140px; height: auto;" />
    </td>
    <td style="padding: 0 0 0 20px; vertical-align: top;">
      <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: bold; color: #0A2463;">{titulo}</p>
      <p style="margin: 0 0 10px 0; font-size: 12px; color: #6B7280; letter-spacing: 0.3px;">{descricao} &middot; JPX Digital</p>
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="width: 32px; color: #9CA3AF; font-size: 12px; padding: 2px 0;">&#9993;</td>
          <td style="font-size: 12px;"><a href="mailto:{alias}@jpxdigital.com.br" style="color: #0A2463; text-decoration: none;">{alias}@jpxdigital.com.br</a></td>
        </tr>
        <tr>
          <td style="width: 32px; color: #9CA3AF; font-size: 12px; padding: 2px 0;">&#127760;</td>
          <td style="font-size: 12px;"><a href="https://jpxdigital.com.br" style="color: #0078D4; text-decoration: none;">jpxdigital.com.br</a></td>
        </tr>
      </table>{botao}
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top: 12px;">
      <p style="margin: 0; font-size: 10px; color: #9CA3AF; border-top: 1px solid #E5E7EB; padding-top: 8px;">
        JPX Digital Tecnologia LTDA &nbsp;&middot;&nbsp; CNPJ 57.454.973/0001-18 &nbsp;&middot;&nbsp;
        Esta mensagem e seus anexos podem conter informa&ccedil;&otilde;es confidenciais. Caso tenha recebido por engano, notifique o remetente e exclua o conte&uacute;do.
      </p>
    </td>
  </tr>
</table>
</body>
</html>
'''

saida = pathlib.Path(__file__).parent
for alias, (titulo, descricao, agenda) in FUNCOES.items():
    html = TEMPLATE.format(alias=alias, titulo=titulo, descricao=descricao, botao=BOTAO if agenda else "")
    (saida / f"assinatura-{alias}.html").write_text(html, encoding="utf-8")
    print("ok", alias)
