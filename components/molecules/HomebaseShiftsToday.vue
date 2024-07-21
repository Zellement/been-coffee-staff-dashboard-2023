<template>
    <div class="container w-full">
        <div class="flex flex-col gap-4">
            <h2 class="h1">
                The Been team for today
                <span class="text-[0.7em] block text-tuscany">
                    {{ fullDateConverter(today) }}
                </span>
            </h2>
            <div
                class="flex flex-col gap-4"
            >
                <homebase-single-shift
                    v-for="shift in shifts"
                    :key="shift.id"
                    :shift="shift"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const today = new Date()
const { getTodaysDateInUrlEncodedFormat, fullDateConverter } = useDateUtils()

const encodedDate = getTodaysDateInUrlEncodedFormat(today)
const { data } = await useFetch('/api/homebase-shifts', { query: { date: encodedDate } })

const shifts = computed(() => {
    return data.value
})

</script>
