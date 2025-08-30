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
                        {{ professor.name }}
                    </p>
                    <div
                        class="flex flex-row w-full items-center justify-center gap-x-1"
                    >
                        <p class="text-gray-500 dark:text-gray-300">
                            {{ formatProfessorWorkplace(professor) }}
                        </p>
                    </div>
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
                <div class="flex flex-col w-auto h-30 pr-8 justify-center items-center gap-2">
                    <p class="text-6xl font-bold">
                        {{ professor.overallQuality >= 1 ? professor.overallQuality?.toFixed(2) : "N/A" }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-300">
                        Overall quality
                    </p>
                </div>
                <div
                    class="flex flex-row w-full justify-center items-center"
                >
                    <div class="flex flex-col w-auto h-30 pr-8 justify-center items-center gap-2">
                        <p class="text-4xl font-bold">
                            {{ professor.overallDifficulty >= 1 ? professor.overallDifficulty?.toFixed(2) : "N/A" }}
                        </p>
                        <p class="text-gray-500 dark:text-gray-300 text-center">
                            Overall difficulty
                        </p>
                    </div>
                    <div class="flex flex-col w-[20%] h-30 pr-8 justify-center items-center gap-2">
                        <p class="text-4xl font-bold">
                            {{ professor.wouldTakeAgainPercent }}%
                        </p>
                        <p class="text-gray-500 dark:text-gray-300 text-center">
                            Would take again
                        </p>
                    </div>
                    <div class="flex flex-col w-[20%] h-30 pr-8 justify-center items-center gap-2">
                        <p class="text-4xl font-bold">
                            {{ professor.forCreditPercent }}%
                        </p>
                        <p class="text-gray-500 dark:text-gray-300 text-center">
                            For credit
                        </p>
                    </div>
                    <div class="flex flex-col w-[20%] h-30 pr-8 justify-center items-center gap-2">
                        <p class="text-4xl font-bold">
                            {{ professor.textbooksPercent }}%
                        </p>
                        <p class="text-gray-500 dark:text-gray-300 text-center">
                            Textbooks
                        </p>
                    </div>
                    <div class="flex flex-col w-[20%] h-30 pr-8 justify-center items-center gap-2">
                        <p class="text-4xl font-bold">
                            {{ professor.attendanceMandatoryPercent }}%
                        </p>
                        <p class="text-gray-500 dark:text-gray-300 text-center">
                            Attendance mandatory
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col-reverse grid-flow-col w-[30%] pl-8 p-4 gap-4 bg-gray-200 dark:bg-gray-700 ml-8">
                <div 
                    v-for="value, index in professor.qualityDistribution"
                    class="flex flex-row w-full justify-between m-auto items-center"
                >
                    <p class="text-left w-10">
                        {{ index + 1 }}
                    </p>
                    <div
                        class="flex justify-start items-start w-full h-8 bg-gray-300"
                    >
                        <div
                            class="h-8 bg-blue-600 z-50"
                            :style="{ width: value / Math.max(...professor.qualityDistribution!) * 100 + '%' }"
                        >
                        </div>
                    </div>
                    <p 
                        class="text-xl text-gray-900 dark:text-gray-100 text-center w-14 py-1 px-2 font-semibold"
                    >
                        {{ value  }}
                    </p>
                </div>
                <p>
                    Quality rating distribution
                </p>
            </div>
        </div>
        <!-- Tags -->
        <div
            class="flex flex-col w-full justify-center items-center"
        >
            <p
                class="text-base font-semibold text-center"
            >
                Top tags:
            </p>
            <div
                class="flex flex-row w-[60%] items-center justify-around gap-8"
            >
                <div
                    v-for="tag in professor.topTags"
                    class="flex justify-center items-center px-3 h-8 bg-gray-300 dark:bg-gray-500 rounded-full"
                >
                    <p>
                        {{ tag }}
                    </p>
                </div>
            </div>
        </div>
        <!-- Reviews -->
        <div id="reviews" class="flex flex-col justify-center items-center gap-4 w-[80%] mx-auto mb-8">
            <p class="self-start text-left text-xl font-bold">
                {{ professor.reviewsAmount }} reviews
            </p>
            <ProfessorReview
                v-for="review in reviews"
                :key="review.id"
                :review="review"
            ></ProfessorReview>
            <button 
                v-if="cursor >= 0 && reviews.length < professor.reviewsAmount" 
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
import { getProfessorById, getReviews } from '~/services/searchService';
import { useSessionStore } from '#imports';
import type { Professor, ProfessorSubject } from '~/types/ratings';
import type { Review } from '~/types/review';
import ProfessorReview from '~/components/reviews/ProfessorReview.vue';

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

const professor = (await getProfessorById(id)).result as Professor | ProfessorSubject;

let reviews = ref<Review[]>([]);
let cursor = ref(0);

async function getMoreReviews() {
    const reviewsResult = await getReviews("professor", id, cursor.value);
    cursor.value = reviewsResult.cursor;
    for (const result of reviewsResult.result) {
        reviews.value.push(result);
    }
    console.log(reviews.value.length, cursor.value);
}

await getMoreReviews();
</script>