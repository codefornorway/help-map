<script setup lang="ts">
import { locations as seed } from '~/data/locations';

const route = useRoute();

const item = computed(() => seed.find(l => slugify(l.name) === String(route.params.slug)) ?? null);

if (!item.value) {
  throw createError({ statusCode: 404, statusMessage: 'Location not found' });
}

useSeoMeta({
  title: `${item.value.name} — Help Map`,
  description: `${item.value.description} | ${item.value.organization} · ${item.value.address}, ${item.value.city}`,
  ogImage: item.value.image,
  ogTitle: `${item.value.name} — Help Map`,
  ogDescription: `${item.value.description}`,
  twitterCard: 'summary_large_image',
});
</script>

<template></template>
