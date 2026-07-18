export const siteConfig = {
  name: 'EdaCleaner',
  shortName: 'EDA Cleaner',
  tagline: 'Cleaner storage · smarter scans · smoother performance',
  description:
    'EdaCleaner is a premium PC cleaner and optimizer for Windows, macOS, and Linux — free disk space, boost performance, and keep your system running like new.',
  url: 'https://edacleaner.com',
  locale: 'en_US',
  download: {
    windows: '#download',
    label: 'Download for Windows',
    secondaryLabel: 'Free download',
  },
  social: {
    twitter: '',
    github: '',
  },
  nav: [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
} as const

export type SiteConfig = typeof siteConfig
export type NavItem = (typeof siteConfig.nav)[number]
