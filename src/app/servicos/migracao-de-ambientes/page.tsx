import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'migracao-de-ambientes'

const faqs = [
  {
    question: 'Qual é o maior risco em uma migração de ambiente?',
    answer: 'Perda ou corrupção de dados, downtime não planejado e falhas descobertas após o cutover (quando o ambiente antigo já foi desligado). Mitigamos com: ambiente destino completamente testado antes do cutover, rollback plan definido para cada etapa e período de coexistência até validação completa.',
  },
  {
    question: 'Quanto tempo leva uma migração para cloud?',
    answer: 'Uma migração simples de 5-10 servidores pode ser feita em 2-4 semanas. Ambientes maiores com bancos de dados críticos e aplicações legadas podem levar 3-6 meses em projeto estruturado. O que define o prazo é a quantidade de testes necessários e as janelas de manutenção disponíveis.',
  },
  {
    question: 'O que é lift and shift e quando não é suficiente?',
    answer: 'Lift and shift migra o sistema exatamente como está, sem refatorar. É a abordagem mais rápida. Quando não é suficiente: aplicações projetadas para servidores físicos podem ter performance ruim em cloud sem otimização, e algumas arquiteturas não aproveitam os benefícios da cloud sem alguma refatoração.',
  },
  {
    question: 'Como migrar bancos de dados com mínimo de downtime?',
    answer: 'Utilizamos replicação de banco de dados para sincronizar o banco de origem com o destino continuamente. No momento do cutover, apenas as transações das últimas horas precisam ser sincronizadas — reduzindo o downtime a minutos.',
  },
  {
    question: 'A migração afeta os usuários durante o processo?',
    answer: 'Com planejamento adequado, o impacto é mínimo. A migração ocorre em ambiente paralelo, sem afetar o sistema em produção. O impacto se concentra no cutover — uma janela de manutenção planejada, fora do horário de pico, com duração definida e comunicada antecipadamente.',
  },
]

export const metadata: Metadata = {
  title: 'Migração de Ambientes — On-premise para Cloud e Data Center',
  description: 'Migração de ambientes de TI para cloud (OCI, Azure, AWS) ou data center. Lift and shift, migração de bancos de dados e cutover com mínimo de downtime.',
  keywords: ['migração para cloud', 'migração de servidores', 'lift and shift brasil', 'migração para OCI Azure AWS', 'migração de data center'],
  openGraph: { title: 'Migração de Ambientes | JPX Digital', description: 'Migração para cloud e data center com mínimo de downtime e rollback planejado.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content: ServicePageContent = {
  slug,
  category: 'Infraestrutura',
  heroHeadline: 'Migração de Ambientes — On-premise para Cloud ou Data Center com Risco Controlado.',
  heroSub: 'Migração não é só mover dados. É garantir que a operação continue funcionando durante e após a transição, com plano de rollback para cada etapa.',
  ctaLabel: 'Solicitar Migration Readiness Assessment',

  problem: {
    headline: 'Migrar não é copiar e colar. É redesenhar o ambiente para funcionar melhor no destino — sem parar a operação no processo.',
    body: [
      'Migração de ambiente é um dos projetos de maior risco em TI corporativa. Dados críticos, aplicações com dependências complexas e usuários que dependem dos sistemas no dia a dia — tudo isso precisa ser migrado sem perda de dados, sem interrupção não planejada e sem surpresas no ambiente destino.',
      'O risco mais comum não é a execução técnica — é o planejamento insuficiente. Dependências não mapeadas, rollback não testado, ambiente destino validado apenas na teoria. A migração acontece e as surpresas aparecem.',
      'A JPX Digital conduz migrações para cloud e entre data centers com metodologia estruturada: discovery completo, planejamento de fases, testes extensivos no ambiente destino antes do cutover e período de coexistência para validação.',
    ],
  },

  assessment: {
    name: 'Migration Readiness Assessment',
    body: 'Mapeamos todos os sistemas, suas dependências, fluxos de dados e riscos de migração. Identificamos o que pode ser migrado em paralelo, o que requer sequência específica e o que deve permanecer on-premise. Entregamos um plano detalhado com cronograma, riscos e rollback strategy.',
    checklist: [
      'Inventário completo de sistemas e dependências',
      'Análise de risco por workload',
      'Definição de sequência de migração por dependência',
      'Estimativa de downtime por fase',
      'Proposta de plano de migração com cronograma e rollback',
    ],
  },

  process: {
    title: 'Nossa metodologia de migração',
    steps: [
      { title: 'Discovery e análise de dependências', desc: 'Mapeamos todos os sistemas, suas dependências e fluxos de dados. Identificamos o que pode ser migrado em paralelo e o que requer sequência específica.' },
      { title: 'Planejamento de fases e rollback', desc: 'Dividimos a migração em fases por criticidade. Para cada fase, documentamos o rollback plan — como voltar ao estado anterior se algo não funcionar. Sem rollback planejado, não fazemos cutover.' },
      { title: 'Preparação e teste do ambiente destino', desc: 'Preparamos o ambiente destino completamente antes do cutover. Realizamos testes funcionais completos de cada aplicação. Só avançamos para o cutover quando o ambiente destino está validado.' },
      { title: 'Cutover e período de validação', desc: 'Executamos o cutover em janela de manutenção planejada. Mantemos o ambiente de origem disponível para rollback. Monitoramento intensivo nas primeiras 72 horas.' },
    ],
  },

  benefits: [
    { title: 'Risco controlado', desc: 'Rollback planejado e testado em cada fase. Você nunca fica preso em um estado sem saída.' },
    { title: 'Mínimo de downtime', desc: 'Replicação contínua durante a migração reduz o downtime de cutover a minutos.' },
    { title: 'Ambiente validado antes do corte', desc: 'O destino é testado funcionalmente antes do cutover — sem surpresas em produção.' },
    { title: 'Cobertura multi-cloud', desc: 'OCI Application Migration, Azure Migrate, AWS MGN — a ferramenta certa para cada provedor.' },
  ],

  deliverables: [
    'Relatório de Migration Readiness Assessment',
    'Mapa de dependências dos sistemas',
    'Plano de migração por fases com cronograma',
    'Rollback plan documentado por fase',
    'Runbook de cutover',
    'Relatório de testes do ambiente destino',
    'Relatório pós-migração e validação',
  ],

  differentials: [
    { title: 'Rollback em cada etapa', desc: 'Antes de qualquer cutover, o rollback está definido e testado. Você sabe exatamente como voltar ao estado anterior.' },
    { title: 'Ambiente destino testado antes do cutover', desc: 'Não fazemos cutover às cegas. Aplicações rodando, integrações validadas, performance verificada — antes de qualquer migração de produção.' },
    { title: 'Expertise multi-cloud', desc: 'OCI, Azure e AWS têm ferramentas de migração específicas. Usamos as ferramentas certas para cada provedor e workload.' },
    { title: 'Comunicação transparente', desc: 'Relatório de progresso semanal, comunicação proativa de riscos e janelas de manutenção documentadas e aprovadas antes da execução.' },
  ],

  faqs,
  schemas: [
    serviceSchema('Migração de Ambientes', 'Migração de servidores e aplicações para cloud (OCI, Azure, AWS) com metodologia estruturada e rollback planejado.', 'IT Migration Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Migração de Ambientes', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}
