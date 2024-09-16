<template>
    <div class="flex flex-col w-full max-w-screen-md px-10 pt-0 pb-32 mx-auto">
        <h1 class="mb-8 h1">
            Routine Tasks
        </h1>

        <div
            v-if="state.hasSent"
            class="flex flex-row items-center gap-6 p-4 mb-8 border border-green-500"
        >
            <Icon
                name="noto-v1:party-popper"
                class="w-12 h-12 animate-pulse"
            />
            <div>
                <h2 class="h2">
                    Yeah, we all good!
                </h2>
                <p> All sent, thanks.</p>
                <p class="text-xs">
                    To see the form again, please refresh this page.
                </p>
            </div>
        </div>

        <div
            v-if="state.hasErrored"
            class="flex flex-row items-center gap-6 p-4 mb-8 border border-red-500"
        >
            <Icon
                name="noto:skull-and-crossbones"
                class="w-12 h-12 animate-ping"
            />
            <div>
                <h2 class="h2">
                    Hmmm...
                </h2>
                <p> Looks like something isn't behaving. Please let Dan know pronto.</p>
            </div>
        </div>

        <form
            v-if="!state.isSending && !state.hasSent && !state.hasErrored"
            id="routine-tasks"
            ref="routineTasksForm"
            class="flex flex-col gap-8 routine-tasks-form"
            name="routine-tasks"
            @submit.prevent="submitToGoogleSheets"
        >
            <shift-leads />

            <select
                name="Task"
                required
            >
                <option value="">
                    Which task has been completed?
                </option>
                <option
                    v-for="task in tasks"
                    :key="task.value"
                    :value="task.value"
                    name="Task"
                >
                    {{ task.name }}
                </option>
            </select>
            <div class="flex flex-col gap-1">
                <label class="flex gap-2 items-start">
                    <input
                        v-model="whoCompleted"
                        required
                        type="radio"
                        name="Who"
                        value="I completed this task"
                        class="mt-1.5"
                    >
                    <span>I completed this task personally</span>
                </label>

                <label class="flex gap-2 items-start">
                    <input
                        v-model="whoCompleted"
                        required
                        type="radio"
                        name="Who"
                        value="I oversaw"
                        class="mt-1.5"
                    >
                    <span>I oversaw an employee completing this task:</span>
                </label>
                <select
                    v-if="whoCompleted === 'I oversaw'"
                    class="mt-4"
                    name="I oversaw"
                >
                    <option value="">
                        Who did you oversee?
                    </option>
                    <option
                        v-for="member in currentTeam"
                        :key="member.id"
                        :value="member.name"
                    >
                        {{ member.name }}
                    </option>
                </select>
            </div>

            <textarea
                placeholder="Notes and comments"
                class="h-40"
                name="Comments"
            />

            <label class="flex gap-2 items-center">
                <input
                    required
                    type="checkbox"
                    name="Completed satisfactorily"
                    value="Yes, this was satisfactory"
                >
                <span>
                    This task was completed to my satisfaction</span>
            </label>
            <button
                type="submit"
                class="button"
            >
                Submit this form
            </button>
        </form>
        <div
            v-else-if="state.isSending"
            class=""
        >
            Sending, please wait...
        </div>
    </div>
</template>
<script setup>
import ROUTINE_TASKS from '@/data/routine_tasks.json'

const routineTasksStore = useRoutineTasksStore()
const teamStore = useTeamStore()

const currentTeam = computed(() => {
    return teamStore.currentTeam.sort((a, b) => a.name.localeCompare(b.name))
})
const whoCompleted = ref()

const routineTasksForm = ref()

const runtimeConfig = useRuntimeConfig()

const tasks = computed(() => {
    return ROUTINE_TASKS.sort((a, b) => a.name.localeCompare(b.name))
})

const scriptURL = runtimeConfig.public.GOOGLE_SHEETS_SCRIPT_ROUTINE_TASKS

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
        .catch(error => console.error('Error!', error.message))
}

useHead({
    title: 'Routine Tasks'
})

const state = reactive({
    isSending: false,
    hasSent: false,
    hasErrored: false
})

</script>
