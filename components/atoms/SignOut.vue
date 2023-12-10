<template>
    <button
        class="flex flex-row items-center gap-1 p-2"
        @click="handleSignOut"
    >
        <Icon
            name="clarity:sign-out-line"
            class="flex w-6 h-6 transition-all duration-300 cursor-pointer dark:hover:text-butterscotch-500 hover:text-white"
        />
        <span>Sign out</span>
    </button>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const client = useSupabaseClient()

const handleSignOut = async () => {
    try {
        const { error } = await client.auth.signOut()
        if (error) throw error
        uiStore.toggleProfileData(false)
        navigateTo('/login')
    } catch (error) {
        console.log(error.message)
    }
}

</script>
