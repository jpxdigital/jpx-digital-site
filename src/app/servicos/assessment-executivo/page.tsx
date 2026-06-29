import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/assessment-executivo.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Assessment Executivo de TI — Diagnóstico de Infraestrutura e Riscos',
  description: 'Diagnóstico completo do ambiente de TI: infraestrutura, cloud, segurança, backup e continuidade operacional. Relatório executivo com mapa de riscos e roadmap priorizado.',
  keywords: ['assessment de TI', 'diagnóstico de infraestrutura', 'assessment executivo', 'auditoria de TI', 'mapa de riscos TI'],
  openGraph: {
    title: 'Assessment Executivo de TI | JPX Digital',
    description: 'Diagnóstico independente do ambiente de TI. Mapa de riscos, BIA e roadmap executivo. Sem compromisso inicial.',
    url: `${BASE}/servicos/${data.slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema(
        'Assessment Executivo de TI',
        'Diagnóstico completo do ambiente de TI corporativo: infraestrutura, cloud, segurança, backup, continuidade operacional e maturidade de processos. Entrega relatório executivo com mapa de riscos e roadmap priorizado.',
        'IT Assessment'
      ),
      breadcrumbSchema([
        { name: 'Home', item: BASE },
        { name: 'Serviços', item: `${BASE}/servicos` },
        { name: 'Assessment Executivo', item: `${BASE}/servicos/${data.slug}` },
      ]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
