import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { transitions } from '@/lib/motion'

export interface SegmentOption<T extends string> {
  value: T
  /** Texte visible. Omis pour un segment purement iconique. */
  label?: string
  /** Nom accessible complet — toujours une action explicite. */
  srLabel: string
  icon?: LucideIcon
}

interface SegmentedControlProps<T extends string> {
  /** Identifie l'indicateur animé : unique par instance montée. */
  name: string
  /** Nom du groupe pour les technologies d'assistance. */
  label: string
  value: T
  options: readonly SegmentOption<T>[]
  onChange: (value: T) => void
  className?: string
}

/**
 * Contrôle segmenté — la forme partagée par les réglages de thème et de
 * langue. Les deux préférences se ressemblent parce qu'elles sont de même
 * nature : un état courant visible, et une alternative à un clic.
 *
 * Chaque segment est un vrai `<button>` : tabulation, Entrée et Espace
 * fonctionnent sans code clavier ad hoc. `aria-pressed` porte l'état, le
 * `srLabel` porte l'action.
 */
export function SegmentedControl<T extends string>({
  name,
  label,
  value,
  options,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'border-line bg-surface-2 relative inline-flex items-center gap-0.5 rounded-md border p-0.5',
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value
        const Icon = option.icon

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            aria-label={option.srLabel}
            onClick={() => {
              onChange(option.value)
            }}
            className={cn(
              'relative inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-sm px-2',
              'transition-colors duration-150 ease-[var(--ease-out-quart)]',
              isActive ? 'text-ink' : 'text-ink-3 hover:text-ink-2',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`segment-${name}`}
                aria-hidden="true"
                className="bg-surface border-line-strong absolute inset-0 rounded-sm border shadow-xs"
                transition={transitions.layout}
              />
            )}
            {Icon !== undefined && (
              <Icon aria-hidden="true" className="relative size-4" strokeWidth={1.75} />
            )}
            {option.label !== undefined && (
              <span className="label-mono relative">{option.label}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
