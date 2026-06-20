import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, ArrowDown, CheckCircle2, ChevronRight,
  FileText, Monitor, Shield, Database, Server, HardDrive, Search,
} from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { FadeIn } from '@/components/ui/FadeIn'
import { ContactForm } from '@/components/sections/ContactForm'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'backup-corporativo'

const faqs = [
  {
    question: 'Qual é a diferença entre backup e disaster recovery?',
    answer: 'Backup é a cópia dos dados. Disaster Recovery é o processo completo de retomar as operações após um incidente — inclui backup, mas também infraestrutura alternativa, procedimentos de failover e testes periódicos. Um sem o outro é incompleto para ambientes críticos.',
  },
  {
    question: 'Com que frequência o backup é testado?',
    answer: 'Realizamos testes de restore mensais em todos os ambientes que gerenciamos. Um backup não testado é apenas esperança. Entregamos relatório mensal com o resultado de cada restore, incluindo tempo de recuperação medido.',
  },
  {
    question: 'Onde os dados do backup ficam armazenados?',
    answer: 'Implementamos estratégia 3-2-1: 3 cópias, em 2 mídias diferentes, sendo 1 cópia offsite. Normalmente usamos armazenamento local (NAS) + Object Storage em nuvem (OCI, AWS S3, Backblaze B2). Todos os dados são criptografados com AES-256 antes da transmissão.',
  },
  {
    question: 'O backup cobre sistemas em cloud também?',
    answer: 'Sim. Gerenciamos backup de servidores on-premise, VMs em OCI, Azure e AWS, bancos de dados Oracle, SQL Server, MySQL e PostgreSQL, e sistemas de arquivo. O agente é leve e funciona sem impacto perceptível em produção.',
  },
  {
    question: 'Quanto tempo leva para restaurar dados em caso de incidente?',
    answer: 'Depende do RPO e RTO definidos no projeto. Em ambientes que gerenciamos, trabalhamos com RTO de 1 a 4 horas para restauração completa de servidores críticos. Restauração de arquivos individuais leva minutos.',
  },
]

export const metadata: Metadata = {
  title: 'Backup Corporativo com RPO e RTO Garantidos',
  description:
    'Backup corporativo com RPO e RTO definidos em contrato e testados mensalmente. Criptografia AES-256, múltiplos destinos S3. Assessment gratuito.',
  keywords: ['backup corporativo', 'backup para empresas', 'backup empresarial', 'backup de dados', 'backup com RPO RTO'],
  openGraph: {
    title: 'Backup Corporativo com RPO e RTO Garantidos | JPX Digital',
    description: 'Backup corporativo com garantias documentadas em contrato. Testado mensalmente. Criptografia AES-256.',
    url: `${BASE}/servicos/${slug}`,
  },
  alternates: { canonical: `${BASE}/servicos/${slug}` },
}

const schemas = [
  serviceSchema(
    'Backup Corporativo',
    'Backup corporativo com RPO e RTO definidos em contrato, testados mensalmente. Criptografia AES-256 e múltiplos destinos S3.',
    'Data Backup Service'
  ),
  breadcrumbSchema([
    { name: 'Home', item: BASE },
    { name: 'Serviços', item: `${BASE}/servicos` },
    { name: 'Backup Corporativo', item: `${BASE}/servicos/${slug}` },
  ]),
  faqPageSchema(faqs),
]

const howSteps = [
  {
    title: 'Mapeamento de ativos e definição de SLA',
    desc: 'Identificamos todos os sistemas críticos — servidores, bancos de dados, compartilhamentos de rede — e definimos RPO e RTO específicos para cada um. Nem tudo tem a mesma prioridade de recuperação.',
  },
  {
    title: 'Implantação com agente leve',
    desc: 'Configuramos o agente com políticas de retenção, janelas de backup, criptografia e múltiplos destinos. Impacto mínimo em produção — backups incrementais com deduplicação.',
  },
  {
    title: 'Validação com restore real',
    desc: 'Diferente de simplesmente verificar a integridade do backup, fazemos restauração real em ambiente isolado. Você recebe o tempo de restore medido e confirmação de que os dados estão íntegros.',
  },
  {
    title: 'Monitoramento e relatório mensal',
    desc: 'Monitoramos cada execução de backup, alertamos imediatamente em caso de falha e entregamos relatório mensal com status, testes de restore realizados e métricas de RPO/RTO atingidas.',
  },
]

const incluso = [
  'Levantamento dos ativos críticos',
  'Definição da estratégia de backup',
  'Definição de RPO e RTO conforme necessidade do negócio',
  'Implantação da solução de backup',
  'Criptografia dos dados em trânsito e em repouso',
  'Configuração de retenção e versionamento',
  'Testes de recuperação programados',
  'Monitoramento das execuções',
  'Relatórios executivos periódicos',
  'Documentação completa da solução',
]

const ambientes = [
  { categoria: 'Cloud Pública', itens: ['Oracle Cloud Infrastructure (OCI)', 'Microsoft Azure', 'Amazon Web Services (AWS)'] },
  { categoria: 'Virtualização', itens: ['VMware vSphere', 'Microsoft Hyper-V'] },
  { categoria: 'Sistemas Operacionais', itens: ['Linux (todas as distribuições)', 'Windows Server'] },
  { categoria: 'Bancos de Dados', itens: ['Oracle Database', 'Microsoft SQL Server', 'PostgreSQL', 'MySQL / MariaDB'] },
  { categoria: 'Storage & File', itens: ['File Servers', 'NAS', 'Compartilhamentos SMB/NFS'] },
  { categoria: 'Containers', itens: ['Kubernetes', 'Docker (conforme arquitetura)'] },
]

const entregaveis = [
  { icon: Search,       label: 'Documento da arquitetura de backup' },
  { icon: Server,       label: 'Inventário de ativos protegidos' },
  { icon: Shield,       label: 'Política de retenção documentada' },
  { icon: HardDrive,    label: 'Plano de recuperação (DRP)' },
  { icon: FileText,     label: 'Relatório de implantação' },
  { icon: CheckCircle2, label: 'Relatório de testes de restore' },
  { icon: Monitor,      label: 'Dashboard de monitoramento' },
  { icon: Database,     label: 'Relatório executivo mensal' },
]

const diferenciais = [
  { title: 'Assessment antes da implantação', desc: 'Avaliamos a maturidade do ambiente antes de propor qualquer solução. Nenhuma ferramenta é recomendada sem diagnóstico.' },
  { title: 'Projeto personalizado', desc: 'Nenhuma solução de prateleira. Cada ambiente tem sua própria arquitetura baseada nas necessidades reais do negócio.' },
  { title: 'Documentação completa', desc: 'Tudo documentado: arquitetura, políticas, procedimentos e plano de recuperação. Sua empresa não depende da nossa memória.' },
  { title: 'Testes periódicos de recuperação', desc: 'Restore mensal comprovado com relatório. Você sabe que o backup funciona antes de precisar dele.' },
  { title: 'Relatórios executivos', desc: 'Visibilidade para a gestão — status, métricas de RPO/RTO atingidas e conformidade documentada.' },
  { title: 'Monitoramento proativo', desc: 'Alertas imediatos em caso de falha ou desvio. Não esperamos o incidente para agir.' },
  { title: 'Arquitetura baseada em boas práticas internacionais', desc: 'Estratégia 3-2-1, criptografia AES-256, deduplicação e verificação por hash em cada execução.' },
]

const flowSteps = [
  'Assessment',
  'Levantamento',
  'Projeto',
  'Implantação',
  'Primeiro Backup',
  'Teste de Restore',
  'Documentação',
  'Monitoramento',
  'Relatórios',
]

export default function Page() {
  return (
    <MotionProvider>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Nav />
      <main>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="hero-grid-bg py-20 lg:py-28">
          <div className="container-page">
            <nav className="flex items-center gap-1.5 text-xs text-white/45 mb-8 flex-wrap" aria-label="Breadcrumb">
              {[
                { name: 'Home', href: '/' },
                { name: 'Serviços', href: '/servicos' },
                { name: 'Backup Corporativo', href: `/servicos/${slug}` },
              ].map((c, i, arr) => (
                <span key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3 h-3 shrink-0" />}
                  {i < arr.length - 1
                    ? <Link href={c.href} className="hover:text-white/75 transition-colors">{c.name}</Link>
                    : <span className="text-white/65">{c.name}</span>}
                </span>
              ))}
            </nav>

            <FadeIn>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/15 text-white/70 text-xs font-medium tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Continuidade &amp; Segurança
              </span>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="type-display text-white max-w-2xl mb-5">
                Backup Corporativo — RPO e RTO Definidos, Testados e Garantidos em Contrato.
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg text-white/65 max-w-2xl leading-relaxed mb-8">
                A maioria das empresas descobre que o backup não funciona no pior momento possível: durante uma recuperação de emergência. Nós testamos antes.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-hover transition-colors text-[0.9375rem]"
              >
                Solicitar Backup Readiness Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── Intro ────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page max-w-3xl space-y-5">
            {[
              'Backup não é uma commodity. É uma responsabilidade. Ter um processo de backup configurado é muito diferente de ter dados realmente recuperáveis quando você precisa.',
              'A JPX Digital projeta, implanta e valida backups corporativos com métricas claras: RPO (Recovery Point Objective — qual é a janela máxima de perda de dados aceitável) e RTO (Recovery Time Objective — em quanto tempo o sistema precisa estar operacional). Esses números são definidos com você, documentados em contrato e testados mensalmente.',
              'Utilizamos arquitetura 3-2-1 com criptografia AES-256 ponta a ponta, múltiplos destinos de armazenamento (local + cloud) e agentes leves, incrementais e verificados por hash em cada execução.',
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <p className="text-gray-700 text-lg leading-relaxed">{p}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Backup Readiness Assessment ──────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold tracking-wide mb-6">
                  <Search className="w-3.5 h-3.5" />
                  Ponto de entrada
                </div>
                <h2 className="type-h2 text-gray-900 mb-4">Backup Readiness Assessment</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Antes de implantar qualquer solução, avaliamos a maturidade do seu ambiente de backup. Identificamos riscos, validamos requisitos de continuidade operacional e definimos a estratégia de proteção mais adequada para o negócio.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  O Assessment não é uma etapa burocrática — é o que diferencia uma consultoria de uma revenda. Sem entender o ambiente, qualquer solução proposta é um chute. Com o diagnóstico, o projeto é cirúrgico: cada decisão tem uma razão técnica documentada.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Maturidade do ambiente atual', sub: 'O que está funcionando e o que está em risco' },
                    { label: 'Requisitos de continuidade', sub: 'RPO e RTO definidos por criticidade de sistema' },
                    { label: 'Estratégia recomendada', sub: 'Arquitetura personalizada, sem solução de prateleira' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white border border-border rounded-xl p-5">
                      <p className="font-semibold text-gray-900 text-sm mb-1.5">{item.label}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Processo ─────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <FadeIn>
              <h2 className="type-h2 text-gray-900 mb-12">Como implementamos o backup corporativo</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {howSteps.map((step, i) => (
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

        {/* ── O que está incluso ───────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <div className="mb-10">
                <h2 className="type-h2 text-gray-900 mb-2">O que está incluso</h2>
                <p className="text-gray-500 text-lg">Escopo completo do serviço — do diagnóstico à operação contínua.</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
              {incluso.map((item, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="flex items-start gap-3 bg-white border border-border rounded-xl px-5 py-4">
                    <CheckCircle2 className="w-4.5 h-4.5 text-success shrink-0 mt-0.5" />
                    <span className="text-gray-800 text-sm font-medium leading-snug">{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ambientes suportados ─────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <FadeIn>
              <div className="mb-10">
                <h2 className="type-h2 text-gray-900 mb-2">Ambientes suportados</h2>
                <p className="text-gray-500 text-lg">A JPX Digital atua na proteção de ambientes corporativos locais, híbridos e em nuvem.</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ambientes.map((grupo, i) => (
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

        {/* ── Entregáveis ──────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <div className="mb-10">
                <h2 className="type-h2 text-gray-900 mb-2">Entregáveis</h2>
                <p className="text-gray-500 text-lg">O que você recebe — documentado, revisável e de sua propriedade.</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {entregaveis.map(({ icon: Icon, label }, i) => (
                <FadeIn key={label} delay={i * 0.05}>
                  <div className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-gray-800 text-sm font-medium leading-snug">{label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Diferenciais ─────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <FadeIn>
              <div className="mb-10">
                <h2 className="type-h2 text-gray-900 mb-2">Diferenciais da JPX Digital</h2>
                <p className="text-gray-500 text-lg">Não vendemos produtos. Entregamos processos com responsabilidade técnica de ponta a ponta.</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {diferenciais.map((d, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex gap-4 p-6 bg-muted border border-border rounded-xl h-full">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1.5">{d.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Fluxo do serviço ─────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <div className="mb-12 text-center">
                <h2 className="type-h2 text-gray-900 mb-2">Fluxo do serviço</h2>
                <p className="text-gray-500 text-lg">Do diagnóstico ao relatório mensal — cada etapa com responsabilidade definida.</p>
              </div>
            </FadeIn>
            <div className="flex flex-col items-center">
              {flowSteps.map((step, i) => (
                <FadeIn key={step} delay={i * 0.06}>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-4">
                      <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div className="bg-white border border-border rounded-xl px-7 py-3 shadow-sm min-w-[220px] text-center">
                        <span className="text-gray-800 font-medium text-sm">{step}</span>
                      </div>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <div className="flex flex-col items-center my-1 text-gray-300">
                        <div className="w-px h-5 bg-border" />
                        <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
                        <div className="w-px h-1 bg-border" />
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <FadeIn>
              <h2 className="type-h2 text-gray-900 mb-10">Perguntas frequentes</h2>
            </FadeIn>
            <div className="max-w-3xl space-y-3">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <details className="group bg-muted border border-border rounded-xl overflow-hidden">
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

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="dark-grid-bg py-20">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <FadeIn direction="left">
                <h2 className="type-h2 text-white mb-4">
                  Pronto para começar com um Assessment?
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Avaliamos o seu ambiente, identificamos os riscos reais e apresentamos uma proposta sob medida. Sem soluções genéricas, sem compromisso inicial.
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
