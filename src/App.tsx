import { MotionConfig } from 'motion/react'
import { useI18n } from '@/i18n/useI18n'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { SkipLink } from '@/components/layout/SkipLink'
import { Hero } from '@/sections/Hero'
import { Work } from '@/sections/Work'
import { Stack } from '@/sections/Stack'
import { Path } from '@/sections/Path'
import { Events } from '@/sections/Events'
import { Contact } from '@/sections/Contact'

/**
 * `reducedMotion="user"` est le seul endroit du projet où
 * `prefers-reduced-motion` est traité : Motion neutralise alors toutes les
 * animations de transformation et ne conserve que les fondus. Les composants
 * n'ont donc pas à s'en préoccuper individuellement.
 */
export function App() {
  const { locale, t } = useI18n()

  useDocumentMeta(locale, t('meta.title'), t('meta.description'))

  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <Work />
        <Stack />
        <Path />
        <Events />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}
