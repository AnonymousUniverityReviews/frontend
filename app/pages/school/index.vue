<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <NavBar class="h-16" />

        <!-- Header -->
        <div class="flex flex-col w-full items-center mb-8 mt-10">
            <h1 class="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-6">
                Schools Search
            </h1>
            <div class="flex w-[60%] rounded-xl">
                <SearchBar 
                    v-model="search"
                    v-on:submit="getPageData"
                    class="flex-1 px-3 py-2"
                />
            </div>
        </div>

        <!-- Controls -->
        <div class="flex flex-col w-[80%] mx-auto mb-8">
            <div class="flex flex-row w-full justify-between items-center mb-4">
                <div class="flex flex-row gap-3 items-center">
                    <p class="text-sm font-semibold">Schools per page</p>
                    <Dropdown>
                        <template #button="{ opened, toggle }">
                            <button 
                                @click="toggle"
                                class="inline-flex w-14 items-center justify-center gap-x-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                {{ pageSize }}
                                <svg viewBox="0 0 20 20" fill="currentColor" class="-mr-1 size-5 text-gray-400">
                                    <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                                </svg>
                            </button>
                        </template>

                        <template #menu="{ close }">
                            <Menu @close="close" class="absolute left-0 mt-1 w-14 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50">
                                <div class="py-1">
                                    <p
                                        v-for="possibleSize in possiblePageSizes"
                                        :key="possibleSize"
                                        class="block w-full py-1 text-center text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white cursor-pointer select-none"
                                        @click="changePageSize(possibleSize), close()"
                                    >
                                        {{ possibleSize }}
                                    </p>
                                </div>
                            </Menu>
                        </template>
                    </Dropdown>
                </div>
                <p class="text-sm font-medium">Page {{ page }}/{{ totalPages }}</p>
            </div>

            <!-- Paginator top -->
            <Paginator 
                v-model="page" 
                :total-pages="totalPages" 
                :link-maker="(page) => { return { path: '/school', query: { search: search, pageSize: pageSize, page: page } } }"
            />

            <!-- Schools -->
            <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6">
                <SchoolSearchBlock 
                    v-for="school in schools"
                    :school="school"
                    :key="school.id"
                ></SchoolSearchBlock>

                <div v-if="total === 0" class="mx-auto text-xl text-gray-500 dark:text-gray-300 col-span-full">
                    Nothing here...
                </div>
            </div>

            <!-- Paginator bottom -->
            <Paginator 
                v-model="page" 
                :total-pages="totalPages" 
                :link-maker="(page) => { return { path: '/school', query: { search: search, pageSize: pageSize, page: page } } }"
            />
        </div>
    </div>
</template>


<script setup lang="ts">
import { getSchools } from '~/services/searchService'
import type { School } from '~/types/ratings';

import SchoolSearchBlock from '~/components/searchBlocks/SchoolSearchBlock.vue';

const route = useRoute()

const search = ref<string>(route.query.search as string ?? "");

const page = ref<number>(+(route.query.page ?? 1));
const possiblePageSizes = [1, 3, 6, 12, 24];
const pageSize = ref<number>(+(route.query.pageSize ?? 6));

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