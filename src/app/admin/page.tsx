'use client'
import { useState, useEffect, useCallback } from 'react'
import type { AnalyticsData } from '@/types'

const SESSION_KEY = 'jpx_admin_secret'

function BarChart({ data, valueKey }: { data: AnalyticsData['daily']; valueKey: 'requests' | 'pageViews' }) {
  if (!data?.length) return <p className="text-gray-500 text-sm">Sem dados no período.</p>
  const max = Math.max(...data.map((d) => d[valueKey]), 1)
  const w = 600; const h = 120
  const barW = Math.max(4, Math.floor((w - 32) / data.length) - 2)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
      {data.map((d, i) => {
        const barH = Math.max(2, Math.round((d[valueKey] / max) * (h - 20)))
        const x = 16 + i * ((w - 32) / data.length)
        return (
          <g key={d.date}>
            <rect x={x} y={h - 16 - barH} width={barW} height={barH} rx="2" fill="#0078D4" opacity={0.8} />
            <title>{d.date}: {d[valueKey]}</title>
          </g>
        )
      })}
      <line x1="16" y1={h - 16} x2={w - 16} y2={h - 16} stroke="#E5E7EB" strokeWidth="1" />
    </svg>
  )
}

function AnalyticsPanel({ secret }: { secret: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/analytics', { headers: { 'x-admin-secret': secret } })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      setData(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar analytics')
    } finally { setLoading(false) }
  }, [secret])

  useEffect(() => { load() }, [load])

  if (loading) return <p className="text-gray-500 text-sm">Carregando...</p>
  if (error) return <p className="text-red-500 text-sm">{error}</p>
  if (!data) return null

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Requisições (30 dias)', value: data.totals.requests.toLocaleString('pt-BR') },
          { label: 'Page views (30 dias)', value: data.totals.pageViews.toLocaleString('pt-BR') },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="text-2xl font-bold text-gray-900 font-mono">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Requisições diárias</p>
        <BarChart data={data.daily} valueKey="requests" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Page views diários</p>
        <BarChart data={data.daily} valueKey="pageViews" />
      </div>
      <p className="text-xs text-gray-400">Período: {data.period.start} → {data.period.end}</p>
      <button onClick={load} className="text-sm text-blue-600 hover:underline">Atualizar</button>
    </div>
  )
}

function Login({ onLogin }: { onLogin: (s: string) => void }) {
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    const res = await fetch('/api/admin/analytics', { headers: { 'x-admin-secret': secret } })
    setLoading(false)
    if (res.status === 401) { setError('Senha incorreta.'); return }
    sessionStorage.setItem(SESSION_KEY, secret)
    onLogin(secret)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-sm shadow-sm">
        <h1 className="font-bold text-2xl text-gray-900 mb-1">JPX <span className="text-blue-600">Admin</span></h1>
        <p className="text-sm text-gray-500 mb-8">Painel interno de analytics</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="password"
            placeholder="Senha de administrador"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg text-sm hover:bg-gray-800 transition-colors disabled:opacity-60"
            type="submit"
            disabled={!secret || loading}
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [secret, setSecret] = useState(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_KEY) ?? '' : ''
  )

  const logout = () => { sessionStorage.removeItem(SESSION_KEY); setSecret('') }

  if (!secret) return <Login onLogin={setSecret} />

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-xl text-gray-900">JPX <span className="text-blue-600">Admin</span></span>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-800">Sair</button>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h2 className="text-lg font-bold text-gray-900 mb-8">Analytics — Cloudflare (últimos 30 dias)</h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <AnalyticsPanel secret={secret} />
        </div>
        <p className="text-xs text-gray-400 mt-6">
          Variáveis de ambiente são gerenciadas diretamente na VM via <code className="bg-gray-100 px-1 rounded">.env</code>.
        </p>
      </main>
    </div>
  )
}
