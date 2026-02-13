<template>
  <BaseModal v-if="localUser" @close="$emit('close')">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full">
      <div class="flex justify-between items-start mb-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Manage User</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <div v-if="loading" class="flex justify-center py-8">
        <Icon name="eos-icons:loading" class="w-8 h-8 text-blue-600 animate-spin" />
      </div>

      <div v-else class="space-y-6">
        <!-- Main Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">User ID</label>
            <div class="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm font-mono text-gray-600 dark:text-gray-300 break-all">
              {{ localUser.id }}
            </div>
          </div>
          <div v-if="localUser.universityId">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">University ID</label>
            <div class="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm font-mono text-gray-600 dark:text-gray-300 break-all">
              {{ localUser.universityId }}
            </div>
          </div>
           <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">University Name</label>
            <div class="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-300">
              {{ localUser.universityName || 'N/A' }}
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Registration Date</label>
            <div class="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-300">
              {{ new Date(localUser.registrationDate).toLocaleDateString() }}
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Confirmed</label>
             <div class="mt-1 flex items-center">
                <Icon v-if="localUser.emailConfirmed" name="mdi:check-circle" class="text-green-500 w-5 h-5 mr-2"/>
                <Icon v-else name="mdi:close-circle" class="text-red-500 w-5 h-5 mr-2"/>
                 <span class="text-sm text-gray-600 dark:text-gray-300">{{ localUser.emailConfirmed ? 'Yes' : 'No' }}</span>
             </div>
          </div>
           <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Failed Login Attempts</label>
            <div class="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-300">
              {{ localUser.accessFailedCount }}
            </div>
          </div>
           <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Locked Out Until</label>
            <div class="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-300">
              {{ localUser.lockoutEnd ? new Date(localUser.lockoutEnd).toLocaleString() : 'Not Locked' }}
            </div>
          </div>

        </div>

         <!-- Ban Status -->
         <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
             <span class="font-medium text-gray-700 dark:text-gray-300">Ban Status:</span>
             <span v-if="isBanned" class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                 Banned
             </span>
             <span v-else class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                 Active
             </span>

             <button 
                @click="toggleBan"
                :disabled="actionLoading"
                class="ml-auto px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                :class="isBanned ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:opacity-50'"
             >
                <Icon v-if="actionLoading" name="eos-icons:loading" class="w-4 h-4 animate-spin mr-2" />
                {{ isBanned ? 'Unban User' : 'Ban User' }}
             </button>
         </div>


        <!-- Roles Mock -->
        <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Roles</h3>
            <div class="flex flex-wrap gap-2">
                <span v-for="role in localUser.roles" :key="role.id" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {{ role.name }}
                     <button @click="removeRole(role.id)" class="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 focus:outline-none">
                        <Icon name="mdi:close" class="w-3 h-3" />
                    </button>
                </span>
                <button @click="addRole" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                     <Icon name="mdi:plus" class="w-3 h-3 mr-1" />
                     Add Role
                </button>
            </div>
             <p class="text-xs text-gray-500 mt-1 italic">* Role management is currently mocked.</p>
        </div>


        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
           <button 
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button 
            @click="saveChanges" 
            :disabled="actionLoading"
            class="px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
          >
             <Icon v-if="actionLoading" name="eos-icons:loading" class="w-4 h-4 animate-spin mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getUserById, banUser, unbanUser, updateUser, type RetrieveOneUserResponse } from '~/services/userService'

const props = defineProps<{
  userId: string | null
}>()

const emit = defineEmits(['close', 'refresh'])

const localUser = ref<RetrieveOneUserResponse | null>(null)
const loading = ref(false)
const actionLoading = ref(false)

// Determine if banned based on lockoutEnd (just an assumption/mock logic for now since we lack a specific boolean)
// Or we can track it locally if we assume the API doesn't return it yet.
// For the purpose of the demo, let's assume lockoutEnd in the future = banned.
const isBanned = computed(() => {
    if (!localUser.value?.lockoutEnd) return false;
    return new Date(localUser.value.lockoutEnd) > new Date();
})

async function fetchUser() {
  if (!props.userId) return
  
  loading.value = true
  try {
    const response = await getUserById(props.userId)
    localUser.value = response
  } catch (error) {
    console.error('Failed to fetch user', error)
    // Handle error (toast, etc.)
  } finally {
    loading.value = false
  }
}

watch(() => props.userId, (newId) => {
  if (newId) fetchUser()
  else localUser.value = null
}, { immediate: true })

async function toggleBan() {
    if (!localUser.value) return;
    
    actionLoading.value = true;
    try {
        if (isBanned.value) {
            await unbanUser(localUser.value.id);
            // Mock update functionality to reflect change in UI
             localUser.value.lockoutEnd = null;
        } else {
            await banUser(localUser.value.id);
             // Mock update functionality to reflect change in UI
             // Set lockout to far future
             localUser.value.lockoutEnd = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 100).toISOString(); 
        }
        emit('refresh');
    } catch (e) {
        console.error("Ban action failed", e);
    } finally {
        actionLoading.value = false;
    }
}


// Mock Role Management
function removeRole(roleId: string) {
    if (!localUser.value) return;
    localUser.value.roles = localUser.value.roles.filter(r => r.id !== roleId);
}

function addRole() {
    if (!localUser.value) return;
    // Mock adding admin
    if (!localUser.value.roles.find(r => r.name === 'Admin')) {
         localUser.value.roles.push({ id: 'mock-admin-id', name: 'Admin' });
    }
}

async function saveChanges() {
    if (!localUser.value) return;
    actionLoading.value = true;
    try {
        await updateUser(localUser.value.id, localUser.value);
        emit('close');
        emit('refresh');
    } catch (e) {
        console.error("Update failed", e);
    } finally {
        actionLoading.value = false;
    }
}

</script>
