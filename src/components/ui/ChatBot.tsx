'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, MessageSquare, ChevronRight, Send } from 'lucide-react'

type Msg = { from: 'bot' | 'user'; text: string }
type Step =
  | 'start'
  | 'diagnostico_area'
  | 'servico_qual'
  | 'servico_acao'
  | 'suporte_cliente'
  | 'fim_form'
  | 'fim_email'
  | 'fim_pagina'

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
      { label: 'Backup e recuperação de dados', next: 'fim_form', userText: 'Backup e recuperação' },
      { label: 'Segurança cibernética', next: 'fim_form', userText: 'Segurança cibernética' },
      { label: 'Cloud e redução de custos', next: 'fim_form', userText: 'Cloud e custos' },
      { label: 'Continuidade / Disaster Recovery', next: 'fim_form', userText: 'Continuidade e DR' },
    ],
  },
  servico_qual: {
    msg: 'Sobre qual serviço você tem dúvidas?',
    options: [
      { label: 'Cloud Computing (OCI / Azure / AWS)', next: 'servico_acao', userText: 'Cloud Computing' },
      { label: 'Backup Corporativo', next: 'servico_acao', userText: 'Backup Corporativo' },
      { label: 'Disaster Recovery', next: 'servico_acao', userText: 'Disaster Recovery' },
      { label: 'Segurança e Resiliência', next: 'servico_acao', userText: 'Segurança e Resiliência' },
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
    msg: 'Perfeito! Preencha o formulário de contato e um especialista retornará em até 1 dia útil.',
    cta: { label: 'Abrir formulário de contato', href: '/contato' },
  },
  fim_email: {
    msg: 'Para suporte, entre em contato pelo e-mail jp@jpxdigital.com.br informando o problema e seu ambiente. Retornamos em até 4 horas.',
    cta: { label: 'Enviar e-mail', href: 'mailto:jp@jpxdigital.com.br' },
  },
  fim_pagina: {
    msg: 'Acesse a página de serviços para ver todos os detalhes. Se precisar de mais informações, o formulário de contato está disponível lá.',
    cta: { label: 'Ver serviços', href: '/servicos' },
  },
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

  // Notificação discreta após 8s
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 8000)
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
      {/* Floating button */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {shown && !open && (
          <div className="bg-white border border-border shadow-lg rounded-xl px-4 py-2.5 text-sm text-gray-700 max-w-[220px] text-right animate-fade-in">
            Como posso te ajudar? 👋
            <button onClick={() => setShown(false)} className="ml-2 text-gray-400 hover:text-gray-600">
              <X className="w-3 h-3 inline" />
            </button>
          </div>
        )}
        <button
          onClick={() => { setOpen((v) => !v); setShown(false) }}
          aria-label="Abrir assistente"
          className="w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:bg-primary-hover transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] bg-white border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">Helena · JPX Digital</p>
                <p className="text-white/60 text-[0.6875rem] mt-0.5">Assistente de TI</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-h-72 bg-gray-50">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
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
    </>
  )
}
