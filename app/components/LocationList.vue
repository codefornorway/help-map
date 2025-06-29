<script setup lang="ts">
const { locations, selected, focus, reset } = useLocations();
</script>

<template>
  <div>
    <div class="p-4 border-b border-gray-200">
      <h1 class="text-xl font-bold text-gray-900">Yardım Noktaları</h1>
    </div>

    <div v-if="selected" class="p-4 space-y-3">
      <button @click="reset" class="text-sm text-indigo-600 hover:underline">&larr; Geri</button>
      <h2 class="text-lg font-semibold">{{ selected.name }}</h2>
      <p class="text-sm text-gray-600">
        <strong>Açıklama:</strong>
        {{ selected.description }}
      </p>
      <p class="text-sm text-gray-600">
        <strong>Tür:</strong>
        {{ selected.type }}
      </p>
      <p class="text-sm text-gray-600">
        <strong>Adres:</strong>
        {{ selected.address }}
      </p>
    </div>

    <ul v-else class="divide-y divide-gray-100">
      <li v-for="location in locations" :key="location.name" @click="focus(location)" class="p-4 cursor-pointer border-b border-black/10 space-y-3 hover:bg-neutral-100 transition">
        <div>
          <h3 class="text-base font-semibold text-gray-800">{{ location.name }}</h3>
          <p class="text-sm text-gray-500">{{ location.address }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <p class="text-sm text-green-600 font-semibold">Open</p>
          <span class="text-gray-400">•</span>
          <p class="text-sm text-gray-500">Today until 6:30pm</p>
        </div>
      </li>
    </ul>
  </div>
</template>
