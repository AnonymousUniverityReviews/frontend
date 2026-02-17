<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- NAVBAR -->
    <NavBar class="h-16" />

    <!-- MAIN -->
    <main class="flex-grow flex flex-col items-center justify-center px-4 py-16 text-center">
      <!-- Logo area -->
      <div class="mb-8">
        <div class="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg grid place-items-center">
          <span class="text-white text-2xl font-black select-none">S</span>
        </div>
        <h1 class="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
          Studentus
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Find & review professors and schools
        </p>
      </div>

      <!-- Search box -->
      <div class="w-full max-w-xl justify-self-center">
        <SearchBar class="w-full max-w-xl justify-self-center" v-model="searchText" :debounce-ms="300" v-on:submit="submitSearch" v-on:query-change="getSearchType">
          <template #input="{ opened, submitSearch, onFocus }">
            <div class="relative">
              <input
                type="text"
                v-model="searchText"
                :placeholder="placeholder"
                class="w-full px-5 py-4 pr-12 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base shadow-sm"
                @keydown.enter="submitSearch"
                aria-label="Search"
                @focus="onFocus"
              />
              <button
                class="absolute inset-y-0 right-0 px-4 flex items-center justify-center cursor-pointer"
                @click="submitSearch"
                aria-label="Submit search"
              >
                🔍
              </button>
            </div>
          </template>

          <template #menu="{ data, close }">
            <Menu 
              v-if="true"
              @close="close" 
              class="absolute right-0 mt-1 w-full bg-white border rounded shadow-lg z-50"
            >
              <div class="py-1">
                <div 
                  class="flex flex-row w-full py-2 px-3 items-center group hover:!bg-blue-600 focus:outline-none cursor-pointer"
                  v-for="entry in data" 
                  :key="entry.id" 
                  @click="() => searchText = entry.name"
                >
                  <!-- Icon -->
                  <Icon 
                    name="mynaui:academic-hat"
                    class="flex-shrink-0 w-5 h-5 text-xl text-gray-600 group-hover:text-white mr-3"
                  />
                
                  <!-- Text -->
                  <span class="flex flex-col w-[60%]">
                    <p class="text-left text-sm font-semibold text-gray-700 group-hover:text-white truncate">
                      {{ entry.name }}
                    </p>
                    <p
                      v-if="searchType === 'school'"
                      class="text-left text-xs text-gray-400 group-hover:text-white truncate"
                    >
                      {{ entry.address }}
                    </p>
                    <p
                      v-else-if="searchType === 'professor'"
                      class="text-left text-xs text-gray-400 group-hover:text-white truncate"
                    >
                      {{ formatProfessorWorkplace(entry) }}
                    </p>
                  </span>

                  <!-- Link -->
                  <NuxtLink
                    :to="{ name: `${searchType}-id`, params: { id: entry.id } }"
                    class="ml-auto w-[25%] text-right text-sm font-medium text-gray-700 underline group-hover:text-white truncate"
                  >
                    View webpage
                  </NuxtLink>
                </div>
              </div>
            </Menu>
          </template>
        </SearchBar>
        
        <div class="mt-2 text-sm">
          <a
            href="#"
            @click.prevent="toggleSearchType"
            class="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {{ searchType === 'professor' ? 'Switch to school search' : 'Switch to professor search' }}
          </a>
        </div>

        <!-- Helper pills (optional aesthetic) -->
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <button
            v-for="pill in demoPills"
            :key="pill"
            @click="searchText = pill"
            class="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {{ pill }}
          </button>
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
                        Studentus – єдиний в Україні сайт, який зібрав усі відгуки, важливі для студентів
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
import { ref, computed } from 'vue'
import { useHead, useRouter } from '#imports'
import { getProfessors, getSchools } from '~/services/searchService'

const router = useRouter()
const query = ref('')
const searchType = ref<'professor' | 'school'>('professor')
const searchText = ref<string>("");

const placeholder = computed(() =>
  searchType.value === 'professor' ? 'Search for a professor...' : 'Search for a school...'
)

const demoPills = ['Taras Shevchenko University', 'Computer Science', 'Ivan Petrenko', 'Kyiv']

function toggleSearchType() {
  searchType.value = searchType.value === 'professor' ? 'school' : 'professor'
}

async function getSearchType() {
  if (searchType.value === 'school') {
    return (await getSchools(searchText.value)).result.slice(0, 3);
  }
  else {
    return (await getProfessors(searchText.value)).result.slice(0, 3);
  }
}

function submitSearch() {
  if (!searchText.value.trim()) return
  const base = searchType.value
  router.push({ path: base, query: { search: searchText.value } })
}

useHead({
  title: 'Studentus – Find Professors & Schools',
  meta: [
    { name: 'description', content: 'Search and rate professors and schools. Clean Nuxt 3 + Tailwind UI + Flowbite.' }
  ],
})
</script>

<style scoped>
/* Smooth placeholder opacity change on focus */
input::placeholder { opacity: 0.7; transition: opacity .2s ease; }
input:focus::placeholder { opacity: 0.4; }
</style>
