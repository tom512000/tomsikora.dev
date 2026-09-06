import { useI18n } from '@/i18n/useI18n'

/**
 * Premier élément focusable du document : permet d'atteindre le contenu sans
 * traverser la navigation au clavier. Invisible tant qu'il n'a pas le focus.
 */
export function SkipLink() {
  const { t } = useI18n()

  return (
    <a
      href="#profil"
      className="bg-brand text-brand-fg sr-only rounded-md px-4 py-2.5 text-sm font-semibold focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-100"
    >
      {t('a11y.skipToContent')}
    </a>
  )
}
