'use client'

import { useEffect, useState } from 'react'
import { useLenis } from '@/components/layout/SmoothScroll'

/**
 * Tracks which section id is currently in view for nav highlighting.
 */
export function useActiveSection(sectionIds: readonly string[], offset = 120) {
  const { progress, lenis } = useLenis()
  const [active, setActive] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const update = () => {
      let current = sectionIds[0] ?? ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top - offset <= 0) current = id
      }
      setActive(current)
    }

    update()
    // Re-run when Lenis progress changes (or native scroll via progress updates)
    void progress
    void lenis
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [sectionIds, offset, progress, lenis])

  return active
}
