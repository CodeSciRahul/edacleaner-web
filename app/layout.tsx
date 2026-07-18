import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/layout/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/common/ScrollProgress'
import { BackgroundGrid } from '@/components/common/BackgroundGrid'
import { SkipToContent } from '@/components/common/BackgroundGrid'
import { FloatingCursor } from '@/components/common/FloatingCursor'
import { JsonLd } from '@/components/common/JsonLd'
import { inter } from '@/lib/fonts'
import { siteConfig } from '@/constants/site'
import '@/styles/globals.css'
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Make Your PC Dramatically Faster`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'PC cleaner',
    'disk cleaner',
    'Windows optimizer',
    'macOS cleaner',
    'Linux cleaner',
    'EdaCleaner',
    'EDA Cleaner',
    'system cleanup',
    'performance boost',
    'duplicate file finder',
    'startup manager',
    'junk cleaner',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} — Make Your PC Dramatically Faster`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Make Your PC Dramatically Faster`,
    description: siteConfig.description,
    creator: siteConfig.social.twitter || undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E8EEF7' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <JsonLd />
        <Providers>
          <SkipToContent />
          <ScrollProgress />
          <BackgroundGrid />
          <FloatingCursor />
          <Header />
          <main id="main" className="relative flex-1 pt-[var(--header-height)]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
