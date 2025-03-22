<template>
    <div v-if="totalTableBookings > 0" class="relative">
        <div class="container">
            <h2 class="h1 mb-4">Table Bookings</h2>
            <div class="grid gap-8 lg:grid-cols-2">
                <template
                    v-for="booking in allTableBookings"
                    :key="booking._id"
                >
                    <div
                        v-if="
                            shortDateConverter(today) ===
                            shortDateConverter(booking.datetime)
                        "
                        class="flex flex-1 flex-col gap-2 bg-tuscany-500 px-4 py-2 text-white"
                    >
                        <span class="font-riverside text-lg">
                            Today, {{ fullDateConverter(today) }}
                        </span>
                        <div class="grid grid-cols-2 gap-2">
                            <span
                                class="col-span-full flex flex-row items-center gap-4 font-riverside text-xl"
                            >
                                <Icon
                                    name="material-symbols:person"
                                    class="h-6 w-6 flex-shrink-0 text-butterscotch-500"
                                />
                                <span>{{ booking.name }}</span>
                            </span>
                            <span
                                class="flex items-center gap-4 font-riverside text-xl"
                            >
                                <Icon
                                    name="material-symbols:alarm"
                                    class="h-6 w-6 flex-shrink-0 text-butterscotch-500"
                                />

                                {{ extractHourAndMinute(booking.datetime) }}
                            </span>
                            <span
                                class="flex flex-row items-center gap-4 font-riverside text-xl"
                            >
                                <Icon
                                    name="fluent:people-community-16-filled"
                                    class="h-6 w-6 flex-shrink-0 text-butterscotch-500"
                                />
                                <span>{{ booking.people }}</span>
                            </span>
                            <span
                                v-if="booking.info"
                                class="col-span-full flex flex-row items-start gap-4"
                            >
                                <Icon
                                    name="material-symbols:android-messages"
                                    class="h-6 w-6 flex-shrink-0 text-butterscotch-500"
                                />
                                <span>{{ booking.info }}</span>
                            </span>
                        </div>
                    </div>
                </template>
                <div class="flex flex-col gap-2">
                    <h2 class="block font-riverside text-lg text-tuscany">
                        Coming Up
                    </h2>
                    <span
                        v-for="booking in allTableBookings"
                        :key="booking._id"
                        class="flex items-center gap-1 border border-tuscany-50 px-2 py-1 dark:border-navy-50"
                    >
                        {{ shortDateConverter(booking.datetime) }} @
                        {{ extractHourAndMinute(booking.datetime) }} -
                        <span>{{ booking.name }}</span>
                        (<span class="inline-flex flex-row items-center gap-1">
                            <Icon
                                name="fluent:people-community-16-filled"
                                class="h-4 w-4 flex-shrink-0"
                            />
                            <span>{{ booking.people }}</span> </span
                        >)
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { shortDateConverter, fullDateConverter, extractHourAndMinute } =
    useDateUtils()

const queryTableBookings = groq`
*[_type == "tableBooking" && datetime > now()]| order(datetime asc)
`
const sanity = useSanity()

const today = new Date()

const { data } = await useAsyncData('queryallTableBookings', () =>
    sanity.fetch(queryTableBookings)
)

const allTableBookings = computed(() => {
    return data.value
})

const totalTableBookings = computed(() => {
    return allTableBookings.value.length
})
</script>
