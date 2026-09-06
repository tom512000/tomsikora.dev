import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Étiquette de techno. Volontairement discrète : dans une stack de dix
 * entrées, dix pastilles vertes ne hiérarchisent plus rien — l'accent reste
 * réservé au socle principal, présenté dans la section Stack.
 */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'label-mono border-line bg-surface-2 text-ink-2 inline-flex items-center rounded-xs border px-1.5 py-1',
        className,
      )}
    >
      {children}
    </span>
  )
}
