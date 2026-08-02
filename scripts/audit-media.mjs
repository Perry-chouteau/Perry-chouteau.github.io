/*
 * Audit des visuels — NON bloquant, informatif.
 *
 * Pour chaque projet, sous-projet et activité du contenu, dit s'il a au moins
 * une image sur le disque. Complementaire de check-media.mjs (qui, lui, ne
 * regarde que les dossiers references) : ici on enumere les ENTITES et on
 * pointe celles qui n'ont aucun visuel — la liste de ce qu'il reste a produire.
 *
 *   npm run audit:media
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src/assets/media';
const EXT = /\.(png|jpe?g|webp|avif)$/i;

const countImages = (dir) => {
  if (!dir || !existsSync(join(ROOT, dir))) return -1; // -1 = dossier absent
  return readdirSync(join(ROOT, dir)).filter((f) => EXT.test(f)).length;
};
const mark = (n) => (n > 0 ? `\x1b[32m✓ ${n} img\x1b[0m` : n === 0 ? '\x1b[33m∅ vide\x1b[0m' : '\x1b[31m✗ absent\x1b[0m');

/** Extrait un libelle depuis une valeur de champ : 'x' ou { fr: 'x' }. */
const nameFrom = (line) =>
  (line.match(/(?:id|title):\s*'([^']+)'/) || line.match(/fr:\s*'([^']+)'/) || [])[1];

/** Coupe un fichier en blocs de premier niveau (chaque objet du tableau exporte). */
const topBlocks = (text) => {
  const lines = text.split('\n');
  const blocks = [];
  let cur = null;
  for (const l of lines) {
    if (/^\s{2}\{\s*$/.test(l)) { cur = []; blocks.push(cur); }
    if (cur) cur.push(l);
  }
  return blocks.map((b) => b.join('\n'));
};

/** Toutes les paires (nom, dir) d'un texte, en suivant le dernier id/title vu. */
const refs = (text) => {
  const out = [];
  let last = '(?)';
  for (const l of text.split('\n')) {
    const nm = nameFrom(l);
    if (nm) last = nm;
    const d = l.match(/(?:dir|coverDir):\s*'([^']+)'/);
    if (d) out.push({ name: last, dir: d[1] });
    // media: ['sub/dir/file.jpg', ...] -> on remonte au dossier
    for (const m of l.matchAll(/['"]([^'"]+\.(?:png|jpe?g|webp|avif))['"]/g)) {
      out.push({ name: last, dir: m[1].split('/').slice(0, -1).join('/'), file: true });
    }
  }
  return out;
};

const report = (heading, text, opts = {}) => {
  console.log(`\n\x1b[1m${heading}\x1b[0m`);
  const seen = new Set();
  const rows = [];

  if (opts.byBlock) {
    // niveau PROJET : un projet "a un visuel" s'il a une image quelque part dans son bloc
    for (const block of topBlocks(text)) {
      const id = (block.match(/id:\s*'([^']+)'/) || [])[1] || '(?)';
      const dirs = refs(block);
      const best = Math.max(-1, ...dirs.map((r) => countImages(r.dir)));
      rows.push([id, best]);
    }
  } else {
    for (const r of refs(text)) {
      const key = r.name + '|' + r.dir;
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push([`${r.name}  \x1b[90m(${r.dir})\x1b[0m`, countImages(r.dir)]);
    }
  }

  const missing = rows.filter(([, n]) => n <= 0);
  for (const [label, n] of rows) console.log(`  ${mark(n).padEnd(22)} ${label}`);
  return { total: rows.length, missing: missing.length };
};

const projects = readFileSync('src/content/projects.ts', 'utf8');
const life = readFileSync('src/content/life.ts', 'utf8');

let t = 0, m = 0;
for (const [h, txt, o] of [
  ['PROJETS — un visuel par projet ?', projects, { byBlock: true }],
  ['SOUS-PROJETS & MEDIAS (projects.ts)', projects, {}],
  ['ACTIVITES (life.ts)', life, {}],
]) {
  const r = report(h, txt, o);
  t += r.total; m += r.missing;
}

console.log(`\n\x1b[1mBilan\x1b[0m : ${t - m}/${t} entites avec image · \x1b[31m${m} sans visuel\x1b[0m\n`);
