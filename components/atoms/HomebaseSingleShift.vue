<template>
    <div class="flex gap-8 w-full justify-between">
        <span class="flex-1">
            {{ shift.first_name }}
            {{ shift.last_name }}
        </span>
        <span class="flex-1 flex gap-2">
            <span>{{ extractHourAndMinute(shift.start_at) }}</span>
            <span>-</span>
            <span>{{ extractHourAndMinute(shift.end_at) }}</span>
        </span>
        <span class="flex-1">
            {{ shift.role }}
        </span>

        <span class="flex-1">
            <template v-if="data.clock_in">
                Clocked in at {{ extractHourAndMinute(data.clock_in) }}
            </template>
            <template v-else>
                Not clocked in
            </template>
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    shift: {
        type: Object,
        default: null
    }
})

const { extractHourAndMinute } = useDateUtils()

const { data } = await useFetch('/api/homebase-timecard', { query: { timecardId: props.shift.timecard_id } })

console.log(props)
console.log('timecard data', data.value)

</script>
