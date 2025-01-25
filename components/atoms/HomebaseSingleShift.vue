<template>
    <div class="relative grid">
        <Transition name="fade">
            <div
                v-if="!timecardData"
                class="col-span-full col-start-1 row-start-1"
            >
                <div class="flex animate-pulse items-center gap-2">
                    <span
                        class="hexagon-clip hexagon-clip flex size-8 flex-shrink-0 flex-grow-0 self-center rounded-full bg-white/10"
                    >
                        <Icon
                            name="ph:spinner-gap-light"
                            class="m-auto animate-spin text-lg"
                        />
                    </span>
                    <span class="text-xs italic opacity-50"> Loading ... </span>
                </div>
            </div>
        </Transition>
        <Transition name="fade">
            <div
                v-if="timecardData"
                class="relative col-span-full col-start-1 row-start-1 flex w-full items-center justify-between gap-2 text-lg md:gap-8"
                :class="[wrapperClasses, wrapperClockedOutClasses]"
            >
                <span class="flex items-center gap-2" :class="userClasses">
                    <img
                        v-if="user && user.image"
                        :src="
                            $urlFor(user.image?.asset)
                                .width(120)
                                .height(120)
                                .url()
                        "
                        height="32"
                        width="32"
                        loading="lazy"
                        class="hexagon-clip flex-shrink-0 flex-grow-0 self-center rounded-full"
                    />
                    <div
                        v-else
                        loading="lazy"
                        class="size-8 flex-shrink-0 flex-grow-0 self-center rounded-full bg-navy-900"
                    />
                    <div class="flex w-full flex-col md:flex-row">
                        <span
                            class="flex whitespace-nowrap text-sm md:basis-1/2 md:text-base"
                        >
                            {{ shift.first_name }}
                        </span>
                        <div class="flex text-xs md:basis-1/2 md:text-base">
                            <span>{{
                                extractHourAndMinute(shift.start_at)
                            }}</span>
                            <span>-</span>
                            <span>{{
                                extractHourAndMinute(shift.end_at)
                            }}</span>
                        </div>
                    </div>
                </span>
                <span
                    v-if="!basic"
                    class="relative flex flex-1 basis-1/12 items-center"
                >
                    <Icon
                        v-if="timecardData?.labor?.unpaid_break_hours > 0"
                        name="ph:armchair-fill"
                        class="h-6 w-6"
                    />
                    <Icon
                        v-else-if="shift?.labor?.scheduled_regular > 6"
                        name="ph:armchair-thin"
                        class="h-6 w-6"
                    />
                </span>
                <div
                    v-if="!basic"
                    class="flex-1 basis-4/12 text-xs md:text-base"
                >
                    <div class="flex gap-2 md:gap-8">
                        <!-- Is active/current shift -->
                        <div
                            v-if="shiftCurrent"
                            class="pill pill--clockin pill-xs md:pill--base relative inline-flex items-center gap-1"
                        >
                            <Icon
                                v-if="shiftStartedLate"
                                name="material-symbols:assignment-late"
                                class="absolute left-0 top-0 size-4 -translate-x-2/3 -translate-y-2/3 text-orange-400"
                            />
                            <Icon
                                name="ph:arrow-square-in-bold"
                                class="size-4 rotate-90"
                            />
                            <span>{{
                                extractHourAndMinute(timecardData?.clock_in)
                            }}</span>
                        </div>

                        <!-- Is normal ended shift, has clocked in and clocked out -->
                        <template v-else-if="shiftNormal">
                            <div
                                class="pill pill--clockin pill-xs md:pill--base relative inline-flex items-center gap-1"
                            >
                                <Icon
                                    v-if="shiftStartedLate"
                                    name="material-symbols:assignment-late"
                                    class="absolute left-0 top-0 size-4 -translate-x-2/3 -translate-y-2/3 text-orange-400"
                                />
                                <Icon
                                    name="ph:arrow-square-in-bold"
                                    class="size-4 rotate-90"
                                />
                                <span>{{
                                    extractHourAndMinute(timecardData?.clock_in)
                                }}</span>
                            </div>
                            <div
                                class="pill pill--orange pill-xs md:pill--base inline-flex items-center gap-1"
                            >
                                <Icon
                                    name="ph:arrow-square-out-bold"
                                    class="size-4"
                                />
                                <span>{{
                                    extractHourAndMinute(
                                        timecardData?.clock_out
                                    )
                                }}</span>
                            </div>
                        </template>

                        <!-- Is late to clock in, current time is after their shift start -->

                        <div
                            v-else-if="shiftLateClockIn"
                            class="pill pill-xs md:pill--base pill--urgent !inline-flex !w-auto animate-bounce gap-1 self-start"
                        >
                            <span class="text-xs tracking-tighter">
                                Please Clock In
                            </span>
                        </div>

                        <!-- Upcoming shift -->

                        <div
                            v-else-if="shiftUpcoming"
                            class="!inline-flex !w-auto gap-1 self-start italic opacity-50"
                        >
                            <span class="text-xs tracking-tighter">
                                Starts:
                                {{ extractHourAndMinute(shift.start_at) }}
                            </span>
                        </div>

                        <!-- Has not clocked out, current time is after their shift end -->

                        <div
                            v-else-if="shiftNotClockedOut"
                            class="pill pill-xs md:pill--base pill--urgent !inline-flex !w-auto animate-bounce gap-1 self-start"
                        >
                            <span class="text-xs tracking-tighter"
                                >Please Clock Out</span
                            >
                        </div>
                    </div>

                    <!-- Has not clocked in, nor clocked out, and the current time is after their shift end -->

                    <!-- <div v-if="hasClockedInOrOut" class="flex gap-2 md:gap-8">
                <template v-if="timecardData?.clock_in && timecardData?.clock_out">
                    <div
                        class="pill pill--orange pill-xs md:pill--base inline-flex items-center gap-1"
                    >
                        <Icon name="ph:arrow-square-out-bold" class="size-4" />
                        <span>{{ extractHourAndMinute(timecardData?.clock_out) }}</span>
                    </div>
                </template>

                <div
                    v-else-if="
                        timecardData?.clock_in &&
                        !timecardData?.clock_out &&
                        timeNow < extractHourAndMinute(shift.end_at)
                    "
                    class="pill pill--clockin pill-xs md:pill--base relative inline-flex items-center gap-1"
                >
                    <Icon
                        v-if="
                            extractHourAndMinute(timecardData?.clock_in) >
                            extractHourAndMinute(shift.start_at)
                        "
                        name="material-symbols:assignment-late"
                        class="absolute left-0 top-0 size-4 -translate-x-2/3 -translate-y-2/3 text-orange-400"
                    />
                    <Icon
                        name="ph:arrow-square-in-bold"
                        class="size-4 rotate-90"
                    />
                    <span>{{ extractHourAndMinute(timecardData?.clock_in) }}</span>
                </div>
            </div>
            <div v-else>
                <div
                    v-if="timeNow > extractHourAndMinute(shift.end_at)"
                    class="text-[0.9em] italic opacity-50"
                >
                    No show
                </div>
                <div
                    v-else-if="timeNow > extractHourAndMinute(shift.start_at)"
                    class="inline-flex animate-bounce items-center gap-1 rounded bg-gradient-to-b from-red-700 to-red-800 px-2 py-1 text-xs text-red-300 md:text-base"
                >
                    <Icon name="material-symbols:warning" class="size-4" />
                    Please clock in
                </div>
                <div v-else class="text-[0.9em] italic opacity-50">
                    Starts: {{ extractHourAndMinute(shift.start_at) }}
                </div>
            </div> -->
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
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

const timecardData = ref()

const fetchData = async () => {
    const { data } = await useFetch('/api/homebase-timecard', {
        query: { timecardId: props.shift.timecard_id }
    })
    timecardData.value = data.value
}

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
    return timecardData?.value?.clock_out
        ? ' opacity-30'
        : shiftNoShow.value && !props.isTomorrow
          ? 'opacity-30'
          : null
})

const userClasses = computed(() => {
    return props.basic ? 'basis-full' : 'basis-5/12 md:basis-7/12 '
})

const shiftStartedLate: ComputedRef<boolean> = computed(() => {
    return (
        extractHourAndMinute(timecardData?.value?.clock_in) >
        extractHourAndMinute(props.shift.start_at)
    )
})

// Shift types

const shiftNormal: ComputedRef<boolean> = computed(() => {
    return timecardData.value?.clock_in && timecardData.value?.clock_out
})

const shiftUpcoming: ComputedRef<boolean> = computed(() => {
    return (
        !timecardData?.value?.clock_in &&
        timeNow < extractHourAndMinute(props.shift?.start_at)
    )
})

const shiftNotClockedOut: ComputedRef<boolean> = computed(() => {
    return (
        timecardData?.value?.clock_in &&
        !timecardData?.value?.clock_out &&
        timeNow > extractHourAndMinute(props.shift?.end_at)
    )
})

const shiftLateClockIn: ComputedRef<boolean> = computed(() => {
    return (
        !timecardData?.value?.clock_in &&
        timeNow > extractHourAndMinute(props.shift?.start_at)
    )
})

const shiftCurrent: ComputedRef<boolean> = computed(() => {
    return (
        timecardData?.value?.clock_in &&
        !timecardData?.value?.clock_out &&
        timeNow < extractHourAndMinute(props.shift?.end_at)
    )
})

const shiftNoShow: ComputedRef<boolean> = computed(() => {
    return (
        !timecardData?.value?.clock_in &&
        !timecardData?.value?.clock_out &&
        timeNow > extractHourAndMinute(props.shift?.end_at)
    )
})

onMounted(async () => {
    fetchData()
})
</script>
