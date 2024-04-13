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
                        Update your password
                    </h2>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Enter your new password"
                        required
                        class="p-2 dark:bg-navy-700"
                    >
                    <input
                        v-model="passwordagain"
                        type="password"
                        placeholder="Enter your new password again"
                        required
                        class="p-2 dark:bg-navy-700"
                    >
                    <span
                        v-if="error"
                        class="text-sm text-red-500"
                    >{{ error }}</span>
                    <input
                        type="submit"
                        class="self-end cursor-pointer button"
                        :value="loading ? 'Bear with...' : 'Reset my password'"
                        :disabled="loading"
                    >
                    <span
                        v-if="status"
                        class="text-sm "
                    >{{ status }}</span>
                </div>
            </form>
        </nuxt-layout>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const password = ref('')
const passwordagain = ref('')
const loading = ref(false)
const status = ref('')
const error = ref('')

useHead({
    title: 'Reset your password'
})

definePageMeta({
    layout: false
})

const passwordsMatch = () => password.value === passwordagain.value

const submitForm = async () => {
    if (!passwordsMatch()) {
        error.value = 'Passwords do not match'
        return
    }
    error.value = ''
    try {
        const { data, error } = await supabase.auth.updateUser(
            {
                password: password.value
            })
        console.log(data)
        if (error) throw error
        status.value = 'Sorted, redirecting you to the login page...'
        setTimeout(() => {
            navigateTo('/login')
        }, 2000)
    } catch (error) {
        alert(error.message)
    }
}

</script>
