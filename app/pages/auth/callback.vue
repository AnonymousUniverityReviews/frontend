<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="text-center">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">Authenticating...</h2>
      <p class="text-gray-600 truncate max-w-sm mx-auto">Please wait while we log you in. Redirecting...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useNuxtApp } from '#app'
import type { UserManager } from 'oidc-client-ts'

const nuxtApp = useNuxtApp()
const router = useRouter()

onMounted(async () => {
  const oidc = nuxtApp.$oidc as UserManager | undefined
  if (oidc) {
    try {
      await oidc.signinRedirectCallback()
      // Go back to the main page after successful login
      router.push('/')
    } catch (e) {
      console.error('Error during OIDC callback:', e)
      router.push('/?error=auth')
    }
  } else {
    router.push('/')
  }
})
</script>
