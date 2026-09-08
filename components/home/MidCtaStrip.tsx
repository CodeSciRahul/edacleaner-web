'use client'

import { Download } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { Magnetic } from '@/components/common/Magnetic'
import { Button } from '@/components/ui/button'
import { useLenis } from '@/components/layout/SmoothScroll'
import { useTranslation } from '@/i18n/useTranslation'

/** Mid-funnel conversion strip — keeps download intent warm */
export function MidCtaStrip() {
  const { scrollTo } = useLenis()
  const { t } = useTranslation()

  return (
    <SectionWrapper id="mid-cta" padding="sm" disableAnimation>
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-card via-primary/[0.06] to-card px-6 py-8 shadow-card sm:px-10 sm:py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
              {t('midCta.eyebrow')}
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl text-balance">
              {t('midCta.title')}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              {t('midCta.description')}
            </p>
          </div>
          <Magnetic strength={0.32}>
            <Button
              variant="glow"
              size="xl"
              onClick={() => scrollTo('#download')}
              className="shrink-0"
            >
              <Download strokeWidth={1.75} />
              {t('site.downloadLabel')}
            </Button>
          </Magnetic>
        </div>
      </div>
    </SectionWrapper>
  )
}
