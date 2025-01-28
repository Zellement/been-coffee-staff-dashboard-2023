<template>
    <div>
        <nuxt-layout name="login">
            <div class="mb-8 flex flex-col gap-4">
                <h1 class="h1">Been Coffee Dashboard</h1>
                <h2 class="h2">Update your password</h2>
            </div>
            <span v-if="success" class="flex flex-col gap-4 text-sm">
                <span class="mb-4 text-green-500">Password updated.</span>
                <a class="button" href="/login"> Login </a>
            </span>
            <form
                v-else
                class="flex w-full justify-center"
                @submit.prevent="submitForm"
            >
                <div class="flex w-full flex-col gap-4">
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Enter your new password"
                        required
                        class="p-2 dark:bg-navy-700"
                    />
                    <input
                        v-model="passwordagain"
                        type="password"
                        placeholder="Enter your new password again"
                        required
                        class="p-2 dark:bg-navy-700"
                    />
                    <span v-if="error" class="text-sm text-red-500">{{
                        error
                    }}</span>
                    <input
                        type="submit"
                        class="button cursor-pointer self-end"
                        :value="loading ? 'Bear with...' : 'Reset my password'"
                        :disabled="loading"
                    />
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
const success = ref('')
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
        const { data, error } = await supabase.auth.updateUser({
            password: password.value
        })
        console.log(data)
        if (error) throw error
        success.value = 'Sorted!'
    } catch (error) {
        alert(error.message)
    }
}
</script>
