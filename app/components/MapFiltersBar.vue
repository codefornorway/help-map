<script setup lang="ts">
import { TAGS, type TagKey } from "~/data/tags";

const props = defineProps<{ activeTypes: TagKey[] }>();
const emit = defineEmits<{ (e: "toggle-type", type: TagKey): void }>();
</script>

<template>
  <!-- Wrapper is positioned by parent with absolute; keep this block pointer-enabled -->
  <div
    class="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-thin max-w-[min(100vw-24px,720px)] px-2 py-2"
  >
    <button
      v-for="t in TAGS"
      :key="t.key"
      @click="emit('toggle-type', t.key)"
      :aria-pressed="props.activeTypes.includes(t.key)"
      class="px-3 h-8 cursor-pointer rounded-full shadow text-sm font-semibold shrink-0"
      :class="
        props.activeTypes.includes(t.key)
          ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
      "
    >
      {{ t.label }}
    </button>
  </div>
</template>
