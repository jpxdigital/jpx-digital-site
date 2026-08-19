import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/resiliencia-cibernetica.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Resiliência Cibernética para Empresas',
  description: 'Hardening, monitoramento contínuo e resposta a incidentes para ambientes corporativos críticos. Arquitetura Zero Trust baseada em CIS Controls e NIST.',
  keywords: ['resiliência cibernética', 'segurança da informação empresas', 'hardening de servidores', 'zero trust', 'resposta a incidentes'],
  openGraph: {
    title: 'Resiliência Cibernética para Empresas | JPX Digital',
    description: 'Hardening, monitoramento e resposta a incidentes para ambientes críticos. Arquitetura Zero Trust.',
    url: `${BASE}/servicos/${data.slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Resiliência Cibernética', 'Hardening, monitoramento contínuo, resposta a incidentes e arquitetura Zero Trust para ambientes corporativos críticos.', 'Cybersecurity Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Resiliência Cibernética', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
