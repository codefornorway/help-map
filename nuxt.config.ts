import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: '2025-08-16',
  future: { typescriptBundlerResolution: true },
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-mapbox'],
  mapbox: {
    accessToken: process.env.MAPBOX_ACCESS_TOKEN,
  },
  app: {
    head: {
      title: 'Help Map',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Find free aid locations across Norway — food, clothes, shelter.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Help Map' },
        { property: 'og:description', content: 'Find free aid locations across Norway — food, clothes, shelter.' },
        { property: 'og:image', content: '/social-card.png' },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
