import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/segments/escritorios.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'TI para Escritórios — Microsoft 365, Backup e Suporte Gerenciado',
  description: 'Infraestrutura de TI para escritórios: Microsoft 365, backup de endpoints, home office seguro e suporte gerenciado. TI estável e previsível para escritórios de todos os portes.',
  keywords: ['TI para escritórios', 'microsoft 365 para empresas', 'suporte TI escritório', 'backup notebook empresa', 'home office seguro corporativo'],
  openGraph: { title: 'TI para Escritórios | JPX Digital', description: 'Microsoft 365, backup e suporte gerenciado para escritórios produtivos.', url: `${BASE}/segmentos/${data.slug}` },
  alternates: { canonical: `${BASE}/segmentos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('TI para Escritórios', 'Infraestrutura e suporte gerenciado de TI para escritórios: Microsoft 365, backup e home office seguro.', 'IT Support Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Segmentos', item: `${BASE}/segmentos` }, { name: 'Escritórios', item: `${BASE}/segmentos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
