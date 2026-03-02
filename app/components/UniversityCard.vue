<template>
  <div class="bg-gray-50 rounded-2xl p-6 shadow-sm flex flex-row items-center justify-between hover:shadow-md transition-all duration-200 cursor-pointer group h-full" @click="goToSchool">
    <div class="flex flex-row items-center gap-6">
      <!-- Logo Placeholder (Using iconUrl if available, else placeholder) -->
      <div class="w-24 h-24 rounded-2xl bg-white border border-gray-100 p-2 flex items-center justify-center overflow-hidden shrink-0">
          <img v-if="school.iconUrl" :src="school.iconUrl" alt="University Logo" class="object-contain w-full h-full" @error="school.iconUrl = null" />
          <div v-else class="text-3xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 bg-clip-text text-transparent select-none uppercase">
              {{ school.name ? school.name.split(' ').slice(0, 2).map(w => w[0]).join('') : 'U' }}
          </div>
      </div>
      
      <div class="flex flex-col gap-1">
          <!-- <span class="text-blue-500 text-xs text-left font-bold uppercase tracking-wider">ТОП {{ rank }}/200</span> -->
          <h1 class="text-xl font-bold text-left text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
              {{ school.name }}
          </h1>
          <div class="flex flex-row items-center gap-1 text-sm font-normal text-gray-500">
              <Icon 
                  name="mdi-light:map-marker"
                  class="text-lg text-gray-400"
              ></Icon>
              <a 
                  :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.city || '')}`"
                  target="_blank"
                  @click.stop
                  class="text-gray-500 hover:text-blue-500 transition-colors truncate max-w-[250px]"
              >
                      {{ school.city || 'No city' }}
              </a>
              <p class="text-gray-500 mx-1">|</p>
              <a :href="school.website || '#'" target="_blank" @click.stop class="flex items-center gap-1 hover:text-blue-500 transition-colors" v-if="school.website">
                  <Icon name="mdi:web" class="text-gray-400 mt-1" />
                  <span class="truncate max-w-[200px]">{{ school.website.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</span>
              </a>
          </div>
          <div class="text-lg font-semibold text-left text-gray-600">
                {{ school.reviewCount }} відгуків
            </div>
      </div>
    </div>

    <!-- Overall Rating Badge -->
     <div class="flex-shrink-0">
       <CircularRating 
          :modelValue="school.averageScore || 0" 
          size="lg" 
          :stroke="5"
       />
     </div>
  </div>
</template>

<script setup lang="ts">
import type { University } from '~/types';

const props = defineProps<{
  school: University;
  rank: number;
}>();

const router = useRouter();

function goToSchool() {
    router.push(`/school/${props.school.id}`);
}
</script>