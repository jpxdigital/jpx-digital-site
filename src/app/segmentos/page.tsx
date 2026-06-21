import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Factory, Building2, Scale, ShieldCheck, ArrowRight } from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Segmentos Atendidos — TI Especializada por Setor',
  description:
    'Consultoria de TI especializada por segmento: hospitais e clínicas, indústrias, escritórios corporativos e advocacia. Cada setor tem exigências específicas — atendemos cada uma.',
  alternates: { canonical: 'https://jpxdigital.com.br/segmentos' },
}

const segments = [
  {
    href: '/segmentos/hospitais-clinicas',
    icon: Heart,
    title: 'Hospitais e Clínicas',
    desc: 'LGPD para dados de saúde, backup de prontuários com retenção de 20 anos, alta disponibilidade para sistemas críticos e Disaster Recovery contra ransomware — a ameaça mais comum ao setor de saúde.',
    pills: ['LGPD Saúde', 'Backup PACS/HIS', 'Alta Disponibilidade', 'DR Anti-Ransomware'],
  },
  {
    href: '/segmentos/industrias',
    icon: Factory,
    title: 'Indústrias',
    desc: 'Integração ERP-produção, segmentação de redes IT/OT, backup de configurações de CLP e SCADA, e disponibilidade dimensionada pelo custo real de parada da linha de produção.',
    pills: ['Segurança OT', 'Integração ERP', 'Backup SCADA', 'Alta Disponibilidade'],
  },
  {
    href: '/segmentos/escritorios',
    icon: Building2,
    title: 'Escritórios Corporativos',
    desc: 'Microsoft 365 configurado corretamente (com backup externo), gestão de dispositivos, home office seguro com MFA e ZTNA, e suporte gerenciado com SLA para equipes de 10 a 500 pessoas.',
    pills: ['Microsoft 365', 'Backup M365', 'Home Office Seguro', 'Suporte MSP'],
  },
  {
    href: '/segmentos/advocacia',
    icon: Scale,
    title: 'Escritórios de Advocacia',
    desc: 'Sigilo profissional como prioridade: controle de acesso por caso, rastreabilidade completa, backup jurídico imutável, gestão de certificados digitais e proteção de dados conforme LGPD e Código de Ética da OAB.',
    pills: ['Sigilo Profissional', 'Backup Jurídico', 'LGPD', 'Certificados Digitais'],
  },
  {
    href: '/segmentos/autoridades-certificadoras',
    icon: ShieldCheck,
    title: 'Autoridades Certificadoras',
    desc: 'TI para ACs ICP-Brasil: clusters HSM com failover automático, VMware vSphere, OpenShift/OKD para portais de emissão e suporte ao credenciamento ITI. Atendemos ACs em fase inicial e ACs já credenciadas.',
    pills: ['Cluster HSM', 'OpenShift/OKD', 'VMware vSphere', 'Credenciamento ITI'],
  },
]

export default function SegmentosPage() {
  return (
    <MotionProvider>
      <Nav />
      <main>
        {/* Hero */}
        <section className="hero-grid-bg py-24 lg:py-32">
          <div className="container-page">
            <FadeIn>
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                Segmentos
              </p>
              <h1 className="type-display text-white mb-6 max-w-2xl">
                Cada setor tem exigências específicas. Atendemos cada uma.
              </h1>
              <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
                TI genérica resolve problemas genéricos. Hospitais, indústrias, escritórios e bancas de advocacia têm regulações, riscos e requisitos técnicos próprios — e precisam de uma consultoria que entenda isso.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Segments */}
        <section className="py-24 bg-white">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {segments.map((seg, i) => {
                const Icon = seg.icon
                return (
                  <FadeIn key={seg.href} delay={i * 0.07}>
                    <Link
                      href={seg.href}
                      className="group flex flex-col gap-5 p-8 border border-border rounded-2xl hover:border-secondary/40 hover:shadow-lg transition-all h-full"
                    >
                      <div className="flex items-center gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/8 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h2 className="font-heading text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {seg.title}
                        </h2>
                      </div>

                      <p className="text-gray-600 leading-relaxed flex-1">
                        {seg.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {seg.pills.map((p) => (
                          <span key={p} className="px-3 py-1 bg-muted border border-border rounded-full text-xs font-medium text-gray-600">
                            {p}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-secondary text-sm font-semibold group-hover:gap-3 transition-all">
                        Ver soluções para {seg.title.toLowerCase()}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted border-t border-border">
          <div className="container-page text-center">
            <FadeIn>
              <h2 className="type-h2 text-gray-900 mb-4">
                Seu setor não está na lista?
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Atendemos empresas de todos os segmentos. Entre em contato e descubra como podemos ajudar.
              </p>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
              >
                Falar com um especialista <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </MotionProvider>
  )
}
