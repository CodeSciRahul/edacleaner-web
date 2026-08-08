import { Suspense } from 'react'
import type { Metadata } from 'next'
import { CheckoutReturnPanel } from '@/components/pricing/CheckoutReturnPanel'
import { siteConfig } from '@/constants/site'

export const metadata: Metadata = {
  title: 'Checkout',
  description: `Complete your ${siteConfig.name} subscription and return to the desktop app.`,
  robots: {
    index: false,
    follow: false,
  },
}

function CheckoutFallback(): React.ReactElement {
  return (
    <div className="mx-auto h-64 max-w-xl animate-pulse rounded-2xl border border-border bg-muted/30" />
  )
}

export default function PricingPage(): React.ReactElement {
  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
      <div className="relative mx-auto w-full max-w-3xl">
        <Suspense fallback={<CheckoutFallback />}>
          <CheckoutReturnPanel />
        </Suspense>
      </div>
    </section>
  )
}
