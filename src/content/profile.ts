import type { I18nText } from '../i18n/config';

/**
 * L'identite. Source unique : plus aucune coordonnee en dur ailleurs.
 * Tout vient des CV (Main / Principale / Logiciel / Alternance).
 */
export const profile = {
  name: 'Perry Chouteau',
  title: {
    fr: 'Ingénieur logiciel',
    en: 'Software Engineer',
  } satisfies I18nText,

  /**
   * Volontairement sans type de contrat : annoncer "alternance" ecarte les
   * recruteurs CDI et l'inverse aussi. On dit qu'il est joignable, pas ce
   * qu'il cherche.
   */
  availability: {
    fr: 'Disponible · Paris & Lyon',
    en: 'Available · Paris & Lyon',
  } satisfies I18nText,

  pitch: {
    fr: "C++, Go et cloud native. J'ai livré du code C++ en production chez Dassault Systèmes et du serverless Go sur AWS chez Xo7. Le reste du temps, je construis mes propres outils et Services.",
    en: "C++, Go and cloud native. I've shipped C++ code in production at Dassault Systèmes and serverless Go on AWS at Xo7. The rest of the time, I build my own tools and services.",
  } satisfies I18nText,

  email: 'perry.chouteau@outlook.com',
  phone: '+33 6 87 90 95 33',
  github: 'https://github.com/Perry-chouteau',
  linkedin: 'https://www.linkedin.com/in/perry-chouteau-56292a206/',

  /**
   * La photo n'est PAS ici : elle vit dans src/assets/perry.jpg et est
   * importee par la page. Passer par src/assets (et pas public/) laisse
   * astro:assets la redimensionner et la convertir en WebP au build.
   *
   * Le CV reste un simple chemin public/. Tant que c'est undefined, le bouton
   * de telechargement n'est pas rendu du tout : pas de lien mort.
   *   cv: '/cv-perry-chouteau.pdf'
   */
  cv: undefined as string | undefined,

  /** Chiffres du hero. Un recruteur les lit avant les phrases. */
  stats: [
    { value: '6', label: { fr: 'ans de code', en: 'years coding' } },
    { value: '4', label: { fr: 'entreprises', en: 'companies' } },
    { value: '1', label: { fr: 'an en Corée', en: 'year in Korea' } },
  ],
} as const;

/**
 * La lettre de Remy Thomasse (R&D ENOVIA Software Engineering Manager,
 * Dassault Systemes, 10/12/2025). Citation nominative d'un manager R&D :
 * c'est la preuve la plus forte du dossier, elle passe haut dans la page.
 */
export const recommendation = {
  quote: {
    fr: "Perry a obtenu des résultats utiles et concrets qui prouvent sa capacité à développer dans un contexte industriel avec une grande adaptabilité.",
    en: 'Perry delivered useful, concrete results that prove his ability to develop in an industrial context with great adaptability.',
  } satisfies I18nText,
  context: {
    fr: "Sur un sujet de modélisation géométrique et topologique dont il n'était pourtant pas spécialiste.",
    en: 'On a geometric and topological modelling problem he was not a specialist in.',
  } satisfies I18nText,
  author: 'Rémy Thomasse',
  role: {
    fr: 'R&D ENOVIA Software Engineering Manager, Dassault Systèmes',
    en: 'R&D ENOVIA Software Engineering Manager, Dassault Systèmes',
  } satisfies I18nText,
  date: '2025-12',
} as const;
