import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'oracle-cloud-oci'

const faqs = [
  {
    question: 'Qual é a principal vantagem do OCI em relação a Azure e AWS?',
    answer: 'O OCI oferece preço de egress de rede mais competitivo, desempenho de rede baixa latência entre instâncias (RDMA) e é a plataforma preferencial para cargas de trabalho Oracle Database, incluindo Autonomous Database e Exadata Cloud. Para workloads Oracle-native, o custo total de propriedade tende a ser significativamente menor.',
  },
  {
    question: 'A JPX Digital realiza migração de Oracle Database on-premise para OCI?',
    answer: 'Sim. Realizamos migrações de Oracle Database Standard e Enterprise Edition, incluindo RAC, Exadata e Data Guard, para OCI. O processo inclui assessment do banco atual, definição de arquitetura alvo, migração com downtime mínimo e validação pós-migração.',
  },
  {
    question: 'Quanto tempo leva uma migração para Oracle Cloud?',
    answer: 'Depende da complexidade do ambiente. Migrações simples (servidores de aplicação, ambientes de desenvolvimento) levam de 2 a 4 semanas. Ambientes com Oracle Database em produção e alta disponibilidade exigem planejamento de 4 a 12 semanas, com janelas de manutenção controladas.',
  },
  {
    question: 'Vocês gerenciam o ambiente após a migração?',
    answer: 'Sim. Oferecemos sustentação de ambientes OCI com SLA definido, monitoramento 24/7, gestão de patches, FinOps contínuo e suporte técnico N2/N3 em português. O ambiente migrado é entregue com runbooks e documentação completa.',
  },
  {
    question: 'O OCI é adequado para empresas de médio porte?',
    answer: 'Sim. O OCI tem tier gratuito generoso (Always Free) e permite escala granular, tornando-o acessível para médias empresas. Especialmente para quem já usa Oracle Database ou E-Business Suite, o OCI é a opção natural e com melhor custo-benefício.',
  },
]

export const metadata: Metadata = {
  title: 'Consultoria Oracle Cloud Infrastructure (OCI)',
  description:
    'Parceiros certificados Oracle Cloud (OCI). Migração, arquitetura, gestão e FinOps para ambientes corporativos exigentes. Assessment gratuito.',
  keywords: ['consultoria OCI', 'Oracle Cloud Brasil', 'Oracle Cloud Infrastructure', 'migração OCI', 'Oracle Cloud consultoria'],
  openGraph: {
    title: 'Consultoria Oracle Cloud (OCI) | JPX Digital',
    description: 'Parceiros certificados Oracle Cloud Infrastructure. Migração, arquitetura e sustentação de ambientes corporativos.',
    url: `${BASE}/servicos/${slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Cloud Computing',
  heroHeadline: 'Consultoria Oracle Cloud Infrastructure — Especialistas em OCI para Ambientes Corporativos.',
  heroSub:
    'Migramos, arquitetamos e sustentamos ambientes Oracle Cloud Infrastructure com profundidade técnica e foco nos resultados do seu negócio.',
  intro: [
    'O Oracle Cloud Infrastructure (OCI) é a escolha estratégica para empresas que dependem de cargas de trabalho Oracle — banco de dados, ERP, Fusion, E-Business Suite — ou que buscam performance de rede de baixa latência com custo de egress competitivo.',
    'A JPX Digital atua como consultora certificada OCI, com experiência em migrações complexas de ambientes on-premise, arquitetura de alta disponibilidade com Fault Domains e Availability Domains, e sustentação contínua com FinOps integrado.',
    'Nossa abordagem começa pelo entendimento do seu negócio — não pela venda de recursos de cloud. Cada projeto parte de um assessment honesto do ambiente atual e define metas claras de performance, disponibilidade e custo.',
  ],
  howTitle: 'Nossa metodologia de implantação OCI',
  howSteps: [
    {
      title: 'Assessment do ambiente atual',
      desc: 'Mapeamos toda a infraestrutura existente — servidores, bancos de dados, aplicações, dependências e custos atuais. Identificamos o que faz sentido migrar, o que deve ser modernizado e o que pode ser eliminado.',
    },
    {
      title: 'Arquitetura OCI customizada',
      desc: 'Desenhamos a arquitetura OCI ideal: VCN, subnets, Security Lists, Load Balancer, Compute shapes, Block/Object Storage, WAF e conectividade. Alta disponibilidade com multi-AD desde a concepção.',
    },
    {
      title: 'Migração com corte controlado',
      desc: 'Executamos a migração em fases, com ambiente paralelo, testes de validação e janela de corte planejada para minimizar impacto. Zero downtime é o objetivo — downtime mínimo é o comprometimento.',
    },
    {
      title: 'Sustentação e FinOps contínuos',
      desc: 'Após a migração, sustentamos o ambiente com monitoramento, patching, revisão de custos mensais e relatórios executivos. Você tem visibilidade total do que gasta e por quê.',
    },
  ],
  differentials: [
    {
      title: 'Parceria oficial Oracle',
      desc: 'Acesso direto ao suporte técnico Oracle de nível 4, participação em programa de parceiros e treinamentos exclusivos. Escalamos problemas de forma prioritária.',
    },
    {
      title: 'Experiência com Oracle Database em OCI',
      desc: 'Migramos e gerenciamos Oracle DB Standard, Enterprise, RAC, Exadata Cloud e Autonomous Database. Poucos parceiros no Brasil têm essa profundidade técnica.',
    },
    {
      title: 'FinOps nativo desde o dia 1',
      desc: 'Implementamos controle de custos, alertas de budget e revisão mensal de rightsizing em todos os ambientes que gerenciamos. Você não paga por recursos que não usa.',
    },
    {
      title: 'Documentação e runbooks completos',
      desc: 'Todo ambiente entregue vem com arquitetura documentada, runbooks operacionais e plano de continuidade. Sem dependência de conhecimento tácito da nossa equipe.',
    },
  ],
  faqs,
  schemas: [
    serviceSchema(
      'Consultoria Oracle Cloud Infrastructure (OCI)',
      'Consultoria especializada em migração, arquitetura, gestão e FinOps em Oracle Cloud Infrastructure para empresas corporativas.',
      'Cloud Computing Consultancy'
    ),
    breadcrumbSchema([
      { name: 'Home', item: BASE },
      { name: 'Serviços', item: `${BASE}/servicos` },
      { name: 'Oracle Cloud OCI', item: `${BASE}/servicos/${slug}` },
    ]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}
