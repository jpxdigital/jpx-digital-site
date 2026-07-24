import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/blog'

const BASE = 'https://jpxdigital.com.br'
const now = new Date()

const servicesSlugs = [
  'assessment-executivo',
  'cloud-computing', 'oracle-cloud-oci', 'microsoft-azure', 'aws',
  'backup-corporativo', 'disaster-recovery', 'business-continuity',
  'backup-microsoft-365', 'finops', 'virtualizacao', 'containers-kubernetes',
  'firewall-vpn', 'fortinet', 'monitoramento', 'hardening', 'backup-rmm',
  'resiliencia-cibernetica', 'infraestrutura', 'suporte-gerenciado',
  'migracao-de-ambientes', 'consultoria-estrategica',
  'pentest', 'analise-vulnerabilidades', 'pentest-continuo',
]

const segmentSlugs = [
  'hospitais-clinicas', 'industrias', 'escritorios', 'advocacia',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                   lastModified: now, changeFrequency: 'weekly',  priority: 1   },
    { url: `${BASE}/sobre`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/servicos`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/segmentos`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/cases`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/contato`,      lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/privacidade`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const servicePages: MetadataRoute.Sitemap = servicesSlugs.map((slug) => ({
    url: `${BASE}/servicos/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const segmentPages: MetadataRoute.Sitemap = segmentSlugs.map((slug) => ({
    url: `${BASE}/segmentos/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...segmentPages, ...blogPages]
}
