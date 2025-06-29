<script setup lang="ts">
import type { Location } from '~~/types';

const locations: Location[] = [
  {
    name: 'Oslo Food Bank',
    description: 'İhtiyaç sahiplerine ücretsiz yemek',
    coordinates: [10.7522, 59.9139],
  },
  {
    name: 'Bergen Clothing Drive',
    description: 'Ücretsiz kıyafet ve battaniye',
    coordinates: [5.3221, 60.3913],
  },
  {
    name: 'Trondheim Shelter',
    description: 'Ücretsiz barınak ve yatak',
    coordinates: [10.3951, 63.4305],
  },
];
</script>

<template>
  <div>
    <h1>Norveç'teki Ücretsiz Yardım Mekanları</h1>
    <div style="display: flex">
      <div style="flex: 1; height: 500px">
        <MapboxMap
          map-id="main-map"
          style="width: 100%; height: 100%"
          :options="{
            center: [10.7522, 59.9139],
            zoom: 5,
            style: 'mapbox://styles/mapbox/streets-v11',
          }">
          <MapboxDefaultMarker v-for="(location, index) in locations" :key="location.name" :marker-id="`marker-${index}`" :lnglat="location.coordinates">
            <MapboxDefaultPopup :popup-id="`popup-${index}`" :options="{ closeOnClick: false }" :lnglat="location.coordinates">
              <h3>{{ location.name }}</h3>
              <p>{{ location.description }}</p>
            </MapboxDefaultPopup>
          </MapboxDefaultMarker>
        </MapboxMap>
      </div>
      <div style="flex: 1; padding-left: 20px">
        <ul>
          <li v-for="location in locations" :key="location.name">
            <h3>{{ location.name }}</h3>
            <p>{{ location.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
