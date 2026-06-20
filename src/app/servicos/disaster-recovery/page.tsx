import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'disaster-recovery'

const faqs = [
  {
    question: 'Qual é a diferença entre Disaster Recovery e backup?',
    answer: 'Backup é a cópia dos dados. Disaster Recovery é o processo completo de retomar as operações da empresa após um incidente grave — inclui backup, mas também infraestrutura de failover, procedimentos operacionais documentados, treinamento da equipe e simulações periódicas. DR é o plano; backup é um dos componentes.',
  },
  {
    question: 'O que é RTO e RPO no contexto de Disaster Recovery?',
    answer: 'RTO (Recovery Time Objective) é o tempo máximo aceitável para retomar as operações após um incidente. RPO (Recovery Point Objective) é a quantidade máxima de dados que pode ser perdida, medida em tempo. Esses dois indicadores definem o investimento necessário no plano de DR.',
  },
  {
    question: 'Posso usar cloud como ambiente de Disaster Recovery?',
    answer: 'Sim, e é frequentemente a melhor opção. Cloud como DR site elimina o custo de manter infraestrutura ociosa em segundo datacenter. Usamos OCI, Azure ou AWS como ambiente de DR, com replicação automática dos dados e capacidade de provisionar instâncias apenas quando necessário.',
  },
  {
    question: 'Com que frequência o plano de DR deve ser testado?',
    answer: 'Recomendamos simulações completas de failover ao menos uma vez por ano, com testes parciais semestrais. Planos não testados tendem a falhar quando mais precisam funcionar. Cada simulação gera um relatório com melhorias identificadas e ações corretivas.',
  },
  {
    question: 'O plano de DR cobre ataques de ransomware?',
    answer: 'Sim, e é um dos cenários mais importantes atualmente. O plano inclui procedimentos específicos para ransomware: isolamento de sistemas comprometidos, identificação do ponto de recuperação limpo, restore seguro e verificação de integridade antes de reconectar à rede de produção.',
  },
]

export const metadata: Metadata = {
  title: 'Disaster Recovery para Empresas — RTO e RPO Garantidos',
  description: 'Plano de Disaster Recovery testado e documentado para empresas. Retome operações em minutos após falha, ransomware ou desastre. RTO e RPO garantidos em contrato.',
  keywords: ['disaster recovery', 'plano de disaster recovery', 'DR empresarial', 'RTO RPO', 'recuperação de desastres'],
  openGraph: {
    title: 'Disaster Recovery para Empresas | JPX Digital',
    description: 'Plano de DR testado e documentado. Retome operações em minutos. RTO e RPO garantidos.',
    url: `${BASE}/servicos/${slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content: ServicePageContent = {
  slug,
  category: 'Continuidade & Segurança',
  heroHeadline: 'Disaster Recovery — Retome suas Operações em Minutos, não em Dias.',
  heroSub: 'Desastres acontecem. Ransomware, falha de hardware, erro humano, fogo, enchente. A questão não é se vai acontecer, mas se você estará pronto.',
  ctaLabel: 'Solicitar DR Readiness Assessment',

  problem: {
    headline: 'O desastre não é perder um servidor. É parar o negócio.',
    body: [
      'Um plano de Disaster Recovery não é um documento guardado em gaveta. É uma capacidade operacional testada, documentada e executável sob pressão — quando o ambiente está comprometido e cada minuto de inatividade custa dinheiro e reputação.',
      'A maioria das empresas só descobre que o plano de DR não funciona durante um incidente real. Documentos desatualizados, ambientes de failover nunca testados, RTO estimado que nunca foi medido de verdade.',
      'A JPX Digital projeta planos de DR baseados em análise de impacto real do seu negócio. Definimos RTO e RPO para cada sistema crítico, implantamos a infraestrutura de failover e realizamos simulações periódicas com relatório documentado.',
    ],
  },

  assessment: {
    name: 'DR Readiness Assessment',
    body: 'Antes de qualquer implantação, avaliamos a capacidade atual de recuperação do seu ambiente. Identificamos quais sistemas são críticos para o negócio, qual o impacto financeiro e operacional de cada hora de inatividade, e quais são os RTO e RPO aceitáveis e alcançáveis.',
    checklist: [
      'Business Impact Analysis (BIA) por sistema crítico',
      'Avaliação do plano de DR existente (se houver)',
      'Mapeamento de dependências e pontos únicos de falha',
      'Definição de RTO e RPO por criticidade',
      'Proposta de arquitetura de failover com estimativa de custo',
    ],
  },

  process: {
    title: 'Como construímos seu plano de Disaster Recovery',
    steps: [
      { title: 'Business Impact Analysis (BIA)', desc: 'Identificamos quais sistemas são críticos para o negócio, qual o impacto financeiro e operacional de cada hora de inatividade, e quais são os RTO e RPO aceitáveis para cada sistema.' },
      { title: 'Arquitetura do ambiente de DR', desc: 'Desenhamos o ambiente de failover — cloud (OCI, Azure, AWS), colocation ou segundo datacenter — com replicação de dados, configuração de rede e procedimentos de ativação.' },
      { title: 'Implantação e documentação', desc: 'Implementamos a infraestrutura, configuramos a replicação, documentamos todos os runbooks de failover e failback, e treinamos a equipe para executar os procedimentos.' },
      { title: 'Simulações e melhoria contínua', desc: 'Realizamos simulações de failover completas (ao menos anuais), com relatório de resultado, tempo de recuperação medido e lista de melhorias identificadas.' },
    ],
  },

  benefits: [
    { title: 'RTO e RPO medidos, não estimados', desc: 'Simulações reais revelam o tempo de recuperação verdadeiro — antes de um incidente real.' },
    { title: 'Cobertura para ransomware', desc: 'Procedimentos específicos para o cenário mais comum: isolamento, restore limpo, verificação.' },
    { title: 'Custo de DR reduzido', desc: 'Cloud como DR site elimina infraestrutura ociosa em segundo datacenter.' },
    { title: 'Conformidade e auditoria', desc: 'Documentação completa e simulações periódicas para requisitos regulatórios e seguros.' },
  ],

  deliverables: [
    'Relatório de Business Impact Analysis (BIA)',
    'Documento de arquitetura de Disaster Recovery',
    'Runbooks de failover e failback por sistema',
    'Plano de comunicação em crises',
    'Relatório de simulação de DR',
    'Política de testes periódicos',
    'Roadmap evolutivo do plano de DR',
  ],

  differentials: [
    { title: 'DR testado — não apenas planejado', desc: 'Realizamos simulações reais de failover. Você sabe exatamente qual é o seu RTO real, não o estimado. Relatório documentado após cada simulação.' },
    { title: 'Cobertura para ransomware', desc: 'Procedimentos específicos para o cenário mais comum atualmente: isolamento, identificação do ponto de recuperação limpo e restore seguro sem reinfecção.' },
    { title: 'Integração com Business Continuity', desc: 'O plano de DR é parte do plano maior de Business Continuity. Abrange não apenas TI, mas impacto operacional e gestão de crise.' },
    { title: 'Flexibilidade de ambiente de failover', desc: 'Usamos cloud (OCI, Azure, AWS), colocation ou segundo datacenter — a solução que faz sentido para o seu porte, criticidade e budget.' },
  ],

  faqs,
  schemas: [
    serviceSchema('Disaster Recovery', 'Plano de Disaster Recovery testado e documentado, com RTO e RPO garantidos. Simulações periódicas e cobertura para ransomware.', 'Disaster Recovery Planning'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Disaster Recovery', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}
