'use client'

import type { MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/common/Container'
import { GradientBlob } from '@/components/common/GradientBlob'
import { Particles } from '@/components/common/Particles'
import { MacWindow } from '@/components/common/MacWindow'
import { DashboardMock } from '@/components/common/DashboardMock'
import { Magnetic } from '@/components/common/Magnetic'
import { siteConfig } from '@/constants/site'
import { heroFloatCards } from '@/constants/content'
import { cn } from '@/lib/utils'
import { getBoundingRect } from '@/lib/dom'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useLenis } from '@/components/layout/SmoothScroll'

export function HeroSection() {
  const reduced = useReducedMotion()
  const { scrollTo } = useLenis()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 80, damping: 20 })
  const springY = useSpring(my, { stiffness: 80, damping: 20 })

  const dashX = useTransform(springX, [-0.5, 0.5], [14, -14])
  const dashY = useTransform(springY, [-0.5, 0.5], [10, -10])
  const cardX = useTransform(springX, [-0.5, 0.5], [-10, 10])
  const cardY = useTransform(springY, [-0.5, 0.5], [-8, 8])

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced) return
    const rect = getBoundingRect(e.currentTarget)
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="hero"
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16"
    >
      <Particles count={32} />
      <GradientBlob className="-left-32 top-0" tone="primary" size="xl" delay={0} />
      <GradientBlob className="-right-24 top-32" tone="cyan" size="lg" delay={1.5} />
      <GradientBlob className="bottom-0 left-1/3" tone="violet" size="md" delay={3} />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="relative z-10 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-primary"
          >
            {siteConfig.shortName}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-hero text-foreground text-balance"
          >
            Your PC can become dramatically faster — with one click.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-hero-sub text-muted-foreground text-pretty"
          >
            EdaCleaner scans junk, frees disk space, optimizes startup, and boosts performance
            across Windows, macOS, and Linux.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.35}>
              <Button
                variant="glow"
                size="xl"
                className="animate-glow-pulse"
                onClick={() => scrollTo('#download')}
              >
                <Download strokeWidth={1.75} />
                {siteConfig.download.label}
              </Button>
            </Magnetic>
            <Button variant="outline" size="xl" onClick={() => scrollTo('#features')}>
              View Features
              <ArrowRight strokeWidth={1.75} />
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-4 text-xs text-muted-foreground"
          >
            Free plan available · No credit card required
          </motion.p>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <motion.div
            style={reduced ? undefined : { x: dashX, y: dashY }}
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <MacWindow title="EDA Cleaner — Overview" className="shadow-glow">
                <DashboardMock screen="overview" />
              </MacWindow>
            </motion.div>
          </motion.div>

          {heroFloatCards.map((card, i) => {
            const Icon = card.icon
            const positions = [
              'left-0 top-[8%] sm:-left-6',
              'right-0 top-[18%] sm:-right-4',
              'left-2 bottom-[18%] sm:-left-8',
              'right-2 bottom-[8%] sm:-right-6',
            ]
            const tone =
              card.tone === 'success'
                ? 'text-success border-success/25 bg-success/10'
                : card.tone === 'cyan'
                  ? 'text-accent-cyan border-accent-cyan/25 bg-accent-cyan/10'
                  : card.tone === 'violet'
                    ? 'text-chart-disk border-chart-disk/25 bg-chart-disk/10'
                    : 'text-primary border-primary/25 bg-primary/10'

            return (
              <motion.div
                key={card.label}
                style={reduced ? undefined : { x: cardX, y: cardY }}
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: reduced ? 0 : [0, i % 2 === 0 ? -8 : 8, 0],
                }}
                transition={{
                  opacity: { delay: 0.45 + i * 0.1, duration: 0.5 },
                  scale: { delay: 0.45 + i * 0.1, duration: 0.5 },
                  y: reduced
                    ? undefined
                    : {
                        delay: 0.8 + i * 0.2,
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                }}
                className={cn(
                  'absolute z-20 hidden rounded-xl border px-3 py-2.5 shadow-card backdrop-blur-sm sm:flex sm:items-center sm:gap-2.5',
                  'bg-card/90',
                  positions[i],
                  tone,
                )}
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-card">
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-[10px] font-medium text-muted-foreground">
                    {card.label}
                  </span>
                  <span className="block text-sm font-semibold text-foreground tabular-nums">
                    {card.value}
                  </span>
                </span>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
