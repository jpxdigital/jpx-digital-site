import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/aws.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Consultoria AWS — Amazon Web Services para Empresas',
  description: 'Consultoria AWS: migração, arquitetura, segurança e FinOps em Amazon Web Services. Well-Architected Review e otimização de custos. Assessment gratuito.',
  keywords: ['consultoria AWS', 'amazon web services brasil', 'aws consultoria', 'migração aws', 'aws well-architected'],
  openGraph: { title: 'Consultoria AWS | JPX Digital', description: 'Migração, arquitetura, segurança e FinOps em Amazon Web Services.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Consultoria AWS', 'Migração, arquitetura Well-Architected, segurança e FinOps em Amazon Web Services para empresas corporativas.', 'Cloud Computing Consultancy'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'AWS', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
