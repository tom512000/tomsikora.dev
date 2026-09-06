import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { fadeUp, revealViewport, staggerContainer } from '@/lib/motion'

/**
 * Les composants de reveal acceptent une balise pour rester sémantiques
 * (`li` dans une liste, `article` pour un projet…).
 *
 * La table est figée au niveau du module : les composants `motion` ne sont
 * jamais créés pendant le rendu, donc leur identité ne change pas et l'état
 * des enfants n'est pas réinitialisé. Le transtypage unique vers
 * `motion.div` évite une union de types de composants en JSX — toutes les
 * variantes de `motion` partagent la même signature de props.
 */
const TAGS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
} as Record<Tag, typeof motion.div>

type Tag = 'div' | 'ul' | 'ol' | 'li'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Décale l'entrée, pour ordonner deux blocs voisins. */
  delay?: number
  as?: Tag
}

/**
 * Apparition au scroll, jouée une seule fois.
 *
 * Le contenu est dans le DOM dès le départ : l'animation ne porte que
 * l'opacité et la translation, jamais l'existence de l'information.
 * `prefers-reduced-motion` est neutralisé en amont par <MotionConfig
 * reducedMotion="user">, qui conserve le fondu et supprime le déplacement.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Component = TAGS[as]

  return (
    <Component
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      {...(delay > 0 ? { transition: { delay } } : {})}
    >
      {children}
    </Component>
  )
}

interface RevealGroupProps {
  children: ReactNode
  className?: string
  stagger?: number
  as?: Tag
}

/** Séquence les enfants `<RevealItem>` sans s'animer lui-même. */
export function RevealGroup({ children, className, stagger = 0.05, as = 'div' }: RevealGroupProps) {
  const Component = TAGS[as]

  return (
    <Component
      className={className}
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Component>
  )
}

interface RevealItemProps {
  children: ReactNode
  className?: string
  as?: Tag
}

export function RevealItem({ children, className, as = 'div' }: RevealItemProps) {
  const Component = TAGS[as]

  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  )
}
