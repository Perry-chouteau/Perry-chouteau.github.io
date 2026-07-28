# Portfolio — perrychouteau.com

Site statique. Astro 7 + React 19 (islands) + Tailwind v4.
Aucun runtime Node en production : le build sort du HTML, nginx le sert.

## Dev

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run check    # typecheck
```

Le serveur de dev d'Astro 7 tourne en arriere-plan (daemon) :
`npx astro dev status` / `npx astro dev stop`.

## Structure du site

| URL | Role |
|---|---|
| `/fr`, `/en` | Le CV : identite + contact, recommandation, experience, formation, competences |
| `/fr/projects` | L'index des projets, filtrable par contexte et par techno |
| `/fr/projects/<id>` | Une page par projet |

`/` redirige vers `/fr`.

Les projets sont **a cote** du CV, pas dedans : la page principale n'en montre
qu'un teaser de trois. Un recruteur lit un CV, il n'explore pas un catalogue.

## Le contenu

Tout est dans `src/content/`, type-checke. Une faute de frappe casse le build.

| Fichier | Contenu |
|---|---|
| `profile.ts` | Identite, contact, disponibilite, chiffres du hero |
| `profile.ts` (`recommendation`) | La citation de Remy Thomasse (Dassault) |
| `experience.ts` | Les postes |
| `education.ts` | Les diplomes |
| `projects.ts` | Les projets majeurs (page dediee chacun) |
| `small-projects.ts` | Le second niveau : une ligne, un lien, pas de page |
| `skills.ts` | Libelles des technos + groupes + technos filtrables |
| `contexts.ts` | Les categories de projets |

### Deux niveaux de projets

- **`projects.ts`** — page dediee, blocs, filtres. Pour ce qui merite d'etre
  raconte : P-E-R-R-Y, Vocal30, Antiseche, GETOUT.
- **`small-projects.ts`** — une ligne, une stack, un lien GitHub. Critere
  d'entree : est-ce que ca montre quelque chose qu'un exercice d'ecole
  standard ne montre pas ? Si un autre Epitech a le meme depot, non.

### Le statut d'un projet est obligatoire

`live` | `wip` | `source` | `private` | `archived`

Pas d'euphemisme : GETOUT est `archived`, Antiseche est `private` (produit
destine a la vente). Un lien mort ou un projet mort maquille se voit, et
coute plus cher que la verite.

### Ne rien inventer

Les blocs marques **"À remplir"** dans `projects.ts` sont des trous assumes,
pas du texte final. Un jour, une ligne "Provisioning avec Ansible" a ete
deduite d'un depot nomme `ansikube` sans que personne l'ouvre — c'est faux, et
sur un portfolio ca devient une question piege en entretien. Mieux vaut un
bloc vide.

## Langues (fr / en)

Chaque page existe en deux vrais fichiers HTML : `/fr/projects/vocal30` et
`/en/projects/vocal30`. Google indexe les deux (`hreflang` + `canonical` poses
par le layout), les liens partages s'unfurl dans la bonne langue.

**Les slugs ne sont pas traduits**, seul le contenu l'est : les URLs restent
stables et rien ne casse quand un texte change.

Les champs traduits sont typés `I18nText` = `{ fr: string; en: string }`.
Les deux langues sont **obligatoires** : oublier une traduction casse le build.
Attention aux libelles descriptifs de `skills.ts` : un libelle en `string`
simple ne sera jamais traduit (c'est bon pour "Kubernetes", pas pour
"Geometrie 3D" — celui-la doit etre un `I18nText`).

Les chaines d'interface sont dans `src/i18n/ui.ts`.

## Thème clair / sombre

Sombre par defaut, clair si l'OS le demande, choix explicite garde en
`localStorage`. Le thème vit sur `<html data-theme>`, pose par un script inline
dans le `<head>` **avant le premier paint** (sinon le site flashe).

Les couleurs sont des variables CSS : `@theme` dans `src/styles/global.css`
contient le jeu sombre, `:root[data-theme='light']` surcharge les memes
variables. Aucun composant ne connait le thème courant.

## Les islands

Deux, pas une de plus. Tout le reste est du HTML rendu au build, 0 KB de JS.

- `Settings.tsx` — bouton de thème + selecteur de langue.
- `ProjectBrowser.tsx` — les filtres de `/projects`.

Les composants React **sans** directive `client:*` sont rendus au build puis
jetes : ils ne coutent rien au visiteur.

## Images

Les images passent par `src/assets/` et **jamais** par `public/` :
`public/` copie le fichier tel quel, `src/assets/` le fait passer par sharp
au build. Le portrait est passe de 1,3 Mo a 25 Ko en WebP.

## Conteneur

```sh
podman build -t portfolio .
podman run --rm -p 8088:8080 portfolio   # http://localhost:8088
```

Multi-stage : Node ne sert qu'au build et ne part pas dans l'image finale.
Runtime = `nginx-unprivileged` : ~56 MB, UID 101, aucun process Node.

Deux reglages qui comptent et qui ne se voient QUE en conteneur (le dev server
d'Astro masque les deux) :

- `build.format: 'file'` + `trailingSlash: 'never'` cote Astro, et
  `try_files $uri $uri.html` cote nginx. Sans ca, nginx renvoie un **301 sur
  chaque page** pour ajouter le slash final.
- `absolute_redirect off`. Derriere un ingress, nginx ne connait pas le host
  public et redirigerait vers le nom du pod.

### Kubernetes

L'image n'a pas de `HEALTHCHECK` : podman l'ignore en format OCI et Kubernetes
ne le lit pas. La sonde se declare cote manifeste, sur `/healthz` :

```yaml
readinessProbe:
  httpGet: { path: /healthz, port: 8080 }
securityContext:
  runAsNonRoot: true
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities: { drop: ['ALL'] }
```

## Structure

```
src/
  content/         # les donnees, une source de verite
  components/
    Settings.tsx       # island : thème + langue
    ProjectBrowser.tsx # island : filtres de /projects
    entries/           # rendus au build, 0 KB de JS
  i18n/            # langues + chaines d'interface
  layouts/Base.astro
  pages/[lang]/
    index.astro          # le CV
    projects/index.astro # l'index filtrable
    projects/[project].astro
  assets/          # images traitees par sharp au build
```
