<script setup lang="ts">
import type { Location } from '~~/types';

const locations: Location[] = [
  { name: 'Oslo Food Bank', description: 'İhtiyaç sahiplerine ücretsiz yemek', coordinates: [10.7522, 59.9139], type: 'food' },
  { name: 'Bergen Clothing Drive', description: 'Ücretsiz kıyafet ve battaniye', coordinates: [5.3221, 60.3913], type: 'clothing' },
  { name: 'Trondheim Shelter', description: 'Ücretsiz barınak ve yatak', coordinates: [10.3951, 63.4305], type: 'shelter' },
];

const selectedLocation = ref<Location | null>(null);

function focusOnLocation(location: Location) {
  selectedLocation.value = location;
  useMapbox('main-map', map => {
    map?.flyTo({ center: location.coordinates, zoom: 10 });
  });
}

function goBack() {
  selectedLocation.value = null;
  useMapbox('main-map', map => {
    map?.flyTo({ center: [10.7522, 59.9139], zoom: 5 });
  });
}
</script>

<template>
  <div class="relative h-screen w-screen">
    <MapboxMap
      map-id="main-map"
      class="absolute inset-0 w-full h-full"
      :options="{
        center: [10.7522, 59.9139],
        zoom: 5,
        style: 'mapbox://styles/mapbox/streets-v11',
      }">
      <MapboxDefaultMarker v-for="(location, index) in locations" :key="location.name" :marker-id="`marker-${index}`" :lnglat="location.coordinates" />
    </MapboxMap>

    <aside class="absolute top-0 left-0 z-20">
      <div class="absolute m-5 p-5 bg-white shadow-xl rounded-3xl w-xs">
        <div v-if="selectedLocation" class="space-y-3">
          <button @click="goBack" class="text-sm text-indigo-600 hover:underline">&larr; Geri</button>
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

        <ul v-else>
          <li v-for="location in locations" :key="location.name" @click="focusOnLocation(location)" class="p-3 cursor-pointer hover:bg-neutral-100 rounded-xl transition">
            <h3 class="text-base font-semibold text-gray-800">
              {{ location.name }}
            </h3>
            <p class="text-sm text-gray-500">{{ location.description }}</p>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
