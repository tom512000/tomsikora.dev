import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Download, FlipHorizontal, FlipVertical, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react'
import { cn } from '@/lib/cn'
import { transitions } from '@/lib/motion'
import { useI18n } from '@/i18n/useI18n'
import { useModalDialog } from '@/hooks/useModalDialog'
import { LightboxContext, type LightboxContextValue, type LightboxImage } from './lightbox-context'

/** Paliers de zoom : discrets et prévisibles, plutôt qu'un facteur continu. */
const SCALES = [1, 1.5, 2, 3, 4]

interface Transform {
  scaleIndex: number
  flipX: boolean
  flipY: boolean
  offsetX: number
  offsetY: number
}

const NEUTRAL: Transform = { scaleIndex: 0, flipX: false, flipY: false, offsetX: 0, offsetY: 0 }

/**
 * Visionneuse d'image partagée par toute la page.
 *
 * Une seule boîte de dialogue vit dans le document : les images n'ouvrent
 * pas chacune la leur. Le portrait du hero en est délibérément absent, la
 * section Stack aussi — ses logos sont le contenu de liens vers les sites
 * des technologies, les rendre cliquables casserait le lien.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<LightboxImage | null>(null)
  const [transform, setTransform] = useState<Transform>(NEUTRAL)

  const open = useCallback((next: LightboxImage) => {
    setTransform(NEUTRAL)
    setImage(next)
  }, [])

  const close = useCallback(() => {
    setImage(null)
  }, [])

  const value = useMemo<LightboxContextValue>(() => ({ open }), [open])

  return (
    <LightboxContext value={value}>
      {children}
      <AnimatePresence>
        {image !== null && (
          <Viewer
            image={image}
            transform={transform}
            onTransform={setTransform}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </LightboxContext>
  )
}

interface ViewerProps {
  image: LightboxImage
  transform: Transform
  onTransform: (next: Transform) => void
  onClose: () => void
}

function Viewer({ image, transform, onTransform, onClose }: ViewerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const dragOrigin = useRef<{ x: number; y: number } | null>(null)
  const hasMoved = useRef(false)
  const [panning, setPanning] = useState(false)
  const { t } = useI18n()

  useModalDialog(panelRef, true, onClose)

  const scale = SCALES[transform.scaleIndex] ?? 1
  const canZoomIn = transform.scaleIndex < SCALES.length - 1
  const canZoomOut = transform.scaleIndex > 0
  const isNeutral =
    transform.scaleIndex === 0 && !transform.flipX && !transform.flipY

  const zoom = useCallback(
    (direction: 1 | -1) => {
      const nextIndex = Math.min(
        Math.max(transform.scaleIndex + direction, 0),
        SCALES.length - 1,
      )
      // Revenir à l'échelle 1 recentre : une image ajustée n'a pas de raison
      // de rester décalée par un déplacement fait pendant le zoom.
      const recentre = nextIndex === 0
      onTransform({
        ...transform,
        scaleIndex: nextIndex,
        offsetX: recentre ? 0 : transform.offsetX,
        offsetY: recentre ? 0 : transform.offsetY,
      })
    },
    [transform, onTransform],
  )

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    hasMoved.current = false
    if (scale === 1) return
    dragOrigin.current = {
      x: event.clientX - transform.offsetX,
      y: event.clientY - transform.offsetY,
    }
    setPanning(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const origin = dragOrigin.current
    if (origin === null) return
    hasMoved.current = true
    onTransform({
      ...transform,
      offsetX: event.clientX - origin.x,
      offsetY: event.clientY - origin.y,
    })
  }

  const endPan = () => {
    dragOrigin.current = null
    setPanning(false)
  }

  /** Le fond ferme, l'image non — et un glissement ne ferme jamais. */
  const onStageClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (hasMoved.current) return
    if (event.target === event.currentTarget) onClose()
  }

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return

    if (event.key === '+' || event.key === '=') {
      event.preventDefault()
      zoom(1)
    } else if (event.key === '-') {
      event.preventDefault()
      zoom(-1)
    } else if (event.key === '0') {
      event.preventDefault()
      onTransform(NEUTRAL)
    }
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={t('lightbox.title')}
      ref={panelRef}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitions.smooth}
      className="bg-bg/97 fixed inset-0 z-50 flex flex-col backdrop-blur-sm focus:outline-none"
    >
      <div className="border-line bg-surface/80 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5 backdrop-blur-md sm:px-6">
        <p className="text-ink-2 min-w-0 flex-1 truncate text-sm">{image.alt}</p>

        <div className="flex items-center gap-1.5">
          <ToolButton
            label={t('lightbox.zoomOut')}
            onClick={() => zoom(-1)}
            disabled={!canZoomOut}
          >
            <ZoomOut aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </ToolButton>

          <span
            aria-hidden="true"
            data-numeric
            className="label-mono text-ink-3 w-14 text-center"
          >
            {t('lightbox.zoomValue', { value: String(Math.round(scale * 100)) })}
          </span>

          <ToolButton
            label={t('lightbox.zoomIn')}
            onClick={() => zoom(1)}
            disabled={!canZoomIn}
          >
            <ZoomIn aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </ToolButton>

          <Separator />

          <ToolButton
            label={t('lightbox.flipHorizontal')}
            pressed={transform.flipX}
            onClick={() => onTransform({ ...transform, flipX: !transform.flipX })}
          >
            <FlipHorizontal aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </ToolButton>

          <ToolButton
            label={t('lightbox.flipVertical')}
            pressed={transform.flipY}
            onClick={() => onTransform({ ...transform, flipY: !transform.flipY })}
          >
            <FlipVertical aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </ToolButton>

          <ToolButton
            label={t('lightbox.reset')}
            onClick={() => onTransform(NEUTRAL)}
            disabled={isNeutral}
          >
            <RotateCcw aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </ToolButton>

          <Separator />

          <a
            href={image.src}
            download={image.downloadName}
            aria-label={t('lightbox.download')}
            className={cn(
              'border-line bg-surface text-ink-2 inline-flex size-11 items-center justify-center rounded-md border',
              'hover:border-accent-line hover:text-accent transition-colors duration-150',
            )}
          >
            <Download aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </a>

          <ToolButton label={t('lightbox.close')} onClick={onClose}>
            <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </ToolButton>
        </div>
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        onClick={onStageClick}
        className={cn(
          'flex min-h-0 min-w-0 flex-1 touch-none items-center justify-center overflow-hidden p-4 sm:p-8',
          scale === 1 ? 'cursor-zoom-in' : panning ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        <img
          src={image.src}
          alt={image.alt}
          draggable={false}
          onClick={() => {
            if (!hasMoved.current && scale === 1) zoom(1)
          }}
          /* Transformation calculée : elle ne peut pas vivre dans une classe. */
          style={{
            transform: `translate(${String(transform.offsetX)}px, ${String(transform.offsetY)}px) scale(${String(scale)}) scaleX(${transform.flipX ? '-1' : '1'}) scaleY(${transform.flipY ? '-1' : '1'})`,
          }}
          className={cn(
            'max-h-full max-w-full select-none object-contain',
            panning ? '' : 'transition-transform duration-200 ease-out-quart',
          )}
        />
      </div>
    </motion.div>
  )
}

function Separator() {
  return <span aria-hidden="true" className="bg-line mx-1 h-6 w-px" />
}

interface ToolButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  pressed?: boolean
  children: ReactNode
}

function ToolButton({ label, onClick, disabled = false, pressed, children }: ToolButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!disabled) onClick()
      }}
      aria-disabled={disabled}
      aria-label={label}
      {...(pressed === undefined ? {} : { 'aria-pressed': pressed })}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-md border transition-colors duration-150',
        'aria-disabled:cursor-not-allowed aria-disabled:opacity-40',
        pressed === true
          ? 'border-accent-line bg-accent-soft text-accent'
          : 'border-line bg-surface text-ink-2 hover:border-accent-line hover:text-accent',
      )}
    >
      {children}
    </button>
  )
}
