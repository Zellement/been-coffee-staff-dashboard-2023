<template>
    <div class="relative">
        <div class="container">
            <h2 class="h1">Checks &amp; Forms</h2>
        </div>
        <carousel-wrapper>
            <li
                v-for="link in nav"
                :key="link.url"
                class="card w-64 min-w-64"
                :class="link.class"
            >
                <div class="flex w-full items-center justify-between gap-4">
                    <span class="relative flex items-center gap-2">
                        <div class="flex flex-col">
                            <span class="text-2xs">{{ link.brow }}</span>
                            <h3 class="font-krete">{{ link.title }}</h3>
                        </div>
                    </span>
                    <div
                        v-if="link.status"
                        class="absolute right-0 top-0 -mt-2 mr-1"
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
                    class="mt-auto flex flex-row items-center gap-2"
                >
                    <li v-for="subnav in link.subnav" :key="subnav.url">
                        <button
                            v-if="subnav.action"
                            class="button button--xs flex flex-row items-center gap-1 p-0.5 px-1"
                            @click="subnav.action"
                        >
                            {{ subnav.title }}
                        </button>
                        <nuxt-link
                            v-else-if="subnav.url"
                            :to="subnav.url"
                            :target="subnav.blank ? '_blank' : null"
                            class="button button--xs flex flex-row items-center gap-1 p-0.5 px-1"
                        >
                            {{ subnav.title }}

                            <Icon
                                v-if="subnav.blank"
                                name="iconamoon:link-external-fill"
                                class="h-3 w-3 transition-all duration-300 hover:rotate-90"
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

const screenCleanAmHasData = computed(() => {
    return supabaseStore.daily_screen_clean_am !== null
})

const screenCleanPmHasData = computed(() => {
    return supabaseStore.daily_screen_clean_pm !== null
})

const temperaturesOrder = computed(() => {
    return temperaturesHaveData.value ? 'order-last ' : 'order-first'
})

const completeCheck = async (name, data) => {
    await supabaseStore.setCheck(name, data)
}

const nav = computed(() => {
    return [
        {
            brow: 'Daily (AM)',
            title: 'Screen Cleaning',
            status: {
                isComplete: screenCleanAmHasData.value,
                dueTime: 10,
                displayText: 'Due at 10am'
            },
            class: screenCleanAmHasData.value ? 'order-last' : '',
            subnav: [
                {
                    title: 'Mark as Complete',
                    action: () =>
                        completeCheck('daily_screen_clean_am', new Date())
                }
            ]
        },
        {
            brow: 'Daily (PM)',
            title: 'Screen Cleaning',
            status: {
                isComplete: screenCleanPmHasData.value,
                dueTime: 15,
                displayText: 'Due at 3pm'
            },
            class: screenCleanPmHasData.value ? 'order-last' : '',
            subnav: [
                {
                    title: 'Mark as Complete',
                    action: () =>
                        completeCheck('daily_screen_clean_pm', new Date())
                }
            ]
        },
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
