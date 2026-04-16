<script setup lang="ts">
import type { LocationItem } from "~/data/locations";
import { TAGS, type TagKey } from "~/data/tags";
import { slugify } from "~/utils/slug";

const props = withDefaults(
  defineProps<{
    items: LocationItem[];
    activeTypes: TagKey[];
    showFilters?: boolean;
    selected?: LocationItem | null;
  }>(),
  { showFilters: true, selected: null },
);

const emit = defineEmits<{
  (e: "toggle-type", type: TagKey): void;
  (e: "back"): void;
}>();

const route = useRoute();

const scroller = ref<HTMLElement | null>(null);

watch(
  () => props.selected,
  async () => {
    await nextTick();
    if (scroller.value) scroller.value.scrollTop = 0;
  },
);

const googleMapsLink = computed(() =>
  props.selected && props.selected.coordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${props.selected.coordinates[0]},${props.selected.coordinates[1]}`
    : "#",
);
</script>

<template>
  <div
    class="h-full grid"
    :class="props.showFilters ? 'grid-rows-[auto_1fr]' : 'grid-rows-[1fr]'"
  >
    <div
      v-if="props.showFilters"
      class="p-4 border-b bg-white sticky top-0 z-10"
    >
      <div class="flex flex-wrap gap-2">
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

    <Transition name="sidebar-swap" mode="out-in" appear>
      <!-- DETAIL MODE -->
      <div
        v-if="props.selected"
        key="detail"
        ref="scroller"
        class="overflow-y-auto p-3 space-y-3"
      >
        <button
          @click="emit('back')"
          class="inline-flex items-center gap-2 px-3 h-9 rounded-lg"
        >
          ← Back
        </button>

        <h2 class="text-lg font-semibold leading-tight">
          {{ props.selected.name }}
        </h2>
        <img
          :src="props.selected.image"
          :alt="props.selected.name"
          class="w-full h-auto rounded"
        />
        <div class="text-sm text-gray-600">
          <strong>Description</strong>
          <p>{{ props.selected.description }}</p>
        </div>
        <a
          :href="googleMapsLink"
          target="_blank"
          rel="noopener"
          class="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded inline-block transition"
        >
          Get Directions
        </a>
        <div class="flex flex-wrap gap-1 mt-3">
          <span
            v-for="t in props.selected.type"
            :key="t"
            class="px-2 py-0.5 rounded-full text-xs bg-gray-100 border border-gray-200 text-gray-700"
            >{{ t }}</span
          >
        </div>
        <div class="text-sm text-gray-600">
          <strong>Organization</strong>
          <p>{{ props.selected.organization }}</p>
        </div>
        <div class="text-sm text-gray-600">
          <strong>Address</strong>
          <p>{{ props.selected.address }}</p>
        </div>
        <div class="text-sm text-gray-600 flex flex-col">
          <strong>Email</strong>
          <a
            :href="`mailto:${props.selected.email}`"
            class="text-indigo-600 hover:underline"
            >{{ props.selected.email }}</a
          >
        </div>
        <div v-if="props.selected.notes" class="text-sm text-gray-600">
          <strong>Notes</strong>
          <p class="prose prose-sm" v-html="props.selected.notes"></p>
        </div>
        <a
          :href="props.selected.source"
          target="_blank"
          rel="noopener"
          class="block text-sm text-indigo-600 hover:underline"
          >Source</a
        >
        <div class="mt-4">
          <h3 class="text-sm font-semibold">Report Error</h3>
          <p class="text-sm text-gray-600">
            If you see an error in this information, please help us by sending a
            correction.
          </p>
        </div>
        <img
          v-if="props.selected.organization === 'Røde Kors'"
          src="/logos/rode-kors.svg"
          alt="Røde Kors logo"
          class="h-8 w-auto mt-4"
        />
        <p class="text-sm text-gray-600">
          Data updated on
          {{
            new Date(props.selected.data_updated ?? "").toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" },
            )
          }}
        </p>
      </div>

      <!-- LIST MODE -->
      <div
        v-else
        key="list"
        ref="scroller"
        class="overflow-y-auto scrollbar-thin"
      >
        <NuxtLink
          v-for="l in props.items"
          :key="l.name"
          :to="{ path: `/locations/${slugify(l.name)}`, query: route.query }"
          class="block border-b p-4 hover:bg-neutral-200 transition"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="font-semibold leading-tight">{{ l.name }}</h3>
              <p class="text-sm text-gray-600">{{ l.organization }}</p>
              <p class="text-sm text-gray-700 mt-2">{{ l.description }}</p>
              <p class="text-sm text-gray-500 mt-1">
                {{ l.address }} • {{ l.city }}
              </p>
            </div>
            <div class="flex flex-col items-end gap-2">
              <div class="flex flex-wrap gap-1 justify-end">
                <span
                  v-for="t in l.type"
                  :key="t"
                  class="px-2 py-0.5 rounded-full text-xs bg-gray-100 border border-gray-200 text-gray-700"
                  >{{ t }}</span
                >
              </div>
              <span class="text-emerald-700 text-sm underline mt-auto"
                >Open</span
              >
            </div>
          </div>
        </NuxtLink>

        <p
          v-if="!props.items.length"
          class="text-center text-gray-500 text-sm py-8"
        >
          No locations found.
        </p>
      </div>
    </Transition>
  </div>
</template>

<style>
.sidebar-swap-enter-active,
.sidebar-swap-leave-active {
  transition:
    transform 0.18s ease,
    opacity 0.18s ease;
  will-change: transform, opacity;
}
.sidebar-swap-enter-from {
  transform: translateX(8px);
  opacity: 0;
}
.sidebar-swap-leave-to {
  transform: translateX(-8px);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .sidebar-swap-enter-active,
  .sidebar-swap-leave-active {
    transition: none;
  }
  .sidebar-swap-enter-from,
  .sidebar-swap-leave-to {
    transform: none;
    opacity: 1;
  }
}
</style>
