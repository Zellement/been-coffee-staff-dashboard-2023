<template>
    <button
        class="p-2"
        @click="handleSignOut"
    >
        <Icon
            name="clarity:sign-out-line"
            class="flex transition-all duration-300 cursor-pointer dark:hover:text-butterscotch-500 hover:text-white"
        />
    </button>
</template>

<script setup>

const client = useSupabaseClient()

const router = useRouter()

const handleSignOut = async () => {
    try {
        const { error } = await client.auth.signOut()
        if (error) throw error
        router.push('/')
    } catch (error) {
        console.log(error.message)
    }
}

</script>
