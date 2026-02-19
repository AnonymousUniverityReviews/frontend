<template>
    <div class="min-h-screen flex flex-col bg-white text-gray-900">
        <NavBar class="h-16" />
        <!-- School basic info header
        <nav
            class="w-full border-b border-gray-200 bg-white/70 text-gray-900 backdrop-blur sticky top-14 z-40"
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
                        <p class="text-gray-500">
                            {{ school.address }}
                        </p>
                        <Icon 
                            name="mdi-light:map-marker"
                            class="text-lg text-gray-500"
                        ></Icon>
                    </NuxtLink>
                </div>
            </div>
        </nav> -->

        <!-- Review Form -->
        <main class="grow flex flex-col justify-center items-center pt-14 px-4 pb-14">
            <h1 class="text-2xl font-semibold text-center mb-6">Залиште свій відгук</h1>

            <div class="w-full max-w-2xl space-y-8">


                <!-- Category Selection -->
                <div class="flex flex-col gap-3">
                    <p class="font-semibold text-gray-700">Я хочу оцінити</p>
                    <div class="flex gap-4">
                        <button 
                            @click="selectedCategory = selectedCategory === 'university' ? null : 'university'"
                            :class="['flex-1 py-3 px-4 rounded-2xl border text-sm font-medium transition-colors shadow-sm focus:ring-2 focus:ring-blue-500', 
                                selectedCategory === 'university' 
                                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                            ]"
                        >
                            Університет
                        </button>
                        <button 
                            disabled
                            class="flex-1 py-3 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed text-sm font-medium shadow-sm"
                        >
                            Гуртожиток
                        </button>
                        <button 
                            disabled
                            class="flex-1 py-3 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed text-sm font-medium shadow-sm"
                        >
                            Інше
                        </button>
                    </div>
                </div>


                <!-- Category Name -->
                <div class="flex flex-col gap-3">
                    <p class="font-semibold text-gray-700">Введіть назву</p>
                    <div class="w-full py-3 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-500 text-sm font-medium shadow-sm flex justify-between items-center cursor-not-allowed">
                        <span>{{ school.name }}</span>
                        <Icon name="mdi:chevron-down" class="text-xl text-gray-400" />
                    </div>
                </div>

                
                <div class="flex flex-col w-full justify-center items-center md:px-0">
                    <!-- Ratings -->
                    <div
                        v-if="selectedCategory === 'university'"
                        class="flex flex-col w-full my-4 p-6 gap-3"
                    >
                        <p class="text-lg font-semibold text-gray-700">
                            <!-- {{ capitalize(type) }} -->
                            Загальна оцінка
                        </p>
                        <RatingInput v-model="ratingValues[0]" />
                    </div>
                </div>

                <!-- Review Text -->
                <div class="flex flex-col w-full my-4">
                    <p class="mb-2 font-semibold text-gray-700">
                        Поділіться своїм досвідом
                    </p>
                    <textarea
                        v-model="review.review"
                        :class="['w-full p-4 text-base rounded-2xl resize-none focus:outline-none shadow-sm transition-colors duration-200', formColors.inputBg, formColors.inputBorderDefault, formColors.ringDefault]"
                        rows="8"
                        maxlength="1000"
                        placeholder="Ваш відгук..."
                    ></textarea>
                    <p 
                        class="self-end mt-1 text-xs font-semibold transition-colors duration-200"
                        :class="review.review.length === 1000 ? 'text-yellow-600' : 'text-gray-500'"
                    >
                        {{ review.review.length }}/1000
                    </p>
                </div>

                <!-- Submit Button -->
                <div class="flex flex-col mt-0 my-4 p-6 items-center">
                    <button
                        class="
                            px-12 py-2 rounded-2xl text-base font-medium text-gray-50 bg-blue-600! 
                             hover:not-disabled:bg-blue-700! 
                            disabled:opacity-50 transition shadow-lg shadow-blue-500/30"
                        :disabled="ratingValues[0] === 0 || review.review.length === 0"
                        @click="submitReviewMessage"
                    >
                        Надіслати
                    </button>
                </div>
            </div>
        </main>

        <!-- FOOTER -->
        <footer class="py-8 text-center text-xs text-gray-500">
            <p>
                © {{ new Date().getFullYear() }} Studentus. All rights reserved.
            </p>
        </footer>

        <!-- Success Modal -->
        <BaseModal 
            v-model="showSuccessModal" 
            title="Дякуємо за ваш відгук"
            @update:model-value="(val) => !val && handleCancel()"
        >
            <p class="text-gray-600">
                Ваш відгук успішно надіслано. Ви можете закрити це вікно.
            </p>
        </BaseModal>
    </div>
</template>


<script setup lang="ts">
/* definePageMeta({
    middleware: 'auth'
}); */


import { getSchoolById } from '~/services/searchService';
import { getReviewByAuthorID, submitReview } from '~/services/reviewService';
import type { ReviewMessage, School } from '~/types';
import { formColors } from "~/constants/colors";
import RatingInput from '~/components/ratings/RatingInput.vue';

const { user } = useOidcAuth();
const route = useRoute();
const router = useRouter();
const schoolId = +(route.params.id!);
const school: School = (await getSchoolById(schoolId)).result as School;
const scrolled = ref(false);
const showSuccessModal = ref(false);
const selectedCategory = ref<'university' | null>(null);

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

const userId = computed(() => {
    return user.value?.userInfo?.sub ? parseInt(user.value.userInfo.sub as string) : 0;
});

let fetchedReview = (await getReviewByAuthorID(userId.value, "school", schoolId)).review as ReviewMessage | undefined;

if (!fetchedReview) {
    fetchedReview = createDefaultReviewMessage(userId.value, "school", schoolId);
}

const review = ref<ReviewMessage>(fetchedReview!);

const ratingValues = ref<number[]>(Object.values(review.value.ratings));

async function submitReviewMessage() {



    review.value.ratings.overallRating = ratingValues.value[0] ?? 0;
    console.log("Final review object to submit:", review.value);

    await submitReview(review.value);
    showSuccessModal.value = true;
    //navigateTo({ name: 'school-id', params: { id: route.params.id } });
}

const handleCancel = () => {
    router.back();
};

useHead({
    title: `Залишити відгук - ${school.name} | Studentus`
});
</script>