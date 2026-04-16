<script setup lang="ts">
const modelValue = defineModel<string>({ default: "" });
const emit = defineEmits<{ (e: "toggle-menu"): void }>();
</script>

<template>
  <header
    class="h-(--header-h) sticky top-0 z-30 inset-x-0 bg-white/80 backdrop-blur border-b"
    role="banner"
  >
    <div class="h-full flex items-center px-3">
      <!-- Left: Logo -->
      <NuxtLink to="/">
        <img src="/logo.svg" alt="Logo" class="h-10" />
      </NuxtLink>

      <!-- Center: Search -->
      <div class="flex-1 flex justify-center">
        <label class="relative w-full max-w-5xl" aria-label="Search locations">
          <input
            v-model="modelValue"
            type="search"
            placeholder="Search city, address, organization…"
            class="w-full h-10 rounded-full bg-gray-100/80 outline-none px-10 placeholder:text-gray-500 border border-gray-200 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 21l-4.35-4.35" />
            <circle cx="10" cy="10" r="7" />
          </svg>
        </label>
      </div>

      <!-- Right: Menu Button -->
      <button
        class="inline-flex items-center gap-2 h-10 px-3 w-10 md:w-auto rounded-full bg-gray-900 text-white hover:opacity-90 focus:outline-none"
        @click="emit('toggle-menu')"
        aria-label="Open menu"
      >
        <svg class="h-5 w-5" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M19.75 10a.75.75 0 0 1-.75.75H5a.75.75 0 0 1 0-1.5h14a.75.75 0 0 1 .75.75m0 4a.75.75 0 0 1-.75.75H5a.75.75 0 0 1 0-1.5h14a.75.75 0 0 1 .75.75m0-8a.75.75 0 0 1-.75.75H5a.75.75 0 0 1 0-1.5h14a.75.75 0 0 1 .75.75m0 12a.75.75 0 0 1-.75.75H5a.75.75 0 0 1 0-1.5h14a.75.75 0 0 1 .75.75"
          />
        </svg>
        <span class="hidden md:inline">Menu</span>
      </button>
    </div>
  </header>
</template>
