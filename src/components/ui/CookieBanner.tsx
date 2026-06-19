'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const COOKIE_KEY = 'jpx_cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) setVisible(true)
  }, [])

  function accept(all: boolean) {
    localStorage.setItem(COOKIE_KEY, all ? 'all' : 'necessary')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl bg-gray-950 border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold mb-1">Privacidade e Cookies</p>
          <p className="text-white/60 text-xs leading-relaxed">
            Usamos cookies necessários para o funcionamento do site e, com seu consentimento, cookies de análise para melhorar a experiência.
            Saiba mais em nossa{' '}
            <Link href="/privacidade" className="text-blue-400 hover:text-blue-300 underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => accept(false)}
            className="text-xs font-medium text-white/60 hover:text-white transition-colors px-4 py-2 border border-white/15 rounded-lg"
          >
            Apenas necessários
          </button>
          <button
            onClick={() => accept(true)}
            className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2 rounded-lg"
          >
            Aceitar todos
          </button>
          <button
            onClick={() => accept(false)}
            aria-label="Fechar"
            className="p-1.5 text-white/40 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
