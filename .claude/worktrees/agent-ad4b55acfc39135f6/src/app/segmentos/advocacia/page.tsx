import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/segments/advocacia.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'TI para Escritórios de Advocacia — Sigilo, LGPD e Backup Jurídico',
  description: 'Infraestrutura de TI especializada para escritórios de advocacia: proteção do sigilo profissional, LGPD, backup de documentos jurídicos e certificados digitais.',
  keywords: ['TI para advocacia', 'segurança dados escritório advocacia', 'LGPD escritório de advocacia', 'backup jurídico', 'proteção sigilo profissional TI'],
  openGraph: { title: 'TI para Escritórios de Advocacia | JPX Digital', description: 'Sigilo, LGPD e backup jurídico para escritórios de advocacia.', url: `${BASE}/segmentos/${data.slug}` },
  alternates: { canonical: `${BASE}/segmentos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('TI para Escritórios de Advocacia', 'Infraestrutura de TI especializada para advocacia: sigilo profissional, LGPD e backup jurídico.', 'Legal IT Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Segmentos', item: `${BASE}/segmentos` }, { name: 'Advocacia', item: `${BASE}/segmentos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
