import { useRef, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { transitions } from '@/lib/motion'
import { SECTION_IDS, type SectionId } from '@/lib/types'
import { useI18n } from '@/i18n/useI18n'
import { useModalDialog } from '@/hooks/useModalDialog'
import { LocaleToggle } from '@/components/ui/LocaleToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const NAV_KEYS = {
  profil: 'nav.profil',
  projets: 'nav.projets',
  stack: 'nav.stack',
  parcours: 'nav.parcours',
  evenements: 'nav.evenements',
  contact: 'nav.contact',
} as const satisfies Record<SectionId, `nav.${SectionId}`>

interface MobileNavProps {
  open: boolean
  activeId: string | null
  onClose: () => void
}

/**
 * Menu mobile.
 *
 * Ce n'est pas la navigation desktop empilée : les cibles font 56 px de
 * haut, l'index de section est visible, et les réglages de langue et de
 * thème y sont présentés avec leurs libellés complets — c'est là qu'ils sont
 * le plus explicables, plutôt que serrés dans une barre de 320 px.
 *
 * Le panneau se comporte comme une boîte de dialogue : focus déplacé à
 * l'ouverture, tabulation confinée, Échap pour fermer, focus rendu au
 * déclencheur à la fermeture.
 */
export function MobileNav({ open, activeId, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const { t } = useI18n()

  useModalDialog(panelRef, open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="site-menu"
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t('a11y.mainNavigation')}
          ref={panelRef}
          tabIndex={-1}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={transitions.panel}
          className="bg-bg fixed inset-0 z-50 flex flex-col overflow-y-auto focus:outline-none"
        >
          <div className="border-line flex h-16 shrink-0 items-center justify-between border-b px-5 sm:px-8">
            <span className="label-mono text-ink-3">{t('a11y.sectionNavigation')}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('a11y.closeMenu')}
              className="border-line bg-surface-2 text-ink hover:border-line-strong inline-flex size-11 items-center justify-center rounded-md border transition-colors duration-150"
            >
              <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </button>
          </div>

          <nav aria-label={t('a11y.mainNavigation')} className="px-5 py-4 sm:px-8">
            <ul className="flex flex-col">
              {SECTION_IDS.map((id, index) => {
                const isActive = activeId === id

                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={onClose}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'border-line flex min-h-14 items-center gap-4 border-b transition-colors duration-150',
                        isActive ? 'text-ink' : 'text-ink-2 hover:text-ink',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn('label-mono', isActive ? 'text-accent' : 'text-ink-3')}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="type-h3">{t(NAV_KEYS[id])}</span>
                      {isActive && (
                        <span aria-hidden="true" className="bg-brand ml-auto size-1.5 rounded-full" />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-auto px-5 py-6 sm:px-8">
            <p className="label-mono text-ink-3 mb-4">{t('a11y.preferences')}</p>
            <div className="flex flex-col gap-3">
              <PreferenceRow label={t('locale.label')}>
                <LocaleToggle name="locale-mobile" />
              </PreferenceRow>
              <PreferenceRow label={t('theme.label')}>
                <ThemeToggle name="theme-mobile" />
              </PreferenceRow>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PreferenceRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-line bg-surface flex items-center justify-between gap-4 rounded-md border px-4 py-3">
      <span className="text-ink-2 text-sm">{label}</span>
      {children}
    </div>
  )
}
