import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { transitions } from '@/lib/motion'
import type { Project } from '@/lib/types'
import { projectName } from '@/data/projects'
import { useI18n } from '@/i18n/useI18n'
import { Chip } from '@/components/ui/Chip'
import { ProjectLinks } from '@/components/ui/ProjectLinks'

/**
 * Showcase pleine largeur, réservé aux projets qui ont de la matière.
 *
 * Le sens de lecture alterne d'un projet à l'autre pour casser la
 * répétition, mais l'ordre du DOM reste constant — le texte précède toujours
 * l'image, donc au clavier comme au lecteur d'écran on lit le projet avant
 * de rencontrer sa capture.
 */
export function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const { t, L, locale } = useI18n()
  const name = projectName(project, locale)
  const isReversed = index % 2 === 1

  return (
    <motion.article
      layout="position"
      transition={transitions.layout}
      className="border-line bg-surface grid overflow-hidden rounded-lg border md:grid-cols-2"
    >
      <div
        className={cn(
          'flex flex-col justify-center gap-5 p-6 sm:p-8',
          isReversed && 'md:order-2',
        )}
      >
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="label-mono text-accent">{t('work.featuredLabel')}</span>
            {project.context !== undefined && (
              <>
                <span aria-hidden="true" className="bg-line h-3 w-px" />
                <span className="label-mono text-ink-3">{L(project.context)}</span>
              </>
            )}
          </div>

          <h3 className="type-h3 text-ink text-balance">{name}</h3>
        </div>

        <p className="type-body text-ink-2 text-pretty">{L(project.description)}</p>

        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((technology) => (
            <li key={technology}>
              <Chip>{technology}</Chip>
            </li>
          ))}
        </ul>

        <ProjectLinks project={project} />
      </div>

      <div
        className={cn(
          'bg-surface-2 border-line relative min-h-56 border-t md:min-h-0 md:border-t-0',
          isReversed ? 'md:order-1 md:border-r' : 'md:border-l',
        )}
      >
        <div aria-hidden="true" className="grid-veil absolute inset-0" />
        {project.image !== undefined ? (
          <img
            src={`/img/projects/${project.image}-1280.webp`}
            srcSet={`/img/projects/${project.image}-640.webp 640w, /img/projects/${project.image}-1280.webp 1280w`}
            sizes="(min-width: 768px) 38rem, 100vw"
            alt={t('work.screenshotOf', { project: name })}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-left-top"
          />
        ) : (
          <p className="label-mono text-ink-3 absolute inset-0 grid place-items-center">
            {t('work.noScreenshot')}
          </p>
        )}
      </div>
    </motion.article>
  )
}
