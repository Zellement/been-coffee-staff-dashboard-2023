<template>
    <div
        class="flex gap-8 w-full justify-between items-center"
        :class="wrapperClasses"
    >
        <span class="basis-4/12 flex gap-2 items-center">
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
            </span>
        </span>
        <span class="flex-1 basis-3/12 flex gap-2">
            <span>{{ extractHourAndMinute(shift.start_at) }}</span>
            <span>-</span>
            <span>{{ extractHourAndMinute(shift.end_at) }}</span>
        </span>
        <span
            class="flex-1 flex items-center basis-1/12"
        >
            <Icon
                v-if="data?.labor?.unpaid_break_hours"
                name="solar:armchair-2-bold"
                class="w-6 h-6"
            />
        </span>
        <!-- <span class="flex-1 flex">
            <span class="pill self-start">{{ shift.role }}</span>
        </span> -->
        <div
            v-if="!basic"
            class="flex-1 basis-4/12"
        >
            <div
                v-if="hasClockedInOrOut"
                class="flex gap-8"
            >
                <div
                    v-if="data?.clock_in"
                    class="inline-flex gap-1 items-center pill pill--clockin"
                >
                    <Icon
                        name="ph:arrow-square-in-bold"
                        class="w-4 h-4 rotate-90"
                    />
                    <span>{{ extractHourAndMinute(data?.clock_in) }}</span>
                </div>
                <div
                    v-if="data?.clock_out"
                    class="inline-flex gap-1 items-center pill pill--orange"
                >
                    <Icon
                        name="ph:arrow-square-out-bold"
                        class="w-4 h-4"
                    />
                    <span>{{ extractHourAndMinute(data?.clock_out) }}</span>
                </div>
            </div>
            <div
                v-else
            >
                <div
                    v-if="timeNow > extractHourAndMinute(shift.start_at)"
                    class="inline-flex gap-1 items-center bg-orange-500 text-white px-2 py-1 rounded animate-bounce"
                >
                    <Icon
                        name="material-symbols:warning"
                        class="w-4 h-4"
                    />
                    Please clock in
                </div>
                <div
                    v-else
                    class="text-[0.9em] italic opacity-50"
                >
                    Shift starts at {{ extractHourAndMinute(shift.start_at) }}
                </div>
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
    },
    basic: {
        type: Boolean,
        default: false
    }
})

const { data } = await useFetch('/api/homebase-timecard', { query: { timecardId: props.shift.timecard_id } })

const hasClockedInOrOut = computed(() => {
    return data.value?.clock_in || data.value?.clock_out
})

const { extractHourAndMinute } = useDateUtils()

const user = computed(() => {
    if (!props.shift.user_id) return null
    return teamStore.getUserByHomebaseId(props.shift.user_id)
})

const today = new Date()

const timeNow = extractHourAndMinute(today)

const wrapperClasses = computed(() => {
    return props.basic ? 'text-[0.7em]' : null
})

// console.log(props)
// console.log('timecard data', data.value)

</script>