<template>
  <div class="flex flex-col" v-bind="$attrs">
    <div class="flex flex-row w-full h-full">
      <div
        v-for="i in inputSize"
        :key="i"
        class="w-[20%] h-full mx-[2px]"
        :class="[
          i === 1 ? 'rounded-l-full' : '',
          i === inputSize ? 'rounded-r-full' : '',
          getColor(i)
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { emptyRatingColor, ratingColorClasses } from "~/constants/colors";

const { rating = 0 } = defineProps<{
  rating?: number
}>();

const inputSize = 10;

function getColor(i: number): string {
    if (rating >= i) {
      return ratingColorClasses[inputSize][rating - 1] ?? emptyRatingColor;
    }
    return emptyRatingColor;
}
</script>
