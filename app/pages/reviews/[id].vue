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
        <div class="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <button @click="$router.back()" class="flex items-center gap-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                Назад
            </button>
        </div>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
           <SchoolReviewCard :review="data.review" :expanded="true" class="border-0 shadow-none" />
           
           <!-- Additional details if needed that aren't in the card -->
           <div v-if="data.review.university" class="px-6 py-4 border-t border-gray-100 bg-gray-50">
               <p class="text-sm text-gray-500">
                   Posted for <NuxtLink :to="`/school/${data.review.universityId}`" class="font-medium text-indigo-600 hover:text-indigo-500">{{ data.review.university.name }}</NuxtLink>
               </p>
           </div>
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

const route = useRoute();
const reviewId = route.params.id as string;

const { data, pending, error } = await useAsyncData(`review-${reviewId}`, () => getReviewByID(reviewId));

// Set page meta
useHead({
  title: data.value?.exists ? `Відгук про ${data.value.review?.university?.name || 'University'}` : 'Відгук не знайдено',
});
</script>
