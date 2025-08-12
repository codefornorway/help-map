<script setup lang="ts">
const url = useRequestURL();

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', href: '/favicon.png' },
    { rel: 'apple-touch-icon', href: '/favicon.png' },
    { rel: 'msapplication-TileImage', href: '/favicon.png' },
  ],
});

useSeoMeta({
  title: 'Help Map — Free Community Support Across Norway',
  description: 'Find free food, clothing, shelter and community services across Norway. Discover, add and update aid locations on Help Map’s interactive map.',
  ogTitle: 'Help Map — Free Community Support Across Norway | Code for Norway',
  ogDescription: 'Find free food, clothing, shelter and community services across Norway. Discover, add and update aid locations on Help Map’s interactive map.',
  ogType: 'website',
  ogUrl: () => url.origin,
  ogSiteName: 'Code for Norway',
  ogImage: `${url.origin}/social-card.png`,
  twitterCard: 'summary_large_image',
  twitterImage: `${url.origin}/social-card.png`,
  twitterCreator: '@ZHatlen',
  twitterSite: '@ZHatlen',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  robots: 'index, follow',
  keywords: 'help map, norway, free food, shelter, clothing, community support, homeless support, refugee aid, community services, open source, code for norway',
});
</script>

<template>
  <NuxtPage />
</template>
