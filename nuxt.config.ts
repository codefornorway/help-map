import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['nuxt-mapbox'],
  future: { compatibilityVersion: 4 },
  mapbox: {
    accessToken: process.env.MAPBOX_ACCESS_TOKEN as string,
  },
  css: ['@/assets/css/main.css'],
});
