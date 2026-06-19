import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'cloud-computing'

const faqs = [
  {
    question: 'Vale a pena migrar para cloud ou manter servidores próprios?',
    answer: 'Depende do seu workload, volume de dados e tolerância a capex vs opex. Cloud faz mais sentido para ambientes com demanda variável, necessidade de alta disponibilidade geográfica e equipes de TI enxutas. Servidores próprios ainda são competitivos para workloads estáveis e previsíveis de alta intensidade. O ideal é uma análise de TCO (Total Cost of Ownership) honesta — não uma venda de cloud.',
  },
  {
    question: 'O que é estratégia multi-cloud e quando faz sentido?',
    answer: 'Multi-cloud significa usar mais de um provedor de cloud (ex: OCI para banco de dados Oracle + Azure para Microsoft 365 + AWS para workloads específicos). Faz sentido quando você precisa evitar vendor lock-in, aproveitar os melhores preços por serviço ou quando regulamentações exigem redundância de provedor. Sem planejamento, multi-cloud aumenta complexidade sem benefício.',
  },
  {
    question: 'Quanto tempo leva uma migração para cloud?',
    answer: 'Migrações de lift-and-shift simples (mover sem refatorar) levam de 4 a 12 semanas dependendo do volume. Modernizações mais profundas (re-architect, containerização) levam meses. O tempo depende principalmente do número de sistemas, complexidade das dependências e janelas de manutenção disponíveis.',
  },
  {
    question: 'Como controlar os custos de cloud após a migração?',
    answer: 'Custo de cloud sem governança cresce rapidamente. Implementamos FinOps desde o primeiro dia: tags de custo por projeto/área, alertas de budget, revisão mensal de rightsizing, uso de instâncias reservadas ou savings plans para cargas previsíveis, e desligamento automático de recursos de desenvolvimento fora do horário.',
  },
  {
    question: 'A JPX Digital migra workloads Oracle para cloud?',
    answer: 'Sim, com foco especial em Oracle Cloud Infrastructure (OCI), que oferece melhor custo-benefício para cargas Oracle nativas. Realizamos migrações de Oracle Database, E-Business Suite, JD Edwards e aplicações customizadas. Para cargas não-Oracle, avaliamos OCI, Azure e AWS conforme o perfil do workload.',
  },
]

export const metadata: Metadata = {
  title: 'Consultoria Cloud Computing — OCI, Azure e AWS',
  description:
    'Consultoria em cloud computing para empresas: migração, arquitetura multi-cloud, gestão e FinOps em Oracle Cloud, Microsoft Azure e AWS. Assessment gratuito.',
  keywords: ['consultoria cloud computing', 'consultoria de cloud', 'cloud computing brasil', 'migração para nuvem', 'multi-cloud'],
  openGraph: { title: 'Consultoria Cloud Computing | JPX Digital', description: 'Migração, arquitetura e gestão em OCI, Azure e AWS.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Cloud Computing',
  heroHeadline: 'Cloud Computing — Do Projeto à Operação, em OCI, Azure e AWS.',
  heroSub: 'Migração estratégica, arquitetura de alta disponibilidade e gestão contínua de ambientes cloud — com FinOps desde o primeiro dia.',
  intro: [
    'Cloud Computing não é uma decisão binária de "migrar tudo" ou "não migrar nada". É uma estratégia que precisa ser construída com base nos workloads reais do seu negócio, nos seus objetivos de disponibilidade e no custo que faz sentido pagar.',
    'A JPX Digital atua em todo o ciclo: avaliação do ambiente atual com análise de TCO, definição de arquitetura cloud (OCI, Azure, AWS ou multi-cloud), execução da migração com downtime controlado e gestão contínua com FinOps integrado.',
    'Trabalhamos com os três principais provedores — Oracle Cloud Infrastructure, Microsoft Azure e Amazon Web Services — e recomendamos o que faz sentido para cada workload, não o que dá mais margem de revenda.',
  ],
  howTitle: 'Nossa abordagem de adoção cloud',
  howSteps: [
    { title: 'Cloud Readiness Assessment', desc: 'Inventariamos toda a infraestrutura existente, mapeamos dependências entre sistemas, calculamos o TCO atual e projetamos o custo cloud. Identificamos o que deve migrar, o que deve ser modernizado e o que é melhor manter on-premise.' },
    { title: 'Arquitetura e design', desc: 'Definimos a arquitetura cloud ideal: rede (VPC/VCN), segurança, alta disponibilidade, conectividade com ambiente on-premise (VPN/ExpressRoute/FastConnect) e estratégia de dados. Documentação completa antes de qualquer execução.' },
    { title: 'Migração em fases com rollback', desc: 'Executamos a migração em fases incrementais — começando por sistemas não-críticos — com ambiente paralelo, testes de validação e plano de rollback documentado para cada fase.' },
    { title: 'Gestão, monitoramento e FinOps', desc: 'Sustentamos o ambiente cloud com monitoramento 24/7, gestão de patches, revisão mensal de custos (rightsizing, reservas, savings plans) e relatórios executivos de uso e custo.' },
  ],
  differentials: [
    { title: 'Agnósticos de provedor', desc: 'Recomendamos OCI, Azure ou AWS com base no que faz sentido para cada workload — não por comissionamento. Você recebe uma análise honesta, não uma proposta pré-definida.' },
    { title: 'FinOps integrado desde o dia 1', desc: 'Tags de custo, alertas de budget, revisão de rightsizing mensais e relatório executivo. Nenhum cliente nosso recebe surpresa na fatura de cloud.' },
    { title: 'Migração com risco controlado', desc: 'Migração em fases, ambiente paralelo durante a transição e plano de rollback documentado. Zero pressão para cortar o ambiente legado antes de validar o novo.' },
    { title: 'Especialização em Oracle em cloud', desc: 'Poucos parceiros no Brasil têm profundidade real em Oracle Database, RAC e Exadata em cloud. Para cargas Oracle-native, OCI é frequentemente a melhor escolha — e sabemos executar.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Cloud Computing', 'Consultoria em cloud computing: migração, arquitetura e gestão em OCI, Azure e AWS com FinOps integrado.', 'Cloud Computing Consultancy'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Cloud Computing', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }
