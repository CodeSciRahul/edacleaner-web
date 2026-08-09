'use client'

import { useState, type ComponentType } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  Crown,
  Gauge,
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

  return (
    <SectionWrapper id="pricing" className="bg-surface/30">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple plans. Clear upgrades."
        description="Start free, unlock Pro for deeper cleanup, or go Premium for the full toolkit."
        className="mb-10"
      />

      <div className="mb-10 flex flex-col items-center gap-2.5">
        <div
          role="group"
          aria-label="Billing cycle"
          className="grid w-[min(100%,17.5rem)] grid-cols-2 rounded-full border border-border/80 bg-card p-1 shadow-card"
        >
          <BillingTab
            active={billing === 'yearly'}
            onClick={() => setBilling('yearly')}
            label="Yearly"
          />
          <BillingTab
            active={billing === 'monthly'}
            onClick={() => setBilling('monthly')}
            label="Monthly"
          />
        </div>
        <p
          className={cn(
            'text-xs font-medium transition-opacity duration-200',
            billing === 'yearly' ? 'text-primary opacity-100' : 'text-muted-foreground opacity-70',
          )}
        >
          Save up to 20% with yearly billing
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
        <span>7-day free trial on Pro &amp; Premium</span>
        <span className="hidden text-border sm:inline" aria-hidden>
          ·
        </span>
        <span>Cancel anytime. No hidden fees.</span>
      </p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card"
      >
        <div className="border-b border-border/70 px-5 py-4 sm:px-6">
          <h3 className="text-base font-semibold text-foreground">Compare plans</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            See exactly what is included in Free, Pro, and Premium.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40">
                <th className="px-5 py-3.5 font-medium text-muted-foreground sm:px-6">Feature</th>
                <th className="px-3 py-3.5 text-center font-semibold text-foreground">Free</th>
                <th className="px-3 py-3.5 text-center font-semibold text-primary">Pro</th>
                <th className="px-3 py-3.5 text-center font-semibold text-foreground sm:pr-6">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingComparison.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-border/50 last:border-0 hover:bg-accent/40"
                >
                  <td className="px-5 py-3.5 text-foreground/90 sm:px-6">{row.feature}</td>
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
  const isYearly = billing === 'yearly'
  const showTrial = Boolean(plan.freeTrialDays)
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
      {/* Top accent wash */}
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
          {plan.badge ?? 'Most Popular'}
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
        {showTrial ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            <Gauge className="size-3" strokeWidth={2.5} aria-hidden />
            {plan.freeTrialDays}-day trial
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/50 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            Forever free
          </span>
        )}
      </div>

      <div className="relative mt-4">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{plan.name}</h3>
        <p className="mt-1.5 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
          {plan.description}
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
              <PriceRow amount={0} period="forever" />
            ) : isYearly ? (
              <>
                <PriceRow
                  amount={plan.yearlyPrice}
                  period="year"
                  original={showStrike ? plan.yearlyOriginal : undefined}
                />
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-md bg-primary/15 px-2.5 py-1 text-xs font-semibold tabular-nums text-primary">
                    ${plan.monthlyPrice}/mo
                  </span>
                  {showStrike ? (
                    <span className="inline-flex rounded-md bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                      Save {savingsPct}%
                    </span>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <PriceRow amount={plan.monthlyPrice} period="month" />
                {showTrial ? (
                  <p className="mt-2.5 text-xs font-medium text-muted-foreground">
                    Cancel anytime · No commitment
                  </p>
                ) : null}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="relative mt-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        What&apos;s included
      </p>
      <ul className="relative mt-3 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm text-foreground/90">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-7 space-y-2.5">
        <Button
          asChild
          variant={plan.highlighted ? 'glow' : plan.forever ? 'outline' : 'default'}
          size="lg"
          className="w-full"
        >
          <Link href={plan.href}>{plan.cta}</Link>
        </Button>
        <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
          <ShieldCheck className="size-3.5 shrink-0 text-primary" strokeWidth={2} aria-hidden />
          {plan.forever
            ? 'No credit card required'
            : 'Cancel anytime · Instant access'}
        </p>
      </div>
    </motion.article>
  )
}

function PriceRow({
  amount,
  period,
  original,
}: {
  amount: number
  period: string
  original?: number
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="text-[2.5rem] font-bold leading-none tracking-tight tabular-nums text-foreground sm:text-[2.75rem]">
        ${amount}
      </span>
      <span className="text-sm text-muted-foreground">/ {period}</span>
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
  return (
    <span className="flex justify-center">
      {included ? (
        <Check
          className={cn('size-4', highlight ? 'text-primary' : 'text-success')}
          strokeWidth={2.25}
          aria-label="Included"
        />
      ) : (
        <Minus className="size-4 text-muted-foreground/40" strokeWidth={2} aria-label="Not included" />
      )}
    </span>
  )
}
