<template>
    <div class="container w-full">
        <div class="relative flex flex-col gap-4">
            <h2 class="h1">
                <span class="flex items-end gap-8">
                    The Been team for today
                    <weather-data :today="true" />
                </span>
                <span class="block text-[0.7em] text-tuscany">
                    {{ fullDateConverter(today) }}
                    <bank-holidays :date="backwardsDate(today)" />
                </span>
            </h2>
            <template v-if="showAll">
                <div
                    v-if="shifts && shifts.length > 0"
                    class="flex flex-col gap-1 md:gap-2"
                >
                    <homebase-single-shift-today
                        v-for="shift in shifts"
                        :key="shift.id"
                        class="subgrid"
                        :shift="shift"
                    />
                </div>
                <div v-else>
                    <Icon
                        name="ph:spinner-gap-light"
                        class="animate-spin text-lg"
                    />
                </div>
            </template>
            <template v-else>
                <button class="button" @click="showAll = true">
                    Show shifts
                </button>
            </template>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: true
    }
})

const showAll = ref(props.show)

const today = new Date()
const { getTodaysDateInUrlEncodedFormat, backwardsDate, fullDateConverter } =
    useDateUtils()

const encodedDate = getTodaysDateInUrlEncodedFormat(today)

const shifts = ref()

const { data } = await useFetch('/api/homebase-shifts', {
    query: { date: encodedDate }
})
shifts.value = data.value
</script>
