import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/business-continuity.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Business Continuity — Plano de Continuidade de Negócios',
  description: 'Plano de Business Continuity (BCP) para empresas que não podem parar. Cobertura além da TI: pessoas, processos, fornecedores e comunicação.',
  keywords: ['business continuity', 'plano de continuidade de negócios', 'BCP empresarial', 'continuidade operacional', 'ISO 22301'],
  openGraph: { title: 'Business Continuity | JPX Digital', description: 'Plano de continuidade de negócios além da TI — pessoas, processos e fornecedores.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Business Continuity', 'Plano de Business Continuity (BCP) para empresas críticas, cobrindo TI, pessoas, processos e fornecedores.', 'Business Continuity Planning'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Business Continuity', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
