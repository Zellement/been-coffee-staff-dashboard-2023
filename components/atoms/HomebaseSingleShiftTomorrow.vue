<template>
    <Transition name="fade">
        <div
            v-if="shift"
            class="@container relative flex w-full items-center justify-between"
        >
            <div class="flex basis-1/4 flex-row items-center gap-2">
                <div class="@xs:flex hidden">
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
                        class="hexagon-clip shrink-0 flex-grow-0 self-start rounded-full"
                    />
                    <div
                        v-else
                        loading="lazy"
                        class="size-8 shrink-0 flex-grow-0 self-start rounded-full bg-navy-900"
                    />
                </div>
                <span class="flex basis-1/2 whitespace-nowrap">
                    {{ shift.first_name }}
                </span>
            </div>
            <div class="flex grow basis-1/2 text-left">
                <span>{{ extractHourAndMinute(shift.start_at) }}</span>
                <span>-</span>
                <span>{{ extractHourAndMinute(shift.end_at) }}</span>
            </div>
            <div class="pill" :class="getPillClass(shift.role)">
                {{ shift.role }}
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

const { data } = await useFetch('/api/homebase-timecard', {
    query: { timecardId: props.shift.timecard_id }
})

const hasClockedInOrOut = computed(() => {
    return data.value?.clock_in || data.value?.clock_out
})

const { extractHourAndMinute } = useDateUtils()

const user = computed(() => {
    if (!props.shift.user_id) return null
    return teamStore.getUserByHomebaseId(props.shift.user_id)
})

const getPillClass = (role) => {
    switch (role) {
        case 'Open':
            return 'pill--open'
        case 'Soft Close':
        case 'Close':
            return 'pill--close'
        case 'Barista':
            return 'pill--barista'
        case 'Support':
            return 'pill--support'
        case 'Admin':
        case 'Mixed':
            return 'pill--admin'
        default:
            return ''
    }
}
</script>
