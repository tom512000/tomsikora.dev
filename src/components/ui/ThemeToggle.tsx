import { Moon, Sun } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import { useTheme } from '@/theme/useTheme'
import type { Theme } from '@/lib/types'
import { SegmentedControl, type SegmentOption } from './SegmentedControl'

/** Réglage du thème. `name` distingue les instances montées simultanément. */
export function ThemeToggle({ name }: { name: string }) {
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()

  const options: readonly SegmentOption<Theme>[] = [
    { value: 'light', srLabel: t('theme.switchToLight'), icon: Sun },
    { value: 'dark', srLabel: t('theme.switchToDark'), icon: Moon },
  ]

  return (
    <SegmentedControl
      name={name}
      label={t('theme.label')}
      value={theme}
      options={options}
      onChange={setTheme}
    />
  )
}
