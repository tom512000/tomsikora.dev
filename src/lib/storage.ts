/**
 * Accès localStorage tolérant aux pannes.
 *
 * Le stockage peut lever : navigation privée sur certains navigateurs,
 * cookies tiers bloqués, quota atteint. Une préférence non persistée ne
 * doit jamais empêcher le site de s'afficher, d'où l'absorption des erreurs
 * de chaque côté.
 */
export function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStored(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Préférence non persistée : la session reste valide, rien à signaler.
  }
}
