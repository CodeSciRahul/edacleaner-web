'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { howItWorks } from '@/constants/content'

export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" className="bg-surface/30">
      <SectionHeading
        eyebrow="How it works"
        title="From download to a faster PC in five steps"
        description="A simple path designed so anyone can optimize their machine with confidence."
        className="mb-14"
      />

      <div className="relative mx-auto max-w-xl">
        <div
          aria-hidden
          className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-primary/50 via-border to-success/50 sm:left-6"
        />

        <ol className="space-y-6">
          {howItWorks.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex gap-4 sm:gap-5"
              >
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-glow sm:size-12">
                  <Icon className="size-4 sm:size-5" strokeWidth={1.75} />
                </div>
                <div className="flex-1 rounded-xl border border-border/80 bg-card p-4 shadow-card sm:p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                    Step {step.step}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </SectionWrapper>
  )
}
