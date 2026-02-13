<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Users Stat -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-gray-500 text-sm font-medium">Total Users</h3>
        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">1,234</p>
      </div>
      
      <!-- Universities Stat -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-gray-500 text-sm font-medium">Universities</h3>
        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">42</p>
      </div>
      
      <!-- Pending Requests Stat -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-gray-500 text-sm font-medium">Pending Requests</h3>
        <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">7</p>
      </div>
    </div>
    
    <!-- Recent Activity / Welcome -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Welcome Back!</h3>
      <p class="text-gray-600 dark:text-gray-300">
        Use the sidebar to manage users, universities, and review requests.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
</script>
