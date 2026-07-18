'use client'

import { useLenis } from '@/components/layout/SmoothScroll'
import { cn } from '@/lib/utils'

/** Thin top progress bar synced with Lenis / native scroll */
export function ScrollProgress({ className }: { className?: string }) {
  const { progress } = useLenis()

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent',
        className,
      )}
      aria-hidden
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-accent-cyan to-primary transition-none"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
