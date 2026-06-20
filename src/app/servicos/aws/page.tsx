import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'aws'

const faqs = [
  {
    question: 'AWS, Azure ou OCI — como escolher?',
    answer: 'AWS tem o maior catálogo de serviços e é forte em workloads cloud-native, big data e machine learning. Azure é melhor integrado com ecossistema Microsoft. OCI é a melhor opção para cargas Oracle com menor custo de egress. A escolha depende dos seus workloads, equipe e dependências de software. A JPX faz essa análise de forma agnóstica.',
  },
  {
    question: 'O que é AWS Well-Architected Framework?',
    answer: 'É o conjunto de melhores práticas da Amazon para design de ambientes cloud, organizado em 6 pilares: excelência operacional, segurança, confiabilidade, eficiência de performance, otimização de custo e sustentabilidade. A JPX Digital realiza Well-Architected Reviews para identificar gaps em ambientes AWS existentes.',
  },
  {
    question: 'Como evitar surpresas na fatura da AWS?',
    answer: 'Implementamos desde o início: AWS Budgets com alertas, Cost Allocation Tags por projeto/área, análise mensal de rightsizing com Compute Optimizer e uso de Reserved Instances ou Savings Plans para workloads previsíveis. Reduzimos custos AWS em 20-40% na maioria dos ambientes que auditamos.',
  },
  {
    question: 'A JPX Digital implementa segurança em ambientes AWS?',
    answer: 'Sim. Implementamos AWS Security Hub, GuardDuty, CloudTrail, Config e IAM com privilégio mínimo. Configuramos VPCs com segmentação adequada, Security Groups granulares e auditoria de acesso.',
  },
  {
    question: 'É possível usar AWS junto com OCI ou Azure?',
    answer: 'Sim. Arquiteturas multi-cloud são complexas mas viáveis. O desafio é governança unificada de custo e segurança — que resolvemos com ferramentas e processos de gerenciamento multi-cloud.',
  },
]

export const metadata: Metadata = {
  title: 'Consultoria AWS — Amazon Web Services para Empresas',
  description: 'Consultoria AWS: migração, arquitetura, segurança e FinOps em Amazon Web Services. Well-Architected Review e otimização de custos. Assessment gratuito.',
  keywords: ['consultoria AWS', 'amazon web services brasil', 'aws consultoria', 'migração aws', 'aws well-architected'],
  openGraph: { title: 'Consultoria AWS | JPX Digital', description: 'Migração, arquitetura, segurança e FinOps em Amazon Web Services.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content: ServicePageContent = {
  slug,
  category: 'Cloud Computing',
  heroHeadline: 'Consultoria AWS — Amazon Web Services para Infraestrutura Corporativa Escalável e Segura.',
  heroSub: 'Migração, arquitetura Well-Architected, segurança e FinOps em AWS. Sem surpresas na fatura, sem gaps de segurança.',
  ctaLabel: 'Solicitar AWS Well-Architected Review',

  problem: {
    headline: 'AWS não é sinônimo de cloud bem feita. É o benchmark pelo qual todas as outras são avaliadas — mas ambientes mal arquitetados em AWS custam mais e expõem mais.',
    body: [
      'A Amazon Web Services tem o maior catálogo de serviços e o ecossistema mais maduro. Para workloads cloud-native, big data e aplicações que precisam de escalabilidade global, AWS frequentemente é a escolha mais natural.',
      'O problema mais comum em ambientes AWS é a falta de governança desde o início: contas únicas sem separação de ambientes, IAM permissivo, recursos sem tags de custo e nenhuma visibilidade do que está gerando a fatura do mês.',
      'A JPX Digital planeja e executa projetos AWS com foco em segurança, confiabilidade e controle de custo. A maioria dos ambientes AWS que auditamos tem potencial de redução de 20 a 40% nos custos.',
    ],
  },

  assessment: {
    name: 'AWS Well-Architected Review',
    body: 'Avaliamos o ambiente contra os 6 pilares do AWS Well-Architected Framework. Para ambientes novos, usamos o framework como guia de design. Para ambientes existentes, identificamos gaps e priorizamos remediações por risco e impacto — com estimativa de economia.',
    checklist: [
      'Análise dos 6 pilares Well-Architected (operações, segurança, confiabilidade, performance, custo, sustentabilidade)',
      'Auditoria de IAM, políticas e privilégios',
      'Revisão de VPC, Security Groups e exposição de serviços',
      'Análise de custos e identificação de desperdício',
      'Relatório priorizado com plano de remediação',
    ],
  },

  process: {
    title: 'Como estruturamos ambientes AWS',
    steps: [
      { title: 'Well-Architected Review', desc: 'Avaliamos o ambiente contra os 6 pilares do Well-Architected Framework. Para novos ambientes, usamos como guia de design. Para existentes, identificamos gaps por risco e impacto.' },
      { title: 'Fundação: Organizations, IAM e rede', desc: 'Estruturamos AWS Organizations com contas separadas por ambiente, IAM com privilégio mínimo, Service Control Policies e VPCs com segmentação adequada. A fundação correta economiza retrabalho futuro.' },
      { title: 'Migração ou implantação', desc: 'Para migrações, usamos AWS Application Migration Service (MGN) e AWS DMS para bancos de dados. Executamos em fases com validação de cada etapa antes de avançar.' },
      { title: 'Segurança e FinOps contínuos', desc: 'GuardDuty, Security Hub, CloudTrail e Config para segurança. AWS Cost Explorer, Budgets e Compute Optimizer para custo. Relatório executivo mensal.' },
    ],
  },

  benefits: [
    { title: 'Segurança desde a fundação', desc: 'IAM, VPC, GuardDuty e CloudTrail configurados antes de qualquer workload. Segurança não é retrofit.' },
    { title: 'Custo previsível', desc: 'Reserved Instances, Savings Plans e rightsizing reduzem custos em 20-40% em relação a ambientes sem governança.' },
    { title: 'Catálogo completo de serviços', desc: 'Maior ecossistema cloud: EC2, RDS, S3, Lambda, EKS, SageMaker e centenas de serviços gerenciados.' },
    { title: 'Suporte em português', desc: 'Atendimento técnico N2/N3 em português. Sem precisar abrir ticket em inglês para resolver problemas do seu ambiente.' },
  ],

  deliverables: [
    'Relatório de Well-Architected Review',
    'Documento de arquitetura AWS',
    'Plano de migração com cronograma',
    'Configuração de AWS Organizations e IAM',
    'Dashboard AWS Cost Management configurado',
    'Alertas de segurança (GuardDuty, Security Hub)',
    'Runbooks de operação e troubleshooting',
    'Relatório executivo mensal de custo e segurança',
  ],

  differentials: [
    { title: 'Well-Architected Review gratuito no assessment', desc: 'Todo projeto começa com avaliação dos 6 pilares. Você sabe exatamente onde está antes de decidir o que mudar.' },
    { title: 'FinOps especializado em AWS', desc: 'Reserved Instances, Savings Plans, Spot para workloads tolerantes, S3 Intelligent-Tiering e rightsizing com Compute Optimizer. Nenhum recurso ocioso.' },
    { title: 'Segurança desde a fundação', desc: 'IAM, VPC, GuardDuty, Security Hub e CloudTrail configurados antes de qualquer workload. Segurança não é retrofit — é design.' },
    { title: 'Suporte em português com SLA', desc: 'Atendimento técnico direto em português, sem intermediários e com tempo de resposta contratual.' },
  ],

  faqs,
  schemas: [
    serviceSchema('Consultoria AWS', 'Migração, arquitetura Well-Architected, segurança e FinOps em Amazon Web Services para empresas corporativas.', 'Cloud Computing Consultancy'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'AWS', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}
