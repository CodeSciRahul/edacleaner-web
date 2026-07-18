'use client'

import { useCallback } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import { THEME_STORAGE_KEY } from '@/constants/theme'

const THEME_TRANSITION_MS = 400

function enableThemeTransition() {
  const root = document.documentElement
  root.classList.add('theme-transition')
  window.setTimeout(() => {
    root.classList.remove('theme-transition')
  }, THEME_TRANSITION_MS)
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey={THEME_STORAGE_KEY}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

/** Theme helpers with smooth CSS transitions during switch */
export function useThemeTransition() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()

  const setThemeSmooth = useCallback(
    (next: string) => {
      enableThemeTransition()
      setTheme(next)
    },
    [setTheme],
  )

  const toggleTheme = useCallback(() => {
    enableThemeTransition()
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  return {
    theme,
    setTheme: setThemeSmooth,
    toggleTheme,
    resolvedTheme,
    systemTheme,
  }
}
