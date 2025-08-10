<script setup lang="ts">
const { locations, selected, focus, reset, searchQuery, filterType } = useLocations();

const typeOptions = [
  { value: '', label: 'Tümü' },
  { value: 'foodbank', label: 'Yiyecek yardımı' },
  { value: 'health', label: 'Sağlık yardımı' },
  { value: 'shelter', label: 'Konaklama' },
  { value: 'community', label: 'Topluluk' },
];
</script>

<template>
  <div>
    <div class="p-4 border-b border-gray-200 space-y-1">
      <h1 class="text-xl font-bold text-gray-900">HELP MAP</h1>
      <NuxtLink to="/organizations" class="text-sm text-indigo-600 hover:underline">
        Yardım Kuruluşları
      </NuxtLink>
    </div>

    <div v-if="selected" class="p-4 space-y-3">
      <button @click="reset" class="text-sm cursor-pointer text-indigo-600 hover:underline">&larr; Geri</button>
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

    <div v-else>
      <div class="p-4 space-y-2">
        <label for="search" class="sr-only">Ara</label>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          placeholder="Ara..."
          class="w-full p-2 border rounded"
        />
        <label for="filter" class="sr-only">Tür filtresi</label>
        <select
          id="filter"
          v-model="filterType"
          class="w-full p-2 border rounded"
        >
          <option v-for="option in typeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <ul class="divide-y divide-gray-100">
        <li
          v-for="location in locations"
          :key="location.name"
          @click="focus(location)"
          class="p-4 cursor-pointer border-b border-black/10 space-y-3 hover:bg-neutral-100 transition"
        >
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
  </div>
</template>
