import type { ItEvent } from '@/lib/types'

/**
 * Événements IT, du plus récent au plus ancien.
 *
 * Note : l'édition 2024 des 24h Info n'a pas de classement dans le contenu
 * d'origine (les quatre valeurs y étaient affichées « ?ème/39 »). Plutôt que
 * de publier des placeholders, l'événement est conservé sans bloc résultats.
 */
export const events: readonly ItEvent[] = [
  {
    id: 'it-partners-2026',
    name: 'IT Partners 2026',
    venue: {
      fr: 'Paris La Défense Arena',
      en: 'Paris La Défense Arena',
    },
    date: { fr: '4 — 5 février 2026', en: '4 — 5 February 2026' },
    datetime: '2026-02-04',
    href: 'https://www.itpartners.fr/fr-fr.html/',
    role: { fr: 'Exposant', en: 'Exhibitor' },
    summary: {
      fr: "Une nouvelle fois en tant qu'exposant avec ANDI : rencontre avec les partenaires et futurs clients, échanges sur les tendances du marché et présentation de nos solutions IT.",
      en: 'Exhibiting once again with ANDI: meeting partners and prospective clients, discussing market trends and presenting our IT solutions.',
    },
    image: 'it-partners-2026',
  },
  {
    id: '24h-info-2025',
    name: '24h Info 2025',
    venue: { fr: 'IUT Lyon 1', en: 'IUT Lyon 1' },
    date: { fr: '23 — 24 mai 2025', en: '23 — 24 May 2025' },
    datetime: '2025-05-23',
    href: 'https://24hinfo.iut.fr/',
    role: { fr: "Compétiteur — équipe L'île de l'indentation", en: 'Competitor — team L’île de l’indentation' },
    summary: {
      fr: "Défis d'algorithmie, de web et de sécurité résolus en équipe sous contrainte de temps. Une mise en pratique avancée des compétences en informatique, dans un cadre collaboratif et stimulant.",
      en: 'Algorithmics, web and security challenges solved as a team against the clock — an advanced, hands-on application of computer science skills in a collaborative, demanding setting.',
    },
    image: '24h-info-2025',
    results: [
      { label: { fr: 'Épreuve algorithme', en: 'Algorithmics' }, value: '19ᵉ / 39' },
      { label: { fr: 'Épreuve web', en: 'Web' }, value: '4ᵉ / 39' },
      { label: { fr: 'Épreuve sécurité', en: 'Security' }, value: '31ᵉ / 39' },
      { label: { fr: 'Classement général', en: 'Overall' }, value: '8ᵉ / 39', highlight: true },
    ],
  },
  {
    id: 'it-partners-2025',
    name: 'IT Partners 2025',
    venue: { fr: 'Paris La Défense Arena', en: 'Paris La Défense Arena' },
    date: { fr: '5 — 6 février 2025', en: '5 — 6 February 2025' },
    datetime: '2025-02-05',
    href: 'https://www.parisladefense-arena.com/it-partners-2025-deux-jours-a-paris-la-defense-arena-pour-faconner-lavenir-du-numerique/',
    role: { fr: 'Exposant', en: 'Exhibitor' },
    summary: {
      fr: "Expérience enrichissante en tant qu'exposant avec ANDI : présentation de solutions auprès d'entreprises IT et immersion dans les dynamiques commerciales du secteur tech.",
      en: 'A rewarding stint exhibiting with ANDI: presenting solutions to IT companies and getting a close look at how the tech sector sells.',
    },
    image: 'it-partners-2025',
  },
  {
    id: '24h-info-2024',
    name: '24h Info 2024',
    venue: {
      fr: 'IUT de Villetaneuse — Université Sorbonne Paris Nord',
      en: 'IUT de Villetaneuse — Université Sorbonne Paris Nord',
    },
    date: { fr: '31 mai — 1ᵉʳ juin 2024', en: '31 May — 1 June 2024' },
    datetime: '2024-05-31',
    href: 'https://24hinfo.iut.fr/getting-started/',
    role: { fr: 'Compétiteur — équipe Salad2Riz', en: 'Competitor — team Salad2Riz' },
    summary: {
      fr: "Participation à une compétition nationale de programmation, de cybersécurité et de développement web avec l'équipe Salad2Riz. Collaboration, rigueur et réactivité face à des défis techniques variés.",
      en: 'Taking part in a national programming, cybersecurity and web development competition with team Salad2Riz. Collaboration, rigour and quick thinking across a wide range of technical challenges.',
    },
    image: '24h-info-2024',
  },
  {
    id: 'it-partners-2024',
    name: 'IT Partners 2024',
    venue: {
      fr: 'Disney Events Arena — Parc Disneyland Paris',
      en: 'Disney Events Arena — Disneyland Paris',
    },
    date: { fr: '13 — 14 mars 2024', en: '13 — 14 March 2024' },
    datetime: '2024-03-13',
    href: 'https://www.itpartners.fr/fr-fr.html/',
    role: { fr: 'Visiteur', en: 'Visitor' },
    summary: {
      fr: "Participation en tant que visiteur aux côtés de Neosyst (Épernay) : échanges avec des professionnels du secteur IT, découverte de solutions innovantes et veille technologique axée sur la cybersécurité.",
      en: 'Attending as a visitor alongside Neosyst (Épernay): talking with IT professionals, discovering new solutions and keeping watch on cybersecurity technology.',
    },
    image: 'it-partners-2024',
  },
]
