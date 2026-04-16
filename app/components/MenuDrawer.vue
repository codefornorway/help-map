<script setup lang="ts">
const emit = defineEmits<{ (e: 'close'): void }>();
</script>

<template>
  <aside class="border-l bg-white h-full z-10">
    <div class="h-full grid grid-rows-[auto_1fr]">
      <div class="p-4 border-b flex items-center justify-between">
        <h2 class="font-semibold">Menu</h2>
        <button @click="emit('close')" class="h-8 w-8 grid place-items-center rounded-lg hover:bg-gray-100" aria-label="Close menu">✕</button>
      </div>

      <nav class="p-4 space-y-2 overflow-y-auto">
        <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100">Feedback</NuxtLink>
        <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100">Contact</NuxtLink>
        <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100">Add Location</NuxtLink>
        <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100">Volunteer</NuxtLink>
        <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100">Donors</NuxtLink>
        <div class="h-px bg-gray-200 my-3"></div>
        <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100">About</NuxtLink>
        <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100">Privacy</NuxtLink>
      </nav>
    </div>
  </aside>
</template>
