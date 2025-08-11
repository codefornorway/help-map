<script setup lang="ts">
const { locations, locateMe, focus } = useLocations();

const iconMap: Record<string, string> = {
  health: '🩺',
  foodbank: '🍲',
  shelter: '🏠',
  community: '🤝',
};

function iconFor(type: string) {
  return iconMap[type] ?? '📍';
}
</script>

<template>
  <div class="relative w-full h-full">
    <button
      @click="locateMe"
      class="absolute top-2 right-2 z-10 bg-white border border-gray-300 rounded px-3 py-1 text-sm shadow">
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
      <MapboxDefaultMarker
        v-for="(location, index) in locations"
        :key="location.name"
        :marker-id="`marker-${index}`"
        :lnglat="location.coordinates"
      >
        <template #marker>
          <button
            @click="focus(location)"
            class="text-xl leading-none"
            :aria-label="`Select ${location.name}`"
          >
            {{ iconFor(location.type) }}
          </button>
        </template>
      </MapboxDefaultMarker>
    </MapboxMap>
  </div>
</template>
