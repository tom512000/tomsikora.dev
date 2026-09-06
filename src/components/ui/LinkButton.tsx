import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md'

/**
 * Bouton-lien : sur ce portfolio, chaque action mène quelque part (une
 * section, un PDF, un dépôt), donc l'élément est toujours un `<a>` — jamais
 * un `<button>` déguisé, qui perdrait l'ouverture en nouvel onglet et le
 * menu contextuel.
 *
 * Les deux variantes couvrent tout le site. Chacune est décrite une seule
 * fois, en tokens : aucune couleur brute, et un comportement identique en
 * clair comme en sombre.
 *
 * `active:translate-y-px` remplace le classique décalage de bordure basse :
 * même sensation d'appui, sans faire bouger la boîte.
 */
const VARIANTS: Record<Variant, string> = {
  primary: cn(
    'bg-brand text-brand-fg font-semibold',
    'hover:brightness-105 hover:shadow-[0_0_0_3px_var(--accent-halo)]',
    'active:translate-y-px',
  ),
  secondary: cn(
    'bg-surface text-ink border border-line-strong font-medium',
    'hover:border-accent-line hover:bg-surface-2',
    'active:translate-y-px',
  ),
}

const SIZES: Record<Size, string> = {
  // min-h garantit la cible tactile de 44px sur mobile.
  sm: 'gap-1.5 px-3 py-2 text-[0.8125rem] min-h-9 rounded-sm',
  md: 'gap-2 px-4 py-2.5 text-sm min-h-11 rounded-md',
}

const BASE = cn(
  'inline-flex items-center justify-center whitespace-nowrap',
  'transition-[color,background-color,border-color,filter,box-shadow,transform]',
  'duration-150 ease-[var(--ease-out-quart)]',
  'select-none',
)

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    /** Ajoute target/rel et laisse l'appelant annoncer le nouvel onglet. */
    external?: boolean
  }

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  external = false,
  ...rest
}: LinkButtonProps) {
  const externalAttributes = external
    ? ({ target: '_blank', rel: 'noreferrer noopener' } as const)
    : {}

  return (
    <a
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...externalAttributes}
      {...rest}
    >
      {children}
    </a>
  )
}
