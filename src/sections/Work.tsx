import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { transitions } from '@/lib/motion'
import type { ProjectCategory } from '@/lib/types'
import { PROJECT_CATEGORIES, countProjectsByCategory, projects } from '@/data/projects'
import { useI18n } from '@/i18n/useI18n'
import { Container } from '@/components/layout/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { TabFilter, type TabOption } from '@/components/ui/TabFilter'
import { ProjectShowcase } from '@/components/project/ProjectShowcase'
import { ProjectIndexRow } from '@/components/project/ProjectIndexRow'

type Filter = ProjectCategory | 'all'

const FILTER_KEYS = {
  all: 'work.filterAll',
  professional: 'work.filterProfessional',
  personal: 'work.filterPersonal',
  school: 'work.filterSchool',
} as const

const PANEL_ID = 'projects-panel'

/**
 * Section projets.
 *
 * Hiérarchie à deux niveaux plutôt qu'une grille de trente-quatre cartes
 * identiques : les projets qui ont de la matière passent en showcase pleine
 * largeur, le reste alimente un index dense et dépliable. Le visiteur voit
 * d'abord ce qui compte, et garde accès à tout.
 */
export function Work() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [openProjectId, setOpenProjectId] = useState<string | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  const featured = visible.filter((project) => project.featured === true)
  const indexed = visible.filter((project) => project.featured !== true)

  const options: readonly TabOption<Filter>[] = [
    { value: 'all', label: t(FILTER_KEYS.all), count: projects.length },
    ...PROJECT_CATEGORIES.map((category) => ({
      value: category,
      label: t(FILTER_KEYS[category]),
      count: countProjectsByCategory(category),
    })),
  ]

  const onFilterChange = (next: Filter) => {
    setFilter(next)
    // Une ligne dépliée puis filtrée hors de la liste laisserait un état
    // fantôme au retour sur la catégorie : on referme.
    setOpenProjectId(null)
  }

  return (
    <Section id="projets" label={t('work.title')}>
      <Container className="flex flex-col gap-10 py-18 lg:gap-14 lg:py-24">
        <SectionHeader
          index={2}
          eyebrow={t('work.eyebrow')}
          title={t('work.title')}
          lead={t('work.lead', { count: projects.length })}
        />

        <Reveal>
          <TabFilter
            label={t('work.filterLabel')}
            panelId={PANEL_ID}
            value={filter}
            options={options}
            onChange={onFilterChange}
          />
        </Reveal>

        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`tab-${filter}`}
          tabIndex={-1}
          className="flex flex-col gap-14 focus:outline-none"
        >
          {visible.length === 0 && (
            <p className="type-body text-ink-2 border-line rounded-lg border border-dashed px-6 py-12 text-center">
              {t('work.empty')}
            </p>
          )}

          {featured.length > 0 && (
            <motion.div layout className="flex flex-col gap-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {featured.map((project, index) => (
                  <ProjectShowcase key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {indexed.length > 0 && (
            <motion.div layout transition={transitions.layout} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="label-mono text-ink-3">{t('work.indexTitle')}</h3>
                  <span className="label-mono text-ink-3">
                    {indexed.length === 1
                      ? t('work.countOne')
                      : t('work.countMany', { count: indexed.length })}
                  </span>
                </div>
                <p className="text-ink-3 text-[0.8125rem]">{t('work.indexHint')}</p>
              </div>

              <div className="border-line border-t">
                <div
                  aria-hidden="true"
                  className="border-line hidden grid-cols-[2.5rem_1fr_minmax(0,18rem)_2rem] gap-4 border-b py-2 sm:grid"
                >
                  <span className="label-mono text-ink-3">#</span>
                  <span className="label-mono text-ink-3">{t('work.indexColumnProject')}</span>
                  <span className="label-mono text-ink-3">{t('work.indexColumnStack')}</span>
                  <span />
                </div>

                <ul>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {indexed.map((project, index) => (
                      <ProjectIndexRow
                        key={project.id}
                        project={project}
                        index={index}
                        isOpen={openProjectId === project.id}
                        onToggle={() => {
                          setOpenProjectId((current) =>
                            current === project.id ? null : project.id,
                          )
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </Section>
  )
}
