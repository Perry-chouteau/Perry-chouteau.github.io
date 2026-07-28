import type { ImageMetadata } from 'astro';

/*
 * Un seul glob pour tout le site. import.meta.glob est resolu au BUILD : Vite
 * inspecte le disque a la compilation, il n'y a aucune lecture de fichier a
 * l'execution.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/media/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const ROOT = '/src/assets/media/';
const clean = (dir: string) => dir.replace(/^\/+|\/+$/g, '');

/*
 * Un `dir` qui pointe dans le vide ne casse rien ici : la page sort sans
 * photos. C'est voulu — un dossier vide est un cas legitime (photos a venir).
 * Distinguer "vide" de "renome" demande de lire le disque, ce que glob ne
 * fait pas : c'est le role de scripts/check-media.mjs, lance avant le build.
 */

/**
 * Les images d'un dossier, triees par nom de fichier.
 *
 * On reference un DOSSIER et pas des noms de fichiers : deposer une photo
 * suffit a la faire apparaitre, sans toucher au contenu. C'est ce qui evite
 * de recasser 15 references a chaque reorganisation.
 *
 * Non recursif : media/coree-a-pied/daegu ne remonte pas les photos de
 * daegu/palgongsan, sinon une ville avalerait ses sommets.
 */
export const imagesIn = (dir?: string): ImageMetadata[] => {
  if (!dir) return [];
  const prefix = ROOT + clean(dir) + '/';
  return Object.entries(files)
    .filter(([p]) => p.startsWith(prefix) && !p.slice(prefix.length).includes('/'))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
};

/**
 * Separe portrait et paysage.
 *
 * Melanger les deux dans une grille a hauteur libre donne des cartes de
 * hauteurs differentes : une photo verticale occupe la moitie de la largeur
 * d'une horizontale, et la grille part en vrille. En les groupant, chaque
 * groupe a un ratio unique — plus de trous, et le recadrage reste minime.
 */
export const byOrientation = (images: ImageMetadata[]) => ({
  portrait: images.filter((i) => i.height > i.width),
  landscape: images.filter((i) => i.height <= i.width),
});

/** Idem mais recursif : pour la couverture d'une categorie entiere. */
export const imagesUnder = (dir?: string, max = Infinity): ImageMetadata[] => {
  if (!dir) return [];
  const prefix = ROOT + clean(dir) + '/';
  return Object.entries(files)
    .filter(([p]) => p.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default)
    .slice(0, max);
};
