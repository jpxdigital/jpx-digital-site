import type { Metadata } from 'next'
import { MessageCircle, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Em breve',
  description: 'A JPX Digital está reconstruindo o site. Em breve, de volta com uma nova experiência.',
  robots: { index: false, follow: false },
}

export default function ManutencaoPage() {
  return (
    <main className="hero-grid-bg min-h-screen flex items-center justify-center text-white">
      <div className="container-page py-24 flex flex-col items-center text-center max-w-2xl mx-auto">
        <span className="font-heading font-bold text-3xl mb-10">
          JPX <span className="text-secondary">Digital</span>
        </span>

        <span className="type-label text-secondary mb-4">Em construção</span>

        <h1 className="type-display mb-5">
          Estamos preparando uma nova experiência.
        </h1>

        <p className="type-body-lg text-gray-300 mb-12 max-w-lg">
          O site da JPX Digital está em reconstrução. Enquanto isso, nossa consultoria
          continua funcionando normalmente — fale direto com a gente.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/5518981890607"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary hover:bg-secondary-hover transition-colors px-6 py-3.5 font-heading font-semibold text-sm"
          >
            <MessageCircle size={18} />
            Falar no WhatsApp
          </a>
          <a
            href="mailto:jp@jpxdigital.com.br"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 hover:border-white/40 transition-colors px-6 py-3.5 font-heading font-semibold text-sm"
          >
            <Mail size={18} />
            jp@jpxdigital.com.br
          </a>
        </div>

        <p className="type-small text-gray-500 mt-16">
          © {new Date().getFullYear()} JPX Digital Tecnologia LTDA · CNPJ 57.454.973/0001-18
        </p>
      </div>
    </main>
  )
}
