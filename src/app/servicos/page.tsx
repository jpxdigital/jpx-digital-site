import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Cloud, Database, RefreshCw, Shield, TrendingDown, Headphones,
  Server, Cpu, Network, Lock, Monitor, Box, Flame, Award,
  ArrowRight, ShieldCheck, BrainCircuit,
} from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Serviços de TI e Cloud Computing',
  description:
    'Consultoria em cloud computing, backup corporativo, disaster recovery, resiliência cibernética, FinOps, Docker, Kubernetes e infraestrutura crítica.',
}

const allServices = [
  {
    category: 'Cloud',
    items: [
      { href: '/servicos/cloud-computing', icon: Cloud, title: 'Cloud Computing', desc: 'Migração, gestão e otimização em OCI, Azure e AWS.' },
      { href: '/servicos/oracle-cloud-oci', icon: Server, title: 'Oracle Cloud (OCI)', desc: 'Especialistas certificados em Oracle Cloud Infrastructure.' },
      { href: '/servicos/microsoft-azure', icon: Cloud, title: 'Microsoft Azure', desc: 'Arquitetura, migração e gestão de ambientes Azure.' },
      { href: '/servicos/aws', icon: Cloud, title: 'Amazon Web Services', desc: 'Infraestrutura, custos e segurança na AWS.' },
      { href: '/servicos/finops', icon: TrendingDown, title: 'FinOps', desc: 'Reduza gastos em cloud sem sacrificar performance.' },
      { href: '/servicos/migracao-de-ambientes', icon: RefreshCw, title: 'Migração de Ambientes', desc: 'Cutover sem downtime — on-premise para cloud ou cloud-to-cloud.' },
    ],
  },
  {
    category: 'Continuidade & Segurança',
    items: [
      { href: '/servicos/backup-corporativo', icon: Database, title: 'Backup Corporativo', desc: 'RPO e RTO definidos, testados e garantidos em contrato.' },
      { href: '/servicos/disaster-recovery', icon: RefreshCw, title: 'Disaster Recovery', desc: 'Retome operações em minutos após qualquer falha.' },
      { href: '/servicos/business-continuity', icon: Shield, title: 'Business Continuity', desc: 'Plano de continuidade operacional para seu negócio.' },
      { href: '/servicos/backup-microsoft-365', icon: Database, title: 'Backup — Microsoft 365', desc: 'Backup completo de e-mail, SharePoint, Teams e OneDrive.' },
      { href: '/servicos/acronis', icon: Shield, title: 'Acronis Cyber Protect', desc: 'Backup e proteção cibernética integrados.' },
      { href: '/servicos/resiliencia-cibernetica', icon: Lock, title: 'Resiliência Cibernética', desc: 'Hardening, SIEM e resposta a incidentes.' },
    ],
  },
  {
    category: 'Infraestrutura',
    items: [
      { href: '/servicos/infraestrutura', icon: Server, title: 'Infraestrutura Corporativa', desc: 'Projeto e sustentação de ambientes críticos.' },
      { href: '/servicos/virtualizacao', icon: Box, title: 'VMware & Virtualização', desc: 'VMware vSphere, Hyper-V e KVM — HA, DRS e hiperconvergência.' },
      { href: '/servicos/containers-kubernetes', icon: Cpu, title: 'OpenShift / OKD & Kubernetes', desc: 'Kubernetes enterprise para ambientes regulados e produção crítica.' },
      { href: '/servicos/firewall-vpn', icon: Flame, title: 'Firewall & VPN', desc: 'Perímetro seguro e acesso remoto corporativo.' },
      { href: '/servicos/monitoramento', icon: Monitor, title: 'Monitoramento', desc: 'Visibilidade 24/7 de toda a sua infraestrutura.' },
      { href: '/servicos/hardening', icon: Lock, title: 'Hardening', desc: 'Endurecimento de servidores, redes e endpoints.' },
    ],
  },
  {
    category: 'Certificados',
    items: [
      { href: '/servicos/certificados-digitais', icon: Award, title: 'Certificados Digitais ICP-Brasil', desc: 'Revendedor autorizado ACDIGITAL. Emitimos e-CPF e e-CNPJ A1/A3 — 100% remoto, com gestão de renovação.' },

    ],
  },
  {
    category: 'Gestão & Consultoria',
    items: [
      { href: '/servicos/suporte-gerenciado', icon: Headphones, title: 'Suporte Gerenciado', desc: 'Equipe especializada com SLA garantido.' },
      { href: '/servicos/consultoria-estrategica', icon: Network, title: 'Consultoria Estratégica', desc: 'Alinhamento entre TI e objetivos do negócio.' },
    ],
  },
  {
    category: 'IA Corporativa',
    items: [
      { href: '/servicos/ai-readiness-assessment', icon: BrainCircuit, title: 'AI Readiness Assessment', desc: 'Avaliação de maturidade, riscos, LGPD e roadmap para adoção segura de IA.' },
    ],
  },
]

export default function ServicosPage() {
  return (
    <MotionProvider>
      <Nav />
      <main>
        {/* Hero */}
        <section className="hero-grid-bg py-24 lg:py-32">
          <div className="container-page">
            <FadeIn>
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                Serviços
              </p>
              <h1 className="type-display text-white mb-6 max-w-2xl">
                Tecnologia especializada para cada camada do seu negócio.
              </h1>
              <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
                Do cloud à infraestrutura local. Da prevenção à continuidade operacional. Cada serviço desenhado para resolver um problema real.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Services grid by category */}
        <section className="py-24 bg-white">
          <div className="container-page space-y-20">
            {allServices.map((cat, ci) => (
              <div key={cat.category}>
                <FadeIn>
                  <h2 className="font-heading text-xl font-bold text-primary uppercase tracking-wide mb-8 pb-4 border-b border-border">
                    {cat.category}
                  </h2>
                </FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.items.map((item, ii) => {
                    const Icon = item.icon
                    return (
                      <FadeIn key={item.href} delay={ii * 0.04 + ci * 0.02}>
                        <Link
                          href={item.href}
                          className="group flex items-start gap-4 p-5 border border-border rounded-xl hover:border-secondary/40 hover:shadow-md transition-all"
                        >
                          <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/8 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-secondary group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                        </Link>
                      </FadeIn>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted border-t border-border">
          <div className="container-page text-center">
            <FadeIn>
              <h2 className="type-h2 text-gray-900 mb-4">
                Não encontrou o que precisa?
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Entre em contato. Nossa equipe avalia seu ambiente e indica a solução mais adequada.
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
