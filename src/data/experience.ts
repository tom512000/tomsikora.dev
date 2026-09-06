import type { Education, Experience } from '@/lib/types'

/**
 * Le portfolio d'origine réunissait expériences et diplômes dans un même
 * bloc « Formation & Diplômes ». Les deux sont ici séparés : les expériences
 * professionnelles passent au premier plan, la formation reste en appui.
 *
 * `relatedProjects` référence les projets dont la description indique
 * explicitement ce cadre de réalisation — aucune association déduite.
 */
export const experiences: readonly Experience[] = [
  {
    id: 'dalven-alternance',
    role: {
      fr: 'Alternance — développement full stack',
      en: 'Apprenticeship — full stack development',
    },
    organisation: 'Dalven SOFT',
    location: 'Châlons-en-Champagne',
    period: { fr: 'juil. 2025 — sept. 2027', en: 'Jul 2025 — Sep 2027' },
    start: '2025-07',
    ongoing: true,
    relatedProjects: ['andi-espace-client'],
  },
  {
    id: 'dalven-stage',
    role: {
      fr: 'Stage — développement full stack',
      en: 'Internship — full stack development',
    },
    organisation: 'Dalven SOFT',
    location: 'Châlons-en-Champagne',
    period: {
      fr: 'jan. — mai 2025, puis juin — juil. 2025',
      en: 'Jan — May 2025, then Jun — Jul 2025',
    },
    start: '2025-01',
    summary: {
      fr: 'Stage de 3ᵉ année de BUT Informatique.',
      en: 'Third-year internship of the BUT Computer Science degree.',
    },
    relatedProjects: ['andi'],
  },
  {
    id: 'crestic-stage',
    role: {
      fr: 'Stage — développement full stack',
      en: 'Internship — full stack development',
    },
    organisation: 'CReSTIC',
    organisationHref: 'https://crestic.univ-reims.fr/fr/accueil',
    location: 'Reims',
    period: { fr: 'avr. — juin 2024', en: 'Apr — Jun 2024' },
    start: '2024-04',
    summary: {
      fr: 'Stage de 2ᵉ année de BUT Informatique.',
      en: 'Second-year internship of the BUT Computer Science degree.',
    },
    relatedProjects: ['crestic', 'room-questic'],
  },
]

export const education: readonly Education[] = [
  {
    id: 'esgi-mastere',
    degree: {
      fr: 'Mastère Ingénierie du Web',
      en: "Master's in Web Engineering",
    },
    institution: 'ESGI',
    institutionHref: 'https://www.esgi.fr/campus-reims.html',
    location: 'Reims',
    period: '2025 — 2027',
    ongoing: true,
  },
  {
    id: 'but-informatique',
    degree: {
      fr: 'BUT Informatique',
      en: 'BUT Computer Science',
    },
    detail: {
      fr: 'Licence professionnelle, spécialité Informatique',
      en: "Bachelor's degree, Computer Science major",
    },
    institution: 'IUT Reims-Châlons-Charleville',
    institutionHref: 'https://www.univ-reims.fr/iut-rcc/',
    location: 'Reims',
    period: '2022 — 2025',
  },
  {
    id: 'bac-sti2d',
    degree: {
      fr: 'Baccalauréat STI2D, spécialité SIN',
      en: 'French Baccalauréat STI2D, SIN major',
    },
    detail: {
      fr: 'Mention Assez Bien',
      en: 'Passed with merit',
    },
    institution: 'Lycée Franklin Roosevelt',
    institutionHref: 'https://lycee-roosevelt-reims.fr/',
    location: 'Reims',
    period: '2020 — 2021',
  },
]
