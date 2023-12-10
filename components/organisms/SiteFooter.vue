<template>
    <header class="container fixed bottom-0 left-0 z-50 flex w-full overflow-hidden dark:bg-navy-600 bg-butterscotch-600">
        <div class="flex flex-row items-center justify-between w-full gap-1">
            <div class="flex flex-row items-center gap-1">
                <button
                    v-if="userName"
                    aria-label="Show profile data"
                    class="flex flex-row items-center gap-1 p-2 transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
                    @click="uiStore.toggleProfileData"
                >
                    <Icon
                        name="ri:user-line"
                        class="w-6 h-6"
                    />
                    <span>Hi, {{ userName }}</span>
                </button>
            </div>
            <div class="flex flex-row items-center gap-1">
                <nuxt-link
                    to="/day-dot-helper"
                    class="flex flex-col flex-1 w-5 h-5 mx-2 transition-all duration-300 border-2 rounded-full border-navy bg-navy dark:border-white dark:bg-white group hover:bg-white hover:border-white"
                >
                    <span class="w-4 h-2 transition-all duration-300 rounded-tl-full rounded-tr-full bg-butterscotch dark:bg-navy group-hover:bg-gray-200" />
                </nuxt-link>

                <color-mode />

                <nuxt-link
                    to="/mailchimp"
                    class="flex flex-1 p-2 transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
                >
                    <Icon
                        name="ic:baseline-newspaper"
                        class="w-6 h-6 "
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
