<script setup lang="ts">
import { iconForOrganization } from '~~/utils/organization-icons';

const { locations, locateMe, focus } = useLocations();
const emit = defineEmits(['open-menu']);
</script>

<template>
  <div class="relative w-full h-full">
    <div class="absolute top-4 right-4 z-50 flex gap-2 transition-transform duration-300">
      <button @click="locateMe" class="px-4 py-2 bg-white/90 backdrop-blur rounded-md text-sm shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
        Locate Me
      </button>
      <button
        @click="emit('open-menu')"
        class="px-4 py-2 bg-white/90 backdrop-blur rounded-md text-sm shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Open menu">
        ☰
      </button>
    </div>
    <MapboxMap
      map-id="main-map"
      class="absolute inset-0 w-full h-full"
      :options="{
        center: [8.49, 64.63],
        zoom: 4.38,
        style: 'mapbox://styles/mapbox/streets-v11',
      }">
      <MapboxDefaultMarker v-for="(location, index) in locations" :key="location.name" :marker-id="`marker-${index}`" :lnglat="[location.coordinates[1], location.coordinates[0]]">
        <template #marker>
          <button @click="focus(location)" class="text-4xl leading-none cursor-pointer" :aria-label="`Select ${location.name}`">
            <img
              :src="iconForOrganization(location.organization)"
              :alt="location.organization"
              class="h-11 w-11 object-contain"
            />
          </button>
        </template>
      </MapboxDefaultMarker>
    </MapboxMap>
  </div>
</template>
