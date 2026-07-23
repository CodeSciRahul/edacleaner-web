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

export const stats = [
  { value: 500, suffix: 'K+', label: 'Downloads', decimals: 0 },
  { value: 98, suffix: '%', label: 'User Satisfaction', decimals: 0 },
  { value: 4.9, suffix: '/5', label: 'Average Rating', decimals: 1 },
  { value: 15, suffix: 'M+', label: 'Files Cleaned', decimals: 0 },
] as const

export const heroFloatCards = [
  { label: 'Junk Removed', value: '12.4 GB', icon: Trash2, tone: 'success' as const },
  { label: 'Startup Optimized', value: '18 apps', icon: Rocket, tone: 'primary' as const },
  { label: 'RAM Freed', value: '2.1 GB', icon: MemoryStick, tone: 'cyan' as const },
  { label: 'Health Score', value: '94', icon: Shield, tone: 'violet' as const },
]

export type FeatureCategory = 'cleanup' | 'storage' | 'performance' | 'insights'

export type FeatureItem = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  category: FeatureCategory
  highlight?: string
}

export const featureCategories: {
  id: FeatureCategory | 'all'
  label: string
}[] = [
  { id: 'all', label: 'All' },
  { id: 'cleanup', label: 'Cleanup' },
  { id: 'storage', label: 'Storage' },
  { id: 'performance', label: 'Performance' },
  { id: 'insights', label: 'Insights' },
]

/** Features that ship in the EdaCleaner desktop app (reachable UI only) */
export const features: FeatureItem[] = [
  {
    id: 'smart-scan',
    title: 'Smart Scan',
    description:
      'One-click health check across cleanup, storage, and performance — with a clear health score and reclaimable space.',
    icon: ScanSearch,
    category: 'insights',
    highlight: 'Health score in seconds',
  },
  {
    id: 'junk',
    title: 'Junk Files',
    description:
      'Remove leftover installers, crash dumps, and app debris without touching your personal files.',
    icon: Trash2,
    category: 'cleanup',
    highlight: 'Safe by default',
  },
  {
    id: 'temp',
    title: 'Temporary Files',
    description: 'Clear OS and application temporary folders that quietly eat disk space over time.',
    icon: Brush,
    category: 'cleanup',
    highlight: 'Instant reclaim',
  },
  {
    id: 'recycle',
    title: 'Recycle Bin',
    description: 'Permanently empty Trash / Recycle Bin when you are ready to reclaim space.',
    icon: Archive,
    category: 'cleanup',
    highlight: 'Empty when ready',
  },
  {
    id: 'browser',
    title: 'Browser Cache',
    description: 'Free space from Chrome, Edge, Firefox, and Safari cached data in a single pass.',
    icon: AppWindow,
    category: 'cleanup',
    highlight: 'Multi-browser',
  },
  {
    id: 'system-cache',
    title: 'System Cache',
    description: 'Clean thumbnail caches, update downloads, and system network caches safely.',
    icon: Layers,
    category: 'cleanup',
    highlight: 'System caches',
  },
  {
    id: 'disk',
    title: 'Storage Overview',
    description: 'See drive capacity, used space, and folder breakdowns with clear storage health.',
    icon: HardDrive,
    category: 'storage',
    highlight: 'Disk analysis',
  },
  {
    id: 'large-files',
    title: 'Large Files',
    description: 'Surface files over 100 MB, sort by size, and reclaim space with precision.',
    icon: FileSearch,
    category: 'storage',
    highlight: '100 MB+',
  },
  {
    id: 'duplicates',
    title: 'Duplicate Files',
    description: 'Find identical copies across your drives and keep only what you need.',
    icon: Copy,
    category: 'storage',
    highlight: 'Keep or delete',
  },
  {
    id: 'boost',
    title: 'Performance Boost',
    description:
      'Boost Now clears reclaimable clutter, flushes DNS, and frees resources in one action.',
    icon: Zap,
    category: 'performance',
    highlight: 'Boost Now',
  },
  {
    id: 'startup',
    title: 'Startup Apps',
    description: 'Enable or disable apps that launch at sign-in and cut unnecessary boot load.',
    icon: Rocket,
    category: 'performance',
    highlight: 'Faster boot',
  },
  {
    id: 'background',
    title: 'Background Apps',
    description: 'See live CPU and memory use, then stop safe processes that slow you down.',
    icon: Cpu,
    category: 'performance',
    highlight: 'Live process list',
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    description: 'Watch live CPU and memory graphs with Normal, Warning, and Critical levels.',
    icon: Activity,
    category: 'insights',
    highlight: 'Live graphs',
  },
  {
    id: 'reports',
    title: 'Reports',
    description:
      'Track lifetime space reclaimed, issues resolved, boosts, and 7-day optimization trends.',
    icon: BarChart3,
    category: 'insights',
    highlight: 'Lifetime insights',
  },
]

export const howItWorks = [
  {
    step: 1,
    title: 'Download',
    description: 'Get EdaCleaner for Windows, macOS, or Linux in seconds.',
    icon: BadgeCheck,
  },
  {
    step: 2,
    title: 'Install',
    description: 'Lightweight setup with a clean, familiar desktop experience.',
    icon: Monitor,
  },
  {
    step: 3,
    title: 'Scan',
    description: 'One-click Smart Scan finds junk, duplicates, and boot bottlenecks.',
    icon: Radar,
  },
  {
    step: 4,
    title: 'Clean',
    description: 'Review safe recommendations, then optimize with confidence.',
    icon: Sparkles,
  },
  {
    step: 5,
    title: 'Enjoy a Faster PC',
    description: 'More free space, snappier boots, and smoother everyday performance.',
    icon: Gauge,
  },
]

export const comparisons = [
  { label: 'Boot Time', before: 82, after: 34, unit: 's', beforeLabel: '82s', afterLabel: '34s' },
  {
    label: 'Memory Usage',
    before: 78,
    after: 52,
    unit: '%',
    beforeLabel: '78%',
    afterLabel: '52%',
  },
  {
    label: 'Disk Space Used',
    before: 91,
    after: 68,
    unit: '%',
    beforeLabel: '91%',
    afterLabel: '68%',
  },
  {
    label: 'Startup Apps',
    before: 86,
    after: 40,
    unit: '',
    beforeLabel: '24 apps',
    afterLabel: '9 apps',
  },
  {
    label: 'Junk Files',
    before: 88,
    after: 12,
    unit: '',
    beforeLabel: '14.2 GB',
    afterLabel: '0.4 GB',
  },
]

export type PlanId = 'free' | 'pro' | 'business'

export type PricingPlan = {
  id: PlanId
  name: string
  price: string
  period: string
  description: string
  cta: string
  href: string
  highlighted?: boolean
  badge?: string
  features: string[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Essential cleanup to keep everyday PCs healthy.',
    cta: 'Download Free',
    href: '#download',
    features: [
      'Smart Scan',
      'Junk Files',
      'Temporary Files',
      'Recycle Bin',
      'Browser Cache',
      'System Cache',
      'Monitoring',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: 'per year',
    description: 'Full optimizer toolkit for power users who want maximum speed.',
    cta: 'Buy Pro',
    href: '#download',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Storage Overview',
      'Large Files',
      'Duplicate Files',
      'Performance Boost',
      'Startup Apps',
      'Background Apps',
      'Reports',
      'Priority Support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: '$79',
    period: 'per year',
    description: 'Multi-PC licensing with priority support for teams.',
    cta: 'Contact Sales',
    href: 'mailto:sales@edacleaner.com',
    features: [
      'Everything in Pro',
      'Up to 5 device licenses',
      'Commercial License',
      'Centralized Reports export',
      'Priority email support',
      'Team onboarding help',
    ],
  },
]

/** Full feature matrix for the pricing comparison table — product features only */
export const pricingComparison = [
  { feature: 'Smart Scan', free: true, pro: true, business: true },
  { feature: 'Junk Files', free: true, pro: true, business: true },
  { feature: 'Temporary Files', free: true, pro: true, business: true },
  { feature: 'Recycle Bin', free: true, pro: true, business: true },
  { feature: 'Browser Cache', free: true, pro: true, business: true },
  { feature: 'System Cache', free: true, pro: true, business: true },
  { feature: 'Monitoring', free: true, pro: true, business: true },
  { feature: 'Storage Overview', free: false, pro: true, business: true },
  { feature: 'Large Files', free: false, pro: true, business: true },
  { feature: 'Duplicate Files', free: false, pro: true, business: true },
  { feature: 'Performance Boost', free: false, pro: true, business: true },
  { feature: 'Startup Apps', free: false, pro: true, business: true },
  { feature: 'Background Apps', free: false, pro: true, business: true },
  { feature: 'Reports', free: false, pro: true, business: true },
  { feature: 'Priority Support', free: false, pro: true, business: true },
  { feature: 'Multi-device License', free: false, pro: false, business: true },
  { feature: 'Commercial License', free: false, pro: false, business: true },
] as const

export const testimonials = [
  {
    quote:
      'Smart Scan found almost 14 GB of junk I had no idea was sitting there. Boot time dropped after I cleaned startup apps — feels like a new machine.',
    name: 'Daniel Okonkwo',
    role: 'Software Engineer',
    company: 'Northline Labs',
    rating: 5,
    initials: 'DO',
    tone: 'primary' as const,
  },
  {
    quote:
      'I design in Figma all day and my SSD was constantly full. Large File Analyzer made it obvious what to archive. Clean UI, no scary options.',
    name: 'Sofia Reyes',
    role: 'Product Designer',
    company: 'Studio Marlowe',
    rating: 5,
    initials: 'SR',
    tone: 'cyan' as const,
  },
  {
    quote:
      'Between Steam downloads and shader caches my C: drive was a mess. EdaCleaner cleared the junk without touching my game libraries. Instant win.',
    name: 'Marcus Webb',
    role: 'Gamer',
    company: 'Competitive PC setup',
    rating: 5,
    initials: 'MW',
    tone: 'violet' as const,
  },
  {
    quote:
      '4K timelines chew through temp files fast. I run a scan between projects now and reclaim space in minutes. Pro paid for itself in one week.',
    name: 'Aisha Rahman',
    role: 'Video Editor',
    company: 'Frame & Grain',
    rating: 5,
    initials: 'AR',
    tone: 'success' as const,
  },
  {
    quote:
      'We keep a small fleet of office laptops humming. Duplicate Finder and reports mean less IT tickets about “my disk is full.” Simple enough for anyone to run.',
    name: 'Helen Park',
    role: 'Business Owner',
    company: 'Park & Co. Accounting',
    rating: 5,
    initials: 'HP',
    tone: 'primary' as const,
  },
  {
    quote:
      'Rolled Pro out to our helpdesk team. Safe defaults, clear risk badges, and centralized reporting for Business are exactly what we needed.',
    name: 'Chris Delgado',
    role: 'IT Administrator',
    company: 'BrightHarbor Health',
    rating: 5,
    initials: 'CD',
    tone: 'cyan' as const,
  },
]

export const trustBadges = [
  {
    title: 'Trusted by Thousands',
    description: 'Downloads from users who want a faster PC without the risk.',
    icon: 'users' as const,
  },
  {
    title: 'Secure Download',
    description: 'Signed installers with verified checksums for every release.',
    icon: 'shield' as const,
  },
  {
    title: 'Privacy First',
    description: 'Your personal files stay untouched. Cleanup targets junk only.',
    icon: 'lock' as const,
  },
  {
    title: 'No Malware',
    description: 'No bundled adware, toolbars, or sneaky background miners.',
    icon: 'badge' as const,
  },
  {
    title: 'Regular Updates',
    description: 'Continuous improvements for Windows, macOS, and Linux.',
    icon: 'refresh' as const,
  },
  {
    title: 'Windows Compatible',
    description: 'Built and tested for Windows 10 and Windows 11.',
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
  {
    question: 'Is it free?',
    answer:
      'Yes. EdaCleaner Free includes Smart Scan, Junk Files, Temporary Files, Recycle Bin, Browser Cache, System Cache, and Monitoring at no cost. Upgrade to Pro for Storage tools, Performance Boost, Startup Apps, Background Apps, and Reports.',
  },
  {
    question: 'Does it support Windows 11?',
    answer:
      'Absolutely. EdaCleaner is built for Windows 10 and Windows 11, with native builds for macOS and Linux as well.',
  },
  {
    question: 'Will my files be deleted?',
    answer:
      'No. Cleanup targets junk, temps, caches, and optional categories you choose. Personal documents, photos, and projects are left alone, and you confirm before anything is removed.',
  },
  {
    question: 'Can I cancel Pro?',
    answer:
      'Yes. You can cancel Pro anytime before renewal. You keep Pro features until the end of your billing period, and Free features remain available after that.',
  },
  {
    question: 'How often should I clean my PC?',
    answer:
      'Most people run Smart Scan weekly or after big installs and downloads. Cleanup and Performance Boost are available whenever your PC starts to feel slow or storage runs low.',
  },
  {
    question: 'Is EdaCleaner safe for work computers?',
    answer:
      'Yes. Business plans include a commercial license and multi-device options designed for teams and IT administrators. Cleanup uses Safe and Review risk badges before you remove anything.',
  },
]

export const dashboardScreens = [
  {
    id: 'overview',
    title: 'Performance Dashboard',
    description: 'Live health score, reclaimable space, and quick actions.',
    hotspot: { x: 22, y: 28, label: 'Health score at a glance' },
  },
  {
    id: 'smart-scan',
    title: 'One-Click Smart Scan',
    description: 'Full-system health check across cleanup, storage, and performance.',
    hotspot: { x: 68, y: 42, label: 'Scan all areas in one click' },
  },
  {
    id: 'startup',
    title: 'Startup Manager',
    description: 'Disable heavy apps that drag down boot time.',
    hotspot: { x: 55, y: 58, label: 'Impact-sorted startup apps' },
  },
  {
    id: 'duplicates',
    title: 'Duplicate Finder',
    description: 'Identical copies, keep-or-delete with confidence.',
    hotspot: { x: 40, y: 48, label: 'Review duplicate groups' },
  },
  {
    id: 'storage',
    title: 'Disk Analyzer',
    description: 'See what is using capacity with clear storage health.',
    hotspot: { x: 72, y: 36, label: 'Folder-level disk breakdown' },
  },
  {
    id: 'cleanup',
    title: 'Cleanup',
    description: 'Safe categories for junk, temps, caches, and recycle bin.',
    hotspot: { x: 30, y: 52, label: 'Safe cleanup categories' },
  },
  {
    id: 'monitoring',
    title: 'System Health',
    description: 'Real-time CPU and memory with clear status levels.',
    hotspot: { x: 60, y: 30, label: 'Live CPU & memory graphs' },
  },
] as const

export const downloads = [
  {
    id: 'windows',
    name: 'Windows',
    requirement: 'Windows 10 / 11 · x64',
    href: '#',
    file: 'EdaCleaner-Setup.exe',
  },
  {
    id: 'macos',
    name: 'macOS',
    requirement: 'macOS 12+ · Apple Silicon & Intel',
    href: '#',
    file: 'EdaCleaner.dmg',
  },
  {
    id: 'linux',
    name: 'Linux',
    requirement: 'Ubuntu 22.04+ · x64',
    href: '#',
    file: 'EdaCleaner-linux-x64.zip',
  },
] as const
