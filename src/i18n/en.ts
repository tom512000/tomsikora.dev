import type { Dictionary } from './dictionaries'

/**
 * English dictionary.
 *
 * `satisfies Dictionary` fait le travail : une clé manquante ou mal nommée
 * casse la compilation. La traduction vise un anglais naturel et
 * professionnel, à sens strictement équivalent — jamais du mot à mot, et
 * jamais d'information supplémentaire.
 */
export const en = {
  meta: {
    title: 'Tom SIKORA — Full stack web developer',
    description:
      'Portfolio of Tom SIKORA, full stack web developer. React interfaces, Symfony APIs, and 34 projects built during an apprenticeship, internships and on my own time.',
  },

  a11y: {
    skipToContent: 'Skip to main content',
    mainNavigation: 'Main navigation',
    sectionNavigation: 'Site sections',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    newTab: 'new tab',
    readingProgress: 'Reading progress',
    currentSection: 'Current section',
    backToTop: 'Back to top of page',
    preferences: 'Display preferences',
  },

  theme: {
    label: 'Theme',
    light: 'Light',
    dark: 'Dark',
    switchToDark: 'Switch to dark theme',
    switchToLight: 'Switch to light theme',
  },

  locale: {
    label: 'Language',
    fr: 'Français',
    en: 'English',
    switchToFr: 'View the site in French',
    switchToEn: 'View the site in English',
  },

  nav: {
    profil: 'Profile',
    projets: 'Work',
    stack: 'Stack',
    parcours: 'Path',
    evenements: 'Events',
    contact: 'Contact',
  },

  hero: {
    intro: 'Hi, I’m',
    availableLabel: 'Availability',
    ctaProjects: 'See the work',
    ctaCv: 'Résumé (PDF)',
    scrollHint: 'Scroll',
    specsTitle: 'At a glance',
    specWork: 'Apprenticeship',
    specEducation: 'Education',
    specStack: 'Core stack',
    portraitAlt: 'Portrait of Tom SIKORA',
  },

  about: {
    eyebrow: 'About',
    title: 'From interface design to the database',
  },

  work: {
    eyebrow: 'Work',
    title: 'What I build',
    lead: '{count} projects built at work, during my studies and in my own time.',
    filterLabel: 'Filter projects by category',
    filterAll: 'All',
    filterProfessional: 'Professional',
    filterSchool: 'Academic',
    filterPersonal: 'Personal',
    featuredLabel: 'Featured project',
    indexTitle: 'Project index',
    indexColumnProject: 'Project',
    indexHint: 'Select a project to reveal its details.',
    indexColumnStack: 'Stack',
    categoryProfessional: 'Professional',
    categorySchool: 'Academic',
    categoryPersonal: 'Personal',
    viewRepository: 'Source code',
    viewLive: 'Live site',
    repositoryOf: '{label} repository for {project}',
    liveOf: 'Live site for {project}',
    expand: 'Show details for {project}',
    collapse: 'Hide details for {project}',
    noScreenshot: 'No screenshot available',
    screenshotOf: 'Screenshot of the {project} project',
    empty: 'No project in this category.',
    countOne: '1 project',
    countMany: '{count} projects',
  },

  stack: {
    eyebrow: 'Stack',
    title: 'The tools I work with',
    lead: 'A core I use day to day, and a wider set picked up on projects and during my studies.',
    coreTitle: 'Core stack',
    coreHint: 'The technologies I work with most.',
    restTitle: 'The rest of the toolbox',
    restHint: '{count} technologies used on projects, in class or on my own.',
    groupLanguages: 'Languages',
    groupFrameworks: 'Frameworks & libraries',
    groupDatabases: 'Databases',
    groupTools: 'Tools & applications',
    groupOther: 'Infrastructure & other',
  },

  path: {
    eyebrow: 'Path',
    title: 'Experience and education',
    experienceTitle: 'Experience',
    educationTitle: 'Education & degrees',
    ongoing: 'Ongoing',
    relatedProjects: 'Projects delivered',
  },

  events: {
    eyebrow: 'Events',
    title: 'IT competitions and trade shows',
    lead: 'Where I measure my practice against everyone else’s.',
    resultsTitle: 'Results',
    imageOf: 'Photograph from the {event} event',
    visitSite: 'Event website',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Let’s talk',
    lead: 'Email is the easiest way to reach me. LinkedIn works too.',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    cvTitle: 'Résumé',
    cvHint: 'PDF version, kept up to date.',
    cvAction: 'Download the résumé',
    copyEmail: 'Copy email address',
    copied: 'Copied',
  },

  footer: {
    builtWith: 'Designed and built with React, Vite, Tailwind CSS and Motion.',
    sourceCode: 'Source code',
    rights: '© {year} Tom SIKORA',
  },
} satisfies Dictionary
