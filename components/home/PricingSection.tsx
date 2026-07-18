'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MotionItem, MotionStagger } from '@/components/common/Motion'
import { Button } from '@/components/ui/button'
import { pricingComparison, pricingPlans } from '@/constants/content'
import { cn } from '@/lib/utils'

export function PricingSection() {
  return (
    <SectionWrapper id="pricing" className="bg-surface/30">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple plans. Clear upgrades."
        description="Start free, unlock Pro when you need deeper tools, or go Business for teams."
        className="mb-12"
      />

      <MotionStagger className="grid gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <MotionItem key={plan.id}>
            <motion.article
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 340, damping: 24 }}
              className={cn(
                'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-card sm:p-7',
                'transition-[border-color,box-shadow] duration-300',
                plan.highlighted
                  ? 'border-primary/40 shadow-glow hover:shadow-glow-lg'
                  : 'border-border/80 hover:border-primary/25 hover:shadow-card-hover',
              )}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-sm">
                  {plan.badge ?? 'Most Popular'}
                </span>
              ) : null}

              <div
                aria-hidden
                className={cn(
                  'pointer-events-none absolute -right-10 -top-10 size-40 rounded-full blur-3xl transition-opacity duration-500',
                  plan.highlighted
                    ? 'bg-primary/20 opacity-100'
                    : 'bg-primary/10 opacity-0 group-hover:opacity-100',
                )}
              />

              <div className="relative">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="relative mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">/ {plan.period}</span>
              </div>

              <ul className="relative mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm text-foreground/90">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.highlighted ? 'glow' : 'outline'}
                size="lg"
                className="relative mt-8 w-full"
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </motion.article>
          </MotionItem>
        ))}
      </MotionStagger>

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
            See exactly what is included in Free, Pro, and Business.
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
                  Business
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
                    <CompareCell included={row.business} />
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
