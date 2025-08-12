<script setup lang="ts">
const { locations, locateMe, focus } = useLocations();
const emit = defineEmits(['open-menu', 'close-menu']);
const props = defineProps<{ menuOpen: boolean }>();

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
    <div
      class="absolute top-4 right-4 z-30 flex gap-2 transition-transform duration-300"
      :class="props.menuOpen ? '-translate-x-64' : ''"
    >
      <button
        @click="locateMe"
        class="px-4 py-2 bg-white/90 backdrop-blur rounded-md text-sm shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Locate Me
      </button>
      <button
        @click="props.menuOpen ? emit('close-menu') : emit('open-menu')"
        class="px-4 py-2 bg-white/90 backdrop-blur rounded-md text-sm shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        :aria-label="props.menuOpen ? 'Close menu' : 'Open menu'"
      >
        {{ props.menuOpen ? '✕' : '☰' }}
      </button>
    </div>
    <MapboxMap
      map-id="main-map"
      class="absolute inset-0 w-full h-full"
      :options="{
        center: [8.49, 64.63],
        zoom: 4.38,
        style: 'mapbox://styles/mapbox/streets-v11',
      }"
    >
      <MapboxDefaultMarker
        v-for="(location, index) in locations"
        :key="location.name"
        :marker-id="`marker-${index}`"
        :lnglat="location.coordinates"
      >
        <template #marker>
          <button
            @click="focus(location)"
            class="text-4xl leading-none cursor-pointer"
            :aria-label="`Select ${location.name}`"
          >
            <img
              :src="iconFor(location.type)"
              :alt="location.type"
              class="h-10 w-10 object-contain"
            />
          </button>
        </template>
      </MapboxDefaultMarker>
    </MapboxMap>
  </div>
</template>
