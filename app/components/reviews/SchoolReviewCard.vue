<template>
    <NuxtLink :to="'/reviews/' + review.id" class="block w-full group">
        <div class="flex flex-row items-center justify-between p-6 bg-gray-50 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
            
            <div class="flex flex-col gap-3 flex-1 pr-6">
                <p class="text-gray-800 text-base font-medium leading-relaxed line-clamp-3">
                    {{ review.review }}
                </p>
                
                <NuxtTime
                    :datetime="new Date(review.createdAt)"
                    day="2-digit"
                    month="2-digit"
                    year="numeric"
                    class="text-gray-400 text-sm"
                />
            </div>

            <div class="flex-shrink-0">
                <CircularRating 
                    :model-value="review.overallRating" 
                    size="lg"
                    :stroke="5"
                    class="transition-transform duration-200 group-hover:scale-105"
                />
            </div>

        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Review } from '~/types';
import CircularRating from '~/components/CircularRating.vue';

const props = defineProps<{
    review: Review
}>();


</script>