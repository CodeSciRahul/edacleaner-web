'use client'

import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { SmoothScroll } from '@/components/layout/SmoothScroll'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  )
}
