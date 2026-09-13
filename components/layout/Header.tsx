'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { Container } from '@/components/common/Container'
import { Magnetic } from '@/components/common/Magnetic'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/constants/site'
import { navItems } from '@/constants/content'
import { useActiveSection } from '@/hooks/use-active-section'
import { useLenis } from '@/components/layout/SmoothScroll'
import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

const NAV_IDS = navItems.map((n) => n.href.replace('#', ''))

function sectionExists(hash: string): boolean {
  if (typeof document === 'undefined') return false
  const id = hash.startsWith('#') ? hash.slice(1) : hash
  return Boolean(id && document.getElementById(id))
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const active = useActiveSection(NAV_IDS)
  const { progress, scrollTo } = useLenis()
  const { t } = useTranslation()

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
    const hash = href.startsWith('#') ? href : `#${href}`

    // Off the marketing home page (e.g. /pricing checkout return), hash targets
    // are missing — go to the home section instead of a no-op scroll.
    if (pathname !== '/' || !sectionExists(hash)) {
      window.location.assign(`/${hash}`)
      return
    }

    scrollTo(hash)
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

        <nav className="hidden items-center gap-0.5 md:flex" aria-label={t('nav.primary')}>
          {navItems.map((item) => {
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
                {t(item.labelKey)}
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
          <LanguageSwitcher className="hidden sm:block" />
          <ThemeToggle />
          <Magnetic strength={0.35} className="hidden sm:inline-flex">
            <Button
              variant="glow"
              size="sm"
              onClick={() => go(siteConfig.download.windows)}
            >
              <Download strokeWidth={1.75} />
              {t('common.download')}
            </Button>
          </Magnetic>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? t('common.closeMenu') : t('common.openMenu')}
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
              {navItems.map((item) => {
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
                    {t(item.labelKey)}
                  </button>
                )
              })}
              <div className="px-1 py-2">
                <LanguageSwitcher />
              </div>
              <Button
                variant="glow"
                className="mt-2"
                onClick={() => go(siteConfig.download.windows)}
              >
                <Download strokeWidth={1.75} />
                {t('site.downloadLabel')}
              </Button>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
