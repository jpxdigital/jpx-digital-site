import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/microsoft-azure.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Consultoria Microsoft Azure — Migração e Gestão de Ambientes Azure',
  description: 'Consultoria Microsoft Azure: migração, arquitetura híbrida, AKS, DevOps e gestão contínua. Parceiros Microsoft com experiência em ambientes corporativos.',
  keywords: ['consultoria azure', 'migração azure brasil', 'microsoft azure consultoria', 'azure hybrid', 'azure devops'],
  openGraph: { title: 'Consultoria Microsoft Azure | JPX Digital', description: 'Migração, arquitetura e gestão em Microsoft Azure.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Consultoria Microsoft Azure', 'Migração, arquitetura híbrida e gestão de ambientes Microsoft Azure para empresas corporativas.', 'Cloud Computing Consultancy'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Microsoft Azure', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
