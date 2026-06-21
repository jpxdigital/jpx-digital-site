import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/consultoria-estrategica.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Consultoria Estratégica de TI — Assessment e Planejamento',
  description: 'Consultoria estratégica de TI: assessment de infraestrutura, planejamento tecnológico e CTO as a Service para empresas. Diagnóstico independente e recomendações priorizadas.',
  keywords: ['consultoria estratégica TI', 'assessment de infraestrutura', 'planejamento estratégico TI', 'CTO as a service', 'consultoria de tecnologia empresas'],
  openGraph: { title: 'Consultoria Estratégica de TI | JPX Digital', description: 'Assessment, planejamento tecnológico e CTO as a Service para empresas.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Consultoria Estratégica de TI', 'Assessment de infraestrutura, planejamento tecnológico e CTO as a Service para empresas.', 'IT Consulting Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Consultoria Estratégica', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
