import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/disaster-recovery.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Disaster Recovery para Empresas — RTO e RPO Garantidos',
  description: 'Plano de Disaster Recovery testado e documentado para empresas. Retome operações em minutos após falha, ransomware ou desastre. RTO e RPO garantidos em contrato.',
  keywords: ['disaster recovery', 'plano de disaster recovery', 'DR empresarial', 'RTO RPO', 'recuperação de desastres'],
  openGraph: {
    title: 'Disaster Recovery para Empresas | JPX Digital',
    description: 'Plano de DR testado e documentado. Retome operações em minutos. RTO e RPO garantidos.',
    url: `${BASE}/servicos/${data.slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Disaster Recovery', 'Plano de Disaster Recovery testado e documentado, com RTO e RPO garantidos. Simulações periódicas e cobertura para ransomware.', 'Disaster Recovery Planning'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Disaster Recovery', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
