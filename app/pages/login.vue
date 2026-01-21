<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <NavBar class="h-16 transition-colors duration-200" />

        <!-- MAIN -->
        <main class="flex-grow flex flex-col items-center justify-center px-4 py-16">

            <div class ="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl transition-colors duration-200">
                <h1 class="text-2xl font-semibold text-center mb-6 transition">
                Sign in
            </h1>

            <form class="space-y-4">
                <!-- Email -->
                <div>
                    <label for="email" 
                    class="block mb-2 font-semibold transition-colors duration-200 text-gray-600 dark:text-gray-400"
                    >
                        Enter your email
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="your.email@example.ua"
                        class="w-full px-5 py-2.5 pr-12 rounded-2xl transition-colors duration-200 focus:outline-none text-base shadow-sm
                            bg-gray-50 dark:bg-gray-800 border border-gray-300 hover:border-gray-400 dark:border-gray-600 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block mb-2 font-semibold transition-colors duration-200 text-gray-600 dark:text-gray-400">
                        Enter password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        class="w-full px-5 py-2.5 pr-12 rounded-2xl transition-colors duration-200 focus:outline-none text-base shadow-sm 
                            bg-gray-50 dark:bg-gray-800 border border-gray-300 hover:border-gray-400 dark:border-gray-600 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                    <button
                        type="submit"
                        class="w-full mt-4 py-3 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700 text-white transition"
                    >
                        Continue
                    </button>
            </form>
            </div>
        </main>

        <!-- FOOTER -->
        <footer class="py-8 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>
                © 2026 Studentus. All rights reserved.
            </p>
        </footer>
    </div>
</template>