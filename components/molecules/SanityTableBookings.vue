<template>
    <div
        v-if="totalTableBookings > 0"
        class="relative"
    >
        <div class="container">
            <h2 class="h1 mb-4">
                Table Bookings
            </h2>
            <div class="grid grid-cols-2 gap-8">
                <template
                    v-for="booking in allTableBookings"
                    :key="booking._id"
                >
                    <div
                        v-if="shortDateConverter(today) === shortDateConverter(booking.datetime)"
                        class="bg-tuscany-500 flex flex-col flex-1 gap-2 py-2 px-4  text-white"
                    >
                        <span class="font-riverside text-lg ">
                            Today, {{ fullDateConverter(today) }}
                        </span>
                        <div class="grid grid-cols-2 gap-2">
                            <span class="flex text-xl col-span-full font-riverside items-center flex-row gap-4">
                                <Icon
                                    name="material-symbols:person"
                                    class="w-6 h-6 flex-shrink-0 text-butterscotch-500"
                                />
                                <span>{{ booking.name }}</span>

                            </span>
                            <span class="text-xl font-riverside flex items-center gap-4">

                                <Icon
                                    name="material-symbols:alarm"
                                    class="w-6 h-6 flex-shrink-0 text-butterscotch-500"
                                />

                                {{ extractHourAndMinute(booking.datetime) }}
                            </span>
                            <span class="flex text-xl font-riverside items-center flex-row gap-4">
                                <Icon
                                    name="fluent:people-community-16-filled"
                                    class="w-6 h-6 flex-shrink-0 text-butterscotch-500"
                                />
                                <span>{{ booking.people }}</span>

                            </span>
                            <span
                                v-if="booking.info"
                                class="flex col-span-full flex-row gap-4 items-start "
                            >
                                <Icon
                                    name="material-symbols:android-messages"
                                    class="w-6 h-6 flex-shrink-0 text-butterscotch-500"
                                />
                                <span>{{ booking.info }}</span>

                            </span>
                        </div>
                    </div>
                </template>
                <div class="flex flex-col gap-2">
                    <h2 class="font-riverside text-lg block text-tuscany">
                        Coming Up
                    </h2>
                    <span
                        v-for="booking in allTableBookings"
                        :key="booking._id"
                        class="px-2 py-1 border flex items-center gap-1"
                    >
                        {{ shortDateConverter(booking.datetime) }} @
                        {{ extractHourAndMinute(booking.datetime) }} -
                        <span>{{ booking.name }}</span>
                        (<span class="inline-flex items-center flex-row gap-1">
                            <Icon
                                name="fluent:people-community-16-filled"
                                class="w-4 h-4 flex-shrink-0 "
                            />
                            <span>{{ booking.people }}</span>

                        </span>)
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const { shortDateConverter, fullDateConverter, extractHourAndMinute } = useDateUtils()

const queryTableBookings = groq`
*[_type == "tableBooking" && datetime > now()]| order(datetime asc)
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

</script>
