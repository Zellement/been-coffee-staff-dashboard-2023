<template>
    <li class="card w-64 min-w-64">
        <span class="absolute left-0 top-0 ml-2 -translate-y-1/2 text-xs">
            <span class="pill" :class="pillClasses">
                {{
                    task.next_due_date !== null
                        ? `Due:  ${shortDateConverter(task.next_due_date)}`
                        : 'New'
                }}
            </span>
        </span>
        {{ task.title }}
        <span v-if="task.staff" class="pill">
            <Icon name="material-symbols:person-shield" class="" />
            {{ task.staff }} only
        </span>
        <span class="text-2xs opacity-80">
            Estimated: {{ task.estimate }} mins
        </span>

        <single-accordion title="Toggle more info">
            <div class="flex flex-col gap-4">
                <div class="text-xs">
                    <Icon name="material-symbols:info" class="h-4 w-4" />
                    {{ task.description }}
                </div>
                <nuxt-link
                    v-if="task.ref_link"
                    :to="task.ref_link"
                    class="text-xs underline"
                >
                    Read more &raquo;
                </nuxt-link>

                <div class="flex flex-col text-xs">
                    <strong>Frequency</strong>
                    <span class="flex items-center gap-1">
                        <Icon name="mdi:repeat" class="h-3 w-3" />
                        <span>{{ task.frequency }} days</span>
                    </span>
                </div>
                <div
                    v-if="task.last_completed_date"
                    class="flex flex-col text-xs"
                >
                    <strong>Last completed</strong>
                    {{ shortDateConverter(task.last_completed_date) }}
                </div>
            </div>
        </single-accordion>

        <div
            v-if="
                userStore?.userData?.keyholder &&
                userStore?.userData?.display_name !== 'Willington Shop'
            "
            class="ml-auto mt-auto"
        >
            <form ref="routineTasksForm" @submit.prevent="submitToGoogleSheets">
                <input
                    type="hidden"
                    :value="userStore?.userData?.display_name"
                    name="Team member"
                />
                <input type="hidden" value="I completed this task" name="Who" />
                <input type="hidden" :value="task.value.current" name="Task" />
                <input
                    type="hidden"
                    name="Completed satisfactorily"
                    value="Yes, this was satisfactory"
                />
                <input
                    type="hidden"
                    name="Comments"
                    value="This was a quick completion"
                />
                <div class="grid grid-cols-1 overflow-hidden">
                    <button
                        :class="quickCompleteBtn"
                        class="button button--xs col-span-1 col-start-1 row-start-1"
                        @click.prevent="taskQuickStatus = 'set'"
                    >
                        Quick Complete
                    </button>
                    <button
                        :class="completeBtn"
                        class="button button--xs col-span-1 col-start-1 row-start-1 text-center"
                    >
                        <span class="mx-auto"> Complete?</span>
                    </button>
                    <span
                        v-if="state.isSending"
                        class="pill col-span-1 col-start-1 row-start-1 flex"
                    >
                        Please wait...
                        <Icon
                            name="mdi:loading"
                            class="ml-auto h-4 w-4 animate-spin"
                        />
                    </span>
                    <span
                        v-if="state.hasSent"
                        class="pill pill--complete col-span-1 col-start-1 row-start-1 flex"
                    >
                        Complete
                        <Icon name="ic:twotone-check" class="ml-auto h-4 w-4" />
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
    return taskQuickStatus.value === 'ready' &&
        !state.isSending &&
        !state.hasSent
        ? ''
        : '-translate-y-full'
})

const completeBtn = computed(() => {
    return taskQuickStatus.value === 'set' && !state.isSending && !state.hasSent
        ? ''
        : 'translate-y-full'
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
    const field = formData.get('Task')
    state.isSending = true
    state.hasSent = false
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(async () => {
            await routineTasksStore.setRoutineTask(field)
            state.isSending = false
            state.hasSent = true
        })
        .catch((error) => console.error('Error!', error.message))
}
</script>
