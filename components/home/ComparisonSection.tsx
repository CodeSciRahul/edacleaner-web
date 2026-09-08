'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Magnetic } from '@/components/common/Magnetic'
import { Button } from '@/components/ui/button'
import { comparisons } from '@/constants/content'
import { useLenis } from '@/components/layout/SmoothScroll'
import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

export function ComparisonSection() {
  const { scrollTo } = useLenis()
  const { t } = useTranslation()

  return (
    <SectionWrapper id="comparison">
      <SectionHeading
        eyebrow={t('comparison.eyebrow')}
        title={t('comparison.title')}
        description={t('comparison.description')}
        className="mb-12"
      />

      <div className="mx-auto max-w-3xl space-y-6">
        <div className="mb-2 flex justify-end gap-6 text-xs font-medium uppercase tracking-wide">
          <span className="text-muted-foreground">{t('common.before')}</span>
          <span className="text-primary">{t('common.after')}</span>
        </div>

        {comparisons.map((row, i) => (
          <ComparisonRow key={row.labelKey} row={row} delay={i * 0.08} />
        ))}

        <div className="flex justify-center pt-4">
          <Magnetic>
            <Button variant="glow" size="lg" onClick={() => scrollTo('#download')}>
              <Download strokeWidth={1.75} />
              {t('comparison.cta')}
            </Button>
          </Magnetic>
        </div>
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
  const { t } = useTranslation()

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
        <p className="text-sm font-semibold text-foreground">{t(row.labelKey)}</p>
        <p className="text-xs text-muted-foreground">
          <span className="line-through opacity-70">{row.beforeLabel}</span>
          <span className="mx-2 text-border">→</span>
          <span className="font-semibold text-primary">{row.afterLabel}</span>
        </p>
      </div>

      <div className="space-y-2.5">
        <Bar
          label={t('common.before')}
          width={inView ? row.before : 0}
          className="bg-muted-foreground/35"
        />
        <Bar
          label={t('common.after')}
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
