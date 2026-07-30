import { type I18nText, type Lang, t } from '../i18n/config';

/**
 * Les slugs utilises dans `stack` des entrees se resolvent ici.
 *
 * La plupart des libelles sont des noms propres (C++, Kubernetes) : une seule
 * chaine suffit. Les libelles DESCRIPTIFS doivent etre un I18nText, sinon du
 * francais fuit dans la version anglaise.
 */
export const LABELS: Record<string, string | I18nText> = {
  c: 'C',
  cpp: 'C++',
  go: 'Go',
  python: 'Python',
  bash: 'Bash',
  haskell: 'Haskell',
  asm: 'Assembly',
  typescript: 'TypeScript',
  java: 'Java',
  flutter: 'Flutter',
  dart: 'Dart',

  kubernetes: 'Kubernetes',
  docker: 'Docker',
  podman: 'Podman',
  traefik: 'Traefik',
  certmanager: 'CertManager',
  registry: { fr: 'Registry privée', en: 'Private registry' },
  aws: 'AWS',
  azure: 'Azure',
  linux: 'Linux',
  qemu: 'QEMU',
  git: 'Git',
  'github-actions': 'GitHub Actions',
  'gitlab-ci': 'GitLab CI',
  nginx: 'nginx',
  helm: 'Helm',
  cilium: 'Cilium',
  secrets: { fr: 'Secrets', en: 'Secrets' },

  postgres: 'Postgres',
  redis: 'Redis',
  minio: 'MinIO',
  gin: 'Gin',
  express: 'Express',
  grpc: 'gRPC',
  rpc: 'RPC',
  rest: 'REST',
  swagger: 'Swagger',
  jwt: 'JWT',
  orm: 'ORM',

  cmake: 'CMake',
  make: 'Makefile',
  unittest: { fr: 'Tests unitaires', en: 'Unit tests' },
  e2e: 'E2E',
  raylib: 'Raylib',
  sfml: 'SFML',
  qt: 'Qt',
  sdl: 'SDL',
  asio: 'Asio',
  valgrind: 'Valgrind',
  gtest: 'GoogleTest',
  doxygen: 'Doxygen',
  latex: 'LaTeX',
  geometry: { fr: 'Géométrie 3D', en: '3D geometry' },
  graphics: { fr: 'Infographie', en: 'Computer graphics' },
  android: 'Android',

  cpp1120: 'C++11/20',
  cicd: 'CI/CD',
  microservices: 'Microservices',
  iac: 'IaC',
  sql: 'SQL',
  network: { fr: 'Réseau', en: 'Networking' },
  crossplatform: { fr: 'Cross-platform', en: 'Cross-platform' },
  gamedev: { fr: 'Game dev', en: 'Game dev' },
  physics: { fr: 'Physique', en: 'Physics' },
};

export type SkillGroup = {
  id: string;
  label: I18nText;
  /** Les plus forts d'abord : la premiere ligne est celle qui est lue. */
  slugs: string[];
};

/*
 * Liste RESSERREE (le CV listait tout, jusqu'a Valgrind ou JWT — du bruit pour
 * un recruteur). On garde ce qui situe le profil. Les slugs a logo Simple Icons
 * (voir skill-icons.ts) sont places en tete de chaque groupe : la colonne de
 * gauche devient une bande de logos, le reste suit en texte.
 *
 * GitHub Actions plutot que "GitLab CI" ou un "CI/CD" abstrait : c'est concret,
 * vrai, et ca porte un logo. Un seul suffit a dire "je fais de la CI/CD".
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: { fr: 'Langages', en: 'Languages' },
    slugs: ['cpp', 'c', 'go', 'dart', 'typescript', 'python', 'bash', 'haskell'],
  },
  {
    id: 'backend',
    label: { fr: 'Backend & données', en: 'Backend & data' },
    slugs: ['redis', 'postgres', 'minio', 'rest', 'rpc', 'orm'],
  },
  {
    id: 'cloud',
    label: { fr: 'Cloud & DevOps', en: 'Cloud & DevOps' },
    slugs: ['docker', 'podman', 'kubernetes', 'traefik', 'github-actions', 'aws', 'certmanager', 'registry'],
  },
  {
    id: 'tools',
    label: { fr: 'Outillage', en: 'Tooling' },
    slugs: ['cmake', 'swagger', 'doxygen', 'make', 'unittest', 'e2e'],
  },
];

export const labelOf = (slug: string, lang: Lang) => {
  const label = LABELS[slug];
  if (!label) return slug;
  return typeof label === 'string' ? label : t(label, lang);
};
