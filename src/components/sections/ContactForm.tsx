'use client'
import { useRef, useState } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import type { LeadFormData, LeadApiResponse } from '@/types'

const interestOptions: { label: string; slug: string }[] = [
  { label: 'Cloud Computing (OCI / Azure / AWS)', slug: 'cloud-computing' },
  { label: 'Backup Corporativo',                  slug: 'backup-corporativo' },
  { label: 'Disaster Recovery',                   slug: 'disaster-recovery' },
  { label: 'Resiliência Cibernética',             slug: 'resiliencia-cibernetica' },
  { label: 'Microsoft 365',                       slug: 'backup-microsoft-365' },
  { label: 'FinOps',                              slug: 'finops' },
  { label: 'Docker & Kubernetes',                 slug: 'containers-kubernetes' },
  { label: 'Suporte Gerenciado',                  slug: 'suporte-gerenciado' },
  { label: 'Consultoria Estratégica',             slug: 'consultoria-estrategica' },
  { label: 'Outro / Não sei ainda',               slug: '' },
]

const empty: LeadFormData = {
  name: '', email: '', phone: '', company: '', interest: '', serviceSlug: '', message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<LeadFormData>(empty)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileRef = useRef<TurnstileInstance>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === 'interest') {
      const opt = interestOptions.find((o) => o.label === e.target.value)
      setForm((prev) => ({ ...prev, interest: e.target.value, serviceSlug: opt?.slug ?? '' }))
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!form.name.trim()) {
      setStatus('error')
      setErrorMsg('Informe seu nome completo.')
      return
    }
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      setStatus('error')
      setErrorMsg('Informe um e-mail válido (ex: joao@empresa.com).')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15_000)

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (!res.ok && res.headers.get('content-type')?.includes('text/html')) {
        setStatus('error')
        setErrorMsg('Erro temporário no servidor. Tente novamente em alguns segundos.')
        return
      }

      const data: LeadApiResponse = await res.json()
      if (data.success) {
        setStatus('success')
        setForm(empty)
        setTurnstileToken('')
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Erro desconhecido. Tente novamente.')
      }
    } catch (err) {
      setStatus('error')
      turnstileRef.current?.reset()
      setTurnstileToken('')
      if (err instanceof DOMException && err.name === 'AbortError') {
        setErrorMsg('O servidor demorou para responder. Tente novamente.')
      } else {
        setErrorMsg('Não foi possível enviar. Verifique sua conexão e tente novamente.')
      }
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success text-2xl font-bold mb-2">
          ✓
        </div>
        <h3 className="font-heading text-xl font-bold text-gray-900">Mensagem recebida!</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          Um especialista entrará em contato em até 1 dia útil.
        </p>
      </div>
    )
  }

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const disabled = status === 'submitting'
  const canSubmit = !disabled && (!siteKey || !!turnstileToken)

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="cf-name">
            Nome completo <span className="text-danger">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            disabled={disabled}
            value={form.name}
            onChange={handleChange}
            placeholder="João Silva"
            className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-colors disabled:opacity-60"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="cf-email">
            E-mail <span className="text-danger">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            disabled={disabled}
            value={form.email}
            onChange={handleChange}
            placeholder="joao@empresa.com"
            className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-colors disabled:opacity-60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="cf-phone">
            Telefone
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            disabled={disabled}
            value={form.phone}
            onChange={handleChange}
            placeholder="(18) 99999-9999"
            className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-colors disabled:opacity-60"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="cf-company">
            Empresa
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            disabled={disabled}
            value={form.company}
            onChange={handleChange}
            placeholder="Nome da empresa"
            className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-colors disabled:opacity-60"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700" htmlFor="cf-interest">
          Qual serviço você precisa?
        </label>
        <select
          id="cf-interest"
          name="interest"
          disabled={disabled}
          value={form.interest}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-colors disabled:opacity-60"
        >
          <option value="">Selecione uma área...</option>
          {interestOptions.map((o) => (
            <option key={o.slug} value={o.label}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700" htmlFor="cf-message">
          Mensagem
        </label>
        <textarea
          id="cf-message"
          name="message"
          disabled={disabled}
          value={form.message}
          onChange={handleChange}
          rows={3}
          placeholder="Descreva brevemente o seu ambiente e o desafio que enfrenta..."
          className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-colors disabled:opacity-60 resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-danger bg-danger/5 border border-danger/20 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      {siteKey && (
        <Turnstile
          ref={turnstileRef}
          siteKey={siteKey}
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken('')}
          onError={() => setTurnstileToken('')}
          options={{ theme: 'light', language: 'pt-BR' }}
        />
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full px-6 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          {disabled ? 'Enviando...' : 'Solicitar Assessment'}
        </button>
      </div>
    </form>
  )
}
