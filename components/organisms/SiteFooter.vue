<template>
    <header class="container fixed bottom-0 left-0 z-50 flex w-full dark:bg-navy-600 bg-butterscotch-600">
        <div class="flex flex-row items-center justify-between w-full gap-1">
            <div class="flex flex-row items-center gap-1">
                <sign-out />
                <button
                    v-if="userName"
                    aria-label="Show profile data"
                    class="flex flex-row items-center gap-1 p-2 transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
                    @click="uiStore.toggleProfileData"
                >
                    <Icon name="ri:user-line" />
                    <span>Hi, {{ userName }}</span>
                </button>
            </div>
            <div class="flex flex-row items-center gap-1">
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
            </div>
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
