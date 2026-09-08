'use client'

import { useEffect } from 'react'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { useLanguageStore } from '@/i18n/language-store'

function LanguageHydrator({ children }: { children: React.ReactNode }) {
  const hydrate = useLanguageStore((s) => s.hydrate)
  const hydrated = useLanguageStore((s) => s.hydrated)

  useEffect(() => {
    if (!hydrated) hydrate()
  }, [hydrated, hydrate])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageHydrator>
        <SmoothScroll>{children}</SmoothScroll>
      </LanguageHydrator>
    </ThemeProvider>
  )
}
