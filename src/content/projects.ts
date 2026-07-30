import type { Project } from './types';

/**
 * L'ordre = l'ordre de l'index. Les `featured` remontent d'eux-memes.
 *
 * Les trous sont marques par des commentaires TODO Perry, PAS par du texte
 * visible : un "A remplir" affiche a un recruteur fait plus de mal qu'une
 * section absente. Mieux vaut un bloc manquant qu'un bloc invente.
 */
export const projects: Project[] = [
  {
    id: 'p-e-r-r-y',
    title: { fr: 'P-E-R-R-Y', en: 'P-E-R-R-Y' },
    org: 'P-E-R-R-Y',
    context: 'logiciel',
    /* wip et pas source : ecs et i18n sont finis, le SDK autour ne l'est pas. */
    status: 'wip',
    featured: true,
    date: { start: '2023-01' },
    tagline: {
      fr: 'Un SDK C++ modulaire, sans une seule dépendance externe. En chantier.',
      en: 'A modular C++ SDK, without a single external dependency. Still a building site.',
    },
    summary: {
      fr: "Un écosystème C++ bâti sur des interfaces : le jeu ne connaît jamais son moteur de rendu. Deux briques sont finies, testées et documentées ; le reste est en chantier.",
      en: 'A C++ ecosystem built on interfaces: the game never knows its render backend. Two pieces are done, tested and documented; the rest is a building site.',
    },
    stack: ['cpp', 'cmake', 'github-actions', 'gtest', 'latex', 'raylib', 'sfml'],
    links: [
      { label: 'github.com/P-E-R-R-Y', url: 'https://github.com/P-E-R-R-Y', type: 'repo' },
      { label: 'ecs — doc', url: 'https://p-e-r-r-y.github.io/ecs/', type: 'doc' },
      { label: 'i18n — doc', url: 'https://p-e-r-r-y.github.io/i18n/', type: 'doc' },
    ],
    blocks: [
      {
        heading: { fr: 'Ce qui est fiable', en: 'What is solid' },
        bullets: [
          {
            fr: 'ecs — moteur Entity-Component-System minimaliste et performant. Fini, testé, documenté. Né de R-Type, un projet d’école, puis sorti de son contexte et repris proprement.',
            en: 'ecs — a minimal, high-performance Entity-Component-System engine. Done, tested, documented. Born out of R-Type, a school project, then lifted out of that context and rewritten properly.',
          },
          {
            fr: 'i18n — internationalisation résolue à la compilation, type-safe, C++11 et C++20. Fini, testé, documenté.',
            en: 'i18n — compile-time internationalisation, type-safe, C++11 and C++20. Done, tested, documented.',
          },
          {
            fr: 'procedurals — génération procédurale déterministe en C++20 : bruit de valeur, fBm, ridge, domain warp, Worley, Simplex, échantillonnage Poisson-disk, et Wave Function Collapse avec règles d’adjacence. PRNG par hash, aucune dépendance à <random> : même seed, même sortie, sur n’importe quelle machine.',
            en: 'procedurals — deterministic procedural generation in C++20: value noise, fBm, ridge, domain warp, Worley, Simplex, Poisson-disk sampling, and Wave Function Collapse with adjacency rules. Hash-based PRNG, no <random> dependency: same seed, same output, on any machine.',
          },
          {
            fr: 'GitHub Actions fait tourner les tests GoogleTest et déploie la documentation — c’est ce qui rend le « testé, documenté » vérifiable plutôt que déclaratif.',
            en: 'GitHub Actions runs the GoogleTest suites and deploys the documentation — that is what makes "tested, documented" checkable rather than just claimed.',
          },
        ],
      },
      {
        heading: { fr: 'Ce qui est en chantier', en: 'What is still a building site' },
        bullets: [
          {
            fr: 'La couche modules et interfaces — imodule, iapp, igraphic, avec raygraphic (Raylib) et sfmlgraphic (SFML) comme implémentations chargées dynamiquement en dll/.so.',
            en: 'The module and interface layer — imodule, iapp, igraphic, with raygraphic (Raylib) and sfmlgraphic (SFML) as implementations loaded dynamically through dll/.so.',
          },
          {
            fr: 'Plusieurs briques sont prêtes ou presque, mais l’ensemble ne tient pas encore debout comme je le veux.',
            en: 'Several pieces are ready or nearly so, but the whole does not yet stand up the way I want it to.',
          },
        ],
      },
      {
        heading: { fr: 'Où je veux aller', en: 'Where I want to take it' },
        body: {
          fr: "Une architecture à la Blender : n'importe qui implémente une interface de façon statique, puis charge son implémentation dynamiquement.",
          en: 'A Blender-style architecture: anyone implements an interface statically, then loads their implementation dynamically.',
        },
      },
    ],
    /*
     * Les briques, chacune avec son dossier d'images (schemas, captures).
     * Deposer une image dans media/projects/p-e-r-r-y/<brique>/ suffit.
     */
    subprojects: [
      {
        id: 'ecs',
        title: 'ecs',
        summary: {
          fr: 'Moteur Entity-Component-System minimaliste.',
          en: 'Minimal Entity-Component-System engine.',
        },
        dir: 'projects/p-e-r-r-y/ecs',
        stack: ['cpp'],
        links: [
          { label: 'Documentation', url: 'https://p-e-r-r-y.github.io/ecs/', type: 'doc' },
          { label: 'Repository', url: 'https://github.com/p-e-r-r-y/ecs', type: 'repo' },

        ],
      },
      {
        id: 'i18n',
        title: 'i18n',
        summary: {
          fr: 'Internationalisation résolue à la compilation.',
          en: 'Compile-time internationalisation.',
        },
        dir: 'projects/p-e-r-r-y/i18n',
        stack: ['cpp1120', 'cmake'],
        links: [
          { label: 'Documentation', url: 'https://p-e-r-r-y.github.io/i18n/', type: 'doc' },
          { label: 'Repository', url: 'https://github.com/p-e-r-r-y/i18n', type: 'repo' },
        ],
      },
      {
        id: 'procedurals',
        title: 'procedurals',
        summary: {
          fr: 'Génération procédurale déterministe : bruit, Worley, Wave Function Collapse.',
          en: 'Deterministic procedural generation: noise, Worley, Wave Function Collapse.',
        },
        dir: 'projects/p-e-r-r-y/procedurals',
        stack: ['cpp', 'cmake'],

      },
      {
        id: 'graphic',
        title: 'igraphic',
        summary: {
          fr: 'Une interface, deux implémentations chargées en dll/.so.',
          en: 'One interface, two implementations loaded through dll/.so.',
        },
        dir: 'projects/p-e-r-r-y/graphic',
        stack: ['cpp', 'raylib', 'sfml'],
      },
    ],
  },

  {
    id: 'vocal30',
    title: { fr: 'Vocal30', en: 'Vocal30' },
    org: 'Vocal30',
    context: 'cloud',
    status: 'live',
    featured: true,
    date: { start: '2025-01' },
    tagline: {
      fr: 'Mon entreprise : des SaaS, quelques sites clients, et l’infrastructure qui les fait tourner. Ce site tourne dessus.',
      en: 'My company: SaaS products, a few client sites, and the infrastructure that runs them. This site runs on it.',
    },
    summary: {
      fr: "Vocal30 est le nom sous lequel passe tout mon travail de dev, DevOps, cloud native et webapp. Concrètement, c'est aussi un cluster Kubernetes self-hosted que je gère de bout en bout : je build, je pousse sur ma propre registry hébergée sur le cluster, et Kubernetes récupère l'image de là. Aucun service managé.",
      en: 'Vocal30 is the name all my dev, DevOps, cloud native and webapp work goes under. In practice it is also a self-hosted Kubernetes cluster I run end to end: I build, push to my own registry hosted on the cluster, and Kubernetes pulls the image from there. No managed service.',
    },
    /* Pas de 'linux' : Kubernetes, Podman et Traefik tournent tous dessus par
       definition. Le lister n'ajoute rien, ca dilue. Sur kernel-otp en
       revanche il veut dire quelque chose : un LKM, c'est Linux et rien d'autre. */
    stack: ['kubernetes', 'podman', 'helm', 'traefik', 'certmanager', 'registry', 'cilium', 'postgres', 'secrets', 'github-actions'],
    links: [
      { label: 'gonesboard.games', url: 'https://gonesboard.games', type: 'live' },
      { label: 'vocal30.com', url: 'https://vocal30.com', type: 'live' },
      { label: 'github.com/Vocal30', url: 'https://github.com/Vocal30', type: 'repo' },
    ],
    blocks: [
      {
        heading: { fr: 'Ce qui tourne dessus', en: 'What runs on it' },
        bullets: [
          { fr: 'gonesboard.games — Next.js / React.', en: 'gonesboard.games — Next.js / React.' },
          { fr: 'vocal30.com — Vite / React.', en: 'vocal30.com — Vite / React.' },
        ],
      },
      {
        heading: { fr: 'La chaîne', en: 'The chain' },
        bullets: [
          {
            fr: 'GitHub Actions construit l’image applicative avec Podman.',
            en: 'GitHub Actions builds the app image with Podman.',
          },
          {
            fr: 'L’image part sur ma registry Docker — hébergée sur le cluster lui-même',
            en: 'The image is pushed to my Docker registry — hosted on the cluster itself,',
          },
          {
            fr: 'Kubernetes tire l’image depuis cette registry et déploie.',
            en: 'Kubernetes pulls the image from that registry and deploys.',
          },
        ],
      },
      {
        heading: { fr: 'Le cluster', en: 'The cluster' },
        bullets: [
          {
            fr: 'Kubernetes self-hosted sur Contabo.',
            en: 'Self-hosted Kubernetes on Contabo.',
          },
          {
            fr: 'Traefik en ingress, TLS automatique via CertManager.',
            en: 'Traefik as ingress, automatic TLS through CertManager.',
          },
        ],
      },
      {
        heading: { fr: 'Ce portfolio tourne sur le cluster', en: 'This portfolio runs on the cluster' },
        body: {
          fr: 'Le site que tu lis est une image nginx non-root de 56 Mo déployée sur ce cluster. Aucun runtime Node en production : le HTML est généré au build, nginx ne fait que servir des fichiers.',
          en: 'The site you are reading is a 56 MB non-root nginx image deployed on that cluster. No Node runtime in production: the HTML is generated at build time, nginx only serves files.',
        },
      },
      {
        heading: { fr: 'La suite', en: "What's next" },
        body: {
          fr: 'FluxCD et l’automatisation de mise à jour d’images, pour du GitOps complet où le cluster va chercher lui-même les nouvelles versions. Pas encore en place.',
          en: 'FluxCD and image update automation, for full GitOps where the cluster picks up new versions on its own. Not in place yet.',
        },
      },
    ],
  },

  {
    id: 'antiseche',
    title: { fr: 'Antisèche', en: 'Antisèche' },
    org: 'Antiseche',
    context: 'product',
    status: 'wip',
    featured: true,
    date: { start: '2026-01' },
    tagline: {
      fr: 'Un produit en construction : API Go, application Flutter.',
      en: 'A product in the making: Go API, Flutter app.',
    },
    /* TODO Perry : reformuler avec TES mots — a quoi ca sert, et pour qui. */
    summary: {
      fr: 'Une application autour des cours et des révisions : une API Go et une application mobile Flutter. Le produit est en construction.',
      en: 'An app built around courses and revision: a Go API and a Flutter mobile app. The product is under construction.',
    },
    stack: ['go', 'gin', 'postgres', 'minio', 'flutter', 'docker', 'swagger', 'jwt'],
    blocks: [
      /* TODO Perry : bloc "Le produit" — le probleme resolu, pour qui, pourquoi ca se vend. */
      {
        heading: { fr: 'Le backend', en: 'The backend' },
        bullets: [
          {
            fr: 'API REST en Go avec Gin : authentification JWT avec OTP par email, profils, cours.',
            en: 'Go REST API with Gin: JWT authentication with email OTP, profiles, courses.',
          },
          {
            fr: 'Postgres via GORM, MinIO pour le stockage objet.',
            en: 'Postgres through GORM, MinIO for object storage.',
          },
          {
            fr: 'Swagger généré depuis le code, tests unitaires et e2e, golangci-lint.',
            en: 'Swagger generated from the code, unit and e2e tests, golangci-lint.',
          },
          {
            fr: 'Compose et Dockerfile : tout l’environnement démarre en une commande.',
            en: 'Compose and Dockerfile: the whole environment starts with one command.',
          },
        ],
      },
      /* TODO Perry : bloc "Le mobile" — archi Flutter, etat, ce qui marche deja. */
      {
        heading: { fr: 'Pourquoi le code est fermé', en: 'Why the code is closed' },
        body: {
          fr: 'Antisèche est un produit destiné à être vendu. Le dépôt reste privé.',
          en: 'Antisèche is a product meant to be sold. The repository stays private.',
        },
      },
    ],
  },

  {
    id: 'getout',
    title: { fr: 'GETOUT', en: 'GETOUT' },
    /* L'org s'appelle EIP-GetOut, pas GETOUT. C'est un ecosysteme (7 depots :
       plateforme Flutter, admin-panel, states, site...), pas un depot isole. */
    org: 'EIP-GetOut',
    context: 'product',
    status: 'archived',
    date: { start: '2023-01', end: '2025-12' },
    tagline: {
      fr: 'Une alternative aux réseaux sociaux : à court d’idées, elle vous suggère quoi faire pour vous occuper — même coincé dans le métro.',
      en: 'An alternative to social networks: out of ideas, it suggests things to do to keep you busy — even stuck on the subway.',
    },
    summary: {
      fr: 'Une application mobile Flutter avec backend TypeScript sur Azure, pensée comme une vraie alternative aux réseaux sociaux.',
      en: 'A Flutter mobile app with a TypeScript backend on Azure, built as a real alternative to social networks.',
    },
    stack: ['flutter', 'dart', 'typescript', 'azure'],
    /* Le site et quelques POC sont prives, mais l'essentiel est public. */
    links: [
      {
        label: 'GETOUT-Platform',
        url: 'https://github.com/EIP-GetOut/GETOUT-Platform',
        type: 'repo',
      },
      { label: 'admin-panel', url: 'https://github.com/EIP-GetOut/admin-panel', type: 'repo' },
      { label: 'states', url: 'https://github.com/EIP-GetOut/states', type: 'repo' },
    ],
    blocks: [
      /* TODO Perry : bloc "L'idee" — ce que GETOUT proposait de different. */
      {
        heading: { fr: 'La technique', en: 'The build' },
        bullets: [
          {
            fr: 'Flutter avec BLoC pour la gestion d’état, i18n, Dio pour la couche réseau.',
            en: 'Flutter with BLoC for state management, i18n, Dio for the network layer.',
          },
          {
            fr: 'Backend TypeScript hébergé sur Azure.',
            en: 'TypeScript backend hosted on Azure.',
          },
        ],
      },
      /* TODO Perry : bloc "Pourquoi ca s'est arrete" — la vraie raison. */
    ],
  },

  {
    id: 'pc-toolbox',
    title: { fr: 'PC-Toolbox', en: 'PC-Toolbox' },
    org: 'PC-Toolbox',
    context: 'tooling',
    status: 'source',
    date: { start: '2023-01' },
    tagline: {
      fr: 'Quatre outils en Go, nés du même agacement : développer sur trente dépôts à la fois.',
      en: 'Four Go tools, born of the same annoyance: developing across thirty repositories at once.',
    },
    summary: {
      fr: "Quand un projet est éclaté en dizaines de modules, l'outillage standard craque. Ces quatre outils existent parce que je perdais du temps tous les jours sur la même chose.",
      en: 'When a project is split across dozens of modules, standard tooling gives up. These four tools exist because I was losing time on the same thing every day.',
    },
    stack: ['go', 'git'],
    links: [{ label: 'github.com/PC-Toolbox', url: 'https://github.com/PC-Toolbox', type: 'repo' }],
    blocks: [
      {
        heading: { fr: 'Les outils', en: 'The tools' },
        bullets: [
          {
            fr: 'vsc_ws — édite le workspace VSCode pour afficher ou masquer des projets à la volée.',
            en: 'vsc_ws — edits the VSCode workspace to show or hide projects on the fly.',
          },
          {
            fr: 'ghp — création et suppression rapides de dépôts GitHub, pour une org avec beaucoup de sous-modules.',
            en: 'ghp — fast GitHub repo creation and deletion, for an org with many submodules.',
          },
          {
            fr: 'openurl — raccourcis vers les pages où je retourne sans arrêt.',
            en: 'openurl — shortcuts to the pages I keep going back to.',
          },
          {
            fr: 'PLD-Maker — génère les PLD de reporting pour GETOUT.',
            en: 'PLD-Maker — generates the PLD reporting documents for GETOUT.',
          },
        ],
      },
    ],
  },

  {
    id: 'kernel-otp',
    title: { fr: 'Kernel OTP', en: 'Kernel OTP' },
    context: 'logiciel',
    status: 'source',
    date: { start: '2025-02', end: '2025-02' },
    tagline: {
      fr: 'Un module noyau Linux qui expose un device pour générer des OTP (codes à usage unique). Paramétrable : timeout, clé client, algorithme.',
      en: 'A Linux kernel module exposing a device that generates OTPs (one-time codes). Tunable: timeout, client key, algorithm.',
    },
    summary: {
      fr: 'Un module noyau chargeable qui expose un device caractère : un cat /dev/otp renvoie un code à usage unique. Paramétrable à chaud via SysFS.',
      en: 'A loadable kernel module exposing a character device: cat /dev/otp returns a one-time code. Live-tunable through SysFS.',
    },
    stack: ['c', 'linux', 'make', 'qemu'],
    links: [
      { label: 'Kernel_OTP', url: 'https://github.com/Perry-chouteau/Kernel_OTP', type: 'repo' },
    ],
    blocks: [
      {
        heading: { fr: 'Ce que ça fait', en: 'What it does' },
        bullets: [
          {
            fr: 'Module noyau chargeable (LKM) exposant un device caractère : cat /dev/otp renvoie un code.',
            en: 'Loadable kernel module exposing a character device: cat /dev/otp returns a code.',
          },
          {
            fr: 'Paramètres modifiables à chaud sous /sys/kernel/otp : timeout, clé client, algorithme.',
            en: 'Live-tunable parameters under /sys/kernel/otp: timeout, client key, algorithm.',
          },
          {
            fr: 'Deux modes de génération : loopcode, ou code dérivé de la clé client.',
            en: 'Two generation modes: loopcode, or a client-key-derived code.',
          },
        ],
      },
      /* TODO Perry : bloc "Le contexte" — projet Epitech, les 13 commits sont les tiens. */
    ],
  },

  {
    id: 'launcher-signals',
    title: { fr: 'my_32bits_launcher-using-signals', en: 'my_32bits_launcher-using-signals' },
    context: 'logiciel',
    status: 'source',
    date: { start: '2021-01', end: '2021-01' },
    tagline: {
      fr: 'Deux instances qui se parlent sur une même machine Linux, uniquement par signaux.',
      en: 'Two instances talking to each other on one Linux machine, purely through signals.',
    },
    summary: {
      fr: 'Deux instances qui communiquent sur une même machine Linux uniquement via les signaux Unix.',
      en: 'Two instances communicating on one Linux machine purely through Unix signals.',
    },
    stack: ['c', 'linux'],
    links: [
      {
        label: 'my_32bits_launcher-using-signals',
        url: 'https://github.com/Perry-chouteau/my_32bits_launcher-using-signals',
        type: 'repo',
      },
    ],
  },

  {
    id: 'pushswap',
    title: { fr: 'my_pushswap', en: 'my_pushswap' },
    context: 'logiciel',
    status: 'source',
    date: { start: '2021-01', end: '2021-01' },
    tagline: {
      fr: 'Un tri par base (radix sort) sur deux piles — compact, malin, efficace.',
      en: 'A radix sort over two stacks — compact, clever, efficient.',
    },
    summary: {
      fr: 'Trier une pile avec un jeu d’instructions minimal, via un tri par base (radix sort) sur deux piles.',
      en: 'Sorting a stack with a minimal instruction set, using a radix sort over two stacks.',
    },
    stack: ['c'],
    links: [
      { label: 'my_pushswap', url: 'https://github.com/Perry-chouteau/my_pushswap', type: 'repo' },
    ],
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
