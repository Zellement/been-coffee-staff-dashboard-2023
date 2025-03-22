<template>
    <div class="">
        <div v-for="shift in shifts" :key="shift.id">
            {{ shift.first_name }}
            {{ shift.last_name }}

            Clocked in at {{ formatIsoDateString(shift.clock_in) }}
        </div>
    </div>
</template>

<script setup>
const { data } = await useFetch('/api/homebase-timecards')

const shifts = data.value

function formatIsoDateString(isoDateString) {
    const date = new Date(isoDateString)
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    }
    return new Intl.DateTimeFormat('en-US', options).format(date)
}
</script>
