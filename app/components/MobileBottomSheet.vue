<script setup lang="ts">
import BottomSheet from "@douxcode/vue-spring-bottom-sheet";
import "@douxcode/vue-spring-bottom-sheet/dist/style.css";

const props = defineProps<{
  items: LocationItem[];
  activeTypes: TagKey[];
  selected?: LocationItem | null;
}>();
const emit = defineEmits<{
  (e: "toggle-type", t: TagKey): void;
  (e: "back"): void;
}>();

const open = ref(true);
const route = useRoute();
</script>

<template>
  <ClientOnly>
    <BottomSheet
      v-model="open"
      :snap-points="[120, '50%', '80%']"
      :initial-snap-point="1"
      :blocking="false"
      :can-swipe-close="true"
      :can-backdrop-close="true"
    >
      <template #header>
        <div class="px-4 pb-2">
          <div
            class="overflow-x-auto whitespace-nowrap scrollbar-thin -mx-4 px-4"
            style="-webkit-overflow-scrolling: touch"
            aria-label="Filter types"
          >
            <div class="inline-flex items-center gap-2 pr-2">
              <button
                v-for="t in TAGS"
                :key="t.key"
                @click="emit('toggle-type', t.key)"
                :aria-pressed="props.activeTypes.includes(t.key)"
                class="px-3 h-8 rounded-full border text-sm shrink-0"
                :class="
                  props.activeTypes.includes(t.key)
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-gray-700 border-gray-300'
                "
              >
                {{ t.label }}
              </button>
            </div>
          </div>
        </div>
      </template>

      <Transition name="sheet-swap" mode="out-in">
        <!-- DETAIL MODE -->
        <div
          v-if="props.selected"
          key="detail"
          class="px-4 pb-6 space-y-3 overflow-y-auto"
          style="-webkit-overflow-scrolling: touch; max-height: 100vh"
        >
          <button
            @click="$emit('back')"
            class="inline-flex items-center gap-2 px-3 h-9 rounded-lg border bg-white"
          >
            ← Back
          </button>
          <article class="bg-white rounded-xl border p-4">
            <h1 class="text-lg font-semibold leading-tight">
              {{ props.selected.name }}
            </h1>
            <p class="text-sm text-gray-600">
              {{ props.selected.organization }}
            </p>
            <p class="text-sm text-gray-700 mt-2">
              {{ props.selected.description }}
            </p>
            <p class="text-sm text-gray-500 mt-1">
              {{ props.selected.address }} • {{ props.selected.city }}
            </p>
            <div class="flex flex-wrap gap-1 mt-3">
              <span
                v-for="t in props.selected.type"
                :key="t"
                class="px-2 py-0.5 rounded-full text-xs bg-gray-100 border border-gray-200 text-gray-700"
                >{{ t }}</span
              >
            </div>
          </article>
        </div>

        <!-- LIST MODE -->
        <div
          v-else
          key="list"
          class="px-4 pb-6 space-y-3 overflow-y-auto"
          style="-webkit-overflow-scrolling: touch; max-height: 100vh"
        >
          <NuxtLink
            v-for="l in props.items"
            :key="l.name"
            :to="{ path: `/locations/${slugify(l.name)}`, query: $route.query }"
            class="block bg-white rounded-xl border p-4"
          >
            <h3 class="font-semibold leading-tight">{{ l.name }}</h3>
            <p class="text-sm text-gray-600">{{ l.organization }}</p>
            <p class="text-sm text-gray-700 mt-2">{{ l.description }}</p>
            <p class="text-sm text-gray-500 mt-1">
              {{ l.address }} • {{ l.city }}
            </p>
            <div class="flex flex-wrap gap-1 mt-2">
              <span
                v-for="t in l.type"
                :key="t"
                class="px-2 py-0.5 rounded-full text-xs bg-gray-100 border border-gray-200 text-gray-700"
                >{{ t }}</span
              >
            </div>
          </NuxtLink>
          <p
            v-if="!props.items.length"
            class="text-center text-gray-500 text-sm py-6"
          >
            No locations found.
          </p>
        </div>
      </Transition>
    </BottomSheet>
  </ClientOnly>
</template>

<style>
:root {
  --vsbs-backdrop-bg: rgba(0, 0, 0, 0.35);
  --vsbs-border-radius: 16px;
  --vsbs-padding-x: 0px;
  --vsbs-max-width: 100%;
}

.sheet-swap-enter-active,
.sheet-swap-leave-active {
  transition:
    transform 0.18s ease,
    opacity 0.18s ease;
}
.sheet-swap-enter-from {
  transform: translateX(8px);
  opacity: 0;
}
.sheet-swap-leave-to {
  transform: translateX(-8px);
  opacity: 0;
}
</style>
