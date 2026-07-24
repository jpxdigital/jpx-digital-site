import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/acronis.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Acronis Cyber Protect — Backup, EDR e Patch Management',
  description: 'Implementação e gestão do Acronis Cyber Protect: backup de imagem e M365, EDR, antivírus, filtragem de URL e gerenciamento de patches em um único agente.',
  keywords: ['acronis cyber protect', 'acronis backup corporativo', 'acronis edr', 'acronis patch management', 'acronis instant restore', 'backup microsoft 365 acronis'],
  openGraph: { title: 'Acronis Cyber Protect | JPX Digital', description: 'Backup, EDR, antivírus, filtragem de URL e patch management em um único console — gerenciado pela JPX Digital.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Acronis Cyber Protect', 'Backup de imagem e M365, EDR, antivírus, filtragem de URL e gerenciamento de patches em um único agente gerenciado centralmente.', 'IT Security Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Acronis Cyber Protect', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
