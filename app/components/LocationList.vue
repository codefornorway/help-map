<script setup lang="ts">
const { locations, selected, focus, reset, searchQuery, filterTypes, filterOrgs, types, organizations } = useLocations();

const googleMapsLink = computed(() =>
  selected.value
    ? `https://www.google.com/maps/dir/?api=1&destination=${selected.value.coordinates[0]},${selected.value.coordinates[1]}`
    : '#'
);
</script>

<template>
  <div>
    <div class="p-4 border-b border-gray-200 space-y-1">
      <h1 class="text-xl font-bold text-gray-900">HELP MAP</h1>
    </div>

    <div v-if="selected" class="p-4 space-y-3">
      <button @click="reset" class="text-sm cursor-pointer text-indigo-600 hover:underline">&larr; Back</button>
      <h2 class="text-lg font-semibold">{{ selected.name }}</h2>
      <img :src="selected.image" :alt="selected.name" class="w-full h-auto rounded" />
      <p class="text-sm text-gray-600">
        <strong>Description:</strong>
        {{ selected.description }}
      </p>
      <p class="text-sm text-gray-600">
        <strong>Type:</strong>
        {{ selected.type }}
      </p>
      <p class="text-sm text-gray-600">
        <strong>Organization:</strong>
        {{ selected.organization }}
      </p>
      <p class="text-sm text-gray-600">
        <strong>Address:</strong>
        {{ selected.address }}
      </p>
      <p class="text-sm text-gray-600">
        <strong>Email:</strong>
        <a :href="`mailto:${selected.email}`" class="text-indigo-600 hover:underline">{{ selected.email }}</a>
      </p>
      <p class="text-sm text-gray-600">
        <strong>Last updated:</strong>
        {{ selected.data_updated }}
      </p>
      <div class="prose prose-sm" v-html="selected.notes"></div>
      <a
        :href="googleMapsLink"
        target="_blank"
        rel="noopener"
        class="text-sm text-indigo-600 hover:underline"
      >
        Open in Google Maps
      </a>
      <a
        :href="selected.source"
        target="_blank"
        rel="noopener"
        class="block text-sm text-indigo-600 hover:underline"
      >
        Source
      </a>
    </div>

    <div v-else>
      <div class="p-4 space-y-4" role="search">
        <div>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Search for help..."
            aria-label="Search for help"
            class="w-full p-2 border rounded"
          />
        </div>
        <fieldset>
          <legend class="block text-sm font-medium mb-1">Type</legend>
          <div class="flex flex-wrap gap-2">
            <label v-for="type in types" :key="type" class="inline-flex items-center gap-1 text-sm">
              <input type="checkbox" :value="type" v-model="filterTypes" class="w-4 h-4" />
              {{ type.charAt(0).toUpperCase() + type.slice(1) }}
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend class="block text-sm font-medium mb-1">Organization</legend>
          <div class="flex flex-wrap gap-2">
            <label v-for="org in organizations" :key="org" class="inline-flex items-center gap-1 text-sm">
              <input type="checkbox" :value="org" v-model="filterOrgs" class="w-4 h-4" />
              {{ org }}
            </label>
          </div>
        </fieldset>
      </div>
      <ul class="divide-y divide-gray-100">
        <li
          v-for="location in locations"
          :key="location.name"
          @click="focus(location)"
          class="p-4 cursor-pointer border-b border-black/10 hover:bg-neutral-100 transition space-y-1">
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
