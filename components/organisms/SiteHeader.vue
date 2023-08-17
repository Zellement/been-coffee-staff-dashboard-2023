<template>
    <header class="container fixed top-0 left-0 z-50 flex items-center justify-between w-full h-12 dark:bg-navy-600 bg-butterscotch-600">
        <site-logo />

        <div class="flex flex-row items-center gap-4">
            <button
                :aria-label="colorModeLabel"
                class="flex transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
                @click="toggleColorMode"
            >
                <Icon :name="colorModeIcon" />
            </button>

            <nuxt-link
                to="/mailchimp"
                class="flex transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
            >
                <Icon
                    name="ic:baseline-newspaper"
                    class="my-auto"
                />
            </nuxt-link>

            <site-search />

            <span>Hi, {name}</span>
            <button
                :aria-label="colorModeLabel"
                class="flex transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
                @click="uiStore.toggleProfileData"
            >
                <Icon name="ri:user-line" />
            </button>
            <Icon
                name="clarity:sign-out-line"
                class="flex transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
                @click="handleSignOut"
            />
        </div>
    </header>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const { signOut } = useAuth()

async function handleSignOut () {
    await signOut()
}

const colorMode = useColorMode()
const uiStore = useUiStore()

const colorModeIcon = computed(() => {
    return colorMode.preference === 'dark' ? 'clarity:sun-solid' : 'clarity:moon-solid'
})

const colorModeLabel = computed(() => {
    return colorMode.preference === 'dark' ? 'Enable light mode' : 'Enable dark mode'
})

const toggleColorMode = () => {
    if (colorMode.preference === 'light') {
        colorMode.preference = 'dark'
    } else (colorMode.preference = 'light')
}

</script>
