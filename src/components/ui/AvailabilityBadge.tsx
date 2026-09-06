import { cn } from '@/lib/cn'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/useI18n'

/**
 * État de disponibilité.
 *
 * La pastille n'est pas le seul porteur d'information : le libellé complet
 * est toujours lisible, et la couleur ne fait que le doubler. Elle ne
 * clignote pas — une animation permanente en haut de page fatigue plus
 * qu'elle n'informe.
 */
export function AvailabilityBadge({ className }: { className?: string }) {
  const { L, t } = useI18n()
  const { open, headline, detail } = profile.availability

  return (
    <div
      className={cn(
        'border-line bg-surface inline-flex max-w-full items-center gap-2.5 rounded-md border py-2 pr-3.5 pl-3',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-2 shrink-0 rounded-full',
          open ? 'bg-brand ring-accent-halo ring-4' : 'bg-ink-3',
        )}
      />
      <span className="label-mono text-ink-3 hidden sm:inline">{t('hero.availableLabel')}</span>
      <span aria-hidden="true" className="bg-line hidden h-3.5 w-px sm:inline-block" />
      <span className="text-ink text-sm font-medium">{L(headline)}</span>
      <span className="sr-only">— {L(detail)}</span>
    </div>
  )
}
