import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from '@/components/sections/ContactForm'
import { posts, getPost, getAllSlugs, type BlogSection } from '@/lib/blog'

const BASE = 'https://jpxdigital.com.br'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE}/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
    },
    alternates: { canonical: `${BASE}/blog/${slug}` },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function Section({ section }: { section: BlogSection }) {
  switch (section.type) {
    case 'h2':
      return <h2 className="font-heading text-xl font-bold text-gray-900 mt-10 mb-4">{section.content}</h2>
    case 'h3':
      return <h3 className="font-heading text-base font-bold text-gray-900 mt-6 mb-3">{section.content}</h3>
    case 'paragraph':
      return <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
    case 'list':
      return (
        <ul className="space-y-2.5 mb-5 pl-0">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'callout': {
      const variants = {
        info:    { bg: 'bg-blue-50 border-blue-200',   label: 'Informação', text: 'text-blue-800' },
        warning: { bg: 'bg-amber-50 border-amber-200', label: 'Atenção',    text: 'text-amber-800' },
        tip:     { bg: 'bg-green-50 border-green-200', label: 'Dica',       text: 'text-green-800' },
      }
      const v = variants[section.variant ?? 'info']
      return (
        <div className={`${v.bg} border rounded-xl p-5 mb-5`}>
          <span className={`text-[0.65rem] font-bold uppercase tracking-widest ${v.text} block mb-2`}>{v.label}</span>
          <p className={`${v.text} text-sm leading-relaxed`}>{section.content}</p>
        </div>
      )
    }
    default:
      return null
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'JPX Digital', url: BASE },
    publisher: { '@type': 'Organization', name: 'JPX Digital', url: BASE },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${slug}` },
  }

  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Nav />
      <main>
        {/* Hero */}
        <section className="hero-grid-bg py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-white/45 mb-8">
              <Link href="/blog" className="hover:text-white/70 transition-colors">Centro de Conhecimento</Link>
              <span>/</span>
              <span className="text-white/60">{post.category}</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wide mb-5">
              <Tag className="w-3 h-3" />
              {post.category}
            </div>

            <h1 className="type-display text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-5 text-xs text-white/45">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min de leitura
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
              {/* Article */}
              <article>
                <p className="text-gray-600 text-lg leading-relaxed mb-8 pb-8 border-b border-border font-medium">
                  {post.description}
                </p>
                {post.sections.map((section, i) => (
                  <Section key={i} section={section} />
                ))}

                {/* Como a JPX pode ajudar */}
                <div className="mt-14 pt-10 border-t border-border">
                  <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">Como a JPX pode ajudar</h2>
                  <p className="text-gray-500 text-sm mb-7">Cada projeto começa com diagnóstico. Nenhuma proposta é feita sem entender o ambiente real.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {([
                      { step: '01', title: 'Assessment Executivo', desc: 'Diagnóstico completo do ambiente — riscos, lacunas e roadmap priorizado. Gratuito e sem compromisso.' },
                      { step: '02', title: 'Projeto de Modernização', desc: 'Arquitetura desenhada para o seu workload. Sem templates genéricos, sem soluções de prateleira.' },
                      { step: '03', title: 'Implantação', desc: 'Execução estruturada em fases. Ambiente destino validado antes do cutover. Rollback disponível em cada etapa.' },
                      { step: '04', title: 'Operação Assistida', desc: 'Monitoramento contínuo, suporte com SLA documentado e melhoria contínua após a implantação.' },
                    ] as const).map((item) => (
                      <div key={item.step} className="flex gap-4 p-5 bg-muted border border-border rounded-xl">
                        <span className="font-heading font-bold text-2xl text-primary/20 shrink-0 leading-none mt-0.5">{item.step}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                          <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/servicos/assessment-executivo"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-hover transition-colors text-sm"
                  >
                    Solicitar Assessment Executivo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="mt-10 pt-8 border-t border-border">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para o Centro de Conhecimento
                  </Link>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* CTA */}
                <div className="bg-primary rounded-2xl p-6 text-white sticky top-24">
                  <p className="font-heading font-bold text-lg mb-3 leading-snug">
                    Precisa implementar isso na sua empresa?
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">
                    Assessment gratuito, sem compromisso. Retorno em até 1 dia útil.
                  </p>
                  <Link
                    href="/servicos/assessment-executivo"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-primary font-semibold rounded-xl text-sm hover:bg-white/90 transition-colors"
                  >
                    Solicitar Assessment <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 text-sm uppercase tracking-wide mb-4">
                      Outros artigos
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/blog/${p.slug}`}
                          className="group block p-4 border border-border rounded-xl hover:border-secondary/40 hover:shadow-sm transition-all"
                        >
                          <span className="text-xs font-semibold text-secondary uppercase tracking-wide block mb-1.5">
                            {p.category}
                          </span>
                          <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors leading-snug">
                            {p.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="dark-grid-bg py-20">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-4">
                  Quer saber como isso se aplica ao seu ambiente?
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Cada empresa tem uma realidade diferente. Um assessment identifica o que realmente precisa ser feito — sem template genérico.
                </p>
                <ul className="space-y-3">
                  {['Diagnóstico gratuito, sem compromisso', 'Retorno em até 1 dia útil', 'Atendimento direto com especialista'].map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
