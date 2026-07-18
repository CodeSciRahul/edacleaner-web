'use client'

import { useEffect, useState } from 'react'
import { useLenis } from '@/components/layout/SmoothScroll'

/** 0–1 scroll progress — prefers Lenis, falls back to native scroll */
export function useScrollProgress() {
  const { progress } = useLenis()
  const [native, setNative] = useState(0)

  useEffect(() => {
    if (progress > 0) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setNative(total > 0 ? Math.min(scrollTop / total, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [progress])

  return progress || native
}
