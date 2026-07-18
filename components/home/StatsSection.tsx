'use client'

import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { MotionItem, MotionStagger } from '@/components/common/Motion'
import { stats } from '@/constants/content'

export function StatsSection() {
  return (
    <SectionWrapper id="stats" padding="sm" className="border-y border-border/60 bg-surface/40">
      <MotionStagger className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
        {stats.map((stat) => (
          <MotionItem key={stat.label} className="text-center">
            <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </MotionItem>
        ))}
      </MotionStagger>
    </SectionWrapper>
  )
}
