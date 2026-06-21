import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/segments/industrias.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'TI para Indústrias — Integração ERP, Segurança OT e Alta Disponibilidade',
  description: 'Infraestrutura de TI para indústrias: integração ERP, segurança de redes OT, backup de sistemas de controle e alta disponibilidade para produção.',
  keywords: ['TI para indústrias', 'segurança rede OT', 'integração ERP industrial', 'backup SCADA', 'TI industrial brasil'],
  openGraph: { title: 'TI para Indústrias | JPX Digital', description: 'Integração ERP, segurança OT e alta disponibilidade para ambientes industriais.', url: `${BASE}/segmentos/${data.slug}` },
  alternates: { canonical: `${BASE}/segmentos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('TI para Indústrias', 'Infraestrutura de TI para ambientes industriais: integração ERP, segurança OT e alta disponibilidade para produção.', 'Industrial IT Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Segmentos', item: `${BASE}/segmentos` }, { name: 'Indústrias', item: `${BASE}/segmentos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
