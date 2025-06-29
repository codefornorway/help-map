<script setup lang="ts">
const { locations } = useLocations();
</script>

<template>
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
</template>
