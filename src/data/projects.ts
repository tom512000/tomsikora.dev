import type { Locale, Project, ProjectCategory } from '@/lib/types'

/**
 * Les 34 projets du portfolio d'origine, tels quels : aucun projet, aucune
 * techno, aucun lien et aucune fonctionnalité n'a été inventé. Les
 * descriptions ont été resserrées et corrigées, jamais enrichies.
 *
 * `featured` remonte un projet en showcase pleine largeur ; les autres
 * alimentent l'index dense. Le critère est la substance du projet et la
 * présence d'une capture réelle.
 *
 * `image` désigne le nom de base dans /img/projects — les variantes -640 et
 * -1280 en WebP sont générées à la construction des assets.
 */
export const projects: readonly Project[] = [
  /* ── Professionnels ─────────────────────────────────────────────────── */
  {
    id: 'andi',
    name: 'ANDI',
    category: 'professional',
    featured: true,
    image: 'andi',
    context: { fr: 'Stage · Dalven SOFT', en: 'Internship · Dalven SOFT' },
    description: {
      fr: "Dans le cadre de mon stage à Dalven SOFT lors de ma 3ᵉ année de BUT Informatique, j'ai participé au développement d'ANDI, une application web de gestion interne dédiée aux entreprises : conception de modules métiers, amélioration d'interfaces et optimisation de l'expérience utilisateur.",
      en: 'During my internship at Dalven SOFT in the third year of my BUT Computer Science degree, I contributed to ANDI, an internal business management web application: building domain modules, refining interfaces and improving the user experience.',
    },
    stack: ['React', 'Ant Design', 'JavaScript', 'HTML', 'CSS', 'PHP', 'Symfony', 'Git'],
    links: [],
  },
  {
    id: 'leaks',
    name: 'Projet Leak',
    nameByLocale: { en: 'Leak Project' },
    category: 'professional',
    image: 'leaks',
    description: {
      fr: "J'ai développé une application web de recherche de fuites de données, permettant aux utilisateurs de vérifier si leurs informations personnelles ont été compromises. Application présentée lors de la deuxième édition de « Cyber & Moi » à Reims.",
      en: 'I built a data breach lookup web application that lets users check whether their personal information has been compromised. It was presented at the second edition of “Cyber & Moi” in Reims.',
    },
    stack: ['React', 'JavaScript', 'HTML', 'Tailwind CSS', 'PHP', 'Symfony', 'Git'],
    links: [],
  },
  {
    id: 'andi-espace-client',
    name: 'ANDI — Espace client',
    nameByLocale: { en: 'ANDI — Client area' },
    category: 'professional',
    featured: true,
    image: 'andi',
    context: { fr: 'Alternance · Dalven SOFT', en: 'Apprenticeship · Dalven SOFT' },
    description: {
      fr: "En parallèle de mon alternance à Dalven SOFT, j'ai développé l'espace client d'ANDI, l'application web de gestion interne dédiée aux entreprises. Cet espace permet aux clients de gérer leurs informations et de suivre leurs interactions avec l'entreprise.",
      en: 'Alongside my apprenticeship at Dalven SOFT, I built the client area of ANDI, the internal business management web application. It lets clients manage their information and follow up on their interactions with the company.',
    },
    stack: ['React', 'Ant Design', 'JavaScript', 'HTML', 'Tailwind CSS', 'PHP', 'Symfony', 'Git'],
    links: [],
  },
  {
    id: 'crestic',
    name: 'CReSTIC',
    category: 'professional',
    image: 'crestic',
    context: { fr: 'Stage · CReSTIC', en: 'Internship · CReSTIC' },
    description: {
      fr: "Dans le cadre de mon stage au CReSTIC lors de ma 2ᵉ année de BUT Informatique, j'ai travaillé en équipe sur l'ajout de déclencheurs lors de la création, la suppression ou la modification d'entités comme un utilisateur ou une équipe, via le bundle EasyAdmin.",
      en: 'During my internship at CReSTIC in the second year of my BUT Computer Science degree, I worked in a team on adding triggers fired when entities such as a user or a team are created, deleted or updated, through the EasyAdmin bundle.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Symfony', 'Git'],
    links: [
      { kind: 'live', href: 'https://crestic.univ-reims.fr/fr/accueil' },
      { kind: 'repository', href: 'https://github.com/tom512000/crestic-site-web-mode-dev' },
    ],
  },
  {
    id: 'room-questic',
    name: 'RoomQueSTIC',
    category: 'professional',
    image: 'room-questic',
    context: { fr: 'Stage · CReSTIC', en: 'Internship · CReSTIC' },
    description: {
      fr: "J'ai également travaillé en équipe sur le développement d'une application web de réservation de salles et de matériel, permettant de créer, modifier et supprimer des réservations.",
      en: 'I also worked in a team on a room and equipment booking web application, where reservations can be created, edited and deleted.',
    },
    stack: ['HTML', 'CSS', 'Python', 'Django', 'Figma', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/crestic-site-reservation-salle' }],
  },

  /* ── Personnels ─────────────────────────────────────────────────────── */
  {
    id: 'omnitill',
    name: 'Omnitill',
    category: 'professional',
    featured: true,
    image: 'omnitill',
    description: {
      fr: "Caisse enregistreuse web pour commerçants : encaissement tactile avec impression du ticket, catalogue et stocks, fidélité client et statistiques de ventes en temps réel. Des modules s'activent à la demande — plan de salle, statistiques détaillées, prévision de production.",
      en: 'A web cash register for retailers: touch checkout with receipt printing, product catalogue and stock, customer loyalty and real-time sales figures. Modules switch on as needed — floor plan, detailed statistics, production forecasting.',
    },
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vite',
      'PHP',
      'Symfony',
      'PostgreSQL',
      'Docker',
      'Git',
    ],
    links: [
      { kind: 'live', href: 'https://omnitill.fr/' },
      { kind: 'live', href: 'https://demo.omnitill.fr/', label: { fr: 'Démo', en: 'Demo' } },
    ],
  },
  {
    id: 'mova',
    name: 'Mova',
    category: 'personal',
    featured: true,
    image: 'mova',
    description: {
      fr: "Mova transforme un export Letterboxd — des CSV réduits à des slugs, des notes et des dates — en une bibliothèque complète : affiches, casting, durées, genres, statistiques et huit jeux bâtis sur les films réellement vus. Ce qui manque à l'export est reconstitué depuis TMDB en arrière-plan.",
      en: 'Mova turns a Letterboxd export — CSV files holding nothing but slugs, ratings and dates — into a complete library: posters, cast, runtimes, genres, statistics and eight games built on the films actually watched. What the export leaves out is rebuilt from TMDB in the background.',
    },
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vite',
      'PHP',
      'Symfony',
      'PostgreSQL',
      'Docker',
      'Git',
    ],
    links: [
      { kind: 'repository', href: 'https://github.com/tom512000/mova-app' },
      { kind: 'live', href: 'https://mova.tomsikora.dev/' },
    ],
  },
  {
    id: 'butdle',
    name: 'BUTDLE',
    category: 'personal',
    image: 'butdle',
    description: {
      fr: "BUTDLE est un jeu développé en React avec une API PHP/Symfony, où le joueur doit deviner un·e enseignant·e du BUT Informatique de Reims. Le backend gère les données et les différents modes de jeu (journalier, illimité…).",
      en: 'BUTDLE is a game built with React and a PHP/Symfony API, where players guess a teacher from the BUT Computer Science programme in Reims. The backend handles the data and the different game modes (daily, unlimited and more).',
    },
    stack: [
      'React',
      'JavaScript',
      'HTML',
      'CSS',
      'npm',
      'PHP',
      'Symfony',
      'Composer',
      'MySQL',
      'Git',
    ],
    links: [
      { kind: 'repository', href: 'https://github.com/tom512000/butdle-front', label: 'front' },
      { kind: 'repository', href: 'https://github.com/tom512000/butdle-back', label: 'back' },
    ],
  },
  {
    id: 'lamiedouce',
    name: 'La Mie Douce',
    category: 'personal',
    image: 'lamiedouce',
    description: {
      fr: "Site web complet pour la boulangerie La Mie Douce à Reims, conçu pour présenter les produits, l'histoire et les valeurs de l'établissement. Il comprend une page d'accueil avec les spécialités de la boulangerie, des pages dédiées aux différents types de produits et une section sur les services personnalisés.",
      en: 'A full website for the La Mie Douce bakery in Reims, designed to present its products, story and values. It includes a home page featuring the bakery specialities, dedicated pages for each product range and a section on custom services.',
    },
    stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/Najinc/lamiedouce' }],
  },
  {
    id: 'neosyst-gestion',
    name: 'Neosyst Gestion',
    category: 'personal',
    image: 'neosyst-gestion',
    description: {
      fr: "Application web de gestion des articles, clients et SAV pour l'entreprise Neosyst (Épernay). L'application propose également l'impression d'un SAV.",
      en: 'A web application to manage products, customers and after-sales tickets for the company Neosyst (Épernay). It also supports printing an after-sales ticket.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Symfony', 'Composer', 'MySQL', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/neosyst-gestion' }],
  },
  {
    id: 'champagne',
    name: 'Champagne !',
    category: 'personal',
    image: 'champagne',
    description: {
      fr: "Application web de gestion d'une collection de capsules de champagne, avec des opérations CRUD sur chaque capsule et un système de connexion sécurisant les modifications de la base de données.",
      en: 'A web application to manage a collection of champagne capsules, with CRUD operations on each capsule and a login system securing changes to the database.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Symfony', 'Composer', 'MySQL', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/champagnes' }],
  },
  {
    id: 'portfolio',
    name: 'Portfolio numérique',
    nameByLocale: { en: 'Digital portfolio' },
    category: 'personal',
    image: 'portfolio',
    description: {
      fr: "Mon portfolio met en valeur mes connaissances théoriques, les compétences pratiques que j'ai développées et les projets concrets que j'ai réalisés tout au long de mes études.",
      en: 'My portfolio showcases my theoretical knowledge, the practical skills I have developed and the concrete projects I have built throughout my studies.',
    },
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/tomsikora.dev' }],
  },

  /* ── Scolaires ──────────────────────────────────────────────────────── */
  {
    id: 'sae4-01',
    name: 'sae4-01',
    category: 'school',
    image: 'sae4-01',
    description: {
      fr: "Application web de gestion des stages et alternances d'une formation : gestion des offres, des inscriptions et des utilisateurs. Le projet est découpé en deux parties, un frontend React et un backend PHP/Symfony.",
      en: 'A web application to manage internships and apprenticeships within a study programme: offers, applications and users. The project is split in two, a React frontend and a PHP/Symfony backend.',
    },
    stack: [
      'React',
      'JavaScript',
      'HTML',
      'CSS',
      'npm',
      'PHP',
      'Symfony',
      'Composer',
      'MySQL',
      'Git',
    ],
    links: [
      { kind: 'repository', href: 'https://github.com/tom512000/sae4-01-front', label: 'front' },
      { kind: 'repository', href: 'https://github.com/tom512000/sae4-01-api', label: 'api' },
    ],
  },
  {
    id: 'sae3-01',
    name: 'sae3-01',
    category: 'school',
    image: 'edutech',
    description: {
      fr: "Application web de gestion d'offres de stage et d'alternance. Les étudiants consultent les offres issues d'une base de données et s'inscrivent à celles qui sont disponibles ; les administrateurs gèrent les offres, les utilisateurs, les compétences et les types d'offres.",
      en: 'A web application to manage internship and apprenticeship offers. Students browse offers from a database and apply to the ones available, while administrators manage offers, users, skills and offer types.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Symfony', 'Composer', 'MySQL', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/sae3-01' }],
  },
  {
    id: 'sae2-01',
    name: 'sae2-01',
    category: 'school',
    image: 'php-films',
    description: {
      fr: "Application web de gestion de films : interface de consultation des films, de leurs genres et de leurs castings, avec les opérations CRUD associées.",
      en: 'A film management web application: an interface to browse films, their genres and their cast, together with the matching CRUD operations.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Composer', 'MySQL', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/sae2-01' }],
  },
  {
    id: 'r401-bookmarks-api',
    name: 'r401-bookmarks-api',
    category: 'school',
    description: {
      fr: "API de gestion de signets, avec authentification des utilisateurs, gestion des données et validation, construite avec API Platform.",
      en: 'A bookmark management API with user authentication, data handling and validation, built with API Platform.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Symfony', 'API Platform', 'Composer', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/r401-bookmarks-api' }],
  },
  {
    id: 'connect-sport',
    name: 'ConnectSport',
    category: 'school',
    image: 'connect-sport',
    description: {
      fr: "Application web de test de connexion et d'inscription : une page vérifie le contenu des cookies de l'utilisateur connecté, une deuxième affiche un formulaire de connexion et une troisième un formulaire d'inscription.",
      en: 'A sign-in and sign-up test web application: one page inspects the cookies of the logged-in user, a second shows a login form and a third a registration form.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Symfony', 'Composer', 'MySQL', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/connectsport-authentication' }],
  },
  {
    id: 'symfony-contacts',
    name: 'Symfony Contacts',
    category: 'school',
    image: 'symfony-contact',
    description: {
      fr: "Introduction au développement d'une application web Symfony. L'application liste des contacts issus d'une base de données dont les informations sont générées aléatoirement par le bundle Faker, et permet d'ouvrir la fiche de chaque contact.",
      en: 'An introduction to building a Symfony web application. It lists contacts from a database whose data is randomly generated by the Faker bundle, and opens a detail page for each contact.',
    },
    stack: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'Symfony', 'Composer', 'MySQL', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/symfony-contacts' }],
  },
  {
    id: 'php-authentication',
    name: 'PHP Authentication',
    category: 'school',
    image: 'php-authentication',
    description: {
      fr: "Classe PHP permettant de manipuler en lecture les enregistrements d'une table utilisateur MySQL, dans laquelle le mot de passe est stocké sous forme de condensat SHA-512. Ces données servent à valider l'authenticité d'un utilisateur.",
      en: 'A PHP class that reads records from a MySQL user table where passwords are stored as SHA-512 digests. That data is then used to verify a user’s authenticity.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Composer', 'MySQL', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/php-authentication' }],
  },
  {
    id: 'php-session',
    name: 'PHP Session',
    category: 'school',
    image: 'php-session',
    description: {
      fr: "Projet articulé autour d'une base de données contenant la liste des pays du monde. L'objectif : produire un composant logiciel permettant de sélectionner un pays dans une liste déroulante et de mémoriser ce choix dans les données de session, en PHP.",
      en: 'A project built around a database of the world’s countries. The goal: a software component that lets you pick a country from a dropdown and stores that choice in session data, in PHP.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Composer', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/php-session' }],
  },
  {
    id: 'php-webpage',
    name: 'PHP WebPage',
    category: 'school',
    description: {
      fr: "Classe PHP automatisant la construction de la structure d'une page web.",
      en: 'A PHP class that automates building the structure of a web page.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Composer', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/php-webpage' }],
  },
  {
    id: 'php-crud-music',
    name: 'php-crud-music',
    category: 'school',
    description: {
      fr: "Application web de gestion d'une base de données musicale, avec création, lecture, mise à jour et suppression des entités musicales.",
      en: 'A web application to manage a music database, with create, read, update and delete operations on the music entities.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Symfony', 'Composer', 'MySQL', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/php-crud-music' }],
  },
  {
    id: 'php-crud-tvshow',
    name: 'php-crud-tvshow',
    category: 'school',
    description: {
      fr: "Application web de gestion d'une base de données de séries télévisées, avec création, lecture, mise à jour et suppression des informations sur les séries.",
      en: 'A web application to manage a TV show database, with create, read, update and delete operations on the show information.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Symfony', 'Composer', 'MySQL', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/php-crud-tvshow' }],
  },
  {
    id: 'r410-bookmarks',
    name: 'r410-bookmarks',
    category: 'school',
    image: 'r410-bookmarks',
    description: {
      fr: "Application web de gestion de signets en React, mettant en place des composants pour afficher et paginer des notes.",
      en: 'A bookmark management web application in React, with components to display and paginate notes.',
    },
    stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/r410-bookmarks' }],
  },
  {
    id: 'r410-introduction',
    name: 'r410-introduction',
    category: 'school',
    image: 'r410-introduction',
    description: {
      fr: "Introduction au développement de composants web interactifs avec React, de la gestion du CSS et des assets jusqu'à la création et la spécialisation de composants réutilisables, en appliquant des outils de qualité de code.",
      en: 'An introduction to building interactive web components with React, from handling CSS and assets to creating and specialising reusable components, while applying code quality tooling.',
    },
    stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/r410-introduction' }],
  },
  {
    id: 'r301-js-movies',
    name: 'r301-js-movies',
    category: 'school',
    image: 'r301-js-movies',
    description: {
      fr: "Application web d'affichage et de gestion d'une collection de films : pagination, affichage des affiches et requêtes HTTP pour récupérer les données.",
      en: 'A web application to browse and manage a film collection: pagination, poster display and HTTP requests to fetch the data.',
    },
    stack: ['JavaScript', 'HTML', 'CSS', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/r301-js-movies' }],
  },
  {
    id: 'r301-js-fetch',
    name: 'r301-js-fetch',
    category: 'school',
    image: 'r301-js-fetch',
    description: {
      fr: 'Application servant d’introduction aux requêtes AJAX.',
      en: 'An application serving as an introduction to AJAX requests.',
    },
    stack: ['JavaScript', 'HTML', 'CSS', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/r301-js-fetch' }],
  },
  {
    id: 'r301-js-introduction',
    name: 'r301-js-introduction',
    category: 'school',
    image: 'r301-js-introduction',
    description: {
      fr: "Application de gestion et d'analyse d'utilisateurs : vérification de l'âge, filtrage et détection des mineurs, avec des tests de qualité de code et de DOM.",
      en: 'A user management and analysis application: age checking, filtering and detection of minors, with code quality and DOM tests.',
    },
    stack: ['JavaScript', 'HTML', 'CSS', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/r301-js-introduction' }],
  },
  {
    id: 'projet-msi-2',
    name: "Calcul d'emprunts",
    nameByLocale: { en: 'Loan calculator' },
    category: 'school',
    image: 'projet-msi-2',
    description: {
      fr: 'Application web de calcul et de gestion des emprunts.',
      en: 'A web application to calculate and manage loans.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Symfony', 'Composer', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/projet-msi-2' }],
  },
  {
    id: 'projet-msi-1',
    name: "Calcul d'intérêts",
    nameByLocale: { en: 'Interest calculator' },
    category: 'school',
    image: 'projet-msi-1',
    description: {
      fr: "Programme calculant automatiquement les intérêts simples d'un livret d'épargne, en tenant compte des versements, des retraits et des spécificités du calcul par quinzaines.",
      en: 'A program that automatically computes the simple interest of a savings account, accounting for deposits, withdrawals and the specifics of fortnightly calculation.',
    },
    stack: ['HTML', 'CSS', 'PHP', 'Composer', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/projet-msi' }],
  },
  {
    id: 'projet-tuto',
    name: 'Projet de tutoriel',
    nameByLocale: { en: 'Tutorial project' },
    category: 'school',
    image: 'projet-tuto',
    description: {
      fr: "Site web de tutoriel développé en plusieurs étapes, avec des éléments multimédias comme des vidéos et des pistes audio.",
      en: 'A tutorial website built in several stages, with multimedia elements such as videos and audio tracks.',
    },
    stack: ['JavaScript', 'HTML', 'CSS', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/projet-tuto' }],
  },
  {
    id: 'image-library',
    name: 'Image Library',
    category: 'school',
    image: 'image-library',
    description: {
      fr: "Application capable d'énumérer récursivement les images contenues dans un répertoire choisi par l'utilisateur.",
      en: 'An application able to recursively enumerate the images contained in a directory chosen by the user.',
    },
    stack: ['C++', 'Qt Creator', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/imagelibrary' }],
  },
  {
    id: 'chat-server-client',
    name: 'Chat Server / Client',
    category: 'school',
    image: 'chat-server-client',
    description: {
      fr: "Client de messagerie instantanée construit en deux parties : la première regroupe le moteur de l'application, la seconde l'interface graphique — liste des utilisateurs connectés, boîte de dialogue privée entre utilisateurs.",
      en: 'An instant messaging client built in two parts: the first holds the application engine, the second the graphical interface — list of connected users and private chat between users.',
    },
    stack: ['C++', 'Qt Creator', 'Git'],
    links: [
      { kind: 'repository', href: 'https://github.com/tom512000/chat-server', label: 'server' },
      { kind: 'repository', href: 'https://github.com/tom512000/chat-client', label: 'client' },
    ],
  },
  {
    id: 'battleship',
    name: 'Bataille navale',
    nameByLocale: { en: 'Battleship' },
    category: 'school',
    image: 'battleship',
    description: {
      fr: 'Version informatique du jeu de société « Bataille navale », réalisée avec la bibliothèque PyGame.',
      en: 'A computer version of the board game Battleship, built with the PyGame library.',
    },
    stack: ['Python', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/sae1_battleship' }],
  },
  {
    id: 'minesweeper',
    name: 'Démineur',
    nameByLocale: { en: 'Minesweeper' },
    category: 'school',
    image: 'minesweeper',
    description: {
      fr: 'Réalisation du jeu du démineur avec la bibliothèque PyGame.',
      en: 'An implementation of Minesweeper built with the PyGame library.',
    },
    stack: ['Python', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/SAE1_MineSweeper' }],
  },
  {
    id: 'labyrinthe',
    name: 'Labyrinthe',
    nameByLocale: { en: 'Maze' },
    category: 'school',
    image: 'labyrinthe',
    description: {
      fr: "Génération aléatoire de labyrinthes sous la forme d'un graphe non orienté, représenté de manière planaire par une grille : chaque cellule correspond à un sommet et l'absence de mur entre deux cellules adjacentes constitue une arête.",
      en: 'Random maze generation as an undirected graph, laid out planar as a grid: each cell is a vertex, and the absence of a wall between two adjacent cells forms an edge.',
    },
    stack: ['Python', 'Git'],
    links: [{ kind: 'repository', href: 'https://github.com/tom512000/MS202' }],
  },
]

/** Ordre d'affichage des catégories, filtre « tous » compris. */
export const PROJECT_CATEGORIES: readonly ProjectCategory[] = [
  'professional',
  'personal',
  'school',
]

/** Nom d'un projet dans la langue active, avec repli sur le nom canonique. */
export function projectName(project: Project, locale: Locale): string {
  return project.nameByLocale?.[locale] ?? project.name
}

export function countProjectsByCategory(category: ProjectCategory): number {
  return projects.filter((project) => project.category === category).length
}
