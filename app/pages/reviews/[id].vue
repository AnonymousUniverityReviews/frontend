<template>
  <div class="min-h-screen bg-white flex flex-col">
    <NavBar class="h-16" />
    <div class="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-grow">
      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Error/Not Found State -->
      <div v-else-if="error || !data?.exists || !data?.review" class="bg-white shadow rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Review Not Found</h2>
        <p class="text-gray-600 mb-6">The review you are looking for does not exist or has been removed.</p>
        <NuxtLink to="/" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
          Return to Home
        </NuxtLink>
      </div>

      <!-- Review Content -->
      <div v-else class="space-y-6">
        <!-- Back Navigation -->
        <!-- University Info Card -->
        <div v-if="data.review.university" class="bg-gray-50 rounded-2xl p-6 shadow-sm flex flex-row items-center justify-between">
            <div class="flex flex-row items-center gap-6">
                <!-- Logo Placeholder -->
                <div class="w-24 h-24 rounded-2xl bg-white border border-gray-100 p-2 flex items-center justify-center overflow-hidden shrink-0">
                    <img :src="data.review.university.iconUrl || ''" alt="University Logo" class="object-contain w-full h-full" />
                </div>
                
                <div class="flex flex-col gap-2">
                    <h1 class="text-xl font-bold text-gray-900 leading-tight">
                        {{ data.review.university.name }}
                    </h1>
                     <NuxtLink :to="`/school/${data.review.universityId}`" class="mt-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full w-fit flex items-center gap-2 transition-colors">
                        Більше відгуків
                    </NuxtLink>
                </div>
            </div>

                <CircularRating 
                :model-value="data.review.university.averageScore || 0" 
                size="lg" 
                :stroke="5"
                />
        </div>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
           <SchoolReviewCard :review="data.review" :expanded="true" class="border-0 shadow-none" />
           
        </div>
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
import { useRoute } from 'vue-router';
import { getReviewByID } from '~/services/reviewService';
import SchoolReviewCard from '~/components/reviews/SchoolReviewCard.vue';
import CircularRating from '~/components/CircularRating.vue';

import { getSchoolById } from '~/services/searchService';

const route = useRoute();
const reviewId = route.params.id as string;

const { data, pending, error } = await useAsyncData(`review-${reviewId}`, async () => {
    const response = await getReviewByID(reviewId);
    
    if (response.exists && response.review && !response.review.university && response.review.universityId) {
        try {
            const schoolData = await getSchoolById(response.review.universityId);
            response.review.university = schoolData.result;
        } catch (e) {
            console.error("Failed to fetch university for review", e);
        }
    }
    
    return response;
});

useHead({
  title: data.value?.exists ? `Відгук про ${data.value.review?.university?.name || 'University'}` : 'Відгук не знайдено',
});
</script>
