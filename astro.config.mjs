// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://perrychouteau.com',
  output: 'static',

  // format 'file' sort dist/fr/jobs/electricite.html au lieu de
  // .../electricite/index.html. Combine a trailingSlash 'never', nginx sert
  // la page directement : sans ca il renvoie un 301 pour ajouter le slash
  // final sur CHAQUE page.
  trailingSlash: 'never',
  build: { format: 'file' },

  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: {
      // Les deux langues sont prefixees (/fr/... et /en/...) : symetrique,
      // et aucune page n'existe a deux URLs differentes.
      prefixDefaultLocale: true,
    },
  },

  // La racine n'a pas de contenu propre : elle envoie vers le francais.
  redirects: {
    '/': '/fr',
  },

  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
