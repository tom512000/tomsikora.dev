import { useCallback, useSyncExternalStore } from 'react'

/**
 * Suit une media query.
 *
 * `useSyncExternalStore` est le bon outil ici : la valeur vit hors de React,
 * elle est lue au moment du rendu et souscrite proprement. Aucun état local
 * synchronisé dans un effet, donc aucun rendu en cascade au montage ni au
 * changement de requête.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onStoreChange)

      return () => {
        list.removeEventListener('change', onStoreChange)
      }
    },
    [query],
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  return useSyncExternalStore(subscribe, getSnapshot)
}
