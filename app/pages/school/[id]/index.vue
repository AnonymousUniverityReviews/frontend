<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <NavBar class="h-16" />
        <!-- School basic info header -->
        <nav
            class="w-full border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 backdrop-blur sticky top-14 z-40"
            :class="[{ 'shadow-lg': scrolled }]"
            aria-label="School basic information"
        >
            <div class="flex flex-row w-full mx-auto px-4 py-3 justify-center items-center gap-2">
                <div class="flex flex-col px-3 py-3 justify-center items-center gap-1">
                    <p class="text-xl font-semibold text-center">
                        {{ school.name }}
                    </p>
                    <NuxtLink 
                        :href="googleMapsURL(school.address)" 
                        class="flex flex-row w-full items-center justify-center gap-x-1"
                    >
                        <p class="text-gray-500 dark:text-gray-300">
                            {{ school.address }}
                        </p>
                        <Icon 
                            name="mdi-light:map-marker"
                            class="text-lg text-gray-500 dark:text-gray-300"
                        ></Icon>
                    </NuxtLink>
                </div>

                <NuxtLink
                    v-if="session.authorized"
                    :to="{ name: 'school-id-rate', params: { id: route.params.id } }"
                    class="inline-flex items-center gap-x-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-100 !bg-gray-600 dark:!bg-blue-900 hover:!bg-gray-950 dark:hover:!bg-blue-950 transition"
                >
                    Rate
                    <Icon 
                        name="mdi-light:thumbs-up-down"
                        class="text-xl align-middle"
                    ></Icon>
                </NuxtLink>
                <div
                    v-else
                    class="inline-flex items-center gap-x-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-100 !bg-gray-600 dark:!bg-blue-900 hover:!bg-gray-950 dark:hover:!bg-blue-950 transition cursor-pointer"
                    @click="openLoginFrame"
                >
                    Rate
                    <Icon 
                        name="mdi-light:thumbs-up-down"
                        class="text-xl align-middle"
                    ></Icon>
                </div>

                <NuxtLink
                    href="#"
                    class="inline-flex items-center gap-x-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-100 !bg-gray-600 dark:!bg-blue-900 hover:!bg-gray-950 dark:hover:!bg-blue-950 transition"
                >
                    Compare
                    <Icon 
                        name="mdi-light:magnify"
                        class="text-xl align-middle"
                    ></Icon>
                </NuxtLink>
            </div>
        </nav>
        <!-- Ratings -->
        <div 
            id="ratings"
            class="flex flex-row w-full h-auto my-6 justify-center items-center"
        >
            <div class="flex flex-col w-auto h-30 pr-8 justify-center items-center border-r-1 gap-2">
                <p class="text-6xl font-bold">
                    {{ school.overallRating >= 1 ? school.overallRating?.toFixed(2) : "N/A" }}
                </p>
                <p class="text-gray-500 dark:text-gray-300">
                    Overall quality
                </p>
            </div>
            <div class="grid grid-cols-2 grid-rows-5 grid-flow-col w-auto pl-8 gap-4 gap-x-12">
                <div 
                    v-for="value, key, i in ratings"
                    class="flex flex-row w-50 justify-between m-auto items-center"
                >
                    <Icon 
                        :name="displayedRatingIcons[key]"
                        class="text-xl mr-1"
                    ></Icon>
                    <p class="text-left w-30">
                        {{ capitalize(key) }}
                    </p>
                    <p 
                        class="text-xl text-gray-900 text-center w-14 py-1 px-2 font-semibold"
                        :class="value >= 1 ? displayedRatingColors[Math.floor(value) - 1] : 'dark:text-gray-100'"
                    >
                        {{ value >= 1 ? value.toFixed(2) : "N/A"  }}
                    </p>
                </div>
            </div>
        </div>
        <!-- Reviews -->
        <div id="reviews" class="flex flex-col justify-center items-center gap-4 w-[80%] mx-auto mb-8">
            <p class="self-start text-left text-xl font-bold">
                {{ school.reviewsAmount }} reviews
            </p>
            <SchoolReview
                v-for="review in reviews"
                :key="review.id"
                :review="review"
            ></SchoolReview>
            <button 
                v-if="cursor >= 0 && reviews.length < school.reviewsAmount" 
                @click="getMoreReviews"
                class="px-4 py-2 w-auto !text-base rounded-full text-gray-100 bg-gray-700 cursor-pointer"
            >
                Load more
            </button>
        </div>   
    </div>
</template>

<script setup lang="ts">
import {
    initTooltips 
} from 'flowbite'
import { getSchoolById, getReviews } from '~/services/searchService';
import { useSessionStore } from '#imports';
import type { School } from '~/types/ratings';
import type { Review } from '~/types/review';
import { displayedRatingColors } from "~/constants/colors";
import { displayedRatingIcons } from '~/constants/icons';
import SchoolReview from '~/components/reviews/SchoolReview.vue';

const session = useSessionStore();

const { openLoginFrame } = inject('loginFrame');

const route = useRoute()

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 0
}

// initialize components based on data attribute selectors
onMounted(() => {
    useFlowbite(() => {
        initTooltips();
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on load
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
});

const id = +(route.params.id ?? 0);

const school: School = (await getSchoolById(id)).result as School;

const ratings: Record<string, number> = Object.entries(school.ratings!)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

let reviews = ref<Review[]>([]);
let cursor = ref(0);

async function getMoreReviews() {
    const reviewsResult = await getReviews("school", id, cursor.value);
    cursor.value = reviewsResult.cursor;
    for (const result of reviewsResult.result) {
        reviews.value.push(result);
    }
    console.log(reviews.value.length, cursor.value);
}

await getMoreReviews();
</script>