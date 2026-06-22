import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, ChevronRight, ShieldCheck,
  FileText, Building2, User, Lock, CreditCard,
  BadgeCheck, HelpCircle, Server,
} from 'lucide-react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/FadeIn'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { ContactForm } from '@/components/sections/ContactForm'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const BASE = 'https://jpxdigital.com.br'
const slug = 'autoridades-certificadoras'

export const metadata: Metadata = {
  title: 'Certificados Digitais eCPF e eCNPJ ICP-Brasil — Revendedor ACDIGITAL | JPX Digital',
  description:
    'Emissão de certificados digitais eCPF e eCNPJ nos formatos A1 e A3 para pessoas físicas e jurídicas. Revendedor autorizado ACDIGITAL ICP-Brasil. Validade jurídica plena.',
  keywords: ['certificado digital', 'eCPF', 'eCNPJ', 'certificado A1', 'certificado A3', 'ICP-Brasil', 'ACDIGITAL', 'revendedor certificado digital', 'assinatura digital'],
  openGraph: {
    title: 'Certificados Digitais eCPF e eCNPJ — JPX Digital',
    description: 'Revendedor autorizado ACDIGITAL. eCPF e eCNPJ A1 e A3 com validade jurídica plena na ICP-Brasil.',
    url: `${BASE}/segmentos/${slug}`,
  },
  alternates: { canonical: `${BASE}/segmentos/${slug}` },
}

const schemas = [
  serviceSchema('Certificados Digitais eCPF e eCNPJ ICP-Brasil', 'Emissão de certificados digitais eCPF e eCNPJ nos formatos A1 e A3 como revendedor autorizado ACDIGITAL ICP-Brasil.', 'ProfessionalService'),
  breadcrumbSchema([
    { name: 'Home', item: BASE },
    { name: 'Segmentos', item: `${BASE}/segmentos` },
    { name: 'Certificados Digitais ICP-Brasil', item: `${BASE}/segmentos/${slug}` },
  ]),
  faqPageSchema([
    { question: 'Qual a diferença entre eCPF e eCNPJ?', answer: 'O eCPF (e-PF) é o certificado digital para pessoa física — funciona como a identidade digital do CPF no ambiente eletrônico. O eCNPJ (e-PJ) é o equivalente para pessoa jurídica, vinculado ao CNPJ da empresa. Ambos têm validade jurídica plena na ICP-Brasil.' },
    { question: 'Qual a diferença entre o certificado A1 e o A3?', answer: 'O A1 é armazenado em arquivo no computador (software), válido por 1 ano, mais prático para uso cotidiano. O A3 é armazenado em dispositivo físico (token USB ou cartão inteligente), válido por 3 anos, com nível de segurança mais alto — a chave privada nunca sai do hardware.' },
    { question: 'Para que serve o certificado digital eCPF?', answer: 'O eCPF permite assinar documentos eletronicamente com validade jurídica, acessar serviços da Receita Federal (e-CAC), assinar contratos digitais, acessar o Portal do Gov.br com nível ouro, usar o sistema PJe (Processo Judicial Eletrônico), emitir nota fiscal como autônomo e autenticar-se em sistemas que exigem identificação digital.' },
    { question: 'Para que serve o certificado eCNPJ?', answer: 'O eCNPJ é obrigatório para emissão de NF-e, NFS-e, CT-e e MDF-e, assinar obrigações do SPED (ECD, ECF), transmitir eSocial e REINF, acessar o e-CAC PJ, participar de licitações eletrônicas (Comprasnet, BLL) e assinar contratos em nome da empresa.' },
    { question: 'A JPX Digital é uma Autoridade Certificadora?', answer: 'Não. A JPX Digital atua como Autoridade de Registro (AR) revendedora autorizada da ACDIGITAL — Autoridade Certificadora e Segurança Digital Ltda, CNPJ 00.087.112/0001-21, integrante da hierarquia ICP-Brasil. Nossa função é validar a identidade do solicitante e emitir o certificado vinculado à cadeia de confiança da ACDIGITAL.' },
    { question: 'Certificado digital substitui assinatura à mão?', answer: 'Sim. Documentos assinados com certificado digital ICP-Brasil têm a mesma validade jurídica que documentos físicos assinados manualmente, conforme a Medida Provisória 2.200-2/2001 e a Lei 14.063/2020. São aceitos por bancos, cartórios, tribunais, Receita Federal e órgãos públicos em geral.' },
  ]),
]

const produtos = [
  {
    icon: User,
    tipo: 'eCPF A1',
    subtipo: 'Pessoa Física — Software',
    validade: '1 ano',
    armazenamento: 'Arquivo no computador',
    cor: 'bg-secondary/8 text-secondary border-secondary/20',
    usos: ['Assinatura de documentos e contratos', 'Acesso ao e-CAC (Receita Federal)', 'Portal Gov.br nível ouro', 'Sistema PJe (tribunais)', 'NF-e como autônomo / MEI', 'Prontuário eletrônico médico'],
  },
  {
    icon: Lock,
    tipo: 'eCPF A3',
    subtipo: 'Pessoa Física — Token/Cartão',
    validade: '3 anos',
    armazenamento: 'Token USB ou cartão inteligente',
    cor: 'bg-primary/8 text-primary border-primary/20',
    usos: ['Todos os usos do A1 com segurança superior', 'Chave privada nunca exposta fora do hardware', 'Ideal para advogados, médicos, contadores', 'Recomendado para assinar documentos críticos', 'Aceito em qualquer sistema ICP-Brasil'],
  },
  {
    icon: Building2,
    tipo: 'eCNPJ A1',
    subtipo: 'Pessoa Jurídica — Software',
    validade: '1 ano',
    armazenamento: 'Arquivo no computador',
    cor: 'bg-secondary/8 text-secondary border-secondary/20',
    usos: ['Emissão de NF-e, NFS-e, CT-e, MDF-e', 'Transmissão de SPED (ECD, ECF)', 'eSocial e REINF', 'Acesso ao e-CAC PJ', 'Procurações eletrônicas', 'Contratos em nome da empresa'],
  },
  {
    icon: CreditCard,
    tipo: 'eCNPJ A3',
    subtipo: 'Pessoa Jurídica — Token/Cartão',
    validade: '3 anos',
    armazenamento: 'Token USB ou cartão inteligente',
    cor: 'bg-primary/8 text-primary border-primary/20',
    usos: ['Todos os usos do A1 com maior segurança', 'Licitações eletrônicas (Comprasnet, BLL)', 'Assinatura de contratos de alto valor', 'Empresas com múltiplos usuários/filiais', 'Ideal para contadores e departamentos fiscais'],
  },
]

const diferenciais = [
  { titulo: 'Cadeia ICP-Brasil homologada', desc: 'Todos os certificados emitidos pertencem à hierarquia oficial ICP-Brasil, reconhecidos por bancos, cartórios, tribunais e órgãos públicos sem questionamentos.' },
  { titulo: 'Suporte especializado', desc: 'Apoio técnico na instalação e configuração do certificado, drivers de token, integração com softwares de contabilidade, jurídico e emissão fiscal.' },
  { titulo: '100% remoto — sem sair de casa', desc: 'Toda a validação de identidade é feita por videoconferência com documentos originais. Você recebe seu certificado sem precisar se deslocar a nenhuma agência.' },
  { titulo: 'Renovação simplificada', desc: 'Alertamos antes do vencimento e tornamos a renovação rápida, sem burocracia, mantendo a continuidade das suas operações.' },
]

const comoFunciona = [
  { num: '01', titulo: 'Escolha o certificado', desc: 'Defina se é para pessoa física (eCPF) ou jurídica (eCNPJ) e o formato — A1 (software, 1 ano) ou A3 (token/cartão, 3 anos).' },
  { num: '02', titulo: 'Agendamento da validação', desc: 'Agende uma videoconferência no horário que for melhor para você. Enviamos com antecedência a lista de documentos necessários para cada tipo de certificado.' },
  { num: '03', titulo: 'Validação de identidade', desc: 'Nossa equipe valida os documentos originais conforme as Práticas de Certificação da ACDIGITAL — etapa obrigatória para garantir a autenticidade do certificado.' },
  { num: '04', titulo: 'Emissão e instalação', desc: 'Certificado emitido na cadeia ACDIGITAL/ICP-Brasil e entregue em arquivo (A1) ou gravado no token/cartão (A3), com suporte na instalação.' },
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
              {[{ name: 'Home', href: '/' }, { name: 'Segmentos', href: '/segmentos' }, { name: 'Certificados Digitais ICP-Brasil', href: `/segmentos/${slug}` }].map((c, i, arr) => (
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
                Revendedor Autorizado ACDIGITAL · ICP-Brasil
              </span>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="type-display text-white max-w-3xl mb-5">
                Certificados Digitais eCPF e eCNPJ com validade jurídica plena na ICP-Brasil.
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg text-white/65 max-w-2xl leading-relaxed mb-8">
                A JPX Digital é revendedora autorizada da ACDIGITAL — Autoridade Certificadora integrante da hierarquia ICP-Brasil. Emitimos certificados eCPF e eCNPJ nos formatos A1 e A3 para pessoas físicas e jurídicas, com suporte completo na emissão, instalação e renovação.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-4">
                <Link href="/contato" className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-hover transition-colors text-[0.9375rem]">
                  Solicitar certificado <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>

            {/* trust badges */}
            <FadeIn delay={0.2}>
              <div className="mt-12 flex flex-wrap gap-4">
                {[
                  { label: 'ACDIGITAL ICP-Brasil', sub: 'Revendedor autorizado' },
                  { label: 'Validade jurídica plena', sub: 'MP 2.200-2/2001' },
                  { label: 'eCPF e eCNPJ', sub: 'Formatos A1 e A3' },
                  { label: 'Pessoa Física e Jurídica', sub: 'Atendimento completo' },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2.5 px-4 py-2.5 bg-white/6 border border-white/12 rounded-xl">
                    <BadgeCheck className="w-4 h-4 text-secondary shrink-0" />
                    <div>
                      <p className="text-white text-xs font-semibold leading-none mb-0.5">{b.label}</p>
                      <p className="text-white/45 text-[0.6875rem] leading-none">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── O que é ──────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <FadeIn direction="left">
                <h2 className="type-h2 text-gray-900 mb-5">O que é um certificado digital ICP-Brasil?</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>O certificado digital é a identidade eletrônica do CPF ou CNPJ. Funciona como uma carteira de identidade no ambiente digital, permitindo assinar documentos, contratos e declarações com a mesma validade jurídica de uma assinatura à mão reconhecida em cartório.</p>
                  <p>Documentos assinados com certificado ICP-Brasil são aceitos pela Receita Federal, pelo Judiciário, por bancos, cartórios e qualquer órgão público ou privado — sem necessidade de autenticação adicional.</p>
                  <p>A diferença entre eCPF e eCNPJ está na titularidade: o eCPF pertence à pessoa física, o eCNPJ à pessoa jurídica. Um pode coexistir com o outro — profissionais que também possuem empresa geralmente precisam dos dois.</p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="bg-muted border border-border rounded-2xl p-6 space-y-4">
                  <h3 className="font-heading font-bold text-gray-900 mb-4">Quando você precisa de um certificado digital?</h3>
                  {[
                    { icon: FileText, texto: 'Emitir NF-e, NFS-e, CT-e ou MDF-e em nome da empresa' },
                    { icon: Building2, texto: 'Transmitir obrigações fiscais (SPED, eSocial, REINF)' },
                    { icon: User, texto: 'Acessar o e-CAC da Receita Federal ou Gov.br nível ouro' },
                    { icon: ShieldCheck, texto: 'Assinar contratos digitais com validade jurídica plena' },
                    { icon: FileText, texto: 'Participar de licitações eletrônicas (Comprasnet, BLL)' },
                    { icon: Lock, texto: 'Usar o PJe — Processo Judicial Eletrônico (OAB, magistrados)' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.texto} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-md bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{item.texto}</p>
                      </div>
                    )
                  })}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Produtos ─────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <h2 className="type-h2 text-gray-900 mb-3">Certificados disponíveis</h2>
              <p className="text-gray-600 mb-10 max-w-2xl">Todos os certificados são emitidos na cadeia ACDIGITAL/ICP-Brasil e reconhecidos por qualquer sistema que aceite certificados ICP-Brasil. Não emitimos certificados SSL.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {produtos.map((p, i) => {
                const Icon = p.icon
                return (
                  <FadeIn key={p.tipo} delay={i * 0.06}>
                    <div className="bg-white border border-border rounded-2xl p-6 h-full flex flex-col">
                      <div className="flex items-start gap-4 mb-5">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${p.cor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-gray-900 text-lg leading-tight">{p.tipo}</h3>
                          <p className="text-gray-500 text-sm">{p.subtipo}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mb-5 text-xs">
                        <div className="bg-muted rounded-lg px-3 py-2">
                          <p className="text-gray-400 mb-0.5">Validade</p>
                          <p className="font-semibold text-gray-800">{p.validade}</p>
                        </div>
                        <div className="bg-muted rounded-lg px-3 py-2 flex-1">
                          <p className="text-gray-400 mb-0.5">Armazenamento</p>
                          <p className="font-semibold text-gray-800">{p.armazenamento}</p>
                        </div>
                      </div>
                      <ul className="space-y-2 flex-1">
                        {p.usos.map((uso) => (
                          <li key={uso} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm leading-relaxed">{uso}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                )
              })}
            </div>

            {/* A1 vs A3 */}
            <FadeIn delay={0.1}>
              <div className="mt-8 bg-white border border-border rounded-2xl p-6">
                <h3 className="font-heading font-bold text-gray-900 mb-5">A1 ou A3 — qual escolher?</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-gray-500 font-medium pb-3 pr-6">Critério</th>
                        <th className="text-left text-secondary font-semibold pb-3 pr-6">A1 — Software</th>
                        <th className="text-left text-primary font-semibold pb-3">A3 — Token/Cartão</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        ['Validade', '1 ano', '3 anos'],
                        ['Onde fica a chave privada', 'Arquivo no computador', 'Dentro do hardware (não exportável)'],
                        ['Portabilidade', 'Pode ser copiado entre máquinas', 'Funciona em qualquer computador com o token'],
                        ['Nível de segurança', 'Médio', 'Alto'],
                        ['Recomendado para', 'Uso cotidiano, escritório', 'Uso crítico, contratos de alto valor'],
                        ['Custo inicial', 'Menor', 'Maior (inclui hardware)'],
                      ].map(([criterio, a1, a3]) => (
                        <tr key={criterio}>
                          <td className="py-3 pr-6 text-gray-500">{criterio}</td>
                          <td className="py-3 pr-6 text-gray-700">{a1}</td>
                          <td className="py-3 text-gray-700">{a3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── ACDIGITAL ────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="left">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/8 border border-secondary/20 text-secondary text-xs font-semibold tracking-wide mb-5">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Nossa AC parceira
                </span>
                <h2 className="type-h2 text-gray-900 mb-4">ACDIGITAL — Autoridade Certificadora e Segurança Digital Ltda</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>A ACDIGITAL é uma Autoridade Certificadora credenciada pelo ITI (Instituto Nacional de Tecnologia da Informação), integrante da hierarquia oficial da ICP-Brasil. Todos os certificados emitidos pela ACDIGITAL pertencem à cadeia de confiança regulada pelo governo federal.</p>
                  <p>Como revendedora autorizada (Autoridade de Registro), a JPX Digital valida a identidade dos solicitantes, emite os certificados e oferece suporte técnico completo — mantendo todos os requisitos de conformidade exigidos pelas normas ICP-Brasil.</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { label: 'CNPJ', valor: '00.087.112/0001-21' },
                    { label: 'Sede', valor: 'Porto Alegre — RS' },
                    { label: 'Hierarquia', valor: 'ICP-Brasil — ITI' },
                    { label: 'Certificados', valor: 'e-PF A1/A3 · e-PJ A1/A3' },
                  ].map((item) => (
                    <div key={item.label} className="bg-muted border border-border rounded-xl px-4 py-3">
                      <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
                      <p className="text-gray-800 text-sm font-semibold">{item.valor}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn>
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-gray-900 mb-4">Por que escolher a JPX Digital?</h3>
                  {diferenciais.map((d, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-muted border border-border rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm">{d.titulo}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Como funciona ────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <h2 className="type-h2 text-gray-900 mb-3">Como funciona a emissão</h2>
              <p className="text-gray-600 mb-10 max-w-2xl">Processo simples em 4 etapas — 100% remoto por videoconferência, sem sair de casa.</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {comoFunciona.map((c, i) => (
                <FadeIn key={c.num} delay={i * 0.07}>
                  <div className="bg-white border border-border rounded-2xl p-6 h-full flex flex-col">
                    <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-sm font-bold font-heading mb-4 shrink-0">
                      {c.num}
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-2">{c.titulo}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{c.desc}</p>
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
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="type-h2 text-gray-900">Perguntas frequentes</h2>
              </div>
            </FadeIn>
            <div className="max-w-3xl mt-8 space-y-3">
              {[
                { q: 'Qual a diferença entre eCPF e eCNPJ?', a: 'O eCPF (e-PF) é o certificado digital da pessoa física — vinculado ao CPF, permite assinar documentos e acessar serviços digitais em nome do indivíduo. O eCNPJ (e-PJ) é o equivalente para pessoa jurídica, vinculado ao CNPJ da empresa. Ambos têm validade jurídica plena reconhecida em todo o território nacional.' },
                { q: 'Qual a diferença entre certificado A1 e A3?', a: 'O A1 é armazenado em arquivo no computador, com validade de 1 ano — prático para uso cotidiano. O A3 é armazenado em dispositivo físico (token USB ou cartão inteligente), com validade de 3 anos — a chave privada nunca sai do hardware, oferecendo maior segurança para documentos e contratos de alto valor.' },
                { q: 'Preciso de eCPF e eCNPJ ao mesmo tempo?', a: 'Depende da sua necessidade. Quem assina documentos em nome da empresa geralmente precisa do eCNPJ vinculado ao CNPJ. O eCPF é para assinar em nome próprio. Profissionais liberais que também têm empresa frequentemente precisam dos dois. Nossa equipe orienta sobre o certificado mais adequado para cada caso.' },
                { q: 'Vocês emitem certificado SSL?', a: 'Não. A JPX Digital emite apenas certificados para pessoas físicas (eCPF) e jurídicas (eCNPJ) na hierarquia ICP-Brasil através da ACDIGITAL. Certificados SSL para sites e servidores são de uma categoria diferente — não fazem parte do nosso portfólio de certificação digital.' },
                { q: 'Quanto tempo demora para emitir?', a: 'Após a validação de identidade, a emissão é imediata. O prazo depende basicamente do agendamento da validação — que pode ser feita por videoconferência. Em geral, do contato inicial à emissão do certificado, o processo leva de 1 a 3 dias úteis.' },
                { q: 'O que acontece quando o certificado vence?', a: 'Monitoramos o vencimento e avisamos com antecedência. A renovação segue o mesmo processo da emissão original — validação de identidade e nova emissão. Não há perda de dados ou documentos já assinados, que permanecem válidos pelo período em que o certificado estava vigente.' },
              ].map((faq, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <details className="group bg-muted border border-border rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-100 transition-colors list-none">
                      <span className="text-sm">{faq.q}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform duration-200 shrink-0" />
                    </summary>
                    <div className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-border bg-white">
                      {faq.a}
                    </div>
                  </details>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Infraestrutura para ACs ──────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <Server className="w-5 h-5 text-primary" />
                <h2 className="type-h2 text-gray-900">Também estruturamos Autoridades Certificadoras</h2>
              </div>
              <p className="text-gray-600 mb-8 max-w-2xl">
                Além de vender certificados, a JPX Digital tem expertise técnica para estruturar a infraestrutura de TI de organizações que desejam operar como AC credenciada junto ao ITI — clusters HSM, VMware, OpenShift e suporte ao processo de credenciamento ICP-Brasil.
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { titulo: 'Cluster HSM FIPS 140-2 Level 3', desc: 'Thales Luna, Entrust nShield — cluster ativo-passivo com cerimônia de chaves.' },
                  { titulo: 'OpenShift / OKD e VMware', desc: 'Plataforma de gestão de certificados em container com ambientes de produção e homologação isolados.' },
                  { titulo: 'Suporte ao credenciamento ITI', desc: 'Gap analysis contra normas DOC-ICP, elaboração de DPC/PC e acompanhamento da auditoria ITI.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-border rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.titulo}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="dark-grid-bg py-20">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <FadeIn direction="left">
                <h2 className="type-h2 text-white mb-4">Pronto para emitir seu certificado digital?</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Preencha o formulário e nossa equipe entra em contato para orientar sobre o certificado ideal, agendar a validação de identidade e dar início à emissão.
                </p>
                <ul className="space-y-3">
                  {[
                    'eCPF e eCNPJ nos formatos A1 e A3',
                    '100% remoto — sem sair de casa',
                    'Suporte técnico na instalação e renovação',
                    'Retorno em até 1 dia útil',
                  ].map((p) => (
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
