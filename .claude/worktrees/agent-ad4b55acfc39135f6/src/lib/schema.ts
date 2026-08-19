const BASE = 'https://jpxdigital.com.br'

const provider = {
  '@type': 'Organization',
  name: 'JPX Digital',
  url: BASE,
}

export function serviceSchema(name: string, description: string, serviceType: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider,
    areaServed: { '@type': 'Country', name: 'Brasil' },
    availableLanguage: 'Portuguese',
    url: `${BASE}`,
  }
}

export function breadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((bc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: bc.name,
      item: bc.item,
    })),
  }
}

export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}
