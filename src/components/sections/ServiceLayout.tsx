import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/FadeIn'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { ContactForm } from '@/components/sections/ContactForm'

export interface FAQ {
  question: string
  answer: string
}

export interface HowStep {
  title: string
  desc: string
}

export interface Differential {
  title: string
  desc: string
}

export interface ServicePageContent {
  slug: string
  category: string
  heroHeadline: string
  heroSub: string
  intro: string[]
  howTitle?: string
  howSteps: HowStep[]
  differentials: Differential[]
  faqs: FAQ[]
  schemas: object[]
  baseSection?: { name: string; href: string }
}

function Breadcrumb({ slug, label, baseSection }: { slug: string; label: string; baseSection: { name: string; href: string } }) {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: baseSection.name, href: baseSection.href },
    { name: label, href: `${baseSection.href}/${slug}` },
  ]
  return (
    <nav className="flex items-center gap-1.5 text-xs text-white/45 mb-8 flex-wrap" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3 h-3 shrink-0" />}
          {i < crumbs.length - 1 ? (
            <Link href={c.href} className="hover:text-white/75 transition-colors">{c.name}</Link>
          ) : (
            <span className="text-white/65">{c.name}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export function ServiceLayout({ content }: { content: ServicePageContent }) {
  const breadcrumbLabel = content.heroHeadline.split('—')[0].trim()
  const baseSection = content.baseSection ?? { name: 'Serviços', href: '/servicos' }

  return (
    <MotionProvider>
      {/* JSON-LD Schemas — Google accepts in body */}
      {content.schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Nav />

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="hero-grid-bg py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb slug={content.slug} label={breadcrumbLabel} baseSection={baseSection} />

            <FadeIn>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/15 text-white/70 text-xs font-medium tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                {content.category}
              </span>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl mb-5">
                {content.heroHeadline}
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg text-white/65 max-w-2xl leading-relaxed mb-8">
                {content.heroSub}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-hover transition-colors text-sm"
                >
                  Solicitar Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/5518930852246?text=Ol%C3%A1!%20Tenho%20interesse%20em%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20JPX%20Digital."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/8 border border-white/20 text-white font-medium rounded-xl hover:bg-white/14 transition-colors text-sm"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Intro ────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-5">
              {content.intro.map((para, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <p className="text-gray-700 text-lg leading-relaxed">{para}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── How we work ──────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 mb-12">
                {content.howTitle ?? 'Como atuamos'}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {content.howSteps.map((step, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="flex gap-5 bg-white border border-border rounded-2xl p-6">
                    <span className="shrink-0 w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-bold font-heading">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Differentials ────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 mb-10">
                Por que a JPX Digital para este serviço
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {content.differentials.map((d, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="flex gap-4 p-6 bg-muted border border-border rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1.5">{d.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 mb-10">
                Perguntas frequentes
              </h2>
            </FadeIn>
            <div className="max-w-3xl space-y-3">
              {content.faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <details className="group bg-white border border-border rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors list-none">
                      <span className="text-sm">{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform duration-200 shrink-0" />
                    </summary>
                    <div className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-border">
                      {faq.answer}
                    </div>
                  </details>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────── */}
        <section className="dark-grid-bg py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <FadeIn direction="left">
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-4">
                  Pronto para começar?
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Solicite um assessment gratuito. Nossa equipe avalia o seu ambiente e apresenta uma proposta sob medida — sem compromisso.
                </p>
                <ul className="space-y-3">
                  {['Diagnóstico gratuito, sem compromisso', 'Retorno em até 1 dia útil', 'Atendimento direto com especialista'].map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <ContactForm />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </MotionProvider>
  )
}
