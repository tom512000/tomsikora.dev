import { cn } from '@/lib/cn'

/**
 * Signature du site. Le monogramme reprend la logique de fiche technique :
 * un carré au filet accentué, deux lettres en monospace. Le domaine complet
 * n'apparaît qu'à partir du moment où il y a la place pour le lire — le nom
 * accessible, lui, reste constant.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <a
      href="#profil"
      aria-label="Tom SIKORA — tomsikora.dev"
      className={cn(
        'group text-ink inline-flex items-center gap-2.5 rounded-sm transition-colors duration-150',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'label-mono border-line-strong text-ink grid size-8 shrink-0 place-items-center rounded-sm border',
          'group-hover:border-accent-line group-hover:text-accent transition-colors duration-150',
        )}
      >
        TS
      </span>
      <span aria-hidden="true" className="hidden text-sm font-medium tracking-tight sm:inline">
        tomsikora
        <span className="text-ink-3 group-hover:text-accent transition-colors duration-150">
          .dev
        </span>
      </span>
    </a>
  )
}
