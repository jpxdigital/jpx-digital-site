import { NextRequest } from 'next/server'

// Rate limiter simples em memória, por instância do processo.
// Suficiente para o volume atual (single VM, sem Redis) — ver nota em
// deploy/vm1/docker-compose.yml. Cada chamador de createRateLimiter tem seu
// próprio balde de contadores, isolado dos demais.
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const buckets = new Map<string, { count: number; resetAt: number }>()

  return function check(key: string): boolean {
    const now = Date.now()
    const entry = buckets.get(key)
    if (!entry || entry.resetAt < now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs })
      return true
    }
    if (entry.count >= limit) return false
    entry.count++
    return true
  }
}

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '0.0.0.0'
  )
}
