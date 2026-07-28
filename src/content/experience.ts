import type { Experience } from './types';

export const experience: Experience[] = [
    {
      id: 'dassault',
      company: 'Dassault Systèmes',
      companyUrl: 'https://www.3ds.com',
      role: { fr: 'R&D Ingénieur Logiciel', en: 'R&D Software Engineer' },
      location: 'Vélizy-Villacoublay',
      date: { start: '2025-03', end: '2025-09' },
      summary: {
        fr: "Interopérabilité géométrique dans la base de code C++ d'ENOVIA.",
        en: "Geometric interoperability inside ENOVIA's C++ codebase.",
      },
      bullets: [
        {
          fr: "Amélioration de l'import de modèles 3D exacts en C++.",
          en: 'Improved exact 3D model import in C++.',
        },
        {
          fr: 'Optimisation géométrique et topologique : temps de traitement réduits, précision accrue.',
          en: 'Geometric and topological optimisation: lower processing time, higher precision.',
        },
        {
          fr: 'Traitement des formes canoniques périodiques pour simplifier les géométries.',
          en: 'Handling of periodic canonical shapes to simplify geometries.',
        },
      ],
      stack: ['cpp', 'cmake', 'geometry'],
    },
    {
      id: 'xo7',
      company: 'Xo7',
      role: { fr: 'Développeur Backend / DevOps', en: 'Backend / DevOps Engineer' },
      location: 'Paris',
      date: { start: '2023-04', end: '2023-09' },
      summary: {
        fr: 'Serverless Go sur AWS, et pilotage des pipelines GitLab CI/CD depuis Slack.',
        en: 'Go serverless on AWS, driving GitLab CI/CD pipelines from Slack.',
      },
      bullets: [
        {
          fr: 'Intégration serverless en Go sur AWS (Lambda, API Gateway, SSM, IAM) pour piloter les pipelines GitLab CI/CD depuis Slack.',
          en: 'Go serverless integration on AWS (Lambda, API Gateway, SSM, IAM) to drive GitLab CI/CD pipelines from Slack.',
        },
        {
          fr: "Back-office Express/TypeScript : génération automatique d'images de profil via Lambda et S3.",
          en: 'Express/TypeScript back-office: automatic profile image generation via Lambda and S3.',
        },
      ],
      stack: ['go', 'aws', 'typescript', 'express', 'gitlab-ci'],
    },
    {
      id: 'freelance',
      company: 'Freelance / OpenSource',
      role: {
        fr: "Expert en technologie de l'information",
        en: 'Information Technology Expert',
      },
      location: 'Remote',
      date: { start: '2022-01' },
      summary: {
        fr: 'Orchestration cloud native chez Vocal30, et développement de mes propres outils C++ sans dépendance.',
        en: 'Cloud native orchestration at Vocal30, plus my own dependency-free C++ tooling.',
      },
      bullets: [
        {
          fr: 'Vocal30 (2025 →) : développement et orchestration de solutions — Kubernetes, Docker, Traefik, CertManager, Registry, CI/CD.',
          en: 'Vocal30 (2025 →): building and orchestrating solutions — Kubernetes, Docker, Traefik, CertManager, Registry, CI/CD.',
        },
        {
          fr: 'OpenSource (2023-2025) : outils C++ sans dépendance — i18n compile-time, moteur ECS, librairies dynamiques graphiques et physiques.',
          en: 'OpenSource (2023-2025): dependency-free C++ tooling — compile-time i18n, ECS engine, dynamic graphics and physics libraries.',
        },
      ],
      stack: ['kubernetes', 'docker', 'traefik', 'cpp', 'go'],
    },
    {
      id: 'paykrom',
      company: 'Paykrom',
      role: { fr: 'Développeur Mobile', en: 'Mobile Developer' },
      location: 'Paris',
      date: { start: '2021-08', end: '2021-12' },
      summary: {
        fr: 'Application mobile bancaire en Java.',
        en: 'Banking mobile app in Java.',
      },
      bullets: [
        {
          fr: "Conception et développement de l'application bancaire Paykrom en Java, pour un accès simplifié sur smartphone et tablette.",
          en: 'Designed and built the Paykrom banking app in Java, for simplified access on phone and tablet.',
        },
      ],
      stack: ['java', 'android'],
    },
];
