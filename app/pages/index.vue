<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-900">
    <NavBar class="h-16" />

    <main class="flex-grow flex flex-col items-center justify-center px-4 py-16 text-center">
      <div class="mb-8">
        <div class="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg grid place-items-center">
          <span class="text-white text-2xl font-black select-none">S</span>
        </div>
        <h1 class="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
          Studentus
        </h1>
        <p class="mt-2 text-gray-600 max-w-md mx-auto">
          Знайти & залишити відгук про університет
        </p>
      </div>

      <div class="w-full max-w-xl justify-self-center">
        <SearchBar 
            class="w-full max-w-xl justify-self-center" 
            v-model="searchText" 
            :debounce-ms="500" 
            v-on:query-change="handleSearchInput"
        >
          <template #input="{ opened, submitSearch, onFocus }">
            <div class="relative">
              <input
                type="text"
                v-model="searchText"
                :placeholder="placeholder"
                class="w-full px-5 py-4 pr-12 rounded-2xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base shadow-sm"
                @focus="onFocus"
              />
              <button
                class="absolute inset-y-0 right-0 px-4 flex items-center justify-center cursor-pointer"
                aria-label="Submit search"
              >
                🔍
              </button>
            </div>
          </template>
        </SearchBar>
        
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <button
            v-for="pill in demoPills"
            :key="pill"
            @click="searchText = pill"
            class="px-3 py-1 rounded-full text-xs border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-400/30 shadow-sm shadow-blue-200/30 transition"
          >
            {{ pill }}
          </button>
        </div>
      </div>

     <div class="w-full max-w-6xl mt-16 px-4">
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center gap-2">
                 <Icon name="ph:sort-ascending" class="w-5 h-5 text-gray-500" />
                 <span class="text-sm font-medium text-gray-600">За рейтингом</span>
                 <Icon name="ph:caret-down" class="w-3 h-3 text-gray-400" />
            </div>
             <div class="flex items-center gap-2">
                 <Icon name="ph:sliders-horizontal" class="w-5 h-5 text-gray-500" />
                 <span class="text-sm font-medium text-gray-600">Фільтрувати</span>
                 <Icon name="ph:caret-down" class="w-3 h-3 text-gray-400" />
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <template v-for="(school, index) in schools" :key="school.id">
                 <UniversityCard :school="school" :rank="index + 1" />
            </template>
        </div>

        <div ref="loadTrigger" class="mt-8 flex justify-center py-4">
             <div v-if="loading" class="h-10 w-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
             <span v-else-if="!hasMore && schools.length > 0" class="text-gray-400 text-sm">
                Більше університетів немає
             </span>
        </div>
     </div>
    </main>

    <footer class="mt-auto py-8 border-t border-gray-200 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <div class="h-14 w-14 rounded-2xl bg-white border border-gray-200 grid place-items-center">
                        <span class="bg-gradient-to-br from-blue-600 to-indigo-500 bg-clip-text text-transparent text-3xl font-black select-none">S</span>
                    </div>
                    <span class="font-bold text-xl">Studentus</span>
                </div>
                <p class="text-xs text-gray-500 max-w-xs">
                    © {{ new Date().getFullYear() }} Studentus. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useHead, useRouter } from '#imports'
import { getSchools } from '~/services/searchService'
import type { School } from '~/types'
import UniversityCard from '~/components/UniversityCard.vue';

const router = useRouter()
const searchText = ref<string>("");

// University List Data
const schools = ref<School[]>([]);
const page = ref(1);
const pageSize = 5;
const hasMore = ref(true);
const loading = ref(false);
const totalSchools = ref(0);
const loadTrigger = ref<HTMLElement | null>(null); // Sentinel for infinite scroll

const placeholder = computed(() => 'Знайти універ')
const demoPills = ['КНУ Шевченка', 'КПІ', 'ЛНУ Франка', 'Сумський державний університет']

async function loadSchools(reset: boolean = false) {
    if (loading.value) return;
    if (!hasMore.value && !reset) return;

    loading.value = true;
    
    if (reset) {
        page.value = 1;
        schools.value = [];
        hasMore.value = true;
    }

    try {
        const data = await getSchools(searchText.value, "basic", page.value, pageSize);
        
        if (reset) {
            schools.value = data.result;
        } else {
             schools.value.push(...data.result);
        }
        
        totalSchools.value = data.total;
        
        if (data.result.length < pageSize || schools.value.length >= data.total) {
            hasMore.value = false;
        } else {
            page.value++; 
        }

    } catch (e) {
        console.error("Failed to load schools", e);
    } finally {
        loading.value = false;
    }
}

watch(searchText, () => {
    loadSchools(true);
});


loadSchools(true);

// Mock function for search input autocomplete if needed
async function handleSearchInput(query: string) {
    return [];
}

useHead({
  title: 'Studentus – Знайти університет',
})
</script>

<style scoped>
input::placeholder { opacity: 0.7; transition: opacity .2s ease; }
input:focus::placeholder { opacity: 0.4; }
</style>