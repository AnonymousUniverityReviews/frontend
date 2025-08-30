<template>
    <NuxtLink
        :to="{ name: 'school-id', params: { id: school.id } }"
        class="text-gray-900 dark:text-gray-100 group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition duration-200 flex flex-col justify-between"
    >
        <div>
            <h2 class="text-xl font-bold group-hover:text-blue-600 transition">
                {{ school.name }}
            </h2>
            <p class="text-gray-500 dark:text-gray-300">
                {{ school.address }}
            </p>
        </div>
        <div class="mt-4">
            <p
                class="text-2xl text-gray-800 font-black text-center"
                :class="school.overallRating as number >= 1 ? displayedRatingColors[Math.floor(school.overallRating as number) - 1] : 'dark:text-gray-100   '"
            >
                {{ school.overallRating?.toFixed(2) }}
            </p>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import { displayedRatingColors } from '~/constants/colors';
import type { School } from '~/types/ratings';

const { school } = defineProps<{
    school: School
}>();
</script>