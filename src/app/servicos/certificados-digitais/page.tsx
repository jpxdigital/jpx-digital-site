import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/certificados-digitais.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Certificados Digitais ICP-Brasil — Revenda e-CPF, e-CNPJ, NF-e',
  description: 'A JPX Digital é revendedora autorizada de certificados digitais ICP-Brasil. e-CPF A1/A3, e-CNPJ A1/A3, certificados NF-e e SSL/TLS. Validação presencial ou por videoconferência.',
  keywords: ['certificado digital', 'e-CPF', 'e-CNPJ', 'certificado ICP-Brasil', 'NF-e certificado', 'token digital', 'certificado A3'],
  openGraph: { title: 'Certificados Digitais ICP-Brasil | JPX Digital', description: 'Revenda autorizada de e-CPF, e-CNPJ, NF-e e SSL. Gestão de renovação inclusa.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Certificados Digitais ICP-Brasil', 'Revenda autorizada de certificados digitais ICP-Brasil: e-CPF, e-CNPJ, NF-e, SSL/TLS com gestão de renovação.', 'IT Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Certificados Digitais', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
