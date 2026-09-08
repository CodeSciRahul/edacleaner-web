'use client'

import { useTranslation } from '@/i18n/useTranslation'

export function SkipLink() {
  const { t } = useTranslation()

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-glow"
    >
      {t('common.skipToContent')}
    </a>
  )
}
