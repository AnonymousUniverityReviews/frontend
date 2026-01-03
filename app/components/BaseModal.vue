<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="modelValue" 
        class="fixed inset-0 flex items-center justify-center z-[100]"
      >
        <div class="absolute inset-0 bg-black/50" @click="close"></div>

        <div 
          class="relative w-[92%] max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-6 transition-all transform"
          @click.stop
        >
          <div class="flex items-start justify-between gap-4 mb-3">
            <h2 v-if="title" class="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-8">
              {{ title }}
            </h2>

            <button
              type="button"
              @click="close"
              class="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close"
            >
            <!-- SVG close icon (X) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div class="text-sm text-gray-600 dark:text-gray-300">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
</script>