<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">User Management</h2>
      
      <!-- Filter Bar -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <!-- Search Input -->
        <div class="md:col-span-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search User</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="mdi:magnify" class="h-5 w-5 text-gray-400" />
                </div>
                <input 
                    v-model="filters.QueryString"
                    type="text" 
                    placeholder="Search query..." 
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
            </div>
        </div>

        <!-- Filter Property -->
        <div class="md:col-span-3">
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter By</label>
             <select 
                v-model="selectedFilterType"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                <option value="">None</option>
                <option value="Email">Email</option>
                <option value="UniversityName">University Name</option>
                <option value="UserId">User ID</option>
            </select>
        </div>

        <!-- Filter Value -->
        <div class="md:col-span-3">
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Value</label>
             <input 
                v-model="filterValue"
                :disabled="!selectedFilterType"
                type="text" 
                placeholder="Enter value..." 
                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
            >
        </div>

        <!-- Actions -->
        <div class="md:col-span-2 flex space-x-2">
            <button 
                @click="applyFilters"
                class="flex-1 bg-blue-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Execute
            </button>
             <button 
                @click="resetFilters"
                class="flex-shrink-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                title="Reset Filters"
            >
                <Icon name="mdi:refresh" class="h-5 w-5" />
            </button>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Results Summary & Pagination Helper -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
            <span class="text-sm text-gray-700 dark:text-gray-300">
                Showing <span class="font-medium">{{ (pageIndex * pageSize) + 1 }}</span> to <span class="font-medium">{{ Math.min((pageIndex + 1) * pageSize, totalCount) }}</span> of <span class="font-medium">{{ totalCount }}</span> results
            </span>
            <div class="flex items-center space-x-2">
                 <label class="text-sm text-gray-600 dark:text-gray-400">Page Size:</label>
                 <select v-model="pageSize" @change="applyFilters" class="text-sm border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white">
                     <option :value="10">10</option>
                     <option :value="20">20</option>
                     <option :value="50">50</option>
                 </select>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-10">
                            <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            User ID
                        </th>
                         <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Uni ID
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            University
                        </th>
                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-if="loading" class="animate-pulse">
                         <td colspan="5" class="px-6 py-4 text-center text-gray-500">Loading data...</td>
                    </tr>
                    <tr v-else-if="users.length === 0">
                        <td colspan="5" class="px-6 py-4 text-center text-gray-500">No users found.</td>
                    </tr>
                    <tr v-for="user in users" :key="user.userId" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white font-mono text-xs">
                            {{ user.userId }}
                        </td>
                         <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono text-xs">
                            {{ user.universityId || '-' }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {{ user.universityName || '-' }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                             <button @click="openModal(user.userId)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">View</button>
                             <button @click="openModal(user.userId)" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded">Edit</button>
                             <button @click="openModal(user.userId)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 border border-red-200 dark:border-red-800 px-2 py-0.5 rounded">Ban</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
         <div v-if="totalPages > 1" class="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                        @click="changePage(pageIndex - 1)" 
                        :disabled="!hasPreviousPage"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                        <span class="sr-only">Previous</span>
                        <Icon name="mdi:chevron-left" class="h-5 w-5" />
                    </button>
                    <!-- Simple pagination numbers - simplified for now -->
                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Page {{ pageIndex + 1 }} of {{ totalPages }}
                    </span>
                    <button 
                        @click="changePage(pageIndex + 1)" 
                        :disabled="!hasNextPage"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                        <span class="sr-only">Next</span>
                         <Icon name="mdi:chevron-right" class="h-5 w-5" />
                    </button>
                </nav>
            </div>
         </div>
    </div>

    <AdminUserEditModal 
      v-if="showModal" 
      :user-id="selectedUserId" 
      @close="showModal = false" 
      @refresh="loadUsers"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed, watch } from 'vue'
import { type UserPreview, type PaginatedListOfUserPreview, useUsers } from '~/services/userService'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'] // Ensure auth and role check
})

// Pagination & Filters
const pageIndex = ref(0)
const pageSize = ref(10)
const filters = reactive({
    QueryString: '',
    UserId: '',
    UniversityId: '',
    UniversityName: '',
    Email: ''
})

const selectedFilterType = ref('')
const filterValue = ref('')

const showModal = ref(false)
const selectedUserId = ref<string | null>(null)

// --- Data Fetching with SSR Support ---

// Construct query params dynamically
const queryParams = computed(() => {
    const params: any = {
        PageNumber: pageIndex.value + 1,
        PageSize: pageSize.value,
        ...filters
    }
    return params
})

// Use the new composable from userService
const { data: response, pending: loading, refresh, error } = await useUsers(queryParams, {
    watch: false // Disable auto-refetch to keep "Execute" button behavior
})

// Debug: Log the raw response if needed
// watchEffect(() => {
//    if (response.value) {
//        console.log('[Admin Users] Raw Response:', response.value)
//    }
// })


// Handle both PascalCase (C# Default) and camelCase (JS Standard)
// Also handle if the API returns a raw array (no pagination wrapper)
const users = computed(() => {
    const raw = response.value
    if (!raw) return []
    if (Array.isArray(raw)) return raw
    return raw.items || []
})

const totalPages = computed(() => {
    const raw = response.value
    if (!raw) return 0
    if (Array.isArray(raw)) return 1 // Assume single page if raw array
    return raw.totalPages || 0
})

const hasPreviousPage = computed(() => {
    const raw = response.value
    if (!raw) return false
    if (Array.isArray(raw)) return false
    return raw.hasPreviousPage
})

const hasNextPage = computed(() => {
    const raw = response.value
    if (!raw) return false
    if (Array.isArray(raw)) return false
    return raw.hasNextPage
})

const totalCount = computed(() => {
     const raw = response.value
    if (!raw) return 0
    if (Array.isArray(raw)) return raw.length
    return raw.totalCount || 0
})


// --- Actions ---

function resetFilters() {
    filters.QueryString = ''
    filters.UserId = ''
    filters.UniversityId = ''
    filters.UniversityName = ''
    filters.Email = ''
    selectedFilterType.value = ''
    filterValue.value = ''
    pageIndex.value = 0
    refresh()
}

function applyFilters() {
    // Reset specific fields first (logic from original)
    filters.UserId = ''
    filters.UniversityName = ''
    filters.Email = ''

    if (selectedFilterType.value && filterValue.value) {
        if (selectedFilterType.value === 'UserId') filters.UserId = filterValue.value;
        if (selectedFilterType.value === 'UniversityName') filters.UniversityName = filterValue.value;
        if (selectedFilterType.value === 'Email') filters.Email = filterValue.value;
    }
    
    pageIndex.value = 0 // Reset to first page
    refresh()
}

function changePage(newIndex: number) {
    pageIndex.value = newIndex
    // We need to wait for the pageIndex update to propagate to computed queryParams
    setTimeout(() => refresh(), 0) // Small tick to ensure computed update
}

function loadUsers() {
    refresh() // Alias for compatibility with template if needed, or simply replace usage
}

function openModal(userId: string) {
    selectedUserId.value = userId
    showModal.value = true
}

// onMounted is no longer needed for initial fetch (useBackendFetch handles it)
onMounted(() => {
    console.log('[Admin Users] Mounted')
})
</script>
