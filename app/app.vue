<template>
  <div>
    <NuxtPage />
  </div>
  <div
    v-if="loginFrameOpened"
    class="flex flex-col fixed w-full h-full inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm"
  >
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-[90%] max-w-3xl h-[90%] flex flex-col">
      <!-- Header -->
      <div class="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-500 p-4">
        <h2 class="text-white text-lg font-semibold">Login</h2>
        <button
          class="text-white text-3xl hover:text-gray-200 transition-colors"
          @click="closeLoginFrame(false)"
        >
          &times;
        </button>
      </div>
      <!-- Content -->
      <div class="flex-1 p-6 bg-gray-50 dark:bg-gray-700 overflow-auto">
        <LoginFrame />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '#imports';

const session = useSessionStore();

const loginFrameOpened = ref<boolean>(false);

function openLoginFrame() {
  loginFrameOpened.value = true;
}

async function closeLoginFrame(shouldCheckStatus: boolean = false) {
  loginFrameOpened.value = false;
  if (shouldCheckStatus) {
    await session.checkIfAuthorizedLocally();
  }
}

provide('loginFrame', {
  loginFrameOpened,
  openLoginFrame,
  closeLoginFrame
});

async function handleMessage(event: MessageEvent) {
  if (event.origin !== window.location.origin) return

  if (event.data?.action === 'close-login-frame') {
    await closeLoginFrame(true);
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})
</script>