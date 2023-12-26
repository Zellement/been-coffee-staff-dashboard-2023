<template>
    <div
        class="fixed inset-0 z-50 flex p-4 duration-500 bg-tuscany/80 backdrop-blur dark:bg-navy/80"
        :class="showPanel"
        @click="uiStore.toggleProfileData"
    >
        <div
            class="relative flex flex-col w-full max-w-screen-sm p-4 m-auto bg-white shadow-xl lg:p-12 dark:bg-navy-600 rounded-xl"
            @click="uiStore.toggleProfileData(true)"
        >
            <div
                v-if="isXmasTheme && uiStore.showProfileData"
                class="absolute top-0 flex w-full max-w-[150px] -translate-x-1/2 -translate-y-[90%] pointer-events-none left-1/2 "
            >
                <lottie-christmas-tree class=" left-1/2" />
            </div>
            <button
                class="absolute top-3 right-3"
                @click="uiStore.toggleProfileData(false)"
            >
                <Icon
                    name="ri:close-circle-line"
                    class="w-8 h-8 transition-all duration-300 hover:rotate-90"
                />
            </button>
            <h2 class="self mb-8 h1 max-w-[80%]">
                Hello, {{ userName }}
            </h2>
            <ul class="flex flex-col mb-8 space-y-2">
                <li
                    v-if="tillPin"
                    class="flex flex-row gap-2"
                >
                    <span class="flex flex-row items-center gap-2">

                        <Icon
                            name="fa6-solid:cash-register"
                            class="w-4 h-4 transition-all duration-300 hover:rotate-90"
                        />
                        <span>Till pin:</span>
                    </span>
                    {{ tillPin }}
                </li>
                <li class="flex flex-row items-center gap-2">
                    <button
                        class="flex items-center gap-2"
                        @click="toggleKeyholderLayout()"
                    >
                        <span
                            :class="toggleClasses"
                            class="relative w-12 h-6 rounded-3xl"
                        >
                            <span
                                :class="toggleActiveClasses"
                                class="absolute w-4 h-4 transition-all duration-300 bg-white rounded-full dark:bg-white left-1/2 top-1"
                            />
                        </span>
                        <span>Toggle Keyholder layout</span>
                    </button>
                </li>
                <li
                    class="flex flex-col pt-4"
                >
                    <nuxt-link
                        class="self-start button"
                        target="_blank"
                        to="https://beencoffeehouseltd.freeagent.com/"
                    >
                        <Icon
                            name="ic:sharp-currency-pound"
                            class="w-4 h-4 transition-all duration-300 hover:rotate-90"
                        />
                        <span class="flex gap-2">View your payslips on <img
                            src="/freeagent.svg"
                            class="w-full h-auto max-w-[80px] "
                        ></span>
                        <Icon
                            name="iconamoon:link-external-fill"
                            class="w-4 h-4 transition-all duration-300 hover:rotate-90"
                        />
                    </nuxt-link>
                    <nuxt-link
                        class="flex gap-2 mt-2 text-xs italic transition-all duration-300 hover:text-butterscotch-500 dark:hover:text-butterscotch-500 dark:text-white"
                        to="/article/payslips"
                        @click="uiStore.toggleProfileData(false)"
                    >
                        Learn more about Freeagent
                    </nuxt-link>
                </li>
            </ul>
            <sign-out class="ml-auto" />
        </div>
    </div>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'
import { useUserStore } from '@/stores/user'

const uiStore = useUiStore()

const isXmasTheme = computed(() => {
    return uiStore.isXmasThemed
})

const showPanel = computed(() => {
    return uiStore.showProfileData ? 'opacity-100' : 'opacity-0 pointer-events-none'
})
const userStore = useUserStore()

const userName = computed(() => {
    return userStore.userData?.display_name
})
const tillPin = computed(() => {
    return userStore.userData?.till_pin
})
const keyholderLayout = computed(() => {
    return userStore.keyholderLayout
})

const toggleClasses = computed(() => {
    return keyholderLayout.value ? 'bg-green-500' : 'dark:bg-white/30 bg-black/20'
})

const toggleActiveClasses = computed(() => {
    return keyholderLayout.value ? 'ml-auto' : '-translate-x-full'
})

const toggleKeyholderLayout = (value) => {
    userStore.toggleKeyholderLayout(value)
}

</script>
