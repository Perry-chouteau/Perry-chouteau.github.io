import type { I18nText } from '../i18n/config';

/**
 * Les projets hors code, en TROIS niveaux : Categorie > Item > page dediee.
 *
 * Un item = une carte = une chose concrete : un sommet, un trajet, un chantier.
 * Chaque item a sa propre page, avec son anecdote et toutes ses photos.
 *
 * Les photos ne sont PAS listees fichier par fichier : chaque item pointe un
 * DOSSIER de src/assets/media/. Deposer une image dedans suffit a la publier.
 */
export type LifeItem = {
  id: string;
  /** Nom propre (Bukhansan, Séoul → Daegu) : pas traduit. */
  title: string;
  /** Dossier sous src/assets/media/. Toutes ses images sont reprises. */
  dir?: string;
  /** Ville ou massif. Sert a regrouper les cartes sur la page categorie. */
  region?: string;
  /** Ce qui a ete fait. Pour un chantier : les corps de metier. */
  tasks?: I18nText[];
  /** L'anecdote, le souvenir. C'est ce qui rend la page vivante. */
  note?: I18nText;
  /** Chiffre marquant : "500 km", "6 jours"... Affiche en pastille. */
  stat?: string;
  year?: string;
};

/**
 * Le domaine regroupe les categories sur la page /life. Pas de mot parapluie
 * force ("Artisanat" ne couvre pas le velo, "Sport" ne couvre pas la reno) :
 * on affiche les deux comme des groupes distincts.
 */
export type Domain = 'craft' | 'sport' | 'build';

export type LifeCategory = {
  id: string;
  domain: Domain;
  title: I18nText;
  /** Une ligne, pour la grosse carte de /life. */
  tagline: I18nText;
  /** Deux ou trois lignes, en tete de la page de la categorie. */
  lead: I18nText;
  /**
   * Dossier dont les images alimentent le carrousel de la grosse carte.
   * Si absent, on prend les photos des items.
   */
  coverDir?: string;
  /**
   * Galerie de la categorie, quand il n'y a rien a decouper en activites
   * (la photographie n'a pas d'etapes, c'est un mur d'images).
   */
  dir?: string;
  items: LifeItem[];
};

export const domainLabel: Record<Domain, I18nText> = {
  craft: { fr: 'Artisanat', en: 'Craft' },
  sport: { fr: 'Activités sportives', en: 'Sport' },
  build: { fr: 'Bâtiment & Réparation', en: 'Building & Repair' },
};

/**
 * Chaque domaine porte SA raison d'etre : la phrase du "fond du trou" parle
 * d'effort physique et n'a aucun rapport avec la menuiserie.
 */
export const domainLead: Record<Domain, I18nText> = {
  sport: {
    fr: 'Ce que j’aime, c’est que quand t’es au fond du trou — un jour de pluie, les genoux qui grincent, les doigts gelés — tu apprends que se ramasser, ça réchauffe les mains. Et au milieu d’une journée horrible, c’est presque réconfortant.',
    en: 'What I love is that when you’re at the bottom of the hole — a rainy day, knees grinding, fingers frozen — you learn that picking yourself back up warms your hands. And in the middle of a miserable day, it’s almost comforting.',
  },
  craft: {
    fr: 'Mais je ne suis pas que sportif. Je suis aussi autodidacte.',
    en: 'But I’m not only into sport. I’m self-taught too.',
  },
  build: {
    fr: 'Savoir construire une maison de A à Z, c’est quand même stylé.',
    en: 'Knowing how to build a house from start to finish is just cool.',
  },
};

/** L'ordre d'affichage des groupes sur /life. */
export const domainOrder: Domain[] = ['sport', 'craft', 'build'];

/**
 * Domaines affiches en grille fixe plutot qu'en carrousel : a deux cartes,
 * faire tourner un carrousel n'apporte rien et distrait.
 */
export const staticDomains: Domain[] = ['build'];

export const getCategory = (id: string) => lifeCategories.find((c) => c.id === id);

export const lifeCategories: LifeCategory[] = [
  {
    /* id aligne sur le dossier media/construction/. */
    id: 'construction',
    domain: 'build',
    title: { fr: 'Bâtiment', en: 'Building' },
    tagline: {
      fr: 'Trois appartements simples, corps de métier par corps de métier.',
      en: 'Three simple flats, trade by trade.',
    },
    lead: {
      fr: 'Un chantier appris sur le tas, poste par poste. Chaque étape a sa page et ses photos.',
      en: 'A building site learned on the job, station by station. Each stage has its own page and photos.',
    },
    items: [
      { id: 'fondation', title: 'Fondations', dir: 'construction/fondation' },
      { id: 'wall-lintel', title: 'Murs et linteaux', dir: 'construction/wall-lintel' },
      { id: 'ba13-rails', title: 'Rails et BA13', dir: 'construction/ba13-rails' },
      { id: 'electricity', title: 'Électricité', dir: 'construction/electricity' },
      { id: 'enduit-ciment', title: 'Enduit ciment', dir: 'construction/coating' },
      { id: 'leveling-compound', title: 'Ragréage', dir: 'construction/leveling-compound' },
      { id: 'stairs-remake', title: 'Réfection escalier', dir: 'construction/stairs-remake' },
      { id: 'ext-carelage', title: 'Carrelage extérieur', dir: 'construction/ext-carelage' },
    ],
  },

  {
    /* "Creation" et pas "Artisanat" : le DOMAINE s'appelle deja Artisanat. */
    id: 'creation',
    domain: 'craft',
    title: { fr: 'Création', en: 'Making' },
    tagline: {
      fr: 'Des petites pièces faites à la main, pour le plaisir de les faire.',
      en: 'Small handmade pieces, made for the pleasure of making them.',
    },
    lead: {
      fr: 'S’occuper les mains pour sortir quelque chose d’utile — ou juste de décoratif.',
      en: 'Keeping my hands busy to end up with something useful — or just decorative.',
    },
    dir: 'creation',
    items: [
      { id: 'totoro', title: 'Totoro', dir: 'creation/totoro' },
      { id: 'advent-calendar', title: 'Calendrier de l’Avent', dir: 'creation/advent-calendar' },
    ],
  },

  {
    id: 'korea-bike',
    domain: 'sport',
    /* Photos a la racine du dossier = couverture. */
    coverDir: 'korea-bike',
    title: { fr: 'La Corée à vélo', en: 'Korea by bike' },
    tagline: {
      fr: 'Le réseau national coréen, parcouru en entier. Le "Grand Slam" ou rien.',
      en: 'Korea’s national bike network, ridden in its entirety. The "Grand Slam" or nothing.',
    },
    lead: {
      fr: 'Le réseau cyclable coréen — CrossCountry, Western Roads, East Coast, Jeju & Extra. Je les ai tous faits. Le "Grand Slam" est mien.',
      en: 'Korea’s national bike network — CrossCountry, Western Roads, East Coast, Jeju & Extra. I rode them all. The "Grand Slam" is mine.',
    },
    items: [
      {
        id: 'seoul-daegu',
        title: 'Séoul → Daegu',
        dir: 'korea-bike/seoul-daegu',
        stat: '6 jours',
        note: {
          fr: 'Le premier grand voyage, du reste de ma vie.',
          en: 'The first big trip, of the rest of my life.',
        },
      },
      {
        id: 'east-coast',
        title: 'Côte Est',
        dir: 'korea-bike/east-coast',
        stat: '3 jours',
        note: {
          fr: 'Vélo, camping, baignade et surf, bienvenue au paradis.',
          en: 'biking, camping, swiming & surfing, welcome to paradise.',
        },
      },
      {
        id: 'west-road',
        title: 'Routes de l’Ouest',
        dir: 'korea-bike/west-road',
        stat: '3 jours',
        note: {
          fr: 'Paysages magnifiques, rempli de culture.',
          en: 'Magnificent landscapes, filled with culture.',
        },
      },
      {
        id: 'jeju',
        title: 'Île de Jeju',
        dir: 'korea-bike/jeju',
        stat: '2 jours',
        note: { 
          fr: 'Baignade, Canicule, et Orange, En speedrun. 😅',
          en: 'Swimming, Heatwave, et Orange, In speedrun. 😅',
        },
      },
      /* TODO Perry : le dossier korea-bike/daegu-busan/ n'existe plus. Sans
         `dir`, la page s'affiche sans galerie plutot que de casser le build. */
      { id: 'daegu-busan', title: 'Daegu → Busan', stat: '2 jours' },
      { id: 'west-mokpo', title: 'Ouest → Mokpo', dir: 'korea-bike/west-mokpo' },
      {
        id: 'daegu-jirisan',
        title: 'Daegu → Jirisan',
        dir: 'korea-bike/daegu-jilisan',
        note: {
          fr: 'L’extra du lot. La moitié sur l’autoroute, vous avez déja crevé sur l\'autoroute avec un vélo.',
          en: 'The extra of the lot. Half on the highway, you’ve already had a flat on the highway with a bike.',
        },
      },
    ],
  },

  {
    id: 'france-bike',
    domain: 'sport',
    /* Photos a la racine du dossier = couverture. */
    coverDir: 'france-bike',
    title: { fr: 'La France à vélo', en: 'France by bike' },
    tagline: {
      fr: 'Traverser la France, de la pointe du Finistère vers le Sud.',
      en: 'Crossing France, from the tip of Brittany heading south.',
    },
    lead: {
      fr: 'L’objectif : Porspoder → Menton, la France en diagonale, faite par morceaux. Plus quelques trajets tourisme entre deux.',
      en: 'The goal: Porspoder → Menton, France on the diagonal, done in pieces. Plus a few touring rides in between.',
    },
    items: [
      {
        id: 'brest-paris',
        title: 'Porspoder → Paris',
        dir: 'france-bike/brest-paris',
        stat: '6 jours',
        note: {
          fr: 'Le premier tronçon du grand objectif Porspoder → Menton. Fait, en 2 puis 4 jours.',
          en: 'First leg of the big Porspoder → Menton goal. Done, in 2 then 4 days.',
        },
      },
      {
        id: 'paris-lyon',
        title: 'Paris → Lyon',
        dir: 'france-bike/paris-lyon',
        stat: '500 km',
        note: { fr: 'Trois jours, la suite de la diagonale.', en: 'Three days, the diagonal continues.' },
      },
      {
        id: 'paris-dieppe',
        title: 'Paris → Dieppe',
        dir: 'france-bike/paris-dieppe',
        stat: '200 km',
        note: { fr: 'Deux jours de tourisme, plus léger.', en: 'Two days of touring, lighter.' },
      },
    ],
  },

  {
    /* Anciennement 'hiking'. L'id colle au dossier media/coree-a-pied. */
    id: 'korea-hike',
    domain: 'sport',
    /* Photos a la racine du dossier = couverture. */
    coverDir: 'korea-hike',
    title: { fr: 'La Corée à pied', en: 'Korea on foot' },
    tagline: {
      fr: 'Les montagnes de Corée, une par une.',
      en: 'The mountains of Korea, one by one.',
    },
    lead: {
      fr: 'Les grands sommets coréens, seul ou bien accompagné, parfois de nuit sur la glace. Ce sont les meilleurs et les pires souvenirs, souvent les deux à la fois.',
      en: 'Korea’s great peaks, alone or with friends, sometimes at night on ice. The best and worst memories, often both at once.',
    },
    items: [
      {
        id: 'bukhansan',
        title: 'Bukhansan',
        dir: 'korea-hike/seoul/bukhansan',
        region: 'Séoul',
        note: {
          fr: 'Le sommet de Séoul, exceptionnel en hiver. La descente de nuit, sur la glace : pire et meilleur souvenir à la fois.',
          en: 'Seoul’s peak, exceptional in winter. The descent at night, on ice: worst and best memory at once.',
        },
      },
      {
        id: 'achasan',
        title: 'Achasan',
        dir: 'korea-hike/seoul/achasan',
        region: 'Séoul',
        note: { 
          fr: 'Un sommet qui donne une vue imprenable sur Séoul. Fait après une nuit blanche : feux d’artifice du nouvel an, boîte de nuit, départ au hasard seul 9h. Retour pour 13h pour un bon coma jusqu’au 2 janvier, (meilleur 1er janvier de ma vie).',
          en: 'A peak that gives an unobstructed view of Seoul. Done after a sleepless night: New Year fireworks, nightclub, random departure alone at 9am. Back for 1pm for a good coma until January 2nd, (best January 1st of my life).',
        },
      },
      {
        id: 'jirisan',
        title: 'Jirisan',
        dir: 'korea-hike/jirisan',
        note: { fr: 'Le deuxième plus haut du pays. A la conquête des sommets.', en: 'The country’s second highest. On the way to the peaks.' },
      },
      {
        id: 'hallasan',
        title: 'Hallasan',
        dir: 'korea-hike/hallasan',
        region: 'Jeju',
        note: {
          fr: 'Le plus haut. Trop de vent et de nuages ce jour la pour admirer la vue.',
          en: 'The highest. Too much wind and clouds that day to admire the view.',
        },
      },
      {
        id: 'kmu-alpine-club',
        title: 'KMU Alpine Club',
        dir: 'korea-hike/kmu-alpine-club',
        note: {
          fr: "Tentative de rejoindre le club alpin de Keimyung. De belles rencontres, une scéance d'escalade sur falaise, un bon repas au réchaud et des souvenirs inoubliables. dommage pour la barrière de la langue.",
          en: "Attempt to join the Keimyung Alpine Club. Great encounters, a climbing session on the cliff, a good meal on the stove and unforgettable memories. Too bad for the language barrier."
        },
      },
      {
        id: 'hwangnyeongsan',
        title: 'Hwangnyeongsan',
        dir: 'korea-hike/busan/hwangnyeongsan',
        region: 'Busan',
        note: {
          fr: 'La grimpette la plus drôle partagé avec un ami. Réveil 5 h, de nuit, sous la neige. On monte à deux, un gant chacun — j’étais le seul à avoir prévu. En haut, un lever de soleil dingue.',
          en: 'The most fun climb shared with a friend. 5am wake-up, in the dark, in the snow. We went up as a pair, one glove each — I was the only one who’d come prepared. At the top, an insane sunrise.',
        },
      },
      {
        id: 'geumjeongsan',
        title: 'Geumjeongsan',
        dir: 'korea-hike/busan/geumjeongsan',
        region: 'Busan',
        note: { 
          fr: 'Randomné chill prévue avec toute la troupe 6-8personnes.',
          en: 'Randomly planned with the whole gang 6-8 people ready to fight.',
        },
      },
      {
        id: 'palgongsan',
        title: 'Palgongsan',
        dir: 'korea-hike/daegu/palgongsan',
        region: 'Daegu',
        note: {
          fr: "Super souvenir: la rando est trop cool, tu peux trouver un sorte de caramel vendu au sommet de la montagne. et puis en bas le soir a coté du cinéma et du CU, tu peux trouver des fans de voiture qui avec un peu de chance peuvent te satelisé sur les routes de montagne. (souvenir exceptionel de samedi soir.)",
          en: "Super memory: the hike is too cool, you can find a sort of caramel sold at the top of the mountain. and then down in the evening next to the cinema and the CU, you can find car fans who with a bit of luck can satellite you on the mountain roads. (exceptional memory of Saturday night.)",
        },
      },
      {
        id: 'apsan',
        title: 'Apsan',
        dir: 'korea-hike/daegu/apsan',
        region: 'Daegu',
        note: { 
          fr: 'Petit sommet à coté de chez moi, à faire pour une vue imprenable. further you have cheongryongsan.', 
          en: 'A small peak near my home, worth visiting for the breathtaking view. further you have cheongryongsan.' },
      },
      {
        id: 'cheongryongsan',
        title: 'Cheongryongsan',
        /* TODO Perry : plus de dossier korea-hike/daegu/cheongryongsan/. */
        region: 'Daegu',
        note: {
          fr: 'Vue incroyable avec le sol couvert de neige, "Oh un observatoire sur la montagne d\'en face" — et voilà ta semaine déjà planifiée.',
          en: 'Incredible view with the ground covered in snow, "Oh an observatory on the mountain opposite" — and there goes your next week already planned.',
        },
      },
      {
        id: 'biseulsan',
        title: 'Biseulsan',
        dir: 'korea-hike/daegu/biseulsan',
        region: 'Daegu',
        note: {
          fr: 'Observatoire, Temple & Champs d\'arbuste roses, à couper le souffle.',
          en: 'Observatory, Temple & Fields of pink bushes, breathtaking.',
        },
      },
      {
        id: 'waryongsan',
        title: 'Waryongsan',
        dir: 'korea-hike/daegu/waryongsan',
        region: 'Daegu',
        note: {
          fr: 'Une grimpette de plus du côté de Daegu.',
          en: 'One more climb over near Daegu.',
        },
      },
      {
        id: 'mokpo',
        title: 'Mokpo',
        dir: 'korea-hike/mokpo',
        note: {
          fr: 'Arrivé à mokpo et un ferry qui ne part que le lendemain à 13h. Je grimpe le sommet le plus proche pour avoir une vue sur la région.',
          en: 'Arrived in Mokpo and a ferry that only leaves the next day at 1pm. I climb the nearest peak to get a view of the area.',
        },
      },
    ],
  },
  {
    id: 'japan',
    domain: 'sport',
    title: { fr: 'Japon', en: 'Japan' },
    tagline: {
      fr: 'Deux échappées : un lac face au Fuji, une descente à pied sur Sapporo.',
      en: 'Two escapes: a lake facing Fuji, a walk down into Sapporo.',
    },
    lead: {
      fr: 'Pas un grand projet, juste deux moments qui valaient le détour.',
      en: 'Not a big project, just two moments worth the detour.',
    },
    items: [
      {
        id: 'tanuki-lake',
        title: 'Lac Tanuki',
        dir: 'japan/tanuki-lake',
        note: {
          fr: 'Camping au bord du lac pour une vue imprenable sur le mont Fuji.',
          en: 'Camping by the lake for an unobstructed view of Mt Fuji.',
        },
      },
      {
        id: 'sapporo',
        title: 'Sapporo',
        dir: 'japan/sapporo',
        note: {
          fr: 'Un après-midi partant de Sapporo vers une station de ski (2-3h à pied + arrêts en voiture) — et la descente en glissant sur mes chaussures + bus retour.',
          en: 'An afternoon starting from Sapporo to a ski resort (2-3h on foot + car stops) — and the descent sliding on my shoes + bus back.',
        },
      },
    ],
  },

  {
    id: 'cooking',
    domain: 'craft',
    title: { fr: 'Cuisine', en: 'Cooking' },
    tagline: { fr: 'Faire à manger, pour de vrai.', en: 'Cooking, properly.' },
    lead: {
      fr: 'Une autre façon de fabriquer quelque chose avec ses mains — et celle-là, on la mange.',
      en: 'Another way of making something with your hands — and this one you get to eat.',
    },
    dir: 'cooking',
    items: [
      { id: 'macaron', title: 'Macarons', dir: 'cooking/macaron' },
      { id: 'kare', title: 'Karé', dir: 'cooking/kare' },
      { id: 'cake', title: 'Gâteau', dir: 'cooking/cake' },
    ],
  },

  {
    id: 'mecanic',
    domain: 'build',
    title: { fr: 'Mécanique', en: 'Mechanics' },
    tagline: { fr: 'Réparer plutôt que remplacer.', en: 'Repair rather than replace.' },
    lead: {
      fr: 'Comprendre comment ça marche, et le remettre en état soi-même.',
      en: 'Understanding how it works, and putting it right yourself.',
    },
    dir: 'mecanic',
    items: [
      { id: 'extraction-antivol', title: 'Extraction d’antivol', dir: 'mecanic/extraction-antivol' },
      { id: 'starter-swap', title: 'Remplacement du démarreur', dir: 'mecanic/starter-swap' },
    ],
  },

  {
    id: 'photo',
    domain: 'craft',
    title: { fr: 'Photographe', en: 'Photographer' },
    tagline: {
      fr: 'Les images que je garde pour elles-mêmes.',
      en: 'The images I keep for their own sake.',
    },
    lead: {
      fr: 'Pas un carnet de voyage : ici, pas de trajet à raconter ni de chantier à documenter. Juste les photos que j’ai faites parce qu’elles valaient le coup d’être faites — au reflex, souvent en montagne ou sur la route.',
      en: 'Not a travel diary: no route to recount here, no building site to document. Just the photographs I made because they were worth making — shot on a DSLR, mostly in the mountains or on the road.',
    },
    /* Galerie a plat : la photographie n'a pas d'etapes. */
    dir: 'photo',
    items: [],
  },
];
