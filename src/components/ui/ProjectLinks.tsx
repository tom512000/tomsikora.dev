import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './BrandIcon'
import { cn } from '@/lib/cn'
import type { Project } from '@/lib/types'
import { projectName } from '@/data/projects'
import { useI18n } from '@/i18n/useI18n'

/**
 * Liens d'un projet.
 *
 * Chaque lien porte un nom accessible complet (« Dépôt front de BUTDLE »)
 * plutôt qu'un « GitHub » répété trente fois dans la liste des liens d'une
 * page — c'est la différence entre une liste de liens utilisable au lecteur
 * d'écran et une liste inexploitable.
 */
export function ProjectLinks({
  project,
  size = 'md',
  className,
}: {
  project: Project
  size?: 'sm' | 'md'
  className?: string
}) {
  const { t, locale } = useI18n()
  const name = projectName(project, locale)

  if (project.links.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {project.links.map((link) => {
        const label = typeof link.label === 'string' ? link.label : link.label?.[locale]
        const Icon = link.kind === 'repository' ? GithubIcon : ExternalLink
        const accessibleName =
          link.kind === 'repository'
            ? t('work.repositoryOf', { label: label ?? '', project: name })
            : t('work.liveOf', { label: label ?? '', project: name })

        const visibleLabel =
          label ??
          (link.kind === 'repository' ? t('work.viewRepository') : t('work.viewLive'))

        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${accessibleName.replace(/\s+/g, ' ').trim()} (${t('a11y.newTab')})`}
              className={cn(
                'border-line bg-surface text-ink-2 inline-flex items-center gap-1.5 rounded-sm border',
                'hover:border-accent-line hover:text-accent transition-colors duration-150',
                size === 'sm' ? 'min-h-8 px-2 py-1' : 'min-h-9 px-2.5 py-1.5',
              )}
            >
              <Icon aria-hidden="true" className="size-3.5" />
              <span className="label-mono">{visibleLabel}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
