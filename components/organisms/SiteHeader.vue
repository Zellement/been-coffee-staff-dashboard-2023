<template>
    <header class="container fixed top-0 left-0 z-50 flex items-center justify-between w-full h-12 dark:bg-navy-600 bg-butterscotch-600">
        <site-logo />

        <div class="flex flex-row items-center gap-2">
            <color-mode />

            <nuxt-link
                to="/mailchimp"
                class="flex p-2 transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
            >
                <Icon
                    name="ic:baseline-newspaper"
                    class="my-auto"
                />
            </nuxt-link>

            <site-search />
            <button
                v-if="userName"
                :aria-label="colorModeLabel"
                class="flex flex-row items-center gap-1 p-2 transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
                @click="uiStore.toggleProfileData"
            >
                <Icon name="ri:user-line" />
                <span>Hi, {{ userName }}</span>
            </button>
            <sign-out />
        </div>
    </header>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const userName = computed(() => {
    return userStore?.userData?.display_name
})

const uiStore = useUiStore()

onMounted(() => {
    userStore.setUserData()
})
</script>
