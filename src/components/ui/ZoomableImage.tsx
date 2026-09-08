import { Expand } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useI18n } from '@/i18n/useI18n'
import { useLightbox } from './useLightbox'

interface ZoomableImageProps {
  src: string
  srcSet?: string
  sizes?: string
  alt: string
  /** Variante la plus grande : c'est elle qu'ouvre la visionneuse. */
  full: string
  /** Nom de fichier proposé au téléchargement. */
  downloadName: string
  /** Cadrage de l'image (object-fit et object-position). */
  className?: string
}

/**
 * Image cliquable qui s'ouvre dans la visionneuse.
 *
 * Le déclencheur est un vrai `<button>` : l'agrandissement est donc
 * atteignable au clavier, pas seulement à la souris. L'image reste posée en
 * absolu comme avant, c'est le bouton qui porte le positionnement.
 *
 * Hors provider, le composant se dégrade en simple image plutôt que d'exiger
 * un contexte partout.
 */
export function ZoomableImage({
  src,
  srcSet,
  sizes,
  alt,
  full,
  downloadName,
  className,
}: ZoomableImageProps) {
  const lightbox = useLightbox()
  const { t } = useI18n()

  const image = (
    <img
      src={src}
      {...(srcSet === undefined ? {} : { srcSet })}
      {...(sizes === undefined ? {} : { sizes })}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn('size-full', className)}
    />
  )

  if (lightbox === null) {
    return <span className="absolute inset-0">{image}</span>
  }

  return (
    <button
      type="button"
      onClick={() => {
        lightbox.open({ src: full, alt, downloadName })
      }}
      aria-label={t('lightbox.open', { image: alt })}
      className="group absolute inset-0 cursor-zoom-in"
    >
      {image}

      {/* Indice d'interaction, discret : il n'apparaît qu'au survol ou au focus. */}
      <span
        aria-hidden="true"
        className={cn(
          'border-line-strong bg-surface/90 text-ink absolute right-3 bottom-3 grid size-9 place-items-center rounded-md border backdrop-blur-sm',
          'opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100',
        )}
      >
        <Expand className="size-4" strokeWidth={1.75} />
      </span>
    </button>
  )
}
