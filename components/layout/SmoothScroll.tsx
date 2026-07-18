'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

type LenisContextValue = {
  lenis: Lenis | null
  scrollTo: (target: string | number, options?: { offset?: number }) => void
  progress: number
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => undefined,
  progress: 0,
})

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null)
      const onScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement
        const total = scrollHeight - clientHeight
        setProgress(total > 0 ? Math.min(scrollTop / total, 1) : 0)
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      anchors: true,
    })

    const onScroll = (e: Lenis) => {
      setProgress(e.progress)
    }

    instance.on('scroll', onScroll)
    setLenis(instance)

    let frame = 0
    const raf = (time: number) => {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      instance.off('scroll', onScroll)
      instance.destroy()
      setLenis(null)
    }
  }, [reducedMotion])

  const scrollTo = useCallback(
    (target: string | number, options?: { offset?: number }) => {
      const offset = options?.offset ?? -72
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.1 })
        return
      }
      if (typeof target === 'string') {
        const el = document.querySelector(target)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY + offset
          window.scrollTo({ top, behavior: 'smooth' })
        }
        return
      }
      window.scrollTo({ top: target, behavior: 'smooth' })
    },
    [lenis],
  )

  const value = useMemo(
    () => ({ lenis, scrollTo, progress }),
    [lenis, scrollTo, progress],
  )

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
}
