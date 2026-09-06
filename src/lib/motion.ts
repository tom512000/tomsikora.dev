import type { Transition, Variants } from 'motion/react'

/**
 * Presets d'animation — source unique de vérité.
 *
 * Trois règles tenues partout :
 *  1. transform + opacity uniquement (composité GPU, jamais de reflow) ;
 *  2. durées courtes (150–400 ms) : l'animation accompagne, elle n'attend pas ;
 *  3. `prefers-reduced-motion` est géré globalement par <MotionConfig
 *     reducedMotion="user"> dans App, pas preset par preset.
 */

/** Même courbe que --ease-out-quart en CSS : cohérence CSS ↔ Motion. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const transitions = {
  /** Apparitions et transitions de contenu. */
  smooth: { duration: 0.38, ease: EASE_OUT },
  /** Réorganisations de liste (filtres projets). */
  layout: { type: 'spring', stiffness: 420, damping: 40, mass: 0.9 },
  /** Panneaux, feuilles, tiroirs. */
  panel: { type: 'spring', stiffness: 320, damping: 32, mass: 0.8 },
} satisfies Record<string, Transition>

/** Reveal standard : léger décalage vertical, jamais de scale sur du texte. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
}

/** Conteneur de séquence : cadence les enfants sans les animer lui-même. */
export function staggerContainer(stagger = 0.05, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}

/**
 * Fenêtre de déclenchement au scroll. `once` est systématique : rien ne se
 * rejoue quand on remonte, et le contenu reste lisible après passage.
 */
export const revealViewport = { once: true, amount: 0.2, margin: '0px 0px -12% 0px' } as const
