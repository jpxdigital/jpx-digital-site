import Link from 'next/link'

const services = [
  { href: '/servicos/cloud-computing', label: 'Cloud Computing' },
  { href: '/servicos/oracle-cloud-oci', label: 'Oracle Cloud (OCI)' },
  { href: '/servicos/backup-corporativo', label: 'Backup Corporativo' },
  { href: '/servicos/disaster-recovery', label: 'Disaster Recovery' },
  { href: '/servicos/certificados-digitais', label: 'Certificados Digitais' },
  { href: '/servicos/sala-cofre', label: 'Sala Cofre Nível 4' },
  { href: '/servicos/resiliencia-cibernetica', label: 'Resiliência Cibernética' },
  { href: '/servicos/suporte-gerenciado', label: 'Suporte Gerenciado' },
]

const segments = [
  { href: '/segmentos/hospitais-clinicas', label: 'Hospitais & Clínicas' },
  { href: '/segmentos/industrias', label: 'Indústrias' },
  { href: '/segmentos/escritorios', label: 'Escritórios Corporativos' },
  { href: '/segmentos/advocacia', label: 'Advocacia' },
  { href: '/segmentos/autoridades-certificadoras', label: 'Autoridades Certificadoras' },
]

const company = [
  { href: '/sobre', label: 'Sobre a JPX Digital' },
  { href: '/cases', label: 'Cases de Sucesso' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
]

const legal = [
  { href: '/privacidade', label: 'Política de Privacidade' },
]

export function Footer() {
  return (
    <footer className="bg-dark text-gray-400" role="contentinfo">
      <div className="container-page py-16 lg:py-20">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading font-bold text-2xl text-white">
                JPX <span className="text-secondary">Digital</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Consultoria especializada em cloud, backup corporativo e resiliência cibernética para empresas que não podem parar.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="/contato"
                className="block hover:text-white transition-colors"
              >
                Formulário de contato
              </a>
              <a
                href="tel:+5518930852246"
                className="block hover:text-white transition-colors"
              >
                (18) 9 3085-2246
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
              Serviços
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Segmentos */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
              Segmentos
            </h3>
            <ul className="space-y-3">
              {segments.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
              Empresa
            </h3>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} JPX Digital · Zerofill Tecnologia LTDA · CNPJ: 47.782.852/0001-08</p>
          <div className="flex items-center gap-5">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gray-400 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
