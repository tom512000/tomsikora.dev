import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Theme } from '@/lib/types'
import { readStored, writeStored } from '@/lib/storage'
import { ThemeContext, type ThemeContextValue } from './theme-context'

const STORAGE_KEY = 'tsk.theme'
const DEFAULT_THEME: Theme = 'light'
const TRANSITION_MS = 180

/** Couleur de la barre d'adresse mobile, alignée sur --bg de chaque thème. */
const THEME_COLOR: Record<Theme, string> = {
  light: '#FAFAF7',
  dark: '#0A0A0B',
}

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

function readInitialTheme(): Theme {
  // Le script d'amorçage d'index.html a déjà posé l'attribut avant le premier
  // paint : on le relit plutôt que de recalculer, pour rester synchrone.
  const applied = document.documentElement.dataset['theme']
  if (isTheme(applied)) return applied

  const stored = readStored(STORAGE_KEY)
  return isTheme(stored) ? stored : DEFAULT_THEME
}

/**
 * Thème courant, persisté et appliqué sur `<html data-theme>`.
 *
 * Choix assumé : `prefers-color-scheme` n'est pas consulté. Le thème clair
 * est le défaut au premier chargement, conformément au comportement voulu ;
 * une fois l'utilisateur passé en sombre, sa préférence prime pour toujours.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)
  const isFirstRun = useRef(true)

  useEffect(() => {
    const root = document.documentElement
    root.dataset['theme'] = theme
    writeStored(STORAGE_KEY, theme)

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme])

    // La transition n'est armée que sur un changement réel, jamais au
    // montage : sinon la page « fondrait » depuis un état qui n'a pas existé.
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    root.setAttribute('data-theme-switching', '')
    const timer = window.setTimeout(() => {
      root.removeAttribute('data-theme-switching')
    }, TRANSITION_MS)

    return () => {
      window.clearTimeout(timer)
      root.removeAttribute('data-theme-switching')
    }
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
