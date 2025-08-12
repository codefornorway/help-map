<script setup lang="ts">
const { locations, locateMe, focus } = useLocations();

const iconMap: Record<string, string> = {
  health: '/icons/health.svg',
  foodbank: '/icons/food.svg',
  shelter: '/icons/shelter.svg',
  community: '/icons/community.svg',
};

function iconFor(type: string) {
  return iconMap[type] ?? '/icons/community.svg';
}
</script>

<template>
  <div class="relative w-full h-full">
    <button
      @click="locateMe"
      class="absolute top-2 right-2 z-10 bg-white border border-gray-300 rounded-md px-3 py-1 text-sm shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
      Locate Me
    </button>
    <MapboxMap
      map-id="main-map"
      class="absolute inset-0 w-full h-full"
      :options="{
        center: [8.49, 64.63],
        zoom: 4.38,
        style: 'mapbox://styles/mapbox/streets-v11',
      }">
      <MapboxDefaultMarker v-for="(location, index) in locations" :key="location.name" :marker-id="`marker-${index}`" :lnglat="location.coordinates">
        <template #marker>
          <button @click="focus(location)" class="text-4xl leading-none cursor-pointer" :aria-label="`Select ${location.name}`">
            <img :src="iconFor(location.type)" :alt="location.type" class="h-10 w-10 object-contain" />
          </button>
        </template>
      </MapboxDefaultMarker>
    </MapboxMap>
  </div>
</template>
