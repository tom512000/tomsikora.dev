import { useEffect, useState } from 'react'

/**
 * Section actuellement en lecture.
 *
 * Repose sur un unique IntersectionObserver, pas sur un écouteur `scroll` :
 * aucun calcul par frame, aucune lecture de layout pendant le défilement.
 * La section retenue est celle dont la part visible est la plus grande, ce
 * qui gère naturellement le bas de page où la dernière section ne peut plus
 * atteindre le centre du viewport.
 *
 * @param ids Identifiants des sections, dans l'ordre du document.
 * @param offset Hauteur de l'en-tête collant, exclue de la zone de mesure.
 */
export function useScrollSpy(ids: readonly string[], offset = 72): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        let best: string | null = null
        let bestRatio = 0

        // Parcours dans l'ordre du document : à égalité, la première gagne.
        for (const id of ids) {
          const ratio = ratios.get(id) ?? 0
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }

        if (best !== null) setActiveId(best)
      },
      {
        rootMargin: `-${String(offset)}px 0px 0px 0px`,
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      },
    )

    for (const section of sections) observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [ids, offset])

  return activeId
}
