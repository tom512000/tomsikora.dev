import { useId } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE_OUT, transitions } from '@/lib/motion'
import type { Project } from '@/lib/types'
import { projectName } from '@/data/projects'
import { useI18n } from '@/i18n/useI18n'
import { Chip } from '@/components/ui/Chip'
import { ProjectLinks } from '@/components/ui/ProjectLinks'

const CATEGORY_KEYS = {
  professional: 'work.categoryProfessional',
  school: 'work.categorySchool',
  personal: 'work.categoryPersonal',
} as const

interface ProjectIndexRowProps {
  project: Project
  index: number
  isOpen: boolean
  onToggle: () => void
}

/**
 * Ligne de l'index des projets.
 *
 * Vingt-six projets scolaires en cartes identiques ne se lisent pas : ils se
 * scrollent. En index dense, on balaie les noms et les stacks, et on ouvre
 * ce qui intéresse. C'est un `disclosure` standard — bouton `aria-expanded`
 * pointant vers la région dépliée — donc utilisable au clavier sans code
 * spécifique.
 */
export function ProjectIndexRow({ project, index, isOpen, onToggle }: ProjectIndexRowProps) {
  const { t, L, locale } = useI18n()
  const panelId = useId()
  const name = projectName(project, locale)

  return (
    <motion.li layout="position" transition={transitions.layout} className="border-line border-b">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={
            isOpen
              ? t('work.collapse', { project: name })
              : t('work.expand', { project: name })
          }
          onClick={onToggle}
          className={cn(
            'group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 py-4 text-left sm:grid-cols-[2.5rem_1fr_minmax(0,18rem)_auto] sm:gap-4',
            'transition-colors duration-150',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'label-mono transition-colors duration-150',
              isOpen ? 'text-accent' : 'text-ink-3 group-hover:text-accent',
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="flex min-w-0 flex-col gap-1">
            <span className="text-ink truncate text-[0.9375rem] font-medium">{name}</span>
            <span className="label-mono text-ink-3 sm:hidden">
              {t(CATEGORY_KEYS[project.category])}
            </span>
          </span>

          <span className="label-mono text-ink-3 hidden truncate sm:block">
            {project.stack.slice(0, 4).join(' · ')}
          </span>

          <span
            aria-hidden="true"
            className={cn(
              'border-line text-ink-2 grid size-8 shrink-0 place-items-center rounded-sm border transition-colors duration-200',
              isOpen ? 'border-accent-line text-accent' : 'group-hover:border-line-strong',
            )}
          >
            {/* Seule l'icône pivote : faire tourner la boîte transformerait
                le carré en losange. */}
            <Plus
              className={cn(
                'size-4 transition-transform duration-200 ease-[var(--ease-out-quart)]',
                isOpen && 'rotate-45',
              )}
              strokeWidth={1.75}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="grid gap-5 pb-6 sm:grid-cols-[1fr_auto] sm:gap-8 sm:pl-[3.5rem]">
              <div className="flex flex-col gap-4">
                <p className="type-body text-ink-2 max-w-prose text-pretty">
                  {L(project.description)}
                </p>

                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((technology) => (
                    <li key={technology}>
                      <Chip>{technology}</Chip>
                    </li>
                  ))}
                </ul>

                <ProjectLinks project={project} size="sm" />
              </div>

              {project.image !== undefined && (
                <div className="border-line bg-surface-2 relative aspect-[16/10] w-full overflow-hidden rounded-md border sm:w-56">
                  <img
                    src={`/img/projects/${project.image}-640.webp`}
                    alt={t('work.screenshotOf', { project: name })}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover object-top"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
