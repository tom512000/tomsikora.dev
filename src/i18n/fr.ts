/**
 * Dictionnaire français — source de vérité.
 *
 * Sa forme définit le type `Dictionary` : toute autre langue doit le
 * satisfaire intégralement, donc une clé oubliée est une erreur TypeScript,
 * pas une chaîne manquante découverte en production.
 *
 * Ce fichier ne contient que les libellés d'interface. Le contenu factuel
 * (projets, expériences, événements) est traduit au plus près de la donnée,
 * dans src/data.
 */
export const fr = {
  meta: {
    title: 'Tom SIKORA — Développeur web full stack',
    description:
      "Portfolio de Tom SIKORA, développeur web full stack. Interfaces React, API Symfony, et 34 projets menés en alternance, en stage et en autonomie.",
  },

  a11y: {
    skipToContent: 'Aller au contenu principal',
    mainNavigation: 'Navigation principale',
    sectionNavigation: 'Sections du site',
    openMenu: 'Ouvrir le menu de navigation',
    closeMenu: 'Fermer le menu de navigation',
    newTab: 'nouvel onglet',
    readingProgress: 'Progression de lecture',
    currentSection: 'Section active',
    backToTop: 'Revenir en haut de la page',
    preferences: 'Préférences d’affichage',
  },

  theme: {
    label: 'Thème',
    light: 'Clair',
    dark: 'Sombre',
    switchToDark: 'Activer le thème sombre',
    switchToLight: 'Activer le thème clair',
  },

  locale: {
    label: 'Langue',
    fr: 'Français',
    en: 'English',
    switchToFr: 'Afficher le site en français',
    switchToEn: 'Afficher le site en anglais',
  },

  nav: {
    profil: 'Profil',
    projets: 'Projets',
    stack: 'Stack',
    parcours: 'Parcours',
    evenements: 'Événements',
    contact: 'Contact',
  },

  hero: {
    intro: 'Bonjour, moi c’est',
    availableLabel: 'Disponibilité',
    ctaCv: 'CV (PDF)',
    scrollHint: 'Faire défiler',
    specsTitle: 'Fiche technique',
    specWork: 'Alternance',
    specEducation: 'Formation',
    specStack: 'Stack principale',
    portraitAlt: 'Portrait de Tom SIKORA',
  },

  about: {
    eyebrow: 'À propos',
    title: 'Du design de l’interface à la base de données',
  },

  work: {
    eyebrow: 'Projets',
    title: 'Ce que je construis',
    lead: '{count} projets menés en entreprise, en formation et sur mon temps libre.',
    filterLabel: 'Filtrer les projets par catégorie',
    filterAll: 'Tous',
    filterProfessional: 'Professionnels',
    filterSchool: 'Scolaires',
    filterPersonal: 'Personnels',
    featuredLabel: 'Projet mis en avant',
    indexTitle: 'Index des projets',
    indexHint: 'Sélectionnez un projet pour afficher son détail.',
    indexColumnProject: 'Projet',
    indexColumnStack: 'Stack',
    categoryProfessional: 'Professionnel',
    categorySchool: 'Scolaire',
    categoryPersonal: 'Personnel',
    viewRepository: 'Code source',
    viewLive: 'Site en ligne',
    repositoryOf: 'Dépôt {label} de {project}',
    liveOf: 'Site en ligne de {project}',
    expand: 'Afficher le détail de {project}',
    collapse: 'Masquer le détail de {project}',
    noScreenshot: 'Pas de capture disponible',
    screenshotOf: 'Capture d’écran du projet {project}',
    empty: 'Aucun projet dans cette catégorie.',
    countOne: '1 projet',
    countMany: '{count} projets',
  },

  stack: {
    eyebrow: 'Stack',
    title: 'Les outils que j’utilise',
    lead: 'Un socle que je pratique au quotidien, et un ensemble plus large abordé en projet ou en formation.',
    coreTitle: 'Socle principal',
    coreHint: 'Les technologies sur lesquelles je travaille le plus.',
    restTitle: 'Le reste de la boîte à outils',
    restHint: '{count} technologies abordées en projet, en cours ou en autonomie.',
    groupLanguages: 'Langages',
    groupFrameworks: 'Frameworks & bibliothèques',
    groupDatabases: 'Bases de données',
    groupTools: 'Outils & applications',
    groupOther: 'Infrastructure & autres',
  },

  path: {
    eyebrow: 'Parcours',
    title: 'Expériences et formation',
    experienceTitle: 'Expériences',
    educationTitle: 'Formation & diplômes',
    ongoing: 'En cours',
    relatedProjects: 'Projets réalisés',
  },

  events: {
    eyebrow: 'Événements',
    title: 'Compétitions et salons IT',
    lead: 'Les rendez-vous où je confronte ma pratique à celle des autres.',
    resultsTitle: 'Résultats',
    imageOf: 'Photographie de l’événement {event}',
    visitSite: 'Site de l’événement',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Parlons-en',
    lead: 'Le plus simple reste l’e-mail. Je réponds aussi sur LinkedIn.',
    emailLabel: 'E-mail',
    phoneLabel: 'Téléphone',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    cvTitle: 'Curriculum vitæ',
    cvHint: 'Version PDF, à jour.',
    cvAction: 'Télécharger le CV',
    copyEmail: 'Copier l’adresse e-mail',
    copied: 'Copié',
  },

  footer: {
    builtWith: 'Conçu et développé avec React, Vite, Tailwind CSS et Motion.',
    sourceCode: 'Code source',
    rights: '© {year} Tom SIKORA',
  },
} as const
