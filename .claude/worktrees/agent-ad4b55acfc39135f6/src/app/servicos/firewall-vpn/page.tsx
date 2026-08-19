import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/firewall-vpn.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Firewall e VPN Corporativa para Empresas',
  description: 'Firewall corporativo e VPN para empresas: perímetro seguro, acesso remoto controlado e proteção de rede. pfSense, Fortinet, Palo Alto. Assessment gratuito.',
  keywords: ['firewall corporativo', 'vpn empresarial', 'firewall e vpn para empresas', 'zero trust network', 'segurança de rede'],
  openGraph: { title: 'Firewall e VPN Corporativa | JPX Digital', description: 'Perímetro seguro e acesso remoto controlado para empresas.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Firewall e VPN Corporativa', 'Segurança de rede com firewall NGFW, VPN site-to-site, acesso remoto e Zero Trust para ambientes corporativos.', 'Cybersecurity Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Firewall & VPN', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
