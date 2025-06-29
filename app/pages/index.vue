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

const selectedType = ref<string>('all');

const filteredLocations = computed(() => {
  if (selectedType.value === 'all') return locations;
  return locations.filter(location => location.type === selectedType.value);
});

const focusOnLocation = (coordinates: [number, number]) => {
  useMapbox('main-map', map => {
    if (map) {
      map.flyTo({ center: coordinates, zoom: 10 });
    }
  });
};
</script>

<template>
  <div>
    <h1>Norveç'teki Ücretsiz Yardım Mekanları</h1>
    <div class="filter">
      <label for="type-filter">Filtrele:</label>
      <select id="type-filter" v-model="selectedType">
        <option value="all">Tümü</option>
        <option value="food">Yemek</option>
        <option value="clothing">Kıyafet</option>
        <option value="shelter">Barınak</option>
      </select>
    </div>
    <div class="container">
      <div class="map-container">
        <MapboxMap
          map-id="main-map"
          style="width: 100%; height: 100%"
          :options="{
            center: [10.7522, 59.9139],
            zoom: 5,
            style: 'mapbox://styles/mapbox/streets-v11',
          }">
          <MapboxDefaultMarker v-for="(location, index) in filteredLocations" :key="location.name" :marker-id="`marker-${index}`" :lnglat="location.coordinates">
            <MapboxDefaultPopup :popup-id="`popup-${index}`" :options="{ closeOnClick: false }" :lnglat="location.coordinates">
              <h3>{{ location.name }}</h3>
              <p>{{ location.description }}</p>
            </MapboxDefaultPopup>
          </MapboxDefaultMarker>
        </MapboxMap>
      </div>
      <div class="list-container">
        <ul>
          <li v-for="location in filteredLocations" :key="location.name" @click="focusOnLocation(location.coordinates)" class="location-item">
            <h3>{{ location.name }}</h3>
            <p>{{ location.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}
.map-container {
  flex: 1;
  height: 500px;
}
.list-container {
  flex: 1;
}
ul {
  list-style: none;
  padding: 0;
}
.location-item {
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
}
.location-item:hover {
  background-color: #f0f0f0;
}
h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}
p {
  margin: 0.5rem 0 0;
  color: #666;
}
.filter {
  margin-bottom: 1rem;
}
select {
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
