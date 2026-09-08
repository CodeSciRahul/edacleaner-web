'use client'

import Link from 'next/link'
import { Logo } from '@/components/common/Logo'
import { Container } from '@/components/common/Container'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/constants/site'
import { footerLinks } from '@/constants/content'
import { useTranslation } from '@/i18n/useTranslation'

export function Footer() {
  const year = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <footer className="relative border-t border-border/70 bg-surface/50">
      <Container className="section-padding-sm">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground text-pretty">{t('site.description')}</p>
            <p className="text-xs font-medium text-muted-foreground">{t('site.platforms')}</p>
          </div>

          <nav
            aria-label={t('nav.footer')}
            className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:flex-wrap"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t('site.rights', { year, name: siteConfig.name })}</p>
          <p className="opacity-80">{t('site.tagline')}</p>
        </div>
      </Container>
    </footer>
  )
}
