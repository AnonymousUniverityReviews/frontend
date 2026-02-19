<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-900">
    <NavBar class="h-16" />

    <main class="flex-grow flex flex-col items-center justify-center px-4 py-16 text-center">
      <div class="mb-8">
        <!-- <div class="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg grid place-items-center">
          <span class="text-white text-2xl font-black select-none">S</span>
        </div> -->
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
            :on-submit="handleSearchSubmit"
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
                <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400" />
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
        <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
             <!-- Sort Dropdown -->
            <div class="relative">
                <button 
                    @click.stop="isSortDropdownOpen = !isSortDropdownOpen"
                    class="sort-dropdown-trigger flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:bg-gray-100 transition cursor-pointer"
                >
                     <Icon v-if="selectedSort === 'rating'" name="mdi:sort" class="w-5 h-5 text-gray-500" />
                     <Icon v-else-if="selectedSort === 'reviews'" name="mdi:forum-outline" class="w-5 h-5 text-gray-500" />
                     <Icon v-else name="mdi:clock-time-two-outline" class="w-5 h-5 text-gray-500" />

                     <span class="text-sm font-medium text-gray-700">
                        {{ selectedSort === 'rating' ? 'За рейтингом' : selectedSort === 'reviews' ? 'Найбільше відгуків' : 'Спочатку найновіші' }}
                     </span>
                     <Icon name="ph:caret-down-bold" class="w-3 h-3 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': isSortDropdownOpen }" />
                </button>

                <div v-if="isSortDropdownOpen" class="sort-dropdown-content absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden flex flex-col py-1">
                     <button @click="selectSort('rating')" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition">
                        <Icon name="mdi:star-outline" class="w-5 h-5 text-yellow-500" />
                        <span class="text-sm text-gray-700">За рейтингом</span>
                        <Icon v-if="selectedSort === 'rating'" name="ph:check-bold" class="w-4 h-4 text-blue-600 ml-auto" />
                     </button>
                      <button @click="selectSort('reviews')" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition">
                        <Icon name="mdi:forum-outline" class="w-5 h-5 text-blue-500" />
                         <span class="text-sm text-gray-700">Найбільше відгуків</span>
                         <Icon v-if="selectedSort === 'reviews'" name="ph:check-bold" class="w-4 h-4 text-blue-600 ml-auto" />
                     </button>
                      <button @click="selectSort('newest')" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition">
                         <Icon name="mdi:clock-time-two-outline" class="w-5 h-5 text-green-500" />
                         <span class="text-sm text-gray-700">Спочатку найновіші</span>
                         <Icon v-if="selectedSort === 'newest'" name="ph:check-bold" class="w-4 h-4 text-blue-600 ml-auto" />
                     </button>
                </div>
            </div>

             <!-- Filter Dropdown -->
             <div class="relative">
                  <button 
                    @click.stop="isCityDropdownOpen = !isCityDropdownOpen"
                     class="city-dropdown-trigger flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:bg-gray-100 transition cursor-pointer"
                     :class="{ 'border-blue-500 ring-2 ring-blue-100': selectedCity }"
                  >
                     <Icon name="mdi:tune-vertical-variant" class="w-5 h-5 text-gray-500" :class="{ 'text-blue-600': selectedCity }" />
                     <span class="text-sm font-medium text-gray-700" :class="{ 'text-blue-600': selectedCity }">
                        {{ selectedCity || 'Фільтрувати' }}
                     </span>
                     <Icon v-if="selectedCity" @click.stop.prevent="selectCity('')" name="ph:x-circle-fill" class="w-4 h-4 text-gray-400 hover:text-red-500" />
                     <Icon v-else name="ph:caret-down-bold" class="w-3 h-3 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': isCityDropdownOpen }" />
                </button>

                 <div v-if="isCityDropdownOpen" class="city-dropdown-content absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden flex flex-col">
                    <div class="p-3 border-b border-gray-100">
                        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Місто</span>
                        <div class="mt-2 relative">
                            <input 
                                v-model="citySearchText"
                                type="text" 
                                placeholder="Введіть місто" 
                                class="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                autofocus
                            >
                            <Icon name="ph:magnifying-glass" class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                    <div class="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                        <button 
                            v-for="city in filteredCities" 
                            :key="city"
                            @click="selectCity(city)"
                            class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition flex items-center justify-between"
                        >
                            {{ city }}
                             <Icon v-if="selectedCity === city" name="ph:check-bold" class="w-3.5 h-3.5 text-blue-600" />
                        </button>
                         <div v-if="filteredCities.length === 0" class="px-4 py-8 text-center text-sm text-gray-400">
                            Місто не знайдено
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <template v-for="(school, index) in schools" :key="school.id">
                 <UniversityCard :school="school" :rank="index + 1" />
            </template>
        </div>

        <div class="mt-8 flex flex-col items-center gap-4">
             <button 
                v-if="hasMore && !loading && !isInfiniteScrollActive"
                @click="enableInfiniteScroll"
                class="flex items-center gap-2 px-6 py-2.5  text-gray-700 hover:text-gray-800 rounded-full font-medium transition-all"
             >
                <span>Дивитись далі</span>
                <Icon name="ph:caret-down-bold" class="w-4 h-4" />
             </button>

             <div ref="loadTrigger" class="flex justify-center py-4 w-full h-10">
                 <div v-if="loading" class="h-10 w-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                 <span v-else-if="!hasMore && schools.length > 0" class="text-gray-400 text-sm">
                    Більше університетів немає
                 </span>
             </div>
        </div>
     </div>
    </main>

    <!-- Footer -->
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
                        Studentus – Перший і єдиний сайт в Україні з повністю анонімною системою відгуків для студентів
                    </p>
                    <p class = "text-xs text-gray-500 max-w-xs">
                        © {{ new Date().getFullYear() }} Studentus. All rights reserved.
                    </p>
                </div>
                 <div class="text-sm text-gray-500 text-right">
                    <p class="font-semibold mb-1">Якщо у вас виникли будь-які запитання, напишіть нам:</p>
                    <a href="mailto:contact@studentus.com" class="font-medium hover:underline">contact@studentus.com</a>
                </div>
             </div>
        </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useHead, useRouter } from '#imports'
import { getSchools } from '~/services/searchService'
import type { University } from '~/types'
import UniversityCard from '~/components/UniversityCard.vue';

const router = useRouter()
const searchText = ref<string>("");

// University List Data
const schools = ref<University[]>([]);
const cursor = ref<string | null>(null);
const pageSize = 10;
const hasMore = ref(true);
const loading = ref(false);
const loadTrigger = ref<HTMLElement | null>(null); // Sentinel for infinite scroll
const isInfiniteScrollActive = ref(false);
let observer: IntersectionObserver | null = null;

function enableInfiniteScroll() {
    isInfiniteScrollActive.value = true;
    loadSchools();
}

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && !loading.value && hasMore.value && isInfiniteScrollActive.value) {
            loadSchools();
        }
    }, {
        rootMargin: '200px'
    });

    if (loadTrigger.value) {
        observer.observe(loadTrigger.value);
    }
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});

const placeholder = computed(() => 'Знайти університет...')
const demoPills = ['Львівська політехніка', 'Київ', 'Національний', 'Сумський державний університет']

// Filtering & Sorting State
const selectedCity = ref<string>("");
const selectedSort = ref<"rating" | "reviews" | "newest">("rating");
const isCityDropdownOpen = ref(false);
const isSortDropdownOpen = ref(false);
const citySearchText = ref("");

const cities = [
    "Київ", "Львів", "Харків", "Одеса", "Дніпро", "Вінниця", "Запоріжжя", "Тернопіль", "Полтава", "Ужгород", "Чернівці", "Суми"
];

const filteredCities = computed(() => {
    if (!citySearchText.value) return cities;
    return cities.filter(c => c.toLowerCase().includes(citySearchText.value.toLowerCase()));
});

function selectCity(city: string) {
    selectedCity.value = city;
    isCityDropdownOpen.value = false;
    citySearchText.value = "";
}

function selectSort(sort: "rating" | "reviews" | "newest") {
    selectedSort.value = sort;
    isSortDropdownOpen.value = false;
}

// Close dropdowns when clicking outside
onMounted(() => {
    document.addEventListener('click', closeDropdowns);
});

onUnmounted(() => {
    document.removeEventListener('click', closeDropdowns);
});

function closeDropdowns(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.closest('.city-dropdown-trigger') && !target.closest('.city-dropdown-content')) {
        isCityDropdownOpen.value = false;
    }
    if (!target.closest('.sort-dropdown-trigger') && !target.closest('.sort-dropdown-content')) {
        isSortDropdownOpen.value = false;
    }
}


async function loadSchools(reset: boolean = false) {
    if (loading.value) return;
    if (!hasMore.value && !reset) return;

    loading.value = true;
    
    if (reset) {
        cursor.value = null;
        schools.value = [];
        hasMore.value = true;
    }

    try {
        const data = await getSchools(searchText.value, "basic", 1, pageSize, selectedCity.value, selectedSort.value, cursor.value);
        
        if (reset) {
            schools.value = data.result;
        } else {
            schools.value.push(...data.result);
        }
        
        cursor.value = data.nextCursor;
        hasMore.value = data.hasNextPage;

    } catch (e) {
        console.error("Failed to load schools", e);
    } finally {
        loading.value = false;
    }
}

watch([searchText, selectedCity, selectedSort], () => {
    isInfiniteScrollActive.value = false;
    loadSchools(true);
});


loadSchools(true);

// Mock function for search input autocomplete if needed
async function handleSearchInput(query: string) {
    return [];
}

const handleSearchSubmit = (query: string) => {
  loadSchools(true);
}

useHead({
  title: 'Studentus – Знайти університет',
})
</script>

<style scoped>
input::placeholder { opacity: 0.7; transition: opacity .2s ease; }
input:focus::placeholder { opacity: 0.4; }
</style>