<template>
    <div
        class="fixed inset-0 z-[100] flex bg-tuscany/80 p-4 backdrop-blur duration-500 dark:bg-navy/80"
        :class="showPanel"
        @click="uiStore.toggleCheckModal(false)"
    >
        <div
            class="card relative m-auto flex h-auto w-full max-w-screen-sm flex-col p-4 shadow-lg lg:p-12"
            @click="uiStore.toggleCheckModal(true)"
        >
            <button
                class="absolute right-3 top-3"
                @click="uiStore.toggleCheckModal(false)"
            >
                <Icon
                    name="ri:close-circle-line"
                    class="h-8 w-8 transition-all duration-300 hover:rotate-90"
                />
            </button>
            <div class="h-full overflow-y-auto">
                <h2 class="h2">Checks for today</h2>
                <span class="text-xs uppercase">{{ date }}</span>
                <div class="mt-4 flex flex-col gap-4">
                    <div>
                        <h3>Daily Temperatures</h3>
                        <p
                            class="flex items-center text-2xs"
                            :class="dailyTemperaturesClasses"
                        >
                            <Icon
                                :name="dailyTemperaturesIcon"
                                class="mr-1 h-3 w-3"
                            />
                            {{ dailyTemperaturesText }}
                        </p>
                    </div>

                    <div>
                        <h3>Daily Cash Breakdown</h3>
                        <p
                            class="flex items-center text-2xs"
                            :class="dailyCashClasses"
                        >
                            <Icon :name="dailyCashIcon" class="mr-1 h-3 w-3" />
                            {{ dailyCashText }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'
import { useSupabaseStore } from '@/stores/supabase'

const uiStore = useUiStore()
const supabaseStore = useSupabaseStore()

const date = new Date().toDateString()

const showPanel = computed(() => {
    return uiStore.showCheckModal
        ? 'opacity-100'
        : 'opacity-0 pointer-events-none'
})

// Daily temperatures

const dailyTemperaturesIsSet = computed(() => {
    return supabaseStore.daily_temperatures
})

const dailyTemperaturesTime = computed(() => {
    return new Date(supabaseStore.daily_temperatures_time).toLocaleTimeString()
})

const dailyTemperaturesText = computed(() => {
    return dailyTemperaturesIsSet.value
        ? `Logged by ${dailyTemperaturesIsSet.value} at ${dailyTemperaturesTime.value}`
        : 'Incomplete'
})

const dailyTemperaturesIcon = computed(() => {
    return dailyTemperaturesIsSet.value
        ? 'material-symbols:check-rounded'
        : 'material-symbols:warning'
})

const dailyTemperaturesClasses = computed(() => {
    return dailyTemperaturesIsSet.value ? 'text-green-500' : 'text-red-500'
})

// Daily cash

const dailyCashIsSet = computed(() => {
    return supabaseStore.daily_cash_breakdown
})

const dailyCashTime = computed(() => {
    return new Date(
        supabaseStore.daily_cash_breakdown_time
    ).toLocaleTimeString()
})

const dailyCashText = computed(() => {
    return dailyCashIsSet.value
        ? `Logged by ${dailyCashIsSet.value} at ${dailyCashTime.value}`
        : 'Incomplete'
})

const dailyCashIcon = computed(() => {
    return dailyCashIsSet.value
        ? 'material-symbols:check-rounded'
        : 'material-symbols:warning'
})

const dailyCashClasses = computed(() => {
    return dailyCashIsSet.value ? 'text-green-500' : 'text-red-500'
})
</script>
