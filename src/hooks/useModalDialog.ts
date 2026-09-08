import { useEffect, type RefObject } from 'react'
import { useLockBodyScroll } from './useLockBodyScroll'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Comportement partagé des surfaces modales : défilement de la page bloqué,
 * focus déplacé sur le panneau à l'ouverture, tabulation confinée à
 * l'intérieur, Échap pour fermer, focus rendu au déclencheur à la fermeture.
 *
 * Une seule implémentation pour le menu mobile et la visionneuse d'image :
 * un piège à focus est trop facile à écrire de travers pour en tenir deux.
 */
export function useModalDialog(
  panelRef: RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
): void {
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || panelRef.current === null) return

      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      const first = focusables[0]
      const last = focusables.at(-1)
      if (first === undefined || last === undefined) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [open, onClose, panelRef])
}
