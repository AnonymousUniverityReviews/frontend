<template>
    <nav
      class="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 sticky top-0 z-50"
      aria-label="Main navigation"
    >
        <div class="flex flex-row max-w-6xl mx-auto px-4 py-3 justify-between items-center">
            <!-- Left: Catalog link -->
            <div class="flex items-center gap-6">
                <NuxtLink to="/catalog" class="text-base text-lg font-semibold hover:text-blue-600 transition">
                    Catalog
                </NuxtLink>
            </div>

            <!-- Right: Controls -->
            <div class="flex items-center gap-3">
                <!-- Language Switcher -->
                <label class="sr-only" for="lang">Language</label>
                <Dropdown id="lang" class="inline-block">
                    <!-- Custom button -->
                    <template #button="{ opened, toggle }">
                        <button 
                            @click="toggle"
                            class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-2 py-1 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            {{ language.toUpperCase() }}
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 size-5 text-gray-400">
                                <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </button>
                    </template>

                    <!-- Menu items -->
                    <template #menu="{ close }">
                        <Menu 
                            @close="close" 
                            class="absolute left-0 mt-1 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50"
                        >
                            <div class="py-1">
                                <p
                                    class="block w-full py-1 text-center text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white cursor-pointer select-none"
                                    v-for="lang in languages" 
                                    :key="lang" 
                                    @click="setLanguage(lang), close()"
                                >
                                    {{ lang.toUpperCase() }}
                                </p>
                            </div>
                        </Menu>
                    </template>
                </Dropdown>

                <!-- Theme Switcher -->
                <button
                    type="button"
                    @click="toggleTheme"
                    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
                    :title="isDark ? 'Light' : 'Dark'"
                >
                    <span v-if="isDark">🌙</span>
                    <span v-else>☀️</span>
                </button>

                <!-- Account Menu -->
                <label class="sr-only" for="account">Account</label>
                <Dropdown id="account" class="inline-block">
                    <!-- Custom button -->
                    <template #button="{ opened, toggle }">
                        <button 
                            @click="toggle"
                            class="inline-flex items-center gap-x-1.5 px-1 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                        >
                            Account
                            <Icon 
                                name="mdi-light:account"
                                class="text-xl align-middle"
                            />
                        </button>
                    </template>

                    <!-- Menu items -->
                    <template #menu="{ close }">
                        <Menu 
                            @close="close" 
                            class="absolute left-0 mt-1 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50"
                        >
                            <div v-if="!loggedIn" class="py-1">
                                <NuxtLink
                                    to="/login"
                                    class="block w-full py-1 text-center text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white cursor-pointer select-none"
                                >
                                    Sign in
                                </NuxtLink>
                                <NuxtLink
                                    to="/sign-up"
                                    class="block w-full py-1 text-center text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white cursor-pointer select-none"
                                >
                                    Sign up
                                </NuxtLink>
                            </div>
                            <div v-else class="py-1">
                                <NuxtLink
                                    to="/logout"
                                    class="block w-full py-1 text-center text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white cursor-pointer select-none"
                                >
                                    Sign out
                                </NuxtLink>
                            </div>
                        </Menu>
                    </template>
                </Dropdown>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorMode } from '#imports'
import { getLoginState } from '~/services/authService';

const languages = ['en', 'ua'];

const language = ref<string>('en')

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const loggedIn = ref((await getLoginState()).loggedIn);

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

function setLanguage(lang: string) {
    language.value = lang;
}
</script>