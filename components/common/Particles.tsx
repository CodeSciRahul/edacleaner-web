'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useIsMobile } from '@/hooks/use-media-query'

interface ParticlesProps {
  className?: string
  count?: number
}

export function Particles({ className, count = 28 }: ParticlesProps) {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const total = mobile ? Math.min(12, count) : count
  const particles = useMemo(
    () =>
      Array.from({ length: total }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 2 + (i % 4),
        delay: (i % 10) * 0.35,
        duration: 8 + (i % 7),
        opacity: 0.15 + (i % 5) * 0.08,
      })),
    [total],
  )

  if (reduced) return null

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -24, 0],
            x: [0, 10, 0],
            opacity: [p.opacity, p.opacity * 1.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
