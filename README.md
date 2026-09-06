# tomsikora.dev

Portfolio de **Tom SIKORA**, développeur web full stack — [tomsikora.dev](https://tomsikora.dev)

Application statique React, bilingue (FR / EN) et bi-thème (clair / sombre).

## Stack

| | |
|---|---|
| Build | Vite 8 |
| UI | React 19 + TypeScript (strict) |
| Styles | Tailwind CSS 4 (design tokens CSS-first) |
| Animations | [Motion](https://motion.dev) |
| Icônes | lucide-react + marques SVG intégrées |
| Typographie | Geist / Geist Mono (variables, auto-hébergées) |

Aucune bibliothèque de composants : toute l'interface est écrite pour ce projet.

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

### Assets

Les originaux vivent dans `assets-source/` et ne partent jamais en
production. `npm run assets` les dérive vers `public/` en WebP, aux seules
largeurs réellement consommées par les composants — portrait 640/1086,
captures 640/1280, photos d'événements 600/1200, logos 96. Les images du
portfolio d'origine passent ainsi de 14,7 Mo à 2,3 Mo, soit environ 84 %.

L'image Open Graph `public/img/og.png` est une capture 1200 × 630 du gabarit
de la page, rendue avec les vrais tokens et la vraie typographie : elle est
committée telle quelle.

### Contenu

Le contenu factuel vit dans `src/data`. Chaque champ traduit est typé
`LocalizedText` (`{ fr, en }`) : ajouter un projet ou une expérience ne demande
de toucher à aucun composant.

### Internationalisation

`src/i18n/fr.ts` est la source de vérité. `en.ts` est contraint par
`satisfies Dictionary` — **une clé manquante est une erreur de compilation**,
pas une chaîne oubliée découverte en production. La langue est persistée dans
`localStorage` (`tsk.locale`) et reflétée sur `<html lang>`.

Ajouter une troisième langue : étendre `LOCALES` dans `src/lib/types.ts`,
ajouter le dictionnaire, compléter les champs `LocalizedText` signalés par
TypeScript.

### Thèmes

Les deux thèmes sont définis une seule fois dans `src/styles/tokens.css` sous
forme de rôles (`--bg`, `--surface`, `--fg`, `--accent-ink`…), exposés à
Tailwind par `@theme inline`. Aucun composant ne manipule de couleur brute.

Le thème est appliqué sur `<html data-theme>` par un script d'amorçage dans
`index.html`, avant le premier paint : pas de flash au chargement. Défaut :
thème clair. Préférence persistée dans `localStorage` (`tsk.theme`).

### Accessibilité

HTML sémantique, navigation clavier complète (menu mobile en boîte de dialogue
avec piège à focus, filtres projets en `tablist` avec tabindex glissant), un
anneau de focus unique, cibles tactiles de 44 px, et `prefers-reduced-motion`
géré globalement par `<MotionConfig reducedMotion="user">`.

## Réseaux

[![LinkedIn](https://img.shields.io/badge/-Tom%20SIKORA-0366c3?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/tom-sikora-1a5188271)
[![Mail](https://img.shields.io/badge/-tom.sikora03@gmail.com-9DE62F?style=flat-square&logo=Gmail&logoColor=0a0a0b)](mailto:tom.sikora03@gmail.com)
[![GitHub](https://img.shields.io/github/followers/tom512000?label=follow&style=social)](https://github.com/tom512000)
