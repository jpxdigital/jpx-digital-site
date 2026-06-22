import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/certificados-digitais.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Certificados Digitais ICP-Brasil — eCPF e eCNPJ A1/A3',
  description: 'A JPX Digital é revendedora autorizada ACDIGITAL. Emitimos eCPF e eCNPJ nos formatos A1 e A3 para pessoas físicas e jurídicas — 100% remoto, com validade jurídica plena na ICP-Brasil.',
  keywords: ['certificado digital', 'e-CPF', 'e-CNPJ', 'certificado ICP-Brasil', 'certificado A1', 'certificado A3', 'ACDIGITAL'],
  openGraph: { title: 'Certificados Digitais ICP-Brasil | JPX Digital', description: 'Revendedor autorizado ACDIGITAL. eCPF e eCNPJ A1/A3 — 100% remoto, validade jurídica plena.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Certificados Digitais ICP-Brasil', 'Revendedor autorizado ACDIGITAL. Emissão de eCPF e eCNPJ A1/A3 para pessoas físicas e jurídicas — 100% remoto, ICP-Brasil.', 'IT Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Certificados Digitais', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
