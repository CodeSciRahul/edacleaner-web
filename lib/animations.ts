import type { Transition, Variants } from 'framer-motion'

/** Shared motion language — premium, restrained, never abrupt */

export const easings = {
  premium: [0.22, 1, 0.36, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}

export const durations = {
  fast: 0.15,
  normal: 0.35,
  slow: 0.55,
  reveal: 0.7,
  theme: 0.4,
} as const

export const transitions = {
  premium: {
    duration: durations.normal,
    ease: easings.premium,
  } satisfies Transition,
  reveal: {
    duration: durations.reveal,
    ease: easings.premium,
  } satisfies Transition,
  spring: {
    type: 'spring',
    stiffness: 380,
    damping: 28,
  } satisfies Transition,
  softSpring: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
  } satisfies Transition,
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.reveal,
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.reveal,
  },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.reveal,
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.reveal,
  },
}

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 16 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: transitions.reveal,
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
}

export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.01,
    transition: transitions.softSpring,
  },
}

export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: transitions.softSpring,
  },
}

export const floatY: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/** Viewport defaults for scroll-triggered reveals */
export const revealViewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -80px 0px',
} as const
