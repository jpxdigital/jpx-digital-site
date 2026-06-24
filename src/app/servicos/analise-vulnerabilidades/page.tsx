import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/analise-vulnerabilidades.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Análise de Vulnerabilidades — Scan Recorrente com Validação Manual e CVSS 3.1',
  description: 'Varredura automatizada recorrente com validação manual de findings. Classificação CVSS 3.1, eliminação de falsos positivos e plano de remediação priorizado para seu ambiente.',
  keywords: ['análise de vulnerabilidades', 'scan de vulnerabilidades', 'CVSS', 'gestão de vulnerabilidades', 'vulnerability assessment', 'segurança ofensiva'],
  openGraph: {
    title: 'Análise de Vulnerabilidades — CVSS 3.1 e Validação Manual | JPX Digital',
    description: 'Scan recorrente com validação manual. Sem falsos positivos, com plano de remediação priorizado por risco real.',
    url: `${BASE}/servicos/${data.slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema(
        'Análise de Vulnerabilidades',
        'Varredura automatizada recorrente com validação manual de findings, classificação CVSS 3.1 e plano de remediação priorizado. Cobertura de web, infraestrutura e cloud.',
        'Cybersecurity Service',
      ),
      breadcrumbSchema([
        { name: 'Home', item: BASE },
        { name: 'Serviços', item: `${BASE}/servicos` },
        { name: 'Análise de Vulnerabilidades', item: `${BASE}/servicos/${data.slug}` },
      ]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
