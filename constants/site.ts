export const siteConfig = {
  name: 'EdaCleaner',
  shortName: 'EDA Cleaner',
  /** Canonical English metadata (UI copy lives in i18n locales). */
  tagline: 'Cleaner storage · smarter scans · smoother performance',
  description:
    'EdaCleaner is a premium PC cleaner and optimizer for Windows, macOS, and Linux — free disk space, boost performance, and keep your system running like new.',
  url: 'https://edacleaner.com',
  locale: 'en_US',
  download: {
    windows: '#download',
  },
  /** Custom scheme registered by the EDA Cleaner desktop app. */
  desktopDeepLink: {
    protocol: 'edacleaner',
    checkoutSuccess: 'edacleaner://checkout/success',
    checkoutCancel: 'edacleaner://checkout/cancel',
  },
  social: {
    twitter: '',
    github: '',
  },
} as const

export type SiteConfig = typeof siteConfig
