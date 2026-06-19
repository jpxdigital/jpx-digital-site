import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Sobre a JPX Digital',
  description:
    'Conheça a JPX Digital — consultoria boutique premium especializada em cloud, infraestrutura crítica e resiliência cibernética para empresas brasileiras.',
}

export default function SobrePage() {
  return (
    <MotionProvider>
      <Nav />
      <main>
        {/* Hero */}
        <section className="hero-grid-bg py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 max-w-3xl">
            <FadeIn>
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                Sobre
              </p>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Uma consultoria para quem leva tecnologia a sério.
              </h1>
              <p className="text-white/65 text-xl leading-relaxed">
                A JPX Digital não vende pacotes genéricos. Entregamos projetos sob medida, com responsabilidade técnica e foco no resultado do seu negócio.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-10 text-gray-700 text-lg leading-relaxed">
              <FadeIn>
                <p>
                  Somos uma consultoria boutique especializada em ambientes onde a tecnologia sustenta operações críticas. Hospitais, indústrias, escritórios corporativos e financeiras que dependem de infraestrutura disponível, segura e resiliente.
                </p>
              </FadeIn>
              <FadeIn>
                <p>
                  Trabalhamos com Oracle Cloud Infrastructure (OCI), Microsoft Azure e AWS — não como revendedores, mas como arquitetos de soluções. Cada projeto começa com um diagnóstico honesto do ambiente do cliente, sem pressão comercial.
                </p>
              </FadeIn>
              <FadeIn>
                <p>
                  Nossa diferença está na combinação de profundidade técnica com atendimento executivo. Você fala diretamente com quem vai executar o projeto — sem camadas intermediárias, sem terceirização silenciosa.
                </p>
              </FadeIn>
              <FadeIn>
                <div className="pt-4">
                  <Link
                    href="/contato"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
                  >
                    Solicitar Assessment <ArrowRight className="w-4 h-4" />
                  </Link>
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
