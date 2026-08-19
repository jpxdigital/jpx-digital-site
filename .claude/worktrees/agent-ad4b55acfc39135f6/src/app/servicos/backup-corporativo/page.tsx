import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/backup-corporativo.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Backup Corporativo com RPO e RTO Garantidos',
  description: 'Backup corporativo com RPO e RTO definidos em contrato e testados mensalmente. Criptografia AES-256, múltiplos destinos S3. Assessment gratuito.',
  keywords: ['backup corporativo', 'backup para empresas', 'backup empresarial', 'backup de dados', 'backup com RPO RTO'],
  openGraph: {
    title: 'Backup Corporativo com RPO e RTO Garantidos | JPX Digital',
    description: 'Backup corporativo com garantias documentadas em contrato. Testado mensalmente. Criptografia AES-256.',
    url: `${BASE}/servicos/${data.slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Backup Corporativo', 'Backup corporativo com RPO e RTO definidos em contrato, testados mensalmente. Criptografia AES-256 e múltiplos destinos S3.', 'Data Backup Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Backup Corporativo', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
