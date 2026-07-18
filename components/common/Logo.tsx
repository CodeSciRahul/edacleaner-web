'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/constants/site'

interface LogoProps {
  className?: string
  showWordmark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { tile: 'h-8 w-8', icon: 16, text: 'text-sm' },
  md: { tile: 'h-9 w-9', icon: 18, text: 'text-base' },
  lg: { tile: 'h-11 w-11', icon: 22, text: 'text-lg' },
} as const

export function Logo({ className, showWordmark = true, size = 'md' }: LogoProps) {
  const s = sizeMap[size]

  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg',
        className,
      )}
      aria-label={siteConfig.name}
    >
      <motion.span
        className={cn(
          'inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm',
          s.tile,
        )}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      >
        <ShieldCheck size={s.icon} strokeWidth={1.75} aria-hidden />
      </motion.span>
      {showWordmark ? (
        <span className={cn('font-semibold tracking-tight text-foreground', s.text)}>
          {siteConfig.shortName}
        </span>
      ) : null}
    </Link>
  )
}
