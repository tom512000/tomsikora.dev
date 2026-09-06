# tomsikora.dev

Portfolio de **Tom SIKORA**, développeur web full stack — [tomsikora.dev](https://tomsikora.dev)

Application statique React, bilingue (FR / EN) et bi-thème (clair / sombre).

## Stack

|             |                                                |
| ----------- | ---------------------------------------------- |
| Build       | Vite 8                                         |
| UI          | React 19 + TypeScript (strict)                 |
| Styles      | Tailwind CSS 4 (design tokens CSS-first)       |
| Animations  | [Motion](https://motion.dev)                   |
| Icônes      | lucide-react + marques SVG intégrées           |
| Typographie | Geist / Geist Mono (variables, auto-hébergées) |

## Démarrer

```bash
npm install
npm run dev      # serveur de développement
npm run build    # tsc -b && vite build  ->  dist/
npm run preview  # sert dist/ localement
npm run lint     # ESLint
npm run typecheck
npm run assets   # régénère public/img depuis assets-source/
```

`npm run build` produit un dossier `dist/` servable tel quel par n'importe quel
serveur statique (Nginx, Apache…). Aucun backend n'est nécessaire.

## Architecture

```
assets-source/     originaux lourds (PNG/JPEG, CV, favicon) — jamais servis
public/            racine statique servie : WebP dimensionnés, CV, SEO
scripts/           pipeline d'assets
src/
  components/
    layout/        en-tête, navigation mobile, pied de page, progression
    project/       showcase et index des projets
    ui/            briques du design system (LinkButton, Chip, Reveal…)
  data/            contenu factuel typé (projets, expériences, stack, événements)
  hooks/           scroll-spy, media query, métadonnées, verrou de scroll
  i18n/            dictionnaires fr/en, provider et hook
  lib/             types partagés, presets Motion, utilitaires
  sections/        les six sections de la page
  styles/          tokens.css (les deux thèmes) + index.css (thème Tailwind)
  theme/           provider et hook de thème
```

## Réseaux

[![LinkedIn](https://img.shields.io/badge/-Tom%20SIKORA-0366c3?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/tom-sikora-1a5188271)
[![Mail](https://img.shields.io/badge/-tom.sikora03@gmail.com-9DE62F?style=flat-square&logo=Gmail&logoColor=0a0a0b)](mailto:tom.sikora03@gmail.com)
[![GitHub](https://img.shields.io/github/followers/tom512000?label=follow&style=social)](https://github.com/tom512000)
