import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useI18n } from '@/i18n/useI18n'

/**
 * Progression de lecture — repris du portfolio d'origine, mais animé par
 * `scaleX` sur une MotionValue : aucune mise en page recalculée pendant le
 * défilement, là où l'ancienne version écrivait `style.width` à chaque
 * événement de scroll.
 *
 * Purement décoratif (`aria-hidden`) : l'information de position est déjà
 * portée par l'état actif de la navigation.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()
  const { t } = useI18n()

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      title={t('a11y.readingProgress')}
      style={{ scaleX: prefersReducedMotion === true ? scrollYProgress : smoothed }}
      className="bg-brand pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
    />
  )
}
