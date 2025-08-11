<script setup lang="ts">
const isListOpen = ref(false);

function toggleList() {
  isListOpen.value = !isListOpen.value;
}
</script>

<template>
  <div class="h-screen flex relative">
    <!-- Toggle button for mobile -->
    <button
      @click="toggleList"
      class="absolute top-4 left-4 z-30 bg-white shadow-md px-4 py-2 rounded-md lg:hidden"
      :aria-expanded="isListOpen"
      aria-controls="location-panel"
    >
      {{ isListOpen ? 'Close' : 'Locations' }}
    </button>

    <!-- Overlay for mobile when panel is open -->
    <div
      v-if="isListOpen"
      class="fixed inset-0 bg-black/30 z-10 lg:hidden"
      @click="toggleList"
    />

    <!-- Location list panel -->
    <aside
      id="location-panel"
      :class="[
        'fixed inset-y-0 left-0 w-64 max-w-xs bg-white z-20 shadow-2xl overflow-y-auto transform transition-transform duration-300',
        isListOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:relative lg:translate-x-0 lg:w-1/5'
      ]"
    >
      <LocationList />
    </aside>

    <!-- Map area -->
    <div class="flex-1 h-full relative">
      <MapView />
    </div>
  </div>
</template>
