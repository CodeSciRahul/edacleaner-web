'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MotionItem, MotionStagger } from '@/components/common/Motion'
import { TiltCard, GradientBorder } from '@/components/common/TiltCard'
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
              <TiltCard className="h-full">
                <GradientBorder className="h-full">
                  <article
                    className={cn(
                      'group relative h-full overflow-hidden rounded-xl p-6',
                      'transition-[box-shadow] duration-300',
                    )}
                  >
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: [-2, 2, 0], scale: 1.05 }}
                        transition={{ duration: 0.35 }}
                        className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Icon className="size-5" strokeWidth={1.75} />
                      </motion.div>
                      <h3 className="text-card-title font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </article>
                </GradientBorder>
              </TiltCard>
            </MotionItem>
          )
        })}
      </MotionStagger>
    </SectionWrapper>
  )
}
