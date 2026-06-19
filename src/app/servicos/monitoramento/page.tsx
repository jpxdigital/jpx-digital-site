import type { Metadata } from 'next'
import { ServiceLayout } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'monitoramento'

const faqs = [
  {
    question: 'Qual a diferença entre monitoramento e observabilidade?',
    answer: 'Monitoramento tradicional responde "o que está errado?": coleta métricas predefinidas (CPU, memória, disco) e dispara alertas quando thresholds são atingidos. Observabilidade vai além: logs, métricas e traces juntos respondem "por que está errado?" — permitindo depurar problemas que você não antecipou. Em ambientes modernos, as duas práticas são complementares.',
  },
  {
    question: 'Zabbix ou Grafana+Prometheus — qual escolher?',
    answer: 'Zabbix é uma solução monolítica completa, ótima para monitoramento de infraestrutura clássica (servidores, switches, UPS) com agentes nativos e SNMP. Grafana + Prometheus é mais flexível, se encaixa melhor em ambientes cloud-native e containerizados, e tem ecossistema de exporters muito rico. Para ambientes mistos (VMs + K8s), frequentemente usamos os dois.',
  },
  {
    question: 'Como calcular SLA e disponibilidade com monitoramento?',
    answer: 'Com dados de uptime coletados continuamente, calculamos disponibilidade mensal, trimestral e anual por serviço. Um dashboard de SLA mostra o tempo fora do ar, o impacto por serviço e a tendência. Isso é a base para SLAs contratuais com clientes e para priorização de investimentos em infraestrutura.',
  },
  {
    question: 'Como evitar o volume excessivo de alertas (alert fatigue)?',
    answer: 'Alert fatigue é quando a equipe para de reagir aos alertas porque há muitos falsos positivos. Corrigimos isso: revisamos todos os alertas existentes, eliminamos os redundantes, ajustamos thresholds com base em dados históricos, configuramos severidades corretas (crítico vs. aviso) e implementamos silenciamento de alertas durante janelas de manutenção.',
  },
  {
    question: 'O monitoramento cobre ambientes cloud e on-prem ao mesmo tempo?',
    answer: 'Sim. Implementamos monitoramento unificado para ambientes híbridos: servidores físicos, VMs, cloud (OCI, Azure, AWS), containers, bancos de dados, aplicações e dispositivos de rede — tudo em um único painel. Métricas de cloud são coletadas via API dos provedores, sem necessidade de agente.',
  },
]

export const metadata: Metadata = {
  title: 'Monitoramento de Infraestrutura — Zabbix, Grafana e Prometheus',
  description:
    'Monitoramento de infraestrutura com Zabbix, Grafana e Prometheus. Alertas inteligentes, dashboards e observabilidade para ambientes híbridos. Assessment gratuito.',
  keywords: ['monitoramento de infraestrutura', 'zabbix consultoria', 'grafana prometheus', 'observabilidade ti', 'monitoramento cloud on-prem'],
  openGraph: { title: 'Monitoramento de Infraestrutura | JPX Digital', description: 'Zabbix, Grafana e Prometheus para visibilidade total do seu ambiente.', url: `${BASE}/servicos/${slug}` },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const content = {
  slug,
  category: 'Gestão & Consultoria',
  heroHeadline: 'Monitoramento de Infraestrutura — Visibilidade Total Antes que o Problema Vire Incidente.',
  heroSub: 'Você não deveria descobrir que um servidor caiu pelo usuário ligando. Monitoramento proativo significa saber antes — e resolver antes do impacto.',
  intro: [
    'Infraestrutura sem monitoramento é infraestrutura gerenciada no escuro. Falhas de disco, memória esgotada, serviços caindo silenciosamente — sem visibilidade, você descobre quando o usuário já está impactado.',
    'A JPX Digital implementa stacks de monitoramento completas com Zabbix, Grafana, Prometheus e Loki para ambientes híbridos (on-prem + cloud). Dashboards executivos, alertas com severidade correta e runbooks para cada tipo de incidente.',
    'Além do monitoramento de infraestrutura, implementamos observabilidade de aplicações: logs estruturados, rastreamento de erros e métricas de SLA por serviço. Você sabe exatamente o que está acontecendo no seu ambiente a qualquer momento.',
  ],
  howTitle: 'Como implementamos monitoramento',
  howSteps: [
    { title: 'Inventário e definição de cobertura', desc: 'Mapeamos todos os componentes do ambiente: servidores, VMs, containers, bancos de dados, dispositivos de rede, aplicações e serviços cloud. Definimos o que monitorar em cada componente e quais métricas são realmente relevantes.' },
    { title: 'Implantação e configuração de agentes', desc: 'Instalamos e configuramos agentes (Zabbix Agent, Node Exporter, outros exporters) ou integramos via API de cloud. Configuramos coleta de métricas, logs e, onde aplicável, traces de aplicação.' },
    { title: 'Alertas e runbooks', desc: 'Configuramos alertas com thresholds baseados em dados históricos (não em valores arbitrários), severidades corretas e canais de notificação (e-mail, Slack, PagerDuty). Para cada alerta crítico, criamos runbook com procedimento de resolução.' },
    { title: 'Dashboards e relatórios', desc: 'Criamos dashboards no Grafana: operacional (equipe técnica) e executivo (SLA, disponibilidade, tendências). Configuramos relatórios automáticos mensais com métricas de disponibilidade por serviço.' },
  ],
  differentials: [
    { title: 'Alertas que significam algo', desc: 'Revisamos e eliminamos alertas redundantes ou de baixo valor. Cada alerta que chega significa que algo requer atenção — sem ruído que leva à fadiga de alertas.' },
    { title: 'Cobertura híbrida unificada', desc: 'On-prem, cloud, containers e aplicações em um único painel. Você não precisa verificar 4 ferramentas diferentes para ter visibilidade do ambiente.' },
    { title: 'Runbooks para cada incidente', desc: 'Cada alerta crítico tem um runbook: o que verificar, quem acionar e como resolver. Mesmo um analista júnior sabe o que fazer quando o alerta dispara.' },
    { title: 'Métricas de SLA por serviço', desc: 'Calculamos disponibilidade mensal e anual por serviço. Isso sustenta SLAs contratuais com clientes e priorização de investimentos em infraestrutura.' },
  ],
  faqs,
  schemas: [
    serviceSchema('Monitoramento de Infraestrutura', 'Monitoramento com Zabbix, Grafana e Prometheus para ambientes híbridos. Alertas, dashboards e observabilidade.', 'IT Management Service'),
    breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Monitoramento', item: `${BASE}/servicos/${slug}` }]),
    faqPageSchema(faqs),
  ],
}

export default function Page() { return <ServiceLayout content={content} /> }
