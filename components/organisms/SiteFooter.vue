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
                    <img
                        v-if="userProfilePicture?.asset?._ref"
                        :src="$urlFor(userProfilePicture).width(32).height(32).url()"
                        height="32"
                        width="32"
                        loading="lazy"
                        class="flex-grow flex-shrink-0 object-cover mr-2 rounded-full shadow-lg"
                    >
                    <Icon
                        v-else
                        name="ri:user-line"
                        class="w-12 h-12"
                    />
                    <span>
                        <template v-if="uiStore.isXmasTheme">Merry Xmas,</template>
                        <template v-else>Hi,</template>
                        {{ userName }}</span>
                </button>
            </div>
            <div class="flex flex-row items-center gap-4 text-navy dark:text-white">
                <button-colour-mode class="mr-8" />
                <button
                    aria-label="Show modal for checks"
                    class="relative"
                    @click="uiStore.toggleCheckModal"
                >
                    <span
                        class="absolute top-0 left-0 -translate-x-1 -translate-y-1  text-[10px] w-4 h-4 leading-none rounded-full flex"
                        :class="checksNotificationClasses"
                    >
                        <span class="m-auto">{{ supabaseStore.getTotalIncompleteChecks }}</span>
                    </span>
                    <Icon
                        name="material-symbols:fact-check"
                        class="w-6 h-6"
                    />
                </button>
                <nuxt-link
                    to="/day-dot-helper"
                >
                    <Icon
                        name="mdi:circle-half-full"
                        class="w-6 h-6 -rotate-90"
                    />
                </nuxt-link>

                <nuxt-link
                    to="/mailchimp"
                >
                    <Icon
                        name="ic:baseline-newspaper"
                        class="w-6 h-6 "
                    />
                </nuxt-link>

                <button-site-search />
            </div>
        </div>
    </header>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'
import { useUserStore } from '@/stores/user'
import { useSupabaseStore } from '@/stores/supabase'

const userStore = useUserStore()
const supabaseStore = useSupabaseStore()
const userName = computed(() => {
    return userStore?.userData?.display_name
})

const userProfilePicture = computed(() => {
    return userStore?.userSanityData?.image
})

const checksNotificationClasses = computed(() => {
    return supabaseStore.getTotalIncompleteChecks > 0 ? 'bg-red-500' : 'bg-green-500'
})

const uiStore = useUiStore()

onMounted(() => {
    userStore.setUserData()
})
</script>
