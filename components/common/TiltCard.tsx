'use client'

import {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { getBoundingRect } from '@/lib/dom'
import { cn } from '@/lib/utils'

type TiltCardProps = {
  children: ReactNode
  className?: string
  maxTilt?: number
}

/** 3D tilt on hover — desktop only, respects reduced motion */
export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 200,
    damping: 20,
  })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 200,
    damping: 20,
  })

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (reduced || !ref.current) return
      const rect = getBoundingRect(ref.current)
      mx.set((e.clientX - rect.left) / rect.width - 0.5)
      my.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [mx, my, reduced],
  )

  const onLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        perspective: 900,
      }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}

type GradientBorderProps = {
  children: ReactNode
  className?: string
  active?: boolean
}

/** Animated gradient border that intensifies on hover */
export function GradientBorder({
  children,
  className,
  active = false,
}: GradientBorderProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        'relative rounded-[calc(theme(borderRadius.xl)+1px)] p-px',
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500',
          (hover || active) && 'opacity-100',
        )}
        style={{
          background:
            'conic-gradient(from var(--gb-angle, 0deg), hsl(221 83% 53%), hsl(187 92% 43%), hsl(262 83% 58%), hsl(221 83% 53%))',
          animation: hover || active ? 'gb-spin 4s linear infinite' : undefined,
        }}
      />
      <div className="relative h-full rounded-xl bg-card">{children}</div>
    </div>
  )
}
