import { useEffect } from 'react'

/**
 * Bloque le défilement de la page derrière une surface modale.
 *
 * La largeur de la barre de défilement est compensée en padding pour éviter
 * le saut horizontal du contenu à l'ouverture.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingInlineEnd
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingInlineEnd = `${String(scrollbar)}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingInlineEnd = previousPadding
    }
  }, [locked])
}
