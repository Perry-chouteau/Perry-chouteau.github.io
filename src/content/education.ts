import type { Education } from './types';

/**
 * L'alternance 2026-2028 (The Progress Factory / Ynov Connect) n'est PAS ici :
 * rien n'est signe, et l'annoncer trahirait le choix de ne pas cibler un type
 * de contrat. A ajouter le jour ou c'est acte.
 */
export const education: Education[] = [
    {
      id: 'epitech',
      school: 'Epitech — European Institute of Technology',
      location: 'Paris',
      rncp: 'RNCP 37985',
      date: { start: '2020-09', end: '2025-09' },
      title: {
        fr: "Master — Expert en Technologies de l'Information",
        en: 'Master — Information Technology Expert',
      },
      summary: {
        fr: "Expert en ingénierie logicielle. Cinq ans d'expérience, à travers produits, systèmes et infrastructure",
        en: 'Expert in software engineering. Five years of experience, across products, systems and infrastructure',
      },
      stack: ['cpp', 'c', 'git', 'flutter', 'typescript', 'cicd', 'docker', 'kubernetes', 'microservices', 'iac', 'sql', 'network', 'crossplatform', 'go'],
    },
    {
      id: 'keimyung',
      school: 'Keimyung University',
      location: 'Daegu, Corée du Sud',
      date: { start: '2023-09', end: '2024-06' },
      title: { fr: 'Échange universitaire', en: 'Exchange programme' },
      summary: {
        fr: 'Un an en Corée du Sud, spécialisation en physique et infographie.',
        en: 'A year in South Korea, specialising in computer physics & graphics.',
      },
      stack: ['gamedev', 'graphics', 'physics'],
    },
];
