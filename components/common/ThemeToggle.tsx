'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useThemeTransition } from '@/components/layout/ThemeProvider'
import { useMounted } from '@/hooks/use-mounted'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const mounted = useMounted()
  const { resolvedTheme, toggleTheme } = useThemeTransition()
  const isDark = resolvedTheme === 'dark'

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('relative', className)}
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="size-4 opacity-0" aria-hidden />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn('relative overflow-hidden', className)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="size-4" strokeWidth={1.75} />
          ) : (
            <Sun className="size-4" strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}
