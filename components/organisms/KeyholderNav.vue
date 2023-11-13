<template>
    <div
        class="fixed inset-0 z-50 flex p-4 duration-500 bg-tuscany/80 backdrop-blur dark:bg-navy/80"
        :class="showPanel"
        @click="uiStore.toggleKeyholderNav"
    >
        <div
            class="relative flex flex-col w-full max-w-screen-sm p-4 m-auto bg-white shadow-xl lg:p-12 dark:bg-navy-600 rounded-xl"
            @click="uiStore.toggleKeyholderNav(true)"
        >
            <button
                class="absolute top-3 right-3"
                @click="uiStore.toggleKeyholderNav"
            >
                <Icon
                    name="ri:close-circle-line"
                    class="w-8 h-8 transition-all duration-300 hover:rotate-90"
                />
            </button>

            <h2 class="mb-8 h2">
                Keyholder Quick Nav
            </h2>

            <ul class="flex flex-col gap-2">
                <li
                    v-for="link in nav"
                    :key="link.url"
                >
                    <nuxt-link
                        :to="link.url"
                        class="flex flex-row items-center gap-2"
                        @click="uiStore.toggleKeyholderNav(true)"
                    >
                        <Icon
                            :name="link.icon"
                            class="w-4 h-4"
                        />
                        <span>{{ link.title }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const showPanel = computed(() => {
    return uiStore.showKeyholderNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
})

const nav = computed(() => {
    return [
        {
            url: '/forms/daily-cash-breakdown',
            title: 'Daily Cash Breakdown',
            icon: 'streamline:money-cash-coins-stack-accounting-billing-payment-stack-cash-coins-currency-money-finance'
        },
        {
            url: '/forms/daily-temperature-logs',
            title: 'Daily Temperature Logs',
            icon: 'mingcute:low-temperature-line'
        }
    ]
})

</script>
