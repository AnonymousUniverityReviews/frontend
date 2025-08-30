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
                    <NuxtLink
                        :to="{ name: 'school-id', params: { id: route.params.id } }"
                        class="text-xl font-semibold text-center hover:text-blue-600 transition"
                    >
                        {{ school.name }}
                    </NuxtLink>
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
            </div>
        </nav>
        <div class="flex flex-col w-full justify-center items-center px-4 md:px-0">
            <div
                v-for="(value, type, index) in review.ratings"
                    :key="type"
                    class="flex flex-col w-full md:w-[50%] my-4 p-6 gap-3 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-800"
                >
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {{ capitalize(type) }}
                </p>
                <RatingInput v-model="ratingValues[index]" />
            </div>

            <div class="flex flex-col w-full md:w-[50%] my-4 p-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800">
                <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Write a review
                </p>
                <textarea
                    v-model="review.review"
                    class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    rows="8"
                    maxlength="350"
                    placeholder="Type the text of your review here..."
                ></textarea>
                <p class="self-end text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ review.review.length }}/350
                </p>
            </div>

            <div class="flex flex-col w-full md:w-[50%] mt-0 my-4 p-6 items-center">
                <button
                    class="
                        px-12 py-2 rounded-full text-base font-medium text-gray-100 !bg-gray-600 dark:!bg-blue-900 
                        hover:not-disabled:!bg-gray-950 dark:hover:not-disabled:!bg-blue-950 
                        disabled:opacity-50 transition shadow-lg hover:shadow-xl"
                    :disabled="ratingValues.some(val => val === 0) || review.review.length === 0"
                    @click="submitReviewMessage"
                >
                    Submit Review
                </button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useSessionStore } from '#imports';
import { getSchoolById } from '~/services/searchService';
import { getReviewByAuthorID, submitReview } from '~/services/reviewService';
import type { School } from '~/types/ratings';
import type { ReviewMessage } from '~/types/review';
import RatingInput from '~/components/ratings/RatingInput.vue';
const session = useSessionStore();

const route = useRoute();

const schoolId = +(route.params.id!);

const school: School = (await getSchoolById(schoolId)).result as School;

const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 0
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
});

let fetchedReview = (await getReviewByAuthorID(session.userData.id, "school", schoolId)).review as ReviewMessage | undefined;

if (!fetchedReview) {
    fetchedReview = createDefaultReviewMessage(session.userData.id, "school", schoolId);
}

const review = ref<ReviewMessage>(fetchedReview!);

const ratingValues = ref(Object.values(review.value.ratings));

async function submitReviewMessage() {
    const ratingKeys = Object.keys(review.value.ratings) as (keyof typeof review.value.ratings)[];

    ratingKeys.forEach((key, index) => {
        // @ts-ignore
        review.value.ratings[key] = ratingValues.value[index];
    });

    await submitReview(review.value);

    navigateTo({ name: 'school-id', params: { id: route.params.id } });
}
</script>