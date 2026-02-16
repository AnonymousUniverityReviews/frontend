<template>
    <div class="flex flex-row justify-between items-center w-full p-6 bg-gray-50 rounded-2xl shadow-sm border border-gray-100">
        <div class="flex flex-col gap-2 w-[85%]">
            <p class="text-gray-800 text-base font-medium leading-relaxed">
                {{ review.review }}
            </p>
            <NuxtTime
                :datetime="new Date(review.createdAt)"
                year="numeric"
                month="2-digit"
                day="2-digit"
                class="text-gray-400 text-sm font-medium"
            />
        </div>
        <div class="flex items-center justify-center">
             <CircularRating 
                :model-value="review.overallRating" 
                size="md"
                :stroke="4"
             />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Review } from '~/types';
import CircularRating from '~/components/CircularRating.vue';

const props = defineProps<{
    review: Review
}>();


</script>
