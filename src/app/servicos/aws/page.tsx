import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'aws'

const faqs = [
  {
    question: 'AWS, Azure ou OCI — como escolher?',
    answer: 'AWS tem o maior catálogo de serviços e é forte em workloads cloud-native, big data e machine learning. Azure é melhor integrado com ecossistema Microsoft. OCI é a melhor opção para cargas Oracle e tem custo de egress mais competitivo. A escolha depende dos seus workloads, equipe e dependências de software. A JPX Digital faz essa análise de forma agnóstica.',
  },
  {
    question: 'O que é AWS Well-Architected Framework?',
    answer: 'É o conjunto de melhores práticas da Amazon para design de ambientes cloud, organizado em 6 pilares: excelência operacional, segurança, confiabilidade, eficiência de performance, otimização de custo e sustentabilidade. A JPX Digital realiza Well-Architected Reviews para identificar gaps e oportunidades de melhoria em ambientes AWS existentes.',
  },
  {
    question: 'Como evitar surpresas na fatura da AWS?',
    answer: 'AWS sem governança é a causa mais comum de choque de custos em cloud. Implementamos desde o início: AWS Budgets com alertas, Cost Allocation Tags por projeto/área, análise mensal de rightsizing com AWS Compute Optimizer, e uso de Reserved Instances ou Savings Plans para workloads previsíveis. Reduzimos custos AWS em 20-40% na maioria dos ambientes que auditamos.',
  },
  {
    question: 'A JPX Digital implementa segurança em ambientes AWS?',
    answer: 'Sim. Implementamos AWS Security Hub, GuardDuty, CloudTrail, Config e IAM com privilégio mínimo. Configuramos VPCs com segmentação adequada, Security Groups granulares e auditoria de acesso. Para ambientes que precisam de conformidade (ISO 27001, SOC 2), implementamos os controles técnicos necessários.',
  },
  {
    question: 'É possível usar AWS junto com OCI ou Azure?',
    answer: 'Sim. Arquiteturas multi-cloud são complexas mas viáveis. Usamos AWS para alguns workloads e OCI ou Azure para outros, conectados via VPN site-to-site ou Direct Connect/FastConnect. O desafio é governança unificada de custo e segurança — que resolvemos com ferramentas de gerenciamento multi-cloud.',
  },
]

export const metadata: Metadata = {
  title: 'Consultoria AWS — Amazon Web Services para Empresas',
  description:
    'Consultoria AWS: migração, arquitetura, segurança e FinOps em Amazon Web Services. Well-Architected Review e otimização de custos. Assessment gratuito.',
  keywords: ['consultoria AWS', 'amazon web services brasil', 'aws consultoria', 'migração aws', 'aws well-architected'],
  openGraph: { title: 'Consultoria AWS | JPX Digital', description: 'Migração, arquitetura, segurança e FinOps em Amazon Web Services.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Cloud Computing',
  heroHeadline: 'Consultoria AWS — Amazon Web Services para Infraestrutura Corporativa Escalável e Segura.',
  heroSub: 'Migração, arquitetura Well-Architected, segurança e FinOps em AWS. Sem surpresas na fatura, sem gaps de segurança.',
  intro: [
    'A Amazon Web Services é o maior provedor de cloud do mundo, com o catálogo de serviços mais amplo e ecossistema de parceiros mais maduro. Para workloads cloud-native, big data, machine learning e aplicações que precisam de escalabilidade global, AWS frequentemente é a escolha mais natural.',
    'A JPX Digital planeja e executa projetos AWS com foco em segurança, confiabilidade e controle de custo — os três pontos que mais geram problemas em ambientes AWS sem governança adequada.',
    'Realizamos Well-Architected Reviews em ambientes existentes, identificando gaps de segurança, riscos de disponibilidade e oportunidades de economia. A maioria dos ambientes AWS que auditamos tem potencial de redução de 20 a 40% nos custos.',
  ],
  howTitle: 'Como estruturamos ambientes AWS',
  howSteps: [
    { title: 'Well-Architected Review', desc: 'Avaliamos o ambiente contra os 6 pilares do AWS Well-Architected Framework. Para ambientes novos, usamos o framework como guia de design. Para ambientes existentes, identificamos gaps e priorizamos remediações por risco e impacto.' },
    { title: 'Fundação: Organizations, IAM e rede', desc: 'Estruturamos AWS Organizations com contas separadas por ambiente (prod, dev, staging), IAM com privilégio mínimo, Service Control Policies e VPCs com segmentação adequada. A fundação correta economiza retrabalho futuro.' },
    { title: 'Migração ou implantação', desc: 'Para migrações, usamos AWS Application Migration Service (MGN) e AWS DMS para bancos de dados. Executamos em fases com validação de cada etapa antes de avançar.' },
    { title: 'Segurança e FinOps contínuos', desc: 'GuardDuty, Security Hub, CloudTrail e Config para segurança. AWS Cost Explorer, Budgets, Compute Optimizer e revisão mensal para custo. Relatório executivo mensal.' },
  ],
  differentials: [
    { title: 'Well-Architected Review gratuito no assessment', desc: 'Todo projeto começa com avaliação dos 6 pilares do Well-Architected Framework. Você sabe exatamente onde está antes de decidir o que mudar.' },
    { title: 'FinOps especializado em AWS', desc: 'Reserved Instances, Savings Plans, Spot para workloads tolerantes, S3 Intelligent-Tiering e rightsizing com Compute Optimizer. Nenhum recurso ocioso no ambiente.' },
    { title: 'Segurança desde a fundação', desc: 'IAM, VPC, GuardDuty, Security Hub e CloudTrail configurados antes de qualquer workload. Segurança não é retrofit — é design.' },
    { title: 'Suporte em português', desc: 'Atendimento técnico N2/N3 em português, com SLA definido. Você não precisa abrir ticket em inglês para a AWS para resolver problemas do seu ambiente.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Consultoria AWS', 'Migração, arquitetura Well-Architected, segurança e FinOps em Amazon Web Services para empresas corporativas.', 'Cloud Computing Consultancy'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'AWS', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }
