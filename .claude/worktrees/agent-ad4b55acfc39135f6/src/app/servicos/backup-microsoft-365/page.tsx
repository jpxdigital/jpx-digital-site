import type { Metadata } from 'next'
import { ServiceLayout, type ServicePageContent } from '@/components/sections/ServiceLayout'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import data from '@/data/services/backup-microsoft-365.json'

const BASE = 'https://jpxdigital.com.br'

export const metadata: Metadata = {
  title: 'Backup Microsoft 365 — E-mail, Teams e SharePoint',
  description: 'Backup independente do Microsoft 365: e-mails, Teams, SharePoint e OneDrive. Restore granular em minutos. Conformidade LGPD. A Microsoft não faz isso por você.',
  keywords: ['backup microsoft 365', 'backup office 365', 'backup M365', 'backup teams sharepoint', 'backup exchange online'],
  openGraph: {
    title: 'Backup Microsoft 365 | JPX Digital',
    description: 'Backup independente do M365. E-mails, Teams, SharePoint, OneDrive. A Microsoft não faz isso por você.',
    url: `${BASE}/servicos/${data.slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${data.slug}` },
}

export default function Page() {
  const content: ServicePageContent = {
    ...(data as unknown as ServicePageContent),
    schemas: [
      serviceSchema(
        'Backup Microsoft 365',
        'Backup independente do Microsoft 365 cobrindo Exchange, SharePoint, Teams e OneDrive. Restore granular e conformidade LGPD.',
        'Data Backup Service'
      ),
      breadcrumbSchema([
        { name: 'Home', item: BASE },
        { name: 'Serviços', item: `${BASE}/servicos` },
        { name: 'Backup Microsoft 365', item: `${BASE}/servicos/${data.slug}` },
      ]),
      faqPageSchema(data.faqs),
    ],
  }
  return <ServiceLayout content={content} />
}
