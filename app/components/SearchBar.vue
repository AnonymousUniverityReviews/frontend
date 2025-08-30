<template>
  <div ref="container" class="relative">
    <!-- Input slot -->
    <slot 
        name="input" 
        :opened="opened" 
        :query="query" 
        :submitSearch="submitSearch"
        :onFocus="focus"
    ></slot>

    <!-- Default input -->
    <div v-if="!$slots.input" class="relative">
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          placeholder="Search for something..."
          class="w-full px-5 py-4 pr-12 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base shadow-sm"
          @keydown.enter="submitSearch"
          aria-label="Search"
        />
        <button
          class="absolute inset-y-0 right-0 px-4 flex items-center justify-center cursor-pointer"
          @click="submitSearch"
          aria-label="Submit search"
        >
          🔍
        </button>
    </div>

    <!-- Menu slot -->
    <slot name="menu" v-if="opened" :close="close" :data="data"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import type { PropType } from "vue";

// Model
const query = defineModel(
    {
        type: String,
        default: ""
    }
);

// Props
const props = defineProps({
    onSubmit: {
        type: Function as PropType<(query: string) => void>,
        required: true,
    },
    onQueryChange: {
        type: Function as PropType<(query: string) => Promise<any>>,
    },
    debounceMs: {
        type: Number,
        default: 300,
    },
});

const opened = ref(false);
const focused = ref(false);
const data = ref<any[]>([]);
const container = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

// close function
function close() {
    opened.value = false;
    focused.value = false;
}

// Submit search
function submitSearch() {
    console.log("Aboba");
    props.onSubmit(query.value);
}

// Handle clicks outside
function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    if (container.value && !container.value.contains(target)) {
        close();
    }
}

// Manual debounce logic
let debounceTimeout: number | undefined;

function focus() {
    if (!props.onQueryChange) {
        return;
    }

    focused.value = true;
    if (query.value === "") {
        clearTimeout(debounceTimeout);
        return;
    }
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = window.setTimeout(async () => {
        if (focused.value) {
            data.value = await props.onQueryChange(query.value);
            opened.value = data.value.length > 0;
        }
    }, props.debounceMs);
}

watch(() => query.value, (newVal) => {
    opened.value = false;
    
    if (!props.onQueryChange) {
        return;
    }

    if (newVal === "") {
        clearTimeout(debounceTimeout);
        return;
    }
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = window.setTimeout(async () => {
        if (focused.value) {
            data.value = await props.onQueryChange(newVal);
            opened.value = data.value.length > 0;
        }
    }, props.debounceMs);
});

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>
