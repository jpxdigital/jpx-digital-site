import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'migracao-de-ambientes'

const faqs = [
  {
    question: 'Qual é o maior risco em uma migração de ambiente?',
    answer: 'Perda ou corrupção de dados, downtime não planejado e falhas que só são descobertas após o cutover (quando o ambiente antigo já foi desligado). Mitigamos esses riscos com: ambiente de destino completamente testado antes do cutover, rollback plan definido para cada etapa e período de coexistência em que os dois ambientes funcionam em paralelo até validação completa.',
  },
  {
    question: 'Quanto tempo leva uma migração para cloud?',
    answer: 'Depende do volume e complexidade. Uma migração simples de 5-10 servidores para cloud pode ser feita em 2-4 semanas. Ambientes maiores com bancos de dados críticos, aplicações legadas e integrações complexas podem levar 3-6 meses em um projeto estruturado com fases. O que define o prazo é principalmente a quantidade de testes necessários e as janelas de manutenção disponíveis.',
  },
  {
    question: 'O que é lift and shift e quando não é suficiente?',
    answer: 'Lift and shift migra o sistema exatamente como está — sem refatorar — para o novo ambiente. É a abordagem mais rápida e com menor risco técnico. Quando não é suficiente: aplicações projetadas para servidores físicos podem ter performance ruim em cloud sem otimização, e algumas arquiteturas não aproveitam os benefícios da cloud sem alguma refatoração.',
  },
  {
    question: 'Como migrar bancos de dados com mínimo de downtime?',
    answer: 'Utilizamos replicação de banco de dados para sincronizar o banco de origem com o destino continuamente durante a migração. No momento do cutover, apenas as transações das últimas horas precisam ser sincronizadas — reduzindo o downtime a minutos. Para zero downtime, técnicas como Change Data Capture (CDC) permitem cutover sem interrupção para alguns bancos.',
  },
  {
    question: 'A migração afeta os usuários durante o processo?',
    answer: 'Com planejamento adequado, o impacto nos usuários é mínimo. A migração ocorre em ambiente paralelo, sem afetar o sistema em produção. O impacto se concentra no cutover — geralmente uma janela de manutenção planejada, fora do horário de pico, com duração definida e comunicada antecipadamente.',
  },
]

export const metadata: Metadata = {
  title: 'Migração de Ambientes — On-premise para Cloud e Data Center',
  description:
    'Migração de ambientes de TI para cloud (OCI, Azure, AWS) ou data center. Lift and shift, migração de bancos de dados e cutover com mínimo de downtime. Assessment gratuito.',
  keywords: ['migração para cloud', 'migração de servidores', 'lift and shift brasil', 'migração para OCI Azure AWS', 'migração de data center'],
  openGraph: { title: 'Migração de Ambientes | JPX Digital', description: 'Migração para cloud e data center com mínimo de downtime e rollback planejado.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Infraestrutura',
  heroHeadline: 'Migração de Ambientes — On-premise para Cloud ou Data Center com Risco Controlado.',
  heroSub: 'Migração não é só mover dados. É garantir que a operação continue funcionando durante e após a transição, com plano de rollback para cada etapa.',
  intro: [
    'Migração de ambiente é um dos projetos de maior risco em TI corporativa. Dados críticos, aplicações com dependências complexas e usuários que dependem dos sistemas no dia a dia — tudo isso precisa ser migrado sem perda de dados, sem interrupção não planejada e sem surpresas no ambiente destino.',
    'A JPX Digital conduz migrações para cloud (Oracle OCI, Microsoft Azure, AWS) e entre data centers com metodologia estruturada: discovery completo, planejamento de fases, testes extensivos no ambiente destino antes do cutover e período de coexistência para validação.',
    'Nossa premissa é que o rollback deve estar disponível em cada etapa até a validação completa. Você nunca fica preso em um estado sem saída.',
  ],
  howTitle: 'Nossa metodologia de migração',
  howSteps: [
    { title: 'Discovery e análise de dependências', desc: 'Mapeamos todos os sistemas, suas dependências (aplicações que chamam aplicações, bancos de dados, serviços de rede) e os fluxos de dados. Identificamos o que pode ser migrado em paralelo e o que requer sequência específica por dependência.' },
    { title: 'Planejamento de fases e rollback', desc: 'Dividimos a migração em fases por criticidade e dependência. Para cada fase, documentamos o rollback plan — como voltar ao estado anterior se algo não funcionar. Sem rollback planejado, não fazemos cutover.' },
    { title: 'Preparação e teste do ambiente destino', desc: 'Preparamos o ambiente destino completamente antes do cutover: servidores, rede, storage, DNS, segurança, certificados. Realizamos testes funcionais completos de cada aplicação. Só avançamos para o cutover quando o ambiente destino está validado.' },
    { title: 'Cutover e período de validação', desc: 'Executamos o cutover em janela de manutenção planejada e comunicada. Mantemos o ambiente de origem disponível por um período pós-cutover para rollback caso necessário. Monitoramento intensivo nas primeiras 72 horas após a migração.' },
  ],
  differentials: [
    { title: 'Rollback em cada etapa', desc: 'Antes de qualquer cutover, o rollback está definido e testado. Você sabe exatamente como voltar ao estado anterior se algo não funcionar como esperado.' },
    { title: 'Ambiente destino testado antes do cutover', desc: 'Não fazemos cutover às cegas. O ambiente destino é testado funcionalmente — aplicações rodando, integrações validadas, performance verificada — antes de qualquer migração de produção.' },
    { title: 'Expertise multi-cloud', desc: 'OCI, Azure e AWS têm ferramentas de migração específicas (OCI Application Migration, Azure Migrate, AWS MGN). Usamos as ferramentas certas para cada provedor e workload.' },
    { title: 'Comunicação transparente', desc: 'Relatório de progresso semanal durante o projeto, comunicação proativa de riscos identificados e janelas de manutenção documentadas e aprovadas antes da execução.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Migração de Ambientes', 'Migração de servidores e aplicações para cloud (OCI, Azure, AWS) e data center com metodologia estruturada e rollback planejado.', 'IT Migration Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Migração de Ambientes', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }
