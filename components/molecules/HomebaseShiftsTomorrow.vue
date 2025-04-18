<template>
    <div class="container w-full">
        <div class="flex w-full flex-col gap-4">
            <h2 class="h3 dark:text-butterscotch-500">
                <span class="flex items-end gap-8">
                    Tomorrow
                    <weather-data :today="false" />
                </span>
                <span class="block text-[0.5em]/[0.8em] text-tuscany">
                    {{ shortDateConverter(tomorrow) }}
                    <bank-holidays :date="backwardsDate(tomorrow)" />
                </span>
            </h2>
            <div
                v-if="shifts && shifts.length > 0"
                class="grid w-full grid-cols-1 gap-2"
            >
                <homebase-single-shift-tomorrow
                    v-for="shift in shifts"
                    :key="shift.id"
                    :shift="shift"
                    :is-tomorrow="true"
                    basic
                />
            </div>
            <div v-else>
                <Icon
                    name="ph:spinner-gap-light"
                    class="animate-spin text-lg"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    basic: Boolean
})

const { getTodaysDateInUrlEncodedFormat, backwardsDate, shortDateConverter } =
    useDateUtils()

const tomorrow = new Date(+new Date() + 86400000)

const encodedDate = getTodaysDateInUrlEncodedFormat(tomorrow)

const shifts = ref()

const { data } = await useFetch('/api/homebase-shifts', {
    query: { date: encodedDate }
})
shifts.value = data.value
</script>
