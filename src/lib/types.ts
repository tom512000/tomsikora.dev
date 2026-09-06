/** Les deux langues livrées. Ajouter une locale = étendre ce tuple. */
export const LOCALES = ['fr', 'en'] as const
export type Locale = (typeof LOCALES)[number]

/**
 * Une chaîne portée par le contenu factuel (data/*), traduite au plus près
 * de la donnée. Le type impose une valeur pour CHAQUE locale : ajouter une
 * langue provoque une erreur TypeScript sur les entrées incomplètes.
 */
export type LocalizedText = Record<Locale, string>

export type Theme = 'light' | 'dark'

/* ── Contenu ─────────────────────────────────────────────────────────── */

export type ProjectCategory = 'professional' | 'school' | 'personal'

export type ProjectLinkKind = 'repository' | 'live'

export interface ProjectLink {
  kind: ProjectLinkKind
  href: string
  /** Distingue plusieurs dépôts d'un même projet (front / api…). */
  label?: string
}

export interface Project {
  id: string
  /** Nom canonique, tel qu'il figure dans le portfolio d'origine. */
  name: string
  /**
   * Traductions du nom, réservées aux titres descriptifs (« Bataille
   * navale », « Calcul d'emprunts »…). Les noms propres, acronymes et slugs
   * de dépôt n'en ont pas : ils restent identiques dans toutes les langues.
   */
  nameByLocale?: Partial<Record<Locale, string>>
  category: ProjectCategory
  /** Cadre de réalisation, tel qu'énoncé dans le contenu d'origine. */
  context?: LocalizedText
  description: LocalizedText
  stack: readonly string[]
  links: readonly ProjectLink[]
  /**
   * Nom de base du visuel dans /img/projects, sans suffixe de taille.
   * Absent lorsque le projet n'a pas de capture réelle.
   */
  image?: string
  /** Remonté en showcase pleine largeur plutôt que dans l'index. */
  featured?: boolean
}

export type SkillGroupId = 'languages' | 'frameworks' | 'databases' | 'tools' | 'other'

export interface Skill {
  name: string
  /** Nom de base du logo dans /img/logos, sans extension. */
  logo: string
  href: string
  /** Marqué « Favori » dans le portfolio d'origine → core stack. */
  core?: boolean
}

export interface SkillGroup {
  id: SkillGroupId
  skills: readonly Skill[]
}

export interface Experience {
  id: string
  role: LocalizedText
  organisation: string
  organisationHref?: string
  location: string
  period: LocalizedText
  /** Utilisé pour l'ordre chronologique et l'attribut datetime. */
  start: string
  ongoing?: boolean
  summary?: LocalizedText
  /**
   * Identifiants des projets dont la description indique explicitement ce
   * cadre de réalisation. Aucune association n'est déduite.
   */
  relatedProjects?: readonly string[]
}

export interface Education {
  id: string
  degree: LocalizedText
  detail?: LocalizedText
  institution: string
  institutionHref?: string
  location: string
  period: string
  ongoing?: boolean
}

export interface EventResult {
  label: LocalizedText
  value: string
  highlight?: boolean
}

export interface ItEvent {
  id: string
  name: string
  venue: LocalizedText
  date: LocalizedText
  /** Attribut datetime du premier jour de l'événement. */
  datetime: string
  href: string
  role: LocalizedText
  summary: LocalizedText
  image: string
  results?: readonly EventResult[]
}

export type SocialId = 'github' | 'linkedin' | 'email' | 'phone'

export interface Social {
  id: SocialId
  href: string
  /** Valeur affichable (adresse, identifiant…). */
  handle: string
  external: boolean
}

/** Sections du document, dans l'ordre de lecture. Sert la nav et le scroll-spy. */
export const SECTION_IDS = ['profil', 'projets', 'stack', 'parcours', 'evenements', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]
