import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

export type SectionId =
  | 'hero'
  | 'stats'
  | 'showcase'
  | 'features'
  | 'how-it-works'
  | 'mid-cta'
  | 'comparison'
  | 'pricing'
  | 'testimonials'
  | 'trust'
  | 'faq'
  | 'cta'
  | 'download'

export type SectionPadding = 'none' | 'sm' | 'md' | 'lg'

export interface SectionWrapperProps {
  id?: SectionId | (string & {})
  children: ReactNode
  className?: string
  containerClassName?: string
  padding?: SectionPadding
  /** Disable container max-width wrapper */
  fullWidth?: boolean
  /** Disable scroll reveal animation */
  disableAnimation?: boolean
  /** Framer Motion variants override for the section root */
  variants?: HTMLMotionProps<'section'>['variants']
}

export interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'nav'
  narrow?: boolean
}
