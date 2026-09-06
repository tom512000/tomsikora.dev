import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Gouttière et largeur de lecture uniques pour toute la page. */
export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[76rem] px-5 sm:px-8 lg:px-10', className)}>
      {children}
    </div>
  )
}
