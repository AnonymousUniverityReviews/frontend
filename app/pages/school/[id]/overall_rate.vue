<template>
    <div class="min-h-screen flex flex-col bg-white text-gray-800 transition-colors duration-200">
        <NavBar class="h-16 transition-colors duration-200" />

        <main class="grow flex flex-col items-center pt-16 px-4 pb-16">
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

                <!-- Overall Rating -->
                <div class="flex flex-col gap-3">
                    <p class="font-semibold text-gray-700">Дайте загальну оцінку</p>
                    <div class="grid grid-cols-5 sm:grid-cols-10 gap-2">
                        <button 
                            v-for="i in 10" 
                            :key="i"
                            @click="rating = i"
                            class="w-14 h-12 rounded-2xl flex items-center justify-center text-sm font-medium transition-all"
                            :class="[
                                rating === i 
                                    ? ratingColorClasses['10'][i - 1] + ' text-white shadow-md transform scale-125' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:brightness-95'
                            ]"
                        >
                            {{ i }}
                        </button>
                    </div>
                </div>

                <!-- Review Text -->
                <div class="flex flex-col gap-3">
                    <p class="font-semibold text-gray-700">Поділіться своїм досвідом</p>
                    <div class="relative">
                        <textarea 
                            v-model="reviewText"
                            rows="6"
                            id="comment"
                            maxlength="1000"
                            :class="['w-full p-4 text-base rounded-2xl resize-none focus:outline-none shadow-sm transition-colors duration-200', formColors.inputBg, formColors.inputBorderDefault, formColors.ringDefault]"
                            placeholder="Ваш відгук"
                        ></textarea>
                        <p :class="['ml-2 text-xs font-semibold transition-colors duration-200',
                            isReviewLimitReached ? 'text-yellow-600' : 'text-gray-500',
                            ]">
                            {{ reviewText.length }}/{{ REVIEW_MAX }}
                        </p>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-6 pr-15 pl-15">
                    <button 
                        @click="handleCancel"
                        class="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition shadow-sm"
                    >
                        Скасувати
                    </button>
                    <button 
                        @click="handleSubmit"
                        :disabled="!isFormValid || isSubmitting"
                        class="flex-1 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                    >
                         {{ isSubmitting ? 'Надсилання...' : 'Надіслати' }}
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
            @update:model-value="(val) => !val && handleModalClose()"
        >
            <p class="text-gray-600">
                Ваш відгук успішно надіслано. Ви можете закрити це вікно.
            </p>
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { getSchoolById } from '~/services/searchService';
import { submitReview } from '~/services/reviewService';
import { useRoute, useSessionStore } from '#imports';
import type { School, ReviewMessage } from '~/types';
import { formColors, ratingColorClasses } from "~/constants/colors";

const session = useSessionStore();
const router = useRouter();

// State
const selectedCategory = ref<'university' | null>(null);
const rating = ref<number | null>(null);
const reviewText = ref('');
const isSubmitting = ref(false);
const showSuccessModal = ref(false);

const REVIEW_MAX = 1000
const isReviewLimitReached = computed(() => {
  return reviewText.value.length >= REVIEW_MAX
})

const route = useRoute();
const schoolId = +(route.params.id!);
const school: School = (await getSchoolById(schoolId)).result as School;
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 0
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

// Form Validation
const isFormValid = computed(() => {
    return selectedCategory.value !== null &&
           rating.value !== null && 
           reviewText.value.trim().length > 0;
});

// Actions
const handleCancel = () => {
    router.back();
};

const handleSubmit = async () => {
    if (!isFormValid.value || !rating.value) return;

    try {
        isSubmitting.value = true;

        // Construct payload
        const payload: ReviewMessage = {
            authorId: session.userData?.id || 1, // Fallback if no user
            review: reviewText.value,
            overallRating: rating.value,
            for: {
                type: 'school',
                id: schoolId
            }
        };

        const result = await submitReview(payload);
        
        if (result.success) {
            showSuccessModal.value = true;
        } else {
            alert('Failed to submit review');
        }
    } catch (error) {
        alert('An error occurred');
    } finally {
        isSubmitting.value = false;
    }
};

const handleModalClose = () => {
    router.back();
};


useHead({
    title: `Залишити відгук - ${school.name} | Studentus`
});
</script>