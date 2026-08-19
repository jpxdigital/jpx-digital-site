import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/segments/hospitais-clinicas.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'TI para Hospitais e Clínicas — LGPD, Backup e Alta Disponibilidade',
  description: 'Infraestrutura de TI especializada para hospitais e clínicas: LGPD na saúde, backup de prontuários, alta disponibilidade e Disaster Recovery.',
  keywords: ['TI para hospitais', 'LGPD saúde', 'backup prontuário eletrônico', 'disaster recovery hospital', 'segurança de dados médicos'],
  openGraph: { title: 'TI para Hospitais e Clínicas | JPX Digital', description: 'LGPD, backup de prontuários e alta disponibilidade para saúde.', url: `${BASE}/segmentos/${data.slug}` },
  alternates: { canonical: `${BASE}/segmentos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('TI para Hospitais e Clínicas', 'Infraestrutura de TI especializada para saúde: LGPD, backup de prontuários, alta disponibilidade e Disaster Recovery.', 'Healthcare IT Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Segmentos', item: `${BASE}/segmentos` }, { name: 'Hospitais e Clínicas', item: `${BASE}/segmentos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
