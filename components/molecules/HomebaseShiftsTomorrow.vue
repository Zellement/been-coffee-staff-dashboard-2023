<template>
    <div class="container w-full">
        <div class="flex flex-col gap-4">
            <h2 class="h2">
                The Been team for tomorrow
                <span class="text-[0.7em] block text-tuscany">
                    {{ fullDateConverter(today) }}
                </span>
            </h2>
            <div
                v-if="shifts"
                class="grid grid-cols-2 gap-2"
            >
                <homebase-single-shift
                    v-for="shift in shifts"
                    :key="shift.id"
                    :shift="shift"
                    basic
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const { getTodaysDateInUrlEncodedFormat, fullDateConverter } = useDateUtils()
const today = new Date(+new Date() + 86400000)

const encodedDate = getTodaysDateInUrlEncodedFormat(today)
const { data } = await useFetch('/api/homebase-shifts', { query: { date: encodedDate } })

const shifts = data.value

</script>
