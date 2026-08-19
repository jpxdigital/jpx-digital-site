import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/oracle-cloud-oci.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Consultoria Oracle Cloud Infrastructure (OCI)',
  description: 'Parceiros certificados Oracle Cloud (OCI). Migração, arquitetura, gestão e FinOps para ambientes corporativos exigentes. Assessment gratuito.',
  keywords: ['consultoria OCI', 'Oracle Cloud Brasil', 'Oracle Cloud Infrastructure', 'migração OCI', 'Oracle Cloud consultoria'],
  openGraph: {
    title: 'Consultoria Oracle Cloud (OCI) | JPX Digital',
    description: 'Parceiros certificados Oracle Cloud Infrastructure. Migração, arquitetura e sustentação de ambientes corporativos.',
    url: `${BASE}/servicos/${data.slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Consultoria Oracle Cloud Infrastructure (OCI)', 'Consultoria especializada em migração, arquitetura, gestão e FinOps em Oracle Cloud Infrastructure para empresas corporativas.', 'Cloud Computing Consultancy'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Oracle Cloud OCI', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
