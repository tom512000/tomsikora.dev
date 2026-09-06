import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Locale, LocalizedText } from '@/lib/types'
import { readStored, writeStored } from '@/lib/storage'
import {
  DEFAULT_LOCALE,
  dictionaries,
  isLocale,
  translate,
  type TranslationKey,
  type TranslationVars,
} from './dictionaries'
import { LocaleContext, type LocaleContextValue } from './locale-context'

const STORAGE_KEY = 'tsk.locale'

function readInitialLocale(): Locale {
  const stored = readStored(STORAGE_KEY)
  return isLocale(stored) ? stored : DEFAULT_LOCALE
}

/**
 * Langue courante, persistée et reflétée sur `<html lang>`.
 *
 * Le français est le défaut : la langue du navigateur n'est volontairement
 * pas consultée, pour que le premier chargement soit identique pour tout le
 * monde et corresponde au script d'amorçage placé dans index.html.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    writeStored(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  const t = useCallback(
    (key: TranslationKey, vars?: TranslationVars) => translate(dictionaries[locale], key, vars),
    [locale],
  )

  const L = useCallback((text: LocalizedText) => text[locale], [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t, L }),
    [locale, setLocale, t, L],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}
