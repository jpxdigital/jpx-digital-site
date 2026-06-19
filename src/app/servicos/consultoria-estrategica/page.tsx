import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'consultoria-estrategica'

const faqs = [
  {
    question: 'O que é um assessment de infraestrutura de TI?',
    answer: 'Assessment é uma análise técnica e estratégica do ambiente de TI atual: inventário de sistemas, avaliação de riscos, identificação de gargalos e pontos de falha, análise de custos e uma visão objetiva do que está funcionando bem e do que precisa ser endereçado. O resultado é um relatório com diagnóstico e recomendações priorizadas — não uma lista de produtos para vender.',
  },
  {
    question: 'Como um CTO externo pode ajudar minha empresa?',
    answer: 'CTO as a Service é indicado para empresas que precisam de visão estratégica de TI sem o custo de um executivo full-time. O CTO externo participa de reuniões de diretoria, define o roadmap tecnológico, avalia decisões de arquitetura, gerencia fornecedores e garante que a TI está alinhada com os objetivos de negócio — sem o vínculo empregatício.',
  },
  {
    question: 'Qual é o retorno esperado de uma consultoria estratégica de TI?',
    answer: 'Depende do ponto de partida. Em empresas sem governança de TI estruturada, a consultoria frequentemente identifica gastos desnecessários (licenças não usadas, cloud não otimizado), riscos de segurança e gargalos de infraestrutura que custam mais do que o projeto de melhoria. O ROI em 12 meses costuma ser positivo apenas com as otimizações identificadas no assessment.',
  },
  {
    question: 'Como é elaborado um planejamento estratégico de TI?',
    answer: 'Começa com entendimento do negócio: planos de expansão, regulamentações do setor, restrições de orçamento, skills da equipe. A partir disso, construímos um roadmap de 2-3 anos com iniciativas priorizadas por impacto e custo, estimativas de investimento e indicadores de resultado. O planejamento é revisto anualmente.',
  },
  {
    question: 'A JPX Digital faz análise de segurança antes de recomendar soluções?',
    answer: 'Sempre. Qualquer engajamento de consultoria inclui uma análise de maturidade de segurança: controles existentes, lacunas, riscos críticos e roadmap de melhoria. Não recomendamos expansão de infraestrutura sem primeiro entender os riscos de segurança do ambiente atual.',
  },
]

export const metadata: Metadata = {
  title: 'Consultoria Estratégica de TI — Assessment e Planejamento',
  description:
    'Consultoria estratégica de TI: assessment de infraestrutura, planejamento tecnológico e CTO as a Service para empresas. Diagnóstico independente e recomendações priorizadas.',
  keywords: ['consultoria estratégica TI', 'assessment de infraestrutura', 'planejamento estratégico TI', 'CTO as a service', 'consultoria de tecnologia empresas'],
  openGraph: { title: 'Consultoria Estratégica de TI | JPX Digital', description: 'Assessment, planejamento tecnológico e CTO as a Service para empresas.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Gestão & Consultoria',
  heroHeadline: 'Consultoria Estratégica de TI — Diagnóstico Independente e Roadmap Tecnológico para o seu Negócio.',
  heroSub: 'Antes de decidir o que comprar ou construir, você precisa saber onde está. Um assessment honesto vale mais que qualquer proposta de solução.',
  intro: [
    'Decisões estratégicas de TI tomadas sem informação adequada custam caro. Infraestrutura comprada sem planejamento de capacidade, migração para cloud sem análise de TCO, contratação de plataformas que duplicam funcionalidades existentes — são erros comuns que um assessment independente evita.',
    'A JPX Digital oferece consultoria estratégica de TI: assessments de infraestrutura, planejamento tecnológico de longo prazo, análise de make-or-buy e CTO as a Service para empresas que precisam de liderança técnica executiva sem o custo de um executivo dedicado.',
    'Nossa premissa é independência: recomendamos o que é certo para o negócio do cliente, não o que é mais conveniente para vender. Muitas vezes a melhor recomendação é não mudar nada — e isso também é uma entrega de valor.',
  ],
  howTitle: 'Como conduzimos a consultoria estratégica',
  howSteps: [
    { title: 'Entendimento do negócio', desc: 'Antes de analisar a TI, entendemos o negócio: modelo de operação, planos de crescimento, restrições regulatórias, pressões competitivas e dependências de tecnologia. TI serve o negócio — a estratégia de TI começa pelo negócio.' },
    { title: 'Assessment técnico do ambiente atual', desc: 'Inventário de infraestrutura, análise de riscos (segurança, disponibilidade, capacidade), avaliação de custos atuais e mapeamento de dependências críticas. Entrevistas com equipe técnica e usuários-chave.' },
    { title: 'Diagnóstico e priorização', desc: 'Consolidamos os achados em um diagnóstico estruturado: o que está funcionando bem (e não precisa ser mudado), os riscos que precisam ser endereçados com urgência e as oportunidades de melhoria com melhor relação custo-benefício.' },
    { title: 'Roadmap e planejamento de capacidade', desc: 'Construímos o roadmap de TI: iniciativas priorizadas por impacto e custo, estimativas de investimento, cronograma e indicadores de resultado. O roadmap é um documento vivo — revisado periodicamente conforme o negócio evolui.' },
  ],
  differentials: [
    { title: 'Independência comercial real', desc: 'Não temos metas de venda de produto. A recomendação que fazemos é a que acreditamos ser correta para o cliente — mesmo que isso signifique não comprar nada por enquanto.' },
    { title: 'CTO as a Service', desc: 'Para empresas sem diretor de TI, atuamos como CTO externo: participamos de reuniões estratégicas, avaliamos decisões de arquitetura, gerenciamos fornecedores e representamos a TI junto à diretoria.' },
    { title: 'Diagnóstico antes da solução', desc: 'Nunca propomos uma solução sem primeiro entender o problema real. O assessment vem antes de qualquer proposta comercial de implementação.' },
    { title: 'Roadmap executável, não teórico', desc: 'O planejamento estratégico que entregamos tem prioridades, estimativas de custo e cronograma realistas — não uma lista de aspirações sem viabilidade.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Consultoria Estratégica de TI', 'Assessment de infraestrutura, planejamento tecnológico e CTO as a Service para empresas.', 'IT Consulting Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Consultoria Estratégica', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }
