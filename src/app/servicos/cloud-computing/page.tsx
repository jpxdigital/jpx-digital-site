import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'cloud-computing'

const faqs = [
  {
    question: 'Vale a pena migrar para cloud ou manter servidores próprios?',
    answer: 'Depende do seu workload, volume de dados e tolerância a capex vs opex. Cloud faz mais sentido para ambientes com demanda variável, necessidade de alta disponibilidade geográfica e equipes de TI enxutas. Servidores próprios ainda são competitivos para workloads estáveis e previsíveis de alta intensidade. O ideal é uma análise de TCO honesta — não uma venda de cloud.',
  },
  {
    question: 'O que é estratégia multi-cloud e quando faz sentido?',
    answer: 'Multi-cloud significa usar mais de um provedor de cloud. Faz sentido quando você precisa evitar vendor lock-in, aproveitar os melhores preços por serviço ou quando regulamentações exigem redundância de provedor. Sem planejamento, multi-cloud aumenta complexidade sem benefício.',
  },
  {
    question: 'Quanto tempo leva uma migração para cloud?',
    answer: 'Migrações de lift-and-shift simples levam de 4 a 12 semanas dependendo do volume. Modernizações mais profundas (re-architect, containerização) levam meses. O tempo depende do número de sistemas, complexidade das dependências e janelas de manutenção disponíveis.',
  },
  {
    question: 'Como controlar os custos de cloud após a migração?',
    answer: 'Custo de cloud sem governança cresce rapidamente. Implementamos FinOps desde o primeiro dia: tags de custo por projeto/área, alertas de budget, revisão mensal de rightsizing, uso de instâncias reservadas para cargas previsíveis e desligamento automático de recursos de desenvolvimento fora do horário.',
  },
  {
    question: 'A JPX Digital migra workloads Oracle para cloud?',
    answer: 'Sim, com foco especial em Oracle Cloud Infrastructure (OCI), que oferece melhor custo-benefício para cargas Oracle nativas. Realizamos migrações de Oracle Database, E-Business Suite e aplicações customizadas. Para cargas não-Oracle, avaliamos OCI, Azure e AWS conforme o perfil do workload.',
  },
]

export const metadata: Metadata = {
  title: 'Consultoria Cloud Computing — OCI, Azure e AWS',
  description: 'Consultoria em cloud computing para empresas: migração, arquitetura multi-cloud, gestão e FinOps em Oracle Cloud, Microsoft Azure e AWS. Assessment gratuito.',
  keywords: ['consultoria cloud computing', 'consultoria de cloud', 'cloud computing brasil', 'migração para nuvem', 'multi-cloud'],
  openGraph: { title: 'Consultoria Cloud Computing | JPX Digital', description: 'Migração, arquitetura e gestão em OCI, Azure e AWS.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content: ServicePageContent = {
  slug,
  category: 'Cloud Computing',
  heroHeadline: 'Cloud Computing — Do Projeto à Operação, em OCI, Azure e AWS.',
  heroSub: 'Migração estratégica, arquitetura de alta disponibilidade e gestão contínua de ambientes cloud — com FinOps desde o primeiro dia.',
  ctaLabel: 'Solicitar Cloud Readiness Assessment',

  problem: {
    headline: 'Migrar para a nuvem não é apenas trocar servidores. É reduzir riscos, ganhar escalabilidade e controlar custos — sem surpresas na fatura no mês seguinte.',
    body: [
      'Muitas empresas migram para a cloud sem uma estratégia clara e chegam ao outro lado com custos maiores do que on-premise, arquitetura improvisada e dependência de um único provedor sem razão técnica para isso.',
      'O problema não é a cloud. É a ausência de planejamento. Workloads mal dimensionados, armazenamento sem política de lifecycle, redes mal configuradas e ausência de FinOps transformam a promessa de economia em seu oposto.',
      'A JPX Digital atua em todo o ciclo cloud: do Assessment com análise de TCO ao design de arquitetura, execução da migração com downtime controlado e gestão contínua com FinOps integrado desde o primeiro dia.',
    ],
  },

  assessment: {
    name: 'Cloud Readiness Assessment',
    body: 'Antes de qualquer migração, fazemos um inventário completo do ambiente atual, mapeamos dependências entre sistemas, calculamos o TCO e projetamos o custo real em cloud. Identificamos o que deve migrar, o que deve ser modernizado e o que é melhor manter on-premise.',
    checklist: [
      'Inventário completo da infraestrutura atual',
      'Mapeamento de dependências entre sistemas',
      'Análise de TCO e projeção de custo cloud por provedor',
      'Identificação de riscos e workloads problemáticos',
      'Proposta de arquitetura com cronograma e estimativa de custo',
    ],
  },

  process: {
    title: 'Como executamos projetos cloud',
    steps: [
      { title: 'Cloud Readiness Assessment', desc: 'Inventariamos toda a infraestrutura, mapeamos dependências, calculamos TCO atual e projetamos o custo cloud. Identificamos o que deve migrar, o que deve ser modernizado e o que é melhor manter local.' },
      { title: 'Arquitetura e design', desc: 'Definimos a arquitetura cloud ideal: rede (VPC/VCN), segurança, alta disponibilidade, conectividade com ambiente on-premise (VPN/ExpressRoute/FastConnect) e estratégia de dados. Documentação completa antes de qualquer execução.' },
      { title: 'Migração em fases com rollback', desc: 'Executamos a migração em fases incrementais — começando por sistemas não-críticos — com ambiente paralelo, testes de validação e plano de rollback documentado para cada fase.' },
      { title: 'Gestão, monitoramento e FinOps', desc: 'Sustentamos o ambiente cloud com monitoramento 24/7, gestão de patches, revisão mensal de custos (rightsizing, reservas, savings plans) e relatórios executivos de uso e custo.' },
    ],
  },

  benefits: [
    { title: 'Escalabilidade sob demanda', desc: 'Recursos que crescem com o negócio, sem superdimensionamento de infraestrutura física.' },
    { title: 'Custo previsível', desc: 'FinOps integrado: budget definido, alertas configurados, zero surpresas na fatura.' },
    { title: 'Alta disponibilidade', desc: 'Arquitetura com redundância real — não apenas a que o provedor vende por padrão.' },
    { title: 'Independência de provedor', desc: 'Arquitetura documentada e portável. Você não fica refém de uma escolha mal feita.' },
  ],

  deliverables: [
    'Relatório de Cloud Readiness Assessment',
    'Análise de TCO comparativa (on-premise vs cloud)',
    'Documento de arquitetura cloud',
    'Plano de migração por fases com cronograma',
    'Runbooks de operação e contingência',
    'Política de tags e organização de recursos',
    'Dashboard de custos e alertas configurados',
    'Relatório executivo mensal de FinOps',
  ],

  differentials: [
    { title: 'Agnósticos de provedor', desc: 'Recomendamos OCI, Azure ou AWS com base no que faz sentido para cada workload — não por comissionamento. Você recebe uma análise honesta.' },
    { title: 'FinOps integrado desde o dia 1', desc: 'Tags de custo, alertas de budget, revisão de rightsizing mensais e relatório executivo. Nenhum cliente nosso recebe surpresa na fatura.' },
    { title: 'Migração com risco controlado', desc: 'Migração em fases, ambiente paralelo durante a transição e plano de rollback documentado. Zero pressão para cortar o ambiente legado antes de validar o novo.' },
    { title: 'Especialização em Oracle em cloud', desc: 'Para cargas Oracle-native, OCI é frequentemente a melhor escolha em custo e performance — e temos a profundidade técnica para executar.' },
  ],

  faqs,
  schemas: [
    serviceSchema('Cloud Computing', 'Consultoria em cloud computing: migração, arquitetura e gestão em OCI, Azure e AWS com FinOps integrado.', 'Cloud Computing Consultancy'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Cloud Computing', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}
