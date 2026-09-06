import { useRef } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { transitions } from '@/lib/motion'

export interface TabOption<T extends string> {
  value: T
  label: string
  count: number
}

interface TabFilterProps<T extends string> {
  label: string
  panelId: string
  value: T
  options: readonly TabOption<T>[]
  onChange: (value: T) => void
  className?: string
}

/**
 * Filtre de catégories, implémenté comme un vrai `tablist`.
 *
 * Le motif ARIA impose un tabindex glissant : un seul onglet est atteignable
 * à la tabulation, les flèches circulent entre les onglets. L'activation est
 * automatique au déplacement du focus, ce qui est le comportement attendu
 * quand le changement de panneau est instantané.
 */
export function TabFilter<T extends string>({
  label,
  panelId,
  value,
  options,
  onChange,
  className,
}: TabFilterProps<T>) {
  const listRef = useRef<HTMLDivElement>(null)

  const focusTab = (index: number) => {
    const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    tabs?.[index]?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = options.findIndex((option) => option.value === value)
    if (currentIndex === -1) return

    const lastIndex = options.length - 1
    let nextIndex: number

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1
        break
      case 'ArrowLeft':
        nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = lastIndex
        break
      default:
        return
    }

    const next = options[nextIndex]
    if (next === undefined) return

    event.preventDefault()
    onChange(next.value)
    focusTab(nextIndex)
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn(
        'border-line bg-surface-2 inline-flex flex-wrap items-center gap-0.5 rounded-md border p-1',
        className,
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            id={`tab-${option.value}`}
            aria-selected={isSelected}
            aria-controls={panelId}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => {
              onChange(option.value)
            }}
            className={cn(
              'relative inline-flex min-h-9 items-center gap-2 rounded-sm px-3 py-1.5 text-sm',
              'transition-colors duration-150 ease-[var(--ease-out-quart)]',
              isSelected ? 'text-ink font-medium' : 'text-ink-2 hover:text-ink',
            )}
          >
            {isSelected && (
              <motion.span
                layoutId="tab-filter-active"
                aria-hidden="true"
                className="bg-surface border-line-strong absolute inset-0 rounded-sm border shadow-xs"
                transition={transitions.layout}
              />
            )}
            <span className="relative">{option.label}</span>
            <span
              aria-hidden="true"
              className={cn(
                'label-mono relative transition-colors duration-150',
                isSelected ? 'text-accent' : 'text-ink-3',
              )}
            >
              {option.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
