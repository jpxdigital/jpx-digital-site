import { NextRequest, NextResponse } from 'next/server'
import { MAINTENANCE_MODE } from '@/lib/maintenance'

// Enquanto MAINTENANCE_MODE estiver true, todo visitante público é
// redirecionado para /manutencao. Rotas de sistema (API, assets, a própria
// página de manutenção) continuam passando normalmente — health check do
// deploy (.github/workflows/deploy.yml) depende disso para não falhar.
export function middleware(req: NextRequest) {
  // Em dev local (npm run dev) o modo manutenção nunca se aplica — é assim
  // que se testa/trabalha no redesign sem precisar desligar a flag toda hora.
  if (!MAINTENANCE_MODE || process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }

  const { pathname } = req.nextUrl
  if (pathname === '/manutencao') return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = '/manutencao'

  // 503 + Retry-After sinaliza ao Google que é uma indisponibilidade
  // temporária — preserva a indexação das páginas atuais em vez de
  // derrubar o ranking como um 200/404 faria.
  const res = NextResponse.rewrite(url, { status: 503 })
  res.headers.set('Retry-After', String(60 * 60 * 24 * 7)) // 7 dias
  return res
}

export const config = {
  // Aplica a tudo, exceto: API routes, assets internos do Next e arquivos
  // estáticos comuns na raiz (favicon, robots, sitemap, manifest, imagens).
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico)$).*)',
  ],
}
