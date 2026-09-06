import { useCallback, useState } from 'react'
import { Menu } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { transitions } from '@/lib/motion'
import { SECTION_IDS, type SectionId } from '@/lib/types'
import { useI18n } from '@/i18n/useI18n'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { LocaleToggle } from '@/components/ui/LocaleToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Container } from './Container'
import { MobileNav } from './MobileNav'
import { Wordmark } from './Wordmark'

const NAV_KEYS = {
  profil: 'nav.profil',
  projets: 'nav.projets',
  stack: 'nav.stack',
  parcours: 'nav.parcours',
  evenements: 'nav.evenements',
  contact: 'nav.contact',
} as const satisfies Record<SectionId, `nav.${SectionId}`>

/**
 * En-tête collant.
 *
 * Le passage desktop / mobile se fait en JavaScript plutôt qu'en CSS : cela
 * évite de monter deux fois les mêmes contrôles — donc deux indicateurs
 * animés partageant un `layoutId` — et garde un seul jeu d'éléments
 * focusables dans le document.
 */
export function Header() {
  const { t } = useI18n()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const activeId = useScrollSpy(SECTION_IDS)
  const [isMenuOpen, setMenuOpen] = useState(false)

  // Identité stable : l'effet de piège à focus du menu ne doit pas se
  // réarmer à chaque rendu de l'en-tête déclenché par le scroll-spy.
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  return (
    <>
      <header className="border-line bg-bg-veil fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Wordmark />

          {isDesktop ? (
            <>
              <nav aria-label={t('a11y.mainNavigation')}>
                <ul className="flex items-center gap-0.5">
                  {SECTION_IDS.map((id) => (
                    <li key={id}>
                      <NavLink id={id} label={t(NAV_KEYS[id])} isActive={activeId === id} />
                    </li>
                  ))}
                </ul>
              </nav>

              <div
                className="flex items-center gap-2"
                role="group"
                aria-label={t('a11y.preferences')}
              >
                <LocaleToggle name="locale-desktop" />
                <ThemeToggle name="theme-desktop" />
              </div>
            </>
          ) : (
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              aria-label={t('a11y.openMenu')}
              onClick={() => {
                setMenuOpen(true)
              }}
              className={cn(
                'border-line bg-surface-2 text-ink inline-flex size-11 items-center justify-center rounded-md border',
                'hover:border-line-strong transition-colors duration-150',
              )}
            >
              <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </button>
          )}
        </Container>
      </header>

      {!isDesktop && (
        <MobileNav open={isMenuOpen} activeId={activeId} onClose={closeMenu} />
      )}
    </>
  )
}

interface NavLinkProps {
  id: SectionId
  label: string
  isActive: boolean
}

function NavLink({ id, label, isActive }: NavLinkProps) {
  return (
    <a
      href={`#${id}`}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        'relative inline-flex items-center rounded-sm px-3 py-2 text-sm transition-colors duration-150',
        isActive ? 'text-ink font-medium' : 'text-ink-2 hover:text-ink',
      )}
    >
      {isActive && (
        <motion.span
          layoutId="nav-active"
          aria-hidden="true"
          className="bg-surface-2 border-line absolute inset-0 rounded-sm border"
          transition={transitions.layout}
        />
      )}
      <span className="relative">{label}</span>
    </a>
  )
}
