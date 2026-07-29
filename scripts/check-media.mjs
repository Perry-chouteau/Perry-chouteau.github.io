/*
 * Diagnostic des dossiers `dir` / `coverDir` du contenu — NON bloquant.
 *
 * Politique : un dossier vide OU absent est legitime (photos a venir, ou
 * projet sans galerie). Le rendu gere deja ce cas — src/lib/media.ts renvoie
 * simplement aucune image, donc la page sort sans media. Ce script ne fait
 * donc que LOGGER, il n'interrompt jamais le build.
 *
 * import.meta.glob ne voit que des FICHIERS : un dossier vide et un dossier
 * renome y sont indistinguables. fs sait faire la difference, d'ou ce script :
 * il surface un eventuel renommage (typo) dans les logs, sans pour autant
 * casser la CI si le dossier n'existe pas encore.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src/assets/media';
const CONTENT = ['src/content/life.ts', 'src/content/projects.ts'];
const EXT = /\.(png|jpe?g|webp|avif)$/i;

const source = CONTENT.map((f) => readFileSync(f, 'utf8')).join('\n');
const refs = [...new Set([...source.matchAll(/(?:dir|coverDir):\s*['"]([^'"]+)['"]/g)].map((m) => m[1]))];

/* Tous les dossiers reellement presents, pour proposer une correction utile. */
const walk = (rel = '') =>
  readdirSync(join(ROOT, rel), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? [join(rel, e.name), ...walk(join(rel, e.name))] : [],
  );
const present = walk();

const manquants = refs.filter((r) => !existsSync(join(ROOT, r)));
const vides = refs.filter(
  (r) => existsSync(join(ROOT, r)) && !readdirSync(join(ROOT, r)).some((f) => EXT.test(f)),
);
const orphelins = present.filter(
  (d) => !refs.includes(d) && readdirSync(join(ROOT, d)).some((f) => EXT.test(f)),
);

/*
 * Absent : aucune image affichee, c'est OK. On le signale quand meme au cas ou
 * ce serait un renommage (le "proches" pointe vers un dossier au meme nom).
 */
for (const dir of manquants) {
  const feuille = dir.split('/').pop();
  const proches = present.filter((p) => p.endsWith('/' + feuille) || p.includes(feuille));
  console.warn(
    `· ${dir} — absent, aucun media affiche.` +
      (proches.length ? ` (renome en ${proches.join(', ')} ?)` : ''),
  );
}
for (const dir of vides) console.warn(`· ${dir} — dossier present mais sans image.`);
for (const dir of orphelins) console.warn(`· ${dir} — des images, mais aucun contenu ne les affiche.`);

const affiches = refs.length - manquants.length - vides.length;
console.log(`✓ media : ${affiches}/${refs.length} dossiers references avec images.`);
