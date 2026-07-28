/*
 * Verifie que chaque dossier `dir` / `coverDir` du contenu existe vraiment.
 *
 * Pourquoi un script et pas un controle dans src/lib/media.ts : import.meta.glob
 * ne voit que des FICHIERS. Un dossier vide et un dossier renome y sont
 * indistinguables — or le premier est legitime (photos a venir) et le second
 * est un bug qui sort une page vide en silence. fs sait faire la difference.
 *
 * Sortie non nulle = build interrompu. C'est le but : mieux vaut casser ici
 * qu'afficher une page sans photos a un recruteur.
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

for (const dir of manquants) {
  const feuille = dir.split('/').pop();
  const proches = present.filter((p) => p.endsWith('/' + feuille) || p.includes(feuille));
  console.error(
    `✗ ${dir} — dossier introuvable.` +
      (proches.length ? ` Renome en : ${proches.join(', ')} ?` : '') +
      `\n  Si les photos n'existent pas encore, retire le champ dir.`,
  );
}
for (const dir of vides) console.warn(`· ${dir} — dossier present mais sans image.`);
for (const dir of orphelins) console.warn(`· ${dir} — des images, mais aucun contenu ne les affiche.`);

if (manquants.length) {
  console.error(`\n${manquants.length} dossier(s) media introuvable(s).`);
  process.exit(1);
}
console.log(`✓ media : ${refs.length} dossiers references, tous presents.`);
