<template>
    <Transition name="fade">
        <div
            v-if="shift"
            class="flex gap-2 md:gap-8 w-full justify-between items-center text-lg relative"
            :class="[wrapperClasses, wrapperClockedOutClasses]"
        >
            <span
                class="flex gap-2 items-center"
                :class="userClasses"
            >
                <img
                    v-if="user && user.image"
                    :src="$urlFor(user.image?.asset).width(120).height(120).url()"
                    height="32"
                    width="32"
                    loading="lazy"
                    class="hexagon-clip rounded-full self-center flex-grow-0 flex-shrink-0"
                >
                <div
                    v-else
                    loading="lazy"
                    class="rounded-full self-center size-8 flex-grow-0 flex-shrink-0 bg-navy-900"
                />
                <div class="flex flex-col md:flex-row w-full">
                    <span class="flex whitespace-nowrap md:basis-1/2 text-sm md:text-base">
                        {{ shift.first_name }}
                    </span>
                    <div class="flex text-xs md:text-base md:basis-1/2">
                        <span>{{ extractHourAndMinute(shift.start_at) }}</span>
                        <span>-</span>
                        <span>{{ extractHourAndMinute(shift.end_at) }}</span>
                    </div>
                </div>
            </span>
            <span
                v-if="!basic"
                class="flex-1 flex items-center basis-1/12 relative"
            >
                <Icon
                    v-if="data?.labor?.unpaid_break_hours > 0"
                    name="ph:armchair-fill"
                    class="w-6 h-6  "
                />
                <Icon
                    v-else-if="shift?.labor?.scheduled_regular > 6"
                    name="ph:armchair-thin"
                    class="w-6 h-6"
                />
            </span>
            <!-- <span class="flex-1 flex">
            <span class="pill self-start">{{ shift.role }}</span>
        </span> -->
            <div
                v-if="!basic"
                class="flex-1 basis-4/12 text-xs md:text-base"
            >
                <div
                    v-if="hasClockedInOrOut"
                    class="flex gap-2 md:gap-8"
                >
                    <div
                        v-if="data?.clock_in"
                        class="inline-flex relative gap-1 items-center pill pill--clockin pill-xs md:pill--base"
                    >
                        <Icon
                            v-if="extractHourAndMinute(data?.clock_in) > extractHourAndMinute(shift.start_at)"
                            name="material-symbols:assignment-late"
                            class="absolute top-0 left-0 w-4 h-4 text-orange-400 -translate-x-2/3 -translate-y-2/3"
                        />
                        <Icon
                            name="ph:arrow-square-in-bold"
                            class="w-4 h-4 rotate-90"
                        />
                        <span>{{ extractHourAndMinute(data?.clock_in) }}</span>
                    </div>

                    <div
                        v-if="data?.clock_in && !data?.clock_out && timeNow > extractHourAndMinute(shift.end_at)"
                        class="inline-flex gap-1 items-center pill  pill-xs md:pill--base pill--urgent animate-bounce"
                    >
                        <span class="text-xs tracking-tighter">Not Clocked Out</span>
                    </div>
                    <div
                        v-if="data?.clock_out"
                        class="inline-flex gap-1 items-center pill pill--orange pill-xs md:pill--base"
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
                        v-if="timeNow > extractHourAndMinute(shift.end_at)"
                        class="text-[0.9em] italic opacity-50"
                    >
                        No show
                    </div>
                    <div
                        v-else-if="timeNow > extractHourAndMinute(shift.start_at)"
                        class="inline-flex md:text-base text-xs gap-1 items-center bg-gradient-to-b from-red-700 to-red-800 text-red-300 px-2 py-1 rounded animate-bounce"
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
                        Starts: {{ extractHourAndMinute(shift.start_at) }}
                    </div>
                </div>
            </div>
        </div>
    </Transition>
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
    },
    isTomorrow: {
        type: Boolean,
        default: false,
        required: false
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

const wrapperClockedOutClasses = computed(() => {
    return data?.value?.clock_out ? ' opacity-30' : (noShow.value && !props.isTomorrow) ? 'opacity-30' : null
})

const userClasses = computed(() => {
    return props.basic ? 'basis-full' : 'basis-5/12 md:basis-7/12 '
})

const noShow = computed(() => {
    return timeNow > extractHourAndMinute(props.shift.end_at)
})

</script>
