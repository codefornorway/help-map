<script setup lang="ts">
import type { Location } from '~~/types';

const locations: Location[] = [
  {
    name: 'Oslo Food Bank',
    description: 'İhtiyaç sahiplerine ücretsiz yemek',
    coordinates: [10.7522, 59.9139],
    type: 'food',
  },
  {
    name: 'Bergen Clothing Drive',
    description: 'Ücretsiz kıyafet ve battaniye',
    coordinates: [5.3221, 60.3913],
    type: 'clothing',
  },
  {
    name: 'Trondheim Shelter',
    description: 'Ücretsiz barınak ve yatak',
    coordinates: [10.3951, 63.4305],
    type: 'shelter',
  },
];

const selectedLocation = ref<Location | null>(null);

function focusOnLocation(location: Location) {
  selectedLocation.value = location;
  useMapbox('main-map', map => {
    map?.flyTo({ center: location.coordinates, zoom: 10 });
  });
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto px-4 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <aside class="col-span-1 bg-white rounded-lg shadow-md p-4">
          <ul class="space-y-2">
            <li
              v-for="location in locations"
              :key="location.name"
              @click="focusOnLocation(location)"
              :class="['p-3 rounded-md cursor-pointer transition-colors', selectedLocation?.name === location.name ? 'bg-indigo-100 text-indigo-900' : 'hover:bg-gray-100']">
              <h3 class="text-base font-semibold">{{ location.name }}</h3>
              <p class="text-sm text-gray-600">{{ location.description }}</p>
            </li>
          </ul>
        </aside>

        <div class="col-span-1 lg:col-span-3 h-80 sm:h-96 rounded-lg overflow-hidden shadow-md">
          <MapboxMap
            map-id="main-map"
            class="w-full h-full"
            :options="{
              center: [10.7522, 59.9139],
              zoom: 5,
              style: 'mapbox://styles/mapbox/streets-v11',
            }">
            <MapboxDefaultMarker v-for="(location, index) in locations" :key="location.name" :marker-id="`marker-${index}`" :lnglat="location.coordinates" />
          </MapboxMap>
        </div>

        <aside class="col-span-1 bg-white rounded-lg shadow-md p-4">
          <div v-if="selectedLocation" class="space-y-2">
            <h2 class="text-lg font-semibold">{{ selectedLocation.name }}</h2>
            <p class="text-sm text-gray-600">
              <strong>Açıklama:</strong>
              {{ selectedLocation.description }}
            </p>
            <p class="text-sm text-gray-600">
              <strong>Tür:</strong>
              {{ selectedLocation.type }}
            </p>
            <p class="text-sm text-gray-600">
              <strong>Koordinatlar:</strong>
              [{{ selectedLocation.coordinates.join(', ') }}]
            </p>
          </div>
          <div v-else class="text-sm text-gray-600">Bir mekan seçin</div>
        </aside>
      </div>
    </main>
  </div>
</template>
