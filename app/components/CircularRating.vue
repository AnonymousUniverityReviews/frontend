<template>
    <div class="relative flex items-center justify-center" :class="sizeClass">
        <svg class="transform -rotate-90 w-full h-full">

            <circle
                cx="50%"
                cy="50%"
                :r="radius"
                fill="transparent"
                class="stroke-gray-300"
                :stroke-width="strokeWidth"
            />

            <circle
                cx="50%"
                cy="50%"
                :r="radius"
                fill="transparent"
                :stroke="color"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="dashOffset"
                class="transition-all duration-500 ease-out"
            />
        </svg>
        <span 
            class="absolute font-bold text-gray-900"
            :class="textSizeClass"
        >
            {{ displayedValue }}
        </span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    stroke?: number;
}>();

const maxVal = props.max || 10;
const strokeWidth = props.stroke || 4;

// Size configurations
const sizeConfig = {
    sm: { sizeClass: 'w-10 h-10', textSizeClass: 'text-xs', radius: 16 },
    md: { sizeClass: 'w-12 h-12', textSizeClass: 'text-sm', radius: 18 },
    lg: { sizeClass: 'w-16 h-16', textSizeClass: 'text-lg', radius: 26 },
    xl: { sizeClass: 'w-24 h-24', textSizeClass: 'text-2xl', radius: 40 },
};

const currentSize = computed(() => sizeConfig[props.size || 'md']);
const sizeClass = computed(() => currentSize.value.sizeClass);
const textSizeClass = computed(() => currentSize.value.textSizeClass);
const radius = computed(() => currentSize.value.radius);

const circumference = computed(() => 2 * Math.PI * radius.value);
const dashOffset = computed(() => {
    const progress = props.modelValue / maxVal;
    return circumference.value * (1 - progress);
});

const color = computed(() => {
    if (props.modelValue >= 9) return '#22c55e'; // green-500
    if (props.modelValue >= 7) return '#84cc16'; // lime-500
    if (props.modelValue >= 5) return '#eab308'; // yellow-500
    if (props.modelValue >= 3) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
});

const displayedValue = computed(() => {
    return Number.isInteger(props.modelValue) ? props.modelValue : props.modelValue.toFixed(1);
});
</script>
