import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  AppWindow,
  Archive,
  BadgeCheck,
  BarChart3,
  Brush,
  Copy,
  Cpu,
  FileSearch,
  Gauge,
  HardDrive,
  Layers,
  MemoryStick,
  Monitor,
  Radar,
  Rocket,
  ScanSearch,
  Shield,
  Sparkles,
  Trash2,
  Zap,
} from 'lucide-react'
import type { TranslationKey } from '@/i18n/locales/en'

export const stats = [
  { value: 500, suffix: 'K+', labelKey: 'stats.downloads' as const, decimals: 0 },
  { value: 98, suffix: '%', labelKey: 'stats.satisfaction' as const, decimals: 0 },
  { value: 4.9, suffix: '/5', labelKey: 'stats.rating' as const, decimals: 1 },
  { value: 15, suffix: 'M+', labelKey: 'stats.filesCleaned' as const, decimals: 0 },
] as const

export const heroFloatCards = [
  { labelKey: 'hero.card.junk' as const, value: '12.4 GB', icon: Trash2, tone: 'success' as const },
  {
    labelKey: 'hero.card.startup' as const,
    value: '18 apps',
    icon: Rocket,
    tone: 'primary' as const,
  },
  { labelKey: 'hero.card.ram' as const, value: '2.1 GB', icon: MemoryStick, tone: 'cyan' as const },
  { labelKey: 'hero.card.health' as const, value: '94', icon: Shield, tone: 'violet' as const },
]

export type FeatureCategory = 'cleanup' | 'storage' | 'performance' | 'insights'

export type FeatureItem = {
  id: string
  titleKey: TranslationKey
  descriptionKey: TranslationKey
  highlightKey: TranslationKey
  icon: LucideIcon
  category: FeatureCategory
}

export const featureCategories: {
  id: FeatureCategory | 'all'
  labelKey: TranslationKey
}[] = [
  { id: 'all', labelKey: 'features.cat.all' },
  { id: 'cleanup', labelKey: 'features.cat.cleanup' },
  { id: 'storage', labelKey: 'features.cat.storage' },
  { id: 'performance', labelKey: 'features.cat.performance' },
  { id: 'insights', labelKey: 'features.cat.insights' },
]

/** Features that ship in the EdaCleaner desktop app (reachable UI only) */
export const features: FeatureItem[] = [
  {
    id: 'smart-scan',
    titleKey: 'feature.smart-scan.title',
    descriptionKey: 'feature.smart-scan.description',
    highlightKey: 'feature.smart-scan.highlight',
    icon: ScanSearch,
    category: 'insights',
  },
  {
    id: 'junk',
    titleKey: 'feature.junk.title',
    descriptionKey: 'feature.junk.description',
    highlightKey: 'feature.junk.highlight',
    icon: Trash2,
    category: 'cleanup',
  },
  {
    id: 'temp',
    titleKey: 'feature.temp.title',
    descriptionKey: 'feature.temp.description',
    highlightKey: 'feature.temp.highlight',
    icon: Brush,
    category: 'cleanup',
  },
  {
    id: 'recycle',
    titleKey: 'feature.recycle.title',
    descriptionKey: 'feature.recycle.description',
    highlightKey: 'feature.recycle.highlight',
    icon: Archive,
    category: 'cleanup',
  },
  {
    id: 'browser',
    titleKey: 'feature.browser.title',
    descriptionKey: 'feature.browser.description',
    highlightKey: 'feature.browser.highlight',
    icon: AppWindow,
    category: 'cleanup',
  },
  {
    id: 'system-cache',
    titleKey: 'feature.system-cache.title',
    descriptionKey: 'feature.system-cache.description',
    highlightKey: 'feature.system-cache.highlight',
    icon: Layers,
    category: 'cleanup',
  },
  {
    id: 'disk',
    titleKey: 'feature.disk.title',
    descriptionKey: 'feature.disk.description',
    highlightKey: 'feature.disk.highlight',
    icon: HardDrive,
    category: 'storage',
  },
  {
    id: 'large-files',
    titleKey: 'feature.large-files.title',
    descriptionKey: 'feature.large-files.description',
    highlightKey: 'feature.large-files.highlight',
    icon: FileSearch,
    category: 'storage',
  },
  {
    id: 'duplicates',
    titleKey: 'feature.duplicates.title',
    descriptionKey: 'feature.duplicates.description',
    highlightKey: 'feature.duplicates.highlight',
    icon: Copy,
    category: 'storage',
  },
  {
    id: 'boost',
    titleKey: 'feature.boost.title',
    descriptionKey: 'feature.boost.description',
    highlightKey: 'feature.boost.highlight',
    icon: Zap,
    category: 'performance',
  },
  {
    id: 'startup',
    titleKey: 'feature.startup.title',
    descriptionKey: 'feature.startup.description',
    highlightKey: 'feature.startup.highlight',
    icon: Rocket,
    category: 'performance',
  },
  {
    id: 'background',
    titleKey: 'feature.background.title',
    descriptionKey: 'feature.background.description',
    highlightKey: 'feature.background.highlight',
    icon: Cpu,
    category: 'performance',
  },
  {
    id: 'monitoring',
    titleKey: 'feature.monitoring.title',
    descriptionKey: 'feature.monitoring.description',
    highlightKey: 'feature.monitoring.highlight',
    icon: Activity,
    category: 'insights',
  },
  {
    id: 'reports',
    titleKey: 'feature.reports.title',
    descriptionKey: 'feature.reports.description',
    highlightKey: 'feature.reports.highlight',
    icon: BarChart3,
    category: 'insights',
  },
]

export const howItWorks = [
  {
    step: 1,
    titleKey: 'how.1.title' as const,
    descriptionKey: 'how.1.description' as const,
    icon: BadgeCheck,
  },
  {
    step: 2,
    titleKey: 'how.2.title' as const,
    descriptionKey: 'how.2.description' as const,
    icon: Monitor,
  },
  {
    step: 3,
    titleKey: 'how.3.title' as const,
    descriptionKey: 'how.3.description' as const,
    icon: Radar,
  },
  {
    step: 4,
    titleKey: 'how.4.title' as const,
    descriptionKey: 'how.4.description' as const,
    icon: Sparkles,
  },
  {
    step: 5,
    titleKey: 'how.5.title' as const,
    descriptionKey: 'how.5.description' as const,
    icon: Gauge,
  },
]

export const comparisons = [
  {
    labelKey: 'comparison.boot' as const,
    before: 82,
    after: 34,
    unit: 's',
    beforeLabel: '82s',
    afterLabel: '34s',
  },
  {
    labelKey: 'comparison.memory' as const,
    before: 78,
    after: 52,
    unit: '%',
    beforeLabel: '78%',
    afterLabel: '52%',
  },
  {
    labelKey: 'comparison.disk' as const,
    before: 91,
    after: 68,
    unit: '%',
    beforeLabel: '91%',
    afterLabel: '68%',
  },
  {
    labelKey: 'comparison.startup' as const,
    before: 86,
    after: 40,
    unit: '',
    beforeLabel: '24 apps',
    afterLabel: '9 apps',
  },
  {
    labelKey: 'comparison.junk' as const,
    before: 88,
    after: 12,
    unit: '',
    beforeLabel: '14.2 GB',
    afterLabel: '0.4 GB',
  },
]

export type PlanId = 'free' | 'pro' | 'premium'

export type PricingPlan = {
  id: PlanId
  nameKey: TranslationKey
  descriptionKey: TranslationKey
  ctaKey: TranslationKey
  href: string
  highlighted?: boolean
  badgeKey?: TranslationKey
  yearlyPrice: number
  yearlyOriginal?: number
  monthlyPrice: number
  forever?: boolean
  featureKeys: TranslationKey[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    nameKey: 'pricing.free.name',
    yearlyPrice: 0,
    monthlyPrice: 0,
    forever: true,
    descriptionKey: 'pricing.free.description',
    ctaKey: 'pricing.free.cta',
    href: '#download',
    featureKeys: [
      'pricing.free.f1',
      'pricing.free.f2',
      'pricing.free.f3',
      'pricing.free.f4',
      'pricing.free.f5',
    ],
  },
  {
    id: 'pro',
    nameKey: 'pricing.pro.name',
    yearlyPrice: 29,
    monthlyPrice: 3,
    descriptionKey: 'pricing.pro.description',
    ctaKey: 'pricing.pro.cta',
    href: '#download',
    highlighted: true,
    badgeKey: 'pricing.pro.badge',
    featureKeys: [
      'pricing.pro.f1',
      'pricing.pro.f2',
      'pricing.pro.f3',
      'pricing.pro.f4',
      'pricing.pro.f5',
    ],
  },
  {
    id: 'premium',
    nameKey: 'pricing.premium.name',
    yearlyPrice: 59,
    monthlyPrice: 6,
    descriptionKey: 'pricing.premium.description',
    ctaKey: 'pricing.premium.cta',
    href: '#download',
    featureKeys: [
      'pricing.premium.f1',
      'pricing.premium.f2',
      'pricing.premium.f3',
      'pricing.premium.f4',
      'pricing.premium.f5',
      'pricing.premium.f6',
    ],
  },
]

/** Full feature matrix for the pricing comparison table — product features only */
export const pricingComparison = [
  { featureKey: 'pricing.matrix.smartScan' as const, free: true, pro: true, premium: true },
  { featureKey: 'pricing.matrix.cleanup' as const, free: true, pro: true, premium: true },
  { featureKey: 'pricing.matrix.junk' as const, free: true, pro: true, premium: true },
  { featureKey: 'pricing.matrix.browser' as const, free: true, pro: true, premium: true },
  { featureKey: 'pricing.matrix.system' as const, free: true, pro: true, premium: true },
  { featureKey: 'pricing.matrix.storage' as const, free: false, pro: true, premium: true },
  { featureKey: 'pricing.matrix.large' as const, free: false, pro: true, premium: true },
  { featureKey: 'pricing.matrix.duplicates' as const, free: false, pro: true, premium: true },
  { featureKey: 'pricing.matrix.temp' as const, free: false, pro: true, premium: true },
  { featureKey: 'pricing.matrix.boost' as const, free: false, pro: false, premium: true },
  { featureKey: 'pricing.matrix.startup' as const, free: false, pro: false, premium: true },
  { featureKey: 'pricing.matrix.background' as const, free: false, pro: false, premium: true },
  { featureKey: 'pricing.matrix.reports' as const, free: false, pro: false, premium: true },
  { featureKey: 'pricing.matrix.monitor' as const, free: false, pro: false, premium: true },
] as const

export const testimonials = [
  {
    id: 1,
    quoteKey: 'testimonial.1.quote' as const,
    roleKey: 'testimonial.1.role' as const,
    companyKey: 'testimonial.1.company' as const,
    name: 'Daniel Okonkwo',
    rating: 5,
    initials: 'DO',
    tone: 'primary' as const,
  },
  {
    id: 2,
    quoteKey: 'testimonial.2.quote' as const,
    roleKey: 'testimonial.2.role' as const,
    companyKey: 'testimonial.2.company' as const,
    name: 'Sofia Reyes',
    rating: 5,
    initials: 'SR',
    tone: 'cyan' as const,
  },
  {
    id: 3,
    quoteKey: 'testimonial.3.quote' as const,
    roleKey: 'testimonial.3.role' as const,
    companyKey: 'testimonial.3.company' as const,
    name: 'Marcus Webb',
    rating: 5,
    initials: 'MW',
    tone: 'violet' as const,
  },
  {
    id: 4,
    quoteKey: 'testimonial.4.quote' as const,
    roleKey: 'testimonial.4.role' as const,
    companyKey: 'testimonial.4.company' as const,
    name: 'Aisha Rahman',
    rating: 5,
    initials: 'AR',
    tone: 'success' as const,
  },
  {
    id: 5,
    quoteKey: 'testimonial.5.quote' as const,
    roleKey: 'testimonial.5.role' as const,
    companyKey: 'testimonial.5.company' as const,
    name: 'Helen Park',
    rating: 5,
    initials: 'HP',
    tone: 'primary' as const,
  },
  {
    id: 6,
    quoteKey: 'testimonial.6.quote' as const,
    roleKey: 'testimonial.6.role' as const,
    companyKey: 'testimonial.6.company' as const,
    name: 'Chris Delgado',
    rating: 5,
    initials: 'CD',
    tone: 'cyan' as const,
  },
]

export const trustBadges = [
  {
    titleKey: 'trust.1.title' as const,
    descriptionKey: 'trust.1.description' as const,
    icon: 'users' as const,
  },
  {
    titleKey: 'trust.2.title' as const,
    descriptionKey: 'trust.2.description' as const,
    icon: 'shield' as const,
  },
  {
    titleKey: 'trust.3.title' as const,
    descriptionKey: 'trust.3.description' as const,
    icon: 'lock' as const,
  },
  {
    titleKey: 'trust.4.title' as const,
    descriptionKey: 'trust.4.description' as const,
    icon: 'badge' as const,
  },
  {
    titleKey: 'trust.5.title' as const,
    descriptionKey: 'trust.5.description' as const,
    icon: 'refresh' as const,
  },
  {
    titleKey: 'trust.6.title' as const,
    descriptionKey: 'trust.6.description' as const,
    icon: 'monitor' as const,
  },
]

export const trustLogos = [
  'Northline',
  'Marlowe',
  'FrameGrain',
  'BrightHarbor',
  'Park & Co',
  'Vertex Soft',
]

export const faqs = [
  { qKey: 'faq.1.q' as const, aKey: 'faq.1.a' as const },
  { qKey: 'faq.2.q' as const, aKey: 'faq.2.a' as const },
  { qKey: 'faq.3.q' as const, aKey: 'faq.3.a' as const },
  { qKey: 'faq.4.q' as const, aKey: 'faq.4.a' as const },
  { qKey: 'faq.5.q' as const, aKey: 'faq.5.a' as const },
  { qKey: 'faq.6.q' as const, aKey: 'faq.6.a' as const },
]

export const dashboardScreens = [
  {
    id: 'overview' as const,
    titleKey: 'showcase.overview.title' as const,
    descriptionKey: 'showcase.overview.description' as const,
    hotspot: { x: 22, y: 28, labelKey: 'showcase.overview.hotspot' as const },
  },
  {
    id: 'smart-scan' as const,
    titleKey: 'showcase.smartScan.title' as const,
    descriptionKey: 'showcase.smartScan.description' as const,
    hotspot: { x: 68, y: 42, labelKey: 'showcase.smartScan.hotspot' as const },
  },
  {
    id: 'startup' as const,
    titleKey: 'showcase.startup.title' as const,
    descriptionKey: 'showcase.startup.description' as const,
    hotspot: { x: 55, y: 58, labelKey: 'showcase.startup.hotspot' as const },
  },
  {
    id: 'duplicates' as const,
    titleKey: 'showcase.duplicates.title' as const,
    descriptionKey: 'showcase.duplicates.description' as const,
    hotspot: { x: 40, y: 48, labelKey: 'showcase.duplicates.hotspot' as const },
  },
  {
    id: 'storage' as const,
    titleKey: 'showcase.storage.title' as const,
    descriptionKey: 'showcase.storage.description' as const,
    hotspot: { x: 72, y: 36, labelKey: 'showcase.storage.hotspot' as const },
  },
  {
    id: 'cleanup' as const,
    titleKey: 'showcase.cleanup.title' as const,
    descriptionKey: 'showcase.cleanup.description' as const,
    hotspot: { x: 30, y: 52, labelKey: 'showcase.cleanup.hotspot' as const },
  },
  {
    id: 'monitoring' as const,
    titleKey: 'showcase.monitoring.title' as const,
    descriptionKey: 'showcase.monitoring.description' as const,
    hotspot: { x: 60, y: 30, labelKey: 'showcase.monitoring.hotspot' as const },
  },
]

export const downloads = [
  {
    id: 'windows' as const,
    nameKey: 'download.windows.name' as const,
    requirementKey: 'download.windows.requirement' as const,
    href: '#',
    file: 'EdaCleaner-Setup.exe',
  },
  {
    id: 'macos' as const,
    nameKey: 'download.macos.name' as const,
    requirementKey: 'download.macos.requirement' as const,
    href: '#',
    file: 'EdaCleaner.dmg',
  },
  {
    id: 'linux' as const,
    nameKey: 'download.linux.name' as const,
    requirementKey: 'download.linux.requirement' as const,
    href: '#',
    file: 'EdaCleaner.deb',
  },
] as const

/** Linux installer formats shown on the download section (order = UI priority). */
export const linuxDownloadFormats = [
  {
    installerType: 'deb',
    label: '.deb',
    hintKey: 'download.linux.debHint' as const,
    file: 'EdaCleaner-linux-x64.deb',
  },
  {
    installerType: 'rpm',
    label: '.rpm',
    hintKey: 'download.linux.rpmHint' as const,
    file: 'EdaCleaner-linux-x64.rpm',
  },
  {
    installerType: 'appimage',
    label: 'AppImage',
    hintKey: 'download.linux.appimageHint' as const,
    file: 'EdaCleaner-linux-x64.AppImage',
  },
] as const

export const navItems = [
  { labelKey: 'nav.features' as const, href: '#features' },
  { labelKey: 'nav.howItWorks' as const, href: '#how-it-works' },
  { labelKey: 'nav.pricing' as const, href: '#pricing' },
  { labelKey: 'nav.faq' as const, href: '#faq' },
] as const

export const footerLinks = [
  { labelKey: 'nav.features' as const, href: '#features' },
  { labelKey: 'nav.howItWorks' as const, href: '#how-it-works' },
  { labelKey: 'nav.pricing' as const, href: '#pricing' },
  { labelKey: 'nav.testimonials' as const, href: '#testimonials' },
  { labelKey: 'nav.trust' as const, href: '#trust' },
  { labelKey: 'nav.faq' as const, href: '#faq' },
  { labelKey: 'nav.download' as const, href: '#download' },
] as const
