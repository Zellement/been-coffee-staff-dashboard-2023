<template>
    <div class="w-full pb-12">
        <nuxt-layout name="locations">
            <header
                class="container fixed left-0 top-0 z-50 flex w-full flex-row items-center gap-4 pt-2"
            >
                <img
                    class="h-8 w-8"
                    src="@/assets/images/been-staff-dashboard.png"
                />
                <button-colour-mode />
                <button
                    class="fixed right-4 top-2 flex items-center gap-2 px-1 text-[0.7em] uppercase tracking-wide"
                    @click="reloadNuxtApp"
                >
                    <Icon name="clarity:refresh-line" />
                    Data refreshing in {{ countdown }}
                    <div
                        class="absolute right-0 top-full z-10 h-px w-full bg-navy-50 opacity-30 dark:bg-tuscany-50"
                    />
                    <div
                        class="absolute right-0 top-full z-20 ml-auto h-px bg-navy dark:bg-tuscany"
                        :style="timerLineClass"
                    />
                </button>
            </header>
            <div class="relative">
                <div class="flex w-full flex-col gap-4">
                    <div class="grid gap-4 md:grid-cols-3">
                        <homebase-shifts-today class="md:col-span-2" />
                        <homebase-shifts-tomorrow basic class="md:col-span-1" />
                    </div>
                    <sanity-table-bookings />
                    <div class="grid grid-cols-1 gap-4">
                        <carousel-checks basic />
                        <carousel-routine-tasks basic />
                    </div>
                    <advent-calendar class="my-8" />
                    <div class="container grid w-full grid-cols-12">
                        <div
                            class="col-span-full grid w-full gap-8 md:grid-cols-2"
                        >
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
async function refreshPageData() {
    countingDown.value = false
    try {
        reloadNuxtApp()
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

const plus3days = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
const plus5days = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000)
const plus7days = new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000)
const plus14days = new Date(new Date().getTime() + 13 * 24 * 60 * 60 * 1000)

// Cleanup on unmount to prevent memory leaks
onUnmounted(() => {
    clearInterval(intervalId)
})
</script>
