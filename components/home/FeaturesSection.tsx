'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MotionItem, MotionStagger } from '@/components/common/Motion'
import { features } from '@/constants/content'
import { cn } from '@/lib/utils'

export function FeaturesSection() {
  return (
    <SectionWrapper id="features">
      <SectionHeading
        eyebrow="Features"
        title="Everything you need to reclaim speed and space"
        description="Built from the same modules in the EdaCleaner desktop app — cleanup, storage, performance, monitoring, and reports."
        className="mb-12"
      />

      <MotionStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <MotionItem key={feature.title}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                className={cn(
                  'group relative h-full overflow-hidden rounded-xl border border-border/80 bg-card p-6 shadow-card',
                  'transition-[border-color,box-shadow] duration-300',
                  'hover:border-primary/35 hover:shadow-card-hover hover:shadow-primary/10',
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(600px circle at var(--x, 50%) var(--y, 0%), hsl(221 83% 53% / 0.08), transparent 40%)',
                  }}
                />
                <div className="relative">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-card-title font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            </MotionItem>
          )
        })}
      </MotionStagger>
    </SectionWrapper>
  )
}
