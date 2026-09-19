'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  Home,
  LayoutGrid,
  Mail,
  Sparkles,
  XCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/constants/site'
import { useTranslation } from '@/i18n/useTranslation'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

type CheckoutStatus = 'success' | 'cancel' | 'idle' | 'billing-return'

const DEEP_LINK_PROTOCOL = 'edacleaner'

function buildDeepLink(status: CheckoutStatus, sessionId: string | null): string {
  if (status === 'billing-return') {
    return siteConfig.desktopDeepLink.billingReturn
  }
  const path = status === 'cancel' ? 'checkout/cancel' : 'checkout/success'
  const url = new URL(`${DEEP_LINK_PROTOCOL}://${path}`)
  if (sessionId) url.searchParams.set('session_id', sessionId)
  return url.toString()
}

export function CheckoutReturnPanel(): React.ReactElement {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  const searchParams = useSearchParams()
  const checkout = searchParams.get('checkout')
  const billing = searchParams.get('billing')
  const sessionId = searchParams.get('session_id')

  const status: CheckoutStatus =
    billing === 'return'
      ? 'billing-return'
      : checkout === 'success'
        ? 'success'
        : checkout === 'cancel'
          ? 'cancel'
          : 'idle'

  const deepLink = useMemo(
    () =>
      buildDeepLink(
        status === 'idle' ? 'success' : status,
        sessionId,
      ),
    [status, sessionId],
  )

  const [launchAttempted, setLaunchAttempted] = useState(false)
  const [autoTried, setAutoTried] = useState(false)

  const openDesktopApp = useCallback(() => {
    setLaunchAttempted(true)
    window.location.href = deepLink
  }, [deepLink])

  useEffect(() => {
    if ((status !== 'success' && status !== 'billing-return') || autoTried) return
    const timer = window.setTimeout(() => {
      setAutoTried(true)
      openDesktopApp()
    }, 900)
    return () => window.clearTimeout(timer)
  }, [status, autoTried, openDesktopApp])

  if (status === 'billing-return') {
    return (
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-elevated to-card p-8 text-center shadow-card sm:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/15 via-transparent to-transparent"
        />
        <div className="relative mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-sm">
          <CheckCircle2 className="size-7" strokeWidth={1.75} />
        </div>
        <p className="relative text-xs font-semibold uppercase tracking-wide text-primary">
          {t('checkout.billingEyebrow')}
        </p>
        <h1 className="relative mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t('checkout.billingTitle')}
        </h1>
        <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {t('checkout.billingBody')}
        </p>
        <div className="relative mt-8 flex flex-col items-center gap-3">
          <Button size="lg" className="min-w-[200px] gap-2" onClick={openDesktopApp}>
            <ExternalLink className="size-4" aria-hidden />
            {t('checkout.openApp')}
          </Button>
          <p className="max-w-sm text-xs text-muted-foreground">
            {launchAttempted ? t('checkout.launchFallbackShort') : t('checkout.launchingShort')}
          </p>
        </div>
      </motion.div>
    )
  }

  if (status === 'idle') {
    return (
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-elevated to-card p-8 text-center shadow-card sm:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/15 via-transparent to-transparent"
        />
        <div className="relative mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-sm">
          <Sparkles className="size-7" strokeWidth={1.75} />
        </div>
        <h1 className="relative text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t('checkout.idleTitle', { name: siteConfig.name })}
        </h1>
        <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {t('checkout.idleBody')}
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="glow" size="lg">
            <Link href="/#pricing">{t('checkout.viewPricing')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#download">{t('checkout.downloadApp')}</Link>
          </Button>
        </div>
      </motion.div>
    )
  }

  const isSuccess = status === 'success'

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative mx-auto max-w-xl overflow-hidden rounded-3xl border shadow-card',
        isSuccess
          ? 'border-primary/35 bg-gradient-to-b from-elevated via-card to-card'
          : 'border-border/80 bg-gradient-to-b from-muted/40 via-card to-card',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -left-16 -top-20 size-56 rounded-full blur-3xl',
          isSuccess ? 'bg-primary/25' : 'bg-muted-foreground/10',
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -bottom-24 -right-10 size-48 rounded-full blur-3xl',
          isSuccess ? 'bg-sky-400/15' : 'bg-muted-foreground/5',
        )}
      />

      <div className="relative border-b border-border/60 px-6 pb-8 pt-10 text-center sm:px-10">
        <div className="relative mx-auto mb-6 flex size-[4.5rem] items-center justify-center">
          {isSuccess && !reducedMotion ? (
            <>
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border border-primary/35"
                animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.span
                aria-hidden
                className="absolute inset-1 rounded-full bg-primary/15"
                animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0.35, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          ) : null}

          <motion.div
            initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.08 }}
            className={cn(
              'relative flex size-16 items-center justify-center rounded-2xl shadow-glow',
              isSuccess
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground',
            )}
          >
            {isSuccess ? (
              <CheckCircle2 className="size-8" strokeWidth={1.75} />
            ) : (
              <XCircle className="size-8" strokeWidth={1.75} />
            )}
          </motion.div>
        </div>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className={cn(
            'mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]',
            isSuccess ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {isSuccess ? t('checkout.successEyebrow') : t('checkout.cancelEyebrow')}
        </motion.p>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {isSuccess ? t('checkout.successTitle') : t('checkout.cancelTitle')}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {isSuccess ? t('checkout.successBody') : t('checkout.cancelBody')}
        </p>
      </div>

      <div className="relative space-y-5 px-6 py-7 sm:px-10 sm:py-8">
        {isSuccess ? (
          <ol className="space-y-2.5 text-left">
            {[
              { icon: ExternalLink, text: t('checkout.stepOpen') },
              { icon: Mail, text: t('checkout.stepLogin') },
              { icon: CheckCircle2, text: t('checkout.stepUnlock') },
            ].map((step, index) => {
              const Icon = step.icon
              return (
                <motion.li
                  key={step.text}
                  initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + index * 0.08, duration: 0.35 }}
                  className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/45 px-3.5 py-3"
                >
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <Icon className="size-3.5" strokeWidth={2.25} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-primary/90">
                      {t('checkout.stepLabel', { n: index + 1 })}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-foreground/90">{step.text}</p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        ) : (
          <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3 text-left text-sm leading-relaxed text-muted-foreground">
            {t('checkout.cancelHint')}
          </div>
        )}

        <div className="space-y-2">
          <Button
            variant={isSuccess ? 'glow' : 'default'}
            size="xl"
            className="w-full"
            onClick={openDesktopApp}
          >
            {isSuccess ? t('checkout.openApp') : t('checkout.backToApp')}
            <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden />
          </Button>
          {isSuccess ? (
            <p className="text-center text-[11px] text-muted-foreground">
              {launchAttempted ? t('checkout.launchFallbackShort') : t('checkout.launchingShort')}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border/60 pt-4 text-xs">
          <Link
            href="/#download"
            className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
          >
            <Download className="size-3.5" strokeWidth={2} aria-hidden />
            {t('checkout.downloadLink')}
          </Link>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            <LayoutGrid className="size-3.5" strokeWidth={2} aria-hidden />
            {t('checkout.viewPlans')}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            <Home className="size-3.5" strokeWidth={2} aria-hidden />
            {t('checkout.home')}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
