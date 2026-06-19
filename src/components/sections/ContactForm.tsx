'use client'
import { useState } from 'react'
import type { LeadFormData, LeadApiResponse } from '@/types'

const WA_LINK = 'https://wa.me/5518930852246?text=Ol%C3%A1!%20Tenho%20interesse%20nas%20solu%C3%A7%C3%B5es%20da%20JPX%20Digital.'

const interestOptions = [
  'Cloud Computing (OCI / Azure / AWS)',
  'Backup Corporativo',
  'Disaster Recovery',
  'Resiliência Cibernética',
  'Microsoft 365',
  'FinOps',
  'Docker & Kubernetes',
  'Suporte Gerenciado',
  'Consultoria Estratégica',
  'Outro / Não sei ainda',
]

const empty: LeadFormData = {
  name: '', email: '', phone: '', company: '', interest: '', message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<LeadFormData>(empty)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data: LeadApiResponse = await res.json()
      if (data.success) {
        setStatus('success')
        setForm(empty)
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Erro desconhecido. Tente novamente.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Falha na conexão. Verifique sua internet e tente novamente.')
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
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1ebe5d] transition-colors mt-2"
        >
          💬 Falar agora no WhatsApp
        </a>
      </div>
    )
  }

  const disabled = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
            <option key={o} value={o}>{o}</option>
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

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          type="submit"
          disabled={disabled}
          className="flex-1 px-6 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          {disabled ? 'Enviando...' : 'Solicitar Assessment'}
        </button>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3.5 border border-border text-gray-700 font-medium rounded-lg hover:bg-muted transition-colors text-sm"
        >
          💬 WhatsApp
        </a>
      </div>
    </form>
  )
}
