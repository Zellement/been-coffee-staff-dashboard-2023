<template>
    <div>
        <nuxt-layout name="login">
            <form
                class="flex justify-center max-w-screen-md p-8 mx-auto"
                @submit.prevent="submitForm"
            >
                <div class="flex flex-col w-full gap-4 max-w-screen-xs">
                    <h1 class="h1">
                        Been Coffee Dashboard
                    </h1>
                    <h2 class="h2">
                        Reset your password
                    </h2>
                    <input
                        v-model="email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        class="p-2 dark:bg-navy-700"
                    >
                    <span
                        v-if="status"
                        class="text-sm text-green-500"
                    >{{ status }}</span>
                    <input
                        v-else
                        type="submit"
                        class="self-end cursor-pointer button"
                        :value="loading ? 'Bear with...' : 'Send reset link'"
                        :disabled="loading"
                    >
                </div>
            </form>
        </nuxt-layout>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const email = ref('')
const loading = ref(false)
const status = ref('')

useHead({
    title: 'Reset your password'
})

definePageMeta({
    layout: false
})

const submitForm = async () => {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email.value, {
            redirectTo: 'http://localhost:3000/update-password'
        })
        console.log(data)
        if (error) throw error
        status.value = 'If this email exists, we will send you a password reset link. Check your inbox.'
    } catch (error) {
        alert(error.message)
    }
}

</script>
