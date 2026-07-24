import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/backup-rmm.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Backup & RMM Gerenciado — Acronis ou Datto',
  description: 'Backup de imagem e M365, monitoramento remoto (RMM), EDR, antivírus, filtragem de URL e patch management — gerenciados pela JPX Digital com Acronis ou Datto.',
  keywords: ['backup rmm gerenciado', 'backup corporativo', 'rмм brasil', 'acronis backup', 'datto rmm', 'backup microsoft 365', 'edr endpoint', 'patch management'],
  openGraph: { title: 'Backup & RMM Gerenciado | JPX Digital', description: 'Backup, RMM, EDR e patch management em um único serviço gerenciado — Acronis ou Datto conforme o ambiente.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Backup & RMM Gerenciado', 'Backup de imagem e M365, RMM, EDR, antivírus, filtragem de URL e patch management gerenciados centralmente com Acronis ou Datto.', 'IT Security Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Backup & RMM', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
