'use client'

import { useState, type ComponentType } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  Crown,
  Loader2,
  Minus,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MotionItem, MotionStagger } from '@/components/common/Motion'
import { Button } from '@/components/ui/button'
import { pricingComparison, pricingPlans, type PricingPlan } from '@/constants/content'
import { useTranslation } from '@/i18n/useTranslation'
import type { TranslationKey } from '@/i18n/locales/en'
import { startGuestCheckout } from '@/lib/api'
import { cn } from '@/lib/utils'

type BillingCycle = 'yearly' | 'monthly'

const planVisuals: Record<
  PricingPlan['id'],
  { icon: ComponentType<{ className?: string; strokeWidth?: number }>; accent: string }
> = {
  free: {
    icon: Sparkles,
    accent: 'from-sky-500/20 via-transparent to-transparent',
  },
  pro: {
    icon: Zap,
    accent: 'from-primary/35 via-primary/10 to-transparent',
  },
  premium: {
    icon: Crown,
    accent: 'from-cyan-500/20 via-transparent to-transparent',
  },
}

export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>('yearly')
  const { t } = useTranslation()

  return (
    <SectionWrapper id="pricing" className="bg-surface/30">
      <SectionHeading
        eyebrow={t('pricing.eyebrow')}
        title={t('pricing.title')}
        description={t('pricing.description')}
        className="mb-10"
      />

      <div className="mb-10 flex flex-col items-center gap-2.5">
        <div
          role="group"
          aria-label={t('pricing.billingAria')}
          className="grid w-[min(100%,17.5rem)] grid-cols-2 rounded-full border border-border/80 bg-card p-1 shadow-card"
        >
          <BillingTab
            active={billing === 'yearly'}
            onClick={() => setBilling('yearly')}
            label={t('pricing.yearly')}
          />
          <BillingTab
            active={billing === 'monthly'}
            onClick={() => setBilling('monthly')}
            label={t('pricing.monthly')}
          />
        </div>
        <p
          className={cn(
            'text-xs font-medium transition-opacity duration-200',
            billing === 'yearly' ? 'text-primary opacity-100' : 'text-muted-foreground opacity-70',
          )}
        >
          {t('pricing.saveYearly')}
        </p>
      </div>

      <MotionStagger className="mx-auto grid max-w-5xl items-stretch gap-5 pt-3 lg:grid-cols-3 lg:gap-6 lg:pt-4">
        {pricingPlans.map((plan) => (
          <MotionItem key={plan.id} className="h-full">
            <PlanCard plan={plan} billing={billing} />
          </MotionItem>
        ))}
      </MotionStagger>

      <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted-foreground">
        <ShieldCheck className="size-4 shrink-0 text-primary" strokeWidth={2} aria-hidden />
        <span>{t('pricing.cancelNote')}</span>
      </p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card"
      >
        <div className="border-b border-border/70 px-5 py-4 sm:px-6">
          <h3 className="text-base font-semibold text-foreground">{t('pricing.compareTitle')}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t('pricing.compareDescription')}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40">
                <th className="px-5 py-3.5 font-medium text-muted-foreground sm:px-6">
                  {t('pricing.featureCol')}
                </th>
                <th className="px-3 py-3.5 text-center font-semibold text-foreground">
                  {t('pricing.free.name')}
                </th>
                <th className="px-3 py-3.5 text-center font-semibold text-primary">
                  {t('pricing.pro.name')}
                </th>
                <th className="px-3 py-3.5 text-center font-semibold text-foreground sm:pr-6">
                  {t('pricing.premium.name')}
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingComparison.map((row) => (
                <tr
                  key={row.featureKey}
                  className="border-b border-border/50 last:border-0 hover:bg-accent/40"
                >
                  <td className="px-5 py-3.5 text-foreground/90 sm:px-6">{t(row.featureKey)}</td>
                  <td className="px-3 py-3.5">
                    <CompareCell included={row.free} />
                  </td>
                  <td className="px-3 py-3.5">
                    <CompareCell included={row.pro} highlight />
                  </td>
                  <td className="px-3 py-3.5 sm:pr-6">
                    <CompareCell included={row.premium} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

function BillingTab({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full px-4 py-2 text-center text-sm font-medium transition-colors duration-200',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {label}
    </button>
  )
}

function PlanCard({ plan, billing }: { plan: PricingPlan; billing: BillingCycle }) {
  const { t } = useTranslation()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const isYearly = billing === 'yearly'
  const isPaidPlan = plan.id === 'pro' || plan.id === 'premium'
  const savings =
    isYearly && typeof plan.yearlyOriginal === 'number'
      ? plan.yearlyOriginal - plan.yearlyPrice
      : 0
  const showStrike = savings >= 5
  const savingsPct =
    showStrike && plan.yearlyOriginal
      ? Math.round((savings / plan.yearlyOriginal) * 100)
      : 0

  const visual = planVisuals[plan.id]
  const Icon = visual.icon

  async function handlePurchase() {
    if (checkoutLoading) return
    // Narrow PlanId so free never reaches paid guest checkout (and TS accepts slug).
    if (plan.id !== 'pro' && plan.id !== 'premium') return

    setCheckoutError(null)
    setCheckoutLoading(true)

    try {
      const url = await startGuestCheckout({
        slug: plan.id,
        billingInterval: isYearly ? 'year' : 'month',
      })
      window.location.assign(url)
    } catch {
      setCheckoutError(t('pricing.checkoutError'))
      setCheckoutLoading(false)
    }
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 340, damping: 24 }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-7',
        'bg-gradient-to-b from-elevated to-card',
        'transition-[border-color,box-shadow,transform] duration-300',
        plan.highlighted
          ? 'z-[1] border-primary/60 shadow-glow-lg ring-1 ring-primary/25 lg:scale-[1.03]'
          : 'border-border/80 shadow-card hover:border-primary/30 hover:shadow-card-hover',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b',
          visual.accent,
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-8 -top-8 size-36 rounded-full blur-3xl transition-opacity duration-500',
          plan.highlighted
            ? 'bg-primary/25 opacity-100'
            : 'bg-primary/10 opacity-60 group-hover:opacity-100',
        )}
      />

      {plan.highlighted ? (
        <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-primary px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground shadow-glow">
          {t(plan.badgeKey ?? 'pricing.mostPopular')}
        </span>
      ) : null}

      <div className="relative flex items-start justify-between gap-3">
        <div
          className={cn(
            'flex size-11 items-center justify-center rounded-xl border shadow-sm',
            plan.highlighted
              ? 'border-primary/40 bg-primary text-primary-foreground shadow-glow'
              : 'border-border/70 bg-card text-primary',
          )}
        >
          <Icon className="size-5" strokeWidth={2.25} />
        </div>
        {plan.forever ? (
          <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/50 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            {t('pricing.foreverFree')}
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            {t('pricing.cancelAnytime')}
          </span>
        )}
      </div>

      <div className="relative mt-4">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{t(plan.nameKey)}</h3>
        <p className="mt-1.5 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
          {t(plan.descriptionKey)}
        </p>
      </div>

      <div
        className={cn(
          'relative mt-5 rounded-xl border px-4 py-3.5',
          plan.highlighted
            ? 'border-primary/25 bg-primary/[0.08]'
            : 'border-border/60 bg-background/50',
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={billing}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col"
          >
            {plan.forever ? (
              <PriceRow amount={0} periodKey="pricing.period.forever" />
            ) : isYearly ? (
              <>
                <PriceRow
                  amount={plan.yearlyPrice}
                  periodKey="pricing.period.year"
                  original={showStrike ? plan.yearlyOriginal : undefined}
                />
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-md bg-primary/15 px-2.5 py-1 text-xs font-semibold tabular-nums text-primary">
                    {t('pricing.perMonth', { amount: plan.monthlyPrice })}
                  </span>
                  {showStrike ? (
                    <span className="inline-flex rounded-md bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                      {t('pricing.savePct', { pct: savingsPct })}
                    </span>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <PriceRow amount={plan.monthlyPrice} periodKey="pricing.period.month" />
                <p className="mt-2.5 text-xs font-medium text-muted-foreground">
                  {t('pricing.cancelAnytime')}
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="relative mt-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {t('pricing.whatsIncluded')}
      </p>
      <ul className="relative mt-3 flex-1 space-y-2.5">
        {plan.featureKeys.map((featureKey) => (
          <li key={featureKey} className="flex gap-2.5 text-sm text-foreground/90">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            <span className="leading-snug">{t(featureKey)}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-7 space-y-2.5">
        {isPaidPlan ? (
          <Button
            type="button"
            variant={plan.highlighted ? 'glow' : 'default'}
            size="lg"
            className="w-full"
            disabled={checkoutLoading}
            onClick={() => {
              void handlePurchase()
            }}
          >
            {checkoutLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                {t('pricing.checkoutRedirecting')}
              </>
            ) : (
              t(plan.ctaKey)
            )}
          </Button>
        ) : (
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Link href={plan.href}>{t(plan.ctaKey)}</Link>
          </Button>
        )}
        {checkoutError ? (
          <p className="text-center text-[11px] text-red-600 dark:text-red-400" role="alert">
            {checkoutError}
          </p>
        ) : (
          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
            <ShieldCheck className="size-3.5 shrink-0 text-primary" strokeWidth={2} aria-hidden />
            {plan.forever ? t('pricing.noCard') : t('pricing.instantAccess')}
          </p>
        )}
      </div>
    </motion.article>
  )
}

function PriceRow({
  amount,
  periodKey,
  original,
}: {
  amount: number
  periodKey: TranslationKey
  original?: number
}) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="text-[2.5rem] font-bold leading-none tracking-tight tabular-nums text-foreground sm:text-[2.75rem]">
        ${amount}
      </span>
      <span className="text-sm text-muted-foreground">/ {t(periodKey)}</span>
      {typeof original === 'number' ? (
        <span className="text-sm tabular-nums text-muted-foreground/55 line-through">
          ${original}
        </span>
      ) : null}
    </div>
  )
}

function CompareCell({
  included,
  highlight = false,
}: {
  included: boolean
  highlight?: boolean
}) {
  const { t } = useTranslation()
  return (
    <span className="flex justify-center">
      {included ? (
        <Check
          className={cn('size-4', highlight ? 'text-primary' : 'text-success')}
          strokeWidth={2.25}
          aria-label={t('common.included')}
        />
      ) : (
        <Minus
          className="size-4 text-muted-foreground/40"
          strokeWidth={2}
          aria-label={t('common.notIncluded')}
        />
      )}
    </span>
  )
}
