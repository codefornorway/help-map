<script setup lang="ts">
import organizations from '~/data/organizations.json';
</script>

<template>
  <div class="p-4 space-y-4">
    <h1 class="text-xl font-bold">Norveç'teki Yardım Kuruluşları</h1>
    <ul class="space-y-3">
      <li
        v-for="org in organizations"
        :key="org.name"
        class="p-4 border rounded"
      >
        <h2 class="font-semibold">{{ org.name }}</h2>
        <p class="text-sm text-gray-700">{{ org.description }}</p>
        <a
          :href="org.website"
          target="_blank"
          rel="noopener"
          class="text-indigo-600 underline"
        >Web sitesi</a>
      </li>
    </ul>
  </div>
</template>
