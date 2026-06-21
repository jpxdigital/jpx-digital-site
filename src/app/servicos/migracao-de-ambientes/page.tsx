import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/migracao-de-ambientes.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Migração de Ambientes — On-premise para Cloud e Data Center',
  description: 'Migração de ambientes de TI para cloud (OCI, Azure, AWS) ou data center. Lift and shift, migração de bancos de dados e cutover com mínimo de downtime.',
  keywords: ['migração para cloud', 'migração de servidores', 'lift and shift brasil', 'migração para OCI Azure AWS', 'migração de data center'],
  openGraph: { title: 'Migração de Ambientes | JPX Digital', description: 'Migração para cloud e data center com mínimo de downtime e rollback planejado.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Migração de Ambientes', 'Migração de servidores e aplicações para cloud (OCI, Azure, AWS) com metodologia estruturada e rollback planejado.', 'IT Migration Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Migração de Ambientes', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
