import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { ChatBot } from '@/components/ui/ChatBot'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jpxdigital.com.br'),
  title: {
    default: 'JPX Digital | Consultoria de TI, Cloud e Segurança Corporativa',
    template: '%s | JPX Digital',
  },
  description:
    'Consultoria especializada em cloud computing, backup corporativo, disaster recovery e resiliência cibernética para empresas que não podem parar.',
  keywords: [
    'consultoria TI',
    'cloud computing',
    'oracle cloud OCI',
    'backup corporativo',
    'disaster recovery',
    'resiliência cibernética',
    'Microsoft Azure',
    'AWS',
    'FinOps',
    'Docker',
    'Kubernetes',
    'segurança da informação',
  ],
  authors: [{ name: 'JPX Digital' }],
  creator: 'JPX Digital',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://jpxdigital.com.br',
    siteName: 'JPX Digital',
    title: 'JPX Digital | Consultoria de TI, Cloud e Segurança Corporativa',
    description:
      'Consultoria especializada em cloud, backup e resiliência cibernética para empresas que dependem de tecnologia.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JPX Digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JPX Digital | Consultoria de TI',
    description: 'Consultoria especializada em cloud, backup e resiliência cibernética.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'JPX Digital',
  legalName: 'JPX Digital Tecnologia LTDA',
  alternateName: 'JPX Digital Tecnologia',
  taxID: '57.454.973/0001-18',
  url: 'https://jpxdigital.com.br',
  logo: 'https://jpxdigital.com.br/jpx-logo-email.png',
  description:
    'Consultoria especializada em cloud computing, backup corporativo, disaster recovery e resiliência cibernética.',
  email: 'contato@jpxdigital.com.br',
  telephone: '+55-18-93085-2246',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR',
  },
  areaServed: 'BR',
  knowsLanguage: 'pt-BR',
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
        <ChatBot />
      </body>
    </html>
  )
}
