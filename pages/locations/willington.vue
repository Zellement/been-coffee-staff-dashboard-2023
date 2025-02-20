<template>
    <div class="w-full pb-12">
        <nuxt-layout name="locations">
            <header class="container fixed top-0 left-0 z-50 flex flex-row items-center justify-between w-full gap-2 pt-2">
                <img
                    class="w-8 h-8"
                    src="@/assets/images/been-staff-dashboard.png"
                >
            </header>
            <div class="relative">
                <button
                    class="absolute top-0 right-4 uppercase text-[0.7em] -translate-y-full tracking-wide px-1"
                    @click="reloadNuxtApp"
                >
                    Data refreshing in {{ countdown }}
                    <div
                        class="h-full absolute top-0 right-0 bg-navy dark:bg-tuscany  bg-opacity-20 dark:bg-opacity-20 ml-auto"
                        :style="timerLineClass"
                    />
                </button>
                <div class="flex flex-col gap-4 w-full ">
                    <div class="grid grid-cols-3">
                        <homebase-shifts-today class="col-span-2" />
                        <homebase-shifts-tomorrow
                            basic
                            class="col-span-1"
                        />
                    </div>
                    <sanity-table-bookings />
                    <div class="grid grid-cols-1">
                        <carousel-checks basic />
                        <carousel-routine-tasks basic />
                    </div>
                    <advent-calendar class="my-8" />
                    <div class="container grid grid-cols-12 w-full">
                        <div class="w-full grid grid-cols-2 gap-8 col-span-full flex-wrap justify-center ">
                            <sanity-notices
                                fixed-height
                                fixed-height-classes="h-[350px]"
                            />
                            <div class="grid grid-cols-2">
                                <single-day-dot
                                    :date="plus3days"
                                    title="+ 3 Days"
                                />
                                <single-day-dot
                                    :date="plus5days"
                                    title="+ 5 Days"
                                />
                                <single-day-dot
                                    :date="plus7days"
                                    title="+ 7 Days"
                                />
                                <single-day-dot
                                    :date="plus14days"
                                    title="+ 14 Days"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nuxt-layout>
    </div>
</template>

<script setup>

definePageMeta({
    layout: false
})

const time = 600

const countingDown = ref(true) // Start counting down immediately
const countdown = ref(time) // Initial countdown value
let intervalId

const timerLineClass = computed(() => {
    return `width: ${(countdown.value / time) * 100}%;`
})

// Function to refresh page data
async function refreshPageData () {
    countingDown.value = false
    try {
        reloadNuxtApp()
        // console.log('Data refreshed')
    } catch (e) {
        console.error(e)
    } finally {
        // Reset countdown and continue counting down
        countdown.value = time
        countingDown.value = true
    }
}
onMounted(() => {
    // Decrease countdown every second
    intervalId = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value -= 1
        } else {
            refreshPageData()
        }
    }, 1000)
})

const plus3days = new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000))
const plus5days = new Date(new Date().getTime() + (4 * 24 * 60 * 60 * 1000))
const plus7days = new Date(new Date().getTime() + (6 * 24 * 60 * 60 * 1000))
const plus14days = new Date(new Date().getTime() + (13 * 24 * 60 * 60 * 1000))

// Cleanup on unmount to prevent memory leaks
onUnmounted(() => {
    clearInterval(intervalId)
})
</script>
