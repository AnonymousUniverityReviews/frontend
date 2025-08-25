<template>
    <nav aria-label="Page navigation" class="mx-auto">
        <ul class="inline-flex -space-x-px text-base h-10">
            <!-- Previous -->
            <li>
                <NuxtLink
                    :to="linkMaker(Math.max(page - 1, 1))"
                    class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    Previous
                </NuxtLink>
            </li>

            <!-- Case 1: totalPages <= 7 -->
            <template v-if="totalPages <= 7">
                <li v-for="i in totalPages" :key="i">
                    <NuxtLink
                        :to="linkMaker(i)"
                        class="flex items-center justify-center px-4 h-10"
                        :class="[page === i ? 
                            'text-gray-800 font-semibold border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                            : 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']"
                    >
                        {{ i }}
                    </NuxtLink>
                </li>
                <li
                    v-if="totalPages === 0"
                >
                    <NuxtLink
                        :to="linkMaker(1)"
                        class="flex items-center justify-center px-4 h-10"
                        :class="[page === 1 ? 
                            'text-gray-800 font-semibold border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                            : 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']"
                    >
                        1
                    </NuxtLink>
                </li>
            </template>

            <!-- Case 2: page <= 4 -->
            <template v-else-if="page <= 4">
                <li v-for="i in [1,2,3,4,5]" :key="i">
                    <NuxtLink
                        :to="linkMaker(i)"
                        class="flex items-center justify-center px-4 h-10"
                        :class="[page === i ? 
                            'text-gray-800 font-semibold border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                            : 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']"
                    >
                        {{ i }}
                    </NuxtLink>
                </li>
                <li>
                    <span class="px-4 h-10 flex items-center">
                        ...
                    </span>
                </li>
                <li>
                    <NuxtLink
                        :to="linkMaker(totalPages)"class="flex items-center justify-center px-4 h-10"
                        :class="[page === totalPages ? 
                            'text-gray-800 font-semibold border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                            : 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']"
                    >
                        {{ totalPages }}
                    </NuxtLink>
                </li>
            </template>

            <!-- Case 3: page >= totalPages - 3 -->
            <template v-else-if="page >= totalPages - 3">
                <li>
                    <NuxtLink
                        :to="linkMaker(1)"class="flex items-center justify-center px-4 h-10"
                        :class="[page === 1 ? 
                            'text-gray-800 font-semibold border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                            : 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']"
                    >
                        1
                    </NuxtLink>
                </li>
                <li>
                    <span class="px-4 h-10 flex items-center">
                        ...
                    </span>
                </li>
                <li v-for="i in [totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages]" :key="i">
                    <NuxtLink
                        :to="linkMaker(i)"
                        class="flex items-center justify-center px-4 h-10"
                        :class="[page === i ? 
                            'text-gray-800 font-semibold border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                            : 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']"
                    >
                        {{ i }}
                    </NuxtLink>
                </li>
            </template>

            <!-- Case 4: middle -->
            <template v-else>
                <li>
                    <NuxtLink
                        :to="linkMaker(1)"
                        class="flex items-center justify-center px-4 h-10"
                        :class="[page === 1 ? 
                            'text-gray-800 font-semibold border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                            : 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']"
                    >
                        1
                    </NuxtLink>
                </li>
                <li>
                    <span class="px-4 h-10 flex items-center">
                        ...
                    </span>
                </li>
                <li>
                    <NuxtLink
                        :to="linkMaker(page - 1)"
                        class="flex items-center justify-center px-4 h-10"
                        :class="['leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']"
                    >
                        {{ page - 1 }}
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        :to="linkMaker(page)"
                        class="flex items-center justify-center px-4 h-10"
                        :class="['text-gray-800 font-semibold border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white']"
                    >
                        {{ page }}
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        :to="linkMaker(page + 1)"
                        class="flex items-center justify-center px-4 h-10"
                        :class="['leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']"
                    >
                        {{ page + 1 }}
                    </NuxtLink>
                </li>
                <li>
                    <span class="px-4 h-10 flex items-center">
                        ...
                    </span>
                </li>
                <li>
                    <NuxtLink
                        :to="linkMaker(totalPages)"
                        class="flex items-center justify-center px-4 h-10"
                        :class="[page === totalPages ? 
                            'text-gray-800 font-semibold border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                            : 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']"
                    >
                        {{ totalPages }}
                    </NuxtLink>
                </li>
            </template>

            <!-- Next -->
            <li>
                <NuxtLink
                    :to="linkMaker(Math.max(Math.min(page + 1, totalPages), 1))"
                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    Next
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import type { RouteLocationAsPath } from 'vue-router';

const page = defineModel({
    type: Number,
    default: 1,
    required: true
});

const { totalPages, linkMaker } = defineProps({
    totalPages: {
        type: Number,
        default: 0,
        required: true
    },
    linkMaker: {
        type: Function as PropType<(page: number) => RouteLocationAsPath>,
        required: true,
    }
});
</script>