'use client'

import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Lock,
  Monitor,
  RefreshCw,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MotionItem, MotionStagger } from '@/components/common/Motion'
import { trustBadges, trustLogos } from '@/constants/content'
import { cn } from '@/lib/utils'

const icons = {
  users: Users,
  shield: ShieldCheck,
  lock: Lock,
  badge: BadgeCheck,
  refresh: RefreshCw,
  monitor: Monitor,
} as const

export function TrustSection() {
  return (
    <SectionWrapper id="trust" className="bg-surface/30">
      <SectionHeading
        eyebrow="Trust"
        title="Built to earn confidence before you click Download"
        description="Security, privacy, and compatibility signals that matter when you install system software."
        className="mb-12"
      />

      <MotionStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trustBadges.map((badge) => {
          const Icon = icons[badge.icon]
          return (
            <MotionItem key={badge.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                className={cn(
                  'group h-full rounded-xl border border-border/80 bg-card p-5 shadow-card',
                  'transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-card-hover',
                )}
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{badge.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {badge.description}
                </p>
              </motion.div>
            </MotionItem>
          )
        })}
      </MotionStagger>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12"
      >
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Trusted by teams and creators
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {trustLogos.map((name) => (
            <div
              key={name}
              className="flex h-12 min-w-[120px] items-center justify-center rounded-xl border border-border/70 bg-card/80 px-4 text-xs font-semibold tracking-wide text-muted-foreground/70 shadow-sm backdrop-blur-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
