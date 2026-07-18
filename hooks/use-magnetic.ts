'use client'

import { useCallback, useRef, type MouseEvent } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { getBoundingRect } from '@/lib/dom'

type MagneticOptions = {
  strength?: number
}

export function useMagnetic(options: MagneticOptions = {}) {
  const { strength = 0.28 } = options
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (reduced || !ref.current) return
      const rect = getBoundingRect(ref.current)
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      x.set(relX * strength)
      y.set(relY * strength)
    },
    [reduced, strength, x, y],
  )

  const onLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return {
    ref,
    style: { x: springX as MotionValue<number>, y: springY as MotionValue<number> },
    onMove,
    onLeave,
    reduced,
  }
}
