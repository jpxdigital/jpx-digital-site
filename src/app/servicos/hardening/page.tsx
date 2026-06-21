import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/hardening.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Hardening de Servidores — Linux, Windows e Dispositivos de Rede',
  description: 'Hardening baseado em CIS Benchmarks para Linux, Windows Server e dispositivos de rede. Reduza a superfície de ataque e passe em auditorias de segurança.',
  keywords: ['hardening de servidores', 'cis benchmarks', 'hardening linux windows', 'segurança de servidor', 'hardening para compliance'],
  openGraph: { title: 'Hardening de Servidores | JPX Digital', description: 'CIS Benchmarks para Linux, Windows e redes. Superfície de ataque mínima.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Hardening de Servidores', 'Hardening baseado em CIS Benchmarks para Linux, Windows e dispositivos de rede. Conformidade e auditoria de segurança.', 'Cybersecurity Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Hardening', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
