import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/ai-readiness-assessment.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'AI Readiness Assessment — Avaliação de Maturidade para IA Corporativa',
  description: 'Avaliação de maturidade para adoção segura de Inteligência Artificial: riscos, LGPD, governança, ferramentas e roadmap de implantação. Diagnóstico independente pela JPX Digital.',
  keywords: ['ai readiness assessment', 'avaliação maturidade ia', 'governança inteligência artificial', 'ia corporativa lgpd', 'adoção segura ia empresas'],
  openGraph: { title: 'AI Readiness Assessment | JPX Digital', description: 'Diagnóstico de maturidade para adoção segura de IA: riscos, LGPD, governança e roadmap.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('AI Readiness Assessment', 'Avaliação de maturidade para adoção segura de Inteligência Artificial em empresas — riscos, LGPD, governança e roadmap.', 'IT Consulting Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'AI Readiness Assessment', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
