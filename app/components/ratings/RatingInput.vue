<template>
  <div class="flex flex-col w-full h-auto">
    <div class="flex flex-row w-full gap-3 h-12">
      <button
        v-for="(rating, i) in ratingTexts[inputSize]"
        :key="i"
        :class="['w-[20%] h-full rounded-2xl cursor-pointer flex items-center justify-center text-sm font-medium transition-all',
          getColor(i)
            ? getColor(i) + ' text-white shadow-md transform scale-115' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:brightness-95'
        ]"
        @mouseenter="() => updateRatingText(i)"
        @mouseleave="() => updateRatingText(-1)"
        @click="selectRating(i)"
      >{{ i + 1 }}</button>
    </div>
    <div class="flex flex-row content-center justify-between w-full mt-2 h-6">
      <p v-if="selectedId < 0 && hoveredId < 0" class="w-[20%] text-left">
        {{ ratingTexts[inputSize][0] }}
      </p>

      <p 
        class="w-full text-center h-4"
        :class="[
          selectedId === hoveredId && selectedId >= 0 ? 'font-semibold' : ''
        ]"
      >
        {{ ratingText }}
      </p>

      

      <p v-if="selectedId < 0 && hoveredId < 0" class="w-[20%] text-right">
        {{ ratingTexts[inputSize][inputSize - 1] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { hoverRatingColors, ratingColorClasses } from "~/constants/colors";
import { ratingTexts } from "~/constants/ratings";

// v-model support
const model = defineModel<number>({ default: 0 });

const inputSize = 10;

const ratingText = ref<string>("");
const selectedId = ref<number>(-1);
const hoveredId = ref<number>(-1);

watch(
    () => model.value,
    (newVal) => {
        selectedId.value = newVal - 1;
    }
);

function updateRatingText(id: number) {
    if (id === -1) {
        ratingText.value = selectedId.value >= 0 ? (ratingTexts[inputSize][selectedId.value] ?? '') : '';
    } else {
        ratingText.value = ratingTexts[inputSize][id] ?? '';
    }
    hoveredId.value = id;
}

function selectRating(id: number) {
  if (selectedId.value === id) {
    selectedId.value = -1;
    model.value = 0;
  }
  else {
    selectedId.value = id;
    model.value = id + 1;
  }
  updateRatingText(-1);
}

function getColor(i: number): string {
    if (hoveredId.value >= i) {
      return hoverRatingColors[inputSize][i] ?? '';
    }
    if (hoveredId.value >= 0) {
      return '';
    }
    if (selectedId.value >= i) {
      return ratingColorClasses[inputSize][i] ?? '';
    }
    return "";
}

function init() {
  selectedId.value = model.value - 1;
  updateRatingText(selectedId.value);
  hoveredId.value = -1;
}

init();
</script>
