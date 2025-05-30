<template>
    <Transition name="fade">
        <div
            v-if="shift"
            class="relative flex w-full items-center justify-between gap-2 md:gap-8"
            :class="[wrapperClockedOutClasses]"
        >
            <div class="flex w-full grow items-center justify-between gap-4">
                <span
                    class="flex w-full grow basis-5/12 items-center justify-between gap-2 md:basis-7/12"
                >
                    <div v-if="user && user.image" class="relative">
                        <img
                            :src="
                                $urlFor(user.image).width(32).height(32).url()
                            "
                            height="32"
                            width="32"
                            loading="lazy"
                            class="hexagon-clip flex-shrink-0 flex-grow-0 self-center rounded-full"
                        />

                        <Icon
                            v-if="user.role === 'Manager'"
                            name="gravity-ui:chevrons-up"
                            class="absolute right-0 top-0 z-10 translate-x-1 rounded bg-gradient-to-br from-tuscany-500 to-tuscany-600 p-px text-white"
                            size="12"
                        />

                        <Icon
                            v-else-if="user.managerKeyHolder"
                            name="gravity-ui:chevrons-up"
                            class="absolute right-0 top-0 z-10 translate-x-1 rounded bg-gradient-to-br from-butterscotch-500 to-butterscotch-600 p-px text-navy"
                            size="12"
                        />
                    </div>
                    <div
                        v-else
                        loading="lazy"
                        class="size-8 flex-shrink-0 flex-grow-0 self-center rounded-full bg-navy-900"
                    />
                    <div class="flex w-full flex-col md:flex-row">
                        <span class="flex whitespace-nowrap md:basis-1/2">
                            {{ shift.first_name }}
                        </span>
                        <div class="flex md:basis-1/2">
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
                <span class="relative flex w-6 items-center">
                    <Icon
                        v-if="shiftData?.labor?.unpaid_break_hours > 0"
                        name="ph:armchair-fill"
                        class="h-6 w-6"
                    />
                    <Icon
                        v-else-if="shift?.labor?.scheduled_regular > 6"
                        name="ph:armchair-thin"
                        class="h-6 w-6"
                    />
                </span>
            </div>
            <div class="shrink-0 basis-2/5">
                <Transition name="slide-fade">
                    <div v-if="shiftData" class="flex-1 basis-4/12">
                        <div
                            v-if="hasClockedInOrOut"
                            class="flex gap-2 md:gap-8"
                        >
                            <div
                                v-if="shiftData?.clock_in"
                                class="pill pill--clockin pill-xs md:pill--sm relative inline-flex items-center gap-1"
                            >
                                <Icon
                                    v-if="
                                        extractHourAndMinute(
                                            shiftData?.clock_in
                                        ) > extractHourAndMinute(shift.start_at)
                                    "
                                    name="material-symbols:assignment-late"
                                    class="absolute left-0 top-0 h-4 w-4 -translate-x-2/3 -translate-y-2/3 text-orange-400"
                                />
                                <Icon
                                    name="ph:arrow-square-in-bold"
                                    class="h-4 w-4 rotate-90"
                                />
                                <span>{{
                                    extractHourAndMinute(shiftData?.clock_in)
                                }}</span>
                            </div>
                            <div
                                v-if="
                                    shiftData?.clock_in &&
                                    !shiftData?.clock_out &&
                                    timeNow > extractHourAndMinute(shift.end_at)
                                "
                                class="pill pill-xs md:pill--sm pill--urgent inline-flex animate-bounce items-center gap-1"
                            >
                                <span class="text-xs tracking-tighter"
                                    >Not Clocked Out</span
                                >
                            </div>

                            <div
                                v-if="shiftData?.clock_out"
                                class="pill pill--orange pill-xs md:pill--sm inline-flex items-center gap-1"
                            >
                                <Icon
                                    name="ph:arrow-square-out-bold"
                                    class="h-4 w-4"
                                />
                                <span>{{
                                    extractHourAndMinute(shiftData?.clock_out)
                                }}</span>
                            </div>
                        </div>

                        <div v-else>
                            <div
                                v-if="
                                    timeNow > extractHourAndMinute(shift.end_at)
                                "
                                class="text-[0.9em] italic opacity-50"
                            >
                                No show
                            </div>
                            <div
                                v-else-if="
                                    timeNow >
                                    extractHourAndMinute(shift.start_at)
                                "
                                class="inline-flex animate-bounce items-center gap-1 rounded bg-gradient-to-b from-red-700 to-red-800 px-2 py-1 text-xs text-red-300 md:text-base"
                            >
                                <Icon
                                    name="material-symbols:warning"
                                    class="h-4 w-4"
                                />
                                Please clock in
                            </div>
                            <div
                                v-else
                                class="items-center text-[0.9em] italic opacity-50"
                            >
                                <Icon name="bx:arrow-to-right" />
                                Starts:
                                {{ extractHourAndMinute(shift.start_at) }}
                            </div>
                        </div>
                    </div>
                </Transition>
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
    }
})

const shiftData = ref(null)

onMounted(async () => {
    try {
        const { data } = await useFetch('/api/homebase-timecard', {
            query: { timecardId: props.shift.timecard_id }
        })
        shiftData.value = data.value
    } catch (error) {
        console.error('Error fetching shifts:', error)
    }
})

const hasClockedInOrOut = computed(() => {
    return shiftData.value?.clock_in || shiftData.value?.clock_out
})

const { extractHourAndMinute } = useDateUtils()

const user = computed(() => {
    if (!props.shift.user_id) return null
    return teamStore.getUserByHomebaseId(props.shift.user_id)
})

const today = new Date()

const timeNow = extractHourAndMinute(today)

const wrapperClockedOutClasses = computed(() => {
    return shiftData?.value?.clock_out
        ? ' opacity-30'
        : noShow.value
          ? 'opacity-30'
          : null
})

const noShow = computed(() => {
    return timeNow > extractHourAndMinute(props.shift.end_at)
})
</script>
