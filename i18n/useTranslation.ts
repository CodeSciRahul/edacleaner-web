'use client'

import { useCallback, useEffect } from 'react'
import { useLanguageStore } from '@/i18n/language-store'
import type { TranslationKey } from '@/i18n/locales/en'
import type { TranslationVars } from '@/i18n'
import type { AppLanguage } from '@/i18n/types'

export function useTranslation(): {
  language: AppLanguage
  setLanguage: (language: AppLanguage) => void
  hydrated: boolean
  t: (key: TranslationKey, vars?: TranslationVars) => string
} {
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)
  const hydrated = useLanguageStore((s) => s.hydrated)
  const hydrate = useLanguageStore((s) => s.hydrate)

  useEffect(() => {
    if (!hydrated) hydrate()
  }, [hydrated, hydrate])

  const t = useCallback(
    (key: TranslationKey, vars?: TranslationVars) =>
      useLanguageStore.getState().t(key, vars),
    // Re-bind when language changes so components re-render with new strings
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language],
  )

  return { language, setLanguage, hydrated, t }
}
