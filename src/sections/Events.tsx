import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { ItEvent } from '@/lib/types'
import { events } from '@/data/events'
import { useI18n } from '@/i18n/useI18n'
import { Container } from '@/components/layout/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'

/**
 * Section événements.
 *
 * Liste éditoriale plutôt que grille de vignettes : cinq entrées larges se
 * lisent, dix petites cartes se survolent. Le bloc de résultats n'apparaît
 * que lorsque les classements existent réellement — l'édition 2024 des 24h
 * Info n'en a pas, elle n'en affiche donc pas.
 */
export function Events() {
  const { t } = useI18n()

  return (
    <Section id="evenements" label={t('events.title')} className="border-line bg-surface-2 border-y">
      <Container className="flex flex-col gap-10 py-18 lg:gap-14 lg:py-24">
        <SectionHeader
          index={5}
          eyebrow={t('events.eyebrow')}
          title={t('events.title')}
          lead={t('events.lead')}
        />

        <RevealGroup as="ol" stagger={0.07} className="flex flex-col gap-5">
          {events.map((event) => (
            <RevealItem as="li" key={event.id}>
              <EventCard event={event} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}

function EventCard({ event }: { event: ItEvent }) {
  const { t, L } = useI18n()

  return (
    <article className="border-line bg-surface grid overflow-hidden rounded-lg border md:grid-cols-[16rem_1fr] lg:grid-cols-[20rem_1fr]">
      <div className="bg-surface-3 border-line relative aspect-[16/10] border-b md:aspect-auto md:border-r md:border-b-0">
        <img
          src={`/img/events/${event.image}-600.webp`}
          srcSet={`/img/events/${event.image}-600.webp 600w, /img/events/${event.image}-1200.webp 1200w`}
          sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, 100vw"
          alt={t('events.imageOf', { event: event.name })}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 p-6 sm:p-7">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <time dateTime={event.datetime} className="label-mono text-ink-3">
              {L(event.date)}
            </time>
            <span aria-hidden="true" className="bg-line h-3 w-px" />
            <span className="label-mono border-accent-line bg-accent-soft text-accent rounded-xs border px-1.5 py-0.5">
              {L(event.role)}
            </span>
          </div>

          <h3 className="type-h3 text-ink">
            <a
              href={event.href}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-accent inline-flex items-center gap-1 transition-colors duration-150"
            >
              {event.name}
              <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              <span className="sr-only">
                {' '}
                — {t('events.visitSite')} ({t('a11y.newTab')})
              </span>
            </a>
          </h3>

          <p className="text-ink-3 text-[0.8125rem]">{L(event.venue)}</p>
        </div>

        <p className="type-body text-ink-2 max-w-prose text-pretty">{L(event.summary)}</p>

        {event.results !== undefined && (
          <div className="border-line mt-1 border-t pt-4">
            <h4 className="label-mono text-ink-3 mb-3">{t('events.resultsTitle')}</h4>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
              {event.results.map((result) => (
                <div key={result.value + L(result.label)} className="flex flex-col gap-1">
                  <dt className="label-mono text-ink-3">{L(result.label)}</dt>
                  <dd
                    data-numeric=""
                    className={cn(
                      'text-sm font-medium',
                      result.highlight === true ? 'text-accent' : 'text-ink',
                    )}
                  >
                    {result.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </article>
  )
}
