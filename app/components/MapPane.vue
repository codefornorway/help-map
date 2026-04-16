<script setup lang="ts">
const props = defineProps<{
  items: LocationItem[];
  selected: LocationItem | null;
  mapId?: string;
}>();

const MAP_ID = props.mapId ?? "map-main";
const mapRef = useMapboxRef(MAP_ID);

const route = useRoute();
const router = useRouter();

// Koordinatı olan kayıtlar
const itemsWithCoords = computed(() =>
  (props.items || []).filter(
    (l) => Array.isArray(l.coordinates) && l.coordinates.length === 2,
  ),
);

// Başlangıç (seçili varsa ona, yoksa Norveç)
const DEFAULT_CENTER: [number, number] = [8.49, 64.63];
const DEFAULT_ZOOM = 4.38;
const initialOptions = (() => {
  if (props.selected?.coordinates) {
    const [lat, lng] = props.selected.coordinates;
    return {
      center: [lng, lat] as [number, number],
      zoom: 14,
      style: "mapbox://styles/mapbox/streets-v11",
    };
  }
  return {
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    style: "mapbox://styles/mapbox/streets-v11",
  };
})();

// Harita yüklendi mi?
const isReady = ref(false);
function onMapLoad() {
  isReady.value = true;
  // İlk yüklemede bir kez odakla
  nextTick(() => {
    mapRef.value?.resize();
    if (props.selected?.coordinates) flyToSel(props.selected);
    else fitToList();
  });
}

// Odak yardımcıları (yalnızca hazırken)
function flyToSel(sel: LocationItem) {
  if (!isReady.value || !sel?.coordinates) return;
  const [lat, lng] = sel.coordinates;
  mapRef.value?.flyTo({
    center: [lng, lat],
    zoom: 14,
    speed: 0.9,
    essential: true,
  });
}
function fitToList() {
  if (!isReady.value) return;
  const list = itemsWithCoords.value;
  if (!list.length) return;
  if (list.length === 1 && list[0]) return flyToSel(list[0]);

  // Bounds hesapla
  let minLng = Infinity,
    maxLng = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;
  for (const l of list) {
    const [lat, lng] = l.coordinates!;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  mapRef.value?.fitBounds(
    [
      [minLng, minLat],
      [maxLng, maxLat],
    ],
    { padding: 80, duration: 500 },
  );
}

// Reaksiyonlar
watch(
  () => props.selected,
  (sel) => {
    if (!isReady.value) return;
    sel?.coordinates ? flyToSel(sel) : fitToList();
  },
);
watch(itemsWithCoords, () => {
  if (!isReady.value || props.selected?.coordinates) return;
  fitToList();
});

// Marker tıklama → detaya git
function openFromMarker(l: LocationItem) {
  router.push({ path: `/locations/${slugify(l.name)}`, query: route.query });
}

// UI controls
function zoomIn() {
  if (!isReady.value) return;
  const z = mapRef.value?.getZoom?.();
  if (z != null) mapRef.value?.zoomTo(z + 1, { duration: 200 });
}
function zoomOut() {
  if (!isReady.value) return;
  const z = mapRef.value?.getZoom?.();
  if (z != null) mapRef.value?.zoomTo(z - 1, { duration: 200 });
}
function locateMe() {
  if (!isReady.value || !("geolocation" in navigator)) return;
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    mapRef.value?.flyTo({
      center: [coords.longitude, coords.latitude],
      zoom: 14,
      speed: 0.9,
      essential: true,
    });
  });
}
</script>

<template>
  <!-- Bu bileşen parent'tan boyut alır; parent'ta h-full veya sabit yükseklik verilmiş olmalı -->
  <div class="relative w-full h-full">
    <MapboxMap
      :map-id="MAP_ID"
      class="absolute inset-0 w-full h-full overflow-visible!"
      :options="initialOptions"
      @load="onMapLoad"
    >
      <!-- Marker'lar (organizasyona göre ikon) -->
      <MapboxDefaultMarker
        v-for="l in itemsWithCoords"
        :key="l.name"
        :marker-id="`m-${MAP_ID}-${slugify(l.name)}`"
        :lnglat="[l.coordinates![1], l.coordinates![0]]"
      >
        <template #marker>
          <button
            type="button"
            class="grid place-items-center cursor-pointer"
            :aria-label="l.name"
            :title="l.name"
            @click="openFromMarker(l)"
          >
            <img
              :src="iconForOrganization(l.organization)"
              :alt="l.organization"
              class="h-7 w-7 object-contain"
              draggable="false"
            />
          </button>
        </template>
      </MapboxDefaultMarker>
    </MapboxMap>

    <!-- Sağdaki kontrol butonları -->
    <div
      class="absolute right-3 top-3 lg:top-auto lg:bottom-3 z-40 flex flex-col space-y-3"
    >
      <button
        class="h-10 w-10 rounded-xl border grid place-items-center bg-white/90"
        aria-label="Locate me"
        @click="locateMe"
      >
        <svg
          viewBox="0 0 24 24"
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      </button>
      <div class="rounded-xl w-10 bg-white/90 border">
        <button
          class="h-10 w-full grid place-items-center border-b"
          aria-label="Zoom in"
          @click="zoomIn"
        >
          +
        </button>
        <button
          class="h-10 w-full grid place-items-center"
          aria-label="Zoom out"
          @click="zoomOut"
        >
          −
        </button>
      </div>
    </div>
  </div>
</template>
