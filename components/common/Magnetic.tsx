'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useMagnetic } from '@/hooks/use-magnetic'
import { cn } from '@/lib/utils'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

/** Pulls child toward cursor on desktop — wrap primary CTAs */
export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const { ref, style, onMove, onLeave, reduced } = useMagnetic({ strength })

  if (reduced) {
    return <div className={cn('inline-flex', className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('inline-flex will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
