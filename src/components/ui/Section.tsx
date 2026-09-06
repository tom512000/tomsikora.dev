import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { SectionId } from '@/lib/types'
import { Reveal } from './Reveal'

interface SectionProps {
  id: SectionId
  children: ReactNode
  className?: string
  /** Nom accessible de la région, repris du titre visible. */
  label: string
}

/**
 * Enveloppe de section : région repérable, ancre compensée, largeur de
 * lecture commune. `tabIndex={-1}` permet au focus d'atterrir ici après un
 * saut d'ancre, condition d'une navigation clavier cohérente.
 */
export function Section({ id, children, className, label }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      tabIndex={-1}
      className={cn('scroll-mt-20 focus:outline-none', className)}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  /** Rang de la section, affiché en index technique (« 02 »). */
  index: number
  eyebrow: string
  title: string
  lead?: string
  /** Contrôles alignés à droite du filet, sur les écrans larges. */
  aside?: ReactNode
  className?: string
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  aside,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-6', className)}>
      <Reveal className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="label-mono text-accent" aria-hidden="true">
            {String(index).padStart(2, '0')}
          </span>
          <span className="label-mono text-ink-3">{eyebrow}</span>
          <span className="rule-fade flex-1" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 className="type-h2 text-ink max-w-2xl text-balance">{title}</h2>
          {aside !== undefined && <div className="shrink-0">{aside}</div>}
        </div>

        {lead !== undefined && (
          <p className="type-lead text-ink-2 max-w-2xl text-pretty">{lead}</p>
        )}
      </Reveal>
    </header>
  )
}
