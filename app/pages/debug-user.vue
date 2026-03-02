<template>
  <div class="max-w-4xl mx-auto p-8 mt-10">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Debug User Object</h1>
    <div v-if="loggedIn" class="bg-gray-50 border border-gray-200 rounded-lg p-6 overflow-x-auto shadow-sm">
      <pre class="text-sm text-gray-700 whitespace-pre-wrap">{{ JSON.stringify(user, null, 2) }}</pre>
    </div>
    <div v-else class="p-6 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
      You are not logged in.
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, loggedIn } = useOidcAuth();
</script>
