'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { Container } from '@/components/common/Container'
import { Magnetic } from '@/components/common/Magnetic'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/constants/site'
import { useActiveSection } from '@/hooks/use-active-section'
import { useLenis } from '@/components/layout/SmoothScroll'
import { cn } from '@/lib/utils'

const NAV_IDS = siteConfig.nav.map((n) => n.href.replace('#', ''))

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(NAV_IDS)
  const { progress, scrollTo } = useLenis()

  useEffect(() => {
    setScrolled(progress > 0.01 || window.scrollY > 12)
  }, [progress])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    scrollTo(href)
  }

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[var(--header-height)] transition-[background-color,border-color,box-shadow] duration-theme ease-premium',
        scrolled || open
          ? 'border-b border-border/70 bg-background/80 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const id = item.href.replace('#', '')
            const isActive = active === id
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => go(item.href)}
                className={cn(
                  'group relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-300 ease-premium',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Magnetic strength={0.35} className="hidden sm:inline-flex">
            <Button
              variant="glow"
              size="sm"
              onClick={() => go(siteConfig.download.windows)}
            >
              <Download strokeWidth={1.75} />
              Download
            </Button>
          </Magnetic>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X strokeWidth={1.75} /> : <Menu strokeWidth={1.75} />}
          </Button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-border/70 bg-background/95 backdrop-blur-md md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {siteConfig.nav.map((item) => {
                const id = item.href.replace('#', '')
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => go(item.href)}
                    className={cn(
                      'rounded-lg px-3 py-3 text-left text-sm font-medium hover:bg-accent',
                      active === id ? 'bg-accent text-foreground' : 'text-foreground',
                    )}
                  >
                    {item.label}
                  </button>
                )
              })}
              <Button
                variant="glow"
                className="mt-2"
                onClick={() => go(siteConfig.download.windows)}
              >
                <Download strokeWidth={1.75} />
                {siteConfig.download.label}
              </Button>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
