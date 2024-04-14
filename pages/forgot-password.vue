<template>
    <div>
        <nuxt-layout name="login">
            <div class="flex flex-col gap-4 mb-8">
                <h1 class="h1">
                    Been Coffee Dashboard
                </h1>
                <h2 class="h2">
                    Reset your password
                </h2>
            </div>
            <span
                v-if="success"
                class="text-sm text-green-500"
            >{{ success }}</span>
            <form
                v-else
                class="flex justify-center w-full "
                @submit.prevent="submitForm"
            >
                <div class="flex flex-col w-full gap-4 ">
                    <input
                        v-model="email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        class="p-2 dark:bg-navy-700"
                    >
                    <input
                        type="submit"
                        class="self-end cursor-pointer button"
                        :value="loading ? 'Bear with...' : 'Send reset link'"
                        :disabled="loading"
                    >
                </div>
            </form>
            <div
                v-if="state.error"
                class="text-sm text-red-500"
            >
                {{ state.error }}
            </div>
        </nuxt-layout>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const email = ref('')
const loading = ref(false)
const success = ref('')

const state = reactive({
    error: ''
})

useHead({
    title: 'Reset your password'
})

const config = useRuntimeConfig()

definePageMeta({
    layout: false
})

const submitForm = async () => {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
            redirectTo: `${config.public.SITE_URL}/update-password`
        })
        if (error) throw error
        success.value = 'If this email exists, we will send you a password reset link. Check your inbox AND your junk/spam folders.'
    } catch (error) {
        console.log(error)
        state.error = error.message
    }
}

</script>
