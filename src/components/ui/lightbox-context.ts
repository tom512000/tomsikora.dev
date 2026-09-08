import { createContext } from 'react'

/** Une image telle que la visionneuse a besoin de la connaître. */
export interface LightboxImage {
  /** Variante la plus grande disponible : c'est elle qu'on agrandit. */
  src: string
  alt: string
  /** Nom de fichier proposé au téléchargement. */
  downloadName: string
}

export interface LightboxContextValue {
  open: (image: LightboxImage) => void
}

/**
 * `null` hors du provider : `ZoomableImage` s'en sert pour se dégrader en
 * simple image plutôt que de lever une erreur.
 */
export const LightboxContext = createContext<LightboxContextValue | null>(null)
