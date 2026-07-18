'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { fadeUp, revealViewport } from '@/lib/animations'
import { cn } from '@/lib/utils'
import type { SectionPadding, SectionWrapperProps } from '@/types'

const paddingClass: Record<SectionPadding, string> = {
  none: '',
  sm: 'section-padding-sm',
  md: 'section-padding',
  lg: 'section-padding-lg',
}

/**
 * Reusable landing section shell.
 * Handles responsive spacing, container, and scroll-reveal motion.
 * Each home section should wrap its content with this.
 */
export function SectionWrapper({
  id,
  children,
  className,
  containerClassName,
  padding = 'md',
  fullWidth = false,
  disableAnimation = false,
  variants = fadeUp,
}: SectionWrapperProps) {
  const reducedMotion = useReducedMotion()
  const shouldAnimate = !disableAnimation && !reducedMotion

  const content = fullWidth ? (
    children
  ) : (
    <Container className={containerClassName}>{children}</Container>
  )

  if (!shouldAnimate) {
    return (
      <section id={id} className={cn('relative', paddingClass[padding], className)}>
        {content}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      className={cn('relative', paddingClass[padding], className)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
    >
      {content}
    </motion.section>
  )
}
