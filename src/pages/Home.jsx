import { useState } from 'react'

const WA_LINK =
  'https://wa.me/5518930852246?text=Ol%C3%A1!%20Tenho%20interesse%20nas%20solu%C3%A7%C3%B5es%20da%20JPX%20Digital.'

const products = [
  {
    id: 'security',
    accent: 'blue',
    badgeVariant: 'badge--blue',
    icon: '🛡️',
    badge: 'Parceiro Oficial Bitdefender',
    title: 'Segurança Gerenciada',
    desc: 'Proteção total para endpoints, servidores e dispositivos móveis',
    features: [
      'EDR avançado com detecção comportamental',
      'Console centralizado multi-tenant',
      'Proteção contra ransomware em tempo real',
      'Relatórios automáticos de conformidade',
      'Suporte especializado em português',
    ],
    cta: 'Solicitar demonstração',
    ctaLink: WA_LINK,
  },
  {
    id: 'backup',
    accent: 'green',
    badgeVariant: 'badge--green',
    icon: '☁️',
    badge: 'Parceria Datto',
    title: 'Backup em Nuvem',
    desc: 'Backup automático, criptografado e verificado — sem trabalho manual',
    features: [
      'Agente leve baseado em restic',
      'Criptografia AES-256 ponta a ponta',
      'Deduplicação e compressão inteligente',
      'Múltiplos destinos S3 (R2 / B2 / AWS)',
      'Painel de monitoramento em tempo real',
      'BCDR com Datto para ambientes corporativos',
    ],
    cta: 'Calcular meu plano',
    ctaLink: WA_LINK,
  },
  {
    id: 'ai',
    accent: 'purple',
    badgeVariant: 'badge--purple',
    icon: '🤖',
    badge: 'Powered by Claude AI',
    title: 'Assistente de TI com IA',
    desc: 'Suporte técnico inteligente, disponível 24h, configurado para o seu negócio',
    features: [
      'Chatbot treinado exclusivamente para TI',
      'Integração nativa WhatsApp e web',
      'Personalização por segmento de mercado',
      'Análise de imagens e capturas de tela',
      '100% em português, sem fila de espera',
    ],
    cta: 'Ver demonstração',
    ctaLink: WA_LINK,
  },
  {
    id: 'automation',
    accent: 'yellow',
    badgeVariant: 'badge--yellow',
    icon: '⚙️',
    badge: null,
    title: 'Automação de Processos',
    desc: 'Conecte seus sistemas e elimine trabalho repetitivo com IA',
    features: [
      '+400 integrações nativas com n8n',
      'Workflows visuais sem código',
      'IA integrada (OpenAI / Claude)',
      'Self-hosted ou cloud gerenciado',
      'Conectores ERP, CRM e e-commerce',
      'Entrega em semanas, não meses',
    ],
    cta: 'Agendar diagnóstico',
    ctaLink: WA_LINK,
  },
]

const whyItems = [
  {
    icon: '🏅',
    title: 'Parceiros certificados',
    desc: 'Somos parceiros oficiais Bitdefender e Datto, com acesso a suporte técnico e treinamentos exclusivos.',
  },
  {
    icon: '🇧🇷',
    title: 'Suporte em português',
    desc: 'Atendimento 100% em português, com especialistas que entendem o contexto do seu negócio.',
  },
  {
    icon: '🚀',
    title: 'Implementação em semanas',
    desc: 'Metodologia ágil para colocar sua solução em produção rapidamente, sem burocracia.',
  },
]

function CheckIcon({ className }) {
  return (
    <span className={`feature-list__check ${className ?? ''}`} aria-hidden="true">
      ✓
    </span>
  )
}

function ProductCard({ product }) {
  return (
    <article className={`product-card product-card--${product.accent} animate-fade-up`}>
      <div className="product-card__icon">{product.icon}</div>
      <div className="product-card__header">
        {product.badge && (
          <span className={`badge ${product.badgeVariant}`}>{product.badge}</span>
        )}
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__desc">{product.desc}</p>
      </div>
      <ul className="feature-list">
        {product.features.map((f) => (
          <li key={f} className="feature-list__item">
            <CheckIcon />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={product.ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--outline btn--sm"
      >
        {product.cta}
      </a>
    </article>
  )
}

function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', interest: '', message: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Erro desconhecido. Tente novamente.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Falha na conexão. Verifique sua internet e tente novamente.')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-success animate-fade-up">
        <div className="contact-success__icon">✓</div>
        <h3 className="contact-success__title">Mensagem enviada!</h3>
        <p className="contact-success__sub">
          Recebemos seu contato. Um especialista retornará em breve.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost btn--sm"
        >
          💬 Falar agora no WhatsApp
        </a>
      </div>
    )
  }

  const disabled = status === 'submitting'

  return (
    <form className="contact-form animate-fade-up" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-name">
            Nome completo *
          </label>
          <input
            className="contact-form__input"
            type="text"
            id="cf-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="João Silva"
            required
            disabled={disabled}
          />
        </div>
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-email">
            E-mail *
          </label>
          <input
            className="contact-form__input"
            type="email"
            id="cf-email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="joao@empresa.com"
            required
            disabled={disabled}
          />
        </div>
      </div>
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-phone">
            Telefone
          </label>
          <input
            className="contact-form__input"
            type="tel"
            id="cf-phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(18) 99999-9999"
            disabled={disabled}
          />
        </div>
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-company">
            Empresa
          </label>
          <input
            className="contact-form__input"
            type="text"
            id="cf-company"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Nome da empresa"
            disabled={disabled}
          />
        </div>
      </div>
      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="cf-interest">
          Interesse
        </label>
        <select
          className="contact-form__input contact-form__select"
          id="cf-interest"
          name="interest"
          value={form.interest}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="">Selecione um produto...</option>
          <option value="Segurança Gerenciada">Segurança Gerenciada</option>
          <option value="Backup em Nuvem">Backup em Nuvem</option>
          <option value="Assistente de TI com IA">Assistente de TI com IA</option>
          <option value="Automação de Processos">Automação de Processos</option>
          <option value="Todos / Não sei ainda">Todos / Não sei ainda</option>
        </select>
      </div>
      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="cf-message">
          Mensagem
        </label>
        <textarea
          className="contact-form__input contact-form__textarea"
          id="cf-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Conte um pouco sobre o que precisa..."
          rows={3}
          disabled={disabled}
        />
      </div>
      {status === 'error' && (
        <p className="contact-form__error">{errorMsg}</p>
      )}
      <div className="contact-form__footer">
        <button className="btn btn--primary" type="submit" disabled={disabled}>
          {disabled ? 'Enviando...' : 'Enviar mensagem'}
        </button>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost"
        >
          💬 WhatsApp
        </a>
      </div>
    </form>
  )
}

export default function Home() {
  const scrollToProducts = (e) => {
    e.preventDefault()
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Navigation ───────────────────────────────────── */}
      <header className="nav" role="banner">
        <div className="nav__inner">
          <a href="/" className="nav__logo">
            JPX <span>Digital</span>
          </a>
          <nav className="nav__links" aria-label="Menu principal">
            <a href="#produtos" className="nav__link" onClick={scrollToProducts}>
              Produtos
            </a>
            <a href="#parceiros" className="nav__link">
              Parceiros
            </a>
            <a href="#contato" className="nav__link">
              Contato
            </a>
          </nav>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--sm"
          >
            Fale Conosco
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__bg" aria-hidden="true" />
          <div className="hero__grid" aria-hidden="true" />
          <div className="container">
            <div className="hero__content">
              <div className="hero__eyebrow animate-fade-in">
                <span>✦</span> Soluções de TI para empresas
              </div>
              <h1 id="hero-title" className="hero__title animate-fade-up">
                Tecnologia que <em>trabalha por você</em>
              </h1>
              <p className="hero__sub animate-fade-up">
                Soluções de TI para empresas — segurança, backup, automação e
                inteligência artificial. Tudo integrado, em português, com suporte de
                quem entende o seu negócio.
              </p>
              <div className="hero__actions animate-fade-up">
                <a
                  href="#produtos"
                  className="btn btn--primary"
                  onClick={scrollToProducts}
                >
                  Conheça nossas soluções →
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                >
                  Falar com especialista
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Partners Bar ─────────────────────────────────── */}
        <div id="parceiros" className="partners">
          <div className="container">
            <div className="partners__inner">
              <span className="partners__label">Parceiros Tecnológicos</span>
              <div className="partners__logos">
                <span className="partners__badge partners__badge--bitdefender">
                  🔴 Bitdefender GravityZone
                </span>
                <span className="partners__badge partners__badge--datto">
                  🟢 Datto BCDR
                </span>
                <span className="partners__badge">
                  🤖 Claude AI (Anthropic)
                </span>
                <span className="partners__badge">
                  ⚙️ n8n Automation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Products ─────────────────────────────────────── */}
        <section id="produtos" className="section" aria-labelledby="products-title">
          <div className="container">
            <header className="section__header">
              <span className="section__label">Nossos produtos</span>
              <h2 id="products-title" className="section__title">
                Uma plataforma completa de TI
              </h2>
              <p className="section__sub">
                Do endpoint à nuvem, da automação ao suporte com IA — entregamos
                tecnologia que gera resultados reais para o seu negócio.
              </p>
            </header>
            <div className="products__grid stagger">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Why JPX ──────────────────────────────────────── */}
        <section className="section section--alt" aria-labelledby="why-title">
          <div className="container">
            <header className="section__header">
              <span className="section__label">Por que a JPX Digital</span>
              <h2 id="why-title" className="section__title">
                Expertise que faz a diferença
              </h2>
              <p className="section__sub">
                Combinamos certificações, parcerias estratégicas e atendimento
                humano para entregar resultados concretos.
              </p>
            </header>
            <div className="why-grid stagger">
              {whyItems.map((item) => (
                <div key={item.title} className="why-card animate-fade-up">
                  <div className="why-card__icon">{item.icon}</div>
                  <h3 className="why-card__title">{item.title}</h3>
                  <p className="why-card__desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Final ────────────────────────────────────── */}
        <section
          id="contato"
          className="cta-section"
          aria-labelledby="cta-title"
        >
          <div className="container">
            <div className="cta-section__card">
              <header className="cta-section__header animate-fade-up">
                <h2 id="cta-title" className="cta-section__title">
                  Pronto para transformar sua<br />infraestrutura de TI?
                </h2>
                <p className="cta-section__sub">
                  Preencha o formulário e um especialista entra em contato.
                  Sem compromisso.
                </p>
              </header>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <span className="footer__logo">
                JPX <span>Digital</span>
              </span>
              <span className="footer__sub">Zerofill Tecnologia</span>
            </div>
            <nav className="footer__links" aria-label="Links do rodapé">
              <a href="#produtos" className="footer__link" onClick={(e) => { e.preventDefault(); document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Produtos
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                WhatsApp
              </a>
              <a
                href="mailto:suporte@jpxdigital.com.br"
                className="footer__link"
              >
                suporte@jpxdigital.com.br
              </a>
            </nav>
            <p className="footer__copy">
              © 2025 JPX Digital · Zerofill Tecnologia
              <br />
              CNPJ: 57.454.973/0001-18
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
