<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <NavBar class="h-14" />
        <div class="flex flex-col w-full items-center mb-4">
            <h1>Schools search</h1>
            <SearchBar 
                v-model="search"
                v-on:submit="getPageData"
                class="w-[60%]"
            >
            </SearchBar>
        </div>
        <div class="flex flex-col w-[80%] mx-auto mb-8">
            <!-- Header -->
            <div class="flex flex-row w-full justify-between items-center mb-2">
                <div class="flex flex-row w-max justify-between items-center gap-4">
                    <p>Schools per page</p>
                    <Dropdown>
                        <!-- Custom button -->
                        <template #button="{ opened, toggle }">
                            <button 
                                @click="toggle"
                                class="inline-flex w-12 items-center justify-center gap-x-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-500"
                            >
                                {{ pageSize }}
                                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 size-5 text-gray-400">
                                    <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                                </svg>
                            </button>
                        </template>

                        <!-- Menu items -->
                        <template #menu="{ close }">
                            <Menu 
                                @close="close" 
                                class="absolute left-0 mt-1 w-12 bg-white border rounded shadow-lg z-50"
                            >
                                <div class="py-1">
                                    <p
                                        v-for="possibleSize in possiblePageSizes"
                                        :key="possibleSize"
                                        class="block w-full py-1 text-center text-sm text-gray-700 hover:!bg-blue-600 hover:text-white focus:outline-none focus-visible:bg-gray-100 focus-visible:text-gray-900 select-none cursor-pointer"
                                        @click="changePageSize(possibleSize), close()"
                                    >
                                        {{ possibleSize }}
                                    </p>
                                </div>
                            </Menu>
                        </template>
                    </Dropdown>
                </div>
                <p>Page {{ page }}/{{ totalPages }}</p>
            </div>
            <!-- Paginator top -->
            <Paginator 
                v-model="page" 
                :total-pages="totalPages" 
                :link-maker="(page) => { return { path: '/school', query: { search: search, pageSize: pageSize, page: page } } }"
            >
            </Paginator>
            <!-- Schools -->
            <div
                class="flex flex-col w-full gap-2 my-4"
            >
                <NuxtLink
                    :to="{ name: 'school-id', params: { id: school.id } }"
                    v-for="school in schools"
                    :ket="school.id"
                    class="flex flex-row border-1 p-3 justify-between rounded-xl"
                >
                    <div class="flex flex-col gap-1">
                        <h2
                            class="text-xl font-bold"
                        >
                            {{ school.name }}
                        </h2>
                        <p
                            class="text-gray-500 dark:text-gray-300"
                        >
                            {{ school.address }}
                        </p>
                    </div>
                    <div>
                        <p
                            class="text-gray-900 text-2xl text-center py-2 px-1 font-black"
                            :class="school.overallRating as number >= 1 ? displayedRatingColors[Math.floor(school.overallRating as number) - 1] : 'dark:text-gray-100'"
                        >
                            {{ school.overallRating?.toFixed(2) }}
                        </p>
                    </div>
                </NuxtLink>
                <div
                    v-if="total === 0"
                    class="mx-auto text-xl text-gray-500 dark:text-gray-300"
                >
                    Nothing here...
                </div>
            </div>
            <!-- Paginator bottom -->
            <Paginator 
                v-model="page" 
                :total-pages="totalPages" 
                :link-maker="(page) => { return { path: '/school', query: { search: search, pageSize: pageSize, page: page } } }"
            >
            </Paginator>
        </div>
    </div>
</template>

<script setup lang="ts">
import { displayedRatingColors } from '~/constants/colors';
import { getSchools } from '~/services/searchService'
import type { School } from '~/types';

const route = useRoute()

const search = ref<string>(route.query.search as string ?? "");

const page = ref<number>(+(route.query.page ?? 1));
const possiblePageSizes = [1, 3, 5, 10, 20];
const pageSize = ref<number>(+(route.query.pageSize ?? 5));

watch(() => route.query, () => {
    search.value = (route.query.search as string) ?? "";
    page.value = +(route.query.page ?? 1);
    pageSize.value = +(route.query.pageSize ?? pageSize.value);
    getPageData();
  },
  { immediate: true }
);

const schools = ref<School[]>([]);
const total = ref<number>(0);
const totalPages = ref<number>(0);

async function changePageSize(newPageSize: number) {
    pageSize.value = newPageSize;
    await getPageData();
}

async function getPageData() {
    const schoolsResult = await getSchools(search.value, "info", page.value, pageSize.value);
    total.value = schoolsResult.total ?? 0;
    schools.value = schoolsResult.result;
    totalPages.value = Math.ceil(total.value / pageSize.value);

    if (page.value > totalPages.value) {
        page.value = totalPages.value;
    }
    if (page.value < 1) {
        page.value = 1;
    }
}

await getPageData();
</script>