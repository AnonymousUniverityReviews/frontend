<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <NavBar class="h-16 transition-colors duration-200" />


        <main class="grow flex flex-col items-center justify-center px-4 py-16">
            <div class="w-full max-w-md rounded-2xl">
                <h1 class="text-2xl font-semibold text-center mb-10 transition">
                    Submit a request to add an university
                </h1>

                <form class="space-y-8" @submit.prevent="onSubmit">
                    <!-- University Name -->
                    <div>
                        <label for="uniName" :class="['block mb-2 font-semibold transition-colors duration-200',
                            errors.universityName ? formColors.labelError : formColors.labelDefault]"
                        >
                            Enter university name
                        </label>
                        <input
                            v-model="form.universityName"
                            id="uniName"
                            :maxlength="UNIVERSITY_NAME_MAX"
                            type="text"
                            placeholder="Taras Shevchenko National University of Kyiv"
                            :class="['w-full px-5 py-2.5 rounded-2xl border transition-colors duration-200 focus:outline-none text-base shadow-sm', 
                                formColors.inputBg,
                                errors.universityName
                                    ? formColors.inputBorderError + ' ' + formColors.ringError
                                    : formColors.inputBorderDefault + ' ' + formColors.ringDefault
                            ]"
                        />
                        <p v-if="isLimitReached"
                        class="flex items-center gap-1 mt-1 text-xs font-semibold transition-colors duration-200 text-yellow-600 dark:text-yellow-400">
                            <Icon name="mdi:alert-circle-outline" class="text-sm"/> Maximum {{ UNIVERSITY_NAME_MAX }} characters
                        </p>

                        <p v-if="errors.universityName" 
                        :class="['flex items-center gap-1 mt-1 text-xs font-semibold transition-colors duration-200', formColors.helperErrorText]">
                            <Icon name="mdi:alert-circle-outline" class="text-sm"/>{{ errors.universityName }}
                        </p>
                    </div>

                    <!-- Email Domain -->
                    <div>
                        <label for="emailDomain" :class="['block mb-2 font-semibold transition-colors duration-200',
                            errors.emailDomain ? formColors.labelError : formColors.labelDefault]"
                        >
                            Enter email domain
                        </label>
                        <input
                            v-model="form.emailDomain"
                            id="emailDomain"
                            type="text"
                            placeholder="@knu.ua"
                            :class="['w-full px-5 py-2.5 rounded-2xl border transition-colors duration-200 focus:outline-none text-base shadow-sm',
                                formColors.inputBg,
                                errors.emailDomain
                                    ? formColors.inputBorderError + ' ' + formColors.ringError
                                    : formColors.inputBorderDefault + ' ' + formColors.ringDefault
                            ]"
                        />
                        <p v-if="errors.emailDomain" 
                        :class="['flex items-center gap-1 mt-1 text-xs font-semibold transition-colors duration-200', formColors.helperErrorText]">
                            <Icon name="mdi:alert-circle-outline" class="text-sm"/>{{ errors.emailDomain }}
                        </p>
                    </div>

                    <!-- Comment -->
                    <div>
                        <label for="comment" :class="['block mb-2 font-semibold transition-colors duration-200', formColors.labelDefault]">
                            Enter comment (optional)
                        </label>
                        <textarea
                            v-model="form.comment"
                            :maxlength="COMMENT_MAX"
                            id="comment"
                            type="text"
                            placeholder="Comment"
                            :class="['w-full px-5 py-2.5 rounded-2xl border transition-colors duration-200 focus:outline-none text-base shadow-sm resize-none field-sizing-content', 
                                formColors.inputBg, formColors.inputBorderDefault, formColors.ringDefault
                            ]"
                        />
                        <p :class="['mt-1 ml-2 text-xs font-semibold transition-colors duration-200',
                            isCommentLimitReached ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-600',
                            ]">
                            {{ form.comment.length }}/{{ COMMENT_MAX }}
                        </p>
                    </div>

                    <div class="flex justify-center pt-2">
                        <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="px-5 py-3 pr-12 pl-12 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700 text-white transition"
                        >
                            {{ isSubmitting ? 'Sending...' : 'Send' }}
                        </button>
                    </div>
                </form>
            </div>
        </main>

        <!-- FOOTER -->
        <footer class="py-8 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>
                © {{ new Date().getFullYear() }} Studentus. All rights reserved.
            </p>
        </footer>

        <BaseModal 
            v-model="showSuccessModal" 
            title="Request sent"
        >
            <p>
                Your request was sent successfully. You can close this window.
            </p>
        </BaseModal>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import NavBar from '~/components/NavBar.vue'
import { requestService } from '~/services/requestService'
import { formColors } from "~/constants/colors";


const form = reactive({
    universityName: '',
    emailDomain: '',
    comment: '',
})

const errors = reactive({
    universityName: '',
    emailDomain: '',
})

const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const UNIVERSITY_NAME_MAX = 200

const isLimitReached = computed(() => {
  return form.universityName.length >= UNIVERSITY_NAME_MAX
})

const COMMENT_MAX = 600
const isCommentLimitReached = computed(() => {
  return form.comment.length >= COMMENT_MAX
})

const forbiddenUniversityNameRe =
    /[!?<>\\/@#$€₽₴%_^*=~`{}[\]]|[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u

function validate() {
    errors.universityName = ''
    errors.emailDomain = ''

    let valid = true

    if (!form.universityName.trim()) {
        errors.universityName = 'Please enter name of the university'
        valid = false
    } else if (forbiddenUniversityNameRe.test(form.universityName.trim())) {
        errors.universityName = 'University name contains invalid characters'
        valid = false
    }

    
    if (!form.emailDomain.trim()) {
        errors.emailDomain = 'Please enter a valid email domain'
        valid = false
    } else if (!form.emailDomain.startsWith('@')) {
        errors.emailDomain = 'Domain must start with @'
        valid = false
    }

  return valid
}

async function onSubmit() {
  if (!validate()) return

  try {
    isSubmitting.value = true

    await requestService.sendUniversityRequest({
      universityName: form.universityName,
      emailDomain: form.emailDomain,
      comment: form.comment || undefined,
    })

    /* Reset form */
    form.universityName = ''
    form.emailDomain = ''
    form.comment = ''

    /* Show success Modal */
    showSuccessModal.value = true
    } catch (e) {
        alert('Error sending request')
    } finally {
        isSubmitting.value = false
    }

}

useHead({
    title: 'Add University request | Studentus',
    meta: [
        { name: 'description', content: 'Submit a request to add a new university. Help our community grow by contributing verified educational institutions.' }
    ]
})
</script>