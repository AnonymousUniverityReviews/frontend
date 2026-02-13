<template>
  <div class="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 flex flex-col">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <NuxtLink to="/" class="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          Studentus
        </NuxtLink>
        <p class="text-xs text-gray-500 mt-1 uppercase tracking-wide font-semibold">Admin Panel</p>
      </div>

      <nav class="flex-grow p-4 space-y-1">
        <NuxtLink
          to="/admin/requests"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg group transition-colors"
          active-class="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
          class-active="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
        >
          Request Processing
        </NuxtLink>

        <NuxtLink
          to="/admin/universities"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 group transition-colors"
          active-class="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
        >
          University Management
        </NuxtLink>

        <NuxtLink
          to="/admin/users"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 group transition-colors"
          active-class="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
        >
          User Management
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
             <!-- Placeholder for User Profile/Logout -->
             <div class="text-xs text-gray-500">Logged in as Admin</div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <!-- Top Header -->
        <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-8">
            <h1 class="text-lg font-semibold text-gray-800 dark:text-white">
                <!-- Dynamic Header Title could go here -->
                Administrator Dashboard
            </h1>
            
            <div class="flex items-center space-x-6">
                <NuxtLink to="/" class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Home</NuxtLink>
                 <NuxtLink to="/add-university" class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Add University</NuxtLink>
                 <NuxtLink to="/reviews" class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Leave Review</NuxtLink>
                 <NuxtLink to="/account" class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Account</NuxtLink>
            </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-8">
            <slot />
        </main>
    </div>
  </div>
</template>

<style scoped>
/* Add any specific layout styles here if needed */
</style>
