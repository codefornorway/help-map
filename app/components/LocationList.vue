<script setup lang="ts">
const { locations, selected, focus, reset, searchQuery, filterType, filterOrg, types, organizations } = useLocations();

const typeOptions = computed(() => [
  { value: '', label: 'Tümü' },
  ...types.value.map(t => ({
    value: t,
    label: t.charAt(0).toUpperCase() + t.slice(1)
  }))
]);

const organizationOptions = computed(() => [
  { value: '', label: 'Tümü' },
  ...organizations.value.map(o => ({ value: o, label: o }))
]);
</script>

<template>
  <div>
    <div class="p-4 border-b border-gray-200 space-y-1">
      <h1 class="text-xl font-bold text-gray-900">HELP MAP</h1>
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
        <strong>Kuruluş:</strong>
        {{ selected.organization }}
      </p>
      <p class="text-sm text-gray-600">
        <strong>Adres:</strong>
        {{ selected.address }}
      </p>
    </div>

    <div v-else>
      <div class="p-4 flex flex-col gap-2 sm:flex-row" role="search">
        <label for="search" class="sr-only">Ara</label>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          placeholder="Ara..."
          class="w-full p-2 border rounded flex-1"
        />
        <label for="type-filter" class="sr-only">Tür filtresi</label>
        <select
          id="type-filter"
          v-model="filterType"
          class="w-full p-2 border rounded flex-1"
        >
          <option v-for="option in typeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <label for="org-filter" class="sr-only">Kuruluş filtresi</label>
        <select
          id="org-filter"
          v-model="filterOrg"
          class="w-full p-2 border rounded flex-1"
        >
          <option v-for="option in organizationOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <ul class="divide-y divide-gray-100">
        <li
          v-for="location in locations"
          :key="location.name"
          @click="focus(location)"
          class="p-4 cursor-pointer border-b border-black/10 hover:bg-neutral-100 transition space-y-1"
        >
          <div>
            <h3 class="text-base font-semibold text-gray-800">{{ location.name }}</h3>
            <p class="text-sm text-gray-500">{{ location.address }}</p>
          </div>
          <div class="flex flex-wrap gap-1">
            <span class="inline-block text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">{{ location.type }}</span>
            <span class="inline-block text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded">{{ location.organization }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
