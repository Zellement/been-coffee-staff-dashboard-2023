<template>
    <div
        class="fixed inset-0 z-[100] flex p-4 duration-500 bg-tuscany/80 backdrop-blur dark:bg-navy/80"
        :class="showPanel"
        @click="uiStore.toggleProfileData"
    >
        <div
            class="relative flex flex-col w-full max-w-screen-sm p-4 m-auto  shadow-lg lg:p-12 card"
            @click="uiStore.toggleProfileData(true)"
        >
            <div
                v-if="uiStore.theme !== 'standard' && uiStore.showProfileData"
                class="absolute top-0 flex w-full max-w-[150px] -translate-x-1/2 -translate-y-[90%] pointer-events-none left-1/2 "
            >
                <lottie-christmas-tree
                    v-if="uiStore.isXmasTheme"
                />
                <lottie-fireworks
                    v-if="uiStore.isNewYearTheme"
                />
                <lottie-easter-egg
                    v-if="uiStore.isEasterTheme"
                />
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
            <h2 class="flex flex-row items-center gap-2 mb-8 leading-none h1">
                <img
                    v-if="userSanityData?.image?.asset?._ref"
                    :src="$urlFor(userSanityData.image).width(40).height(40).url()"
                    height="40"
                    width="40"
                    loading="lazy"
                    class="flex-grow flex-shrink-0 object-cover rounded-full shadow-lg"
                >
                <Icon
                    v-else
                    name="ri:user-line"
                    class="w-12 h-12"
                />
                <span class="w-full -mt-1 leading-none">Hello, {{ userName }}</span>
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
                <li
                    v-if="userSanityData?.birthday"
                    class="flex flex-row items-center gap-2"
                >
                    <span class="flex flex-row items-center gap-2">

                        <Icon name="heroicons:cake-16-solid" />
                        <span>Birthday:</span>
                    </span>
                    <span>{{ userSanityData?.birthday ? dateConverterNoYear(userSanityData?.birthday) : '--' }}</span>
                </li>
                <li
                    v-if="userSanityData?.startDate"
                    class="flex flex-row items-center gap-2"
                >
                    <span class="flex flex-row items-center gap-2">

                        <Icon name="material-symbols-light:play-circle" />
                        <span>Start date:</span>
                    </span>
                    {{ dateConverter(userSanityData?.startDate) }}
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
                        <span class="flex gap-2">View payslips <img
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
import { dateConverter, dateConverterNoYear } from '@/scripts/helpers'

const uiStore = useUiStore()
const userStore = useUserStore()

const userSanityData = computed(() => {
    return userStore?.userSanityData
})

const showPanel = computed(() => {
    return uiStore.showProfileData ? 'opacity-100' : 'opacity-0 pointer-events-none'
})

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
