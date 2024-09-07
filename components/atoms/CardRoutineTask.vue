<template>
    <li
        :key="task.value"
        class="flex flex-col  w-1/4 min-w-[100px] items-start gap-2 p-4 pt-6 scroll-pt-6 bg-white shadow-lg card mr-4 relative"
    >
        <span class="text-xs absolute top-0 -translate-y-1/2 left-0 ml-2">
            <span
                class="pill "
                :class="pillColour(task.next_due_date)"
            >
                {{ task.next_due_date !== null ? `Due:  ${shortDateConverter(task.next_due_date)}` : 'New' }}
            </span>
        </span>
        {{ task.name }}
        <button
            class="uppercase text-2xs flex items-center gap-1"
            @click="toggleMore"
        >
            Toggle more info
            <div
                class="relative flex w-3 h-3"
            >
                <Icon
                    v-if="showMore"
                    name="mdi:minus"
                    class="absolute top-0flex w-3 h-3 transition-all"
                />
                <Icon
                    v-else
                    name="mdi:plus"
                    class="absolute top-0flex w-3 h-3 transition-all"
                />
            </div>
        </button>
        <div
            v-if="showMore"
            class="flex flex-col gap-4"
        >
            <div class="text-xs">
                <Icon
                    name="material-symbols:info"
                    class="w-4 h-4"
                /> {{ task.description }}
            </div>
            <nuxt-link
                v-if="task.ref_link"
                :to="task.ref_link"
                class="text-xs underline"
            >
                Read more &raquo;
            </nuxt-link>

            <div
                class="text-xs flex flex-col"
            >
                <strong>Frequency</strong>
                <span class="flex gap-1 items-center">
                    <Icon
                        name="mdi:repeat"
                        class="w-3 h-3  "
                    />
                    <span>{{ task.frequency }} days</span>
                </span>
            </div>
            <div
                v-if="task.last_completed_date"
                class="text-xs flex flex-col"
            >
                <strong>Last completed</strong> {{ shortDateConverter(task.last_completed_date) }}
            </div>
        </div>
        <!-- {{ task.next_due_date }} -->
    </li>
</template>

<script setup>

const { shortDateConverter } = useDateUtils()

defineProps({
    task: {
        type: Object,
        required: true
    }
})

const showMore = ref(false)

const toggleMore = () => {
    showMore.value = !showMore.value
}

const pillColour = (date) => {
    const thisDate = new Date(date)
    const nextSevenDays = new Date()
    nextSevenDays.setDate(nextSevenDays.getDate() + 7)

    if (thisDate > nextSevenDays) return

    return 'pill--urgent'
}
</script>
