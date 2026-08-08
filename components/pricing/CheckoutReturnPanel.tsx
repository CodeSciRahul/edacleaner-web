'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, MonitorSmartphone, Sparkles, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/constants/site'
import { cn } from '@/lib/utils'

type CheckoutStatus = 'success' | 'cancel' | 'idle'

const DEEP_LINK_PROTOCOL = 'edacleaner'

function buildDeepLink(status: CheckoutStatus, sessionId: string | null): string {
  const path = status === 'cancel' ? 'checkout/cancel' : 'checkout/success'
  const url = new URL(`${DEEP_LINK_PROTOCOL}://${path}`)
  if (sessionId) url.searchParams.set('session_id', sessionId)
  return url.toString()
}

export function CheckoutReturnPanel(): React.ReactElement {
  const searchParams = useSearchParams()
  const checkout = searchParams.get('checkout')
  const sessionId = searchParams.get('session_id')

  const status: CheckoutStatus =
    checkout === 'success' ? 'success' : checkout === 'cancel' ? 'cancel' : 'idle'

  const deepLink = useMemo(
    () => buildDeepLink(status === 'idle' ? 'success' : status, sessionId),
    [status, sessionId]
  )

  const [launchAttempted, setLaunchAttempted] = useState(false)
  const [autoTried, setAutoTried] = useState(false)

  const openDesktopApp = useCallback(() => {
    setLaunchAttempted(true)
    // Custom protocol handoff — OS prompts / opens EDA Cleaner when registered.
    window.location.href = deepLink
  }, [deepLink])

  useEffect(() => {
    if (status !== 'success' || autoTried) return
    const timer = window.setTimeout(() => {
      setAutoTried(true)
      openDesktopApp()
    }, 700)
    return () => window.clearTimeout(timer)
  }, [status, autoTried, openDesktopApp])

  if (status === 'idle') {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card/80 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="size-6" strokeWidth={1.75} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {siteConfig.name} plans
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage upgrades in the desktop app. Start free, then unlock Pro or Premium when you are
          ready.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="glow">
            <Link href="/#pricing">View pricing</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#download">Download app</Link>
          </Button>
        </div>
      </div>
    )
  }

  const isSuccess = status === 'success'

  return (
    <div
      className={cn(
        'mx-auto max-w-xl overflow-hidden rounded-2xl border bg-card/90 shadow-sm',
        isSuccess ? 'border-primary/30' : 'border-border'
      )}
    >
      <div
        className={cn(
          'border-b px-6 py-8 text-center sm:px-8',
          isSuccess
            ? 'bg-gradient-to-br from-primary/15 via-card to-card'
            : 'bg-gradient-to-br from-muted/60 via-card to-card'
        )}
      >
        <div
          className={cn(
            'mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm',
            isSuccess
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {isSuccess ? (
            <CheckCircle2 className="size-7" strokeWidth={1.75} />
          ) : (
            <XCircle className="size-7" strokeWidth={1.75} />
          )}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {isSuccess ? 'Payment successful' : 'Checkout canceled'}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {isSuccess
            ? 'Your subscription is activating. Opening EDA Cleaner so your plan unlocks on this device.'
            : 'No charge was made. You can reopen the desktop app and try again whenever you are ready.'}
        </p>
      </div>

      <div className="space-y-4 px-6 py-6 sm:px-8">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 text-left">
          <MonitorSmartphone className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            {isSuccess
              ? launchAttempted
                ? 'If the app did not open automatically, click the button below. Keep EDA Cleaner installed and signed in on this PC.'
                : 'We are launching the desktop app to refresh your plan entitlements…'
              : 'Return to EDA Cleaner to stay on Free, or pick another plan later.'}
          </p>
        </div>

        <Button
          variant={isSuccess ? 'glow' : 'default'}
          size="lg"
          className="w-full"
          onClick={openDesktopApp}
        >
          {isSuccess ? 'Open EDA Cleaner' : 'Back to EDA Cleaner'}
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <Link href="/#download" className="text-primary underline-offset-4 hover:underline">
            Download the app
          </Link>
          <span className="text-border">·</span>
          <Link href="/#pricing" className="text-muted-foreground underline-offset-4 hover:underline">
            View plans
          </Link>
          <span className="text-border">·</span>
          <Link href="/" className="text-muted-foreground underline-offset-4 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
