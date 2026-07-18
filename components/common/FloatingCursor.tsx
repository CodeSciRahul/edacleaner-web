'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsDesktop } from '@/hooks/use-media-query'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useMounted } from '@/hooks/use-mounted'

/** Soft follower cursor — desktop only; never blocks clicks */
export function FloatingCursor() {
  const mounted = useMounted()
  const desktop = useIsDesktop()
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 280, damping: 28, mass: 0.4 })

  useEffect(() => {
    if (!mounted || !desktop || reduced) return

    const onMove = (e: globalThis.MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [mounted, desktop, reduced, x, y])

  if (!mounted || !desktop || reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 mix-blend-multiply blur-[1px] dark:mix-blend-screen lg:block"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    />
  )
}
