import { useContext } from 'react'
import { LightboxContext, type LightboxContextValue } from './lightbox-context'

/**
 * Renvoie `null` hors du provider — l'appelant décide alors de ne pas
 * proposer l'agrandissement, ce qui évite de rendre le provider obligatoire
 * partout où une image est affichée.
 */
export function useLightbox(): LightboxContextValue | null {
  return useContext(LightboxContext)
}
