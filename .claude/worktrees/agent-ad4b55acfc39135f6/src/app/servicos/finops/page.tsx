import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/finops.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'FinOps — Otimização de Custos em Cloud',
  description: 'FinOps para empresas: reduza gastos em OCI, Azure e AWS sem sacrificar performance. Rightsizing, instâncias reservadas e governança de custo.',
  keywords: ['FinOps', 'otimização de custos cloud', 'FinOps brasil', 'cloud cost optimization', 'reduzir custos cloud'],
  openGraph: { title: 'FinOps — Otimização de Custos em Cloud | JPX Digital', description: 'Reduza gastos em cloud sem sacrificar performance. FinOps em OCI, Azure e AWS.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('FinOps', 'Otimização e governança de custos cloud em OCI, Azure e AWS. Rightsizing, reservas e visibilidade de gasto.', 'Financial Operations Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'FinOps', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
