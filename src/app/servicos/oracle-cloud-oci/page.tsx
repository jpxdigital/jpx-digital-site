import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'oracle-cloud-oci'

const faqs = [
  {
    question: 'Qual é a principal vantagem do OCI em relação a Azure e AWS?',
    answer: 'O OCI oferece preço de egress de rede mais competitivo, desempenho de rede de baixa latência entre instâncias (RDMA) e é a plataforma preferencial para cargas Oracle Database, incluindo Autonomous Database e Exadata Cloud. Para workloads Oracle-native, o custo total de propriedade tende a ser significativamente menor.',
  },
  {
    question: 'A JPX Digital realiza migração de Oracle Database on-premise para OCI?',
    answer: 'Sim. Realizamos migrações de Oracle Database Standard e Enterprise Edition, incluindo RAC, Exadata e Data Guard, para OCI. O processo inclui assessment do banco atual, definição de arquitetura alvo, migração com downtime mínimo e validação pós-migração.',
  },
  {
    question: 'Quanto tempo leva uma migração para Oracle Cloud?',
    answer: 'Migrações simples levam de 2 a 4 semanas. Ambientes com Oracle Database em produção e alta disponibilidade exigem planejamento de 4 a 12 semanas, com janelas de manutenção controladas.',
  },
  {
    question: 'Vocês gerenciam o ambiente após a migração?',
    answer: 'Sim. Oferecemos sustentação de ambientes OCI com SLA definido, monitoramento 24/7, gestão de patches, FinOps contínuo e suporte técnico em português. O ambiente migrado é entregue com runbooks e documentação completa.',
  },
  {
    question: 'O OCI é adequado para empresas de médio porte?',
    answer: 'Sim. O OCI tem tier gratuito generoso (Always Free) e permite escala granular, tornando-o acessível para médias empresas. Especialmente para quem já usa Oracle Database ou E-Business Suite, o OCI é a opção natural com melhor custo-benefício.',
  },
]

export const metadata: Metadata = {
  title: 'Consultoria Oracle Cloud Infrastructure (OCI)',
  description: 'Parceiros certificados Oracle Cloud (OCI). Migração, arquitetura, gestão e FinOps para ambientes corporativos exigentes. Assessment gratuito.',
  keywords: ['consultoria OCI', 'Oracle Cloud Brasil', 'Oracle Cloud Infrastructure', 'migração OCI', 'Oracle Cloud consultoria'],
  openGraph: {
    title: 'Consultoria Oracle Cloud (OCI) | JPX Digital',
    description: 'Parceiros certificados Oracle Cloud Infrastructure. Migração, arquitetura e sustentação de ambientes corporativos.',
    url: `${BASE}/servicos/${slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content: ServicePageContent = {
  slug,
  category: 'Cloud Computing',
  heroHeadline: 'Consultoria Oracle Cloud Infrastructure — Especialistas em OCI para Ambientes Corporativos.',
  heroSub: 'Migramos, arquitetamos e sustentamos ambientes Oracle Cloud Infrastructure com profundidade técnica e foco nos resultados do seu negócio.',
  ctaLabel: 'Solicitar OCI Readiness Assessment',

  problem: {
    headline: 'OCI não é mais a nuvem que ninguém conhece. É onde workloads Oracle custam menos, performam mais — e poucas empresas estão aproveitando.',
    body: [
      'O Oracle Cloud Infrastructure é a escolha estratégica para empresas que dependem de cargas de trabalho Oracle — banco de dados, ERP, Fusion, E-Business Suite — ou que buscam performance de rede de baixa latência com custo de egress competitivo.',
      'Muitas empresas migram para Azure ou AWS por familiaridade, sem analisar o custo real de manter Oracle Database nessas plataformas. Em OCI, o mesmo workload Oracle custa até 50% menos, com latência de rede inferior e licenciamento mais flexível.',
      'A JPX Digital atua como consultora certificada OCI. Nossa abordagem começa pelo entendimento do seu negócio — não pela venda de recursos de cloud. Cada projeto parte de um assessment honesto do ambiente atual com metas claras de performance, disponibilidade e custo.',
    ],
  },

  assessment: {
    name: 'OCI Readiness Assessment',
    body: 'Mapeamos toda a infraestrutura existente — servidores, bancos de dados, aplicações, dependências e custos atuais. Identificamos o que faz sentido migrar para OCI, o que deve ser modernizado e o que pode ser eliminado. Entregamos uma análise de TCO comparativa honesta.',
    checklist: [
      'Inventário de workloads Oracle e não-Oracle',
      'Análise de TCO comparativa (atual vs OCI)',
      'Identificação de dependências e riscos de migração',
      'Proposta de arquitetura OCI customizada',
      'Estimativa de custo mensal pós-migração',
    ],
  },

  process: {
    title: 'Nossa metodologia de implantação OCI',
    steps: [
      { title: 'Assessment do ambiente atual', desc: 'Mapeamos toda a infraestrutura existente — servidores, bancos de dados, aplicações, dependências e custos atuais. Identificamos o que faz sentido migrar, o que deve ser modernizado e o que pode ser eliminado.' },
      { title: 'Arquitetura OCI customizada', desc: 'Desenhamos a arquitetura OCI ideal: VCN, subnets, Security Lists, Load Balancer, Compute shapes, Block/Object Storage, WAF e conectividade. Alta disponibilidade com multi-AD desde a concepção.' },
      { title: 'Migração com corte controlado', desc: 'Executamos a migração em fases, com ambiente paralelo, testes de validação e janela de corte planejada para minimizar impacto. Zero downtime é o objetivo — downtime mínimo é o comprometimento.' },
      { title: 'Sustentação e FinOps contínuos', desc: 'Após a migração, sustentamos o ambiente com monitoramento, patching, revisão de custos mensais e relatórios executivos. Você tem visibilidade total do que gasta e por quê.' },
    ],
  },

  benefits: [
    { title: 'Custo até 50% menor para Oracle', desc: 'OCI oferece o melhor TCO para workloads Oracle Database — sem surpresa de egress e com BYOL favorável.' },
    { title: 'Performance de rede superior', desc: 'Rede RDMA de baixa latência para Oracle RAC e workloads de alta intensidade de I/O.' },
    { title: 'Always Free tier', desc: 'Recursos gratuitos permanentes para ambientes de desenvolvimento, teste e pequenas cargas.' },
    { title: 'Suporte em português', desc: 'Sustentação com SLA, documentação e atendimento em português — sem intermediários.' },
  ],

  deliverables: [
    'Relatório de OCI Readiness Assessment',
    'Análise de TCO comparativa (atual vs OCI)',
    'Documento de arquitetura OCI',
    'Plano de migração com cronograma e janelas',
    'Runbooks de operação e troubleshooting',
    'Configuração de alertas e dashboard OCI',
    'Política de FinOps e tags de custo',
    'Relatório executivo mensal',
  ],

  differentials: [
    { title: 'Parceria oficial Oracle', desc: 'Acesso direto ao suporte técnico Oracle de nível 4 e participação em programa de parceiros. Escalamos problemas de forma prioritária.' },
    { title: 'Experiência com Oracle Database em OCI', desc: 'Migramos e gerenciamos Oracle DB Standard, Enterprise, RAC, Exadata Cloud e Autonomous Database. Poucos parceiros no Brasil têm essa profundidade técnica.' },
    { title: 'FinOps nativo desde o dia 1', desc: 'Implementamos controle de custos, alertas de budget e revisão mensal de rightsizing em todos os ambientes que gerenciamos.' },
    { title: 'Documentação e runbooks completos', desc: 'Todo ambiente entregue vem com arquitetura documentada, runbooks operacionais e plano de continuidade. Sem dependência de conhecimento tácito.' },
  ],

  faqs,
  schemas: [
    serviceSchema('Consultoria Oracle Cloud Infrastructure (OCI)', 'Consultoria especializada em migração, arquitetura, gestão e FinOps em Oracle Cloud Infrastructure para empresas corporativas.', 'Cloud Computing Consultancy'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Oracle Cloud OCI', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}
