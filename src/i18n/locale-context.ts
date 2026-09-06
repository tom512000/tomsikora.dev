import { createContext } from 'react'
import type { Locale, LocalizedText } from '@/lib/types'
import type { TranslationKey, TranslationVars } from './dictionaries'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Libellés d'interface, par clé pointée typée. */
  t: (key: TranslationKey, vars?: TranslationVars) => string
  /** Contenu factuel déjà traduit au niveau de la donnée. */
  L: (text: LocalizedText) => string
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)
