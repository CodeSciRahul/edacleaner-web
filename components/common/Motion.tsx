'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface MotionBaseProps {
  children: ReactNode
  className?: string
  variants?: Variants
}

/** Stagger parent — children use MotionItem */
export function MotionStagger({
  children,
  className,
  variants = staggerContainer,
}: MotionBaseProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

/** Stagger child item */
export function MotionItem({
  children,
  className,
  variants = fadeUp,
}: MotionBaseProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  )
}

/** Simple fade-up reveal without needing a stagger parent */
export function MotionReveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
}: MotionBaseProps & { delay?: number }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
