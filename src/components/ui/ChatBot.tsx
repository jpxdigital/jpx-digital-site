'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, ChevronRight, Send } from 'lucide-react'

type Msg = { from: 'bot' | 'user'; text: string }
type Step =
  | 'start'
  | 'diagnostico_area'
  | 'servico_qual'
  | 'servico_acao'
  | 'servico_cloud'
  | 'servico_backup'
  | 'servico_outros'
  | 'servico_seguranca'
  | 'servico_pentest'
  | 'servico_fortinet'
  | 'servico_certificado'
  | 'suporte_cliente'
  | 'fim_form'
  | 'fim_agendar'
  | 'fim_whatsapp'
  | 'fim_email'
  | 'fim_pagina'
  | 'fim_certificado'
  | 'fim_pentest'
  | 'fim_pentest_continuo'
  | 'fim_analise_vuln'
  | 'fim_fortinet'
  | 'fim_oci'
  | 'fim_azure'
  | 'fim_aws'
  | 'fim_finops'
  | 'fim_backup'
  | 'fim_backup_m365'
  | 'fim_dr'
  | 'fim_ai'
  | 'fim_suporte'

interface Option { label: string; next: Step; userText?: string }

const FLOW: Record<Step, { msg: string; options?: Option[]; cta?: { label: string; href: string } }> = {
  start: {
    msg: 'Olá! Sou a Helena, assistente de TI da JPX Digital. Como posso ajudar?',
    options: [
      { label: 'Quero um diagnóstico gratuito', next: 'diagnostico_area', userText: 'Quero um diagnóstico gratuito' },
      { label: 'Tenho dúvidas sobre serviços', next: 'servico_qual', userText: 'Tenho dúvidas sobre serviços' },
      { label: 'Preciso de suporte técnico', next: 'suporte_cliente', userText: 'Preciso de suporte técnico' },
      { label: 'Outro assunto', next: 'fim_form', userText: 'Outro assunto' },
    ],
  },
  diagnostico_area: {
    msg: 'Ótimo! Qual é a principal preocupação da sua empresa hoje?',
    options: [
      { label: 'Backup e recuperação de dados', next: 'servico_backup', userText: 'Backup e recuperação' },
      { label: 'Pentest ou segurança ofensiva', next: 'servico_pentest', userText: 'Pentest e segurança ofensiva' },
      { label: 'Cloud e redução de custos', next: 'servico_cloud', userText: 'Cloud e custos' },
      { label: 'Firewall, rede ou Fortinet', next: 'servico_fortinet', userText: 'Firewall e Fortinet' },
    ],
  },
  servico_qual: {
    msg: 'Sobre qual área você tem dúvidas?',
    options: [
      { label: 'Cloud (OCI / Azure / AWS / FinOps)', next: 'servico_cloud', userText: 'Cloud Computing' },
      { label: 'Backup, DR e Continuidade', next: 'servico_backup', userText: 'Backup e Continuidade' },
      { label: 'Segurança (pentest, Fortinet, hardening)', next: 'servico_seguranca', userText: 'Segurança' },
      { label: 'Certificados / IA / Outros', next: 'servico_outros', userText: 'Certificados e outros' },
    ],
  },
  servico_cloud: {
    msg: 'Qual plataforma cloud te interessa?',
    options: [
      { label: 'Oracle Cloud (OCI)', next: 'fim_oci', userText: 'Oracle Cloud OCI' },
      { label: 'Microsoft Azure', next: 'fim_azure', userText: 'Microsoft Azure' },
      { label: 'Amazon Web Services (AWS)', next: 'fim_aws', userText: 'AWS' },
      { label: 'FinOps — reduzir custos cloud', next: 'fim_finops', userText: 'FinOps e redução de custos' },
    ],
  },
  servico_backup: {
    msg: 'Qual área de backup e continuidade você precisa?',
    options: [
      { label: 'Backup Corporativo (servidores)', next: 'fim_backup', userText: 'Backup Corporativo' },
      { label: 'Backup Microsoft 365', next: 'fim_backup_m365', userText: 'Backup Microsoft 365' },
      { label: 'Disaster Recovery', next: 'fim_dr', userText: 'Disaster Recovery' },
      { label: 'Falar com especialista', next: 'fim_form', userText: 'Falar com especialista' },
    ],
  },
  servico_seguranca: {
    msg: 'Qual área de segurança te interessa?',
    options: [
      { label: 'Pentest e segurança ofensiva', next: 'servico_pentest', userText: 'Pentest e segurança ofensiva' },
      { label: 'Fortinet / Firewall & SD-WAN', next: 'servico_fortinet', userText: 'Fortinet e Firewall' },
      { label: 'Análise de vulnerabilidades', next: 'fim_analise_vuln', userText: 'Análise de vulnerabilidades' },
      { label: 'Hardening e resiliência cibernética', next: 'servico_acao', userText: 'Hardening e resiliência' },
    ],
  },
  servico_outros: {
    msg: 'O que você precisa?',
    options: [
      { label: 'Certificado Digital eCPF / eCNPJ', next: 'servico_certificado', userText: 'Certificado Digital' },
      { label: 'AI Readiness Assessment', next: 'fim_ai', userText: 'AI Readiness Assessment' },
      { label: 'Suporte Gerenciado (MSP)', next: 'fim_suporte', userText: 'Suporte Gerenciado' },
      { label: 'Falar com especialista', next: 'fim_form', userText: 'Falar com especialista' },
    ],
  },
  servico_pentest: {
    msg: 'Realizamos pentest em web, mobile, APIs e infraestrutura com metodologia red team — e pentest contínuo com dashboard 24/7. O que prefere ver?',
    options: [
      { label: 'Pentest (engajamento pontual)', next: 'fim_pentest', userText: 'Ver página de pentest' },
      { label: 'Pentest Contínuo (dashboard 24/7)', next: 'fim_pentest_continuo', userText: 'Ver pentest contínuo' },
      { label: 'Análise de vulnerabilidades', next: 'fim_analise_vuln', userText: 'Ver análise de vulnerabilidades' },
      { label: 'Falar com especialista', next: 'fim_form', userText: 'Falar com especialista' },
    ],
  },
  servico_fortinet: {
    msg: 'Somos especialistas certificados Fortinet NSE — FortiGate NGFW, SD-WAN, FortiManager e Security Fabric completo. Quer ver os detalhes ou falar com um especialista?',
    options: [
      { label: 'Ver página Fortinet', next: 'fim_fortinet', userText: 'Quero ver a página Fortinet' },
      { label: 'Falar com especialista', next: 'fim_form', userText: 'Falar com especialista' },
    ],
  },
  servico_certificado: {
    msg: 'Emitimos eCPF e eCNPJ nos formatos A1 e A3 — 100% remoto, você recebe seu certificado sem sair de casa. Quer ver os detalhes ou falar direto com a gente?',
    options: [
      { label: 'Ver página de certificados', next: 'fim_certificado', userText: 'Quero ver a página de certificados' },
      { label: 'Falar com especialista', next: 'fim_form', userText: 'Falar com especialista' },
    ],
  },
  servico_acao: {
    msg: 'Posso te direcionar para a página do serviço ou conectar com um especialista. O que prefere?',
    options: [
      { label: 'Ver página do serviço', next: 'fim_pagina', userText: 'Quero ver a página' },
      { label: 'Falar com especialista', next: 'fim_form', userText: 'Falar com especialista' },
    ],
  },
  suporte_cliente: {
    msg: 'Você já é cliente JPX Digital?',
    options: [
      { label: 'Sim, já sou cliente', next: 'fim_email', userText: 'Sim, já sou cliente' },
      { label: 'Não, ainda não sou cliente', next: 'diagnostico_area', userText: 'Não sou cliente ainda' },
    ],
  },
  fim_form: {
    msg: 'Como prefere dar o próximo passo?',
    options: [
      { label: 'Agendar reunião — 30 min', next: 'fim_agendar', userText: 'Quero agendar uma reunião' },
      { label: 'Falar pelo WhatsApp', next: 'fim_whatsapp', userText: 'Prefiro pelo WhatsApp' },
    ],
  },
  fim_agendar: {
    msg: 'Escolha o melhor horário — 30 minutos, sem custo. Nossa agenda está disponível abaixo.',
    cta: { label: 'Agendar conversa →', href: 'https://outlook.office.com/bookwithme/user/66cb66d8a4f04443ac6724f4dee2dc37@jpxdigital.com.br/meetingtype/AOK95PFdhEOl1ANn8yVfrA2?anonymous&ismsaljsauthenabled&ep=mlink' },
  },
  fim_whatsapp: {
    msg: 'Nosso WhatsApp responde em instantes — canal direto com nossa equipe.',
    cta: { label: 'Abrir WhatsApp →', href: 'https://wa.me/5518981890607' },
  },
  fim_email: {
    msg: 'Para suporte, entre em contato pelo e-mail jp@jpxdigital.com.br informando o problema e seu ambiente. Retornamos em até 4 horas.',
    cta: { label: 'Enviar e-mail', href: 'mailto:jp@jpxdigital.com.br' },
  },
  fim_pagina: {
    msg: 'Acesse a página de serviços para ver todos os detalhes. Se precisar de mais informações, o formulário de contato está disponível lá.',
    cta: { label: 'Ver serviços', href: '/servicos' },
  },
  fim_certificado: {
    msg: 'Na página de certificados você encontra eCPF A1/A3, eCNPJ A1/A3, comparativo de formatos e como funciona o processo remoto.',
    cta: { label: 'Ver certificados digitais', href: '/segmentos/autoridades-certificadoras' },
  },
  fim_pentest: {
    msg: 'Na página de pentest você encontra nossa metodologia (OWASP, PTES, MITRE ATT&CK), escopo de cobertura e nossos cases de segurança ofensiva.',
    cta: { label: 'Ver Pentest', href: '/servicos/pentest' },
  },
  fim_pentest_continuo: {
    msg: 'No pentest contínuo você tem achados em tempo real, dashboard 24/7 e integração com Jira e Slack. Vulnerabilidades corrigidas antes do relatório final.',
    cta: { label: 'Ver Pentest Contínuo', href: '/servicos/pentest-continuo' },
  },
  fim_fortinet: {
    msg: 'Na página Fortinet você encontra FortiGate NGFW, SD-WAN, FortiManager, FortiAnalyzer, Security Fabric e nossos cases de implantação em filiais e ambientes industriais.',
    cta: { label: 'Ver Fortinet Security Fabric', href: '/servicos/fortinet' },
  },
  fim_analise_vuln: {
    msg: 'Scan recorrente com validação manual, CVSS 3.1 e plano de remediação priorizado. Sem falsos positivos — só o que realmente precisa de ação.',
    cta: { label: 'Ver Análise de Vulnerabilidades', href: '/servicos/analise-vulnerabilidades' },
  },
  fim_oci: {
    msg: 'Somos especialistas certificados Oracle Cloud Infrastructure — migração, gestão e otimização de ambientes OCI para workloads críticos.',
    cta: { label: 'Ver Oracle Cloud (OCI)', href: '/servicos/oracle-cloud-oci' },
  },
  fim_azure: {
    msg: 'Arquitetura, migração e gestão de ambientes Microsoft Azure — com foco em performance, segurança e controle de custos.',
    cta: { label: 'Ver Microsoft Azure', href: '/servicos/microsoft-azure' },
  },
  fim_aws: {
    msg: 'Infraestrutura, segurança e otimização de custos na AWS — EC2, RDS, S3, Lambda e arquiteturas multi-conta.',
    cta: { label: 'Ver Amazon Web Services', href: '/servicos/aws' },
  },
  fim_finops: {
    msg: 'FinOps em 30 dias: auditoria de recursos, rightsizing, reservas e budget alerts. Reduzimos fatura cloud sem sacrificar performance.',
    cta: { label: 'Ver FinOps', href: '/servicos/finops' },
  },
  fim_backup: {
    msg: 'Backup corporativo com RPO e RTO definidos, testados e garantidos em contrato. Imutabilidade, off-site e retenção conforme regulatório.',
    cta: { label: 'Ver Backup Corporativo', href: '/servicos/backup-corporativo' },
  },
  fim_backup_m365: {
    msg: 'Backup completo do seu tenant Microsoft 365 — Exchange, SharePoint, OneDrive e Teams — com retenção de longo prazo e restauração granular.',
    cta: { label: 'Ver Backup Microsoft 365', href: '/servicos/backup-microsoft-365' },
  },
  fim_dr: {
    msg: 'Disaster Recovery com RTO em minutos. Ambiente de contingência testado, documentado e pronto para ativar quando necessário.',
    cta: { label: 'Ver Disaster Recovery', href: '/servicos/disaster-recovery' },
  },
  fim_ai: {
    msg: 'Avaliamos a maturidade da sua empresa para adoção de IA: riscos, LGPD, gaps de dados e roadmap de implementação segura.',
    cta: { label: 'Ver AI Readiness Assessment', href: '/servicos/ai-readiness-assessment' },
  },
  fim_suporte: {
    msg: 'Suporte gerenciado com SLA garantido — monitoramento proativo, resolução de incidentes e equipe especializada como extensão do seu time de TI.',
    cta: { label: 'Ver Suporte Gerenciado', href: '/servicos/suporte-gerenciado' },
  },
}

function HelenaAvatar({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size * (72 / 64)} viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="65" rx="16" ry="8" fill="#6C63FF" />
      <rect x="20" y="52" width="24" height="18" rx="10" fill="#7C6FF7" />
      <ellipse cx="14" cy="58" rx="5" ry="3" fill="#F4C2A1" transform="rotate(-20 14 58)" />
      <ellipse cx="50" cy="58" rx="5" ry="3" fill="#F4C2A1" transform="rotate(20 50 58)" />
      <rect x="27" y="44" width="10" height="8" rx="4" fill="#F4C2A1" />
      <circle cx="32" cy="30" r="22" fill="#F4C2A1" />
      <path d="M10 26 Q12 8 32 8 Q52 8 54 26 Q50 14 32 14 Q14 14 10 26Z" fill="#3B1F0A" />
      <ellipse cx="10" cy="22" rx="5" ry="8" fill="#3B1F0A" />
      <circle cx="10" cy="14" r="4" fill="#FF6B9D" />
      <ellipse cx="54" cy="22" rx="5" ry="8" fill="#3B1F0A" />
      <circle cx="54" cy="14" r="4" fill="#FF6B9D" />
      <ellipse cx="23" cy="30" rx="6" ry="7" fill="#fff" />
      <ellipse cx="41" cy="30" rx="6" ry="7" fill="#fff" />
      <circle cx="24" cy="31" r="4" fill="#3B1F0A" />
      <circle cx="42" cy="31" r="4" fill="#3B1F0A" />
      <circle cx="25" cy="30" r="1.5" fill="#fff" />
      <circle cx="43" cy="30" r="1.5" fill="#fff" />
      <line x1="17" y1="24" x2="15" y2="21" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="22" x2="19" y2="19" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="23" y1="22" x2="23" y2="19" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="38" y1="22" x2="38" y2="19" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="41" y1="22" x2="40" y2="19" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="44" y1="24" x2="46" y2="21" stroke="#3B1F0A" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="32" cy="36" rx="2" ry="1.5" fill="#E8A882" />
      <path d="M25 41 Q32 48 39 41" stroke="#D4724A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M28 42 Q32 46 36 42" fill="#fff" />
      <ellipse cx="16" cy="36" rx="5" ry="3.5" fill="#FF9EB5" fillOpacity=".45" />
      <ellipse cx="48" cy="36" rx="5" ry="3.5" fill="#FF9EB5" fillOpacity=".45" />
    </svg>
  )
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('start')
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [shown, setShown] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ from: 'bot', text: FLOW.start.msg }])
    }
  }, [open, msgs.length])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 3000)
    return () => clearTimeout(t)
  }, [])

  function choose(opt: Option) {
    setMsgs((prev) => [
      ...prev,
      { from: 'user', text: opt.userText ?? opt.label },
    ])
    const next = FLOW[opt.next]
    setTimeout(() => {
      setMsgs((prev) => [...prev, { from: 'bot', text: next.msg }])
      setStep(opt.next)
    }, 400)
  }

  function restart() {
    setStep('start')
    setMsgs([{ from: 'bot', text: FLOW.start.msg }])
  }

  const current = FLOW[step]

  return (
    <>
      {/* Floating avatar */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {/* Speech bubble */}
        {shown && !open && (
          <div className="relative max-w-[220px]">
            <div className="bg-white border border-border shadow-xl rounded-2xl px-4 py-3.5">
              <button
                onClick={() => setShown(false)}
                className="absolute top-2 right-2.5 text-gray-300 hover:text-gray-500 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-3 h-3" />
              </button>
              <p className="text-[0.8rem] font-semibold text-gray-800 leading-snug mb-1">
                Olá! Sou a Helena 👋
              </p>
              <p className="text-[0.75rem] text-gray-500 leading-snug">
                Assistente de TI da JPX Digital. Clique se precisar de ajuda!
              </p>
            </div>
            {/* Seta apontando para a Helena */}
            <div className="absolute -bottom-2 right-7 w-4 h-2 overflow-hidden">
              <div className="w-3 h-3 bg-white border-r border-b border-border rotate-45 mx-auto -mt-1.5 shadow-sm" />
            </div>
          </div>
        )}

        <div className="relative">
          {/* Botão X sobreposto quando aberto */}
          {open && (
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar assistente"
              className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-md hover:bg-gray-700 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Avatar Helena flutuante */}
          <button
            onClick={() => { setOpen((v) => !v); setShown(false) }}
            aria-label="Falar com a Helena"
            className="block drop-shadow-xl hover:scale-105 transition-transform duration-200"
            style={{ animation: open ? 'none' : 'helenaFloat 3s ease-in-out infinite' }}
          >
            <HelenaAvatar size={64} />
            {/* Indicador online */}
            {!open && (
              <span className="absolute bottom-4 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
            )}
          </button>
        </div>
      </div>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-28 right-5 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] bg-white border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-4 py-3.5 flex items-center gap-2.5">
            <HelenaAvatar size={32} />
            <div>
              <p className="text-white text-sm font-semibold leading-none">Helena · JPX Digital</p>
              <p className="text-white/60 text-[0.6875rem] mt-0.5">Assistente de TI · online agora</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-h-72 bg-gray-50">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'bot' && (
                  <div className="mr-2 shrink-0 self-end">
                    <HelenaAvatar size={24} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.from === 'bot'
                      ? 'bg-white border border-border text-gray-700 rounded-tl-sm'
                      : 'bg-primary text-white rounded-tr-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Options / CTA */}
          <div className="px-4 py-3 bg-white border-t border-border space-y-2">
            {current.options && current.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => choose(opt)}
                className="w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-xl border border-border text-sm text-gray-700 hover:bg-muted hover:border-primary/30 transition-all gap-2 group"
              >
                <span>{opt.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary shrink-0 transition-colors" />
              </button>
            ))}

            {current.cta && (
              <>
                <Link
                  href={current.cta.href}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors text-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  {current.cta.label}
                </Link>
                <button
                  onClick={restart}
                  className="w-full text-center text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors"
                >
                  Voltar ao início
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes helenaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  )
}
