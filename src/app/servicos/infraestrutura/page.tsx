import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'infraestrutura'

const faqs = [
  {
    question: 'O que está incluído em um projeto de infraestrutura de TI?',
    answer: 'Depende do escopo, mas tipicamente cobre: levantamento de requisitos, arquitetura de rede (switching, roteamento, segmentação), servidores (físicos ou virtuais), storage, conectividade (link de internet, links redundantes, SD-WAN), segurança de rede (firewall, VPN), serviços de infraestrutura (DNS, DHCP, AD, backup) e documentação.',
  },
  {
    question: 'Como a JPX Digital aborda a modernização de infraestrutura legada?',
    answer: 'Adotamos uma abordagem evolutiva — não revolucionária. Mapeamos o ambiente atual, identificamos os riscos e restrições reais, propomos um roadmap de modernização em fases que minimiza o impacto operacional. Substituir tudo de uma vez raramente é a melhor decisão; uma migração controlada e validada em etapas é mais segura.',
  },
  {
    question: 'Vale a pena ter Active Directory (AD) ou migrar para identidade cloud?',
    answer: 'Depende do perfil. AD on-prem é ideal para ambientes com muitas máquinas Windows, políticas de GPO complexas e aplicações que dependem de autenticação Kerberos. Microsoft Entra ID (Azure AD) é mais adequado para ambientes cloud-first ou com muitos usuários remotos. Híbrido (AD + Entra ID com sincronização) é a solução mais comum em ambientes de transição.',
  },
  {
    question: 'Como garantir alta disponibilidade para serviços de infraestrutura?',
    answer: 'HA para infraestrutura corporativa envolve: links de internet redundantes (load balancing ou failover), switches em stack ou com redundância, servidores em cluster (Hyper-V, VMware) com storage compartilhado, controladores de domínio redundantes (mínimo 2 DCs), DNS e DHCP com failover. O nível de HA é proporcional ao impacto que cada falha causa ao negócio.',
  },
  {
    question: 'A JPX Digital faz suporte pós-implementação de infraestrutura?',
    answer: 'Sim. Oferecemos suporte técnico mensal para ambientes implementados pela JPX Digital e para ambientes legados que assumimos. O suporte inclui monitoramento proativo, gestão de patches, resposta a incidentes e planejamento de capacidade. Veja nossa página de Suporte Gerenciado para detalhes.',
  },
]

export const metadata: Metadata = {
  title: 'Consultoria de Infraestrutura de TI para Empresas',
  description:
    'Consultoria de infraestrutura de TI: redes, servidores, storage, Active Directory e conectividade. Projetos completos com planejamento, implantação e documentação. Assessment gratuito.',
  keywords: ['consultoria infraestrutura TI', 'infraestrutura de TI empresas', 'projeto de rede corporativa', 'active directory consultoria', 'modernização de infraestrutura'],
  openGraph: { title: 'Infraestrutura de TI | JPX Digital', description: 'Projetos de infraestrutura corporativa: rede, servidores, storage e identidade.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Infraestrutura',
  heroHeadline: 'Infraestrutura de TI — Projetos Completos com Arquitetura, Implantação e Documentação Real.',
  heroSub: 'Rede, servidores, storage, Active Directory e conectividade projetados para crescer com o negócio — não para resolver o problema imediato e criar o próximo.',
  intro: [
    'Infraestrutura de TI mal planejada custa caro duas vezes: uma na hora de implementar e outra quando precisa ser refeita. Decisões de arquitetura tomadas sob pressão ou sem experiência adequada tendem a criar dívida técnica que limita o crescimento do negócio por anos.',
    'A JPX Digital projeta e implanta infraestrutura corporativa completa — desde o cabeamento estruturado e switching até servidores, storage, Active Directory, serviços de rede e conectividade — com documentação técnica entregue ao final de cada projeto.',
    'Nossa abordagem considera o momento atual da empresa, o planejamento de crescimento para os próximos 3-5 anos e a estratégia de cloud — projetando infraestrutura on-prem que não trave a evolução futura para ambientes híbridos.',
  ],
  howTitle: 'Metodologia de projeto de infraestrutura',
  howSteps: [
    { title: 'Levantamento e análise de requisitos', desc: 'Entrevistamos as áreas de negócio e TI, mapeamos os serviços críticos, quantificamos usuários e crescimento previsto, identificamos restrições de orçamento, espaço físico e conectividade. Sem essa base, qualquer arquitetura é um chute.' },
    { title: 'Arquitetura e planejamento', desc: 'Projetamos a arquitetura com topologia de rede, especificação de equipamentos, licenciamento, dimensionamento de servidores e storage, plano de endereçamento IP e diagrama de infraestrutura. Apresentamos o projeto antes de qualquer aquisição.' },
    { title: 'Implementação controlada', desc: 'Implementamos em fases quando possível, com validação de cada componente antes de avançar. Para ambientes críticos, migrações são feitas com o ambiente anterior em stand-by até confirmação de estabilidade.' },
    { title: 'Documentação e transferência de conhecimento', desc: 'Entregamos documentação técnica completa: topologia de rede, inventário de equipamentos, configurações de switches e firewall, credenciais (cofre seguro), runbooks de procedimentos operacionais e procedimentos de backup.' },
  ],
  differentials: [
    { title: 'Arquitetura antes da compra', desc: 'Apresentamos o projeto completo — com especificação e custo estimado — antes de qualquer aquisição. Você decide com informação, não depois que o equipamento chegou.' },
    { title: 'Documentação como entregável', desc: 'Documentação técnica não é opcional: é um entregável formal de cada projeto. Seu ambiente não fica dependente do conhecimento tácito de um consultor.' },
    { title: 'Visão híbrida desde o projeto', desc: 'Projetamos on-prem considerando integração futura com cloud. VMs bem organizadas, endereçamento IP planejado e autenticação híbrida facilitam a evolução do ambiente.' },
    { title: 'Independência de fabricante', desc: 'Recomendamos equipamentos e soluções baseados na necessidade técnica do cliente — não por relações comerciais. Às vezes a melhor solução para o caso é a menos óbvia.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Infraestrutura de TI', 'Projetos completos de infraestrutura corporativa: rede, servidores, storage, Active Directory e conectividade.', 'IT Infrastructure Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Infraestrutura de TI', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }
