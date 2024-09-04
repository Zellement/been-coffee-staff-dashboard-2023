<template>
    <div
        v-if="totalTableBookings > 0"
        class="relative"
    >
        <div class="container">
            <h2 class="h1">
                Table Bookings Today
                <span class="text-[0.7em] block text-tuscany">
                    {{ fullDateConverter(today) }}
                </span>
            </h2>
            <div
                class="flex flex-row gap-2 flex-nowrap"
            >
                <template
                    v-for="booking in allTableBookings"
                    :key="booking._id"
                >
                    <div
                        v-if="shortDateConverter(today) === shortDateConverter(booking.datetime)"
                        class="bg-tuscany-500 flex-1 gap-2 py-2 px-4 flex flex-col  text-white"
                    >
                        <span class="text-3xl font-riverside flex items-center gap-4">

                            <Icon
                                name="material-symbols:alarm"
                                class="w-6 h-6 flex-shrink-0 text-butterscotch-500"
                            />

                            {{ extractHourAndMinute(booking.datetime) }}</span>
                        <span class="flex flex-row gap-4 items-start ">
                            <Icon
                                name="material-symbols:person"
                                class="w-6 h-6 flex-shrink-0 text-butterscotch-500"
                            />
                            <span>{{ booking.name }}</span>

                        </span>
                        <span
                            v-if="booking.info"
                            class="flex flex-row gap-4 items-start "
                        >
                            <Icon
                                name="material-symbols:android-messages"
                                class="w-6 h-6 flex-shrink-0 text-butterscotch-500"
                            />
                            <span>{{ booking.info }}</span>

                        </span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>

const { shortDateConverter, fullDateConverter, extractHourAndMinute } = useDateUtils()

const queryTableBookings = groq`
*[_type == "tableBooking" && datetime > now()]
`
const sanity = useSanity()

const today = new Date()

const { data } = await useAsyncData('queryallTableBookings', () => sanity.fetch(queryTableBookings))

const allTableBookings = computed(() => {
    return data.value
})

const totalTableBookings = computed(() => {
    return allTableBookings.value.length
})

// watch(timer, (value) => {
//     if (value === 0) {
//         timer.value = COUNTDOWN
//         if (currentNotice.value === totalTableBookings.value - 1) {
//             currentNotice.value = 0
//         } else {
//             currentNotice.value++
//         }
//     }
// })

// onMounted(() => {
//     if (totalTableBookings.value > 1) {
//         setInterval(() => {
//             timer.value--
//         }, 1000)
//     }
// })

</script>
