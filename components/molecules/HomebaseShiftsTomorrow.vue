<template>
    <div class="w-full">
        <div class="flex w-full  flex-col gap-4">
            <h2 class="h1">
                Tomorrow
                <span
                    v-if="!basic"
                    class="text-[0.7em] block text-tuscany"
                >
                    {{ fullDateConverter(tomorrow) }}
                </span>
            </h2>
            <div
                v-if="shifts && shifts.length > 0"
                class="grid grid-cols-1 gap-2 w-full"
            >
                <homebase-single-shift
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
                    class="text-lg animate-spin"
                />
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    basic: Boolean
})
const { getTodaysDateInUrlEncodedFormat, fullDateConverter } = useDateUtils()
const tomorrow = new Date(+new Date() + 86400000)

const encodedDate = getTodaysDateInUrlEncodedFormat(tomorrow)

const shifts = ref()

const { data } = await useFetch('/api/homebase-shifts', { query: { date: encodedDate } })
shifts.value = data.value

</script>
