<template>
    <li
        class="w-64 min-w-64 card"
    >
        <span class="text-xs absolute top-0 -translate-y-1/2 left-0 ml-2">
            <span
                class="pill"
                :class="pillClasses"
            >
                {{ task.next_due_date !== null ? `Due:  ${shortDateConverter(task.next_due_date)}` : 'New' }}
            </span>
        </span>
        {{ task.title }}
        <span class="text-2xs opacity-80">Estimated: {{ task.estimate }} mins</span>
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
        <div
            v-if="userStore?.userData?.keyholder && userStore?.userData?.display_name !== 'Willington Shop'"
            class="ml-auto mt-auto"
        >
            <form
                ref="routineTasksForm"
                @submit.prevent="submitToGoogleSheets"
            >
                <input
                    type="hidden"
                    :value="userStore?.userData?.display_name"
                    name="Team member"
                >
                <input
                    type="hidden"
                    value="I completed this task"
                    name="Who"
                >
                <input
                    type="hidden"
                    :value="task.value.current"
                    name="Task"
                >
                <input
                    type="hidden"
                    name="Completed satisfactorily"
                    value="Yes, this was satisfactory"
                >
                <input
                    type="hidden"
                    name="Comments"
                    value="This was a quick completion"
                >
                <div class="grid grid-cols-1 overflow-hidden">
                    <button
                        :class="quickCompleteBtn"
                        class="row-start-1 button button--xs col-span-1 col-start-1"
                        @click.prevent="taskQuickStatus = 'set'"
                    >
                        Quick Complete
                    </button>
                    <button
                        :class="completeBtn"
                        class="row-start-1 button button--xs col-span-1 col-start-1 text-center"
                    >
                        <span class="mx-auto"> Complete?</span>
                    </button>
                    <span
                        v-if="state.isSending"
                        class="
                        row-start-1 pill flex col-span-1 col-start-1"
                    >
                        Please wait...
                        <Icon
                            name="mdi:loading"
                            class="w-4 h-4 animate-spin ml-auto"
                        />
                    </span>
                    <span
                        v-if="state.hasSent"
                        class="
                        row-start-1 pill pill--complete flex col-span-1 col-start-1"
                    >
                        Complete
                        <Icon
                            name="ic:twotone-check"
                            class="w-4 h-4 ml-auto"
                        />
                    </span>
                </div>
            </form>
        </div>
    </li>
</template>

<script setup>

const routineTasksStore = useRoutineTasksStore()
const { shortDateConverter } = useDateUtils()

const state = reactive({
    isSending: false,
    hasSent: false,
    hasErrored: false
})
const runtimeConfig = useRuntimeConfig()

const scriptURL = runtimeConfig.public.GOOGLE_SHEETS_SCRIPT_ROUTINE_TASKS

const userStore = useUserStore()
const props = defineProps({
    task: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

const taskQuickStatus = ref('ready')

const quickCompleteBtn = computed(() => {
    return taskQuickStatus.value === 'ready' && !state.isSending && !state.hasSent ? '' : '-translate-y-full'
})

const completeBtn = computed(() => {
    return taskQuickStatus.value === 'set' && !state.isSending && !state.hasSent ? '' : 'translate-y-full'
})

const showMore = ref(false)

const routineTasksForm = ref()

const toggleMore = () => {
    showMore.value = !showMore.value
}

const pillClasses = computed(() => {
    switch (props.type) {
    case 'new':
        return 'pill--complete'
    case 'overdue':
        return 'pill--urgent'
    case 'upcoming':
        return 'pill--upcoming'
    }
})

const submitToGoogleSheets = () => {
    const formData = new FormData(routineTasksForm.value)
    console.log(formData)
    const field = formData.get('Task')
    state.isSending = true
    state.hasSent = false
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(async () => {
            await routineTasksStore.setRoutineTask(field)
            state.isSending = false
            state.hasSent = true
        })
        .catch(error => console.error('Error!', error.message))
}

</script>
