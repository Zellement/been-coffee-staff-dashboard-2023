<template>
    <div class="relative">
        <div class="container">
            <h2 class="mb-8 h1">
                Keyholder Quick Items
            </h2>

            <div
                class="overflow-hidden md:px-4 xl:px-6"
            >
                <div class="w-full py-8 overflow-x-scroll ">
                    <ul class="flex flex-row w-full">
                        <li
                            v-for="link in nav"
                            :key="link.url"
                            class="flex flex-col  w-3/4 min-w-[300px] items-start gap-2 p-4 bg-white shadow-lg card mr-4 relative"
                            :class="link.class"
                        >
                            <div class="flex justify-between items-center w-full gap-4">
                                <span class="flex items-center gap-2 relative">
                                    <!-- <Icon
                                        :name="link.icon"
                                        class="w-4 h-5 absolute top-0 left-0"
                                    /> -->
                                    <div class="flex flex-col">
                                        <span class="text-2xs">{{ link.brow }}</span>
                                        <h3 class="font-krete">{{ link.title }}</h3>
                                    </div>
                                </span>
                                <div class=" absolute top-0 right-0 -mt-2 mr-1">
                                    <component
                                        :is="link.component"
                                        class="self-center"
                                    />
                                </div>
                            </div>
                            <ul class="flex flex-row items-center gap-2 text-2xs mt-auto">
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
        </div>
    </div>
</template>

<script setup>
import { useSupabaseStore } from '@/stores/supabase'
import BooleanDailyCashBreakdown from '@/components/atoms/BooleanDailyCashBreakdown.vue'
import BooleanDailyTemperatures from '@/components/atoms/BooleanDailyTemperatures.vue'

const supabaseStore = useSupabaseStore()

const temperaturesOrder = computed(() => {
    return supabaseStore.daily_temperatures ? 'order-last ' : 'order-first'
})

const nav = computed(() => {
    return [

        {
            brow: 'Daily',
            title: 'Temperature Logs',
            // icon: 'mingcute:low-temperature-line',
            component: BooleanDailyTemperatures,
            class: temperaturesOrder.value,
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
        },
        {
            brow: 'Daily',
            title: 'Cash Breakdown',
            component: BooleanDailyCashBreakdown,
            // icon: 'streamline:money-cash-coins-stack-accounting-billing-payment-stack-cash-coins-currency-money-finance',
            subnav: [
                {
                    title: 'Form',
                    url: '/forms/daily-cash-breakdown'

                }
            ]
        }
    ]
})

</script>
