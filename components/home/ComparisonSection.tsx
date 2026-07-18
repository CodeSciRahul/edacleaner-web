'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { comparisons } from '@/constants/content'
import { cn } from '@/lib/utils'

export function ComparisonSection() {
  return (
    <SectionWrapper id="comparison">
      <SectionHeading
        eyebrow="Before & after"
        title="Measurable gains after one Smart Scan"
        description="Illustrative results based on typical cleanup and startup optimization workflows in EdaCleaner."
        className="mb-12"
      />

      <div className="mx-auto max-w-3xl space-y-6">
        <div className="mb-2 flex justify-end gap-6 text-xs font-medium uppercase tracking-wide">
          <span className="text-muted-foreground">Before</span>
          <span className="text-primary">After</span>
        </div>

        {comparisons.map((row, i) => (
          <ComparisonRow key={row.label} row={row} delay={i * 0.08} />
        ))}
      </div>
    </SectionWrapper>
  )
}

function ComparisonRow({
  row,
  delay,
}: {
  row: (typeof comparisons)[number]
  delay: number
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-border/80 bg-card p-4 shadow-card sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">{row.label}</p>
        <p className="text-xs text-muted-foreground">
          <span className="line-through opacity-70">{row.beforeLabel}</span>
          <span className="mx-2 text-border">→</span>
          <span className="font-semibold text-primary">{row.afterLabel}</span>
        </p>
      </div>

      <div className="space-y-2.5">
        <Bar
          label="Before"
          width={inView ? row.before : 0}
          className="bg-muted-foreground/35"
        />
        <Bar
          label="After"
          width={inView ? row.after : 0}
          className="bg-gradient-to-r from-primary to-accent-cyan"
        />
      </div>
    </motion.div>
  )
}

function Bar({
  label,
  width,
  className,
}: {
  label: string
  width: number
  className: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={cn('h-full rounded-full transition-all duration-1000 ease-out', className)}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}
