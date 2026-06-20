import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'finops'

const faqs = [
  {
    question: 'O que é FinOps e por que minha empresa precisa?',
    answer: 'FinOps é a prática de trazer responsabilidade financeira ao modelo variável de gasto em cloud. Combina sistemas, melhores práticas e cultura para dar a equipes de engenharia e negócios visibilidade e controle sobre os custos. Empresas sem FinOps frequentemente gastam 30-40% mais do que precisariam.',
  },
  {
    question: 'Quanto posso economizar com FinOps?',
    answer: 'Em ambientes sem governança de custo, economias de 20-40% são comuns logo nas primeiras análises — apenas com rightsizing, desligamento de recursos ociosos e uso de instâncias reservadas. Em ambientes já otimizados, 10-20% ainda é alcançável com técnicas mais avançadas.',
  },
  {
    question: 'FinOps só serve para grandes empresas?',
    answer: 'Não. Qualquer empresa com fatura de cloud acima de R$ 5.000/mês se beneficia de práticas FinOps. A escala muda as ferramentas, mas os princípios — visibilidade, accountability e otimização — se aplicam a todos os tamanhos.',
  },
  {
    question: 'FinOps conflita com performance e disponibilidade?',
    answer: 'Quando bem executado, não. A premissa é gastar de forma inteligente — não simplesmente cortar recursos. Rightsizing significa usar o tamanho correto de instância, não o menor possível. O objetivo é eliminar desperdício, não performance.',
  },
  {
    question: 'Como funciona a governança de custo em multi-cloud?',
    answer: 'Em ambientes multi-cloud, implementamos tagging consistente entre provedores, visibilidade unificada de custo e políticas de gasto por ambiente e equipe. É mais complexo, mas gerenciável com a estrutura correta.',
  },
]

export const metadata: Metadata = {
  title: 'FinOps — Otimização de Custos em Cloud',
  description: 'FinOps para empresas: reduza gastos em OCI, Azure e AWS sem sacrificar performance. Rightsizing, instâncias reservadas e governança de custo.',
  keywords: ['FinOps', 'otimização de custos cloud', 'FinOps brasil', 'cloud cost optimization', 'reduzir custos cloud'],
  openGraph: { title: 'FinOps — Otimização de Custos em Cloud | JPX Digital', description: 'Reduza gastos em cloud sem sacrificar performance. FinOps em OCI, Azure e AWS.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content: ServicePageContent = {
  slug,
  category: 'Cloud Computing',
  heroHeadline: 'FinOps — Reduza seus Gastos em Cloud sem Sacrificar Performance ou Disponibilidade.',
  heroSub: 'A maioria dos ambientes cloud gasta 30-40% mais do que deveria. FinOps corrige isso com dados, não com chute.',
  ctaLabel: 'Solicitar Auditoria de Custos Cloud',

  problem: {
    headline: 'O problema não é usar cloud. É pagar por recursos que não geram valor.',
    body: [
      'Cloud computing tem um modelo de gasto diferente do on-premise: sem planejamento financeiro adequado, os custos crescem de forma invisível e acelerada. Recursos esquecidos ligados, instâncias superdimensionadas, armazenamento antigo nunca deletado.',
      'FinOps não é cortar recursos — é gastar o valor correto para cada workload, com visibilidade e previsibilidade. A diferença entre um ambiente cloud eficiente e um que sangra dinheiro é governance, não tecnologia.',
      'A JPX Digital implementa práticas FinOps em OCI, Azure e AWS: da auditoria inicial de desperdício à governança contínua com dashboards, alertas e revisão mensal de otimização.',
    ],
  },

  assessment: {
    name: 'Cloud Cost Readiness Assessment',
    body: 'Analisamos toda a fatura cloud: recursos ociosos, instâncias superdimensionadas, storage não utilizado, snapshots antigos, transferência de dados e licenças não otimizadas. Entregamos relatório com potencial de economia quantificado — antes de qualquer compromisso.',
    checklist: [
      'Auditoria completa da fatura cloud atual',
      'Identificação de recursos ociosos e superdimensionados',
      'Análise de elegibilidade para Reserved Instances e Savings Plans',
      'Avaliação da estrutura de tags e organização de custo',
      'Relatório com potencial de economia quantificado',
    ],
  },

  process: {
    title: 'Nossa abordagem FinOps',
    steps: [
      { title: 'Auditoria de custos e desperdício', desc: 'Analisamos toda a fatura cloud: recursos ociosos, instâncias superdimensionadas, storage não utilizado, snapshots antigos e licenças não otimizadas. Entregamos relatório com potencial de economia quantificado.' },
      { title: 'Rightsizing e eliminação de ociosidade', desc: 'Redimensionamos instâncias baseados em métricas reais de CPU, memória e I/O. Desligamos recursos fora de uso. Configuramos agendamentos de start/stop para ambientes de desenvolvimento.' },
      { title: 'Reservas e compromissos de longo prazo', desc: 'Para workloads estáveis, avaliamos Reserved Instances (AWS), Savings Plans (AWS/Azure) e Compute Reservations (OCI). Economia de 30-60% em relação ao preço on-demand.' },
      { title: 'Governança contínua', desc: 'Tags de custo por projeto, alertas de budget, políticas de aprovação para recursos acima de determinado custo e revisão mensal com relatório executivo de tendências.' },
    ],
  },

  benefits: [
    { title: 'Economia imediata', desc: 'Potencial de 20-40% de redução na fatura logo nas primeiras ações de rightsizing e eliminação de ociosidade.' },
    { title: 'Previsibilidade', desc: 'Budget por equipe, alertas de desvio e relatório mensal. A fatura deixa de ser surpresa.' },
    { title: 'Visibilidade por área', desc: 'Tags de custo e dashboards por projeto e equipe. Cada área sabe quanto gasta em cloud.' },
    { title: 'Governança duradoura', desc: 'Processos e ferramentas que mantêm o custo controlado — não uma otimização pontual que se desfaz em 3 meses.' },
  ],

  deliverables: [
    'Relatório de auditoria de custos cloud',
    'Plano de rightsizing com estimativa de economia',
    'Recomendação de Reserved Instances / Savings Plans',
    'Política de tags e organização de recursos',
    'Dashboard de custos configurado',
    'Alertas de budget por projeto e ambiente',
    'Relatório executivo mensal de FinOps',
  ],

  differentials: [
    { title: 'Auditoria inicial com economia quantificada', desc: 'Antes de propor qualquer trabalho, entregamos um relatório mostrando exatamente quanto você pode economizar e como. Você decide com números na mão.' },
    { title: 'Expertise multi-cloud', desc: 'OCI, Azure e AWS têm modelos de precificação diferentes. Nossa equipe conhece as nuances de cada um e aplica a estratégia correta por provedor.' },
    { title: 'FinOps sem cortar o que importa', desc: 'Identificamos desperdício sem comprometer SLA, performance ou disponibilidade. A premissa é gastar de forma inteligente — não simplesmente gastar menos.' },
    { title: 'Governança que se mantém', desc: 'Implementamos processos e ferramentas que mantêm o custo controlado continuamente — não uma ação pontual que se desfaz em 3 meses.' },
  ],

  faqs,
  schemas: [
    serviceSchema('FinOps', 'Otimização e governança de custos cloud em OCI, Azure e AWS. Rightsizing, reservas e visibilidade de gasto.', 'Financial Operations Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'FinOps', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}
