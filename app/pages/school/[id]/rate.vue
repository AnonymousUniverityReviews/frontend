<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <NavBar class="h-16" />
        <div class="flex flex-col w-full justify-center items-center">
            <div
                v-for="value, type, index in review.ratings"
                :key="type"
                class="flex flex-col w-[50%] my-4 border-1 p-4 gap-4"
            >
                <p>
                    {{ capitalize(type) }}
                </p>
                <RatingInput
                    v-model="ratingValues[index]"
                >

                </RatingInput>
            </div>
            <div
                class="flex flex-col w-[50%] h-auto my-4 border-1 p-4"
            >
                <p class="mb-4">
                    Write a review
                </p>
                <textarea
                    v-model="review.review"
                    class="w-full text-gray-900"
                    rows="8"
                    maxlength="350"
                    placeholder="Type text of your review here..."
                >

                </textarea>
                <p class="self-end">
                    {{ review.review.length }}/350
                </p>
            </div>
            <div
                class="flex flex-col w-[50%] h-auto my-4 border-1 p-4 items-center"
            >
                <button
                    class="
                        px-12 py-2 rounded-full text-base font-medium text-gray-100 !bg-gray-600 dark:!bg-blue-900 
                        hover:not-disabled:!bg-gray-950 dark:hover:not-disabled:!bg-blue-950 
                        disabled:opacity-50 transition"
                    :disabled="ratingValues.some(val => val === 0) || review.review.length === 0"
                    @click="submitReviewMessage"
                >
                    Submit review
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '#imports';
import { getReviewByAuthorID, submitReview } from '~/services/reviewService';
import type { ReviewMessage, Review } from '~/types';
import RatingInput from '~/components/ratings/RatingInput.vue';
const session = useSessionStore();

const route = useRoute();

const schoolId = +(route.params.id!);

let fetchedReview = (await getReviewByAuthorID(session.userData.id, "school", schoolId)).review as ReviewMessage | undefined;

if (!fetchedReview) {
    fetchedReview = createDefaultReviewMessage(session.userData.id, "school", schoolId);
}

const review = ref<ReviewMessage>(fetchedReview!);

const ratingValues = ref(Object.values(review.value.ratings));

console.log(ratingValues);

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