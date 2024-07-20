<template>
    <div class="flex flex-col gap-4">
        <h2 class="h2">
            The Been team for today
            <span class="text-[0.7em] block">
                {{ shortDateConverter(today) }}
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
</template>

<script setup>
const { data } = await useFetch('/api/homebase-shifts')

const { shortDateConverter } = useDateUtils()

const shifts = data.value

const today = new Date()

</script>
