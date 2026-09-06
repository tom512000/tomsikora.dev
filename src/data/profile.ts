import type { LocalizedText, Social } from '@/lib/types'

/**
 * Identité et coordonnées. Tout provient du portfolio d'origine :
 * aucune information n'a été ajoutée, seules les formulations ont été
 * resserrées et les fautes corrigées.
 */
export const profile = {
  firstName: 'Tom',
  lastName: 'SIKORA',
  fullName: 'Tom SIKORA',
  title: {
    fr: 'Développeur web full stack',
    en: 'Full stack web developer',
  } satisfies LocalizedText,
  /** Sous-titre du hero : le positionnement, en une phrase. */
  positioning: {
    fr: "Je conçois des interfaces web soignées et les API qui les alimentent — du design et des performances côté front jusqu'aux bases de données côté serveur.",
    en: 'I build carefully crafted web interfaces and the APIs behind them — from front-end design and performance to server-side databases.',
  } satisfies LocalizedText,
  about: [
    {
      fr: "Je m'appelle Tom SIKORA et je suis étudiant en Mastère Ingénierie du Web à l'ESGI de Reims.",
      en: "My name is Tom SIKORA and I'm a Web Engineering master's student at ESGI in Reims.",
    },
    {
      fr: "Ma passion pour le développement et la programmation m'a naturellement conduit à me spécialiser d'abord en développement frontend, puis en full stack. Cette spécialisation reflète mon intérêt pour le design et l'optimisation des performances des sites web, mais également pour la création d'API et la gestion de bases de données.",
      en: 'My passion for development and programming naturally led me to specialise first in frontend development, then in full stack. That focus reflects my interest in design and web performance optimisation, as much as in building APIs and managing databases.',
    },
    {
      fr: "En parallèle de mes études, je m'investis activement dans la création de sites web et de programmes. Ces projets personnels me permettent de mettre en pratique les connaissances acquises en cours, tout en explorant de nouvelles technologies et frameworks.",
      en: 'Alongside my studies, I actively build websites and programs. These personal projects let me put what I learn in class into practice while exploring new technologies and frameworks.',
    },
  ] satisfies readonly LocalizedText[],
  /** État déclaré tel quel dans le portfolio d'origine. */
  availability: {
    open: false,
    headline: {
      fr: 'Aucune recherche en cours',
      en: 'Not currently looking',
    } satisfies LocalizedText,
    detail: {
      fr: "Je ne suis actuellement pas à la recherche d'opportunités.",
      en: "I'm not looking for new opportunities at the moment.",
    } satisfies LocalizedText,
  },
  cv: {
    href: '/files/CV-Tom-SIKORA.pdf',
  },
} as const

export const socials: readonly Social[] = [
  {
    id: 'github',
    href: 'https://github.com/tom512000',
    handle: 'tom512000',
    external: true,
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/tom-sikora-1a5188271/',
    handle: 'tom-sikora',
    external: true,
  },
  {
    id: 'email',
    href: 'mailto:tom.sikora03@gmail.com',
    handle: 'tom.sikora03@gmail.com',
    external: false,
  },
  {
    id: 'phone',
    href: 'tel:+33626888379',
    handle: '+33 6 26 88 83 79',
    external: false,
  },
]
