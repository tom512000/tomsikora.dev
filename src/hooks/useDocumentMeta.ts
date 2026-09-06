import { useEffect } from 'react'
import type { Locale } from '@/lib/types'

const OG_LOCALE: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
}

function setMeta(selector: string, content: string): void {
  document.querySelector(selector)?.setAttribute('content', content)
}

/**
 * Aligne les métadonnées du document sur la langue active.
 *
 * `<html lang>` est géré par LocaleProvider ; ce hook s'occupe du titre et
 * des métadonnées sociales. Le site reste une SPA mono-URL : pas d'`hreflang`
 * ni d'URL par langue, ce qui serait un faux signal pour les moteurs.
 */
export function useDocumentMeta(locale: Locale, title: string, description: string): void {
  useEffect(() => {
    document.title = title

    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:image:alt"]', title)
    setMeta('meta[property="og:locale"]', OG_LOCALE[locale])
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
  }, [locale, title, description])
}
