export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  category: string
  readingTime: number
  keywords: string[]
  sections: BlogSection[]
}

export interface BlogSection {
  type: 'paragraph' | 'h2' | 'h3' | 'list' | 'callout'
  content?: string
  items?: string[]
  variant?: 'info' | 'warning' | 'tip'
}

export const posts: BlogPost[] = [
  {
    slug: 'custo-indisponibilidade-uma-hora-empresa',
    title: 'Quanto custa uma hora de indisponibilidade para a sua empresa?',
    description: 'Poucas perguntas revelam tanto sobre a maturidade de um ambiente de TI quanto essa. Entenda como calcular o impacto financeiro real da indisponibilidade, o que RTO e RPO têm a ver com esse número — e por que empresas maduras transformam essa resposta em política de investimento.',
    publishedAt: '2026-06-26',
    category: 'Continuidade Operacional',
    readingTime: 9,
    keywords: ['custo indisponibilidade TI', 'RTO RPO empresas', 'impacto financeiro indisponibilidade', 'continuidade operacional', 'disaster recovery custo'],
    sections: [
      {
        type: 'paragraph',
        content: 'A pergunta parece simples. Na prática, a maioria dos gestores de TI não consegue respondê-la com precisão — e isso, por si só, já revela um problema estrutural.',
      },
      {
        type: 'paragraph',
        content: 'Não saber quanto custa uma hora de indisponibilidade é o mesmo que não saber qual é o risco real que a empresa está correndo. Sem esse número, orçamentos de TI são aprovados por intuição, não por análise de risco. Investimentos em continuidade operacional são postergados indefinidamente. E quando o incidente acontece — ransomware, falha de hardware, queda de link, erro humano — a empresa descobre o custo da forma mais cara possível.',
      },
      {
        type: 'h2',
        content: 'O custo direto: o que a paralisação custa por hora',
      },
      {
        type: 'paragraph',
        content: 'O impacto financeiro de uma hora de indisponibilidade varia muito por setor, porte e criticidade dos sistemas afetados. Mas a estrutura do custo é sempre a mesma.',
      },
      {
        type: 'list',
        items: [
          'Receita não gerada: transações que não aconteceram, pedidos não processados, atendimentos não realizados',
          'Produtividade perdida: colaboradores parados aguardando os sistemas voltarem — custo real de folha por hora multiplicado pela equipe afetada',
          'Custo de recuperação: horas de TI, contratação de suporte externo emergencial, eventual retrabalho de dados',
          'Penalidades contratuais: SLAs com clientes que não foram cumpridos — multas, créditos, revisões de contrato',
          'Custo regulatório: setores como saúde, financeiro e jurídico têm obrigações de disponibilidade que, se descumpridas, geram autuações',
        ],
      },
      {
        type: 'paragraph',
        content: 'Para uma indústria com linha de produção parada, o custo por hora pode ser calculado com precisão: custo fixo de produção por hora mais o valor da produção não realizada. Para um hospital com prontuários inacessíveis, o custo inclui o risco de decisão clínica sem informação completa — algo que vai muito além do financeiro. Para um escritório de contabilidade no período de declaração fiscal, uma hora pode significar perda de clientes.',
      },
      {
        type: 'h2',
        content: 'O custo invisível: o que não aparece na conta imediata',
      },
      {
        type: 'paragraph',
        content: 'O custo direto é o mais fácil de calcular — e o mais enganoso, porque subestima o impacto real. Os custos indiretos são maiores e se manifestam ao longo de semanas ou meses após o incidente.',
      },
      {
        type: 'list',
        items: [
          'Dano à reputação: clientes que experienciaram a falha e comunicaram isso a outros — o custo de aquisição de um novo cliente é sempre maior que o de reter um existente',
          'Perda de confiança interna: colaboradores que percebem que a empresa não está preparada — impacto em moral e eventual turnover',
          'Custo de auditoria: incidentes graves exigem investigação formal, que consome tempo da liderança e, frequentemente, consultoria externa',
          'Oportunidades perdidas: propostas, negociações e decisões que precisavam de informação que estava nos sistemas paralisados',
          'Impacto em seguros: sinistros repetidos podem encarecer apólices de seguro cibernético ou mesmo inviabilizá-las',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        content: 'Estudos do setor de TI corporativo indicam que o custo total de um incidente de indisponibilidade — somando direto e indireto — costuma ser de 3 a 5 vezes o custo direto imediato. Empresas que calculam apenas o custo direto subestimam sistematicamente o risco.',
      },
      {
        type: 'h2',
        content: 'RTO e RPO — o problema traduzido em números mensuráveis',
      },
      {
        type: 'paragraph',
        content: 'RTO (Recovery Time Objective) é o tempo máximo que a empresa pode operar sem um determinado sistema antes que o impacto se torne inaceitável. RPO (Recovery Point Objective) é a quantidade máxima de dados que pode ser perdida — medida em tempo — antes que o impacto seja inaceitável.',
      },
      {
        type: 'paragraph',
        content: 'Esses dois números são, essencialmente, a tolerância ao risco da empresa traduzida em parâmetros técnicos. RTO de 4 horas significa que a empresa aceita ficar até 4 horas sem aquele sistema. RPO de 1 hora significa que pode perder até 1 hora de dados. Se esses números não estão definidos para cada sistema crítico, a empresa não tem parâmetros para avaliar se seu ambiente de DR está adequado — nem para justificar investimento em melhoria.',
      },
      {
        type: 'callout',
        variant: 'info',
        content: 'Um plano de Disaster Recovery sem RTO e RPO definidos é uma hipótese, não um plano. O RTO e o RPO são os critérios de sucesso do plano — sem eles, não há como saber se o plano é adequado antes de um incidente real.',
      },
      {
        type: 'h2',
        content: 'Como empresas maduras respondem a essa pergunta',
      },
      {
        type: 'paragraph',
        content: 'Empresas com maturidade em continuidade operacional não respondem "não sei" a essa pergunta — e não respondem com um número vago. Elas respondem com uma tabela: cada sistema crítico, seu RTO, seu RPO, o custo estimado por hora de indisponibilidade e o investimento atual em proteção.',
      },
      {
        type: 'paragraph',
        content: 'Esse processo se chama Business Impact Analysis (BIA) — e é o ponto de partida de qualquer plano de continuidade operacional sério. O BIA não é um exercício técnico: é uma decisão de negócio. É a diretoria definindo, formalmente, qual é a tolerância ao risco da empresa.',
      },
      {
        type: 'list',
        items: [
          'Mapeiam quais sistemas são críticos para a operação — e quais são apenas importantes',
          'Quantificam o custo por hora de indisponibilidade de cada sistema crítico',
          'Definem RTO e RPO baseados nesse custo, não em conveniência técnica',
          'Investem em infraestrutura de DR proporcional ao risco — sem superdimensionar sistemas de baixa criticidade',
          'Testam o plano periodicamente e medem o RTO real, não o estimado',
          'Revisam os números anualmente ou quando o negócio muda significativamente',
        ],
      },
      {
        type: 'h2',
        content: 'Como a JPX Digital aborda esse cenário',
      },
      {
        type: 'paragraph',
        content: 'Todo Assessment Executivo da JPX começa pelo Business Impact Analysis. Antes de recomendar qualquer solução técnica, mapeamos os sistemas críticos, quantificamos o impacto financeiro de cada hora de indisponibilidade e definimos os RTO e RPO que fazem sentido para o negócio — não os que são tecnicamente mais fáceis de alcançar.',
      },
      {
        type: 'paragraph',
        content: 'O resultado é um relatório que a diretoria consegue ler e usar para tomar decisões de investimento. Não uma lista de problemas técnicos, mas uma análise de risco com impacto financeiro quantificado e roadmap de evolução priorizado.',
      },
      {
        type: 'h2',
        content: 'Conclusão',
      },
      {
        type: 'paragraph',
        content: 'Se você não consegue responder com precisão quanto custa uma hora de indisponibilidade na sua empresa — por sistema, com RTO e RPO definidos —, você não tem visibilidade real do risco que está correndo. Esse não é um problema técnico. É um problema de governança.',
      },
      {
        type: 'paragraph',
        content: 'O bom investimento em continuidade operacional começa pela resposta honesta a essa pergunta. O Assessment Executivo é o caminho para obtê-la.',
      },
    ],
  },
  {
    slug: 'seu-backup-realmente-funciona',
    title: 'Seu backup realmente funciona ou apenas gera uma falsa sensação de segurança?',
    description: 'A maioria das empresas tem backup. Poucas têm backup que funciona quando precisam. Entenda a diferença entre "backup realizado" e "backup recuperável", como testar corretamente e o que uma arquitetura de backup madura precisa ter.',
    publishedAt: '2026-06-19',
    category: 'Backup & Continuidade',
    readingTime: 8,
    keywords: ['backup corporativo funciona', 'teste de restore backup', 'arquitetura backup 3-2-1', 'backup imutável empresa', 'backup recuperável'],
    sections: [
      {
        type: 'paragraph',
        content: 'A maioria das empresas tem backup. Isso é um fato — e não é nenhum conforto. Porque ter backup e ter backup que funciona quando você mais precisa são coisas completamente diferentes.',
      },
      {
        type: 'paragraph',
        content: 'A diferença entre as duas situações só fica evidente em um momento: quando você precisa restaurar. E esse é, invariavelmente, o pior momento possível para descobrir que o processo falhou.',
      },
      {
        type: 'h2',
        content: 'A ilusão do backup: por que "está rodando" não é suficiente',
      },
      {
        type: 'paragraph',
        content: 'Um job de backup que executa sem erro não garante que os dados sejam recuperáveis. Essa distinção é central — e frequentemente ignorada.',
      },
      {
        type: 'list',
        items: [
          'Jobs que completam com "warnings" ignorados: arquivos em uso, permissões inconsistentes, dados parcialmente capturados',
          'Backup de arquivos abertos sem agente de aplicação: banco de dados copiado enquanto em uso resulta em backup corrompido ou inconsistente',
          'Mídia de backup degradada: fitas ou discos que acumulam erros silenciosamente ao longo do tempo — descobertos apenas no restore',
          'Backup armazenado na mesma rede do primário: um ataque de ransomware que compromete os servidores alcança o backup na sequência',
          'Procedimento de restore que ninguém testou: o processo existe no papel, mas quando executado sob pressão, revela dependências não documentadas',
          'Retenção insuficiente: ransomware com incubação longa compromete os dados semanas antes de ser detectado — backups de curto prazo não cobrem o período limpo',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        content: 'Backups nunca testados são a forma mais cara de falsa segurança em TI. O custo de um restore de teste mensal é medido em horas de trabalho. O custo de descobrir que o backup não funciona durante um incidente é medido em dias de paralisação — e às vezes em dados irrecuperáveis.',
      },
      {
        type: 'h2',
        content: 'Arquitetura 3-2-1: o padrão que toda empresa crítica deveria seguir',
      },
      {
        type: 'paragraph',
        content: 'A regra 3-2-1 é simples na formulação e exigente na execução. Três cópias dos dados: o dado original mais duas cópias de backup. Dois tipos diferentes de mídia ou armazenamento: evita que uma falha de tipo único comprometa todas as cópias. Uma cópia em local diferente: fisicamente separada — outra cidade, outro datacenter, cloud — imune a desastres locais.',
      },
      {
        type: 'paragraph',
        content: 'Para ambientes modernos, especialmente os expostos ao risco de ransomware, a regra evoluiu para 3-2-1-1-0: a cópia adicional é imutável (não pode ser alterada ou deletada por nenhum processo ou usuário durante o período de retenção), e o zero representa zero erros verificados nos backups — testados regularmente.',
      },
      {
        type: 'h2',
        content: 'Backup imutável: a proteção que o ransomware não consegue desfazer',
      },
      {
        type: 'paragraph',
        content: 'Ransomware moderno não criptografa apenas os dados primários. Ele busca ativamente os backups conectados à rede e os compromete também — antes de ativar a criptografia nos dados principais. Isso é uma das razões pelas quais empresas que "tinham backup" ainda precisam pagar resgates.',
      },
      {
        type: 'paragraph',
        content: 'Backup imutável resolve esse problema. Uma vez gravado, o dado não pode ser modificado, sobrescrito ou deletado durante o período de retenção definido — nem por um administrador, nem por um processo automatizado, nem por um ransomware com credenciais de admin comprometidas. A imutabilidade é garantida em nível de armazenamento, não de permissão.',
      },
      {
        type: 'h2',
        content: 'Como testar backup de forma estruturada',
      },
      {
        type: 'paragraph',
        content: 'Testar backup não é executar o job e verificar se completou sem erro. Teste real é restaurar dados e verificar se são utilizáveis. Existem três níveis de teste que empresas maduras realizam sistematicamente.',
      },
      {
        type: 'list',
        items: [
          'Teste de restore granular (mensal): restaurar um conjunto aleatório de arquivos ou registros e verificar integridade — leva minutos e detecta falhas silenciosas antes que se acumulem',
          'Teste de restore completo de sistema (trimestral): restaurar um servidor ou aplicação inteira em ambiente isolado e verificar se opera corretamente — valida o processo completo sem afetar produção',
          'Simulação de DR completa (anual): simular um cenário de desastre real e medir o tempo efetivo de recuperação — revela diferenças entre o RTO estimado e o RTO real',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        content: 'Cada teste deve gerar um relatório documentado: o que foi testado, quando, por quem, qual o resultado e qual o tempo de restore medido. Esse relatório é evidência de maturidade para auditorias, seguros e requisitos regulatórios.',
      },
      {
        type: 'h2',
        content: 'Como empresas maduras gerenciam backup',
      },
      {
        type: 'list',
        items: [
          'Dashboard de status diário: cada job tem status visível — sucesso, aviso ou falha — com alertas automáticos para qualquer desvio',
          'Retenção definida por criticidade: dados críticos com retenção de 30, 90 e 365 dias; dados operacionais com política adequada ao contexto regulatório',
          'Agentes de aplicação para sistemas críticos: backup consistente de bancos de dados, Exchange e aplicações ERP — não apenas cópia de arquivo',
          'Criptografia em repouso e em trânsito: dados de backup criptografados com AES-256 — protege contra acesso não autorizado mesmo se a mídia for comprometida',
          'Relatório mensal revisado por gestão: backup não é responsabilidade exclusiva do analista de TI — gestão precisa ter visibilidade',
        ],
      },
      {
        type: 'h2',
        content: 'Como a JPX Digital aborda esse cenário',
      },
      {
        type: 'paragraph',
        content: 'O Backup Readiness Assessment da JPX começa por onde o problema costuma estar oculto: verificamos não apenas se o backup está rodando, mas se os dados são recuperáveis. Fazemos restore de teste antes de qualquer projeto de modernização — e documentamos o resultado.',
      },
      {
        type: 'paragraph',
        content: 'Quando implementamos uma solução de backup, ela só é considerada concluída depois que o restore completo do ambiente é executado e validado. O que não foi testado não pode ser chamado de backup — apenas de esperança documentada.',
      },
      {
        type: 'h2',
        content: 'Conclusão',
      },
      {
        type: 'paragraph',
        content: 'O momento em que você descobre que seu backup não funciona é o pior momento possível para descobrir isso: durante um incidente, sob pressão, com a operação parada e o board esperando uma previsão de retomada.',
      },
      {
        type: 'paragraph',
        content: 'A pergunta "seu backup funciona?" tem uma única resposta válida: "sim, e aqui está o relatório do último restore de teste". Qualquer outra resposta é uma suposição.',
      },
    ],
  },
  {
    slug: 'cinco-riscos-invisiveis-infraestrutura-empresas-medias',
    title: 'Os cinco riscos invisíveis que colocam a infraestrutura de empresas médias em perigo',
    description: 'Os incidentes de TI que paralisam empresas raramente são surpresa total. Em retrospecto, os sinais estavam lá — invisíveis para quem estava ocupado demais para olhar. Conheça os cinco riscos estruturais mais comuns em ambientes de médio porte e por que eles só aparecem quando causam dano.',
    publishedAt: '2026-06-12',
    category: 'Continuidade Operacional',
    readingTime: 10,
    keywords: ['riscos infraestrutura TI', 'riscos invisíveis TI empresa', 'governança TI médias empresas', 'assessment TI riscos', 'infraestrutura crítica vulnerabilidades'],
    sections: [
      {
        type: 'paragraph',
        content: 'Os incidentes de TI que paralisam operações raramente são surpresa total. Em retrospecto — depois que o servidor falhou, depois que o backup não restaurou, depois que o ataque aconteceu — os sinais estavam lá. Enterrados na rotina operacional, normalizados pela ausência de consequências imediatas.',
      },
      {
        type: 'paragraph',
        content: 'O problema específico das empresas de médio porte é que elas têm infraestrutura complexa o suficiente para acumular risco — mas frequentemente carecem da estrutura de governança para identificá-lo sistematicamente. O resultado é uma categoria de risco que raramente aparece em relatórios: o risco invisível.',
      },
      {
        type: 'h2',
        content: 'Risco 1 — Ausência de documentação técnica atualizada',
      },
      {
        type: 'paragraph',
        content: 'Toda empresa tem aquela pessoa que "sabe como funciona o sistema". O problema não é ela existir — é quando ela é a única fonte de conhecimento sobre a infraestrutura crítica.',
      },
      {
        type: 'paragraph',
        content: 'Quando essa pessoa tira férias, adoece ou sai da empresa, o que acontece? A resposta mais comum é: a equipe improvisa, gasta horas reconstruindo o entendimento do ambiente e, em situações de incidente, toma decisões sem o contexto necessário. Documentação não é burocracia — é seguro de continuidade operacional.',
      },
      {
        type: 'list',
        items: [
          'Diagramas de rede desatualizados — ninguém sabe exatamente o que está conectado a quê',
          'Senhas de sistemas críticos conhecidas apenas por uma pessoa, sem cofre de credenciais',
          'Procedimentos de backup e restore não documentados — dependentes de memória individual',
          'Configurações de firewall e VPN que ninguém documenta quando muda',
          'Contratos de suporte e licenciamento sem inventário centralizado',
        ],
      },
      {
        type: 'h2',
        content: 'Risco 2 — Contas privilegiadas sem governança',
      },
      {
        type: 'paragraph',
        content: 'Conta de administrador compartilhada entre três analistas. Senha do servidor que "todo mundo sabe" e nunca é rotacionada. Ex-funcionário que saiu há seis meses e ainda tem acesso ativo ao VPN. Fornecedor externo com credencial de admin que foi criada para um projeto pontual dois anos atrás.',
      },
      {
        type: 'paragraph',
        content: 'Contas privilegiadas sem governança são o vetor de ataque mais explorado em incidentes corporativos — e o mais difícil de detectar, porque o acesso parece legítimo. Um atacante que obtém credencial de admin válida não precisa de exploit sofisticado: ele simplesmente usa o sistema como se fosse o usuário legítimo.',
      },
      {
        type: 'list',
        items: [
          'Princípio do menor privilégio: cada usuário e sistema tem acesso apenas ao que precisa para sua função',
          'Cofre de credenciais privilegiadas (PAM): senhas rotacionadas automaticamente, acesso auditado e rastreável',
          'Revisão periódica de acessos: ex-funcionários e fornecedores inativos removidos sistematicamente',
          'MFA obrigatório para todos os acessos privilegiados, especialmente remotos',
          'Log de uso de contas privilegiadas: quem acessou o quê, quando e de onde',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        content: 'Segundo dados do setor de segurança, mais de 80% dos incidentes bem-sucedidos envolvem uso de credenciais legítimas comprometidas. Atacar uma senha forte é difícil. Roubar uma senha de alguém que não usa MFA e tem acesso irrestrito é muito mais simples.',
      },
      {
        type: 'h2',
        content: 'Risco 3 — Backups nunca testados',
      },
      {
        type: 'paragraph',
        content: 'O job de backup executa toda noite. O relatório mostra "completed successfully". A equipe de TI tem a sensação de que os dados estão protegidos.',
      },
      {
        type: 'paragraph',
        content: 'Essa sensação pode ser completamente equivocada. Backup que não passou por restore de teste não pode ser chamado de backup — é apenas uma cópia cuja utilidade ainda não foi verificada. Backups corrompidos, bancos de dados capturados em estado inconsistente, mídias com setores defeituosos, retenção insuficiente para cobrir o período de incubação de um ransomware — todos esses problemas são silenciosos e só aparecem no momento mais crítico.',
      },
      {
        type: 'paragraph',
        content: 'A solução é simples: restore de teste mensal, documentado, com relatório revisado por gestão. O que não é testado não é garantia.',
      },
      {
        type: 'h2',
        content: 'Risco 4 — Ausência de plano de recuperação testado',
      },
      {
        type: 'paragraph',
        content: 'Backup adequado é necessário, mas não suficiente. Ter os dados disponíveis para restauração é metade do problema. A outra metade é saber exatamente o que fazer com eles — em que ordem, em qual infraestrutura, com quais dependências — quando a operação está parada e a pressão é máxima.',
      },
      {
        type: 'paragraph',
        content: 'Plano de recuperação não é um documento guardado em pasta compartilhada. É um procedimento que a equipe conhece, praticou e sabe executar sob estresse. Inclui mais do que passos técnicos: quem aciona o plano, quem tem autoridade para tomar decisões, como a empresa opera durante a recuperação, como os clientes são comunicados.',
      },
      {
        type: 'list',
        items: [
          'Runbooks de failover documentados por sistema crítico — passo a passo, com responsáveis definidos',
          'Plano de operação degradada: como a empresa funciona nas horas em que os sistemas estão sendo restaurados',
          'Plano de comunicação de crise: quem fala com quem, o que dizer e quando',
          'Tabletop exercise semestral: reunião de simulação com equipes de TI e operação — sem pressão de incidente real, mas com os mesmos questionamentos',
          'RTO medido em simulação — não estimado em teoria',
        ],
      },
      {
        type: 'h2',
        content: 'Risco 5 — Ambientes legados sem monitoramento',
      },
      {
        type: 'paragraph',
        content: 'Todo ambiente corporativo tem sistemas que "sempre funcionaram" e, por isso, recebem zero atenção. Servidores com Windows Server 2008 sem patches. Aplicações rodando em versões de software sem suporte. Equipamentos de rede com firmware de cinco anos atrás. Switches e firewalls que ninguém toca porque "está funcionando".',
      },
      {
        type: 'paragraph',
        content: 'Esses sistemas são os mais vulneráveis — não porque alguém os atacou, mas porque ninguém os monitorou. Vulnerabilidades conhecidas acumulam sem correção. Capacidade de disco esgota sem alerta. Falhas de hardware se anunciam em logs que ninguém lê. Quando o sistema finalmente para, a causa costuma ser um problema que existia há meses.',
      },
      {
        type: 'list',
        items: [
          'Inventário completo do ambiente: tudo que está em produção precisa estar no radar — especialmente o que parece invisível',
          'Monitoramento de saúde de hardware: disco, memória, temperatura, falhas de redundância',
          'Alertas de fim de suporte: sistemas com OS ou aplicação sem suporte têm prazo para migração',
          'Patch management estruturado: inclusive para sistemas "que não podem ser atualizados" — que precisam de compensações de segurança',
          'Revisão de logs de sistemas críticos: não necessariamente real-time, mas sistematicamente',
        ],
      },
      {
        type: 'h2',
        content: 'Por que esses riscos permanecem invisíveis',
      },
      {
        type: 'paragraph',
        content: 'Esses cinco riscos têm uma característica em comum: eles não geram alertas. Não aparecem em dashboards. Não interrompem a operação. Não provocam reclamações de usuário. Eles simplesmente existem — silenciosamente — até que um evento externo os aciona.',
      },
      {
        type: 'paragraph',
        content: 'É por isso que equipes internas, por mais competentes que sejam, frequentemente não os identificam. A rotina operacional não cria espaço para o olhar externo e sistemático que esses riscos exigem.',
      },
      {
        type: 'h2',
        content: 'Como a JPX Digital aborda esse cenário',
      },
      {
        type: 'paragraph',
        content: 'O Assessment Executivo da JPX é estruturado exatamente para tornar visível o que a rotina operacional esconde. Não é uma auditoria de conformidade nem uma verificação de checklist genérico: é um mapeamento técnico do ambiente real — o que existe de fato, não o que está documentado — com análise de risco por sistema crítico.',
      },
      {
        type: 'paragraph',
        content: 'Os cinco riscos descritos neste artigo são identificados sistematicamente no assessment. O resultado é um relatório com os riscos classificados por severidade e impacto financeiro, e um roadmap com o que resolver primeiro, o que planejar a médio prazo e o que monitorar continuamente.',
      },
      {
        type: 'h2',
        content: 'Conclusão',
      },
      {
        type: 'paragraph',
        content: 'Risco invisível não é risco inexistente. É risco não quantificado, não monitorado e não gerenciado — o mais perigoso de todos, porque não provoca ação preventiva.',
      },
      {
        type: 'paragraph',
        content: 'A questão não é se esses riscos existem no seu ambiente. A questão é se você os conhece antes que eles se manifestem.',
      },
    ],
  },
  {
    slug: 'backup-microsoft-365-por-que-microsoft-nao-faz-backup',
    title: 'Backup do Microsoft 365: por que a Microsoft não protege seus dados',
    description:
      'A maioria das empresas acredita que o Microsoft 365 faz backup automático dos dados. Não faz. Entenda o que a Microsoft garante, o que não garante, e como proteger e-mails, SharePoint e Teams de verdade.',
    publishedAt: '2026-06-01',
    category: 'Backup & Continuidade',
    readingTime: 7,
    keywords: ['backup microsoft 365', 'backup office 365', 'microsoft 365 backup corporativo', 'backup teams sharepoint'],
    sections: [
      {
        type: 'paragraph',
        content: 'Quando a empresa migra para o Microsoft 365, assume-se que a Microsoft cuida do backup. É um equívoco comum — e caro quando descoberto tarde demais.',
      },
      {
        type: 'paragraph',
        content: 'A Microsoft garante alta disponibilidade da plataforma (o serviço ficará no ar) e retenção básica de dados deletados por um período limitado. Ela não garante recuperação de dados perdidos por erro humano, ataque ransomware, sincronização corrompida do OneDrive ou exclusão acidental de uma caixa de e-mail inteira.',
      },
      {
        type: 'h2',
        content: 'O que a Microsoft realmente garante',
      },
      {
        type: 'paragraph',
        content: 'O Acordo de Nível de Serviço (SLA) do Microsoft 365 cobre disponibilidade: 99,9% de uptime. Isso é excelente. Mas disponibilidade não é o mesmo que proteção de dados.',
      },
      {
        type: 'paragraph',
        content: 'A Microsoft mantém seus dados em redundância geográfica — se um datacenter falhar, outro assume. Mas se um usuário deletar todos os e-mails de um colega que saiu da empresa, ou se um ransomware sincronizar arquivos criptografados pelo OneDrive sobrepondo os originais, a redundância não ajuda: ela replica o problema.',
      },
      {
        type: 'list',
        items: [
          'E-mails deletados ficam na lixeira por 30 dias (configurável até 30 dias com retenção padrão)',
          'Após esse período, a recuperação é limitada ou impossível sem backup externo',
          'SharePoint e OneDrive: versões antigas de arquivos ficam disponíveis por 30 a 180 dias dependendo da configuração',
          'Teams: mensagens deletadas podem ser irrecuperáveis após o período de retenção',
          'Caixas de e-mail de ex-funcionários: deletadas automaticamente após o período de licença, salvo configuração específica',
        ],
      },
      {
        type: 'h2',
        content: 'Os três cenários mais comuns de perda de dados no M365',
      },
      {
        type: 'h3',
        content: '1. Erro humano',
      },
      {
        type: 'paragraph',
        content: 'O mais frequente. Um administrador remove uma caixa de e-mail por engano. Um usuário deleta uma pasta inteira do SharePoint. Alguém sobrescreve um arquivo importante com uma versão errada. Sem backup externo, a janela de recuperação é curta e incerta.',
      },
      {
        type: 'h3',
        content: '2. Ransomware via sincronização do OneDrive',
      },
      {
        type: 'paragraph',
        content: 'O atacante criptografa os arquivos locais do notebook. O OneDrive sincroniza — e substitui os arquivos originais na nuvem pelos criptografados. As versões anteriores existem, mas o processo de recuperação arquivo por arquivo pode levar dias em uma empresa com centenas de usuários.',
      },
      {
        type: 'h3',
        content: '3. Saída de funcionários',
      },
      {
        type: 'paragraph',
        content: 'Ao remover a licença M365 de um ex-funcionário, o prazo para acessar os dados da caixa é limitado. Sem uma política clara de backup de dados de ex-colaboradores, informações de e-mail e documentos podem ser perdidas permanentemente.',
      },
      {
        type: 'h2',
        content: 'Como fazer backup correto do Microsoft 365',
      },
      {
        type: 'callout',
        variant: 'info',
        content: 'A Microsoft recomenda explicitamente o uso de soluções de backup de terceiros no próprio Service Agreement. O trecho está disponível na seção "Data Retention, Deletion, and Destruction" da documentação oficial.',
      },
      {
        type: 'paragraph',
        content: 'A solução adequada é um backup externo do M365 que capture diariamente o conteúdo de Exchange Online (e-mails, calendários, contatos), SharePoint, OneDrive e Teams — e armazene fora da infraestrutura da Microsoft.',
      },
      {
        type: 'list',
        items: [
          'Exchange Online: backup de todas as caixas de e-mail, incluindo itens deletados além do período padrão',
          'SharePoint e OneDrive: backup de todos os arquivos e versões históricas com retenção configurável',
          'Teams: backup de mensagens e arquivos de canais',
          'Armazenamento externo: os backups ficam em um ambiente separado da Microsoft — imune a ransomware que comprometa o tenant M365',
          'Restauração granular: recuperar um único e-mail, uma pasta específica ou uma caixa inteira sem restaurar tudo',
        ],
      },
      {
        type: 'h2',
        content: 'Retenção e compliance',
      },
      {
        type: 'paragraph',
        content: 'Além da proteção contra perda acidental, muitas empresas precisam reter e-mails por períodos específicos por exigências legais ou regulatórias. O backup externo com retenção configurável resolve isso com mais flexibilidade do que as ferramentas nativas do M365.',
      },
      {
        type: 'paragraph',
        content: 'Para empresas sujeitas à LGPD, manter o histórico de comunicações com clientes pode ser relevante para demonstrar conformidade. Para empresas no setor financeiro ou jurídico, prazos de retenção de anos são frequentemente obrigatórios.',
      },
      {
        type: 'h2',
        content: 'Conclusão',
      },
      {
        type: 'paragraph',
        content: 'O Microsoft 365 é uma plataforma excelente. Mas a responsabilidade pelo backup dos seus dados é sua — não da Microsoft. Isso está documentado nos próprios termos de serviço.',
      },
      {
        type: 'paragraph',
        content: 'Um backup externo do M365 custa uma fração do custo de uma perda de dados. O momento de contratar não é depois de perder dados críticos.',
      },
    ],
  },
  {
    slug: 'oracle-cloud-oci-brasil-quando-escolher',
    title: 'OCI no Brasil: Quando Oracle Cloud é a Escolha Certa para Sua Empresa',
    description:
      'Oracle Cloud Infrastructure (OCI) é frequentemente ignorada em favor de AWS e Azure. Para muitas empresas brasileiras, especialmente as que já usam produtos Oracle, pode ser a melhor escolha técnica e financeira.',
    publishedAt: '2026-06-08',
    category: 'Cloud Computing',
    readingTime: 8,
    keywords: ['oracle cloud OCI', 'consultoria OCI', 'oracle cloud brasil', 'OCI vs AWS vs Azure'],
    sections: [
      {
        type: 'paragraph',
        content: 'Oracle Cloud Infrastructure (OCI) é a terceira maior cloud pública do mercado, atrás de AWS e Azure. No Brasil, é frequentemente subestimada — e isso cria uma oportunidade real para empresas que avaliam com critério.',
      },
      {
        type: 'paragraph',
        content: 'A OCI tem um datacenter região no Brasil (São Paulo, desde 2019), preços competitivos em compute e storage, e vantagens técnicas específicas para workloads Oracle Database que as outras clouds simplesmente não conseguem oferecer.',
      },
      {
        type: 'h2',
        content: 'O que diferencia a OCI das outras clouds',
      },
      {
        type: 'h3',
        content: 'Preço de compute e storage',
      },
      {
        type: 'paragraph',
        content: 'A OCI é consistentemente mais barata em compute e storage do que AWS e Azure em comparações diretas de configuração equivalente. O shape Ampere A1 (ARM, até 4 OCPU e 24 GB RAM no Always Free Tier) tem desempenho superior ao equivalente x86 a custo menor. Para muitas cargas de trabalho web, é possível rodar inteiramente no Free Tier da OCI.',
      },
      {
        type: 'h3',
        content: 'Oracle Database — o diferencial real',
      },
      {
        type: 'paragraph',
        content: 'Se sua empresa usa Oracle Database, rodar na OCI não é apenas uma opção — pode ser a única que faz sentido financeiramente. O Bring Your Own License (BYOL) na OCI permite usar suas licenças Oracle existentes com desconto significativo. A Oracle garante suporte completo ao banco quando rodando na OCI. Na AWS ou Azure, o suporte Oracle para o banco é limitado.',
      },
      {
        type: 'h3',
        content: 'Autonomous Database',
      },
      {
        type: 'paragraph',
        content: 'O Oracle Autonomous Database é um diferencial exclusivo: um banco Oracle que se autoadministra — patches, backups, tuning de performance e escalabilidade são automatizados. Não existe equivalente direto em outras clouds. Para empresas com Oracle Database crítico e equipe pequena de DBA, é uma vantagem operacional significativa.',
      },
      {
        type: 'h2',
        content: 'Quando escolher OCI',
      },
      {
        type: 'list',
        items: [
          'Empresa já usa Oracle Database (E-Business Suite, JD Edwards, PeopleSoft) — BYOL na OCI é financeiramente muito vantajoso',
          'Workloads com alto uso de compute e storage onde o custo AWS/Azure é alto',
          'Empresas que querem diversificar de AWS/Azure para evitar dependência de um único provedor',
          'Projetos novos sem legado de cloud, onde o lower cost da OCI é relevante',
          'Ambientes de desenvolvimento e homologação que podem aproveitar o Free Tier generoso',
        ],
      },
      {
        type: 'h2',
        content: 'Quando não escolher OCI',
      },
      {
        type: 'list',
        items: [
          'Ecosistema já consolidado em AWS ou Azure com muitas integrações nativas — a migração tem custo alto',
          'Time de desenvolvimento com expertise AWS/Azure e sem disposição para aprender OCI',
          'Serviços específicos AWS/Azure sem equivalente maduro na OCI (ex: SageMaker para ML, Azure OpenAI)',
          'Empresas que precisam de suporte 24/7 com SLA agressivo e preferem um provedor com maior base de suporte no Brasil',
        ],
      },
      {
        type: 'h2',
        content: 'OCI vs AWS vs Azure: comparação direta',
      },
      {
        type: 'callout',
        variant: 'info',
        content: 'Comparações de preço entre clouds mudam com frequência. Os valores abaixo são orientativos para 2026 — sempre solicite uma estimativa atualizada baseada no seu workload específico.',
      },
      {
        type: 'list',
        items: [
          'Compute (VM equivalente): OCI ≈ 30-40% mais barato que AWS, ≈ 25-35% mais barato que Azure',
          'Storage em bloco: OCI é consistentemente mais barato em todas as camadas',
          'Saída de dados (egress): OCI tem egress gratuito de até 10 TB/mês — AWS e Azure cobram por GB',
          'Oracle Database: OCI com BYOL pode ser até 60% mais barato que AWS/Azure com BYOL',
          'Serviços gerenciados (K8s, funções, ML): AWS e Azure têm ecossistema mais maduro',
        ],
      },
      {
        type: 'h2',
        content: 'A região Brasil da OCI',
      },
      {
        type: 'paragraph',
        content: 'A OCI tem datacenter em São Paulo (sa-saopaulo-1) desde 2019. Para empresas que precisam de residência de dados no Brasil (LGPD) ou de baixa latência para usuários brasileiros, a região SP da OCI atende bem — com latência comparável à AWS São Paulo e Azure Brasil Sul.',
      },
      {
        type: 'h2',
        content: 'Como avaliar se a OCI faz sentido para sua empresa',
      },
      {
        type: 'paragraph',
        content: 'A melhor forma é um TCO (Total Cost of Ownership) comparativo para o seu workload específico. Uma análise genérica de preços não captura as nuances: tipo de instância, uso de Oracle Database, perfil de egress, serviços gerenciados utilizados.',
      },
      {
        type: 'paragraph',
        content: 'A JPX Digital realiza esse assessment sem custo. Se a OCI fizer sentido, avançamos com a migração. Se AWS ou Azure for a melhor escolha técnica e financeira para o seu caso, dizemos isso também.',
      },
    ],
  },
  {
    slug: 'disaster-recovery-hospitais-lgpd-como-se-preparar',
    title: 'Disaster Recovery em Hospitais: Como Estruturar Antes que o Ransomware Chegue',
    description:
      'Hospitais são o setor mais visado por ransomware no Brasil. Entenda o que a LGPD exige, quais sistemas precisam de proteção prioritária e como estruturar um plano de DR que realmente funciona.',
    publishedAt: '2026-06-15',
    category: 'Saúde & Continuidade',
    readingTime: 9,
    keywords: ['disaster recovery hospitais', 'DR hospital', 'backup hospitais LGPD', 'continuidade operacional hospital'],
    sections: [
      {
        type: 'paragraph',
        content: 'O setor de saúde é o mais atacado por ransomware no Brasil e no mundo. Em 2024, foram registrados ataques a hospitais em todas as regiões do país — com paralisação de sistemas por dias, cancelamento de cirurgias e, em casos extremos, óbitos associados à indisponibilidade de prontuários e equipamentos.',
      },
      {
        type: 'paragraph',
        content: 'A questão não é se o hospital será alvo — é quando. E o que define o impacto é o que foi feito antes do ataque.',
      },
      {
        type: 'h2',
        content: 'O que a LGPD exige de hospitais e clínicas',
      },
      {
        type: 'paragraph',
        content: 'A Lei Geral de Proteção de Dados (Lei 13.709/2018) classifica dados de saúde como dados pessoais sensíveis — a categoria mais protegida. Isso implica obrigações específicas que vão além do que a maioria dos hospitais implementa.',
      },
      {
        type: 'list',
        items: [
          'Consentimento específico para tratamento de dados sensíveis de saúde (Art. 11)',
          'Medidas de segurança técnicas e administrativas adequadas para proteger contra acesso não autorizado (Art. 46)',
          'Notificação à ANPD e aos titulares em caso de incidente que possa gerar risco ou dano — incluindo ataques de ransomware (Art. 48)',
          'Registro das operações de tratamento de dados (RIPD — Relatório de Impacto à Proteção de Dados)',
          'DPO (Encarregado de Dados) recomendado e, em muitos casos, obrigatório para hospitais de médio e grande porte',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        content: 'A ANPD tem aplicado multas ao setor de saúde. Um incidente de ransomware que resulte em vazamento de dados de pacientes pode gerar multa de até 2% do faturamento anual do hospital, limitada a R$ 50 milhões por infração.',
      },
      {
        type: 'h2',
        content: 'O que o CFM exige sobre prontuários eletrônicos',
      },
      {
        type: 'paragraph',
        content: 'O Conselho Federal de Medicina (Resolução CFM 1.821/2007) estabelece que prontuários eletrônicos devem ser mantidos por no mínimo 20 anos após a data do último atendimento. Isso não é apenas uma boa prática — é obrigação legal.',
      },
      {
        type: 'paragraph',
        content: 'Implicação direta: o sistema de backup precisa garantir não apenas a recuperação imediata após um incidente, mas a integridade e recuperabilidade dos dados por 20 anos. Isso exige uma estratégia de backup de longo prazo com testes periódicos de restauração.',
      },
      {
        type: 'h2',
        content: 'Sistemas críticos e sua classificação de RTO/RPO',
      },
      {
        type: 'paragraph',
        content: 'Nem todos os sistemas têm a mesma criticidade. Um plano de DR bem estruturado classifica cada sistema pelo RTO (Recovery Time Objective — tempo máximo para restaurar) e RPO (Recovery Point Objective — perda máxima de dados aceitável).',
      },
      {
        type: 'list',
        items: [
          'Prontuário Eletrônico (HIS): RTO máximo 4h, RPO máximo 1h — sistemas de emergência e UTI não podem esperar',
          'PACS (imagens médicas): RTO máximo 8h, RPO máximo 4h — exames de rotina podem aguardar mais',
          'Faturamento e TISS: RTO máximo 24h, RPO máximo 4h — impacto financeiro, mas não de atendimento',
          'E-mail e comunicação: RTO máximo 24h, RPO máximo 8h',
          'Sistemas administrativos (RH, compras): RTO máximo 48h — podem operar manualmente por mais tempo',
        ],
      },
      {
        type: 'h2',
        content: 'As quatro camadas do DR para hospitais',
      },
      {
        type: 'h3',
        content: '1. Backup imutável off-site',
      },
      {
        type: 'paragraph',
        content: 'A camada mais crítica. Backups imutáveis são armazenados em formato que não pode ser alterado ou deletado por um determinado período — nem mesmo pelo ransomware que comprometeu o servidor principal. São armazenados em um local fisicamente separado (cloud ou segundo datacenter). Para prontuários, a retenção deve ser de 20+ anos.',
      },
      {
        type: 'h3',
        content: '2. Alta disponibilidade dos sistemas críticos',
      },
      {
        type: 'paragraph',
        content: 'HA (High Availability) garante que se um servidor falhar, outro assume automaticamente em minutos — sem perda de dados. Para o HIS de emergência e UTI, isso é mandatório. Requer cluster de pelo menos 2 servidores com storage compartilhado ou replicação síncrona.',
      },
      {
        type: 'h3',
        content: '3. Plano de operação degradada',
      },
      {
        type: 'paragraph',
        content: 'O que o hospital faz nas horas em que a TI está sendo restaurada? Quais procedimentos podem ser feitos manualmente? Quais dados precisam estar disponíveis em papel? Como a equipe é comunicada? Esse plano precisa existir, ser treinado e ser acessível sem depender de sistemas de TI.',
      },
      {
        type: 'h3',
        content: '4. Segmentação de rede',
      },
      {
        type: 'paragraph',
        content: 'Equipamentos médicos conectados em rede (monitores, bombas infusoras, ventiladores) frequentemente rodam firmware desatualizado que não pode receber patches. A segmentação de rede isola esses equipamentos da rede corporativa e da internet — limitando o alcance de um ataque que comprometa a rede principal.',
      },
      {
        type: 'h2',
        content: 'Testes de DR: o que muitas instituições negligenciam',
      },
      {
        type: 'paragraph',
        content: 'Um plano de DR não testado é uma expectativa, não uma garantia. O teste revela o que não funciona antes que um incidente real revele.',
      },
      {
        type: 'list',
        items: [
          'Teste de restauração de prontuário: restaurar um período específico de dados e verificar integridade',
          'Teste de failover do HIS: simular falha do servidor principal e medir o tempo real de retomada',
          'Tabletop exercise: reunião com equipes de TI e operação simulando um ransomware — quem faz o quê, em qual ordem',
          'Teste de operação degradada: a equipe de enfermagem sabe onde está o procedimento manual? Ele funciona?',
          'Frequência mínima: simulações semestrais, teste completo de restauração anual',
        ],
      },
      {
        type: 'h2',
        content: 'Por onde começar',
      },
      {
        type: 'paragraph',
        content: 'O primeiro passo é sempre o assessment: inventário dos sistemas, classificação de criticidade, análise das configurações atuais de backup e disponibilidade. A partir daí, o plano de DR é construído com base na realidade do hospital — não em um template genérico.',
      },
      {
        type: 'paragraph',
        content: 'A JPX Digital tem experiência em infraestrutura para o setor de saúde, incluindo a implementação dos controles técnicos exigidos pelo CFM e pela LGPD. O assessment inicial é gratuito.',
      },
    ],
  },
  {
    slug: 'ransomware-brasil-como-proteger-empresa',
    title: 'Ransomware no Brasil em 2026: como sua empresa pode se proteger',
    description:
      'O Brasil é o segundo país mais atacado por ransomware na América Latina. Entenda como os ataques funcionam, quais setores são mais visados e quais medidas realmente reduzem o risco — sem depender apenas de antivírus.',
    publishedAt: '2026-05-20',
    category: 'Segurança Cibernética',
    readingTime: 8,
    keywords: ['ransomware brasil', 'proteção ransomware empresa', 'segurança cibernética PME', 'como proteger empresa ransomware'],
    sections: [
      {
        type: 'paragraph',
        content: 'Em 2024, o Brasil registrou mais de 60 ataques de ransomware por semana — o segundo maior volume da América Latina, atrás apenas do México. Hospitais, escritórios de advocacia, indústrias e pequenas empresas estão entre os alvos mais frequentes.',
      },
      {
        type: 'paragraph',
        content: 'O que mudou nos últimos anos: o ransomware deixou de ser um problema exclusivo de grandes corporações. Hoje, PMEs com 10 a 200 funcionários são alvos frequentes porque têm dados valiosos e investimento limitado em segurança.',
      },
      {
        type: 'h2',
        content: 'Como funciona um ataque de ransomware na prática',
      },
      {
        type: 'paragraph',
        content: 'O modelo mais comum em 2025-2026 é o Ransomware-as-a-Service (RaaS): grupos criminosos desenvolvem o malware e o alugam para afiliados que executam os ataques. Isso explica o volume alto e a diversidade de alvos.',
      },
      {
        type: 'list',
        items: [
          'Entrada: phishing por e-mail (link ou anexo), credenciais RDP expostas, vulnerabilidades em VPNs e firewalls desatualizados',
          'Reconhecimento: o atacante fica quieto por dias ou semanas, mapeando a rede e identificando backups e sistemas críticos',
          'Exfiltração: cópia dos dados para servidor externo (para usar como extorsão adicional)',
          'Criptografia: execução do ransomware — arquivos são criptografados em horas',
          'Resgate: cobrança em criptomoeda, com ameaça de publicar os dados exfiltrados caso não haja pagamento',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        content: 'Pagar o resgate não garante a recuperação dos dados. Cerca de 40% das empresas que pagam não conseguem recuperar todos os arquivos. E pagando, a empresa vira alvo confirmado para ataques futuros.',
      },
      {
        type: 'h2',
        content: 'Por que antivírus não é suficiente',
      },
      {
        type: 'paragraph',
        content: 'Antivírus detecta malware conhecido. O problema é que as variantes de ransomware modernas são frequentemente modificadas para escapar de assinaturas conhecidas — e o intervalo entre uma variante nova e a atualização das assinaturas é justamente a janela de ataque.',
      },
      {
        type: 'paragraph',
        content: 'Proteção efetiva contra ransomware é multicamada: identidade (MFA), endpoint (EDR, não apenas antivírus), rede (firewall de próxima geração, segmentação), backup (imutável, off-site) e detecção comportamental.',
      },
      {
        type: 'h2',
        content: 'As medidas que mais reduzem o risco',
      },
      {
        type: 'h3',
        content: 'Autenticação multifator (MFA) em todos os acessos remotos',
      },
      {
        type: 'paragraph',
        content: 'O vetor mais comum de entrada é credencial comprometida em acesso remoto (VPN, RDP, Microsoft 365). MFA elimina o problema mesmo quando a senha é roubada. É a medida com melhor custo-benefício — e das mais negligenciadas.',
      },
      {
        type: 'h3',
        content: 'Backup imutável off-site com teste de restauração',
      },
      {
        type: 'paragraph',
        content: 'Backup é o plano B quando tudo mais falha. Para ser efetivo contra ransomware, precisa ser imutável (não pode ser alterado pelo ransomware), off-site (fora da rede comprometida) e testado regularmente (backup sem teste de restauração é esperança, não garantia).',
      },
      {
        type: 'h3',
        content: 'EDR (Endpoint Detection & Response) em substituição ao antivírus tradicional',
      },
      {
        type: 'paragraph',
        content: 'EDR monitora comportamento dos processos em tempo real — detecta padrões de ataque mesmo sem assinatura conhecida. Soluções como Bitdefender GravityZone, CrowdStrike ou SentinelOne substituem o antivírus convencional com proteção efetivamente superior.',
      },
      {
        type: 'h3',
        content: 'Segmentação de rede',
      },
      {
        type: 'paragraph',
        content: 'Se o ransomware entra por um notebook, a segmentação de rede impede que ele se espalhe para servidores e outros dispositivos. Uma rede plana (sem segmentação) permite movimento lateral irrestrito.',
      },
      {
        type: 'h2',
        content: 'O custo de não se preparar',
      },
      {
        type: 'paragraph',
        content: 'Para uma PME com 50 funcionários, um ataque de ransomware pode custar entre R$ 200 mil e R$ 2 milhões considerando: paralisação das operações, horas de TI para recuperação, perda de dados irrecuperáveis, danos de reputação e, eventualmente, o resgate.',
      },
      {
        type: 'paragraph',
        content: 'Uma estratégia de segurança adequada para uma empresa desse porte custa uma fração desse valor por ano. O assessment é o primeiro passo — entender onde estão as lacunas antes que um ataque as encontre.',
      },
    ],
  },
  {
    slug: 'suporte-ti-terceirizado-vs-departamento-interno',
    title: 'Suporte de TI terceirizado vs equipe interna: o que faz sentido para sua empresa',
    description:
      'Contratar um MSP (provedor de serviços gerenciados) ou montar uma equipe de TI interna? A resposta depende do tamanho da empresa, da criticidade dos sistemas e do que realmente está em jogo. Uma análise objetiva.',
    publishedAt: '2026-05-12',
    category: 'Suporte Gerenciado',
    readingTime: 7,
    keywords: ['suporte TI terceirizado', 'MSP brasil', 'terceirização TI', 'provedor serviços gerenciados', 'helpdesk terceirizado'],
    sections: [
      {
        type: 'paragraph',
        content: 'A decisão entre terceirizar o suporte de TI ou montar uma equipe interna é uma das mais frequentes — e mal calculadas — nas empresas de pequeno e médio porte. O erro mais comum é fazer a comparação errada: salário de um analista vs. mensalidade do MSP.',
      },
      {
        type: 'paragraph',
        content: 'A comparação correta é custo total de uma equipe interna capaz vs. custo de um MSP com escopo equivalente. Quando feita corretamente, os números raramente favorecem a equipe interna para empresas com até 150 funcionários.',
      },
      {
        type: 'h2',
        content: 'O custo real de uma equipe de TI interna',
      },
      {
        type: 'paragraph',
        content: 'Um analista de suporte pleno em São Paulo ou interior de SP custa entre R$ 4.500 e R$ 7.000 de salário. Mas o custo total de um funcionário CLT é aproximadamente 70-80% acima do salário bruto quando somados encargos (FGTS, INSS, férias, 13º, vale-transporte, plano de saúde).',
      },
      {
        type: 'list',
        items: [
          'Salário: R$ 5.000 → Custo total CLT: R$ 8.500 a R$ 9.000/mês',
          'Ferramentas de gestão e monitoramento: R$ 500 a R$ 2.000/mês',
          'Licenças de segurança (antivírus/EDR corporativo): R$ 300 a R$ 1.500/mês',
          'Treinamento e certificações: R$ 500 a R$ 1.000/mês (amortizado)',
          'Cobertura de férias e doenças: custo adicional ou lacuna de cobertura',
          'Total estimado para 1 analista: R$ 10.000 a R$ 14.000/mês',
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        content: 'Um único analista de TI não cobre múltiplas especialidades. Problemas complexos de rede, segurança, cloud e servidores geralmente requerem perfis diferentes — que um MSP oferece como parte do pacote.',
      },
      {
        type: 'h2',
        content: 'O que um MSP oferece que uma equipe interna dificilmente oferece',
      },
      {
        type: 'list',
        items: [
          'Equipe multi-especializada: suporte de rede, cloud, segurança, backup e servidores em um único contrato',
          'Monitoramento 24/7 com alertas proativos — problemas identificados antes de virar incidente',
          'Cobertura sem lacunas: férias, doenças e desligamentos de funcionários não afetam o serviço',
          'Ferramentas enterprise incluídas: RMM, PSA, EDR, backup — custo diluído entre clientes',
          'Atualizações e patches gerenciados: conformidade de segurança sem demanda de tempo interno',
          'SLA definido em contrato: tempo de resposta e resolução com penalidades claras',
        ],
      },
      {
        type: 'h2',
        content: 'Quando a equipe interna faz mais sentido',
      },
      {
        type: 'paragraph',
        content: 'Para empresas acima de 200-300 funcionários, com infraestrutura complexa e demanda de TI alta e constante, uma equipe interna começa a fazer sentido — especialmente se complementada por um MSP para funções especializadas (segurança, cloud, backup).',
      },
      {
        type: 'list',
        items: [
          'Alta demanda de suporte presencial e constante (linha de produção industrial com muitos dispositivos)',
          'Sistemas proprietários que exigem expertise interna muito específica',
          'Regulatório que exige TI interna (raros setores no Brasil)',
          'Empresas com mais de 300 funcionários onde a diluição do custo CLT começa a compensar',
        ],
      },
      {
        type: 'h2',
        content: 'O modelo híbrido: equipe interna + MSP',
      },
      {
        type: 'paragraph',
        content: 'Para empresas entre 100 e 300 funcionários, o modelo mais eficiente costuma ser um analista de TI interno para suporte presencial e demandas do dia-a-dia, complementado por um MSP responsável por monitoramento, segurança, backup e projetos complexos.',
      },
      {
        type: 'paragraph',
        content: 'Esse modelo combina o conhecimento do negócio que um funcionário interno adquire com a profundidade técnica e cobertura que um MSP oferece. O custo total é significativamente menor do que montar uma equipe interna completa.',
      },
      {
        type: 'h2',
        content: 'Como avaliar',
      },
      {
        type: 'paragraph',
        content: 'A avaliação começa pelo inventário: quantos usuários, quantos dispositivos, quais sistemas críticos, qual o nível de demanda de suporte, quais são os maiores problemas de TI hoje. A JPX Digital realiza esse diagnóstico sem custo para empresas que estão avaliando a terceirização.',
      },
    ],
  },
  {
    slug: 'microsoft-azure-pequenas-medias-empresas-brasil',
    title: 'Azure para PMEs: o Que Vale a Pena Contratar (e o Que Está Inflando Sua Fatura)',
    description:
      'O Azure tem centenas de serviços. Para uma empresa de 20 a 200 funcionários no Brasil, a maioria não é relevante. Este guia foca no que agrega valor real para PMEs — e no que evitar para não explodir o custo.',
    publishedAt: '2026-05-05',
    category: 'Cloud Computing',
    readingTime: 7,
    keywords: ['microsoft azure PME brasil', 'azure pequenas empresas', 'azure vs aws PME', 'cloud computing brasil PME'],
    sections: [
      {
        type: 'paragraph',
        content: 'O Microsoft Azure é a segunda maior cloud pública do mundo e tem crescimento acelerado no Brasil — em parte pela integração natural com Microsoft 365, que já é a suite de produtividade padrão para a maioria das PMEs brasileiras.',
      },
      {
        type: 'paragraph',
        content: 'O problema: o catálogo do Azure tem mais de 200 serviços. Para uma PME, navegar nesse catálogo sem orientação resulta em projetos superfaturados ou mal dimensionados.',
      },
      {
        type: 'h2',
        content: 'Por que o Azure faz sentido para quem já usa Microsoft 365',
      },
      {
        type: 'paragraph',
        content: 'Integração é o principal argumento. Azure Active Directory (agora Entra ID) é a mesma identidade do Microsoft 365 — usuários, grupos e políticas de acesso são gerenciados em um único lugar. Se a empresa já paga por Microsoft 365 Business Premium, parte da licença do Azure AD P1 já está incluída.',
      },
      {
        type: 'list',
        items: [
          'Single Sign-On (SSO): um login para Microsoft 365, Azure e aplicações SaaS integradas',
          'Conditional Access: políticas de acesso que exigem MFA, dispositivo gerenciado ou localização específica',
          'Intune (MDM): gerenciamento de notebooks e celulares corporativos incluído no M365 Business Premium',
          'Microsoft Defender for Business: segurança de endpoint integrada ao Microsoft 365',
        ],
      },
      {
        type: 'h2',
        content: 'Serviços Azure que agregam valor real para PMEs',
      },
      {
        type: 'h3',
        content: 'Azure Virtual Machines — servidores na nuvem',
      },
      {
        type: 'paragraph',
        content: 'Substituir servidores físicos no escritório por VMs no Azure elimina custos de hardware, licença de datacenter e manutenção. O dimensionamento é flexível: uma VM B2s (2 vCPUs, 4 GB RAM) custa aproximadamente R$ 250/mês na região Brazil South. Para servidores de aplicação leve, é competitivo.',
      },
      {
        type: 'h3',
        content: 'Azure Backup — backup gerenciado',
      },
      {
        type: 'paragraph',
        content: 'Para empresas que já têm VMs no Azure, o Azure Backup é a opção mais simples para backup gerenciado com retenção configurável. O custo é baseado no volume de dados protegidos — para 100 GB de dados com 30 dias de retenção, a custo é de aproximadamente R$ 50 a R$ 100/mês.',
      },
      {
        type: 'h3',
        content: 'Azure Files — armazenamento de arquivos compartilhados',
      },
      {
        type: 'paragraph',
        content: 'Substituir um file server físico por Azure Files oferece acesso de qualquer lugar, sincronização com o Windows Explorer (como se fosse uma pasta local) e integração com o Active Directory. Para escritórios com trabalho híbrido, elimina a necessidade de VPN para acessar arquivos.',
      },
      {
        type: 'h2',
        content: 'O que evitar para não explodir o custo',
      },
      {
        type: 'callout',
        variant: 'warning',
        content: 'O maior risco no Azure para PMEs é o "custo surpresa" — recursos criados e esquecidos, VMs oversized, ou serviços premium desnecessários. Sem monitoramento de custos configurado, a fatura pode triplicar em um mês.',
      },
      {
        type: 'list',
        items: [
          'VMs superdimensionadas: começar com o menor tamanho adequado e escalar se necessário',
          'Discos Premium SSD onde Standard é suficiente: diferença de custo de 3x sem ganho de performance perceptível para arquivos de escritório',
          'Transferência de dados (egress): o Azure cobra por saída de dados da nuvem — planejar a arquitetura para minimizar egress',
          'Recursos não utilizados: VMs desligadas ainda cobram pelo disco. Deletar, não apenas desligar.',
          'Alertas de orçamento: configurar Azure Cost Management com alertas por e-mail quando o gasto passa de um limite',
        ],
      },
      {
        type: 'h2',
        content: 'Azure vs AWS para PMEs brasileiras',
      },
      {
        type: 'paragraph',
        content: 'Para PMEs que já usam Microsoft 365, o Azure é naturalmente a primeira opção — a integração de identidade (Entra ID) e as licenças incluídas fazem diferença real. Para empresas que não têm ecossistema Microsoft consolidado, a AWS pode ser mais competitiva em preço de compute e tem um ecossistema de parceiros maior no Brasil.',
      },
      {
        type: 'paragraph',
        content: 'A decisão raramente é binária. Um assessment de 2 semanas para entender o workload e o ecossistema existente produz uma recomendação mais sólida do que escolher pela familiaridade da equipe.',
      },
    ],
  },
  {
    slug: 'firewall-corporativo-o-que-e-por-que-sua-empresa-precisa',
    title: 'Roteador no Escritório Não é Firewall: a Diferença que Pode Custar Caro',
    description:
      'Muitas PMEs confundem roteador com firewall — e pagam caro por isso. Entenda o que um firewall corporativo faz, quais as opções disponíveis no Brasil e quando investir em um NGFW (Next-Generation Firewall).',
    publishedAt: '2026-04-28',
    category: 'Segurança Cibernética',
    readingTime: 6,
    keywords: ['firewall corporativo', 'NGFW brasil', 'firewall para empresas', 'segurança de rede PME', 'firewall fortinet sophos'],
    sections: [
      {
        type: 'paragraph',
        content: 'O firewall é a primeira linha de defesa da rede corporativa. Mas há uma diferença fundamental entre o firewall básico de um roteador doméstico (ou UTM de entrada) e um NGFW (Next-Generation Firewall) corporativo.',
      },
      {
        type: 'paragraph',
        content: 'A confusão é comum: muitas PMEs compram um roteador com "firewall incluído" e acreditam que estão protegidas. O problema está no que esse firewall não faz.',
      },
      {
        type: 'h2',
        content: 'O que um firewall básico faz — e não faz',
      },
      {
        type: 'paragraph',
        content: 'Um firewall básico (packet filter) verifica endereços IP e portas: bloqueia a porta 23 (Telnet), abre a 443 (HTTPS), permite tráfego de IPs específicos. Isso resolve ameaças simples de 2005.',
      },
      {
        type: 'paragraph',
        content: 'O problema: 90% do tráfego malicioso moderno usa a porta 443 (HTTPS) — a mesma porta do tráfego legítimo. Um firewall de pacotes não consegue inspecionar o conteúdo do tráfego criptografado. Para ele, tráfego de ransomware e tráfego do Google parecem iguais.',
      },
      {
        type: 'h2',
        content: 'O que um NGFW (Next-Generation Firewall) faz diferente',
      },
      {
        type: 'list',
        items: [
          'Deep Packet Inspection (DPI): inspeciona o conteúdo do pacote, não apenas cabeçalhos — detecta malware mesmo em tráfego HTTPS',
          'IPS/IDS integrado: bloqueia ataques conhecidos em tempo real com base em assinaturas atualizadas',
          'Controle de aplicação: identifica e controla o uso de aplicações (WhatsApp Web, YouTube, torrents) independente da porta',
          'Filtro de URL por categorias: bloqueia acesso a categorias de sites (redes sociais, gambling, malware known) por política',
          'Inspeção SSL/TLS: descriptografa e inspeciona tráfego HTTPS — onde 90% dos ataques modernos se escondem',
          'Visibilidade: relatórios de quem acessa o quê, quando, quanto tráfego — base para tomada de decisão',
        ],
      },
      {
        type: 'h2',
        content: 'Principais fabricantes disponíveis no Brasil',
      },
      {
        type: 'h3',
        content: 'Fortinet FortiGate',
      },
      {
        type: 'paragraph',
        content: 'Líder de mercado global e com forte presença no Brasil. Excelente custo-benefício, especialmente para PMEs. O FortiGate 40F ou 60F atendem ambientes de 20 a 150 usuários. Possui o FortiGuard — serviço de inteligência de ameaças atualizado em tempo real.',
      },
      {
        type: 'h3',
        content: 'Sophos XG/XGS',
      },
      {
        type: 'paragraph',
        content: 'Interface intuitiva e fácil de gerenciar. Ideal para empresas com equipe de TI pequena que precisa de visibilidade sem complexidade excessiva. O Sophos Central permite gerenciar firewall, endpoints e e-mail security em um único painel.',
      },
      {
        type: 'h3',
        content: 'Cisco Meraki MX',
      },
      {
        type: 'paragraph',
        content: 'Gerenciamento 100% em cloud — nenhuma configuração on-premise. Ideal para empresas com múltiplas filiais que precisam de gerenciamento centralizado. Custo de licenciamento mais alto, mas facilidade operacional superior.',
      },
      {
        type: 'h2',
        content: 'Quanto custa um firewall corporativo',
      },
      {
        type: 'list',
        items: [
          'Hardware (FortiGate 40F ou equivalente, 20-50 usuários): R$ 4.000 a R$ 8.000',
          'Licença anual de serviços (IPS, antivírus, filtro de URL): R$ 2.000 a R$ 4.000/ano',
          'Implementação e configuração: R$ 2.000 a R$ 5.000 (único)',
          'Total primeiro ano para 20-50 usuários: R$ 8.000 a R$ 17.000',
          'Anos seguintes: R$ 2.000 a R$ 4.000/ano (renovação de licença)',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        content: 'Um bom firewall corporativo amortizado por 3 anos custa cerca de R$ 300 a R$ 500/mês para 50 usuários. Comparado ao custo de uma única hora de resposta a incidente de segurança (mínimo R$ 10.000), o ROI é claro.',
      },
      {
        type: 'h2',
        content: 'VPN integrada ao firewall',
      },
      {
        type: 'paragraph',
        content: 'Todos os NGFWs corporativos incluem VPN. Para empresas com trabalho remoto ou múltiplas filiais, a VPN site-to-site (entre filiais) e o client VPN (para home office) são funcionalidades essenciais que o firewall corporativo oferece nativamente — sem custo adicional de solução separada.',
      },
    ],
  },
  {
    slug: 'migracao-para-nuvem-planejamento-armadilhas',
    title: 'Migração para a nuvem: planejamento, fases e armadilhas que ninguém conta antes',
    description:
      'Migrar para cloud não é só "subir tudo para AWS ou Azure". As migrações mal planejadas resultam em custo 3x maior do que o on-premise. Entenda como planejar corretamente — da análise ao go-live.',
    publishedAt: '2026-04-15',
    category: 'Cloud Computing',
    readingTime: 9,
    keywords: ['migração para nuvem', 'cloud migration brasil', 'migração aws azure', 'lift and shift', 'cloud adoption PME'],
    sections: [
      {
        type: 'paragraph',
        content: '"Vamos migrar para a nuvem" é uma decisão estratégica legítima. O problema é quando ela se transforma em um projeto de TI sem metodologia clara — e o resultado é custo de cloud superior ao que se pagava com servidores físicos.',
      },
      {
        type: 'paragraph',
        content: 'Isso acontece mais do que parece. A causa mais comum: "lift and shift" sem racionalização de workloads. Pegar um servidor físico e replicá-lo como VM na nuvem mantém todos os problemas do on-premise e adiciona o custo da nuvem.',
      },
      {
        type: 'h2',
        content: 'Os 5 Rs da migração para cloud',
      },
      {
        type: 'paragraph',
        content: 'Cada sistema tem uma estratégia de migração diferente. O framework "5 Rs" é o padrão de mercado para classificar workloads:',
      },
      {
        type: 'list',
        items: [
          'Retire (Aposentar): sistemas obsoletos que ninguém usa há anos — migração de dados, descomissionamento',
          'Retain (Manter on-premise): sistemas com dependência de hardware específico, latência crítica, ou custo de migração maior que o benefício',
          'Rehost (Lift and Shift): migrar como está para VM na cloud — rápido, sem otimização. Faz sentido para sistemas que serão modernizados depois',
          'Replatform (Mover e otimizar): mudar para um serviço gerenciado equivalente. Ex: SQL Server físico → Azure SQL Managed Instance',
          'Refactor/Re-architect: reescrever parcialmente para aproveitar recursos nativos de cloud. Alto esforço, maior benefício a longo prazo',
        ],
      },
      {
        type: 'h2',
        content: 'As armadilhas mais comuns',
      },
      {
        type: 'h3',
        content: '1. Subdimensionar a análise inicial',
      },
      {
        type: 'paragraph',
        content: 'Migrar sem inventário completo resulta em surpresas. Quantos sistemas existem? Quais têm dependências entre si? Quais bancos de dados? Qual o volume de dados? Qual a latência atual aceitável? Sem essas respostas, o projeto não tem base sólida.',
      },
      {
        type: 'h3',
        content: '2. Ignorar o custo de egress',
      },
      {
        type: 'paragraph',
        content: 'AWS, Azure e Google cobram por saída de dados da nuvem (egress). Se o workload tem alto volume de saída — relatórios grandes, vídeos, backups para on-premise — esse custo pode surpreender. A OCI oferece egress gratuito até 10 TB/mês, o que pode mudar a equação para workloads específicos.',
      },
      {
        type: 'h3',
        content: '3. Licensing em nuvem é diferente',
      },
      {
        type: 'paragraph',
        content: 'Windows Server e SQL Server na nuvem têm modelos de licenciamento específicos. Usar uma VM Windows sem a licença correta ou sem ativar o benefício do Azure Hybrid (se tiver licenças on-premise) resulta em custo desnecessário. Para Oracle Database, a situação é ainda mais crítica.',
      },
      {
        type: 'h3',
        content: '4. Não planejar a conectividade',
      },
      {
        type: 'paragraph',
        content: 'Sistemas migrados para cloud que precisam se comunicar com sistemas que ficaram on-premise precisam de conectividade confiável. VPN site-to-site ou ExpressRoute/Direct Connect devem ser planejados antes da migração, não depois.',
      },
      {
        type: 'h2',
        content: 'As fases de uma migração bem executada',
      },
      {
        type: 'list',
        items: [
          'Fase 1 — Discovery e Assessment (2 a 4 semanas): inventário completo, classificação dos 5 Rs, estimativa de TCO comparativo',
          'Fase 2 — Fundação (2 a 4 semanas): rede (VPC/VNet), identidade (IAM/Entra ID), segurança base, monitoramento de custos',
          'Fase 3 — Migração em ondas (4 a 16 semanas): sistemas de menor criticidade primeiro, validação, ajuste de desempenho',
          'Fase 4 — Otimização (ongoing): rightsizing de instâncias, reserved instances, políticas de desligamento automático',
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        content: 'Migrações apressadas custam mais no longo prazo. Uma fase de discovery bem feita — que parece "perda de tempo" — é o que separa projetos que reduzem custo dos que triplicam.',
      },
      {
        type: 'h2',
        content: 'Por onde começar',
      },
      {
        type: 'paragraph',
        content: 'O ponto de partida é sempre o assessment. Antes de contratar qualquer cloud ou definir qual provedor, é necessário entender o que existe, o que pode ser aposentado, e o que o TCO real de cada opção parece ser para o seu caso específico.',
      },
      {
        type: 'paragraph',
        content: 'A JPX Digital realiza esse assessment de forma independente — sem vínculo comercial com nenhum provedor de cloud específico. A recomendação é sempre baseada no que faz sentido para o workload e o orçamento do cliente.',
      },
    ],
  },
  {
    slug: 'lgpd-escritorios-advocacia-obrigacoes-ti',
    title: 'LGPD para escritórios de advocacia: obrigações práticas de TI que poucos implementam',
    description:
      'Escritórios de advocacia tratam dados pessoais sensíveis de clientes todos os dias. A LGPD impõe obrigações concretas — e a maioria dos escritórios ainda não implementou. Saiba o que é exigido e como se adequar.',
    publishedAt: '2026-04-08',
    category: 'Advocacia & Tecnologia',
    readingTime: 8,
    keywords: ['LGPD advocacia', 'LGPD escritório advocacia', 'proteção dados escritório', 'TI para advocacia', 'segurança dados juridico'],
    sections: [
      {
        type: 'paragraph',
        content: 'Escritórios de advocacia estão entre os maiores processadores de dados pessoais sensíveis do Brasil. Processos trabalhistas, inventários, disputas médicas, contratos — tudo envolve dados de pessoas físicas que a LGPD protege.',
      },
      {
        type: 'paragraph',
        content: 'A ironia: muitos escritórios que assessoram clientes sobre LGPD ainda não implementaram as medidas básicas exigidas pela lei em sua própria infraestrutura.',
      },
      {
        type: 'h2',
        content: 'O que a LGPD exige de escritórios de advocacia',
      },
      {
        type: 'callout',
        variant: 'warning',
        content: 'O sigilo profissional garantido pela OAB não substitui as obrigações da LGPD. São regimes jurídicos diferentes. Um incidente de segurança que exponha dados de clientes pode gerar responsabilização tanto perante a OAB quanto perante a ANPD.',
      },
      {
        type: 'list',
        items: [
          'Mapeamento de dados (RIPD): documentar quais dados pessoais são tratados, para qual finalidade, por quanto tempo e com qual base legal',
          'Controles de acesso: apenas advogados e auxiliares que precisam do dado devem ter acesso — não compartilhar senhas, não acesso irrestrito ao servidor',
          'Criptografia em repouso e em trânsito: documentos de clientes em nuvem ou servidor devem ser criptografados',
          'Registro de acessos: log de quem acessou quais documentos e quando',
          'Notificação de incidente: em caso de vazamento ou acesso não autorizado, a ANPD deve ser notificada em até 72 horas',
          'DPO (Encarregado): escritórios que tratam dados sensíveis em grande escala devem nomear um DPO',
          'Contratos com fornecedores: cláusulas de proteção de dados com qualquer terceiro que processe dados do escritório (cloud, sistema de gestão, contabilidade)',
        ],
      },
      {
        type: 'h2',
        content: 'As 5 vulnerabilidades mais comuns em escritórios de advocacia',
      },
      {
        type: 'h3',
        content: '1. E-mail como repositório principal de documentos',
      },
      {
        type: 'paragraph',
        content: 'Escritórios que enviam e recebem documentos por e-mail e os mantêm apenas ali têm um problema sério: sem criptografia de ponta-a-ponta, os documentos transitam em texto claro. Além disso, o e-mail não tem controle de acesso granular — quem tem acesso à caixa do advogado tem acesso a tudo.',
      },
      {
        type: 'h3',
        content: '2. Compartilhamento de senhas entre colaboradores',
      },
      {
        type: 'paragraph',
        content: 'Prática comum em escritórios menores. Impossibilita rastrear quem acessou o quê — requisito básico da LGPD. A solução é uma senha por usuário + controle de acesso por perfil no sistema de gestão.',
      },
      {
        type: 'h3',
        content: '3. Backup inadequado de documentos',
      },
      {
        type: 'paragraph',
        content: 'Perder documentos de processo por falha de HD ou ataque ransomware pode significar perda de prazos processuais e responsabilização por negligência. A LGPD exige medidas de segurança adequadas — backup regular e testado é parte disso.',
      },
      {
        type: 'h3',
        content: '4. Acesso remoto sem VPN ou MFA',
      },
      {
        type: 'paragraph',
        content: 'Advogados que acessam o servidor do escritório pelo computador de casa usando apenas senha estão criando um vetor de ataque. Credenciais roubadas por malware no computador pessoal dão acesso total à infraestrutura do escritório.',
      },
      {
        type: 'h3',
        content: '5. Ausência de política de saída de colaboradores',
      },
      {
        type: 'paragraph',
        content: 'Quando um advogado ou auxiliar sai do escritório, suas credenciais são revogadas imediatamente? Acesso aos sistemas, e-mail e compartilhamentos de arquivo é bloqueado no mesmo dia? Muitos escritórios não têm esse processo formalizado.',
      },
      {
        type: 'h2',
        content: 'Como adequar o escritório em etapas práticas',
      },
      {
        type: 'list',
        items: [
          'Semana 1: inventário de dados — mapear onde ficam os dados de clientes (e-mails, servidor, nuvem, pen drives)',
          'Semana 2 a 4: implementar controle de acesso individual — senha por usuário, sem compartilhamento',
          'Mês 2: backup estruturado com retenção de 5 anos para documentos de processo',
          'Mês 2 a 3: MFA no Microsoft 365 e VPN para acesso remoto ao servidor',
          'Mês 3 a 4: política de saída de colaboradores formalizada e treinamento de equipe',
          'Mês 4 a 6: mapeamento RIPD e revisão de contratos com fornecedores',
        ],
      },
      {
        type: 'paragraph',
        content: 'A JPX Digital tem experiência na implementação dos controles técnicos para adequação à LGPD em escritórios de advocacia no interior de São Paulo. O diagnóstico inicial é gratuito.',
      },
    ],
  },
  {
    slug: 'business-continuity-vs-disaster-recovery-diferenca',
    title: 'Business Continuity vs Disaster Recovery: a diferença que poucos gestores entendem',
    description:
      'BCP e DR são frequentemente usados como sinônimos. Não são. Entender a diferença muda a forma como sua empresa se prepara para incidentes — e determina se você consegue operar durante uma crise ou só depois que ela passa.',
    publishedAt: '2026-03-30',
    category: 'Backup & Continuidade',
    readingTime: 6,
    keywords: ['business continuity plan', 'disaster recovery diferença', 'BCP vs DR', 'plano de continuidade negócios', 'continuidade operacional'],
    sections: [
      {
        type: 'paragraph',
        content: 'Disaster Recovery (DR) e Business Continuity Plan (BCP) são frequentemente tratados como sinônimos. São, na verdade, disciplinas complementares com objetivos diferentes — e confundi-las resulta em empresas que "têm DR" mas param completamente quando um incidente real acontece.',
      },
      {
        type: 'h2',
        content: 'Disaster Recovery: restaurar a TI',
      },
      {
        type: 'paragraph',
        content: 'DR é focado em TI. Responde a uma pergunta específica: se nossos sistemas de TI pararem agora, como e em quanto tempo conseguimos restaurá-los?',
      },
      {
        type: 'paragraph',
        content: 'Os dois parâmetros fundamentais do DR são o RTO (Recovery Time Objective) — tempo máximo para restaurar o sistema — e o RPO (Recovery Point Objective) — perda máxima de dados aceitável. Um bom plano de DR define RTO e RPO para cada sistema crítico e garante, com backup e processos documentados, que esses objetivos são alcançáveis.',
      },
      {
        type: 'callout',
        variant: 'info',
        content: 'Um plano de DR não testado não é um plano — é uma hipótese. O teste de DR revela dependências ocultas, documentação desatualizada e processos que funcionam no papel mas não na prática.',
      },
      {
        type: 'h2',
        content: 'Business Continuity: manter o negócio operando',
      },
      {
        type: 'paragraph',
        content: 'BCP é mais amplo. Responde a uma pergunta diferente: se qualquer coisa crítica parar — TI, fornecedores, prédio, pessoal-chave — como a empresa mantém suas operações essenciais durante o período de recuperação?',
      },
      {
        type: 'paragraph',
        content: 'O BCP inclui o DR como componente, mas vai além: cobre comunicação de crise, cadeia de suprimentos alternativa, operação em local alternativo, processos manuais para quando os sistemas estão fora, e planos de comunicação com clientes e fornecedores.',
      },
      {
        type: 'h2',
        content: 'Por que ter DR sem BCP deixa lacunas perigosas',
      },
      {
        type: 'list',
        items: [
          'DR restaura o sistema ERP em 4 horas — mas os funcionários não sabem como operar durante essas 4 horas sem o sistema',
          'DR recupera os dados — mas não define quem comunica os clientes sobre o atraso e o que dizer',
          'DR tem processo para falha técnica — mas não para incêndio no escritório, enchente ou pandemia',
          'DR protege os dados — mas não garante que os processos críticos continuam, mesmo degradados, enquanto a TI é restaurada',
        ],
      },
      {
        type: 'h2',
        content: 'Os componentes de um BCP completo',
      },
      {
        type: 'h3',
        content: 'Análise de Impacto nos Negócios (BIA)',
      },
      {
        type: 'paragraph',
        content: 'O BIA identifica quais processos de negócio são críticos e qual o impacto financeiro e operacional de cada hora de interrupção. É a base do BCP — sem ela, o plano protege o que parece importante, não o que é importante.',
      },
      {
        type: 'h3',
        content: 'Planos de operação degradada',
      },
      {
        type: 'paragraph',
        content: 'Documentação de como cada processo crítico funciona sem os sistemas de TI. Parece óbvio — mas poucos escritórios e empresas têm isso documentado e treinado. Quando o sistema cai e a equipe não sabe o que fazer, a produção para completamente.',
      },
      {
        type: 'h3',
        content: 'Comunicação de crise',
      },
      {
        type: 'paragraph',
        content: 'Quem fala com os clientes? O que dizer? Quando dizer? Quem aciona o plano de DR? Quem tem autoridade para decidir pagar o resgate de ransomware? Essas decisões não devem ser tomadas durante uma crise — devem estar documentadas antes.',
      },
      {
        type: 'h2',
        content: 'Por onde começar',
      },
      {
        type: 'paragraph',
        content: 'Para empresas que não têm nada, a prioridade é o DR: backup correto com RTO e RPO definidos. Isso resolve o risco mais imediato. O BCP é construído sobre a base do DR — não em paralelo.',
      },
      {
        type: 'paragraph',
        content: 'A JPX Digital desenvolve planos de DR e BCP adaptados ao porte e ao setor de cada empresa — sem templates genéricos que ficam na gaveta.',
      },
    ],
  },
  {
    slug: 'virtualizacao-servidores-quando-faz-sentido',
    title: 'Servidor Físico ou VM: o Cálculo que Poucos Fazem Antes de Virtualizar',
    description:
      'Empresas com servidores físicos dedicados a uma aplicação cada desperdiçam 80% da capacidade do hardware. Virtualização resolve isso — mas não é para todo mundo. Entenda os cenários onde compensa.',
    publishedAt: '2026-03-18',
    category: 'Infraestrutura',
    readingTime: 6,
    keywords: ['virtualização de servidores', 'vmware vsphere', 'hyper-v', 'servidor virtual PME', 'virtualização proxmox'],
    sections: [
      {
        type: 'paragraph',
        content: 'Uma empresa com 5 servidores físicos — ERP, e-mail, file server, AD e backup — onde cada servidor usa em média 15% da CPU e 20% da RAM, está pagando para refrigerar e manter hardware que fica 80% ocioso.',
      },
      {
        type: 'paragraph',
        content: 'Virtualização consolida esses workloads em 1 ou 2 servidores físicos mais potentes, rodando múltiplas VMs. O resultado: redução de hardware, energia, espaço físico e complexidade operacional.',
      },
      {
        type: 'h2',
        content: 'O que a virtualização oferece além da consolidação',
      },
      {
        type: 'list',
        items: [
          'Snapshots: "fotografar" o estado da VM antes de uma atualização — se algo der errado, reverter em minutos',
          'Alta disponibilidade (HA): se um servidor físico falhar, as VMs migram automaticamente para outro servidor do cluster',
          'Live Migration: migrar VMs entre hosts físicos sem desligar, para manutenção de hardware sem downtime',
          'Backup simplificado: backup em nível de VM captura o sistema inteiro, incluindo OS e dados, em um único processo',
          'Testes isolados: criar VMs de teste idênticas à produção sem impacto no ambiente real',
        ],
      },
      {
        type: 'h2',
        content: 'As principais plataformas de virtualização',
      },
      {
        type: 'h3',
        content: 'VMware vSphere/ESXi',
      },
      {
        type: 'paragraph',
        content: 'O padrão de mercado corporativo por décadas. Funcionalidade mais madura, maior ecossistema de suporte e integrações. Atenção: desde a aquisição pela Broadcom em 2023, o modelo de licenciamento mudou significativamente — o custo para PMEs aumentou substancialmente.',
      },
      {
        type: 'h3',
        content: 'Microsoft Hyper-V',
      },
      {
        type: 'paragraph',
        content: 'Incluído no Windows Server. Para empresas já no ecossistema Microsoft, é a opção de menor custo adicional. Funcionalidade adequada para a maioria das PMEs. Gerenciamento via Windows Admin Center é acessível para equipes sem expertise VMware.',
      },
      {
        type: 'h3',
        content: 'Proxmox VE',
      },
      {
        type: 'paragraph',
        content: 'Open source, gratuito. Cresceu muito no pós-Broadcom como alternativa ao VMware. Interface web completa, suporte a KVM e containers LXC, cluster nativo. Para equipes técnicas confortáveis com Linux, é uma opção sólida sem custo de licença.',
      },
      {
        type: 'h2',
        content: 'Quando virtualização não faz sentido',
      },
      {
        type: 'list',
        items: [
          'Empresa com 1 a 2 servidores — a consolidação não justifica o investimento em nova infraestrutura',
          'Workloads com alta demanda de I/O de disco (banco de dados OLTP intenso) — virtualização adiciona latência que pode ser problemática',
          'Sistemas legados que exigem hardware específico — alguns sistemas antigos não funcionam em VM',
          'Quando o próximo passo é cloud — investir em virtualização on-premise meses antes de migrar para cloud é desperdício',
        ],
      },
      {
        type: 'h2',
        content: 'Virtualização on-premise vs cloud',
      },
      {
        type: 'paragraph',
        content: 'Virtualização on-premise faz sentido quando: há hardware relativamente novo que pode ser consolidado, a empresa tem demandas de latência que cloud não atende, ou há restrições regulatórias para dados em cloud. Para a maioria das novas implementações, avaliar cloud (mesmo que apenas para alguns workloads) é parte do processo de decisão.',
      },
      {
        type: 'paragraph',
        content: 'A JPX Digital faz o assessment e auxilia na decisão — virtualização on-premise, cloud, ou modelo híbrido — baseado na realidade da infraestrutura e do negócio.',
      },
    ],
  },
  {
    slug: 'automacao-processos-n8n-o-que-pmes-podem-fazer-hoje',
    title: 'Como PMEs Estão Automatizando sem Contratar Desenvolvedor',
    description:
      'n8n é uma plataforma de automação open source que conecta sistemas e automatiza processos repetitivos. Para PMEs sem equipe de desenvolvimento, pode substituir integrações caras e horas de trabalho manual. Veja casos reais.',
    publishedAt: '2026-03-05',
    category: 'Automação',
    readingTime: 7,
    keywords: ['automação processos n8n', 'n8n brasil', 'automação PME', 'workflow automation', 'zapier alternativa gratuita'],
    sections: [
      {
        type: 'paragraph',
        content: 'Zapier custa R$ 500 a R$ 2.000 por mês para volumes de automação relevantes. Make (ex-Integromat) tem modelos similares. Para PMEs que precisam de automação mas não de uma licença SaaS cara, o n8n é a alternativa mais poderosa disponível.',
      },
      {
        type: 'paragraph',
        content: 'n8n é open source e pode ser hospedado em qualquer servidor — o custo é o do servidor, não da licença. Com auto-hospedagem, as automações são ilimitadas.',
      },
      {
        type: 'h2',
        content: 'O que o n8n faz',
      },
      {
        type: 'paragraph',
        content: 'n8n é um orquestrador de workflows. Ele conecta APIs, bancos de dados, planilhas, e-mails, WhatsApp e centenas de serviços SaaS — e define o que acontece quando um evento ocorre. É visual: o workflow é construído como um fluxograma de nós conectados.',
      },
      {
        type: 'list',
        items: [
          'Gatilhos: novo lead no CRM, formulário enviado, e-mail recebido, webhook de qualquer sistema, agendamento por horário',
          'Ações: enviar e-mail, enviar mensagem WhatsApp, criar registro no CRM, atualizar planilha, gerar PDF, notificar Slack',
          'Lógica: condicionais (if/else), loops, transformação de dados com código JavaScript opcional',
          'Mais de 400 integrações nativas: HubSpot, Salesforce, Google Sheets, Notion, Airtable, PostgreSQL, MySQL',
        ],
      },
      {
        type: 'h2',
        content: 'Casos de automação reais para PMEs',
      },
      {
        type: 'h3',
        content: 'Lead nurturing automático',
      },
      {
        type: 'paragraph',
        content: 'Formulário no site → n8n cria contato no HubSpot → envia e-mail de boas-vindas personalizado via Resend → adiciona lead no pipeline comercial → notifica o vendedor responsável via WhatsApp. Todo o processo ocorre em menos de 30 segundos, sem intervenção humana.',
      },
      {
        type: 'h3',
        content: 'Relatórios automáticos',
      },
      {
        type: 'paragraph',
        content: 'Todo segunda-feira às 8h: n8n consulta o banco de dados, consolida os KPIs da semana anterior, gera uma tabela formatada e envia por e-mail para os gestores. Nenhum analista precisa preparar o relatório manualmente.',
      },
      {
        type: 'h3',
        content: 'Alertas de monitoramento de TI',
      },
      {
        type: 'paragraph',
        content: 'Servidor com uso de CPU acima de 90% por mais de 5 minutos → n8n recebe o alerta do sistema de monitoramento → classifica a criticidade → notifica o técnico de plantão via WhatsApp com os detalhes do servidor. Resposta em segundos.',
      },
      {
        type: 'h3',
        content: 'Onboarding de clientes',
      },
      {
        type: 'paragraph',
        content: 'Contrato assinado no sistema → n8n cria o projeto no sistema de gestão → cria as contas de acesso necessárias → envia o e-mail de boas-vindas com credenciais → agenda a reunião de kickoff e notifica o responsável pelo projeto.',
      },
      {
        type: 'h2',
        content: 'n8n vs Zapier: quando usar cada um',
      },
      {
        type: 'list',
        items: [
          'Zapier: ideal para empresas sem equipe técnica que preferem uma solução gerenciada, com suporte e sem preocupação de servidor',
          'n8n self-hosted: ideal para empresas com equipe técnica (ou parceiro MSP), que precisam de automações complexas ou com dados sensíveis que não devem ir para SaaS externo',
          'n8n Cloud: versão gerenciada do n8n, intermediária — sem preocupação de servidor mas com mais flexibilidade que Zapier',
          'Volume: Zapier fica caro acima de 2.000 tarefas/mês. n8n self-hosted tem custo fixo (servidor), independente do volume',
        ],
      },
      {
        type: 'h2',
        content: 'O que é necessário para implementar n8n',
      },
      {
        type: 'paragraph',
        content: 'n8n roda em qualquer servidor Linux com Docker. Um VPS de R$ 60 a R$ 150/mês é suficiente para a maioria das PMEs. A configuração inicial (instalação, SSL, domínio) leva 2 a 4 horas para um técnico experiente.',
      },
      {
        type: 'paragraph',
        content: 'A JPX Digital instala, configura e gerencia o n8n para clientes que precisam de automação — incluindo a criação dos primeiros workflows. O modelo: infraestrutura gerenciada, com os workflows sendo construídos iterativamente com o cliente.',
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug)
}
