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

const route = useRoute();
const router = useRouter();
const selectedLocation = ref<string | null>((route.query.location as string) || null);

const focusOnLocation = (location: Location) => {
  selectedLocation.value = location.name;
  useMapbox('main-map', (map, instance) => {
    if (map) {
      map.flyTo({ center: location.coordinates, zoom: 10 });
      Object.values(instance.markers).forEach((marker: any) => {
        marker.getElement().onclick = () => {
          const markerLocation = locations.find(loc => loc.coordinates[0] === marker.getLngLat().lng && loc.coordinates[1] === marker.getLngLat().lat);
          if (markerLocation) {
            selectedLocation.value = markerLocation.name;
            router.push({ query: { location: markerLocation.name } });
          }
        };
      });
    }
  });
  router.push({ query: { location: location.name } });
};

// URL'deki location query'sini izle
watch(
  () => route.query.location,
  newLocation => {
    selectedLocation.value = (newLocation as string) || null;
    if (newLocation) {
      const location = locations.find(loc => loc.name === newLocation);
      if (location) {
        focusOnLocation(location);
      }
    }
  },
  { immediate: true }
);

// Mekan türü için okunabilir isim
const getTypeLabel = (type: string) => {
  switch (type) {
    case 'food':
      return 'Yemek';
    case 'clothing':
      return 'Kıyafet';
    case 'shelter':
      return 'Barınak';
    default:
      return type;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <h1 class="text-xl font-bold text-gray-900">Norveç'teki Ücretsiz Yardım Mekanları</h1>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div class="col-span-1 bg-white rounded-lg shadow-md p-4">
          <ul class="space-y-2">
            <li
              v-for="location in locations"
              :key="location.name"
              @click="focusOnLocation(location)"
              :class="['p-3 rounded-md cursor-pointer transition-colors', selectedLocation === location.name ? 'bg-indigo-100 text-indigo-900' : 'hover:bg-gray-100']">
              <h3 class="text-base font-semibold text-gray-800">{{ location.name }}</h3>
              <p class="text-sm text-gray-600">{{ location.description }}</p>
            </li>
          </ul>
        </div>
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
        <div class="col-span-1 bg-white rounded-lg shadow-md p-4">
          <div v-if="selectedLocation" class="space-y-2">
            <h2 class="text-lg font-semibold text-gray-800">
              {{ locations.find(loc => loc.name === selectedLocation)?.name }}
            </h2>
            <p class="text-sm text-gray-600">
              <strong>Açıklama:</strong>
              {{ locations.find(loc => loc.name === selectedLocation)?.description }}
            </p>
            <p class="text-sm text-gray-600">
              <strong>Tür:</strong>
              {{ getTypeLabel(locations.find(loc => loc.name === selectedLocation)?.type || '') }}
            </p>
            <p class="text-sm text-gray-600">
              <strong>Koordinatlar:</strong>
              [{{ locations.find(loc => loc.name === selectedLocation)?.coordinates.join(', ') }}]
            </p>
          </div>
          <div v-else class="text-sm text-gray-600">Bir mekan seçin</div>
        </div>
      </div>
    </main>
  </div>
</template>
