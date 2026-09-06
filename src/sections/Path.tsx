import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Education, Experience } from '@/lib/types'
import { education, experiences } from '@/data/experience'
import { projectName, projects } from '@/data/projects'
import { useI18n } from '@/i18n/useI18n'
import { Container } from '@/components/layout/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'

/**
 * Section parcours.
 *
 * Le portfolio d'origine empilait expériences et diplômes dans un même bloc,
 * au même poids visuel. Les deux sont ici séparés et hiérarchisés : les
 * expériences professionnelles prennent une chronologie développée, la
 * formation reste une liste compacte — ce qu'un lead tech survole plutôt
 * qu'il n'étudie.
 */
export function Path() {
  const { t } = useI18n()

  return (
    <Section id="parcours" label={t('path.title')}>
      <Container className="flex flex-col gap-10 py-18 lg:gap-14 lg:py-24">
        <SectionHeader index={4} eyebrow={t('path.eyebrow')} title={t('path.title')} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="flex flex-col gap-5 lg:col-span-7">
            <Reveal>
              <h3 className="label-mono text-accent">{t('path.experienceTitle')}</h3>
            </Reveal>

            <RevealGroup as="ol" stagger={0.08} className="flex flex-col">
              {experiences.map((experience, index) => (
                <RevealItem as="li" key={experience.id}>
                  <ExperienceEntry
                    experience={experience}
                    isLast={index === experiences.length - 1}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <Reveal>
              <h3 className="label-mono text-ink-3">{t('path.educationTitle')}</h3>
            </Reveal>

            <RevealGroup as="ol" stagger={0.06} className="border-line flex flex-col border-t">
              {education.map((entry) => (
                <RevealItem as="li" key={entry.id}>
                  <EducationEntry entry={entry} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function ExperienceEntry({ experience, isLast }: { experience: Experience; isLast: boolean }) {
  const { t, L, locale } = useI18n()
  const isOngoing = experience.ongoing === true

  const related = (experience.relatedProjects ?? [])
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => project !== undefined)

  return (
    /*
     * `--node-axis` place le centre de la pastille sur la première ligne de
     * texte de l'entrée. La ligne et la pastille sont toutes deux ancrées sur
     * `left-0` : elles partagent donc exactement le même axe vertical.
     */
    <div
      className={cn('relative pl-9 [--node-axis:0.6875rem]', isLast ? 'pb-0' : 'pb-9')}
    >
      {/* La ligne relie le centre de CETTE pastille à celui de la suivante —
          d'où le débord bas de `--node-axis`, qui est exactement la distance
          entre le haut de l'entrée suivante et sa propre pastille. Un simple
          `border-l` couvrirait toute la boîte : il dépasserait en haut de la
          première pastille et s'arrêterait avant la dernière. */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="bg-line-strong absolute top-(--node-axis) bottom-[calc(-1*var(--node-axis))] left-0 w-px"
        />
      )}

      {/* Le demi-pixel n'est pas un ajustement à vue : la ligne d'1 px occupe
          [0, 1], son centre optique est donc à 0,5. La pastille s'aligne
          dessus, ce qui laisse la ligne sur la grille de pixels — nette,
          comme tous les autres filets du design. */}
      <span
        aria-hidden="true"
        className="absolute top-(--node-axis) left-[0.5px] -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className={cn(
            'block size-2.5 rounded-full border-2',
            isOngoing
              ? 'bg-brand border-bg ring-accent-halo ring-4'
              : 'bg-surface-3 border-bg ring-line ring-1',
          )}
        />
      </span>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="label-mono text-ink-3" data-numeric="">
            {L(experience.period)}
          </span>
          {isOngoing && (
            <span className="label-mono border-accent-line bg-accent-soft text-accent rounded-xs border px-1.5 py-0.5">
              {t('path.ongoing')}
            </span>
          )}
        </div>

        <h4 className="type-h3 text-ink text-balance">{L(experience.role)}</h4>

        <p className="text-ink-2 text-sm">
          {experience.organisationHref === undefined ? (
            <span className="text-ink font-medium">{experience.organisation}</span>
          ) : (
            <a
              href={experience.organisationHref}
              target="_blank"
              rel="noreferrer noopener"
              className="text-ink hover:text-accent inline-flex items-center gap-0.5 font-medium transition-colors duration-150"
            >
              {experience.organisation}
              <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
              <span className="sr-only"> ({t('a11y.newTab')})</span>
            </a>
          )}
          <span className="text-ink-3"> · {experience.location}</span>
        </p>

        {experience.summary !== undefined && (
          <p className="type-body text-ink-2">{L(experience.summary)}</p>
        )}

        {related.length > 0 && (
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="label-mono text-ink-3">{t('path.relatedProjects')}</span>
            <ul className="flex flex-wrap gap-x-2 gap-y-1">
              {related.map((project) => (
                <li key={project.id} className="text-ink-2 text-[0.8125rem]">
                  {projectName(project, locale)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function EducationEntry({ entry }: { entry: Education }) {
  const { t, L } = useI18n()

  return (
    <div className="border-line flex flex-col gap-1 border-b py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h4 className="text-ink min-w-0 flex-1 text-[0.9375rem] font-medium text-balance">
          {L(entry.degree)}
        </h4>
        <span className="label-mono text-ink-3 shrink-0" data-numeric="">
          {entry.period}
        </span>
      </div>

      {entry.detail !== undefined && (
        <p className="text-ink-2 text-[0.8125rem]">{L(entry.detail)}</p>
      )}

      <p className="text-ink-3 text-[0.8125rem]">
        {entry.institutionHref === undefined ? (
          entry.institution
        ) : (
          <a
            href={entry.institutionHref}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-accent inline-flex items-center gap-0.5 transition-colors duration-150"
          >
            {entry.institution}
            <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.75} />
            <span className="sr-only"> ({t('a11y.newTab')})</span>
          </a>
        )}
        {' · '}
        {entry.location}
      </p>
    </div>
  )
}
