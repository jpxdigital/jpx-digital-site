import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/fortinet.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Fortinet — FortiGate NGFW, SD-WAN e Security Fabric Corporativo',
  description: 'Implantação e gestão de FortiGate NGFW, FortiManager, FortiAnalyzer e Fortinet Security Fabric. Especialistas certificados NSE para redes corporativas, filiais e ambientes híbridos.',
  keywords: ['fortinet', 'fortigate', 'ngfw', 'fortinet security fabric', 'sd-wan fortinet', 'fortimanager', 'fortianalyzer', 'firewall corporativo'],
  openGraph: {
    title: 'Fortinet Security Fabric — NGFW, SD-WAN e Gestão Centralizada | JPX Digital',
    description: 'Especialistas Fortinet NSE. FortiGate, FortiManager, FortiAnalyzer e Security Fabric completo para redes corporativas.',
    url: `${BASE}/servicos/${data.slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema(
        'Fortinet Security Fabric',
        'Implantação e gestão de FortiGate NGFW, SD-WAN, FortiManager e FortiAnalyzer. Arquitetura Security Fabric integrada para redes corporativas e ambientes híbridos.',
        'Managed Security Service',
      ),
      breadcrumbSchema([
        { name: 'Home', item: BASE },
        { name: 'Serviços', item: `${BASE}/servicos` },
        { name: 'Fortinet', item: `${BASE}/servicos/${data.slug}` },
      ]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
