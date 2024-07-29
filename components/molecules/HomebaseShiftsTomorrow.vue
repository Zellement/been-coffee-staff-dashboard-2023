<template>
    <div class="w-full">
        <div class="flex flex-col gap-4">
            <h2 class="h1">
                Tomorrow
                <span class="text-[0.7em] block text-tuscany">
                    {{ fullDateConverter(tomorrow) }}
                </span>
            </h2>
            <div
                v-if="shifts && shifts.length > 0"
                class="grid grid-cols-1 gap-2"
            >
                <homebase-single-shift
                    v-for="shift in shifts"
                    :key="shift.id"
                    :shift="shift"
                    basic
                />
            </div>
            <div v-else>
                <Icon
                    name="ph:spinner-gap-light"
                    class="text-lg animate-spin"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const { getTodaysDateInUrlEncodedFormat, fullDateConverter } = useDateUtils()
const tomorrow = new Date(+new Date() + 86400000)

const encodedDate = getTodaysDateInUrlEncodedFormat(tomorrow)

const shifts = ref()

onMounted(async () => {
    const { data } = await useFetch('/api/homebase-shifts', { query: { date: encodedDate } })
    shifts.value = data.value
})

</script>
