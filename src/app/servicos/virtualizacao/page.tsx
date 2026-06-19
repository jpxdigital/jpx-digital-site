import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'virtualizacao'

const faqs = [
  {
    question: 'VMware ou Hyper-V — qual escolher?',
    answer: 'VMware vSphere é mais maduro, com melhor suporte a workloads críticos, vSAN nativo e VMotion. Hyper-V faz mais sentido em ambientes com forte footprint Microsoft, pois está incluído no Windows Server e integra bem com System Center. Para ambientes com Oracle Database, VMware é frequentemente exigido pela Oracle para suporte. KVM é a opção open-source para ambientes Linux.',
  },
  {
    question: 'Vale a pena virtualizar ou migrar direto para cloud?',
    answer: 'Depende. Para servidores com ciclo de vida restante (2-5 anos), virtualização on-premise pode ser mais econômica. Para infraestrutura nova, cloud pode fazer mais sentido. Frequentemente a resposta é um ambiente híbrido: virtualização on-prem para workloads estáveis + cloud para workloads variáveis. O assessement de TCO define a melhor estratégia.',
  },
  {
    question: 'O que é alta disponibilidade em ambientes virtualizados?',
    answer: 'HA (High Availability) em VMware ou Hyper-V reinicia automaticamente VMs em outro host do cluster quando um host falha, com downtime de minutos. Para zero downtime, vMotion (VMware) ou Live Migration (Hyper-V) migra VMs entre hosts sem interrupção. Isso requer cluster de no mínimo 2 hosts com storage compartilhado ou hiperconvergência.',
  },
  {
    question: 'O que é hiperconvergência (HCI) e quando faz sentido?',
    answer: 'Hiperconvergência combina compute, storage e rede em um único sistema gerenciado por software (VMware vSAN, Nutanix, etc.). Simplifica operação, elimina storage SAN dedicado e escala horizontalmente adicionando nós. Faz sentido para ambientes que buscam simplicidade operacional, expansão incremental ou que querem eliminar infraestrutura dedicada de storage.',
  },
  {
    question: 'Como migrar VMs para cloud quando chegar a hora?',
    answer: 'A virtualização facilita a migração futura para cloud: ferramentas como VMware HCX, Azure Migrate e AWS Application Migration Service são otimizadas para migrar VMs VMware/Hyper-V. Manter as VMs organizadas, documentadas e com snapshots facilita esse processo quando a migração para cloud for a decisão correta.',
  },
]

export const metadata: Metadata = {
  title: 'Virtualização de Servidores — VMware, Hyper-V e KVM',
  description:
    'Virtualização corporativa com VMware vSphere, Microsoft Hyper-V e KVM. Alta disponibilidade, hiperconvergência e suporte a Oracle Database. Assessment gratuito.',
  keywords: ['virtualização de servidores', 'vmware consultoria', 'hyper-v implementação', 'virtualização corporativa', 'hiperconvergência'],
  openGraph: { title: 'Virtualização de Servidores | JPX Digital', description: 'VMware, Hyper-V e KVM para ambientes corporativos críticos.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Infraestrutura',
  heroHeadline: 'Virtualização de Servidores — Alta Disponibilidade com VMware, Hyper-V e KVM.',
  heroSub: 'Consolide sua infraestrutura, elimine servidores ociosos e tenha failover automático com a plataforma de virtualização certa para o seu ambiente.',
  intro: [
    'Virtualização é a base de qualquer infraestrutura moderna. Consolidar servidores físicos em máquinas virtuais reduz custo de hardware, facilita backup, simplifica DR e permite crescer a capacidade sem novas aquisições.',
    'A JPX Digital projeta e implementa ambientes de virtualização com VMware vSphere, Microsoft Hyper-V e KVM, incluindo clusters de alta disponibilidade, hiperconvergência com vSAN e planejamento de capacidade para os próximos anos.',
    'Nossa abordagem considera o ciclo de vida dos servidores existentes, as cargas que precisam de HA real (não apenas restart automático) e a estratégia de evolução futura — seja para cloud, seja para expansão on-prem.',
  ],
  howTitle: 'Como implementamos a virtualização',
  howSteps: [
    { title: 'Assessment e dimensionamento', desc: 'Inventariamos todos os servidores físicos, medimos uso real de CPU, memória e I/O, e calculamos o dimensionamento dos hosts virtualizados. Identificamos candidatos a consolidação e workloads que não devem ser virtualizados.' },
    { title: 'Arquitetura do cluster', desc: 'Definimos arquitetura: número de hosts, storage (SAN, NAS ou vSAN), rede (separação de tráfego de management, VM e storage), políticas de HA e DRS (VMware) ou Failover Clustering (Hyper-V).' },
    { title: 'Implantação e migração', desc: 'Implantamos o ambiente virtual e migramos as cargas existentes — servidor a servidor, com janelas de manutenção planejadas e rollback disponível até a confirmação de estabilidade.' },
    { title: 'Documentação e gestão de capacidade', desc: 'Documentamos toda a infraestrutura, configuramos monitoramento e entregamos planejamento de capacidade para os próximos 2-3 anos. Você sabe quando precisará expandir antes de ficar sem recursos.' },
  ],
  differentials: [
    { title: 'Suporte a Oracle em VMware', desc: 'Oracle Database em VMware requer configuração específica para suporte Oracle. Nossa equipe conhece esses requisitos e implementa conforme as diretrizes Oracle.' },
    { title: 'Expertise em hiperconvergência', desc: 'VMware vSAN e Nutanix para ambientes que querem eliminar SAN dedicada e simplificar a operação. Avaliamos quando HCI é a decisão financeiramente correta.' },
    { title: 'Migração sem impacto em produção', desc: 'P2V (Physical to Virtual) e V2V (Virtual to Virtual) com ferramentas profissionais e janelas de manutenção controladas. Rollback planejado para cada etapa.' },
    { title: 'Visão de ciclo de vida', desc: 'Projetamos a infraestrutura considerando cloud como destino futuro. VMs bem organizadas hoje migram mais facilmente para cloud amanhã.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Virtualização de Servidores', 'Virtualização corporativa com VMware, Hyper-V e KVM. Alta disponibilidade, hiperconvergência e suporte a Oracle.', 'IT Infrastructure Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Virtualização', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }
