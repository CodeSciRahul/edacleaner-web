'use client'

import { create } from 'zustand'
import { isAppLanguage, type AppLanguage } from '@/i18n/types'
import { translate, type TranslationVars } from '@/i18n'
import type { TranslationKey } from '@/i18n/locales/en'

/** Shared with the desktop app preference key for consistency. */
const STORAGE_KEY = 'eda-cleaner-language'

function readLanguage(): AppLanguage {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isAppLanguage(stored)) return stored
  } catch {
    // ignore
  }
  return 'en'
}

interface LanguageState {
  language: AppLanguage
  hydrated: boolean
  hydrate: () => void
  setLanguage: (language: AppLanguage) => void
  t: (key: TranslationKey, vars?: TranslationVars) => string
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'en',
  hydrated: false,
  hydrate: () => {
    const language = readLanguage()
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
    set({ language, hydrated: true })
  },
  setLanguage: (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next
    }
    set({ language: next })
  },
  t: (key, vars) => translate(get().language, key, vars),
}))
