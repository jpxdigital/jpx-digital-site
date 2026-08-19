import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/cloud-computing.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Consultoria Cloud Computing — OCI, Azure e AWS',
  description: 'Consultoria em cloud computing para empresas: migração, arquitetura multi-cloud, gestão e FinOps em Oracle Cloud, Microsoft Azure e AWS. Assessment gratuito.',
  keywords: ['consultoria cloud computing', 'consultoria de cloud', 'cloud computing brasil', 'migração para nuvem', 'multi-cloud'],
  openGraph: { title: 'Consultoria Cloud Computing | JPX Digital', description: 'Migração, arquitetura e gestão em OCI, Azure e AWS.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Cloud Computing', 'Consultoria em cloud computing: migração, arquitetura e gestão em OCI, Azure e AWS com FinOps integrado.', 'Cloud Computing Consultancy'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Cloud Computing', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
