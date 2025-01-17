<template>
    <div class="relative">
        <div class="container">
            <h2 class="h1">
                Checks &amp; Forms
            </h2>
        </div>
        <carousel-wrapper>
            <li
                v-for="link in nav"
                :key="link.url"
                class="w-64 min-w-64 card"
                :class="link.class"
            >
                <div class="flex justify-between items-center w-full gap-4">
                    <span class="flex items-center gap-2 relative">
                        <div class="flex flex-col">
                            <span class="text-2xs">{{ link.brow }}</span>
                            <h3 class="font-krete">{{ link.title }}</h3>
                        </div>
                    </span>
                    <div
                        v-if="link.status"
                        class="absolute top-0 right-0 -mt-2 mr-1"
                    >
                        <checks-status
                            :is-complete="link.status.isComplete"
                            :due-time="link.status.dueTime"
                            :display-text="link.status.displayText"
                        />
                    </div>
                </div>
                <ul
                    v-if="!basic"
                    class="flex flex-row items-center gap-2 text-2xs mt-auto"
                >
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
        </carousel-wrapper>
    </div>
</template>

<script setup>
import { useSupabaseStore } from '@/stores/supabase'

defineProps({
    basic: {
        type: Boolean,
        default: false
    }
})

const supabaseStore = useSupabaseStore()

const temperaturesHaveData = computed(() => {
    return supabaseStore.daily_temperatures !== null
})

const cashbreakdownHasData = computed(() => {
    return supabaseStore.daily_cash_breakdown !== null
})

const temperaturesOrder = computed(() => {
    return temperaturesHaveData.value ? 'order-last ' : 'order-first'
})

const nav = computed(() => {
    return [

        {
            brow: 'Daily',
            title: 'Temperature Logs',
            status: {
                isComplete: temperaturesHaveData.value,
                dueTime: 8,
                displayText: 'Due at 8am'
            },
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
            brow: 'On Demand',
            title: 'Maintenance Request',
            class: 'order-last',
            subnav: [
                {
                    title: 'Form',
                    url: 'https://forms.gle/j1Qb8LNRyhZVuNBw9',
                    blank: true
                }
            ]
        },
        {
            brow: 'Daily',
            title: 'Cash Breakdown',
            status: {
                isComplete: cashbreakdownHasData.value,
                dueTime: 18,
                displayText: 'Due at 6pm'
            },
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
