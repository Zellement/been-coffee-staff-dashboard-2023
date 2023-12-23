<template>
    <form
        class="flex justify-center max-w-screen-md p-8 mx-auto"
        @submit.prevent="handleSignup"
    >
        <div class="flex flex-col gap-4">
            <h1 class="h1">
                Been Coffee Dashboard
            </h1>
            <h2 class="h2">
                Register a user
            </h2>
            <input
                v-model="displayName"
                class="p-2 dark:bg-navy-700"
                type="text"
                placeholder="Their name"
            >
            <input
                v-model="tillPin"
                class="p-2 dark:bg-navy-700"
                type="text"
                placeholder="Their till PIN"
            >
            <input
                v-model="payslipDir"
                class="p-2 dark:bg-navy-700"
                type="text"
                placeholder="Their payslip directory"
            >
            <input
                v-model="email"
                class="p-2 dark:bg-navy-700"
                type="email"
                placeholder="Their email"
            >
            <input
                v-model="password"
                class="p-2 dark:bg-navy-700"
                type="password"
                placeholder="Their password"
            >
            <input
                type="submit"
                class="self-end cursor-pointer button"
                :value="loading ? 'Loading' : 'Register'"
                :disabled="loading"
            >
        </div>
    </form>
</template>

<script setup>
const client = useSupabaseClient()

const router = useRouter()

const loading = ref(false)

const email = ref('')
const password = ref('')
const displayName = ref('')
const tillPin = ref('')
const payslipDir = ref('')

const errorMsg = ref(null)

const handleSignup = async () => {
    try {
        const { data, error } = await client.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: {
                    display_name: displayName.value,
                    till_pin: tillPin.value,
                    payslip_dir: payslipDir.value,
                    keyholder: keyholder.value
                }
            }
        })
        if (error) throw error
        router.push('/sorted')
    } catch (error) {
        errorMsg.value = error.message
    }
}
</script>
