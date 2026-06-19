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
    title: 'Oracle Cloud OCI no Brasil: o que é, como funciona e quando faz sentido',
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
    title: 'Disaster Recovery para Hospitais: exigências reais e como estruturar',
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
        content: 'A JPX Digital tem experiência em infraestrutura para o setor de saúde, incluindo alinhamento com os requisitos do CFM e da LGPD. O assessment inicial é gratuito.',
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
