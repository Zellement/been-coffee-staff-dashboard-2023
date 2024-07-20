<template>
    <div class="h-[100dvh] fixed overflow-hidden w-full">
        <nuxt-layout name="locations">
            <header class="container fixed top-0 left-0 z-50 flex flex-row items-center justify-between w-full gap-2 pt-2">
                <img
                    class="w-8 h-8"
                    src="@/assets/images/been-staff-dashboard.png"
                >
            </header>
            <div class="relative">
                <button
                    class="absolute top-0 right-4 uppercase text-[0.7em] tracking-wide px-1"
                    @click="reloadNuxtApp"
                >
                    Data refreshing in {{ countdown }}
                    <div
                        class="h-full absolute top-0 right-0 bg-navy dark:bg-tuscany  bg-opacity-20 dark:bg-opacity-20 ml-auto"
                        :style="timerLineClass"
                    />
                </button>
                <div class="flex flex-col gap-8 w-full ">
                    <homebase-shifts-today />
                    <carousel-checks basic />
                    <homebase-shifts-tomorrow />
                </div>
            </div>
        </nuxt-layout>
    </div>
</template>

<script setup>

definePageMeta({
    layout: false
})

const time = 300

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
        console.log('Data refreshed')
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

// Cleanup on unmount to prevent memory leaks
onUnmounted(() => {
    clearInterval(intervalId)
})
</script>
