import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, ChevronRight, Shield, Server,
  Lock, FileText, Building2, AlertTriangle, Settings, Database,
  Eye, BookOpen, ClipboardList,
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
  title: 'TI para Autoridades Certificadoras — Infraestrutura, Normas e Credenciamento ICP-Brasil',
  description:
    'Requisitos completos para operar uma AC ICP-Brasil: normas DOC-ICP, sala cofre, HSM FIPS 140-2 Level 3, segurança lógica, processo de credenciamento ITI e padrões de datacenter.',
  keywords: ['autoridade certificadora ICP-Brasil', 'credenciamento ITI', 'DOC-ICP', 'sala cofre AC', 'HSM FIPS 140-2', 'ANSI TIA-942', 'EN 1047-2', 'infraestrutura AC'],
  openGraph: {
    title: 'TI para Autoridades Certificadoras | JPX Digital',
    description: 'Sala cofre N4, HSM, VMware e OpenShift para ACs ICP-Brasil. Requisitos completos de infraestrutura e credenciamento.',
    url: `${BASE}/segmentos/${slug}`,
  },
  alternates: { canonical: `${BASE}/segmentos/${slug}` },
}

const schemas = [
  serviceSchema('TI para Autoridades Certificadoras', 'Infraestrutura técnica para ACs ICP-Brasil: sala cofre N4, clusters HSM, VMware e OpenShift. Suporte ao credenciamento ITI.', 'IT Infrastructure Service'),
  breadcrumbSchema([
    { name: 'Home', item: BASE },
    { name: 'Segmentos', item: `${BASE}/segmentos` },
    { name: 'Autoridades Certificadoras', item: `${BASE}/segmentos/${slug}` },
  ]),
  faqPageSchema([
    { question: 'O que é necessário para uma AC obter credenciamento ITI?', answer: 'O credenciamento junto ao ITI exige cumprimento das Declarações de Práticas de Certificação (DPC), Política de Certificação (PC) e dos requisitos da DOC-ICP-05 e documentos relacionados. Na parte técnica: HSM certificado FIPS 140-2 Level 3 ou superior, sala cofre com controle de acesso físico rigoroso, plano de DR documentado, controles de segurança da informação auditáveis e registros de auditoria.' },
    { question: 'Por que usar OpenShift/OKD em uma AC?', answer: 'Ambientes de AC exigem alta disponibilidade, controle rigoroso de versões de software e auditabilidade de todas as operações. OpenShift/OKD oferece um ambiente Kubernetes enterprise com namespaces isolados para produção e homologação, rollout controlado de atualizações, integração com políticas de segurança e conformidade, e operação em ambientes air-gapped quando necessário.' },
    { question: 'Qual o nível de sala cofre exigido para operar uma AC ICP-Brasil?', answer: 'O ITI exige proteção física compatível com o nível de risco da AC. Para ACs que operam HSMs com chaves raiz, o padrão recomendado é sala cofre EN 1047-2 com resistência a fogo, explosão e acesso não autorizado, com controle biométrico e câmeras de CFTV com retenção de auditoria.' },
    { question: 'HSM em cluster é obrigatório para operação de AC?', answer: 'Não é formalmente obrigatório pela norma, mas é indispensável para operação contínua sem risco de perda de chaves. HSM em cluster ativo-passivo garante failover automático sem perda de acesso às chaves privadas da AC — fundamental para manter o SLA de emissão de certificados.' },
    { question: 'A JPX Digital oferece suporte pós-credenciamento?', answer: 'Sim. Prestamos suporte gerenciado de infraestrutura para ACs já credenciadas: manutenção de clusters VMware e OpenShift, monitoramento 24/7 dos sistemas, gestão de backups de configuração dos HSMs, suporte a auditorias ITI e atualização de infraestrutura conforme evolução dos requisitos ICP-Brasil.' },
  ]),
]

const normas = [
  { doc: 'MP 2.200-2/2001', titulo: 'Base Legal ICP-Brasil', desc: 'Medida Provisória que instituiu a Infraestrutura de Chaves Públicas Brasileira e o ITI (Instituto Nacional de Tecnologia da Informação) como AC Raiz.' },
  { doc: 'DOC-ICP-01', titulo: 'DPC da AC Raiz', desc: 'Declaração de Práticas de Certificação da Autoridade Certificadora Raiz. Define a política máxima da hierarquia ICP-Brasil.' },
  { doc: 'DOC-ICP-01.01', titulo: 'Algoritmos Criptográficos', desc: 'Padrões e algoritmos criptográficos aceitos na ICP-Brasil: RSA 2048/4096, SHA-256/384/512, ECC P-256/P-384.' },
  { doc: 'DOC-ICP-02', titulo: 'Política de Certificado Padrão', desc: 'Define os campos obrigatórios dos certificados emitidos na cadeia ICP-Brasil, incluindo OIDs específicos por tipo de AC.' },
  { doc: 'DOC-ICP-03', titulo: 'Requisitos para DPC das ACs', desc: 'Requisitos mínimos que a Declaração de Práticas de Certificação de cada AC deve conter para ser aprovada pelo Comitê Gestor.' },
  { doc: 'DOC-ICP-04', titulo: 'Segurança Física, Lógica e de Gestão', desc: 'Requisitos de segurança da informação exigidos para ACs: controle de acesso físico, gestão de chaves, registros de auditoria e pessoal autorizado.' },
  { doc: 'DOC-ICP-04.01', titulo: 'Requisitos Mínimos para Sala Cofre', desc: 'Especificações de resistência física (fogo, explosão, força bruta), controle de acesso biométrico, CFTV e sistemas de supressão para salas cofre de AC.' },
  { doc: 'DOC-ICP-05', titulo: 'Requisitos Técnicos de Instalação', desc: 'Requisitos de hardware, software, conectividade e infraestrutura técnica para operação segura da AC.' },
  { doc: 'DOC-ICP-06', titulo: 'Credenciamento de Entidades', desc: 'Critérios e procedimentos para credenciamento de ACs, ARs e PSCs junto ao ITI — documentos exigidos, fluxo de auditoria e prazo de análise.' },
  { doc: 'DOC-ICP-07', titulo: 'Tabela de Eventos de Auditoria', desc: 'Todos os eventos que devem ser registrados em log auditável: emissão, revogação, acesso ao HSM, cerimônia de chaves, falhas de autenticação.' },
  { doc: 'DOC-ICP-09', titulo: 'Padrões de Certificados e LCR', desc: 'Formato X.509 v3, extensões obrigatórias, perfis de certificado por tipo (A1, A3, S1, S3) e formato da Lista de Certificados Revogados (LCR/CRL).' },
  { doc: 'DOC-ICP-16', titulo: 'Segurança de Sistemas de Certificação', desc: 'Critérios de segurança para os sistemas de software utilizados pela AC: controle de versão, gestão de patches, testes de segurança e homologação.' },
]

const fisicos = [
  { icon: Building2, titulo: 'Padrão de Datacenter — ANSI/TIA-942', itens: ['Tier III (N+1) como mínimo recomendado para ACs de 2º nível', 'Tier IV (2N) para ACs de 1º nível e AC Raiz', 'Redundância de energia: UPS + grupo gerador diesel com autonomia mínima de 72h', 'Redundância de refrigeração: sistema de precisão com redundância N+1', 'Dois caminhos elétricos independentes para equipamentos críticos'] },
  { icon: Shield, titulo: 'Sala Cofre — EN 1047-2 / DOC-ICP-04.01', itens: ['Resistência ao fogo: 120 minutos (RH 120 DIS)', 'Resistência a explosão e onda de pressão', 'Resistência a arrombamento e acesso por força bruta', 'Controle de acesso biométrico com dupla custódia obrigatória para HSM', 'Detector de movimento, temperatura, umidade, fumaça e inundação', 'Sistema de alarme 24×7 com monitoramento remoto'] },
  { icon: Eye, titulo: 'Vigilância e CFTV', itens: ['Câmeras IP com visão noturna em todos os pontos de acesso', 'Retenção mínima de 90 dias de gravação (auditoria ITI)', 'Monitoramento remoto contínuo 24×7', 'Log de acesso físico com biometria e registro de data/hora', 'Relatórios de acesso disponíveis para auditorias'] },
  { icon: Settings, titulo: 'Supressão de Incêndio', itens: ['Sistema de supressão por gás limpo (Novec 1230 ou FM-200)', 'Sem danos a equipamentos eletrônicos e mídias magnéticas', 'Detecção por amostragem de ar (VESDA) para resposta antecipada', 'Alarme antes da descarga para evacuação segura', 'Duplo acionamento: automático + manual'] },
]

const hsm = [
  { titulo: 'Certificação FIPS 140-2 Level 3', desc: 'Requisito mínimo exigido pelo ITI para HSMs que armazenam chaves privadas de AC. Garante proteção física contra tamper e autenticação de identidade dos operadores.' },
  { titulo: 'Common Criteria EAL 4+', desc: 'Nível de avaliação exigido para ACs de 1º nível e recomendado para ACs críticas. Vai além do FIPS ao avaliar todo o ciclo de vida do produto.' },
  { titulo: 'Fabricantes Homologados', desc: 'Thales Luna (HSM Network, PCIe), Entrust nShield (Connect, Solo), Utimaco SecurityServer, Securosys Primus — todos com modelos FIPS 140-2 Level 3 certificados.' },
  { titulo: 'Cluster Ativo-Passivo', desc: 'Dois ou mais HSMs em cluster com replicação de chaves em tempo real. Failover automático sem interrupção da operação em caso de falha de hardware.' },
  { titulo: 'Cerimônia de Chaves (Key Ceremony)', desc: 'Procedimento formal com múltiplos custódios (esquema M de N), registrado em vídeo e com ata assinada. Exigido pelo ITI para geração de chaves de AC.' },
  { titulo: 'Backup Offline de Chaves', desc: 'HSM dedicado offline (cold backup) ou smart cards criptografados com fragmentação de custódia — armazenados em local físico separado da operação principal.' },
]

const logicos = [
  { titulo: 'Gestão de Identidade e Acesso Privilegiado (PAM)', desc: 'Cofre de senhas com controle de acesso a sistemas críticos, gravação de sessão dos administradores e autenticação multifator obrigatória.' },
  { titulo: 'Logs de Auditoria Imutáveis', desc: 'Todos os eventos da DOC-ICP-07 registrados em syslog com assinatura digital ou enviados para SIEM imutável — sem possibilidade de edição retroativa.' },
  { titulo: 'Segregação de Ambientes', desc: 'Rede de produção isolada fisicamente ou por VLAN da rede administrativa e de homologação. AC Raiz operada em ambiente air-gapped (sem conexão à internet).' },
  { titulo: 'Gestão de Vulnerabilidades', desc: 'Varredura mensal com ferramenta aprovada, pentest anual por empresa credenciada, aplicação de patches em janela controlada com rollback documentado.' },
  { titulo: 'Plano de Continuidade de Negócios (PCN)', desc: 'Análise de Impacto (BIA), plano de continuidade com RTO e RPO definidos, plano de DR homologado e testado semestralmente com evidências documentadas.' },
  { titulo: 'SIEM e Monitoramento Contínuo', desc: 'Correlação de eventos em tempo real, alertas para tentativas de acesso não autorizado ao HSM, monitoramento de integridade de arquivos críticos (FIM).' },
  { titulo: 'Gestão de Mídias e Descarte Seguro', desc: 'Controle de mídias removíveis, sanitização de discos conforme NIST 800-88 e destruição segura com laudo para mídias com dados de AC.' },
  { titulo: 'Controle de Mudanças e Configuração', desc: 'Versionamento de configurações, aprovação formal para mudanças em sistemas críticos, rollback disponível e teste em ambiente de homologação antes da produção.' },
]

const credenciamento = [
  { num: '01', titulo: 'Definição do Papel na Hierarquia', desc: 'Determinar se a AC será de 1º ou 2º nível, qual Política de Certificação adotará (A1 a A4, S1 a S4, T3, T4) e a AC de nível superior que assinará o certificado da nova AC.' },
  { num: '02', titulo: 'Elaboração da DPC e PC', desc: 'Redação da Declaração de Práticas de Certificação e da Política de Certificação conforme DOC-ICP-03. Documentos técnico-jurídicos que definem todas as práticas operacionais da AC.' },
  { num: '03', titulo: 'Implantação da Infraestrutura', desc: 'Implementação da sala cofre, aquisição e instalação do HSM em cluster, configuração dos sistemas de gestão de certificados, plataforma de RA e controles de segurança exigidos.' },
  { num: '04', titulo: 'Autoavaliação e Gap Analysis', desc: 'Auditoria interna contra os requisitos DOC-ICP-04 e DOC-ICP-05. Identificação e tratamento de lacunas antes de solicitar a auditoria formal do ITI.' },
  { num: '05', titulo: 'Solicitação de Credenciamento ao ITI', desc: 'Protocolo formal junto ao ITI com todos os documentos exigidos: DPC, PC, planta da sala cofre, laudos técnicos de HSM, relatório de auditoria interna e documentação societária.' },
  { num: '06', titulo: 'Auditoria Técnica pelo ITI', desc: 'Auditores credenciados pelo ITI realizam vistoria presencial na sala cofre, verificam configurações do HSM, testam os sistemas e validam os registros de auditoria.' },
  { num: '07', titulo: 'Cerimônia de Geração de Chaves', desc: 'Realizada com auditores do ITI presentes. Geração do par de chaves da AC no HSM, com registro em ata e vídeo. A chave pública é enviada para a AC superior para emissão do certificado.' },
  { num: '08', titulo: 'Aprovação e Publicação', desc: 'Após aprovação pelo Comitê Gestor ICP-Brasil, o certificado da AC é publicado no repositório ICP-Brasil e a AC pode iniciar operação.' },
  { num: '09', titulo: 'Auditorias Periódicas', desc: 'Auditorias anuais obrigatórias para manutenção do credenciamento. Qualquer alteração relevante de infraestrutura ou DPC exige notificação prévia ao ITI.' },
]

const outrosOrgaos = [
  { orgao: 'ANPD / LGPD', desc: 'Certificados contêm dados pessoais (nome, CPF, e-mail). A AC atua como controladora de dados e deve ter DPO designado, ROPA atualizado, mecanismos de exercício de direitos e aviso de violação em 72h.' },
  { orgao: 'Banco Central (BCB)', desc: 'ACs que emitem certificados para o Sistema Financeiro Nacional (SFN) — SPB, PIX, Open Finance — devem atender às exigências adicionais do BCB e ter sua DPC aprovada para esse uso.' },
  { orgao: 'CA/Browser Forum', desc: 'Para ACs que emitem certificados SSL/TLS confiados por navegadores, é obrigatório seguir os Baseline Requirements do CA/B Forum e obter auditoria WebTrust ou ETSI EN 319 411.' },
  { orgao: 'eIDAS (União Europeia)', desc: 'ACs que precisam de reconhecimento mútuo com a Europa devem ser Qualified Trust Service Providers (QTSP) conforme eIDAS, com auditoria de CAB credenciado pelo organismo supervisor do país-membro.' },
  { orgao: 'Conselho Federal de Medicina (CFM)', desc: 'Certificados para uso em sistemas médicos (prontuário eletrônico, receituário digital) têm requisitos específicos de perfil definidos pela Resolução CFM 2.299/2021.' },
  { orgao: 'Receita Federal / RFB', desc: 'Certificados e-CPF e e-CNPJ seguem a DOC-ICP-02 com extensões específicas da Receita Federal, com homologação necessária para integração com sistemas da RFB (e-CAC, SPED).' },
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
              {[{ name: 'Home', href: '/' }, { name: 'Segmentos', href: '/segmentos' }, { name: 'Autoridades Certificadoras', href: `/segmentos/${slug}` }].map((c, i, arr) => (
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
                Segmento Regulado
              </span>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="type-display text-white max-w-3xl mb-5">
                Infraestrutura para Autoridades Certificadoras ICP-Brasil — Requisitos, Normas e Credenciamento.
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg text-white/65 max-w-2xl leading-relaxed mb-8">
                Sala cofre, HSM FIPS 140-2 Level 3, padrões ANSI/TIA-942 e EN 1047-2, normas DOC-ICP completas e processo de credenciamento ITI — tudo o que uma AC precisa para operar com conformidade.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-4">
                <Link href="/contato" className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-hover transition-colors text-[0.9375rem]">
                  Solicitar Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Intro ────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <div className="max-w-3xl space-y-5">
              {[
                'Autoridades Certificadoras (ACs) operam a infraestrutura mais crítica da identidade digital brasileira. Cada certificado emitido — e-CPF, e-CNPJ, SSL, NF-e, certificado médico — ancora sua confiança na cadeia hierárquica da ICP-Brasil, regulada pelo ITI (Instituto Nacional de Tecnologia da Informação).',
                'Para operar como AC dentro da ICP-Brasil, uma entidade deve cumprir um conjunto rigoroso de requisitos normativos, físicos, lógicos e de gestão — definidos em mais de 16 documentos técnicos (DOC-ICP), auditados presencialmente pelo ITI e reavaliados anualmente.',
                'A JPX Digital conhece cada camada desses requisitos e estrutura a infraestrutura técnica de ACs em credenciamento e ACs já credenciadas que precisam modernizar ou expandir sua operação.',
              ].map((p, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <p className="text-gray-700 text-lg leading-relaxed">{p}</p>
                </FadeIn>
              ))}
            </div>

            {/* Hierarquia ICP-Brasil */}
            <div className="mt-16">
              <FadeIn>
                <h2 className="type-h2 text-gray-900 mb-3">Hierarquia ICP-Brasil</h2>
                <p className="text-gray-600 mb-10 max-w-2xl">A confiança na ICP-Brasil é estruturada em camadas. Cada nível tem requisitos específicos de infraestrutura e de política de certificação.</p>
              </FadeIn>
              <div className="flex flex-col gap-3 max-w-3xl">
                {[
                  { nivel: 'AC Raiz (ITI)', cor: 'bg-[#0A2540]', texto: 'text-white', desc: 'Âncora de confiança da ICP-Brasil. Operada exclusivamente pelo ITI em ambiente air-gapped, com cerimônia de chaves pública. Emite certificados apenas para ACs de 1º nível.' },
                  { nivel: 'AC de 1º Nível', cor: 'bg-[#0052CC]', texto: 'text-white', desc: 'Emitem certificados para ACs de 2º nível. Exigem infraestrutura máxima: HSM FIPS 140-2 Level 3, sala cofre conforme DOC-ICP-04.01, Tier III/IV e auditoria anual ITI.' },
                  { nivel: 'AC de 2º Nível', cor: 'bg-[#0078D4]', texto: 'text-white', desc: 'Emitem certificados para usuários finais (e-CPF, e-CNPJ, SSL, NF-e etc.). Requisitos técnicos similares às ACs de 1º nível, com política de certificação específica aprovada pelo ITI.' },
                  { nivel: 'Autoridade de Registro (AR)', cor: 'bg-[#E8F0FE]', texto: 'text-gray-800', desc: 'Valida a identidade dos solicitantes e encaminha pedidos de certificados para a AC vinculada. Não armazena chaves privadas. Requisitos físicos e lógicos próprios (DOC-ICP-06).' },
                ].map((h, i) => (
                  <FadeIn key={h.nivel} delay={i * 0.05}>
                    <div className={`${h.cor} rounded-xl p-5 flex gap-5 items-start`} style={{ marginLeft: `${i * 1.5}rem` }}>
                      <span className={`${h.texto} font-heading font-bold text-sm whitespace-nowrap`}>{h.nivel}</span>
                      <p className={`${h.texto === 'text-white' ? 'text-white/70' : 'text-gray-600'} text-sm leading-relaxed`}>{h.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Normas DOC-ICP ───────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="type-h2 text-gray-900">Normas e Documentos ICP-Brasil</h2>
              </div>
              <p className="text-gray-600 mb-10 max-w-2xl">O ITI mantém uma série de documentos técnicos (DOC-ICP) que definem todos os requisitos de uma AC. O não cumprimento de qualquer um deles impede ou suspende o credenciamento.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {normas.map((n, i) => (
                <FadeIn key={n.doc} delay={i * 0.03}>
                  <div className="bg-white border border-border rounded-xl p-5 h-full">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/8 text-primary text-xs font-bold font-heading mb-3">
                      {n.doc}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">{n.titulo}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{n.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Infraestrutura Física ─────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="type-h2 text-gray-900">Requisitos de Infraestrutura Física</h2>
              </div>
              <p className="text-gray-600 mb-10 max-w-2xl">Padrões de datacenter e sala cofre exigidos pelo ITI e pelas normas internacionais aplicáveis a ACs ICP-Brasil.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fisicos.map((f, i) => {
                const Icon = f.icon
                return (
                  <FadeIn key={f.titulo} delay={i * 0.06}>
                    <div className="border border-border rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-primary/8 text-primary flex items-center justify-center shrink-0">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm">{f.titulo}</h3>
                      </div>
                      <ul className="space-y-2">
                        {f.itens.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                )
              })}
            </div>

            {/* Padrões internacionais */}
            <FadeIn delay={0.1}>
              <div className="mt-8 bg-muted border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm">Padrões internacionais de referência</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { sigla: 'ANSI/TIA-942', desc: 'Datacenter Tier III/IV' },
                    { sigla: 'EN 1047-2', desc: 'Sala cofre resistência a fogo' },
                    { sigla: 'EN 50600', desc: 'Padrão europeu de DC' },
                    { sigla: 'ABNT NBR 15247', desc: 'Salas cofre brasileira' },
                    { sigla: 'ISO/IEC 27001', desc: 'Gestão de segurança' },
                  ].map((p) => (
                    <div key={p.sigla} className="bg-white border border-border rounded-lg p-3 text-center">
                      <p className="font-bold text-primary text-xs mb-1">{p.sigla}</p>
                      <p className="text-gray-500 text-[0.6875rem] leading-tight">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── HSM ──────────────────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <Lock className="w-5 h-5 text-primary" />
                <h2 className="type-h2 text-gray-900">Requisitos de HSM — Hardware Security Module</h2>
              </div>
              <p className="text-gray-600 mb-10 max-w-2xl">O HSM é o coração criptográfico de uma AC. As chaves privadas nunca podem deixar o HSM em texto claro — qualquer violação invalida toda a cadeia de confiança.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hsm.map((h, i) => (
                <FadeIn key={h.titulo} delay={i * 0.05}>
                  <div className="bg-white border border-border rounded-xl p-5 h-full">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center mb-3 text-xs font-bold font-heading shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">{h.titulo}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Requisitos Lógicos ───────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <Server className="w-5 h-5 text-primary" />
                <h2 className="type-h2 text-gray-900">Requisitos Lógicos e de Segurança da Informação</h2>
              </div>
              <p className="text-gray-600 mb-10 max-w-2xl">Além da infraestrutura física e criptográfica, o ITI exige controles de segurança da informação robustos, todos documentados e auditáveis.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {logicos.map((l, i) => (
                <FadeIn key={l.titulo} delay={i * 0.05}>
                  <div className="flex gap-4 p-5 bg-muted border border-border rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1.5 text-sm">{l.titulo}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{l.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Processo de Credenciamento ───────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <ClipboardList className="w-5 h-5 text-primary" />
                <h2 className="type-h2 text-gray-900">Processo de Credenciamento ITI</h2>
              </div>
              <p className="text-gray-600 mb-10 max-w-2xl">O credenciamento de uma AC junto ao ITI é um processo formal que envolve documentação técnica, auditoria presencial e cerimônia de chaves supervisionada.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {credenciamento.map((c, i) => (
                <FadeIn key={c.num} delay={i * 0.05}>
                  <div className="bg-white border border-border rounded-xl p-5 h-full flex gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-bold font-heading">
                      {c.num}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">{c.titulo}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outros Órgãos ────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h2 className="type-h2 text-gray-900">Outros Órgãos e Regulações Aplicáveis</h2>
              </div>
              <p className="text-gray-600 mb-10 max-w-2xl">Dependendo do tipo de certificado emitido e do mercado atendido, uma AC pode estar sujeita a requisitos adicionais além da ICP-Brasil.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outrosOrgaos.map((o, i) => (
                <FadeIn key={o.orgao} delay={i * 0.05}>
                  <div className="border border-border rounded-xl p-5">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary/8 text-secondary text-xs font-bold mb-3">
                      {o.orgao}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{o.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Como a JPX atua ──────────────────────────────── */}
        <section className="py-20 bg-muted">
          <div className="container-page">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="type-h2 text-gray-900">Como a JPX Digital Estrutura sua AC</h2>
              </div>
              <p className="text-gray-600 mb-10 max-w-2xl">Atendemos ACs em credenciamento inicial e ACs já credenciadas que precisam modernizar ou expandir sua infraestrutura técnica.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { titulo: 'Assessment de Conformidade Técnica', desc: 'Mapeamos os requisitos técnicos das normas ICP-Brasil aplicáveis (DOC-ICP-04, 04.01, 05) e avaliamos a infraestrutura existente. Entregamos um gap analysis com os controles a implementar antes da auditoria ITI.' },
                { titulo: 'TI dentro da Sala Cofre', desc: 'Atuamos na infraestrutura de TI dentro da sala cofre: HSMs em cluster, servidores com hardening, segmentação de rede e controles lógicos de acesso conforme DOC-ICP-04.01. A proteção física (painéis EN 1047-2, supressão, CFTV) fica com fornecedores especializados.' },
                { titulo: 'Cluster HSM e Alta Disponibilidade', desc: 'Implantamos HSM em cluster ativo-passivo (Thales Luna, Entrust nShield ou similar) com failover automático. Configuramos partições, políticas de acesso e procedimentos de cerimônia de chaves documentados.' },
                { titulo: 'Plataforma OpenShift/OKD e VMware', desc: 'OpenShift/OKD para o sistema de gestão de certificados e portal de AR — com ambientes de produção e homologação isolados e suporte a operação air-gapped. VMware vSphere para a camada de virtualização.' },
                { titulo: 'Documentação e Suporte à Auditoria', desc: 'Auxiliamos na elaboração da DPC e PC, preparamos evidências técnicas para a auditoria ITI e acompanhamos presencialmente a vistoria de credenciamento.' },
                { titulo: 'Suporte Gerenciado Pós-Credenciamento', desc: 'Monitoramento 24/7, manutenção de clusters, gestão de backups de configuração dos HSMs, suporte a auditorias anuais e atualização de infraestrutura conforme evolução dos requisitos ICP-Brasil.' },
              ].map((d, i) => (
                <FadeIn key={d.titulo} delay={i * 0.05}>
                  <div className="flex gap-4 p-6 bg-white border border-border rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1.5">{d.titulo}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
                    </div>
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
              {[
                { question: 'O que é necessário para uma AC obter credenciamento ITI?', answer: 'O credenciamento junto ao ITI exige cumprimento das Declarações de Práticas de Certificação (DPC), Política de Certificação (PC) e dos requisitos das normas DOC-ICP (03, 04, 04.01, 05, 06). Na parte técnica: HSM certificado FIPS 140-2 Level 3 ou superior, sala cofre com controle de acesso físico rigoroso conforme EN 1047-2, plano de DR documentado, controles de segurança da informação auditáveis e registros de auditoria cobrindo todos os eventos da DOC-ICP-07.' },
                { question: 'Quanto tempo leva o processo de credenciamento ITI?', answer: 'O prazo varia conforme a maturidade da infraestrutura existente. Do zero, o processo costuma levar de 6 a 18 meses: de 3 a 12 meses para implantação da infraestrutura, elaboração da DPC/PC e gap analysis interno, mais o prazo de análise do ITI (geralmente 60 a 120 dias após protocolo completo). A JPX Digital ajuda a reduzir o tempo de implantação e evita retrabalho por não conformidades.' },
                { question: 'Por que usar OpenShift/OKD em uma AC?', answer: 'Ambientes de AC exigem alta disponibilidade, controle rigoroso de versões de software e auditabilidade de todas as operações. OpenShift/OKD oferece namespaces isolados para produção e homologação, rollout controlado de atualizações, integração com políticas de segurança e conformidade (SCC, NetworkPolicy), e suporte a operação em ambiente air-gapped para a CA raiz.' },
                { question: 'Qual o nível de sala cofre exigido para operar uma AC ICP-Brasil?', answer: 'O DOC-ICP-04.01 e o DOC-ICP-04 exigem proteção física compatível com o nível de risco da AC. Para ACs de 1º nível e AC Raiz, o padrão é sala cofre EN 1047-2 (RH 120 DIS) com controle de acesso biométrico e dupla custódia para o compartimento do HSM, CFTV com retenção mínima de 90 dias e sistema de supressão de incêndio por gás limpo.' },
                { question: 'HSM em cluster é obrigatório para operação de AC?', answer: 'Não é formalmente obrigatório pela norma, mas é indispensável para operação contínua sem risco de perda de chaves. HSM em cluster ativo-passivo garante failover automático sem perda de acesso às chaves privadas da AC. A perda das chaves da AC invalida todos os certificados emitidos por ela — um cenário catastrófico que torna o cluster a única abordagem prudente.' },
                { question: 'Uma AC ICP-Brasil precisa estar adequada à LGPD?', answer: 'Sim. A AC coleta e processa dados pessoais dos titulares de certificados (nome, CPF, e-mail, biometria em alguns casos). Como controladora de dados, deve ter DPO designado, ROPA atualizado, mecanismos de exercício de direitos pelos titulares, aviso de violação à ANPD em até 72h e contratos com operadores (fornecedores de sistema de gestão de certificados, ARs vinculadas).' },
                { question: 'A JPX Digital oferece suporte pós-credenciamento?', answer: 'Sim. Prestamos suporte gerenciado de infraestrutura para ACs já credenciadas: manutenção de clusters VMware e OpenShift, monitoramento 24/7 dos sistemas, gestão de backups de configuração dos HSMs, suporte presencial a auditorias anuais ITI e atualização de infraestrutura conforme evolução dos requisitos das normas DOC-ICP.' },
              ].map((faq, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <details className="group bg-muted border border-border rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-100 transition-colors list-none">
                      <span className="text-sm">{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform duration-200 shrink-0" />
                    </summary>
                    <div className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-border bg-white">
                      {faq.answer}
                    </div>
                  </details>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────── */}
        <section className="dark-grid-bg py-20">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <FadeIn direction="left">
                <h2 className="type-h2 text-white mb-4">Pronto para estruturar sua AC?</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Solicite um assessment gratuito. Nossa equipe avalia sua infraestrutura atual, identifica lacunas em relação aos requisitos ICP-Brasil e propõe um plano de implementação — sem compromisso.
                </p>
                <ul className="space-y-3">
                  {['Gap analysis gratuito contra os requisitos DOC-ICP', 'Retorno em até 1 dia útil', 'Atendimento direto com especialista em infraestrutura para ACs'].map((p) => (
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
