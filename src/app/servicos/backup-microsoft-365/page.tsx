import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'backup-microsoft-365'

const faqs = [
  {
    question: 'A Microsoft não faz backup automático dos dados do M365?',
    answer: 'Não — e essa é a confusão mais perigosa. A Microsoft garante a disponibilidade da plataforma M365, não a recuperação dos seus dados. O modelo de responsabilidade compartilhada da Microsoft deixa claro: a proteção dos dados do usuário (e-mails, arquivos, Teams) é responsabilidade da empresa contratante.',
  },
  {
    question: 'Quais itens do M365 são cobertos pelo backup?',
    answer: 'Cobrimos Exchange Online (e-mails, contatos, calendários), SharePoint Online (sites, bibliotecas, listas), OneDrive for Business (arquivos de todos os usuários), Teams (mensagens, arquivos, canais) e Grupos do Microsoft 365. Backup granular — é possível restaurar um único e-mail ou arquivo.',
  },
  {
    question: 'Quanto tempo os dados ficam retidos?',
    answer: 'Configuramos retenção conforme a necessidade do cliente: 30, 90, 180 ou 365 dias. Para ambientes com exigências regulatórias (LGPD, CFM para saúde, regulamentações financeiras), configuramos retenção estendida de até 7 anos.',
  },
  {
    question: 'Consigo recuperar um e-mail deletado há 6 meses?',
    answer: 'Sim, se a retenção configurada for de 180 dias ou mais. O M365 nativo tem retenção de 30 dias para itens deletados (e menos em muitos casos). Com backup independente, você recupera e-mails, pastas e arquivos com granularidade de item individual, no ponto exato que precisa.',
  },
  {
    question: 'O backup do M365 está em conformidade com a LGPD?',
    answer: 'Sim. Os dados de backup são armazenados em servidores no Brasil ou na região que você especificar, com criptografia em trânsito e em repouso. Fornecemos documentação completa do fluxo de dados para fins de compliance e DPO.',
  },
]

export const metadata: Metadata = {
  title: 'Backup Microsoft 365 — E-mail, Teams e SharePoint',
  description:
    'Backup independente do Microsoft 365: e-mails, Teams, SharePoint e OneDrive. Restore granular em minutos. Conformidade LGPD. A Microsoft não faz isso por você.',
  keywords: ['backup microsoft 365', 'backup office 365', 'backup M365', 'backup teams sharepoint', 'backup exchange online'],
  openGraph: {
    title: 'Backup Microsoft 365 | JPX Digital',
    description: 'Backup independente do M365. E-mails, Teams, SharePoint, OneDrive. A Microsoft não faz isso por você.',
    url: `${BASE}/servicos/${slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Continuidade & Segurança',
  heroHeadline: 'Backup Microsoft 365 — A Microsoft Protege a Plataforma. Quem Protege os Seus Dados é Você.',
  heroSub:
    'E-mails deletados, ransomware no SharePoint, saída de colaboradores. O M365 nativo não te salva nesses cenários. Backup independente, sim.',
  intro: [
    'Existe um equívoco perigoso nas empresas: acreditar que a Microsoft faz backup dos dados do Microsoft 365. Na prática, a Microsoft garante a disponibilidade da plataforma — o que é diferente de garantir a recuperação dos seus dados em caso de exclusão acidental, ataque de ransomware, sobreescrita ou saída de um colaborador.',
    'O modelo de responsabilidade compartilhada da Microsoft é explícito: a proteção dos dados do usuário é responsabilidade da empresa. Para Exchange Online, SharePoint, OneDrive, Teams e Grupos M365, o cliente precisa de uma solução de backup independente.',
    'A JPX Digital implanta e gerencia backup completo do Microsoft 365 com granularidade de item — você restaura um único e-mail de 6 meses atrás em minutos, sem precisar abrir chamado na Microsoft.',
  ],
  howTitle: 'Como implantamos o backup M365',
  howSteps: [
    {
      title: 'Inventário completo do ambiente M365',
      desc: 'Mapeamos todas as caixas postais, sites SharePoint, canais Teams, grupos e usuários licenciados. Definimos o escopo de proteção e política de retenção adequada para o seu negócio e setor.',
    },
    {
      title: 'Conexão via API Microsoft Graph',
      desc: 'Utilizamos API nativa Microsoft Graph — sem senhas armazenadas, sem agente instalado nos dispositivos dos usuários. A solução opera com App Registration e permissões mínimas necessárias.',
    },
    {
      title: 'Backup incremental e retenção configurável',
      desc: 'Backups incrementais automáticos com frequência configurável (diário, por hora). Retenção de 30 a 365 dias (ou mais para compliance). Armazenamento no Brasil com criptografia AES-256.',
    },
    {
      title: 'Restore granular e self-service',
      desc: 'Restauramos um e-mail individual, pasta, arquivo, site SharePoint ou canal Teams — sem precisar restaurar tudo. O portal de self-service permite que o administrador faça restores simples sem acionar a JPX Digital.',
    },
  ],
  differentials: [
    {
      title: 'Backup independente da Microsoft',
      desc: 'Se houver um incidente na plataforma M365, seus dados de backup não são afetados. Proteção real, não redundância dependente do mesmo provedor.',
    },
    {
      title: 'Restore granular em minutos',
      desc: 'Recupera um e-mail, arquivo ou mensagem de Teams específico no ponto exato — sem precisar restaurar a caixa postal inteira ou aguardar horas.',
    },
    {
      title: 'Conformidade LGPD e regulatória',
      desc: 'Dados armazenados no Brasil, com documentação completa de fluxo de dados, relatório de auditoria e retenção configurável para exigências setoriais (saúde, financeiro, jurídico).',
    },
    {
      title: 'Cobertura completa: Exchange, Teams, SharePoint, OneDrive',
      desc: 'Não apenas e-mails. Protegemos mensagens de Teams, arquivos do SharePoint, OneDrive de todos os usuários e conteúdo de Grupos M365.',
    },
  ],
  faqs,
  schemas: [
    serviceSchema(
      'Backup Microsoft 365',
      'Backup independente do Microsoft 365 cobrindo Exchange, SharePoint, Teams e OneDrive. Restore granular e conformidade LGPD.',
      'Data Backup Service'
    ),
    breadcrumbSchema([
      { name: 'Home', item: BASE },
      { name: 'Serviços', item: `${BASE}/servicos` },
      { name: 'Backup Microsoft 365', item: `${BASE}/servicos/${slug}` },
    ]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}
