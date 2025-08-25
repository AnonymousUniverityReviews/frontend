<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div class="content-wrapper">
            <div class="top-background"></div>
            <template v-if="searchType == 'professor'">
                <a-space direction="vertical" size="small" :align="`center`">
                    <a-input-search v-if="count < 5" :style="{width:'320px'}" placeholder="Professor name">
                        <template #prefix>
                            <Icon name="mdi-light:account" />
                        </template>
                    </a-input-search>
                    <a-input-search v-else :style="{width:'320px'}" placeholder="Professor name" loading/>
                    <a-link :hoverable="false" @click="toggleSearchType">I would like to search for a school</a-link>
                </a-space>
            </template>
            <template v-else>
                <a-space direction="vertical" size="small" :align="`center`">
                    <a-input-search v-if="count < 5" :style="{width:'320px'}" placeholder="School name">
                        <template #prefix>
                            <Icon name="mynaui:academic-hat" />
                        </template>
                    </a-input-search>
                    <a-input-search v-else :style="{width:'320px'}" placeholder="School name" loading/>
                    <a-link :hoverable="false" @click="toggleSearchType">I would like to search for a professor</a-link>
                </a-space>
            </template>
        </div>
        
        <div class="w-120">
            <RatingInput v-model="rating"></RatingInput>
            <RatingPreview 
                :rating="rating" 
                :key="rating"
                class="h-8 w-full"
            ></RatingPreview>
        </div>

        <div>
            <!-- This page correctly has only one single root element -->
            Page content {{ formatID("18") }}
            {{ count }}
        </div>
        
        <a-space>
            <a-button type="primary" @click="increment">Increment</a-button>
            <a-button>Secondary</a-button>
            <a-button type="dashed">Dashed</a-button>
            <a-button type="outline">Outline</a-button>
            <a-button type="text">Text</a-button>
        </a-space>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import RatingInput from "~/components/ratings/RatingInput.vue";
import RatingPreview from "~/components/ratings/RatingPreview.vue";

const count = ref(0);

const searchType = ref("professor");

function increment() {
    count.value++;
}

function toggleSearchType() {
    if (searchType.value == "professor") {
        searchType.value = "school";
    }
    else {
        searchType.value = "professor";
    }
}

onMounted(() => {
    console.log(`The initial count is ${count.value}.`);
})

const rating = ref<number>(0);
</script>

<style lang="css" scoped>
.content-wrapper {
    position: relative;
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.top-background {
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background-color: thistle;
    z-index: -1;
}
</style>