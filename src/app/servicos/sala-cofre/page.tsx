import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/sala-cofre.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Sala Cofre Nível 4 — Manutenção e Auditoria',
  description: 'Sala cofre EN 1047-2 Nível 4 para ambientes regulados: manutenção preventiva e corretiva, auditorias e laudos técnicos para ITI, PCI-DSS e ISO 27001.',
  keywords: ['sala cofre nível 4', 'sala cofre EN 1047-2', 'sala cofre ICP-Brasil', 'manutenção sala cofre', 'auditoria sala cofre', 'sala cofre data center'],
  openGraph: { title: 'Sala Cofre Nível 4 | JPX Digital', description: 'Implantação, manutenção e auditoria de sala cofre EN 1047-2.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Sala Cofre Nível 4', 'Implantação, manutenção e auditoria de sala cofre EN 1047-2 para ambientes regulados.', 'IT Infrastructure Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Sala Cofre Nível 4', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
