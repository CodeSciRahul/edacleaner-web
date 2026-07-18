'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { testimonials } from '@/constants/content'
import { cn } from '@/lib/utils'

const toneClass = {
  primary: 'bg-primary/15 text-primary',
  cyan: 'bg-accent-cyan/15 text-accent-cyan',
  violet: 'bg-chart-disk/15 text-chart-disk',
  success: 'bg-success/15 text-success',
} as const

export function TestimonialsSection() {
  const [paused, setPaused] = useState(false)
  const [selected, setSelected] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [
      Autoplay({
        delay: 4200,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    if (paused) autoplay.stop()
    else autoplay.play()
  }, [emblaApi, paused])

  return (
    <SectionWrapper id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by people who live on their PCs"
        description="Real roles, realistic stories — engineers, designers, gamers, editors, and IT teams."
        className="mb-12"
      />

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="min-w-0 shrink-0 grow-0 basis-full px-1.5 sm:basis-1/2 lg:basis-1/3"
              >
                <motion.blockquote
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  className="flex h-full min-h-[280px] flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-card"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={cn(
                        'flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                        toneClass[t.tone],
                      )}
                      aria-hidden
                    >
                      {t.initials}
                    </span>
                    <div className="min-w-0">
                      <cite className="block truncate text-sm font-semibold not-italic text-foreground">
                        {t.name}
                      </cite>
                      <span className="block truncate text-xs text-muted-foreground">
                        {t.role} · {t.company}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 flex gap-0.5 text-warning" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" strokeWidth={0} />
                    ))}
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-foreground/90 text-pretty">
                    “{t.quote}”
                  </p>
                </motion.blockquote>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to review ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === selected ? 'w-6 bg-primary' : 'w-1.5 bg-border hover:bg-muted-foreground/40',
              )}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          {paused ? 'Paused' : 'Auto-scrolling'} · hover to pause
        </p>
      </div>
    </SectionWrapper>
  )
}
