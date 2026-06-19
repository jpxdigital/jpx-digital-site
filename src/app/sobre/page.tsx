import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Target, Zap, Users } from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Sobre a JPX Digital | Consultoria de TI Premium',
  description:
    'JPX Digital é uma consultoria boutique especializada em cloud computing, segurança cibernética e infraestrutura crítica. Conheça nossa história, valores e compromisso com excelência técnica.',
}

const valores = [
  {
    icon: Target,
    titulo: 'Honestidade técnica',
    descricao:
      'Não vendemos o que não precisamos vender. Se a solução mais barata resolve o problema, dizemos isso. Nosso interesse é o resultado do cliente — não a comissão.',
  },
  {
    icon: Shield,
    titulo: 'Responsabilidade sem terceirização',
    descricao:
      'Você fala com quem executa. Não há camadas de atendimento antes de chegar ao engenheiro. A responsabilidade técnica é nossa do início ao fim do projeto.',
  },
  {
    icon: Zap,
    titulo: 'Profundidade, não superficialidade',
    descricao:
      'Cada ambiente é diferente. Entregamos arquiteturas desenhadas para o seu workload, não templates copiados de projetos anteriores.',
  },
  {
    icon: Users,
    titulo: 'Parceria de longo prazo',
    descricao:
      'Os melhores resultados vêm de quem conhece o negócio do cliente profundamente. Não trabalhamos com projetos pontuais desconectados — construímos relações.',
  },
]

const numeros = [
  { valor: '10+', label: 'Anos de experiência em infraestrutura' },
  { valor: '50+', label: 'Empresas atendidas no interior paulista' },
  { valor: '99,9%', label: 'SLA de disponibilidade nos ambientes gerenciados' },
  { valor: '3', label: 'Provedores de cloud certificados (OCI, Azure, AWS)' },
]

const especialidades = [
  'Oracle Cloud Infrastructure (OCI) — incluindo migração de workloads Oracle',
  'Microsoft Azure — integração com Microsoft 365 e Entra ID',
  'Amazon Web Services (AWS) — desde infra básica até arquiteturas serverless',
  'Backup corporativo e Disaster Recovery — com testes de restauração documentados',
  'Segurança cibernética gerenciada — EDR, firewall NGFW, hardening e resposta a incidentes',
  'Suporte de TI gerenciado (MSP) — monitoramento 24/7 e helpdesk com SLA',
  'Automação de processos — n8n, integrações via API, workflows inteligentes',
  'Compliance LGPD — adequação técnica para empresas dos setores de saúde e jurídico',
]

export default function SobrePage() {
  return (
    <MotionProvider>
      <Nav />
      <main>
        {/* Hero */}
        <section className="hero-grid-bg py-24 lg:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                Sobre a JPX Digital
              </p>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-3xl">
                Tecnologia que sustenta o que importa — com responsabilidade técnica de ponta a ponta.
              </h1>
              <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
                Não somos uma revenda de software. Somos arquitetos de infraestrutura — consultores que ficam até o problema estar resolvido, não até o contrato expirar.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Números */}
        <section className="bg-surface-1 border-y border-white/[0.06] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {numeros.map((n) => (
                <FadeIn key={n.label}>
                  <div className="text-center">
                    <p className="font-heading text-4xl font-bold text-secondary mb-2">{n.valor}</p>
                    <p className="text-sm text-white/50 leading-snug">{n.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Quem somos */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <FadeIn>
                <div>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                    Nossa história
                  </p>
                  <h2 className="font-heading text-3xl font-bold text-white mb-6">
                    Nascemos do interior de São Paulo para o mercado nacional.
                  </h2>
                  <div className="space-y-5 text-white/65 text-lg leading-relaxed">
                    <p>
                      A JPX Digital nasceu da constatação de que empresas no interior do Brasil — hospitais, indústrias, escritórios — não tinham acesso à mesma qualidade de consultoria de TI disponível nos grandes centros.
                    </p>
                    <p>
                      Fundada em Presidente Prudente-SP, com operação para todo o Brasil, posicionamos a JPX como a alternativa para empresas que exigem profundidade técnica real e não se contentam com atendimento genérico de balcão.
                    </p>
                    <p>
                      Nossa abordagem é sempre a mesma: diagnóstico honesto do ambiente, arquitetura adequada ao negócio e responsabilidade compartilhada pelo resultado. Sem promessas exageradas, sem soluções de prateleira.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="bg-surface-1 border border-white/[0.08] rounded-2xl p-8">
                  <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-6">
                    Especialidades
                  </p>
                  <ul className="space-y-3">
                    {especialidades.map((esp) => (
                      <li key={esp} className="flex items-start gap-3 text-white/70 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                        {esp}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-24 bg-surface-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                  Nossos valores
                </p>
                <h2 className="font-heading text-3xl font-bold text-white">
                  O que nos define como parceiros de tecnologia
                </h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-6">
              {valores.map(({ icon: Icon, titulo, descricao }) => (
                <FadeIn key={titulo}>
                  <div className="bg-surface-2 border border-white/[0.08] rounded-2xl p-8 h-full">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white mb-3">{titulo}</h3>
                    <p className="text-white/60 leading-relaxed">{descricao}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto / Diferencial */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <div className="border-l-2 border-secondary pl-8 space-y-6 text-white/70 text-lg leading-relaxed">
                  <p className="text-white text-xl font-medium">
                    "Consultoria de TI boa não é a que tem o maior catálogo de serviços. É a que entende qual problema o cliente tem de verdade."
                  </p>
                  <p>
                    Muitas empresas chegam até nós com uma solução já definida na cabeça. Nosso primeiro trabalho — às vezes o mais valioso — é ajudar a verificar se essa solução resolve o problema certo.
                  </p>
                  <p>
                    Às vezes a resposta é sim, e avançamos rápido. Às vezes a análise revela que o problema real é diferente do percebido — e isso economiza meses de esforço e recursos investidos na direção errada.
                  </p>
                  <p>
                    Isso é o que entendemos como consultoria de verdade: o diagnóstico honesto antes da solução.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-surface-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <h2 className="font-heading text-3xl font-bold text-white mb-4">
                Pronto para um diagnóstico honesto?
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                Assessment inicial sem custo. Entendemos o ambiente, identificamos os riscos e apresentamos o que faz sentido — sem pressão comercial.
              </p>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
              >
                Solicitar Assessment Gratuito <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </MotionProvider>
  )
}
