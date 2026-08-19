import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/monitoramento.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Monitoramento de Infraestrutura — Zabbix, Grafana e Prometheus',
  description: 'Monitoramento de infraestrutura com Zabbix, Grafana e Prometheus. Alertas inteligentes, dashboards e observabilidade para ambientes híbridos.',
  keywords: ['monitoramento de infraestrutura', 'zabbix consultoria', 'grafana prometheus', 'observabilidade ti', 'monitoramento cloud on-prem'],
  openGraph: { title: 'Monitoramento de Infraestrutura | JPX Digital', description: 'Zabbix, Grafana e Prometheus para visibilidade total do seu ambiente.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Monitoramento de Infraestrutura', 'Monitoramento com Zabbix, Grafana e Prometheus para ambientes híbridos. Alertas, dashboards e observabilidade.', 'IT Management Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Monitoramento', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
