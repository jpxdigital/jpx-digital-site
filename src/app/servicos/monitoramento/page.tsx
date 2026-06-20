import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'monitoramento'

const faqs = [
  {
    question: 'Qual a diferença entre monitoramento e observabilidade?',
    answer: 'Monitoramento responde "o que está errado?": coleta métricas predefinidas e dispara alertas. Observabilidade vai além: logs, métricas e traces juntos respondem "por que está errado?" — permitindo depurar problemas que você não antecipou. Em ambientes modernos, as duas práticas são complementares.',
  },
  {
    question: 'Zabbix ou Grafana+Prometheus — qual escolher?',
    answer: 'Zabbix é uma solução monolítica completa, ótima para infraestrutura clássica com agentes nativos e SNMP. Grafana + Prometheus é mais flexível para ambientes cloud-native e containerizados. Para ambientes mistos (VMs + K8s), frequentemente usamos os dois.',
  },
  {
    question: 'Como calcular SLA e disponibilidade com monitoramento?',
    answer: 'Com dados de uptime coletados continuamente, calculamos disponibilidade mensal, trimestral e anual por serviço. Um dashboard de SLA mostra o tempo fora do ar, o impacto por serviço e a tendência — base para SLAs contratuais e priorização de investimentos.',
  },
  {
    question: 'Como evitar o volume excessivo de alertas (alert fatigue)?',
    answer: 'Revisamos todos os alertas existentes, eliminamos os redundantes, ajustamos thresholds com base em dados históricos, configuramos severidades corretas e implementamos silenciamento durante janelas de manutenção.',
  },
  {
    question: 'O monitoramento cobre ambientes cloud e on-prem ao mesmo tempo?',
    answer: 'Sim. Implementamos monitoramento unificado para ambientes híbridos: servidores físicos, VMs, cloud (OCI, Azure, AWS), containers, bancos de dados e dispositivos de rede — tudo em um único painel.',
  },
]

export const metadata: Metadata = {
  title: 'Monitoramento de Infraestrutura — Zabbix, Grafana e Prometheus',
  description: 'Monitoramento de infraestrutura com Zabbix, Grafana e Prometheus. Alertas inteligentes, dashboards e observabilidade para ambientes híbridos.',
  keywords: ['monitoramento de infraestrutura', 'zabbix consultoria', 'grafana prometheus', 'observabilidade ti', 'monitoramento cloud on-prem'],
  openGraph: { title: 'Monitoramento de Infraestrutura | JPX Digital', description: 'Zabbix, Grafana e Prometheus para visibilidade total do seu ambiente.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content: ServicePageContent = {
  slug,
  category: 'Gestão & Consultoria',
  heroHeadline: 'Monitoramento de Infraestrutura — Visibilidade Total Antes que o Problema Vire Incidente.',
  heroSub: 'Você não deveria descobrir que um servidor caiu pelo usuário ligando. Monitoramento proativo significa saber antes — e resolver antes do impacto.',
  ctaLabel: 'Solicitar Monitoring Readiness Assessment',

  problem: {
    headline: 'Você não pode gerenciar o que não monitora. E não pode confiar no que não alerta.',
    body: [
      'Infraestrutura sem monitoramento é infraestrutura gerenciada no escuro. Falhas de disco, memória esgotada, serviços caindo silenciosamente — sem visibilidade, você descobre quando o usuário já está impactado.',
      'O problema não é a ausência de ferramentas — é a ausência de estratégia. Alertas configurados com thresholds arbitrários que disparam centenas de notificações irrelevantes levam ao mesmo resultado: a equipe para de reagir.',
      'A JPX Digital implementa stacks de monitoramento completas com Zabbix, Grafana e Prometheus para ambientes híbridos. Alertas que significam algo, dashboards que comunicam e runbooks para cada tipo de incidente.',
    ],
  },

  assessment: {
    name: 'Monitoring Readiness Assessment',
    body: 'Mapeamos todos os componentes do ambiente, avaliamos o monitoramento atual (se existir), identificamos gaps de visibilidade e entregamos um plano de cobertura com as métricas que realmente importam para cada sistema.',
    checklist: [
      'Inventário completo de sistemas a monitorar',
      'Avaliação do monitoramento atual e gaps de cobertura',
      'Definição de métricas relevantes por sistema',
      'Identificação de alertas críticos ausentes',
      'Proposta de stack de monitoramento e dashboards',
    ],
  },

  process: {
    title: 'Como implementamos monitoramento',
    steps: [
      { title: 'Inventário e definição de cobertura', desc: 'Mapeamos todos os componentes do ambiente: servidores, VMs, containers, bancos de dados, dispositivos de rede e serviços cloud. Definimos o que monitorar em cada componente e quais métricas são realmente relevantes.' },
      { title: 'Implantação e configuração de agentes', desc: 'Instalamos e configuramos agentes (Zabbix Agent, Node Exporter, outros exporters) ou integramos via API de cloud. Configuramos coleta de métricas, logs e traces.' },
      { title: 'Alertas e runbooks', desc: 'Configuramos alertas com thresholds baseados em dados históricos, severidades corretas e canais de notificação. Para cada alerta crítico, criamos runbook com procedimento de resolução.' },
      { title: 'Dashboards e relatórios', desc: 'Dashboards Grafana operacionais e executivos (SLA, disponibilidade, tendências). Relatórios automáticos mensais com métricas de disponibilidade por serviço.' },
    ],
  },

  benefits: [
    { title: 'Problema detectado antes do impacto', desc: 'Disco se enchendo, memória alta, serviço degradado — você sabe antes do usuário reclamar.' },
    { title: 'Alertas sem ruído', desc: 'Thresholds baseados em dados históricos. Cada alerta recebido significa que algo requer atenção.' },
    { title: 'Visibilidade executiva', desc: 'Dashboards de SLA e disponibilidade por serviço. Evidência de que a TI está funcionando.' },
    { title: 'Cobertura híbrida unificada', desc: 'On-prem, cloud, containers e aplicações em um único painel.' },
  ],

  deliverables: [
    'Relatório de Monitoring Readiness Assessment',
    'Stack de monitoramento implantada e documentada',
    'Alertas configurados com runbooks por incidente',
    'Dashboard operacional (equipe técnica)',
    'Dashboard executivo (SLA e disponibilidade)',
    'Relatório automático mensal de disponibilidade',
    'Documentação de thresholds e políticas de alerta',
  ],

  differentials: [
    { title: 'Alertas que significam algo', desc: 'Eliminamos alertas redundantes e de baixo valor. Cada alerta recebido requer atenção — sem fadiga de alertas.' },
    { title: 'Cobertura híbrida unificada', desc: 'On-prem, cloud, containers e aplicações em um único painel. Sem precisar verificar 4 ferramentas diferentes.' },
    { title: 'Runbooks para cada incidente', desc: 'Cada alerta crítico tem um runbook: o que verificar, quem acionar e como resolver.' },
    { title: 'Métricas de SLA por serviço', desc: 'Disponibilidade mensal e anual por serviço. Base para SLAs contratuais e priorização de investimentos.' },
  ],

  faqs,
  schemas: [
    serviceSchema('Monitoramento de Infraestrutura', 'Monitoramento com Zabbix, Grafana e Prometheus para ambientes híbridos. Alertas, dashboards e observabilidade.', 'IT Management Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Monitoramento', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() {
  return <ServiceLayout content={content} />
}
