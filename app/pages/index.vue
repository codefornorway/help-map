<script setup lang="ts">
import type { Location } from '~~/types';

const locations: Location[] = [
  { name: 'Oslo Food Bank', description: 'İhtiyaç sahiplerine ücretsiz yemek', coordinates: [10.7522, 59.9139], type: 'food' },
  { name: 'Bergen Clothing Drive', description: 'Ücretsiz kıyafet ve battaniye', coordinates: [5.3221, 60.3913], type: 'clothing' },
  { name: 'Trondheim Shelter', description: 'Ücretsiz barınak ve yatak', coordinates: [10.3951, 63.4305], type: 'shelter' },
  { name: 'Stavanger Soup Kitchen', description: 'Günlük sıcak yemek servisi', coordinates: [5.7331, 58.969], type: 'food' },
  { name: 'Kristiansand Community Center', description: 'Topluluk etkinlikleri ve yardımlar', coordinates: [8.0419, 58.1467], type: 'community' },
  { name: 'Drammen Mental Health Support', description: 'Ruh sağlığı desteği ve danışmanlık', coordinates: [10.2045, 59.7439], type: 'mental health' },
  { name: 'Fredrikstad Youth Outreach', description: 'Gençler için sosyal hizmetler', coordinates: [10.9292, 59.2184], type: 'youth' },
  { name: 'Tromsø Winter Clothing Drive', description: 'Kışlık giysi yardımı', coordinates: [18.956, 69.6496], type: 'clothing' },
  { name: 'Ålesund Emergency Shelter', description: 'Acil durum barınma hizmeti', coordinates: [6.1519, 62.4722], type: 'shelter' },
  { name: 'Bodø Food Distribution', description: 'Gıda yardımı ve dağıtımı', coordinates: [14.4046, 67.2804], type: 'food' },
  { name: 'Haugesund Health Clinic', description: 'Ücretsiz sağlık hizmetleri', coordinates: [5.2697, 59.4139], type: 'health' },
  { name: 'Lillehammer Winter Sports Support', description: 'Kış sporları etkinlikleri ve yardımları', coordinates: [10.4661, 61.1152], type: 'sports' },
  { name: 'Molde Arts and Culture Center', description: 'Sanat ve kültür etkinlikleri', coordinates: [7.1606, 62.7375], type: 'culture' },
  { name: 'Sandnes Family Support Services', description: 'Aile destek hizmetleri', coordinates: [5.7349, 58.8534], type: 'family' },
  { name: 'Hamar Senior Citizens Program', description: 'Yaşlılar için sosyal etkinlikler', coordinates: [11.0683, 60.7941], type: 'seniors' },
  { name: 'Gjøvik Environmental Awareness', description: 'Çevre bilinci ve geri dönüşüm programları', coordinates: [10.6902, 60.7941], type: 'environment' },
  { name: 'Kongsberg Technology and Innovation Hub', description: 'Teknoloji ve yenilik destek programları', coordinates: [9.6501, 59.6592], type: 'technology' },
  { name: 'Larvik Arts and Crafts Fair', description: 'El sanatları fuarı ve atölyeleri', coordinates: [10.0343, 59.0525], type: 'arts' },
  { name: 'Moss Community Gardening Project', description: 'Topluluk bahçesi ve tarım projeleri', coordinates: [10.6577, 59.4342], type: 'gardening' },
  { name: 'Porsgrunn Youth Sports League', description: 'Gençler için spor ligleri', coordinates: [9.6572, 59.1411], type: 'sports' },
  { name: 'Skien Cultural Heritage Tours', description: 'Kültürel miras turları ve etkinlikleri', coordinates: [9.6088, 59.2092], type: 'culture' },
  { name: 'Tønsberg Maritime Museum', description: 'Denizcilik tarihi ve kültürü', coordinates: [10.4072, 59.2833], type: 'culture' },
  { name: 'Voss Outdoor Adventure Program', description: 'Açık hava macera etkinlikleri', coordinates: [6.4222, 60.6261], type: 'adventure' },
  { name: 'Åndalsnes Hiking and Nature Tours', description: 'Doğa yürüyüşleri ve turlar', coordinates: [7.6833, 62.5667], type: 'nature' },
  { name: 'Alta Sami Cultural Center', description: 'Sami kültürü ve gelenekleri', coordinates: [23.2716, 69.9686], type: 'culture' },
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
    map?.flyTo({ center: [8.49, 64.63], zoom: 4.38 });
  });
}
</script>

<template>
  <div class="relative h-screen w-screen">
    <MapboxMap
      map-id="main-map"
      class="absolute inset-0 w-full h-full"
      :options="{
        center: [8.49, 64.63],
        zoom: 4.38,
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
