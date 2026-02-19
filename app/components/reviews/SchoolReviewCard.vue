<template>
    <NuxtLink :to="'/reviews/' + review.id" class="block w-full group">
        <div class="flex flex-row items-center justify-between p-6 bg-gray-50 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
            
            <div class="flex flex-col gap-3 flex-1 mr-6 overflow-hidden">
                <div :class="['relative flex flex-col', expanded ? '' : 'h-[4.8em] overflow-hidden']">
                    <p class="text-gray-800 text-sm">
                        Anonym #{{ review.userId.substring(0, 8) }}
                    </p>    
                    <p class="text-gray-800 text-base font-medium leading-relaxed my-auto break-words whitespace-pre-wrap">
                        {{ review.body }}
                    </p>
                    
                    <div v-if="!expanded" class="absolute right-0 bottom-0 h-[2em] w-40 bg-gradient-to-l from-gray-50 to-transparent"></div>
                </div>
                
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
                    :model-value="review.score" 
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
    review: Review,
    expanded?: boolean
}>();


</script>