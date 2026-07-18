'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MacWindow } from '@/components/common/MacWindow'
import { DashboardMock } from '@/components/common/DashboardMock'
import { GradientBlob } from '@/components/common/GradientBlob'
import { Button } from '@/components/ui/button'
import { dashboardScreens } from '@/constants/content'
import { cn } from '@/lib/utils'

export function DashboardPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [index, setIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const screen = dashboardScreens[index]

  return (
    <SectionWrapper id="showcase" className="overflow-hidden" disableAnimation>
      <GradientBlob className="-left-20 top-20 opacity-50" tone="primary" size="lg" />
      <GradientBlob className="-right-16 bottom-10 opacity-40" tone="cyan" size="md" delay={2} />

      <SectionHeading
        eyebrow="Product tour"
        title="See EdaCleaner in action"
        description="Explore the same premium interface you get on the desktop — from Smart Scan to Startup Manager."
        className="mb-10"
      />

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {dashboardScreens.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all',
              i === index
                ? 'border-primary/30 bg-primary/10 text-primary shadow-sm shadow-primary/10'
                : 'border-border/70 bg-card/60 text-muted-foreground hover:border-border hover:text-foreground',
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {dashboardScreens.map((s) => (
              <div key={s.id} className="min-w-0 shrink-0 grow-0 basis-full px-1">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <MacWindow title={`EDA Cleaner — ${s.title}`} className="relative shadow-glow">
                    <DashboardMock screen={s.id} />
                    <Hotspot x={s.hotspot.x} y={s.hotspot.y} label={s.hotspot.label} />
                  </MacWindow>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous screen"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft strokeWidth={1.75} />
          </Button>
          <AnimatePresence mode="wait">
            <motion.div
              key={screen.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="min-w-[200px] text-center"
            >
              <p className="text-sm font-semibold text-foreground">{screen.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{screen.description}</p>
            </motion.div>
          </AnimatePresence>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next screen"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight strokeWidth={1.75} />
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}

function Hotspot({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <div
      className="group absolute z-20 hidden sm:block"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span className="relative flex size-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
        <span className="relative inline-flex size-4 rounded-full border-2 border-white bg-primary shadow-md" />
      </span>
      <span className="pointer-events-none absolute left-6 top-1/2 z-30 w-max -translate-y-1/2 rounded-lg border border-border/80 bg-card/95 px-2.5 py-1.5 text-[11px] font-medium text-foreground opacity-0 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </div>
  )
}
