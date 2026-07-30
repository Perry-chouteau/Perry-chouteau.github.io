import type { I18nText } from './config';

/** Les chaines de l'interface, par opposition au contenu (src/content). */
export const ui = {
  skills: { fr: 'Compétences', en: 'Skills' },
  contact: { fr: 'Contact', en: 'Contact' },
  theme: { fr: 'Changer de thème', en: 'Toggle theme' },
  language: { fr: 'Langue', en: 'Language' },
  toTop: { fr: 'Haut de page', en: 'Back to top' },

  /* Etat des projets. Un lien mort est pire que pas de lien : on l'assume. */
  statusLive: { fr: 'En ligne', en: 'Live' },
  statusWip: { fr: 'En construction', en: 'In progress' },
  statusSource: { fr: 'Code public', en: 'Open source' },
  statusPrivate: { fr: 'Dépôt privé', en: 'Private repo' },
  statusArchived: { fr: 'Archivé', en: 'Archived' },

  projects: { fr: 'Projets', en: 'Projects' },
  projectsFull: { fr: 'Projets & organisations', en: 'Projects & organisations' },
  projectsLead: {
    fr: 'Une liste d’organisations et de projets dont je suis fier. Les projets sont des solutions monolithiques ; les organisations, plus élaborées, regroupent plusieurs dépôts autour d’un même écosystème.',
    en: 'A list of organisations and projects I am proud of. Projects are monolithic solutions; organisations, more elaborate, gather several repositories around a single ecosystem.',
  },
  experience: { fr: 'Expérience', en: 'Experience' },
  education: { fr: 'Formation', en: 'Education' },
  allProjects: { fr: 'Tous les projets', en: 'All projects' },
  backToProjects: { fr: 'Tous les projets', en: 'All projects' },
  seeProject: { fr: 'Voir le projet', en: 'View project' },
  subprojects: { fr: 'Les briques', en: 'The pieces' },
  mediaTitle: { fr: 'Ce que ça donne', en: 'What it produces' },
  smallTitle: { fr: 'Mini projets', en: 'Mini projects' },
  smallLead: {
    fr: 'Trop court pour mériter une page, trop bien pour le jeter.',
    en: 'Too short to deserve a page, too good to throw away.',
  },

  /* Les trois entrees de la navbar. */
  aboutMe: { fr: 'À propos', en: 'About me' },
  noneYet: { fr: 'Rien ici pour l\'instant.', en: 'Nothing here yet.' },
  noPhotoYet: { fr: 'Pas encore de photo.', en: 'No photo yet.' },
  otherPhotos: { fr: 'Autres photos', en: 'More photos' },
  seeMore: { fr: 'Voir', en: 'View' },
  previous: { fr: 'Précédent', en: 'Previous' },
  next: { fr: 'Suivant', en: 'Next' },
  life: { fr: 'Passions', en: 'Passions' },
  /*
   * Volontairement neutre et court : la raison d'etre est portee par chaque
   * domaine (voir domainLead), parce qu'elle n'est pas la meme pour le sport
   * et pour l'artisanat.
   */
  lifeLead: {
    fr: 'Ce que je fais du reste de mon temps.',
    en: 'What I do with the rest of my time.',
  },

  /* Les sections du sommaire lateral. */
  navPresentation: { fr: 'Présentation', en: 'Intro' },
  navContact: { fr: 'Me contacter', en: 'Get in touch' },
  navOrgs: { fr: 'Organisations', en: 'Organisations' },
  navStandalone: { fr: 'Projets', en: 'Projects' },
  navMini: { fr: 'Mini projets', en: 'Mini projects' },

  orgsLead: {
    fr: 'Plusieurs projets sous une même bannière, découpés par contexte — mobile, backend, services ou modules.',
    en: 'Several projects under one banner, split by context — mobile, backend, services or modules.',
  },
  standaloneLead: {
    fr: 'Un seul bloc, mené de bout en bout.',
    en: 'One block, taken end to end.',
  },

  present: { fr: "Aujourd'hui", en: 'Present' },

  downloadCv: { fr: 'Télécharger le CV', en: 'Download CV' },
  contactTitle: { fr: 'On en parle ?', en: 'Want to talk?' },
  contactBody: {
    fr: "Le plus simple reste le mail. Je réponds vite, et je suis joignable sur Paris comme sur Lyon.",
    en: 'Email is easiest. I reply fast, and I am reachable in Paris as well as Lyon.',
  },
  metaDescription: {
    fr: 'Ingénieur logiciel — C++ système, Go et cloud native. Ex-Dassault Systèmes, ex-Xo7. Disponible à Paris et Lyon.',
    en: 'Software engineer — systems C++, Go and cloud native. Ex-Dassault Systèmes, ex-Xo7. Available in Paris and Lyon.',
  },
} satisfies Record<string, I18nText>;
