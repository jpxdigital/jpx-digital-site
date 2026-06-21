import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/sala-cofre.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Sala Cofre Nível 4 — Suporte de TI e Auditoria Lógica',
  description: 'Suporte de infraestrutura de TI para ambientes de sala cofre: HSMs, servidores, redes e controles lógicos para ACs ICP-Brasil, PCI-DSS e ISO 27001.',
  keywords: ['sala cofre nível 4', 'sala cofre EN 1047-2', 'sala cofre ICP-Brasil', 'infraestrutura TI sala cofre', 'auditoria lógica sala cofre', 'suporte HSM sala cofre'],
  openGraph: { title: 'Sala Cofre Nível 4 | JPX Digital', description: 'Suporte de TI e auditoria lógica para ambientes de sala cofre regulados — HSMs, servidores, redes e controles de acesso.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Sala Cofre Nível 4', 'Suporte de TI e auditoria lógica para ambientes de sala cofre: HSMs, servidores, redes e controles lógicos para ambientes regulados.', 'IT Infrastructure Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Sala Cofre Nível 4', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
