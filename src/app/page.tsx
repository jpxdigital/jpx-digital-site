import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, CheckCircle2, AlertTriangle, Server,
  Database, RefreshCw, Shield, TrendingDown, Cloud,
  Headphones, Building2, Heart, Factory, Scale, ShieldCheck,
} from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from '@/components/sections/ContactForm'
import { FadeIn } from '@/components/ui/FadeIn'
import { MotionProvider } from '@/components/providers/MotionProvider'

export const metadata: Metadata = {
  title: 'Consultoria de TI, Cloud e Segurança Corporativa',
  description:
    'A JPX Digital é uma consultoria especializada em cloud computing, backup corporativo, disaster recovery e resiliência cibernética para empresas que não podem parar.',
}

const painCards = [
  {
    pain: '"Meu ERP não pode parar. Uma hora fora do ar custa caro demais."',
    solution: 'Disaster Recovery com RTO e RPO definidos em contrato. Failover testado regularmente. Você retoma em minutos, não em dias.',
    href: '/servicos/disaster-recovery',
    label: 'Disaster Recovery',
    icon: RefreshCw,
  },
  {
    pain: '"Sofremos um ataque. Perdemos arquivos. Não tínhamos backup confiável."',
    solution: 'Backup corporativo com estratégia 3-2-1, criptografia AES-256 e backups imutáveis à prova de ransomware. Testados, documentados, garantidos.',
    href: '/servicos/backup-corporativo',
    label: 'Backup Corporativo',
    icon: Database,
  },
  {
    pain: '"Gasto muito na cloud todo mês e não consigo explicar por quê."',
    solution: 'FinOps: auditoria de desperdício com economia quantificada antes de qualquer proposta. Rightsizing, reservas e governança contínua.',
    href: '/servicos/finops',
    label: 'FinOps',
    icon: TrendingDown,
  },
  {
    pain: '"Meu hospital precisa operar 24 horas. Sistema fora do ar não é opção."',
    solution: 'Infraestrutura com alta disponibilidade, links redundantes, cluster de servidores e plano de DR específico para ambientes de saúde e LGPD.',
    href: '/segmentos/hospitais-clinicas',
    label: 'Saúde & Clínicas',
    icon: Heart,
  },
  {
    pain: '"Preciso migrar para a cloud sem interromper a operação."',
    solution: 'Migração planejada em fases, ambiente destino 100% testado antes do cutover, rollback disponível em cada etapa. Sem surpresas.',
    href: '/servicos/migracao-de-ambientes',
    label: 'Migração de Ambientes',
    icon: Cloud,
  },
  {
    pain: '"Alguém me disse que meu ambiente pode ter vulnerabilidades. Não sei por onde começar."',
    solution: 'Assessment de segurança, hardening com CIS Benchmarks, monitoramento contínuo e resposta a incidentes. Você começa sabendo onde está.',
    href: '/servicos/resiliencia-cibernetica',
    label: 'Resiliência Cibernética',
    icon: Shield,
  },
]

const differentials = [
  'Assessment gratuito antes de qualquer proposta',
  'SLA documentado em contrato — não apenas prometido',
  'Você fala com quem executa, sem intermediários',
  'Certificados Oracle OCI, Microsoft Azure, AWS e Acronis',
  'Revendedor autorizado de certificados digitais ICP-Brasil',
  'Infraestrutura própria em Oracle Cloud',
  'Atendimento 100% em português, com contexto de negócio',
]

const segments = [
  { href: '/segmentos/hospitais-clinicas', icon: Heart, title: 'Hospitais & Clínicas', desc: 'LGPD, backup de prontuários por 20 anos e disponibilidade que não falha.' },
  { href: '/segmentos/industrias', icon: Factory, title: 'Indústrias', desc: 'Linha de produção contínua. Integração ERP-OT. Custo de parada calculado.' },
  { href: '/segmentos/escritorios', icon: Building2, title: 'Escritórios Corporativos', desc: 'Microsoft 365 correto, backup de endpoints e suporte MSP com SLA.' },
  { href: '/segmentos/advocacia', icon: Scale, title: 'Advocacia', desc: 'Sigilo profissional protegido. Backup jurídico imutável. Certificados gerenciados.' },
  { href: '/segmentos/autoridades-certificadoras', icon: ShieldCheck, title: 'Autoridades Certificadoras', desc: 'Sala cofre N4, cluster HSM, VMware e OpenShift para ACs ICP-Brasil.' },
]

export default function Home() {
  return (
    <MotionProvider>
      <Nav />

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="hero-grid-bg relative overflow-hidden" aria-labelledby="hero-title">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 55% at 65% -5%, rgba(0,120,212,0.22) 0%, transparent 60%)' }}
          />

          <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 xl:gap-16 items-center">

              {/* ── Left: headline + CTAs ── */}
              <div>
                <FadeIn direction="none">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/75 text-xs font-medium tracking-wide mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    Assessment gratuito de infraestrutura
                  </div>
                </FadeIn>

                <FadeIn delay={0.05}>
                  <h1
                    id="hero-title"
                    className="font-heading font-bold text-white leading-[1.1] tracking-tight mb-6 text-[1.875rem] sm:text-[2.25rem] lg:text-[2rem] xl:text-[2.625rem]"
                  >
                    Seu ambiente está preparado para{' '}
                    <span className="text-secondary">o que pode acontecer amanhã?</span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.08}>
                  <p className="text-white/60 text-[1.0625rem] leading-relaxed max-w-md mb-10">
                    Uma crise de TI não avisa. Diagnóstico gratuito, SLA em contrato e equipe que executa — sem intermediários.
                  </p>
                </FadeIn>

                <FadeIn delay={0.12}>
                  <div className="flex flex-col sm:flex-row gap-3 mb-14">
                    <Link
                      href="/contato"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-hover transition-colors text-[0.9375rem]"
                    >
                      Quero um diagnóstico gratuito
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                    <a
                      href="https://wa.me/5518930852246?text=Ol%C3%A1!%20Gostaria%20de%20um%20assessment%20gratuito%20de%20infraestrutura."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/8 border border-white/20 text-white font-medium rounded-xl hover:bg-white/14 transition-colors text-[0.9375rem]"
                    >
                      Falar no WhatsApp
                    </a>
                  </div>
                </FadeIn>

                <FadeIn delay={0.16}>
                  <div className="border-t border-white/10 pt-7 flex flex-wrap items-center gap-x-8 gap-y-2">
                    {[
                      { label: 'AWS Partner', dot: 'bg-[#FF9900]' },
                      { label: 'Oracle OCI Partner', dot: 'bg-red-400' },
                      { label: 'Microsoft Azure Partner', dot: 'bg-blue-400' },
                      { label: 'Acronis Partner', dot: 'bg-cyan-400' },
                      { label: 'Red Hat OpenShift', dot: 'bg-red-500' },
                      { label: 'ICP-Brasil', dot: 'bg-green-400' },
                    ].map((p) => (
                      <span key={p.label} className="flex items-center gap-1.5 text-[0.75rem] text-white/40 font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${p.dot} shrink-0`} />
                        {p.label}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* ── Right: question card ── */}
              <FadeIn delay={0.1} direction="none">
                <div className="bg-white/7 border border-white/15 rounded-2xl p-7 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5 mb-5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <p className="text-white/55 text-[0.75rem] font-semibold uppercase tracking-widest">
                      Seu gestor saberia responder?
                    </p>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Se sofrer ransomware hoje, em quanto tempo recupera os dados?',
                      'Se o servidor principal falhar, quanto tempo ficará fora do ar?',
                      'Seu backup do Microsoft 365 está realmente protegido?',
                      'Você sabe exatamente quanto desperdício tem na cloud?',
                      'A operação continua funcionando durante uma falha de TI?',
                    ].map((q) => (
                      <li key={q} className="flex items-start gap-3">
                        <span className="shrink-0 w-4 h-4 rounded border border-white/25 mt-0.5" />
                        <span className="text-white/70 text-[0.875rem] leading-snug">{q}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <p className="text-white/35 text-xs leading-relaxed">
                      Se alguma trouxe dúvida, você precisa de um diagnóstico — antes de precisar de um milagre.
                    </p>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* ── Badges / Parcerias ───────────────────────────── */}
        <section className="bg-white border-b border-border py-14">
          <div className="container-page">
            <FadeIn direction="none">
              <p className="text-center text-[0.6875rem] font-semibold text-gray-400 uppercase tracking-widest mb-10">
                Certificações e Parcerias Tecnológicas
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  {
                    abbrev: 'AWS',
                    name: 'Amazon Web Services',
                    cert: 'Partner Network',
                    bg: 'bg-[#232F3E]',
                    accent: 'bg-[#FF9900]',
                    text: 'text-[#FF9900]',
                  },
                  {
                    abbrev: 'OCI',
                    name: 'Oracle Cloud',
                    cert: 'Infrastructure Partner',
                    bg: 'bg-[#C74634]',
                    accent: 'bg-white/20',
                    text: 'text-white',
                  },
                  {
                    abbrev: 'Azure',
                    name: 'Microsoft Azure',
                    cert: 'Partner',
                    bg: 'bg-[#0078D4]',
                    accent: 'bg-white/20',
                    text: 'text-white',
                  },
                  {
                    abbrev: 'Acronis',
                    name: 'Acronis',
                    cert: 'Cyber Protect Partner',
                    bg: 'bg-[#2A4590]',
                    accent: 'bg-[#00AEEF]/30',
                    text: 'text-[#00AEEF]',
                  },
                  {
                    abbrev: 'OKD',
                    name: 'Red Hat',
                    cert: 'OpenShift / OKD',
                    bg: 'bg-[#CC0000]',
                    accent: 'bg-white/20',
                    text: 'text-white',
                  },
                  {
                    abbrev: '∞',
                    name: 'DevOps & CI/CD',
                    cert: 'GitHub Actions · n8n',
                    bg: 'bg-[#1a1a2e]',
                    accent: 'bg-violet-500/30',
                    text: 'text-violet-300',
                  },
                  {
                    abbrev: 'ICP',
                    name: 'ICP-Brasil',
                    cert: 'Revendedor Autorizado',
                    bg: 'bg-[#004A80]',
                    accent: 'bg-[#00C851]/30',
                    text: 'text-[#4ADE80]',
                  },
                ].map((b) => (
                  <div
                    key={b.name}
                    className={`${b.bg} rounded-xl flex flex-col items-center py-6 px-3 gap-3 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-36`}
                  >
                    <div className={`${b.accent} rounded-lg w-12 h-12 flex items-center justify-center`}>
                      <span className={`${b.text} font-heading font-bold text-sm tracking-tight`}>
                        {b.abbrev}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-xs leading-tight mb-0.5">{b.name}</p>
                      <p className="text-white/50 text-[0.6875rem] leading-tight">{b.cert}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-10 border-t border-gray-100">
                <p className="text-center text-[0.6875rem] font-semibold text-gray-400 uppercase tracking-widest mb-8">
                  Certificações Individuais
                </p>
                <div className="flex flex-wrap justify-center items-center gap-6">
                  {[
                    { src: '/badges/aws-sales-accredited.png', alt: 'AWS Sales Accredited – Trained Partner' },
                    { src: '/badges/aws-technical-accredited.png', alt: 'AWS Technical Accredited – Trained Partner' },
                    { src: '/badges/aws-sap-technical-skill.png', alt: 'AWS SAP on AWS Technical Skill – Partner' },
                    { src: '/badges/aws-cloud-practitioner.png', alt: 'AWS Certified Cloud Practitioner – Foundational' },
                    { src: '/badges/acronis-adv-security-edr-tech.png', alt: 'Acronis Academy – Adv. Security + EDR Cloud Tech' },
                    { src: '/badges/acronis-adv-security-edr-sales.png', alt: 'Acronis Academy – Adv. Security with EDR Cloud Sales' },
                    { src: '/badges/acronis-advanced-backup.png', alt: 'Acronis Academy – Advanced Backup Cloud Tech' },
                  ].map((badge) => (
                    <Image
                      key={badge.src}
                      src={badge.src}
                      alt={badge.alt}
                      width={96}
                      height={96}
                      className="w-20 h-20 object-contain"
                    />
                  ))}
                </div>
              </div>

              <p className="text-center text-[0.75rem] text-gray-400 mt-8">
                Certificações verificáveis sob solicitação durante o processo de avaliação.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Pain → Solution ───────────────────────────────── */}
        <section className="py-24 lg:py-32 bg-white" aria-labelledby="solutions-title">
          <div className="container-page">
            <FadeIn>
              <div className="max-w-2xl mb-16">
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                  Como resolvemos
                </p>
                <h2 id="solutions-title" className="type-h2 text-gray-900 mb-4">
                  Problemas reais.{' '}
                  <span className="text-primary">Soluções com SLA documentado.</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Cada engajamento começa pelo diagnóstico do problema — não pela venda de uma solução.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {painCards.map((card, i) => {
                const Icon = card.icon
                return (
                  <FadeIn key={card.href} delay={i * 0.06}>
                    <div className="flex flex-col h-full border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-secondary/30 transition-all duration-200 group">
                      {/* Pain quote */}
                      <div className="bg-gray-950 px-6 py-5 flex-shrink-0">
                        <p className="text-white/75 text-sm leading-relaxed italic">
                          {card.pain}
                        </p>
                      </div>
                      {/* Solution */}
                      <div className="flex flex-col flex-1 p-6 bg-white">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/8 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
                            {card.label}
                          </span>
                        </div>
                        <p className="text-gray-700 text-[0.9375rem] leading-relaxed flex-1 mb-5">
                          {card.solution}
                        </p>
                        <Link
                          href={card.href}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary group-hover:gap-3 transition-all"
                        >
                          Como fazemos isso <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>

            <FadeIn delay={0.25}>
              <div className="mt-14 text-center">
                <Link
                  href="/servicos"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors text-sm"
                >
                  Ver todos os serviços <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Differentials ─────────────────────────────────── */}
        <section className="py-24 bg-muted" aria-labelledby="why-title">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="left">
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                  Por que a JPX Digital
                </p>
                <h2 id="why-title" className="type-h2 text-gray-900 mb-8">
                  Especialização que faz{' '}
                  <span className="text-primary">diferença no seu resultado.</span>
                </h2>
                <ul className="space-y-4">
                  {differentials.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Link href="/sobre" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover">
                    Conheça a JPX Digital <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeIn>

              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: '20+', label: 'anos de experiência em infraestrutura crítica' },
                  { value: '< 1h', label: 'RTO garantido em contrato para ambientes críticos' },
                  { value: '99,9%', label: 'de disponibilidade nos ambientes gerenciados' },
                  { value: '24h', label: 'retorno máximo após solicitação de assessment' },
                ].map((stat, i) => (
                  <FadeIn key={stat.label} delay={i * 0.08}>
                    <div className="bg-white border border-border rounded-2xl p-6 text-center">
                      <div className="font-heading text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <p className="text-gray-600 text-xs leading-relaxed">{stat.label}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Segments ──────────────────────────────────────── */}
        <section className="dark-grid-bg py-24 lg:py-32" aria-labelledby="segments-title">
          <div className="container-page">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                  Segmentos
                </p>
                <h2 id="segments-title" className="type-h2 text-white mb-4">
                  Cada setor tem exigências específicas.
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  TI genérica resolve problemas genéricos. A JPX Digital entende as regulações, os riscos e os requisitos técnicos do seu setor.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {segments.map((seg, i) => {
                const Icon = seg.icon
                return (
                  <FadeIn key={seg.href} delay={i * 0.07}>
                    <Link
                      href={seg.href}
                      className="group flex flex-col p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/8 text-white/70 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading font-bold text-white mb-3">{seg.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{seg.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary group-hover:gap-3 transition-all">
                        Ver soluções <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── CTA + Contact ─────────────────────────────────── */}
        <section id="contato" className="py-24 lg:py-32 bg-muted" aria-labelledby="cta-title">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <FadeIn direction="left">
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                  Diagnóstico Gratuito
                </p>
                <h2 id="cta-title" className="type-h2 text-gray-900 mb-6">
                  Descubra o estado real do seu ambiente antes que um incidente descubra por você.
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  O assessment é gratuito e sem compromisso. Nossa equipe avalia riscos, identifica pontos cegos e apresenta um diagnóstico honesto — não uma lista de produtos para vender.
                </p>
                <div className="space-y-4 text-sm">
                  {[
                    'Sem compromisso — o diagnóstico é gratuito',
                    'Retorno em até 1 dia útil',
                    'Atendimento direto com o especialista que vai executar',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn>
                <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
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
