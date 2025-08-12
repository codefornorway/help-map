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
      class="absolute top-4 left-4 z-30 bg-white shadow-md px-4 py-2 rounded-md lg:hidden"
      :aria-expanded="isListOpen"
      aria-controls="location-panel"
    >
      {{ isListOpen ? 'Close' : 'Locations' }}
    </button>

    <!-- Overlay for mobile when panels are open -->
    <div
      v-if="isListOpen || isMenuOpen"
      class="fixed inset-0 bg-black/30 z-10 lg:hidden"
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
      <MapView @open-menu="openMenu" :menu-open="isMenuOpen" />
    </div>

    <!-- Menu sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 right-0 w-64 max-w-xs bg-white z-20 shadow-2xl overflow-y-auto transform transition-transform duration-300',
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div v-if="menuView === 'menu'" class="p-4 space-y-4">
        <button class="w-full text-left" @click="showView('feedback')">Geri bildirim</button>
        <button class="w-full text-left" @click="showView('contact')">İletişim</button>
        <button class="w-full text-left" @click="showView('edit')">Adres düzenleme</button>
        <button class="w-full text-left" @click="showView('add')">Adres ekleme</button>
        <a class="block" href="https://github.com/codefornorway/help-map" target="_blank">GitHub sayfamız</a>
        <button class="w-full text-left" @click="showView('volunteer')">Gönüllü ol</button>
        <button class="w-full text-left" @click="showView('donor')">Bağışçı ol</button>
      </div>
      <div v-else-if="menuView === 'edit'" class="p-4 space-y-4">
        <button @click="goBack" class="mb-4">Geri</button>
        <form class="space-y-2">
          <input type="text" placeholder="Adres adı" class="w-full border p-2" />
          <input type="text" placeholder="Adres" class="w-full border p-2" />
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Kaydet</button>
        </form>
      </div>
      <div v-else-if="menuView === 'add'" class="p-4 space-y-4">
        <button @click="goBack" class="mb-4">Geri</button>
        <form class="space-y-2">
          <input type="text" placeholder="Adres adı" class="w-full border p-2" />
          <input type="text" placeholder="Adres" class="w-full border p-2" />
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ekle</button>
        </form>
      </div>
      <div v-else-if="menuView === 'feedback'" class="p-4 space-y-4">
        <button @click="goBack" class="mb-4">Geri</button>
        <form class="space-y-2">
          <textarea placeholder="Geri bildirim" class="w-full border p-2" rows="4"></textarea>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Gönder</button>
        </form>
      </div>
      <div v-else-if="menuView === 'contact'" class="p-4 space-y-4">
        <button @click="goBack" class="mb-4">Geri</button>
        <p>İletişim için <NuxtLink class="text-blue-500 underline" to="/contact">/contact</NuxtLink></p>
      </div>
      <div v-else-if="menuView === 'volunteer'" class="p-4 space-y-4">
        <button @click="goBack" class="mb-4">Geri</button>
        <p>Gönüllü olmak için <a href="https://github.com/codefornorway/help-map" target="_blank" class="text-blue-500 underline">GitHub sayfamızı</a> ziyaret edin.</p>
      </div>
      <div v-else-if="menuView === 'donor'" class="p-4 space-y-4">
        <button @click="goBack" class="mb-4">Geri</button>
        <p>Bağışçı olmak için <NuxtLink to="/contact" class="text-blue-500 underline">bizimle iletişime geçin</NuxtLink>.</p>
      </div>
    </aside>
  </div>
</template>
