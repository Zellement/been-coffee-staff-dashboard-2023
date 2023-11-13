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
                    <span
                        class="flex flex-row items-center gap-2"
                    >
                        <Icon
                            :name="link.icon"
                            class="w-4 h-4"
                        />
                        <span>{{ link.title }}</span>
                        <ul class="flex flex-row items-center gap-2 text-2xs">

                            <li
                                v-for="subnav in link.subnav"
                                :key="subnav.url"
                            >
                                <nuxt-link
                                    v-if="subnav.url"
                                    :to="subnav.url"
                                    :target="subnav.blank ? '_blank' : null"
                                    class="flex flex-row button button--sm items-center gap-1 p-0.5 px-1 rounded border border-current"
                                    @click="uiStore.toggleKeyholderNav(false)"
                                >
                                    {{ subnav.title }}

                                    <Icon
                                        v-if="subnav.blank"
                                        name="iconamoon:link-external-fill"
                                        class="w-3 h-3 transition-all duration-300 hover:rotate-90"
                                    />
                                </nuxt-link>
                            </li>
                        </ul>

                    </span>
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
            title: 'Daily Cash Breakdown',
            icon: 'streamline:money-cash-coins-stack-accounting-billing-payment-stack-cash-coins-currency-money-finance',
            subnav: [
                {
                    title: 'Form',
                    url: '/forms/daily-cash-breakdown'

                }
            ]
        },
        {
            title: 'Daily Temperature Logs',
            icon: 'mingcute:low-temperature-line',
            subnav: [
                {
                    title: 'Form',
                    url: '/forms/daily-temperature-logs'

                },
                {
                    title: 'Responses',
                    url: 'https://docs.google.com/spreadsheets/d/1Bh5vjjW7wU8HaMsP7-R0M0XTlx1Ohd9uh25AK3ZZrIY/edit?usp=sharing',
                    blank: true
                }
            ]
        }
    ]
})

</script>
