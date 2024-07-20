<template>
    <div class="flex gap-8 w-full justify-between items-center">
        <span class="flex-1 flex gap-2 items-center">
            <img
                v-if="user.image?.asset?._ref"
                :src="$urlFor(user.image?.asset).width(120).height(120).url()"
                height="32"
                width="32"
                loading="lazy"
                class="rounded-full self-center flex-grow-0 flex-shrink-0"
            >
            <span class="whitespace-nowrap">
                {{ shift.first_name }}
                {{ shift.last_name }}
            </span>
        </span>
        <span class="flex-1 flex gap-2">
            <span>{{ extractHourAndMinute(shift.start_at) }}</span>
            <span>-</span>
            <span>{{ extractHourAndMinute(shift.end_at) }}</span>
        </span>
        <span class="flex-1 flex">
            <span class="pill self-start">{{ shift.role }}</span>
        </span>
        <div class="flex-1">
            <div
                v-if="hasClockedInOrOut"
                class="flex gap-8"
            >
                <div
                    v-if="data.clock_in"
                    class="inline-flex gap-1 items-center pill pill--complete"
                >
                    <Icon
                        name="ph:arrow-square-in-bold"
                        class="w-4 h-4 rotate-90"
                    />
                    <span>{{ extractHourAndMinute(data.clock_in) }}</span>
                </div>
                <div
                    v-if="data.clock_out"
                    class="inline-flex gap-1 items-center pill pill--orange"
                >
                    <Icon
                        name="ph:arrow-square-out-bold"
                        class="w-4 h-4"
                    />
                    <span>{{ extractHourAndMinute(data.clock_out) }}</span>
                </div>
            </div>
            <div
                v-else
                class="inline-flex gap-1 items-center text-orange-500 animate-bounce"
            >
                <Icon
                    name="material-symbols:warning"
                    class="w-6 h-6 "
                />
                Please clock in
            </div>
        </div>
    </div>
</template>

<script setup>

import { useTeamStore } from '@/stores/team'

const teamStore = useTeamStore()

const props = defineProps({
    shift: {
        type: Object,
        default: null
    }
})

const hasClockedInOrOut = computed(() => {
    return data.value.clock_in || data.value.clock_out
})

const { extractHourAndMinute } = useDateUtils()

const { data } = await useFetch('/api/homebase-timecard', { query: { timecardId: props.shift.timecard_id } })

const user = computed(() => {
    if (!props.shift.user_id) return null
    return teamStore.getUserByHomebaseId(props.shift.user_id)
})

// console.log(props)
// console.log('timecard data', data.value)

</script>
