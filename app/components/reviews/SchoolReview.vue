<template>
<div class="bg-gray-100 dark:bg-gray-800 w-full">
    <div class="flex flex-row w-[95%] px-4 py-4">
        <!-- Overall -->
        <span class="flex flex-col w-[10%] justify-start items-center px-4">
            <p 
                class="text-gray-900 text-5xl text-center mt-7 py-2 px-1 font-black mb-1"
                :class="review.overallRating >= 1 ? displayedRatingColors[Math.floor(review.overallRating) - 1] : 'dark:text-gray-100'"
            >
                {{ review.overallRating.toFixed(1) }}
            </p>
            <p class="font-semibold">
                Overall
            </p>
        </span>
        <div class="flex flex-col w-[90%]">
            <!-- Top -->
            <span class="flex flex-row justify-between w-full text-gray-500 dark:text-gray-300">
                <p class="text-sm">
                    Anonym #{{ review.authorId }}
                </p>
                <!-- Date -->
                <NuxtTime
                    :datetime="new Date(review.createdAt * 1000)"
                    year="numeric"
                    month="short"
                    day="numeric"
                    class="self-end font-semibold"
                ></NuxtTime>
            </span>
            <!-- Review text -->
            <p class="w-full mt-4 mb-6 text-base">
                {{ review.review }}
            </p>
            <!-- Rating previews -->
            <div class="grid grid-cols-2 grid-rows-5 grid-flow-col w-full gap-4 gap-x-12">
                <div
                    v-for="rating, category in review.ratings"
                    class="flex flex-row justify-between"
                >
                    <p class="text-left font-semibold">
                        {{ capitalize(category) }}
                    </p>
                    <RatingPreview
                        :rating="rating"
                        :key="rating"
                        class="w-[40%] h-6"
                    ></RatingPreview>   
                </div>
            </div>
            <!-- Footer -->
            <div class="flex flex-row justify-between mt-6">
                <div class="flex flex-row gap-4 items-center">
                    <p class="text-basic font-semibold">
                        Helpful?
                    </p>
                    <span class="flex flex-row items-center gap-1">
                        <Icon
                            :id="`thumb-up-${review.id}`"
                            name="mdi:thumb-up-outline"
                            :data-tooltip-target="`thumb-up-${review.id}-tooltip`" 
                            data-tooltip-placement="top"
                            class="text-2xl hover:text-green-400 cursor-pointer"
                        ></Icon>
                        <div 
                            :id="`thumb-up-${review.id}-tooltip`" 
                            role="tooltip" 
                            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                        >
                            Helpful
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <p>
                            {{ review.thumbsUp }}
                        </p>
                    </span>
                    <span class="flex flex-row items-center gap-1">
                        <Icon 
                            name="mdi:thumb-down-outline"
                            :data-tooltip-target="`thumb-down-${review.id}-tooltip`" 
                            data-tooltip-placement="top"
                            class="text-2xl hover:text-red-400 cursor-pointer"
                        ></Icon>
                        <div 
                            :id="`thumb-down-${review.id}-tooltip`" 
                            role="tooltip" 
                            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                        >
                            Not helpful
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <p>
                            {{ review.thumbsDown }}
                        </p>
                    </span>
                </div>
                <Icon 
                    name="mdi:flag-outline-variant"
                    :data-tooltip-target="`report-${review.id}-tooltip`" 
                    data-tooltip-placement="top"
                    class="text-3xl cursor-pointer"
                ></Icon>
                <div 
                    :id="`report-${review.id}-tooltip`" 
                    role="tooltip" 
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
                >
                    Report
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import {
    initTooltips 
} from 'flowbite'
import { displayedRatingColors } from "~/constants/colors";
import type { Review } from '~/types/review';
import RatingPreview from "../ratings/RatingPreview.vue";

const { review } = defineProps<{ review: Review }>();

onMounted(() => {
    useFlowbite(() => {
        initTooltips();
    });
})

</script>