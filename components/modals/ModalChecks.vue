<template>
    <div
        class="fixed inset-0 z-[100] flex p-4 duration-500 bg-tuscany/80 backdrop-blur dark:bg-navy/80"
        :class="showPanel"
        @click="uiStore.toggleCheckModal(false)"
    >
        <div
            class="relative flex flex-col w-full max-w-screen-sm p-4 m-auto  shadow-lg lg:p-12 card h-auto"
            @click="uiStore.toggleCheckModal(true)"
        >
            <button
                class="absolute top-3 right-3"
                @click="uiStore.toggleCheckModal(false)"
            >
                <Icon
                    name="ri:close-circle-line"
                    class="w-8 h-8 transition-all duration-300 hover:rotate-90"
                />
            </button>
            <div class="overflow-y-auto h-full">
                <h2 class="h2">
                    Checks for today
                </h2>
                <span class="uppercase text-xs">{{ date }}</span>
                <div class="flex flex-col gap-4 mt-4">
                    <div>
                        <h3>Daily Temperatures</h3>
                        <p
                            class=" text-2xs flex items-center"
                            :class="dailyTemperaturesClasses"
                        >
                            <Icon
                                :name="dailyTemperaturesIcon"
                                class="w-3 h-3 mr-1"
                            />
                            {{ dailyTemperaturesText }}
                        </p>
                    </div>

                    <div>
                        <h3>Daily Cash Breakdown</h3>
                        <p
                            class=" text-2xs flex items-center"
                            :class="dailyCashClasses"
                        >
                            <Icon
                                :name="dailyCashIcon"
                                class="w-3 h-3 mr-1"
                            />
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
    return uiStore.showCheckModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
})

// Daily temperatures

const dailyTemperaturesIsSet = computed(() => {
    return supabaseStore.daily_temperatures
})

const dailyTemperaturesTime = computed(() => {
    return new Date(supabaseStore.daily_temperatures_time).toLocaleTimeString()
})

const dailyTemperaturesText = computed(() => {
    return dailyTemperaturesIsSet.value ? `Completed by ${dailyTemperaturesIsSet.value} at ${dailyTemperaturesTime.value}` : 'Incomplete'
})

const dailyTemperaturesIcon = computed(() => {
    return dailyTemperaturesIsSet.value ? 'material-symbols:check-rounded' : 'material-symbols:warning'
})

const dailyTemperaturesClasses = computed(() => {
    return dailyTemperaturesIsSet.value ? 'text-green-500' : 'text-red-500'
})

// Daily cash

const dailyCashIsSet = computed(() => {
    return supabaseStore.daily_cash_breakdown
})

const dailyCashTime = computed(() => {
    return new Date(supabaseStore.daily_cash_breakdown_time).toLocaleTimeString()
})

const dailyCashText = computed(() => {
    return dailyCashIsSet.value ? `Completed by ${dailyCashIsSet.value} at ${dailyCashTime.value}` : 'Incomplete'
})

const dailyCashIcon = computed(() => {
    return dailyCashIsSet.value ? 'material-symbols:check-rounded' : 'material-symbols:warning'
})

const dailyCashClasses = computed(() => {
    return dailyCashIsSet.value ? 'text-green-500' : 'text-red-500'
})

</script>
