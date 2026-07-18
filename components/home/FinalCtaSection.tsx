'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { GradientBlob } from '@/components/common/GradientBlob'
import { Particles } from '@/components/common/Particles'
import { Magnetic } from '@/components/common/Magnetic'
import { Button } from '@/components/ui/button'
import { useLenis } from '@/components/layout/SmoothScroll'
import { siteConfig } from '@/constants/site'

export function FinalCtaSection() {
  const { scrollTo } = useLenis()

  return (
    <SectionWrapper id="cta" padding="lg" className="overflow-hidden" disableAnimation>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/25 bg-gradient-to-br from-card via-card to-primary/[0.12] px-6 py-16 text-center shadow-glow-lg sm:px-12 sm:py-20 lg:py-24">
        <Particles count={28} className="opacity-70" />
        <GradientBlob className="-left-20 -top-24 opacity-80" tone="primary" size="xl" />
        <GradientBlob className="-bottom-24 -right-16 opacity-60" tone="cyan" size="lg" delay={1.5} />
        <GradientBlob className="left-1/3 top-1/2 opacity-40" tone="violet" size="md" delay={3} />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(221_83%_53%/0.14),transparent_60%)]"
          animate={{ opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-primary">
            Final step
          </p>
          <h2 className="text-hero text-foreground text-balance">
            Ready to Make Your PC Fast Again?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-hero-sub text-muted-foreground text-pretty">
            Download EdaCleaner free, run one Smart Scan, and feel the difference in minutes —
            no credit card required.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Magnetic strength={0.4}>
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -inset-3 rounded-2xl bg-primary/30 blur-xl animate-glow-pulse"
                />
                <Button
                  variant="glow"
                  size="xl"
                  onClick={() => scrollTo('#download')}
                  className="relative h-14 min-w-[240px] px-10 text-base shadow-glow-lg"
                >
                  <Download strokeWidth={1.75} className="size-5" />
                  {siteConfig.download.label}
                </Button>
              </div>
            </Magnetic>
            <p className="text-xs text-muted-foreground">
              Free plan included · Windows, macOS & Linux · Cancel Pro anytime
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
