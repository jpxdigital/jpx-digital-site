import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/infraestrutura.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Consultoria de Infraestrutura de TI para Empresas',
  description: 'Consultoria de infraestrutura de TI: redes, servidores, storage, Active Directory e conectividade. Projetos completos com planejamento, implantação e documentação.',
  keywords: ['consultoria infraestrutura TI', 'infraestrutura de TI empresas', 'projeto de rede corporativa', 'active directory consultoria', 'modernização de infraestrutura'],
  openGraph: { title: 'Infraestrutura de TI | JPX Digital', description: 'Projetos de infraestrutura corporativa: rede, servidores, storage e identidade.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Infraestrutura de TI', 'Projetos completos de infraestrutura corporativa: rede, servidores, storage, Active Directory e conectividade.', 'IT Infrastructure Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Infraestrutura de TI', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
