/**
 * Design system — mirrors EdaCleaner desktop tokens.
 * CSS variables in styles/globals.css are the runtime source of truth;
 * these TS tokens are for JS usage and documentation.
 */

export const colors = {
  primary: {
    500: '#2563EB',
    hover: '#1D4ED8',
    pressed: '#1E40AF',
    light: '#DBEAFE',
  },
  accent: {
    cyan: '#06B6D4',
  },
  semantic: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  chart: {
    cpu: '#2563EB',
    ram: '#06B6D4',
    disk: '#8B5CF6',
    battery: '#22C55E',
    network: '#F59E0B',
  },
  light: {
    background: '#E8EEF7',
    surface: '#F6F8FC',
    elevated: '#FFFFFF',
    border: '#C5D4E8',
    textPrimary: '#0F172A',
    textSecondary: '#55657A',
  },
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    elevated: '#263449',
    border: '#334155',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
  },
} as const

export const typography = {
  fontFamily: {
    sans: 'var(--font-inter), Inter, system-ui, -apple-system, sans-serif',
  },
  /** Desktop-aligned scale */
  display: { size: '32px', weight: 700, lineHeight: '1.2', letterSpacing: '-0.02em' },
  pageTitle: { size: '24px', weight: 600, lineHeight: '1.3', letterSpacing: '-0.02em' },
  sectionTitle: { size: '18px', weight: 600, lineHeight: '1.4', letterSpacing: '-0.01em' },
  cardTitle: { size: '16px', weight: 500, lineHeight: '1.4' },
  body: { size: '14px', weight: 400, lineHeight: '1.5' },
  caption: { size: '12px', weight: 400, lineHeight: '1.4' },
  button: { size: '13px', weight: 500, lineHeight: '1' },
} as const

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const

/** Marketing layout spacing — driven by CSS vars in globals.css */
export const layout = {
  siteMax: '1200px',
  narrow: '720px',
  prose: '640px',
  headerHeight: '64px',
  cardPadding: '24px',
  gridGap: '20px',
  gutter: 'var(--gutter)',
  sectionY: 'var(--section-y)',
  sectionYSm: 'var(--section-y-sm)',
  sectionYLg: 'var(--section-y-lg)',
} as const

export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const

export const shadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
  md: '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
  card: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
  cardHover: '0 4px 6px -2px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
  dark: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.2)',
    md: '0 2px 4px -1px rgb(0 0 0 / 0.25)',
    card: '0 1px 3px 0 rgb(0 0 0 / 0.3)',
  },
} as const

export const animation = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    theme: '400ms',
  },
  easing: {
    out: 'ease-out',
    premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const

export const designSystem = {
  colors,
  typography,
  spacing,
  layout,
  radius,
  shadow,
  animation,
} as const

export type DesignSystem = typeof designSystem
