import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'microsoft-azure'

const faqs = [
  {
    question: 'Azure é a melhor escolha para empresas que já usam Microsoft 365?',
    answer: 'Frequentemente sim. A integração nativa entre Azure Active Directory (Entra ID), Microsoft 365, Intune e workloads Azure reduz fricção operacional e custos de licenciamento. Empresas com forte footprint Microsoft tendem a ter TCO menor em Azure para cargas de trabalho genéricas e aplicações .NET.',
  },
  {
    question: 'O que é Azure Hybrid e quando faz sentido?',
    answer: 'Azure Hybrid combina infraestrutura on-premise com Azure, usando Azure Arc, ExpressRoute e Azure Stack. Faz sentido para empresas com data residency obrigatória, latência crítica para aplicações locais ou durante transição gradual para cloud. Permite gerenciar recursos on-prem e cloud pelo mesmo painel.',
  },
  {
    question: 'Como funciona o licenciamento Azure Hybrid Benefit?',
    answer: 'O Azure Hybrid Benefit permite usar licenças Windows Server e SQL Server existentes (com Software Assurance) em Azure, reduzindo significativamente o custo das VMs. Empresas com licenciamento Microsoft robusto podem economizar 40-60% nas VMs Azure. A JPX Digital avalia e aplica esses benefícios em todos os projetos.',
  },
  {
    question: 'A JPX Digital implementa Azure DevOps e CI/CD?',
    answer: 'Sim. Implementamos pipelines de CI/CD com Azure DevOps, GitHub Actions e Azure Pipelines. Cobrimos desde repositório de código até deploy automatizado em AKS, App Service ou VMs. Especialmente relevante para equipes que querem acelerar entregas sem perder estabilidade.',
  },
  {
    question: 'Quanto custa migrar para Azure?',
    answer: 'O custo de migração depende do volume e complexidade dos workloads. A JPX Digital realiza um assessment gratuito que inclui estimativa de custo cloud (usando Azure Pricing Calculator) e esforço de migração. Você recebe uma proposta com investimento total antes de aprovar qualquer trabalho.',
  },
]

export const metadata: Metadata = {
  title: 'Consultoria Microsoft Azure — Migração e Gestão de Ambientes Azure',
  description:
    'Consultoria Microsoft Azure: migração, arquitetura híbrida, AKS, DevOps e gestão contínua. Parceiros Microsoft com experiência em ambientes corporativos. Assessment gratuito.',
  keywords: ['consultoria azure', 'migração azure brasil', 'microsoft azure consultoria', 'azure hybrid', 'azure devops'],
  openGraph: { title: 'Consultoria Microsoft Azure | JPX Digital', description: 'Migração, arquitetura e gestão em Microsoft Azure.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Cloud Computing',
  heroHeadline: 'Consultoria Microsoft Azure — Arquitetura, Migração e Gestão de Ambientes Azure Corporativos.',
  heroSub: 'Do Active Directory ao AKS. Do on-premise ao Azure híbrido. Entregamos ambientes Azure robustos, seguros e com custo controlado.',
  intro: [
    'O Microsoft Azure é a escolha natural para empresas com forte ecossistema Microsoft — Microsoft 365, Active Directory, SQL Server, .NET — pela integração nativa entre serviços e pelo modelo de licenciamento Hybrid Benefit que reduz custo das VMs.',
    'A JPX Digital projeta e executa migrações Azure com foco em arquitetura híbrida, segurança de identidade (Entra ID, MFA, Conditional Access) e governança de custo. Cada projeto começa com um assessment que quantifica o custo atual e projeta o custo Azure — sem surpresas na fatura.',
    'Nossa experiência cobre desde IaaS (VMs, redes, storage) até PaaS (App Service, AKS, Azure SQL Managed Instance) e modernização de aplicações para cloud-native.',
  ],
  howTitle: 'Nossa metodologia de implementação Azure',
  howSteps: [
    { title: 'Azure Well-Architected Review', desc: 'Avaliamos o ambiente atual ou o projeto contra os 5 pilares do Azure Well-Architected Framework: confiabilidade, segurança, otimização de custo, excelência operacional e eficiência de performance.' },
    { title: 'Landing Zone e governança', desc: 'Implementamos Azure Landing Zone com hierarquia de Management Groups, políticas de Azure Policy, RBAC granular e hub-spoke de rede. A fundação correta evita retrabalho futuro.' },
    { title: 'Migração com Azure Migrate', desc: 'Usamos Azure Migrate para descoberta, avaliação e migração de VMs on-premise. Executamos em fases com testes de validação, mantendo ambiente paralelo até confirmação de estabilidade.' },
    { title: 'Operação e FinOps contínuos', desc: 'Gestão do ambiente com Microsoft Defender for Cloud, Azure Monitor, Cost Management e revisões mensais de otimização. Relatório executivo mensal de custo e segurança.' },
  ],
  differentials: [
    { title: 'Especialização em Azure híbrido', desc: 'Ambientes que combinam on-premise com Azure são mais complexos — e mais comuns. Temos experiência com Azure Arc, ExpressRoute e Azure Stack para cenários que não são 100% cloud.' },
    { title: 'Licenciamento Hybrid Benefit aplicado', desc: 'Identificamos e aplicamos Azure Hybrid Benefit em todas as VMs elegíveis. A economia pode chegar a 60% no custo das instâncias Windows Server e SQL Server.' },
    { title: 'Segurança com Entra ID e Defender', desc: 'Implementamos Conditional Access, MFA, Privileged Identity Management e Microsoft Defender for Cloud em todos os ambientes que gerenciamos.' },
    { title: 'Capacidade de DevOps e AKS', desc: 'Além de infraestrutura, implementamos pipelines de CI/CD e ambientes Kubernetes gerenciados (AKS) para equipes que precisam de agilidade em entregas.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Consultoria Microsoft Azure', 'Migração, arquitetura híbrida e gestão de ambientes Microsoft Azure para empresas corporativas.', 'Cloud Computing Consultancy'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Microsoft Azure', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }
