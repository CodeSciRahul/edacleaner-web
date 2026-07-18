'use client'

import { useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  className?: string
}

export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2.2,
  className,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const started = useRef(false)

  useEffect(() => {
    if (inView) started.current = true
  }, [inView])

  return (
    <span ref={ref} className={cn('tabular-nums tracking-tight', className)}>
      {prefix}
      {inView || started.current ? (
        <CountUp end={end} decimals={decimals} duration={duration} separator="," />
      ) : (
        0
      )}
      {suffix}
    </span>
  )
}
