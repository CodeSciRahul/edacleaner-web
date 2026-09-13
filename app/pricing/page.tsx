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
    <div className="mx-auto h-80 max-w-xl animate-pulse rounded-3xl border border-border/70 bg-muted/30" />
  )
}

export default function PricingPage(): React.ReactElement {
  return (
    <section className="relative isolate min-h-[calc(100vh-var(--header-height))] overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(59,130,246,0.22),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_70%,rgba(14,165,233,0.1),transparent_40%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div className="relative mx-auto w-full max-w-3xl">
        <Suspense fallback={<CheckoutFallback />}>
          <CheckoutReturnPanel />
        </Suspense>
      </div>
    </section>
  )
}
