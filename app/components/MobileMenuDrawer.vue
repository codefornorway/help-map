<script setup lang="ts">
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: "close"): void }>();

function isMobileViewport() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1023px)").matches
  );
}

// Lock body scroll only on mobile viewports
function lockScroll(lock: boolean) {
  if (!isMobileViewport()) return;
  const el = document.documentElement;
  if (lock) el.classList.add("overflow-hidden");
  else el.classList.remove("overflow-hidden");
}

onMounted(() => lockScroll(props.open));
onBeforeUnmount(() => lockScroll(false));
watch(
  () => props.open,
  (v) => lockScroll(v),
);
</script>

<template>
  <teleport to="body">
    <!-- Backdrop (mobile-only via lg:hidden) -->
    <transition name="fade">
      <div
        v-if="props.open"
        class="fixed inset-0 z-50 bg-black/45 lg:hidden"
        @click="emit('close')"
        aria-hidden="true"
      />
    </transition>

    <!-- Fullscreen panel (mobile-only via lg:hidden) -->
    <transition name="slide">
      <aside
        v-if="props.open"
        class="fixed inset-0 z-99999 bg-white flex flex-col lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div
          class="h-(--header-h) px-4 border-b flex items-center justify-between"
        >
          <h2 class="font-semibold">Menu</h2>
          <button
            @click="emit('close')"
            class="h-9 w-9 grid place-items-center rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav class="p-4 space-y-2 overflow-y-auto flex-1">
          <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100"
            >Feedback</NuxtLink
          >
          <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100"
            >Contact</NuxtLink
          >
          <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100"
            >Add Location</NuxtLink
          >
          <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100"
            >Volunteer</NuxtLink
          >
          <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100"
            >Donors</NuxtLink
          >
          <div class="h-px bg-gray-200 my-3"></div>
          <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100"
            >About</NuxtLink
          >
          <NuxtLink to="#" class="block px-3 py-2 rounded-lg hover:bg-gray-100"
            >Privacy</NuxtLink
          >
        </nav>
      </aside>
    </transition>
  </teleport>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.22s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
