import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/acronis.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Backup com Acronis Cyber Protect — Implementação e Suporte',
  description: 'Implementação e gestão de backup corporativo com Acronis Cyber Protect. Proteção anti-ransomware, Instant Restore e backup para cloud.',
  keywords: ['acronis cyber protect', 'acronis backup corporativo', 'acronis implementação', 'backup acronis brasil', 'acronis instant restore'],
  openGraph: { title: 'Backup com Acronis | JPX Digital', description: 'Acronis Cyber Protect: backup, proteção anti-ransomware e recuperação instantânea.', url: `${BASE}/servicos/${data.slug}` },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema('Backup com Acronis Cyber Protect', 'Implementação e gestão de backup corporativo com Acronis Cyber Protect. Proteção anti-ransomware e Instant Restore.', 'IT Security Service'),
      breadcrumbSchema([{ name: 'Home', item: BASE }, { name: 'Serviços', item: `${BASE}/servicos` }, { name: 'Acronis Backup', item: `${BASE}/servicos/${data.slug}` }]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
