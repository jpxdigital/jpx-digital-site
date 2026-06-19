import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from '@/components/sections/ContactForm'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Contato — Solicitar Assessment',
  description:
    'Solicite um diagnóstico gratuito da sua infraestrutura de TI. Um especialista da JPX Digital retornará em até 1 dia útil.',
}

const benefits = [
  'Diagnóstico gratuito, sem compromisso',
  'Retorno em até 1 dia útil',
  'Atendimento direto com especialista certificado',
  'Análise personalizada do seu ambiente',
  'Proposta sob medida, sem pacotes genéricos',
]

export default function ContatoPage() {
  return (
    <MotionProvider>
      <Nav />
      <main>
        <section className="py-20 lg:py-32 bg-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <FadeIn direction="left">
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                  Contato
                </p>
                <h1 className="type-display text-gray-900 mb-6">
                  Solicite um{' '}
                  <span className="text-primary">Assessment gratuito</span>{' '}
                  da sua infraestrutura.
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                  Identifique vulnerabilidades, pontos de risco e oportunidades de melhoria antes que eles gerem impacto no seu negócio.
                </p>
                <ul className="space-y-4">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn>
                <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
                  <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">
                    Preencha e entraremos em contato
                  </h2>
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
