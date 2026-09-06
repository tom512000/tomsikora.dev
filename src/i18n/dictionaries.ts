import { LOCALES, type Locale } from '@/lib/types'
import { fr } from './fr'
import { en } from './en'

/** Élargit les littéraux de `fr` en `string` : les autres langues ne sont
 *  pas tenues d'employer exactement les mêmes chaînes, seulement les mêmes
 *  clés. */
type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> }

export type Dictionary = Widen<typeof fr>

/** Union de toutes les clés terminales, en notation pointée. */
type Leaves<T, Prefix extends string = ''> = T extends string
  ? Prefix
  : {
      [K in keyof T & string]: Leaves<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>
    }[keyof T & string]

export type TranslationKey = Leaves<Dictionary>

/** Valeurs injectables dans les segments `{nom}` d'une traduction. */
export type TranslationVars = Record<string, string | number>

export const dictionaries: Record<Locale, Dictionary> = { fr, en }

export const DEFAULT_LOCALE: Locale = 'fr'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

/**
 * Résout une clé pointée puis remplace les segments `{nom}`.
 * En cas de clé absente — impossible via TypeScript, possible via une
 * donnée dynamique — la clé elle-même est renvoyée, ce qui rend le
 * problème visible plutôt que silencieux.
 */
export function translate(
  dictionary: Dictionary,
  key: TranslationKey,
  vars?: TranslationVars,
): string {
  let current: unknown = dictionary

  for (const segment of key.split('.')) {
    if (typeof current !== 'object' || current === null) return key
    current = (current as Record<string, unknown>)[segment]
  }

  if (typeof current !== 'string') return key
  if (!vars) return current

  return current.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  )
}
