'use client'

import { Download } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { Magnetic } from '@/components/common/Magnetic'
import { Button } from '@/components/ui/button'
import { useLenis } from '@/components/layout/SmoothScroll'
import { siteConfig } from '@/constants/site'

/** Mid-funnel conversion strip — keeps download intent warm */
export function MidCtaStrip() {
  const { scrollTo } = useLenis()

  return (
    <SectionWrapper id="mid-cta" padding="sm" disableAnimation>
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-card via-primary/[0.06] to-card px-6 py-8 shadow-card sm:px-10 sm:py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
              Free to start
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl text-balance">
              See what your PC can reclaim in under a minute
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Download Free, run Smart Scan, and upgrade to Pro only if you need deeper tools.
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
              {siteConfig.download.label}
            </Button>
          </Magnetic>
        </div>
      </div>
    </SectionWrapper>
  )
}
