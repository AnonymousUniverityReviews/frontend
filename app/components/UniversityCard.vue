<template>
  <div class="bg-gray-50 rounded-3xl p-6 shadow-sm border border-gray-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full flex flex-col items-start gap-4" @click="goToSchool">
    <div class="w-full flex justify-between items-start">
      <div class="flex gap-2">
        <span class="px-2.5 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded-full tracking-wide">
          ТОП {{ rank }}/200
        </span>
      </div>
      </div>

    <div class="flex flex-col sm:flex-row gap-5 items-start w-full">
      <div class="flex-shrink-0">
        <div class="w-20 h-20 rounded-full bg-white border border-gray-100 p-2 shadow-sm flex items-center justify-center overflow-hidden">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Knu_logo.svg/1200px-Knu_logo.svg.png" v-if="school.id === 1" alt="Logo" class="w-full h-full object-contain" />
             <Icon name="emojione:school" class="w-12 h-12" v-else />
        </div>
      </div>

      <div class="flex-grow min-w-0 flex flex-col gap-1">
        <h3 class="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {{ school.name }}
        </h3>
        
        <div class="flex items-center text-gray-500 text-sm mt-1 gap-3">
          <span class="flex items-center gap-1">
            <Icon name="ph:map-pin-fill" class="w-4 h-4 text-gray-400" />
            <span class="truncate max-w-[150px]">{{ school.address.split(',')[1] || 'Україна' }}</span>
          </span>
          <span class="w-1 h-1 rounded-full bg-gray-300"></span>
          <span class="flex items-center gap-1">
            <Icon name="ph:buildings" class="w-4 h-4 text-gray-400" />
            <span>Державний</span>
          </span>
        </div>

        <div class="mt-3 font-medium text-sm text-gray-900">
          {{ school.reviewsAmount || 0 }} відгуків
        </div>
      </div>

      <div class="flex-shrink-0 self-center sm:self-start ml-auto">
        <CircularRating 
          :modelValue="school.overallRating || 0" 
          size="lg" 
          :stroke="6"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { School } from '~/types';

const props = defineProps<{
  school: School;
  rank: number;
}>();

const router = useRouter();

function goToSchool() {
    router.push(`/school/${props.school.id}`);
}
</script>