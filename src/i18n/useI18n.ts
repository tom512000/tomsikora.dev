import { useContext } from 'react'
import { LocaleContext, type LocaleContextValue } from './locale-context'

/** Accès à la langue courante, aux libellés (`t`) et au contenu traduit (`L`). */
export function useI18n(): LocaleContextValue {
  const context = useContext(LocaleContext)

  if (context === null) {
    throw new Error('useI18n doit être utilisé dans un <LocaleProvider>.')
  }

  return context
}
