import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/suporte-gerenciado.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Suporte Gerenciado de TI — MSP para Empresas',
  description: 'Suporte gerenciado de TI (MSP) com monitoramento proativo, gestão de patches, backup e SLA definido. TI estável e previsível sem contratar equipe interna.',
  keywords: ['suporte gerenciado TI', 'MSP brasil', 'managed service provider', 'suporte ti mensal', 'terceirização de ti'],
  openGraph: { title: 'Suporte Gerenciado de TI | JPX Digital', description: 'MSP com monitoramento, patches, backup e SLA para sua infraestrutura.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Suporte Gerenciado de TI', 'Managed Services (MSP) com monitoramento proativo, gestão de patches, backup e SLA para empresas.', 'IT Management Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Suporte Gerenciado', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
