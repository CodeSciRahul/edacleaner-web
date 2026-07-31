'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/constants/site'

interface LogoProps {
  className?: string
  showWordmark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { tile: 32, text: 'text-sm', gap: 'gap-2' },
  md: { tile: 36, text: 'text-base', gap: 'gap-2.5' },
  lg: { tile: 44, text: 'text-lg', gap: 'gap-3' },
} as const

export function Logo({ className, showWordmark = true, size = 'md' }: LogoProps) {
  const s = sizeMap[size]

  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        s.gap,
        className,
      )}
      aria-label={siteConfig.name}
    >
      <motion.span
        className="relative inline-flex shrink-0 overflow-hidden rounded-[22%] shadow-sm"
        style={{ width: s.tile, height: s.tile }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      >
        {/* SVG stays crisp on high-DPI; prefer native img over next/image for SVG marks */}
        <img
          src="/brand/app-icon.svg"
          alt=""
          width={s.tile}
          height={s.tile}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </motion.span>
      {showWordmark ? (
        <span className={cn('font-semibold tracking-tight text-foreground', s.text)}>
          {siteConfig.shortName}
        </span>
      ) : null}
    </Link>
  )
}
