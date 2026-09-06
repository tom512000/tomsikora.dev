import { useI18n } from '@/i18n/useI18n'
import type { Locale } from '@/lib/types'
import { SegmentedControl, type SegmentOption } from './SegmentedControl'

/**
 * Réglage de la langue. Les deux codes restent affichés : l'utilisateur voit
 * l'état courant et l'alternative, sans avoir à deviner ce que déclenche un
 * bouton unique.
 */
export function LocaleToggle({ name }: { name: string }) {
  const { locale, setLocale, t } = useI18n()

  const options: readonly SegmentOption<Locale>[] = [
    { value: 'fr', label: 'FR', srLabel: t('locale.switchToFr') },
    { value: 'en', label: 'EN', srLabel: t('locale.switchToEn') },
  ]

  return (
    <SegmentedControl
      name={name}
      label={t('locale.label')}
      value={locale}
      options={options}
      onChange={setLocale}
    />
  )
}
