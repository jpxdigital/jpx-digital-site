import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/virtualizacao.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Virtualização de Servidores — VMware, Hyper-V e KVM',
  description: 'Virtualização corporativa com VMware vSphere, Microsoft Hyper-V e KVM. Alta disponibilidade, hiperconvergência e suporte a Oracle Database.',
  keywords: ['virtualização de servidores', 'vmware consultoria', 'hyper-v implementação', 'virtualização corporativa', 'hiperconvergência'],
  openGraph: { title: 'Virtualização de Servidores | JPX Digital', description: 'VMware, Hyper-V e KVM para ambientes corporativos críticos.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Virtualização de Servidores', 'Virtualização corporativa com VMware, Hyper-V e KVM. Alta disponibilidade, hiperconvergência e suporte a Oracle.', 'IT Infrastructure Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Virtualização', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
