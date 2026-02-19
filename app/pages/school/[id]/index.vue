<template>
    <div class="min-h-screen flex flex-col bg-white text-gray-900">
        <NavBar class="h-16" />
        
        <div class="max-w-4xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
            <!-- School Info Card -->
            <div class="bg-gray-50 rounded-2xl p-6 shadow-sm flex flex-row items-center justify-between">
                <div class="flex flex-row items-center gap-6">
                    <!-- Logo Placeholder -->
                    <div class="w-24 h-24 rounded-2xl bg-white border border-gray-100 p-2 flex items-center justify-center overflow-hidden shrink-0">
                        <img src="" alt="University Logo" class="object-contain w-full h-full" />
                    </div>
                    
                <div class="flex flex-col gap-1">
                        <!-- <span class="text-blue-500 text-xs font-bold uppercase tracking-wider">ТОП {{ school.rank }}/200</span> -->
                        <h1 class="text-xl font-bold text-gray-900 leading-tight">
                            {{ school.name }}
                        </h1>
                        <div class="flex flex-row items-center gap-1 text-sm font-normal text-gray-500">
                            <Icon 
                                name="mdi-light:map-marker"
                                class="text-lg text-gray-400"
                            ></Icon>
                            <NuxtLink 
                                :href="googleMapsURL(school.city || '')"
                            >
                                <p class="text-gray-500">
                                    {{ school.city || 'No city' }}
                                </p>
                            </NuxtLink>
                            <p class="text-gray-500">|</p>
                            <a :href="school.website || undefined" target="_blank" class="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                <Icon name="mdi:web" class="text-gray-400" />
                                <span>{{ school.website }}</span>
                            </a>
                        </div>
                        <!-- <button class="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full w-fit flex items-center gap-2 transition-colors">
                            Додати в обрані
                            <Icon name="mdi:heart-outline" />
                        </button> -->
                    </div>
                </div>

                <!-- Overall Rating Badge -->
                 <CircularRating 
                    :model-value="school.averageScore || 0" 
                    size="lg" 
                    :stroke="5"
                 />
            </div>

            <!-- Reviews Header -->
            <div class="text-lg text-gray-800 font-medium">
                {{ school.reviewCount }} студентів оцінили цей університет!
            </div>

            <!-- Reviews List -->
            <div class="flex flex-col gap-4">
                <SchoolReviewCard
                    v-for="review in displayedReviews"
                    :key="review.id"
                    :review="review"
                />
            </div>
            
             <!-- Infinite Scroll Trigger -->
            <div ref="sentinel" v-if="isExpanded" class="h-10 w-full flex items-center justify-center">
                <Icon v-if="loading" name="eos-icons:loading" class="text-2xl text-gray-400" />
            </div>
             
            <div v-if="!isExpanded && reviews.length > 5" class="flex justify-center mt-4">
                <button @click="expandReviews" class="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm font-medium transition">
                    Читати далі
                    <Icon name="mdi:chevron-down" />
                </button>
            </div>

        </div>

        <!-- Footer -->
        <footer class="mt-auto py-8 border-t border-gray-200 bg-gray-50">
             <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                        <div class="h-14 w-14 rounded-2xl bg-white border border-gray-200 grid place-items-center">
                            <span class="bg-gradient-to-br from-blue-600 to-indigo-500 bg-clip-text text-transparent text-3xl font-black select-none">S</span>
                        </div>
                        <span class="font-bold text-xl">Studentus</span>
                    </div>
                    <p class="text-xs text-gray-500 max-w-xs">
                        Studentus – єдиний в Україні сайт, який зібрав усі відгуки, важливі для студентів
                    </p>
                    <p class = "text-xs text-gray-500 max-w-xs">
                        © {{ new Date().getFullYear() }} Studentus. All rights reserved.
                    </p>
                </div>
                 <div class="text-sm text-gray-500 text-right">
                    <p class="font-semibold mb-1">Якщо у вас виникли будь-які запитання, напишіть нам:</p>
                    <a href="mailto:contact@studentus.com" class="font-medium hover:underline">contact@studentus.com</a>
                </div>
             </div>
        </footer>

    </div>
</template>

<script setup lang="ts">
import { getSchoolById, getReviews } from '~/services/searchService';
import type { Review, University } from '~/types';
import SchoolReviewCard from '~/components/reviews/SchoolReviewCard.vue';
import CircularRating from '~/components/CircularRating.vue';
import { useIntersectionObserver } from '@vueuse/core';

const route = useRoute();
const id = route.params.id as string;

const school = ref<University>({} as University);
const reviews = ref<Review[]>([]);
const cursor = ref<string | null>(null);
const loading = ref(false);
const hasMoreReviews = ref(true);
const sentinel = ref<HTMLElement | null>(null);

const isExpanded = ref(false);

const displayedReviews = computed(() => {
    if (isExpanded.value) return reviews.value;
    return reviews.value.slice(0, 5);
});

function expandReviews() {
    isExpanded.value = true;
}

try {
    const schoolData = await getSchoolById(id);
    school.value = schoolData.result as University; // result is University
} catch (e) {
    console.error("Failed to load school data", e);
}

// Infinite scroll logic
async function loadMoreReviews() {
    if (loading.value || !hasMoreReviews.value) return;
    
    loading.value = true;
    try {
        // await new Promise(r => setTimeout(r, 800)); // Remove artificial delay
        
        const reviewsResult = await getReviews("school", id, cursor.value);
        
        reviews.value.push(...reviewsResult.data);
        
        cursor.value = reviewsResult.nextCursor;
        hasMoreReviews.value = reviewsResult.hasNextPage;

    } catch (e) {
        console.error("Failed to load reviews", e);
    } finally {
        loading.value = false;
    }
}

await loadMoreReviews();

useHead({
    title: school.value.name
})
</script>
