import type { I18nText } from '../i18n/config';
import type { ContextId } from './types';

/**
 * Premier axe de filtrage. Volontairement court : trois familles suffisent
 * a couvrir ce que Perry construit, et un filtre a douze entrees ne se
 * lit plus.
 */
export const contexts: { id: ContextId; label: I18nText; blurb: I18nText }[] = [
  {
    id: 'logiciel',
    label: { fr: 'Ingénierie logicielle', en: 'Software Engineering' },
    blurb: {
      fr: 'C/C++, Golang, SDK. Tout mon savoir-faire en ingénierie logicielle, du bas niveau au haut niveau.',
      en: 'C/C++, Golang, SDK. All my knowledge about software engineering, from the low-level to the high-level.',
    },
  },
  {
    id: 'cloud',
    label: { fr: 'Cloud & infrastructure', en: 'Cloud & infrastructure' },
    blurb: {
      fr: 'Kubernetes, CI/CD, self-hosting de bout en bout.',
      en: 'Kubernetes, CI/CD, end-to-end self-hosting.',
    },
  },
  {
    id: 'product',
    label: { fr: 'Produits', en: 'Products' },
    blurb: {
      fr: 'Des applications avec de vrais utilisateurs en face.',
      en: 'Applications with real users on the other side.',
    },
  },
  {
    id: 'tooling',
    label: { fr: 'Outillage & DX', en: 'Tooling & DX' },
    blurb: {
      fr: 'Les outils que je construis pour me débarrasser de ce qui m’agace.',
      en: 'The tools I build to get rid of what annoys me.',
    },
  },
];

export const contextOf = (id: ContextId) => contexts.find((c) => c.id === id)!;
