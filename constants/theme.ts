export const THEME_STORAGE_KEY = 'eda-cleaner-theme'

export const themeOptions = ['light', 'dark', 'system'] as const

export type ThemeOption = (typeof themeOptions)[number]
