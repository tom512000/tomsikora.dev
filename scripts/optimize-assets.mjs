/**
 * Pipeline d'assets : assets-source/ -> public/
 *
 * Les originaux (PNG/JPEG lourds, CV, favicon) restent dans `assets-source/`,
 * hors du dossier servi : ils ne partent jamais en production mais restent
 * disponibles pour régénérer d'autres tailles. `public/` ne contient que les
 * WebP dimensionnés pour les usages réels de l'interface.
 *
 *   npm run assets
 *
 * Idempotent : relancer le script écrase les sorties par les mêmes résultats.
 */
import { mkdir, copyFile, readdir } from 'node:fs/promises'
import { dirname, extname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'assets-source')
const OUT = join(ROOT, 'public')

/** Largeurs réellement consommées par les composants, rien de plus. */
const RECIPES = [
  // Portrait du hero : deux paliers pour le srcset. 1086 est la largeur
  // native de la source — au-delà on n'agrandirait pas, et le descripteur `w`
  // annoncerait une résolution qui n'existe pas.
  { from: 'img/photo.png', to: 'img/photo-1086.webp', width: 1086, quality: 82 },
  { from: 'img/photo.png', to: 'img/photo-640.webp', width: 640, quality: 84 },
  // Icône de l'application.
  { from: 'img/logo-512x512.png', to: 'img/logo-512.webp', width: 512, quality: 90 },
]

/** Dossiers traités en lot : largeurs identiques pour toutes les entrées. */
const BATCHES = [
  { dir: 'img/projects', widths: [1280, 640], quality: [80, 76] },
  { dir: 'img/events', widths: [1200, 600], quality: [80, 76] },
  { dir: 'img/logos', widths: [96], quality: [90] },
]

/** Copiés tels quels : le navigateur ou l'hébergeur les attend à l'identique. */
const COPIES = [
  { from: 'files/CV-Tom-SIKORA.pdf', to: 'files/CV-Tom-SIKORA.pdf' },
  { from: 'favicon.ico', to: 'favicon.ico' },
  { from: 'img/logo-512x512.png', to: 'img/logo-512x512.png' },
]

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])

let written = 0

async function toWebp(from, to, width, quality) {
  const target = join(OUT, to)
  await mkdir(dirname(target), { recursive: true })
  await sharp(join(SRC, from))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(target)
  written += 1
}

for (const recipe of RECIPES) {
  await toWebp(recipe.from, recipe.to, recipe.width, recipe.quality)
}

for (const batch of BATCHES) {
  const entries = await readdir(join(SRC, batch.dir))

  for (const entry of entries) {
    if (!IMAGE_EXTENSIONS.has(extname(entry).toLowerCase())) continue
    const stem = basename(entry, extname(entry))

    for (const [index, width] of batch.widths.entries()) {
      // Une seule largeur : pas de suffixe, il n'y a pas de srcset à composer.
      const suffix = batch.widths.length === 1 ? '' : `-${String(width)}`
      await toWebp(
        join(batch.dir, entry),
        `${batch.dir}/${stem}${suffix}.webp`,
        width,
        batch.quality[index] ?? 80,
      )
    }
  }
}

for (const copy of COPIES) {
  const target = join(OUT, copy.to)
  await mkdir(dirname(target), { recursive: true })
  await copyFile(join(SRC, copy.from), target)
  written += 1
}

process.stdout.write(`${String(written)} fichiers écrits dans public/\n`)
