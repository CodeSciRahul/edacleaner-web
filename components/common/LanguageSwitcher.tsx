'use client'

import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { APP_LANGUAGES, type AppLanguage } from '@/i18n/types'
import { useTranslation } from '@/i18n/useTranslation'
import { useMounted } from '@/hooks/use-mounted'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const mounted = useMounted()
  const { language, setLanguage, t } = useTranslation()

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('relative', className)}
        aria-label={t('language.switchAria')}
        disabled
      >
        <Languages className="size-4 opacity-0" aria-hidden />
      </Button>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <label className="sr-only" htmlFor="language-switcher">
        {t('language.switcher')}
      </label>
      <div className="flex items-center">
        <Languages className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground" strokeWidth={1.75} />
        <select
          id="language-switcher"
          value={language}
          aria-label={t('language.switchAria')}
          onChange={(e) => setLanguage(e.target.value as AppLanguage)}
          className={cn(
            'h-9 appearance-none rounded-lg border border-transparent bg-transparent pl-8 pr-7 text-[12px] font-medium text-foreground',
            'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'cursor-pointer',
          )}
        >
          {APP_LANGUAGES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nativeLabel}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
