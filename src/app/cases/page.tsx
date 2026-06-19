import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Building2, Heart, Scale, Factory } from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Cases de Sucesso — Projetos de Infraestrutura e Cloud',
  description:
    'Projetos reais de cloud, backup corporativo, disaster recovery e infraestrutura para hospitais, indústrias, escritórios e advocacia. Resultados concretos, sem generalização.',
  alternates: { canonical: 'https://jpxdigital.com.br/cases' },
}

const cases = [
  {
    icon: Heart,
    segment: 'Saúde',
    label: 'Hospital de médio porte — interior de SP',
    challenge: 'O hospital não tinha backup externo dos prontuários eletrônicos. Os backups locais eram feitos em fita — sem teste de restauração há mais de 2 anos. Um ataque de ransomware comprometeu 3 servidores em um domingo à noite.',
    solution: 'Implementamos backup imutável off-site com retenção de 20 anos (requisito CFM), restauramos os sistemas em 4 horas a partir de um backup de 18 horas antes do ataque, e entregamos um plano de DR com RTO de 2h para sistemas críticos. Após o projeto: Acronis Cyber Protect em todos os servidores, segmentação IT/OT e monitoramento contínuo.',
    results: [
      'Restauração em 4h — sem pagar resgate',
      'Zero perda de prontuários',
      'Backup imutável com retenção 20 anos conforme CFM',
      'Plano de DR testado a cada 6 meses',
    ],
    href: '/segmentos/hospitais-clinicas',
  },
  {
    icon: Factory,
    segment: 'Indústria',
    label: 'Indústria alimentícia — migração para OCI',
    challenge: 'ERP Oracle (JD Edwards) rodando em servidores físicos com 8 anos de uso, sem suporte do fabricante e com falhas de disco recorrentes. A empresa queria cloud, mas tinha medo de interromper a produção durante a migração.',
    solution: 'Realizamos a migração lift-and-shift para Oracle Cloud (OCI) em 3 fases ao longo de 6 semanas, com o ambiente on-prem em stand-by durante o cutover. Aproveitamos o BYOL Oracle para reduzir custo de licença. O sistema foi para cloud sem nenhuma interrupção de produção.',
    results: [
      'Zero downtime durante a migração',
      'Redução de 35% no custo de infraestrutura (TCO 3 anos)',
      'Eliminação de servidores físicos legados',
      'Suporte Oracle mantido via OCI',
    ],
    href: '/segmentos/industrias',
  },
  {
    icon: Scale,
    segment: 'Advocacia',
    label: 'Escritório de advocacia — 45 advogados',
    challenge: 'O escritório usava Microsoft 365, mas sem backup externo. Os notebooks dos advogados não tinham backup. Um incidente com um notebook corrompido revelou que 3 anos de peças processuais de um sócio estavam perdidos — só havia a versão online do OneDrive, sobrescrita.',
    solution: 'Backup externo de todo o tenant M365 (Exchange, SharePoint, OneDrive, Teams) com retenção de 5 anos. Backup de endpoints Windows com Acronis (todos os notebooks e desktops). Controle de acesso por pasta: cada advogado acessa apenas seus clientes. Relatório mensal de status de backup.',
    results: [
      'Documentos sobrescritos recuperados via histórico de versões do OneDrive',
      'Backup de 47 caixas M365 implementado em 2 dias',
      'Controle de acesso por cliente implementado',
      'Retenção 5 anos conforme exigências OAB',
    ],
    href: '/segmentos/advocacia',
  },
  {
    icon: Building2,
    segment: 'Corporativo',
    label: 'Escritório de contabilidade — 120 usuários',
    challenge: 'Gastos de cloud crescendo 15% ao mês sem explicação clara. O gerente de TI não tinha visibilidade dos recursos provisionados em Azure. Instâncias de desenvolvimento e homologação ligadas 24/7 desnecessariamente.',
    solution: 'FinOps em 30 dias: auditoria de todos os recursos Azure, desligamento de 14 instâncias de dev/homolog fora do horário comercial, rightsizing de 8 VMs superdimensionadas, migração de 3 servidores de staging para Azure Reserved Instances. Implementação de budget alerts por departamento.',
    results: [
      'Redução de 41% na fatura Azure no primeiro mês',
      'Economia anual estimada: R$ 84.000',
      'Visibilidade completa de custo por projeto',
      'Budget alerts ativos — sem surpresas',
    ],
    href: '/segmentos/escritorios',
  },
]

export default function CasesPage() {
  return (
    <MotionProvider>
      <Nav />
      <main>
        {/* Hero */}
        <section className="hero-grid-bg py-24 lg:py-32">
          <div className="container-page">
            <FadeIn>
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">Cases</p>
              <h1 className="type-display text-white mb-6 max-w-2xl">
                Projetos reais. Resultados concretos.
              </h1>
              <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
                Por confidencialidade, os clientes são identificados apenas por segmento e porte. Os resultados são reais e verificáveis durante o processo de avaliação.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Cases */}
        <section className="py-24 bg-white">
          <div className="container-page space-y-10">
            {cases.map((c, i) => {
              const Icon = c.icon
              return (
                <FadeIn key={c.label} delay={i * 0.06}>
                  <div className="border border-border rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-muted px-8 py-5 flex items-center gap-4 border-b border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/8 text-primary flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-secondary uppercase tracking-wide block">
                          {c.segment}
                        </span>
                        <h2 className="font-heading font-bold text-gray-900">{c.label}</h2>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                      {/* Desafio */}
                      <div className="p-8 border-b lg:border-b-0 lg:border-r border-border min-w-0">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Desafio</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{c.challenge}</p>
                      </div>

                      {/* Solução */}
                      <div className="p-8 border-b lg:border-b-0 lg:border-r border-border min-w-0">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Solução</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{c.solution}</p>
                      </div>

                      {/* Resultados */}
                      <div className="p-8 min-w-0">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Resultados</p>
                        <ul className="space-y-3">
                          {c.results.map((r) => (
                            <li key={r} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-sm leading-relaxed">{r}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={c.href}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary mt-5 hover:gap-2.5 transition-all"
                        >
                          Ver soluções para {c.segment.toLowerCase()} <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted border-t border-border">
          <div className="container-page text-center">
            <FadeIn>
              <h2 className="type-h2 text-gray-900 mb-4">
                Seu caso pode ser o próximo.
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                O processo começa com um assessment gratuito. Nossa equipe avalia o ambiente e apresenta o que realmente pode ser feito — com números, não com promessas.
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
