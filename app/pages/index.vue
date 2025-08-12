<script setup lang="ts">
const isListOpen = ref(false);
const isMenuOpen = ref(false);
const menuView = ref<'menu' | 'feedback' | 'contact' | 'edit' | 'add' | 'volunteer' | 'donor'>('menu');

function toggleList() {
  isListOpen.value = !isListOpen.value;
}

function openMenu() {
  isMenuOpen.value = true;
  menuView.value = 'menu';
}

function closeMenu() {
  isMenuOpen.value = false;
}

function showView(view: typeof menuView.value) {
  menuView.value = view;
}

function goBack() {
  menuView.value = 'menu';
}
</script>

<template>
  <div class="h-screen flex relative">
    <!-- Toggle button for mobile -->
    <button
      @click="toggleList"
      class="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-md lg:hidden"
      :aria-expanded="isListOpen"
      aria-controls="location-panel"
    >
      {{ isListOpen ? 'Close' : 'Locations' }}
    </button>

    <!-- Overlay for mobile when panels are open -->
    <div
      v-if="isListOpen || isMenuOpen"
      class="fixed inset-0 bg-black/40 z-10 lg:hidden"
      @click="() => { if (isMenuOpen) closeMenu(); if (isListOpen) toggleList(); }"
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
      <MapView @open-menu="openMenu" @close-menu="closeMenu" :menu-open="isMenuOpen" />
    </div>

    <!-- Menu sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 right-0 w-64 max-w-xs bg-white z-20 shadow-2xl overflow-y-auto transform transition-transform duration-300',
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div v-if="menuView === 'menu'" class="p-6">
        <h2 class="text-lg font-semibold mb-4">Menu</h2>
        <nav class="space-y-2">
          <button class="w-full flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100" @click="showView('feedback')">Feedback</button>
          <button class="w-full flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100" @click="showView('contact')">Contact</button>
          <button class="w-full flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100" @click="showView('edit')">Edit Address</button>
          <button class="w-full flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100" @click="showView('add')">Add Address</button>
          <a class="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100" href="https://github.com/codefornorway/help-map" target="_blank">GitHub</a>
          <button class="w-full flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100" @click="showView('volunteer')">Become a Volunteer</button>
          <button class="w-full flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100" @click="showView('donor')">Become a Donor</button>
        </nav>
      </div>

      <div v-else-if="menuView === 'edit'" class="p-6 space-y-4">
        <button @click="goBack" class="flex items-center text-sm text-gray-500 hover:text-gray-700">
          ← Back
        </button>
        <h2 class="text-lg font-semibold">Edit Address</h2>
        <form class="space-y-4">
          <input type="text" placeholder="Address Name" class="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
          <input type="text" placeholder="Address" class="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
          <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">Save</button>
        </form>
      </div>

      <div v-else-if="menuView === 'add'" class="p-6 space-y-4">
        <button @click="goBack" class="flex items-center text-sm text-gray-500 hover:text-gray-700">
          ← Back
        </button>
        <h2 class="text-lg font-semibold">Add Address</h2>
        <form class="space-y-4">
          <input type="text" placeholder="Address Name" class="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
          <input type="text" placeholder="Address" class="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
          <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">Add</button>
        </form>
      </div>

      <div v-else-if="menuView === 'feedback'" class="p-6 space-y-4">
        <button @click="goBack" class="flex items-center text-sm text-gray-500 hover:text-gray-700">
          ← Back
        </button>
        <h2 class="text-lg font-semibold">Feedback</h2>
        <form class="space-y-4">
          <textarea placeholder="Your feedback" class="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" rows="4"></textarea>
          <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">Send</button>
        </form>
      </div>

      <div v-else-if="menuView === 'contact'" class="p-6 space-y-4">
        <button @click="goBack" class="flex items-center text-sm text-gray-500 hover:text-gray-700">
          ← Back
        </button>
        <h2 class="text-lg font-semibold">Contact</h2>
        <p>Reach us via <NuxtLink class="text-indigo-600 hover:underline" to="/contact">our contact page</NuxtLink>.</p>
      </div>

      <div v-else-if="menuView === 'volunteer'" class="p-6 space-y-4">
        <button @click="goBack" class="flex items-center text-sm text-gray-500 hover:text-gray-700">
          ← Back
        </button>
        <h2 class="text-lg font-semibold">Become a Volunteer</h2>
        <p>Visit <a href="https://github.com/codefornorway/help-map" target="_blank" class="text-indigo-600 hover:underline">our GitHub</a> to contribute.</p>
      </div>

      <div v-else-if="menuView === 'donor'" class="p-6 space-y-4">
        <button @click="goBack" class="flex items-center text-sm text-gray-500 hover:text-gray-700">
          ← Back
        </button>
        <h2 class="text-lg font-semibold">Become a Donor</h2>
        <p>Contact us via <NuxtLink to="/contact" class="text-indigo-600 hover:underline">our contact page</NuxtLink>.</p>
      </div>
    </aside>
  </div>
</template>
