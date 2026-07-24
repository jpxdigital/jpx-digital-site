# JPX Playbook Comercial

**Versão:** 0.1 — Rascunho inicial
**Criado:** 2026-07-23
**Público:** João Martins (uso interno — não compartilhar com clientes)

> Este documento é o guia operacional para toda a atividade comercial da JPX Digital.
> Ele define como identificar, abordar, qualificar, propor e fechar clientes.
> É também a fonte de verdade para evolução do JAS Sprint 2.

---

## 1. Posicionamento e Discurso Comercial

### O que a JPX Digital é

**Consultoria boutique premium de TI** para empresas de médio porte que não podem depender de um time interno sobrecarregado ou de um MSP de massa.

Entregamos o que as empresas precisam: **clareza, confiança e continuidade operacional** — com a atenção que só uma consultoria com poucos clientes pode oferecer.

### O que a JPX Digital não é

- Não é MSP de volume (não buscamos 50+ clientes)
- Não é helpdesk de baixo custo
- Não é revenda de hardware
- Não é empresa de outsourcing de mão de obra

### Frase de posicionamento (elevator pitch — 30 segundos)

> "A JPX Digital é uma consultoria especializada em infraestrutura, cloud e segurança para empresas de médio porte. Trabalhamos com um número limitado de clientes — o que nos permite entregar o que grandes fornecedores não conseguem: atenção real, continuidade de relacionamento e soluções pensadas para o seu negócio, não para um template."

### Diferenciadores chave

| Diferenciador | Como comunicar |
|---|---|
| Boutique (10–15 clientes) | "Você não é um ticket. Você conhece quem vai atender." |
| Assessment antes de qualquer proposta | "Não vendemos solução antes de entender o problema." |
| RTO/RPO garantidos em contrato | "Backup sem teste não é backup. O nosso tem SLA documentado." |
| Governança e documentação | "Quando precisar de um auditor, tudo está registrado." |
| JAS (IA no WhatsApp) | Não mencionar proativamente — é vantagem operacional interna |

---

## 2. Perfil Ideal de Cliente (ICP)

### Critérios de qualificação — Score JPX

| Critério | Peso | Pontuação |
|---|---|---|
| **Porte** — 20 a 200 funcionários | Alto | 0–3 pts |
| **Criticidade operacional** — TI afeta diretamente a operação | Alto | 0–3 pts |
| **Urgência** — dor ativa (incidente recente, auditoria, crescimento) | Alto | 0–3 pts |
| **Orçamento** — capacidade de investimento recorrente | Médio | 0–2 pts |
| **Fit cultural** — valoriza qualidade sobre preço | Médio | 0–2 pts |
| **Segmento** — indústria, saúde, jurídico, financeiro, serviços | Baixo | 0–1 pt |

**Score A:** 11–14 pontos → Prioridade máxima
**Score B:** 7–10 pontos → Qualificar com cuidado
**Score C:** < 7 pontos → Não avançar

### Segmentos prioritários

1. **Indústria** (manufatura, alimentício, logística)
2. **Saúde** (clínicas, operadoras, laboratórios)
3. **Jurídico** (escritórios de advocacia, compliance)
4. **Financeiro** (contabilidade, gestão de ativos)
5. **Serviços críticos** (energia, telecomunicações, construção)

### Sinais de dor (abordar proativamente)

- "Tivemos um incidente de segurança recentemente"
- "Nosso backup nunca foi testado"
- "Estamos migrando para a nuvem e não sabemos por onde começar"
- "Nossa TI é feita pelo sobrinho"
- "Temos auditoria/certificação chegando"
- "Crescemos e a infraestrutura não acompanhou"
- "Estamos dependendo demais de um único fornecedor/funcionário"

---

## 3. Condições de Saída — Quando NÃO aceitar um cliente

> Este é o filtro mais importante da operação boutique. Clientes errados custam mais do que o contrato vale.

**Recusar quando:**

- Score JPX < 7 (sem fit adequado)
- Expectativa de preço incompatível com entrega premium (negocia abaixo do piso sem razão estratégica)
- Decisor não é o cliente (terceiro intermediário sem poder)
- Urgência artificial criada para forçar desconto
- Histórico de troca frequente de fornecedores sem motivo claro
- Empresa em crise financeira que pode não honrar o contrato
- Cultura de "você é fornecedor, não parceiro" (acesso bloqueado, falta de transparência)
- Escopo creep evidente desde a conversa inicial ("e também você poderia...")
- Setor com conflito de interesse com clientes atuais

**Recusar com educação:**
> "O seu projeto é interessante, mas neste momento não temos disponibilidade para atender com a qualidade que o seu ambiente exige. Posso indicar alternativas se quiser."

---

## 4. Fluxo do Assessment Executivo

O Assessment Executivo é a **porta de entrada obrigatória** para qualquer projeto JPX. Nenhum projeto começa sem diagnóstico.

### Etapas

```
Primeiro Contato
    ↓
Qualificação Inicial (15 min — telefone ou WhatsApp)
    ↓
Reunião de Briefing (30 min — Teams/Bookings)
    ↓
Assessment no Ambiente do Cliente (2–4h presencial ou remoto)
    ↓
Elaboração do Relatório (1–3 dias úteis)
    ↓
Apresentação Executiva (60 min — decisor presente obrigatório)
    ↓
Proposta Comercial (se houver fit e interesse)
```

### Reunião de Briefing — roteiro

**Objetivo:** entender o ambiente e validar o Score JPX antes de investir tempo no assessment.

1. "Me conta um pouco sobre o negócio. O que vocês fazem, quantas pessoas, onde operam?"
2. "Como está a TI hoje? Tem equipe interna, fornecedor, ou é informal?"
3. "O que motivou o contato agora? Existe alguma dor específica?"
4. "Tem alguma iniciativa de tecnologia planejada para os próximos 6–12 meses?"
5. "Quem mais participa das decisões de tecnologia na empresa?"
6. "Como vocês avaliam um fornecedor de TI? O que diferencia um bom de um mediano?"

**Sinais de avanço:** decisor presente, dor real, abertura para investimento.
**Sinais de parada:** sem decisor, expectativa de "suporte barato", sem urgência.

### Assessment — o que levantamos

| Área | O que analisamos |
|---|---|
| Infraestrutura | Servidores, rede, storage, conectividade, topologia |
| Cloud | Uso atual, contratos, custos, governança |
| Segurança | Perímetro, endpoints, senhas, MFA, patches, backup |
| Backup e DR | Política atual, frequência, testes, RTO/RPO real vs percebido |
| Continuidade | BIA informal, dependências críticas, plano de contingência |
| Gestão | Documentação, processos, fornecedores, contratos |
| Compliance | LGPD, auditorias previstas, regulações do setor |

### Relatório de Assessment — estrutura

1. **Sumário Executivo** (1 página — para o CEO)
2. **Mapa de Riscos** — matriz impacto × probabilidade
3. **Inventário de Ambiente** — o que foi encontrado
4. **Gaps Críticos** — P0 (imediato), P1 (urgente), P2 (planejado)
5. **Roadmap Recomendado** — 30/90/180 dias
6. **Estimativa de Investimento** — faixas sem compromisso

---

## 5. Objeções Frequentes

| Objeção | Resposta |
|---|---|
| "Já temos um fornecedor de TI" | "Que bom. A JPX não compete com fornecedores — complementa. Muitos clientes nos chamam exatamente quando querem uma segunda opinião independente ou quando o atual não está dando conta de algo específico." |
| "É muito caro" | "Caro em relação a quê? Um incidente de ransomware custa em média R$ 500 mil para uma empresa do seu porte — fora o tempo parado e a reputação. O assessment nos permite calcular juntos qual é o custo real do risco atual." |
| "Precisamos de suporte rápido, não de consultoria" | "Entendo. Para suporte imediato posso indicar bons parceiros. Se quiser resolver o problema de raiz e não só apagar incêndio, aí a conversa é diferente." |
| "Já temos tudo na nuvem, está tudo certo" | "Ótimo. Mas nuvem não é sinônimo de seguro — backup do M365, configuração de acessos, custos controlados, LGPD: esses pontos normalmente têm gaps mesmo em empresas que migraram bem." |
| "Não temos orçamento agora" | "Sem problema. O assessment pode ser o primeiro passo justamente para mostrar onde o investimento faz mais sentido. Muitas vezes identificamos desperdício que paga o projeto." |
| "Me manda uma proposta primeiro" | "Posso preparar uma proposta, mas ela será superficial sem antes entender o seu ambiente. O risco é propor algo que não resolve o problema real. Prefiro fazer 30 minutos de conversa antes — isso muda tudo." |

---

## 6. Padrões de Comunicação

### Princípios

- **Clareza** acima de jargão técnico
- **Confiança** sem arrogância
- **Franqueza** sem agressividade
- **Precisão** — não prometer o que não será entregue

### Tom por canal

| Canal | Tom | Extensão |
|---|---|---|
| E-mail de prospecção | Formal mas direto | 4–6 linhas |
| E-mail de follow-up | Leve, sem pressão | 3–4 linhas |
| WhatsApp (JAS/pessoal) | Profissional e humano | Curto, 2–3 frases |
| LinkedIn (DM) | Pessoal, contexto específico | 4–5 linhas |
| Reunião | Direto, escuta ativa, sem slides no início | 30–60 min |

### Template — e-mail de primeiro contato

```
Assunto: [Nome da empresa] — diagnóstico independente de TI

Olá [Nome],

Sou João Martins, da JPX Digital — consultoria especializada em infraestrutura, cloud e segurança para empresas de médio porte.

Encontrei a [empresa] por [fonte: Econodata / LinkedIn / indicação] e identificamos que empresas do segmento [indústria/saúde/etc.] frequentemente enfrentam [dor específica do segmento].

Faço diagnósticos independentes — sem compromisso de contratação — que entregam um mapa de riscos real do ambiente de TI e um roadmap priorizado.

Teria 30 minutos nesta semana para uma conversa inicial?

Att,
João Martins
JPX Digital | jp@jpxdigital.com.br
(18) 98189-0607 | jpxdigital.com.br
```

### Template — follow-up (7 dias sem resposta)

```
Assunto: Re: [Nome da empresa] — diagnóstico independente de TI

Olá [Nome],

Só passando para verificar se meu e-mail anterior chegou.

Se não for o momento certo, sem problema — posso retornar em outro período.

Att,
João
```

### Template — após assessment (encaminhar relatório)

```
Assunto: Assessment JPX Digital — [Nome da empresa] | Relatório e próximos passos

Olá [Nome],

Segue em anexo o relatório do Assessment Executivo realizado em [data].

Identificamos [X] pontos críticos e preparamos um roadmap de 90 dias para os itens de maior risco. O sumário executivo na primeira página resume os principais achados para o decisor.

Proponho uma reunião de 60 minutos para apresentar os resultados pessoalmente e responder dúvidas. Tenho disponibilidade [dias/horários].

Att,
João Martins
JPX Digital
```

---

## 7. SLAs e Compromissos Comerciais

| Item | Padrão JPX |
|---|---|
| Resposta a leads (horário comercial) | Até 4 horas |
| Proposta após briefing | Até 3 dias úteis |
| Relatório de assessment | Até 5 dias úteis após coleta |
| Início de projeto após assinatura SOW | Até 10 dias úteis |
| Relatório mensal (clientes recorrentes) | Até dia 10 do mês seguinte |
| Resposta a incidentes P0 | Até 1 hora (em horário comercial) |

---

## 8. Uso do HubSpot durante a Venda

### Pipeline JPX — estágios e o que fazer em cada um

| Estágio | O que fazer |
|---|---|
| **Lead Novo** | Registrar origem, Score JPX inicial, agendar qualificação |
| **Em Qualificação** | Fazer briefing de 30 min, completar Score JPX |
| **Assessment Agendado** | Confirmar data, enviar agenda prévia ao cliente |
| **Assessment Realizado** | Upload de notas, iniciar relatório |
| **Proposta Enviada** | Registrar proposta em anexo, agendar follow-up em 5 dias |
| **Proposta Solicitada** | Cliente pediu proposta proativamente — prioridade |
| **Negociação** | Registrar objeções, ajustes de escopo |
| **Fechado — Ganho** | Assinar SOW via ZapSign, criar projeto |
| **Fechado — Perdido** | Registrar motivo — dado para evolução do JAS |

### Campos obrigatórios ao criar um Deal

- Nome da empresa
- Decisor (nome + cargo)
- Origem do lead
- Score JPX (calculado após briefing)
- Segmento
- Serviço de interesse

---

## 9. Integração com JAS

O JAS (JPX AI System) é o agente de WhatsApp que faz o primeiro atendimento.

**O que o JAS faz:**
- Recebe o lead no WhatsApp
- Coleta nome e empresa
- Envia link do Bookings para agendar
- Cria deal no HubSpot automaticamente
- Notifica João via Telegram

**O que João faz a partir daí:**
- Abre o HubSpot e vê o deal criado
- Verifica qual serviço o lead escolheu no menu
- Prepara a reunião de briefing com contexto

**Evoluções futuras (JAS Sprint 2):**
- Score JPX calculado automaticamente durante a conversa
- Qualificação conversacional antes de enviar o link
- Persistência de contexto entre sessões

---

## 10. Métricas de Sucesso Comercial

| Métrica | Meta Fase 2 | Meta Fase 3 |
|---|---|---|
| Leads qualificados (Score A) por mês | 5 | 15 |
| Taxa de conversão Contato → Briefing | > 30% | > 40% |
| Taxa de conversão Briefing → Assessment | > 60% | > 70% |
| Taxa de conversão Assessment → Proposta | > 80% | > 80% |
| Taxa de conversão Proposta → Fechamento | > 50% | > 55% |
| Ticket médio (recorrente mensal) | R$ 3.000 | R$ 4.000 |
| Clientes ativos (recorrentes) | 1 | 5 |

---

## 11. LGPD — Como tratar o tema durante a venda

### A distinção fundamental

A JPX Digital entrega **controles técnicos para adequação à LGPD** — não consultoria jurídica.

| O que a JPX entrega | O que a JPX NÃO entrega |
|---|---|
| Backup com criptografia e retenção adequada | Elaboração de Política de Privacidade |
| Controle de acesso por perfil e auditoria de logs | DPA (Data Processing Agreement) com operadores |
| Segmentação de rede para isolamento de dados pessoais | RIPD (Relatório de Impacto à Proteção de Dados) |
| Hardening de servidores que processam dados pessoais | Gestão de consentimento de titulares |
| Mapeamento técnico de sistemas que armazenam dados | Respostas a solicitações de titulares à ANPD |
| Testes de vulnerabilidade em sistemas com dados pessoais | DPO (Encarregado de Proteção de Dados) |
| Evidências técnicas para auditorias (logs, relatórios) | Interpretação jurídica da lei |

### Como responder quando o cliente menciona LGPD

**Cliente diz:** "Precisamos nos adequar à LGPD."

**Resposta:** "A adequação tem duas frentes: a jurídica e a técnica. A parte jurídica — políticas, contratos com fornecedores, gestão de consentimento — é com um DPO ou advogado especializado. A parte técnica é o que a JPX entrega: backup adequado, controle de acesso, auditoria de sistemas, segurança dos dados em trânsito e em repouso. Posso fazer um diagnóstico técnico do ambiente e identificar os gaps de implementação."

**Cliente diz:** "Vocês fazem consultoria de LGPD?"

**Resposta:** "Fazemos a parte técnica da adequação — que costuma ser onde estão os maiores gaps e os maiores riscos reais. Para a parte jurídica (DPO, políticas, contratos), trabalhamos em conjunto com escritórios especializados e posso indicar parceiros de confiança."

### Parceria recomendada

Buscar um DPO-as-a-service ou escritório especializado em LGPD para parceria de complementaridade:
- JPX entrega os controles técnicos
- Parceiro entrega o DPO e a adequação jurídica
- Indicação mútua de clientes

> **Pendente:** identificar e formalizar parceiro DPO para Fase 2.

### Linguagem correta para usar em propostas e e-mails

✅ "Implementação de controles técnicos para adequação à LGPD"
✅ "Diagnóstico técnico de conformidade — mapeamento de gaps de segurança e retenção de dados"
✅ "Evidências técnicas para auditorias ANPD"
✅ "Backup com criptografia e retenção conforme requisitos da LGPD"

❌ "Consultoria LGPD"
❌ "Adequação LGPD completa"
❌ "Compliance LGPD"
❌ "Garantimos conformidade com a LGPD"

---

## Histórico de versões

| Versão | Data | Descrição |
|---|---|---|
| 0.1 | 2026-07-23 | Rascunho inicial — estrutura completa, pendente revisão por João |
