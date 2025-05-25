<template>
    <Transition name="fade">
        <div
            v-if="shift"
            class="relative flex w-full items-center justify-between @container"
        >
            <div class="flex basis-1/4 flex-row items-center gap-2">
                <div class="hidden @xs:flex">
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
