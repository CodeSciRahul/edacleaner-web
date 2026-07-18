'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type BlobTone = 'primary' | 'cyan' | 'success' | 'violet'

interface GradientBlobProps {
  className?: string
  tone?: BlobTone
  size?: 'sm' | 'md' | 'lg' | 'xl'
  delay?: number
  animated?: boolean
}

const toneClass: Record<BlobTone, string> = {
  primary: 'bg-primary/15',
  cyan: 'bg-accent-cyan/15',
  success: 'bg-success/12',
  violet: 'bg-chart-disk/12',
}

const sizeClass = {
  sm: 'h-40 w-40',
  md: 'h-56 w-56',
  lg: 'h-72 w-72',
  xl: 'h-[28rem] w-[28rem]',
} as const

/** Soft glow orb — matches desktop hero / panel accents */
export function GradientBlob({
  className,
  tone = 'primary',
  size = 'lg',
  delay = 0,
  animated = true,
}: GradientBlobProps) {
  return (
    <motion.div
      aria-hidden
      className={cn(
        'pointer-events-none absolute rounded-full blur-3xl',
        toneClass[tone],
        sizeClass[size],
        className,
      )}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={
        animated
          ? {
              opacity: [0.45, 0.7, 0.45],
              scale: [1, 1.08, 1],
              x: [0, 12, 0],
              y: [0, -10, 0],
            }
          : { opacity: 0.55, scale: 1 }
      }
      transition={
        animated
          ? {
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }
          : { duration: 0.6, delay }
      }
    />
  )
}
