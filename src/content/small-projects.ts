import type { I18nText } from '../i18n/config';

/**
 * Le second niveau : trop petit pour meriter une page, trop bien pour etre
 * jete. Une ligne, une stack, un lien vers le depot. Pas de page de detail,
 * pas de filtre — c'est une liste, elle se lit d'un coup d'oeil.
 *
 * Le critere d'entree : est-ce que ca montre quelque chose qu'un exercice
 * d'ecole standard ne montre pas ? Si un autre Epitech a exactement le meme
 * depot, ca n'a rien a faire ici.
 */
export type SmallProject = {
  id: string;
  /** Nom propre : pas traduit. */
  name: string;
  blurb: I18nText;
  stack: string[];
  url?: string;
  year: string;
};

export const smallProjects: SmallProject[] = [];
