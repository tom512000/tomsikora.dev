import type { Skill, SkillGroup } from '@/lib/types'

/**
 * Les 68 technologies du portfolio d'origine, dans les mêmes cinq groupes,
 * plus celles ajoutées depuis.
 *
 * `core: true` reprend exactement les entrées marquées « Favoris » (bordure
 * verte) dans l'ancien portfolio. Ce marquage vient de Tom, pas d'une
 * appréciation extérieure : il sert désormais à hiérarchiser l'affichage —
 * un core stack mis en avant, le reste en appui.
 */
const languages: readonly Skill[] = [
  { name: 'HTML', logo: 'html', href: 'https://developer.mozilla.org/fr/docs/Web/HTML' },
  { name: 'CSS', logo: 'css', href: 'https://developer.mozilla.org/fr/docs/Web/CSS' },
  {
    name: 'JavaScript',
    logo: 'javascript',
    href: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
  },
  { name: 'TypeScript', logo: 'typescript', href: 'https://www.typescriptlang.org/', core: true },
  { name: 'PHP', logo: 'php', href: 'https://www.php.net/' },
  { name: 'Node.js', logo: 'nodejs', href: 'https://nodejs.org/fr' },
  { name: 'Python', logo: 'python', href: 'https://www.python.org/' },
  { name: 'C++', logo: 'cpp', href: 'https://isocpp.org/' },
  { name: 'Go', logo: 'go', href: 'https://go.dev/' },
  { name: 'Dart', logo: 'dart', href: 'https://dart.dev/' },
  { name: 'F#', logo: 'fsharp', href: 'https://fsharp.org/' },
  { name: 'SQL', logo: 'sql', href: 'https://sql.sh/' },
  { name: 'PL/SQL', logo: 'pl-sql', href: 'https://www.oracle.com/fr/database/technologies/appdev/plsql.html' },
  { name: 'NoSQL', logo: 'nosql', href: 'https://aws.amazon.com/fr/nosql/' },
  { name: 'Markdown', logo: 'markdown', href: 'https://www.markdownguide.org/' },
]

const frameworks: readonly Skill[] = [
  { name: 'React', logo: 'react', href: 'https://react.dev/', core: true },
  { name: 'Symfony', logo: 'symfony', href: 'https://symfony.com/', core: true },
  { name: 'API Platform', logo: 'api-platform', href: 'https://api-platform.com/', core: true },
  { name: 'Tailwind CSS', logo: 'tailwind', href: 'https://tailwindcss.com/', core: true },
  { name: 'Vite', logo: 'vite', href: 'https://vite.dev/' },
  { name: 'Next.js', logo: 'nextjs', href: 'https://nextjs.org/' },
  { name: 'Vue.js', logo: 'vuejs', href: 'https://vuejs.org/' },
  { name: 'Nuxt', logo: 'nuxtjs', href: 'https://nuxt.com/' },
  { name: 'Express', logo: 'expressjs', href: 'https://expressjs.com/fr/' },
  { name: 'Three.js', logo: 'threejs', href: 'https://threejs.org/' },
  { name: 'Ant Design', logo: 'antdesign', href: 'https://ant.design/' },
  { name: 'shadcn/ui', logo: 'shadcn', href: 'https://ui.shadcn.com/' },
  { name: 'MUI', logo: 'mui', href: 'https://mui.com/' },
  { name: 'daisyUI', logo: 'daisyui', href: 'https://daisyui.com/' },
  { name: 'Bootstrap', logo: 'bootstrap', href: 'https://getbootstrap.com/' },
  { name: 'Animate.css', logo: 'animate-css', href: 'https://animate.style/' },
]

const databases: readonly Skill[] = [
  { name: 'PostgreSQL', logo: 'postgresql', href: 'https://www.postgresql.org/', core: true },
  { name: 'MySQL', logo: 'mysql', href: 'https://www.mysql.com/' },
  { name: 'MariaDB', logo: 'mariadb', href: 'https://mariadb.org/' },
  { name: 'SQLite', logo: 'sqlite', href: 'https://www.sqlite.org/' },
  { name: 'MongoDB', logo: 'mongodb', href: 'https://www.mongodb.com/' },
  { name: 'Oracle', logo: 'oracle', href: 'https://www.oracle.com/database/' },
]

const tools: readonly Skill[] = [
  { name: 'VS Code', logo: 'vscode', href: 'https://code.visualstudio.com/', core: true },
  { name: 'GitHub', logo: 'github', href: 'https://github.com/', core: true },
  { name: 'Figma', logo: 'figma', href: 'https://www.figma.com/' },
  { name: 'PhpStorm', logo: 'phpstorm', href: 'https://www.jetbrains.com/phpstorm/' },
  { name: 'WebStorm', logo: 'webstorm', href: 'https://www.jetbrains.com/webstorm/' },
  { name: 'PyCharm', logo: 'pycharm', href: 'https://www.jetbrains.com/pycharm/' },
  { name: 'Visual Studio', logo: 'visualstudio', href: 'https://visualstudio.microsoft.com/fr/' },
  { name: 'Qt Creator', logo: 'qtcreator', href: 'https://www.qt.io/product/development-tools' },
  { name: 'Android Studio', logo: 'android-studio', href: 'https://developer.android.com/studio?hl=fr' },
  { name: 'Flutter', logo: 'flutter', href: 'https://flutter.dev/' },
  { name: 'GitLab', logo: 'gitlab', href: 'https://about.gitlab.com/' },
  { name: 'PenPot', logo: 'penpot', href: 'https://penpot.app/' },
  { name: 'phpMyAdmin', logo: 'phpmyadmin', href: 'https://www.phpmyadmin.net/' },
  { name: 'Adminer', logo: 'adminer', href: 'https://www.adminer.org/en/' },
  { name: 'Proxmox', logo: 'proxmox', href: 'https://www.proxmox.com/en/' },
  { name: 'JupyterHub', logo: 'jupyterhub', href: 'https://jupyter.org/hub' },
  { name: 'Wireshark', logo: 'wireshark', href: 'https://www.wireshark.org/' },
  { name: 'Packet Tracer', logo: 'packet-tracer', href: 'https://www.netacad.com/courses/packet-tracer' },
  { name: 'FileZilla', logo: 'filezilla', href: 'https://filezilla-project.org/' },
  { name: 'Godot', logo: 'godot', href: 'https://godotengine.org/' },
  { name: 'Unity', logo: 'unity', href: 'https://unity.com/fr' },
  { name: 'Trello', logo: 'trello', href: 'https://trello.com/fr' },
  { name: 'Microsoft Planner', logo: 'microsoft-planner', href: 'https://tasks.office.com/' },
  { name: 'Microsoft 365', logo: 'microsoft365', href: 'https://www.microsoft.com/fr-fr/microsoft-365' },
  {
    name: 'Microsoft Access',
    logo: 'microsoft-access',
    href: 'https://www.microsoft.com/fr-fr/microsoft-365/access',
  },
]

const other: readonly Skill[] = [
  { name: 'Git', logo: 'git', href: 'https://git-scm.com/', core: true },
  { name: 'Docker', logo: 'docker', href: 'https://www.docker.com/', core: true },
  { name: 'CI/CD', logo: 'pipeline', href: 'https://about.gitlab.com/fr-fr/topics/ci-cd/cicd-pipeline/' },
  { name: 'Nginx', logo: 'nginx', href: 'https://nginx.org/' },
  { name: 'Apache', logo: 'apache', href: 'https://httpd.apache.org/' },
  { name: 'Composer', logo: 'composer', href: 'https://getcomposer.org/' },
  { name: 'npm', logo: 'npm', href: 'https://www.npmjs.com/' },
]

export const skillGroups: readonly SkillGroup[] = [
  { id: 'languages', skills: languages },
  { id: 'frameworks', skills: frameworks },
  { id: 'databases', skills: databases },
  { id: 'tools', skills: tools },
  { id: 'other', skills: other },
]

/** Le core stack, dans un ordre lisible plutôt que dans l'ordre des groupes. */
export const coreStack: readonly Skill[] = [
  ...frameworks.filter((skill) => skill.core),
  ...languages.filter((skill) => skill.core),
  ...databases.filter((skill) => skill.core),
  ...other.filter((skill) => skill.core),
  ...tools.filter((skill) => skill.core),
]

export const skillCount = skillGroups.reduce((total, group) => total + group.skills.length, 0)
