import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Shield, Target, Zap, Users, BrainCircuit } from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Sobre a JPX Digital | Consultoria de TI Premium',
  description:
    'A JPX Digital integra Inteligência Artificial aos seus serviços de cloud, cibersegurança e infraestrutura para aumentar produtividade, acelerar diagnósticos e automatizar processos — sempre com supervisão especializada.',
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
  { valor: '23+', label: 'Anos de experiência em infraestrutura' },
  { valor: '50+', label: 'Empresas atendidas' },
  { valor: '5', label: 'Provedores de cloud certificados (OCI, Azure, AWS, Magalú Cloud e SaveInCloud)' },
]

const especialidades = [
  'Oracle Cloud Infrastructure (OCI) — incluindo migração de workloads Oracle',
  'Microsoft Azure — integração com Microsoft 365 e Entra ID',
  'Amazon Web Services (AWS) — desde infra básica até arquiteturas serverless',
  'Magalú Cloud e SaveInCloud — cloud nacional com suporte em português',
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
          <div className="container-page">
            <FadeIn>
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                Sobre a JPX Digital
              </p>
              <h1 className="type-display text-white mb-6 max-w-2xl">
                Tecnologia que sustenta o que importa — com responsabilidade técnica de ponta a ponta.
              </h1>
              <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
                Não somos uma revenda de software. Somos arquitetos de infraestrutura — consultores que ficam até o problema estar resolvido, não até o contrato expirar.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Números */}
        <section className="py-16 bg-white border-b border-border">
          <div className="container-page">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {numeros.map((n) => (
                <FadeIn key={n.label}>
                  <div className="text-center">
                    <p className="font-heading text-4xl font-bold text-primary mb-2">{n.valor}</p>
                    <p className="text-sm text-gray-500 leading-snug">{n.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Quem somos */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <FadeIn>
                <div>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                    Nossa história
                  </p>
                  <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
                    Nascemos do interior de São Paulo para o mercado nacional.
                  </h2>
                  <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
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
                <div className="bg-white border border-border rounded-2xl p-8">
                  <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-6">
                    Especialidades
                  </p>
                  <ul className="space-y-3">
                    {especialidades.map((esp) => (
                      <li key={esp} className="flex items-start gap-3 text-gray-600 text-sm">
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

        {/* IA integrada à operação */}
        <section className="py-20 bg-white border-b border-border">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/8 border border-secondary/20 text-secondary text-xs font-semibold tracking-widest uppercase mb-6">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  AI-Assisted Consulting
                </div>
                <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
                  A JPX Digital integra Inteligência Artificial aos seus serviços de cloud, cibersegurança e infraestrutura.
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Para aumentar produtividade, acelerar diagnósticos, automatizar processos e apoiar decisões técnicas — sempre com supervisão de especialistas e governança adequada.
                </p>
                <p className="text-gray-500 text-base leading-relaxed">
                  Não somos uma empresa de IA. Somos uma consultoria que aplica IA com responsabilidade — no mesmo perfil boutique que define a JPX: profundidade técnica, resultado documentado e supervisão de ponta a ponta.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <FadeIn>
              <div className="mb-12">
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                  Nossos valores
                </p>
                <h2 className="font-heading text-3xl font-bold text-gray-900">
                  O que nos define como parceiros de tecnologia
                </h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-5">
              {valores.map(({ icon: Icon, titulo, descricao }) => (
                <FadeIn key={titulo}>
                  <div className="flex gap-5 bg-muted border border-border rounded-2xl p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-gray-900 mb-2">{titulo}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{descricao}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <div className="border-l-4 border-primary pl-8 space-y-5">
                  <p className="text-gray-900 text-xl font-semibold leading-relaxed">
                    "Consultoria de TI boa não é a que tem o maior catálogo de serviços. É a que entende qual problema o cliente tem de verdade."
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Muitas empresas chegam até nós com uma solução já definida na cabeça. Nosso primeiro trabalho — às vezes o mais valioso — é ajudar a verificar se essa solução resolve o problema certo.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Às vezes a resposta é sim, e avançamos rápido. Às vezes a análise revela que o problema real é diferente do percebido — e isso economiza meses de esforço e recursos investidos na direção errada.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Isso é o que entendemos como consultoria de verdade: o diagnóstico honesto antes da solução.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="dark-grid-bg py-20">
          <div className="container-page text-center">
            <FadeIn>
              <h2 className="font-heading text-3xl font-bold text-white mb-4">
                Pronto para um diagnóstico honesto?
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                Assessment inicial sem custo. Entendemos o ambiente, identificamos os riscos e apresentamos o que faz sentido — sem pressão comercial.
              </p>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-hover transition-colors"
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
