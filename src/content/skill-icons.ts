import {
  siC,
  siCplusplus,
  siGo,
  siDart,
  siTypescript,
  siPython,
  siGnubash,
  siHaskell,
  siRedis,
  siPostgresql,
  siMinio,
  siDocker,
  siPodman,
  siKubernetes,
  siTraefikproxy,
  siGithubactions,
  siCmake,
  siSwagger,
  siDoxygen,
  siMake,
  type SimpleIcon,
} from 'simple-icons';

/**
 * slug -> logo Simple Icons (https://simpleicons.org/).
 *
 * Les logos sont importes NOMMEMENT : le build ne garde que ces ~20 icones,
 * pas les 3000 du paquet. Chaque icone porte son `path` (un seul <path>) et son
 * `hex` (la couleur de marque). Tout est resolu au build, aucun runtime.
 *
 * Un slug absent d'ici n'a pas de logo — REST, ORM, E2E... des concepts, pas
 * des marques. La puce s'affiche alors en texte seul, c'est voulu.
 */
export const skillIcons: Record<string, SimpleIcon> = {
  c: siC,
  cpp: siCplusplus,
  go: siGo,
  dart: siDart,
  typescript: siTypescript,
  python: siPython,
  bash: siGnubash,
  haskell: siHaskell,
  redis: siRedis,
  postgres: siPostgresql,
  minio: siMinio,
  docker: siDocker,
  podman: siPodman,
  kubernetes: siKubernetes,
  traefik: siTraefikproxy,
  'github-actions': siGithubactions,
  cmake: siCmake,
  swagger: siSwagger,
  doxygen: siDoxygen,
  make: siMake,
};
