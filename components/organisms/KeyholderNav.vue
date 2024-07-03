<template>
    <div class="relative">
        <div class="container">
            <h2 class="mb-8 h1">
                Keyholder Quick Items
            </h2>

            <ul class="grid grid-cols-1 gap-2 md:grid-cols-2">
                <li
                    v-for="link in nav"
                    :key="link.url"
                    class="flex flex-col items-start gap-2 p-4 bg-white shadow-lg card"
                >
                    <div class="flex justify-between items-center w-full gap-4">
                        <span class="flex items-center gap-2">
                            <Icon
                                :name="link.icon"
                                class="w-4 h-5"
                            />
                            <h3 class="krete-title">{{ link.title }}</h3>
                        </span>
                        <component
                            :is="link.component"
                            class="self-center"
                        />
                    </div>
                    <ul class="flex flex-row items-center gap-2 text-2xs">
                        <li
                            v-for="subnav in link.subnav"
                            :key="subnav.url"
                        >
                            <nuxt-link
                                v-if="subnav.url"
                                :to="subnav.url"
                                :target="subnav.blank ? '_blank' : null"
                                class="flex flex-row button items-center gap-1 p-0.5 px-1"
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
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import BooleanCheckDailyCashBreakdown from '@/components/atoms/BooleanCheckDailyCashBreakdown.vue'

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
            component: BooleanCheckDailyCashBreakdown,
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
