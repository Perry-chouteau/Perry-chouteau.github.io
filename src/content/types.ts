import type { I18nText } from '../i18n/config';

/**
 * Deux familles distinctes, et c'est voulu :
 * - Experience / Education vivent sur la page principale (le CV).
 * - Project vit dans /projects, avec sa propre page de detail.
 *
 * Elles ne partagent PAS de type de base : un projet a besoin de raconter
 * une histoire (blocs, medias, contexte), un poste non.
 */

export type Link = {
  label: string;
  url: string;
  type: 'repo' | 'live' | 'doc' | 'package' | 'demo';
};

/**
 * Une image. `src` est un NOM DE FICHIER depose dans src/assets/media/ —
 * pas un chemin, pas de slash.
 *
 * Deux ecritures, selon ce que tu as le courage d'ecrire :
 *
 *   media: ['mur-avant.jpg', 'mur-apres.jpg']          // le plus court
 *   media: [{ src: 'mur.jpg', caption: { fr: '...', en: '...' } }]
 *
 * Passer par src/assets/ et pas public/ : public/ copie le fichier tel quel
 * (une photo de telephone fait 4 Mo), src/assets/ le fait passer par sharp
 * au build et sort du WebP redimensionne. Le portrait : 1,3 Mo -> 25 Ko.
 *
 * Fichier absent = build CASSE. C'est voulu : mieux vaut echouer au build
 * qu'afficher une image morte en production.
 */
export type Media = {
  src: string;
  /** Optionnel : a defaut, la legende ou le titre du projet sert d'alt. */
  alt?: I18nText;
  caption?: I18nText;
};

/** Un nom de fichier tout court, ou l'objet complet. */
export type MediaInput = string | Media;

/* --- CV ----------------------------------------------------------------- */

export type Experience = {
  id: string;
  company: string;
  companyUrl?: string;
  role: I18nText;
  location: string;
  date: { start: string; end?: string };
  summary: I18nText;
  bullets?: I18nText[];
  stack?: string[];
};

export type Education = {
  id: string;
  school: string;
  location: string;
  rncp?: string;
  date: { start: string; end?: string };
  title: I18nText;
  summary: I18nText;
  stack?: string[];
};

/* --- Projets ------------------------------------------------------------ */

/**
 * L'axe "contexte" des categories. La stack est le second axe, elle sort
 * directement du champ `stack` des projets.
 */
export type ContextId = 'logiciel' | 'cloud' | 'product' | 'tooling';

/**
 * L'etat REEL, sans euphemisme. `archived` existe exprès : un projet mort
 * bien raconte vaut mieux qu'un projet mort caché, et le cacher se voit.
 * - live     : deploye, joignable maintenant
 * - wip      : en cours de construction
 * - source   : pas de demo, le code est public
 * - private  : depot ferme (produit commercial, NDA...)
 * - archived : arrete. On montre le taff, pas le uptime.
 */
export type ProjectStatus = 'live' | 'wip' | 'source' | 'private' | 'archived';

/** Un bloc de la page de detail. Libre : titre + paragraphes ou puces. */
export type Block = {
  heading: I18nText;
  body?: I18nText;
  bullets?: I18nText[];
};

/**
 * Une brique d'un projet : une lib d'une org, un module d'un SDK.
 * Ses images vivent dans un DOSSIER (media/<dir>/), comme partout ailleurs :
 * deposer un schema ou une capture suffit a le publier.
 */
export type SubProject = {
  id: string;
  /** Nom propre (ecs, procedurals, igraphic) : pas traduit. */
  title: string;
  /** Une ligne, pour la carte. */
  summary: I18nText;
  /** Le corps de la page dediee : blocs libres, comme un projet. */
  blocks?: Block[];
  /** Dossier sous src/assets/media/ : schemas, captures, resultats. */
  dir?: string;
  stack?: string[];
  links?: Link[];
};

export type Project = {
  id: string;
  title: I18nText;
  /** Une ligne, pour la carte de l'index. */
  tagline: I18nText;
  /** Deux ou trois lignes, en tete de la page de detail. */
  summary: I18nText;
  context: ContextId;
  status: ProjectStatus;
  stack: string[];
  org?: string;
  date: { start: string; end?: string };
  featured?: boolean;
  links?: Link[];
  /** Le corps de la page de detail. Sans blocs, la page reste minimale. */
  blocks?: Block[];
  /** Les briques du projet, chacune avec ses images. */
  subprojects?: SubProject[];
  media?: MediaInput[];
};
