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
            <ul class="flex flex-col mb-8 space-y-8">
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
                <li
                    v-if="payslipDir"
                    class="flex"
                >
                    <nuxt-link
                        class="self-start button"
                        target="_blank"
                        :to="payslipDir"
                    >
                        <Icon
                            name="ic:sharp-currency-pound"
                            class="w-4 h-4 transition-all duration-300 hover:rotate-90"
                        />
                        <span>View your payslips</span>
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
const payslipDir = computed(() => {
    return userStore.userData?.payslip_dir
})

</script>
