import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/containers-kubernetes.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Docker e Kubernetes — Containerização para Produção',
  description: 'Consultoria em Docker e Kubernetes para ambientes corporativos. Containerização, orquestração, CI/CD e GitOps. On-prem, AKS, EKS e OKE.',
  keywords: ['docker consultoria', 'kubernetes brasil', 'containers kubernetes empresas', 'AKS consultoria', 'kubernetes on-prem'],
  openGraph: { title: 'Docker e Kubernetes | JPX Digital', description: 'Containerização, orquestração e CI/CD com Docker e Kubernetes.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Docker e Kubernetes', 'Containerização e orquestração com Docker e Kubernetes para ambientes corporativos de produção.', 'IT Infrastructure Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Docker & Kubernetes', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
