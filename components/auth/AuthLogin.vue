<template>
    <form
        class="flex justify-center w-full"
        @submit.prevent="handleLogin"
    >
        <div class="flex flex-col w-full gap-4">
            <input
                v-model="email"
                class="p-2 dark:bg-navy-700"
                type="email"
                placeholder="Your email"
            >
            <input
                v-model="password"
                class="p-2 dark:bg-navy-700"
                type="password"
                placeholder="Your password"
            >
            <input
                type="submit"
                class="self-end cursor-pointer button"
                :value="loading ? 'Bear with...' : 'Login'"
                :disabled="loading"
            >
        </div>
    </form>
    <div
        v-if="errorMsg"
        class="text-red-500"
    >
        {{ errorMsg }}
    </div>
</template>

<script setup>
const client = useSupabaseClient()

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const email = ref('')
const password = ref('')

const errorMsg = ref(null)

const handleLogin = async () => {
    try {
        loading.value = true
        const { error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })
        if (error) throw error
        router.push(`${route.query?.url ?? '/'}`)
    } catch (error) {
        errorMsg.value = error.message
    } finally {
        loading.value = false
    }
}
</script>
