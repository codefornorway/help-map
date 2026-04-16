<script setup lang="ts">
import { locations as seed } from '~/data/locations';
import type { TagKey } from '~/data/tags';
import type { LocationItem } from '~/data/locations';

const isMenuOpen = ref(false);
const search = ref('');
const activeTypes = ref<TagKey[]>([]);

const route = useRoute();
const router = useRouter();

const selected = computed(() => {
  const slug = (route.params as any)?.slug as string | undefined;
  return slug ? seed.find(l => slugify(l.name) === slug) ?? null : null;
});

// --- Query <-> State (q, types)
function parseTypes(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val.flatMap(v => String(v).split(',')).filter(Boolean);
  return String(val).split(',').filter(Boolean);
}
function applyQuery(q = route.query) {
  const qSearch = typeof q.q === 'string' ? q.q : '';
  const qTypes = parseTypes(q.types) as TagKey[];
  if (qSearch !== search.value) search.value = qSearch;
  const cur = [...activeTypes.value].sort().join(',');
  const nxt = [...qTypes].sort().join(',');
  if (cur !== nxt) activeTypes.value = qTypes;
}
function debounce<T extends (...a: any[]) => void>(fn: T, d = 200) {
  let t: any;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), d);
  };
}
const syncToUrl = debounce(() => {
  const next = { ...(route.query as Record<string, any>) };
  const q = search.value.trim();
  if (q) next.q = q;
  else delete next.q;
  const types = activeTypes.value.length ? [...activeTypes.value].sort().join(',') : '';
  if (types) next.types = types;
  else delete next.types;
  const same = (next.q ?? '') === (route.query.q ?? '') && (next.types ?? '') === (route.query.types ?? '');
  if (!same) router.replace({ query: next });
}, 200);

// --- Mobile viewport
const isMobile = ref(false);
let mq: MediaQueryList | null = null;
function updateIsMobile() {
  if (typeof window === 'undefined') {
    isMobile.value = false;
    return;
  }
  if (!mq) mq = window.matchMedia('(max-width: 1023px)');
  isMobile.value = mq.matches;
}

onMounted(() => {
  updateIsMobile();
  mq?.addEventListener('change', updateIsMobile);
  applyQuery();
  watch([search, activeTypes], syncToUrl, { deep: true });
  watch(
    () => route.query,
    q => applyQuery(q),
    { deep: true }
  );
});
onBeforeUnmount(() => {
  mq?.removeEventListener('change', updateIsMobile);
});

/** ---------- Hızlı Arama İndeksi ---------- **/
type IndexedLocation = LocationItem & { __search: string };
const indexed: IndexedLocation[] = seed.map(l => {
  const bag = [l.name, l.city, l.address, l.description, l.organization].filter(Boolean).join(' ');
  return { ...l, __search: normalizeText(bag) };
});

// --- Filtered (performanslı + diacritics tolerant)
const RESULT_LIMIT = 200; // UI render yükünü sınırlamak için
const filtered = computed<LocationItem[]>(() => {
  const qn = normalizeText(search.value.trim());
  const types = activeTypes.value;

  let out: IndexedLocation[] = indexed;
  if (qn) out = out.filter(l => l.__search.includes(qn));
  if (types.length) out = out.filter(l => types.every(t => l.type.includes(t as any)));

  return out.slice(0, RESULT_LIMIT);
});

// UI
function toggleType(tag: TagKey) {
  const set = new Set(activeTypes.value);
  set.has(tag) ? set.delete(tag) : set.add(tag);
  activeTypes.value = Array.from(set);
}
function goBack() {
  if (process.client && window.history.length > 1) router.back();
  else router.push({ path: '/', query: route.query });
}
</script>

<template>
  <div class="min-h-dvh bg-gray-50 text-gray-900 flex flex-col">
    <AppHeader v-model="search" @toggle-menu="isMenuOpen = !isMenuOpen" />

    <!-- Mobil -->
    <div v-if="isMobile" class="lg:hidden relative">
      <MapPane mapId="map-mobile" class="h-[calc(100svh-var(--header-h))]" :items="filtered" :selected="selected" />
      <ClientOnly>
        <LazyMobileBottomSheet :items="filtered" :activeTypes="activeTypes" :selected="selected" @toggle-type="toggleType" @back="goBack" />
      </ClientOnly>
      <LazyMobileMenuDrawer :open="isMenuOpen" @close="isMenuOpen = false" />
    </div>

    <!-- Desktop -->
    <!-- ESKİ: <div class="hidden lg:grid flex-1" ...> -->
    <div v-else class="grid flex-1" :class="isMenuOpen ? 'grid-cols-[320px_1fr_320px]' : 'grid-cols-[320px_1fr]'" style="grid-template-rows: calc(100dvh - var(--header-h))">
      <aside class="border-r bg-white overflow-hidden z-10">
        <SidebarList :items="filtered" :activeTypes="activeTypes" :showFilters="false" :selected="selected" @toggle-type="toggleType" @back="goBack" class="h-full" />
      </aside>

      <section class="relative h-full">
        <MapPane mapId="map-desktop" :items="filtered" :selected="selected" />
        <div class="hidden lg:block absolute left-3 top-3 z-40">
          <MapFiltersBar :activeTypes="activeTypes" @toggle-type="toggleType" />
        </div>
      </section>

      <MenuDrawer v-if="isMenuOpen" @close="isMenuOpen = false" />
    </div>

    <slot />
  </div>
</template>
