<script setup>
import { ref, computed, watch } from 'vue';

const selectedRole = ref(null);
const email = ref("");
const password = ref("");
const confirmationPassword = ref("");

const currentError = ref(null);
const roleError = computed(() => currentError.value === 'role');
const emailError = computed(() => currentError.value === 'email');
const differentPasswordsError = computed(() => currentError.value === 'different-passwords');

const roles = ['Студент', 'Абітурієнт', 'Інше'];

const selectRole = (role) => {
    if (selectedRole.value === role) {
        selectedRole.value = null;
        return;
    }
    selectedRole.value = role;
}

watch(selectedRole, (newRole, oldRole) => {
    if (newRole != null && roleError.value) {
        currentError.value = null;
    }
});

watch(email, (newEmail, oldEmail) => {
    if (newEmail !== oldEmail && emailError.value) {
        currentError.value = null;
    }
});

watch(password, (newPassword, oldPassword) => {
    if (newPassword !== oldPassword && differentPasswordsError.value) {
        currentError.value = null;
    }
});

watch(confirmationPassword, (newPassword, oldPassword) => {
    if (newPassword !== oldPassword && differentPasswordsError.value) {
        currentError.value = null;
    }
});

const checkRole = () => {
    return selectedRole.value != null;
}

const checkEmail = () => {
    const allowedDomain = "knu.ua";

    return email.value.split("@")[1] === allowedDomain;
}

const checkPasswordsSimilarity = () => {
    return password.value === confirmationPassword.value;
}

const handleSubmit = () => {
    currentError.value = null;

    if (!checkRole()) {
        currentError.value = 'role';
        return;
    }

    if (!checkEmail()) {
        currentError.value = 'email';
        return;
    }

    if (!checkPasswordsSimilarity()) {
        currentError.value = 'different-passwords';
        return;
    }

    alert(`Success! Selected role: ${selectedRole.value} ${email.value} ${password.value === confirmationPassword.value}`);
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        
        <main class="flex-grow flex flex-col items-center justify-center px-4 py-16">
            <div class="w-full max-w-md rounded-2xl bg-gray-100 dark:bg-gray-800 p-8 shadow-xl transition-colors duration-200">
            
                <h1 class="text-2xl font-semibold text-center mb-6 transition">
                    Реєстрація
                </h1>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                
                <div id="roles">
                    
                    <label 
                        class="block mb-2 font-semibold transition-colors duration-200 text-gray-600 dark:text-gray-400"
                        :class="{'!text-red-600': roleError}"
                    >
                        Я
                    </label>

                    <div class="flex w-full gap-3">
                        <button 
                            v-for="role in roles" 
                            :key="role"
                            type="button" 
                            @click="selectRole(role)"
                            :aria-selected="selectedRole === role"
                            class="role-button flex-1 rounded-2xl py-2.5 text-center text-sm font-medium transition-all focus:outline-none border
                                border-gray-400 bg-gray-100 text-gray-900
                                aria-selected:ring-1 aria-selected:ring-blue-500 aria-selected:border-blue-500 
                                aria-selected:bg-blue-50 aria-selected:text-blue-700"
                            :class="{'!border-red-500 !text-gray-900': roleError}"
                        >
                            {{ role }}
                        </button>
                    </div>

                    <p v-if="roleError" 
                        class="mt-2 text-sm font-medium text-red-600 block"
                    >
                        Оберіть хто ви
                    </p>
                </div>

                <div>
                    <label 
                        for="email" 
                        class="block mb-2 font-semibold transition-colors duration-200 text-gray-600 dark:text-gray-400"
                        :class="{'!text-red-600': emailError}"
                    >
                        Електронна пошта
                    </label>
                    <input
                        id="email"
                        type="email"
                        v-model="email"
                        placeholder="your.email@example.ua"
                        class="w-full px-5 py-2.5 pr-12 rounded-2xl transition-colors duration-200 focus:outline-none text-base shadow-sm
                            bg-gray-50 dark:bg-gray-800 border border-gray-300 hover:border-gray-400 dark:border-gray-600 focus:ring-1 focus:ring-blue-500"
                        :class="{'!border-red-500 !text-gray-900': emailError}"
                    />

                    <p v-if="emailError" 
                        class="mt-2 text-sm font-small text-gray-600 dark:text-gray-400 block"
                    >
                        Вашого університету немає в базі даних. 
                        <a href="/uni-request" class="text-blue-500 font-semibold hover:underline">Додати університет</a>
                    </p>
                </div>

                <div>
                    <label 
                        for="password" 
                        class="block mb-2 font-semibold transition-colors duration-200 text-gray-600 dark:text-gray-400"
                        :class="{'!text-red-600': differentPasswordsError}"
                    >
                        Пароль
                    </label>
                    <input
                        id="password"
                        type="password"
                        v-model="password"
                        placeholder="Пароль"
                        class="w-full px-5 py-2.5 pr-12 rounded-2xl transition-colors duration-200 focus:outline-none text-base shadow-sm 
                            bg-gray-50 dark:bg-gray-800 border border-gray-300 hover:border-gray-400 dark:border-gray-600 focus:ring-1 focus:ring-blue-500"
                        :class="{'!border-red-500 !text-gray-900': differentPasswordsError}"
                    />
                </div>

                <div>
                    <label 
                        for="password_confirm" 
                        class="block mb-2 font-semibold transition-colors duration-200 text-gray-600 dark:text-gray-400"
                        :class="{'!text-red-600': differentPasswordsError}"
                    >
                        Підтвердження пароля
                    </label>
                    <input
                        id="password_confirm"
                        type="password"
                        v-model="confirmationPassword"
                        placeholder="Пароль"
                        class="w-full px-5 py-2.5 pr-12 rounded-2xl transition-colors duration-200 focus:outline-none text-base shadow-sm 
                            bg-gray-50 dark:bg-gray-800 border border-gray-300 hover:border-gray-400 dark:border-gray-600 focus:ring-1 focus:ring-blue-500"
                        :class="{'!border-red-500 !text-gray-900': differentPasswordsError}"
                    />

                    <p v-if="differentPasswordsError" 
                        class="mt-2 text-sm font-medium text-red-600 block"
                    >
                        Паролі не співпадають.
                    </p>
                </div>

                <div class="text-center text-gray-900 dark:text-white">
                    <button
                        type="submit"
                        class="w-full mt-4 mb-4 py-3 rounded-2xl bg-blue-500 hover:bg-blue-700 text-white transition font-medium"
                    >
                        Створити акаунт
                    </button>
                    <p>Вже маєте акаунт? <a href="/sign-in" class="text-blue-500 font-bold hover:underline">Увійти</a></p>
                </div>

                </form>
            </div>
        </main>

        <footer class="py-8 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>© 2026 Studentus. All rights reserved.</p>
        </footer>
    </div>
</template>