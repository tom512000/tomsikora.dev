import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/useI18n'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'

/**
 * Bloc « à propos », rattaché à la section Profil plutôt qu'isolé : c'est la
 * suite naturelle du hero, pas une étape de plus dans la navigation.
 *
 * Composition éditoriale asymétrique — le titre tient une colonne étroite à
 * gauche, le texte occupe une colonne de lecture confortable à droite.
 */
export function About() {
  const { t, L } = useI18n()

  return (
    <Container className="pb-16 lg:pb-20">
      <div className="rule-fade mb-10 lg:mb-14" aria-hidden="true" />

      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-4 lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="label-mono text-accent" aria-hidden="true">
              01
            </span>
            <span className="label-mono text-ink-3">{t('about.eyebrow')}</span>
          </div>
          <h2 className="type-h3 text-ink text-balance">{t('about.title')}</h2>
        </Reveal>

        <RevealGroup className="flex flex-col gap-5 lg:col-span-7 lg:col-start-6" stagger={0.07}>
          {profile.about.map((paragraph) => (
            <RevealItem key={paragraph.fr}>
              <p className="type-body text-ink-2 max-w-prose text-pretty">{L(paragraph)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Container>
  )
}
