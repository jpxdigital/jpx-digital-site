import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { FadeIn } from '@/components/ui/FadeIn'
import { posts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Centro de Conhecimento — Infraestrutura, Cloud e Continuidade Operacional',
  description:
    'Biblioteca técnica para CIOs, diretores e gestores de TI. Artigos executivos, guias técnicos e checklists sobre cloud, disaster recovery, backup corporativo e resiliência cibernética.',
  alternates: { canonical: 'https://jpxdigital.com.br/blog' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <MotionProvider>
      <Nav />
      <main>
        {/* Hero */}
        <section className="hero-grid-bg py-24 lg:py-32">
          <div className="container-page">
            <FadeIn>
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">Centro de Conhecimento</p>
              <h1 className="type-display text-white mb-6 max-w-2xl">
                Conteúdo de autoridade para quem decide sobre infraestrutura crítica.
              </h1>
              <p className="text-white/65 text-xl leading-relaxed max-w-xl">
                Artigos executivos, guias técnicos e checklists. Sem viés de venda — só o que um CIO ou diretor precisa saber antes de tomar uma decisão de TI.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Posts */}
        <section className="py-24 bg-white">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {sorted.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 0.07}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-secondary/30 transition-all duration-200"
                  >
                    {/* Category bar */}
                    <div className="px-6 pt-6 pb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wide">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 px-6 pb-6">
                      <h2 className="font-heading font-bold text-gray-900 text-lg leading-snug mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime} min de leitura
                        </span>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary group-hover:gap-3 transition-all">
                        Ler artigo <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted border-t border-border">
          <div className="container-page text-center">
            <FadeIn>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                Tem uma dúvida que não encontrou resposta aqui?
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Nossos especialistas respondem perguntas técnicas sem compromisso. Entre em contato.
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
