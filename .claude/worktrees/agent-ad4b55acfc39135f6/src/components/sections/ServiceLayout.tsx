import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight, FileText, Search } from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/FadeIn'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { ContactForm } from '@/components/sections/ContactForm'

// ── Types ─────────────────────────────────────────────────────────────

export interface ServicePageContent {
  slug: string
  category: string

  // Hero
  heroHeadline: string
  heroSub: string
  ctaLabel?: string

  // Seção 2: Problema de negócio
  problem: {
    headline: string
    body: string[]
  }

  // Seção 3: Assessment (sempre presente — porta de entrada)
  assessment: {
    name: string        // ex: "Cloud Readiness Assessment"
    body: string        // o que é coberto
    checklist: string[] // 3–5 itens do escopo
  }

  // Seção 4: Processo de trabalho (específico por serviço)
  process: {
    title?: string
    steps: Array<{ title: string; desc: string }>
  }

  // Seção 5: Benefícios
  benefits: Array<{ title: string; desc: string }>

  // Seção 6: Entregáveis
  deliverables: string[]

  // Seção 7: Diferenciais JPX
  differentials: Array<{ title: string; desc: string }>

  // Seção 8 (opcional): Ambientes / Tecnologias suportadas
  supportedEnvironments?: Array<{ categoria: string; itens: string[] }>

  // Seção 9: FAQ
  faqs: Array<{ question: string; answer: string }>

  // JSON-LD schemas
  schemas: object[]

  baseSection?: { name: string; href: string }
}

// ── Metodologia JPX (hardcoded — igual em todos os serviços) ──────────

const JPX_FLOW = [
  'Assessment',
  'Arquitetura',
  'Implantação',
  'Validação',
  'Documentação',
  'Operação',
  'Melhoria Contínua',
]

// ── Sub-components ────────────────────────────────────────────────────

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
          {i < crumbs.length - 1
            ? <Link href={c.href} className="hover:text-white/75 transition-colors">{c.name}</Link>
            : <span className="text-white/65">{c.name}</span>}
        </span>
      ))}
    </nav>
  )
}

// ── Main component ────────────────────────────────────────────────────

export function ServiceLayout({ content }: { content: ServicePageContent }) {
  const breadcrumbLabel = content.heroHeadline.split('—')[0].trim()
  const baseSection = content.baseSection ?? { name: 'Serviços', href: '/servicos' }
  const ctaLabel = content.ctaLabel ?? 'Solicitar Assessment Gratuito'

  return (
    <MotionProvider>
      {content.schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Nav />
      <main>

        {/* ── 1. Hero ──────────────────────────────────────────────── */}
        <section className="hero-grid-bg py-20 lg:py-28">
          <div className="container-page">
            <Breadcrumb slug={content.slug} label={breadcrumbLabel} baseSection={baseSection} />

            <FadeIn>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/15 text-white/70 text-xs font-medium tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                {content.category}
              </span>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="type-display text-white max-w-2xl mb-5">
                {content.heroHeadline}
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg text-white/65 max-w-2xl leading-relaxed mb-8">
                {content.heroSub}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-hover transition-colors text-[0.9375rem]"
              >
                {ctaLabel} <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── 2. Problema de negócio ───────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <div className="max-w-3xl">
              <FadeIn>
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-5">
                  O problema real
                </p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-8">
                  {content.problem.headline}
                </h2>
              </FadeIn>
              {content.problem.body.map((p, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <p className="text-gray-700 text-lg leading-relaxed mb-5 last:mb-0">{p}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Assessment JPX ────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <FadeIn>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold tracking-wide mb-6">
                    <Search className="w-3.5 h-3.5" />
                    Porta de entrada
                  </div>
                  <h2 className="type-h2 text-gray-900 mb-4">{content.assessment.name}</h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">{content.assessment.body}</p>

                  <ul className="space-y-3">
                    {content.assessment.checklist.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Metodologia JPX */}
              <FadeIn delay={0.08}>
                <div className="bg-white border border-border rounded-2xl p-7">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
                    Metodologia JPX
                  </p>
                  <ol className="space-y-0">
                    {JPX_FLOW.map((step, i) => (
                      <li key={step} className="flex flex-col items-start">
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i === 0 ? 'bg-secondary text-white' : 'bg-primary/8 text-primary'}`}>
                            {i + 1}
                          </span>
                          <span className={`text-sm font-medium ${i === 0 ? 'text-secondary' : 'text-gray-700'}`}>
                            {step}
                          </span>
                        </div>
                        {i < JPX_FLOW.length - 1 && (
                          <div className="w-px h-4 bg-border ml-3.5 my-0.5" />
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── 4. Como trabalhamos ──────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <FadeIn>
              <h2 className="type-h2 text-gray-900 mb-12">
                {content.process.title ?? 'Como trabalhamos'}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {content.process.steps.map((step, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="flex gap-5 bg-muted border border-border rounded-2xl p-6 h-full">
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

        {/* ── 5. Benefícios ────────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <h2 className="type-h2 text-gray-900 mb-10">Benefícios para o seu negócio</h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {content.benefits.map((b, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="bg-white border border-border rounded-2xl p-6 h-full">
                    <div className="w-1 h-8 rounded-full bg-secondary mb-5" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">{b.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. Entregáveis ───────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <FadeIn>
              <div className="mb-10">
                <h2 className="type-h2 text-gray-900 mb-2">Entregáveis</h2>
                <p className="text-gray-500 text-lg">O que você recebe — documentado e de sua propriedade.</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.deliverables.map((d, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="flex items-start gap-3 bg-muted border border-border rounded-xl px-5 py-4">
                    <FileText className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span className="text-gray-800 text-sm font-medium leading-snug">{d}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. Diferenciais JPX ──────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <div className="mb-10">
                <h2 className="type-h2 text-gray-900 mb-2">Diferenciais da JPX Digital</h2>
                <p className="text-gray-500 text-lg">Processo, não produto. Responsabilidade de ponta a ponta.</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {content.differentials.map((d, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex gap-4 p-6 bg-white border border-border rounded-xl h-full">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1.5">{d.title}</h3>
                      {d.desc && <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. Ambientes suportados (opcional) ───────────────────── */}
        {content.supportedEnvironments && (
          <section className="py-20 bg-white">
            <div className="container-page">
              <FadeIn>
                <div className="mb-10">
                  <h2 className="type-h2 text-gray-900 mb-2">Ambientes suportados</h2>
                  <p className="text-gray-500 text-lg">Atuamos em ambientes corporativos locais, híbridos e em nuvem.</p>
                </div>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {content.supportedEnvironments.map((grupo, i) => (
                  <FadeIn key={grupo.categoria} delay={i * 0.05}>
                    <div className="bg-muted border border-border rounded-2xl p-6 h-full">
                      <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">{grupo.categoria}</p>
                      <ul className="space-y-2.5">
                        {grupo.itens.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 9. FAQ ───────────────────────────────────────────────── */}
        <section className={`py-20 ${content.supportedEnvironments ? 'bg-muted' : 'bg-white'}`}>
          <div className="container-page">
            <FadeIn>
              <h2 className="type-h2 text-gray-900 mb-10">Perguntas frequentes</h2>
            </FadeIn>
            <div className="max-w-3xl space-y-3">
              {content.faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <details className={`group border border-border rounded-xl overflow-hidden ${content.supportedEnvironments ? 'bg-white' : 'bg-muted'}`}>
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-100 transition-colors list-none">
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

        {/* ── 10. CTA ──────────────────────────────────────────────── */}
        <section className="dark-grid-bg py-20">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <FadeIn direction="left">
                <h2 className="type-h2 text-white mb-4">Comece com um Assessment gratuito</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Avaliamos o seu ambiente, identificamos riscos reais e apresentamos uma proposta sob medida. Sem soluções genéricas, sem compromisso inicial.
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
