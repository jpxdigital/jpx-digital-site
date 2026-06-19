'use client'
import { m } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'none'
}

export function FadeIn({ children, delay = 0, className, direction = 'up' }: FadeInProps) {
  const initial =
    direction === 'up' ? { opacity: 0, y: 24 }
    : direction === 'left' ? { opacity: 0, x: -24 }
    : { opacity: 0 }

  return (
    <m.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </m.div>
  )
}
