<script setup lang="ts">
const { locations, locateMe, focus } = useLocations();

const logoMap: Record<string, string> = {
  'Kirkens Bymisjon': '/logos/kirkens-bymisjon.svg',
  Matsentralen: '/logos/matsentralen.svg',
  Frelsesarmeen: '/logos/frelsesarmeen.svg',
  Fattighuset: '/logos/fattighuset.svg',
  'Røde Kors': '/logos/rode-kors.svg',
  'Stiftelsen Robin Hood Huset': '/logos/robin-hood-huset.svg',
};

function logoFor(org: string) {
  return logoMap[org] ?? '/logos/default.svg';
}
</script>

<template>
  <div class="relative w-full h-full">
    <button
      @click="locateMe"
      class="absolute top-2 right-2 z-10 bg-white border border-gray-300 rounded-md px-3 py-1 text-sm shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
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
          <button @click="focus(location)" class="cursor-pointer" :aria-label="`Select ${location.name}`">
            <img :src="logoFor(location.organization)" :alt="location.organization" class="h-8 w-8 object-contain" />
          </button>
        </template>
      </MapboxDefaultMarker>
    </MapboxMap>
  </div>
</template>
