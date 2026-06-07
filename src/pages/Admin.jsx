import { useState, useEffect, useCallback } from 'react'

const SESSION_KEY = 'jpx_admin_secret'

// ─── Mini gráfico de barras SVG ──────────────────────────────
function BarChart({ data, valueKey }) {
  if (!data?.length) return <p className="admin-empty">Sem dados no período.</p>

  const max = Math.max(...data.map((d) => d[valueKey]), 1)
  const w = 600
  const h = 140
  const barW = Math.max(4, Math.floor((w - 32) / data.length) - 2)

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="admin-chart" aria-hidden="true">
      {data.map((d, i) => {
        const barH = Math.max(2, Math.round(((d[valueKey] ?? 0) / max) * (h - 24)))
        const x = 16 + i * ((w - 32) / data.length)
        const y = h - 16 - barH
        return (
          <g key={d.date}>
            <rect x={x} y={y} width={barW} height={barH} rx="2" className="admin-bar" />
            <title>{d.date}: {d[valueKey]}</title>
          </g>
        )
      })}
      <line x1="16" y1={h - 16} x2={w - 16} y2={h - 16} className="admin-axis" />
    </svg>
  )
}

// ─── Tab: Analytics ──────────────────────────────────────────
function AnalyticsTab({ secret }) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: { 'x-admin-secret': secret },
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      setData(json)
    } catch (e) {
      setError(e.message || 'Erro ao carregar analytics')
    } finally {
      setLoading(false)
    }
  }, [secret])

  useEffect(() => { load() }, [load])

  if (loading) return <p className="admin-loading">Carregando...</p>
  if (error)   return <p className="admin-error">{error}</p>

  return (
    <div className="admin-section">
      <div className="admin-stats">
        <div className="admin-stat">
          <span className="admin-stat__value">{data.totals.requests.toLocaleString('pt-BR')}</span>
          <span className="admin-stat__label">Requisições (30 dias)</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat__value">{data.totals.pageViews.toLocaleString('pt-BR')}</span>
          <span className="admin-stat__label">Page views (30 dias)</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat__label admin-stat__period">
            {data.period.start} → {data.period.end}
          </span>
        </div>
      </div>
      <h3 className="admin-chart-title">Requisições diárias</h3>
      <BarChart data={data.daily} valueKey="requests" />
      <h3 className="admin-chart-title">Page views diários</h3>
      <BarChart data={data.daily} valueKey="pageViews" />
      <button className="admin-btn admin-btn--ghost" onClick={load}>Atualizar</button>
    </div>
  )
}

// ─── Tab: Variáveis de Ambiente ───────────────────────────────
function EnvVarsTab({ secret }) {
  const [vars,    setVars]    = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [saving,  setSaving]  = useState(false)
  const [msg,     setMsg]     = useState('')
  const [newKey,  setNewKey]  = useState('')
  const [newVal,  setNewVal]  = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/admin/env-vars', {
        headers: { 'x-admin-secret': secret },
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      setVars(json.vars)
    } catch (e) {
      setError(e.message || 'Erro ao carregar variáveis')
    } finally {
      setLoading(false)
    }
  }, [secret])

  useEffect(() => { load() }, [load])

  const update = async (key, value) => {
    setSaving(true)
    setMsg('')
    try {
      const res  = await fetch('/api/admin/env-vars', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({ vars: { [key]: value } }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      setMsg(`"${key}" atualizado com sucesso.`)
      await load()
    } catch (e) {
      setMsg(`Erro: ${e.message}`)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (key) => {
    if (!confirm(`Remover a variável "${key}"?`)) return
    setSaving(true)
    setMsg('')
    try {
      const res  = await fetch(`/api/admin/env-vars?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': secret },
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      setMsg(`"${key}" removida.`)
      await load()
    } catch (e) {
      setMsg(`Erro: ${e.message}`)
    } finally {
      setSaving(false)
    }
  }

  const add = async (e) => {
    e.preventDefault()
    if (!newKey.trim() || !newVal.trim()) return
    await update(newKey.trim(), newVal.trim())
    setNewKey('')
    setNewVal('')
  }

  if (loading) return <p className="admin-loading">Carregando...</p>
  if (error)   return <p className="admin-error">{error}</p>

  return (
    <div className="admin-section">
      {msg && <p className="admin-msg">{msg}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Variável</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vars.map((v) => (
            <EnvRow key={v.key} variable={v} onUpdate={update} onRemove={remove} saving={saving} />
          ))}
        </tbody>
      </table>

      <form className="admin-add-form" onSubmit={add}>
        <h3 className="admin-chart-title">Adicionar variável</h3>
        <div className="admin-add-row">
          <input
            className="admin-input"
            placeholder="NOME_DA_VARIAVEL"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            disabled={saving}
          />
          <input
            className="admin-input"
            placeholder="valor"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            disabled={saving}
          />
          <button className="admin-btn" type="submit" disabled={saving || !newKey || !newVal}>
            Adicionar
          </button>
        </div>
      </form>
    </div>
  )
}

function EnvRow({ variable: v, onUpdate, onRemove, saving }) {
  const [editing, setEditing] = useState(false)
  const [val,     setVal]     = useState('')

  const startEdit = () => {
    setVal(v.secret ? '' : v.value)
    setEditing(true)
  }

  const save = async () => {
    if (!val.trim()) return
    await onUpdate(v.key, val.trim())
    setEditing(false)
  }

  return (
    <tr>
      <td><code className="admin-code">{v.key}</code></td>
      <td>
        {editing ? (
          <input
            className="admin-input admin-input--sm"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={v.secret ? 'Novo valor secreto' : ''}
            autoFocus
          />
        ) : (
          <span className="admin-val">{v.value}</span>
        )}
      </td>
      <td>
        <span className={`admin-badge ${v.secret ? 'admin-badge--secret' : ''}`}>
          {v.secret ? 'secret' : 'texto'}
        </span>
      </td>
      <td className="admin-actions">
        {editing ? (
          <>
            <button className="admin-btn admin-btn--sm" onClick={save} disabled={saving || !val}>Salvar</button>
            <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setEditing(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={startEdit} disabled={saving}>Editar</button>
            <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => onRemove(v.key)} disabled={saving}>Remover</button>
          </>
        )}
      </td>
    </tr>
  )
}

// ─── Login ────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [secret, setSecret] = useState('')
  const [error,  setError]  = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const res  = await fetch('/api/admin/analytics', {
      headers: { 'x-admin-secret': secret },
    })
    if (res.status === 401) {
      setError('Senha incorreta.')
      return
    }
    sessionStorage.setItem(SESSION_KEY, secret)
    onLogin(secret)
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <h1 className="admin-login__title">JPX <span>Admin</span></h1>
        <form onSubmit={submit}>
          <input
            className="admin-input"
            type="password"
            placeholder="Senha de administrador"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            autoFocus
          />
          {error && <p className="admin-error">{error}</p>}
          <button className="admin-btn" type="submit" disabled={!secret}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Página principal ─────────────────────────────────────────
export default function Admin() {
  const [secret,  setSecret]  = useState(() => sessionStorage.getItem(SESSION_KEY) || '')
  const [activeTab, setActiveTab] = useState('analytics')

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setSecret('')
  }

  if (!secret) return <Login onLogin={setSecret} />

  return (
    <div className="admin-page">
      <header className="admin-header">
        <span className="admin-header__logo">JPX <span>Admin</span></span>
        <nav className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'analytics' ? 'admin-tab--active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={`admin-tab ${activeTab === 'env' ? 'admin-tab--active' : ''}`}
            onClick={() => setActiveTab('env')}
          >
            Variáveis de Ambiente
          </button>
        </nav>
        <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={logout}>Sair</button>
      </header>

      <main className="admin-main">
        {activeTab === 'analytics' && <AnalyticsTab secret={secret} />}
        {activeTab === 'env'       && <EnvVarsTab   secret={secret} />}
      </main>
    </div>
  )
}
