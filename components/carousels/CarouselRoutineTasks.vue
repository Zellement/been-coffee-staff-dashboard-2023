<template>
    <div v-if="hasTasks" class="relative">
        <div class="container flex w-full flex-row justify-between">
            <h2 class="h1">
                Routine Tasks
                <span class="-mt-4 block text-[0.6em]"
                    >due in next two weeks</span
                >
            </h2>
            <nuxt-link
                class="button mt-auto flex flex-row items-center gap-1 p-0.5 px-1"
                to="https://docs.google.com/spreadsheets/d/18Tu9U7rRqUqaleWY1tVYO9N1ObqAwvEKmWIv_tB7yjk/edit?usp=sharing"
                external
                target="_blank"
            >
                View history
                <Icon
                    name="iconamoon:link-external-fill"
                    class="h-3 w-3 transition-all duration-300 hover:rotate-90"
                />
            </nuxt-link>
        </div>
        <carousel-wrapper class="pt-2">
            <template v-for="task in overdueTasks" :key="task.value">
                <card-routine-task type="overdue" :task="task" />
            </template>
            <template v-for="task in newTasks" :key="task.value">
                <card-routine-task type="new" :task="task" />
            </template>
            <template v-for="task in upcomingTasks" :key="task.value">
                <card-routine-task type="upcoming" :task="task" />
            </template>
        </carousel-wrapper>
        <div
            v-if="!basic"
            class="container flex w-full flex-row items-center justify-end gap-2"
        >
            <nuxt-link
                v-if="!basic"
                class="button mt-auto"
                to="/forms/routine-tasks"
            >
                Complete a task
            </nuxt-link>
            <nuxt-link class="button" to="/all-routine-tasks">
                View all
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
defineProps({
    basic: Boolean
})
const routineTasksStore = useRoutineTasksStore()

const today = new Date()

const futureDate = new Date(today)
futureDate.setDate(futureDate.getDate() + 7)

const routineTasks = computed(() =>
    Array.isArray(routineTasksStore.routineTasks)
        ? routineTasksStore.routineTasks
        : []
)

const upcomingTasks = computed(() => {
    if (!routineTasks.value) return []
    return routineTasks.value?.filter((task) => {
        const dueDate = task.next_due_date ? new Date(task.next_due_date) : null
        return dueDate !== null && dueDate > today && dueDate <= futureDate
    })
})

const newTasks = computed(() => {
    if (!routineTasks.value) return []
    return routineTasks.value?.filter((task) => {
        return task.next_due_date === null
    })
})

const overdueTasks = computed(() => {
    if (!routineTasks.value) return []
    return routineTasks.value?.filter((task) => {
        const dueDate = task.next_due_date ? new Date(task.next_due_date) : null
        return dueDate !== null && dueDate < today
    })
})

const hasTasks = computed(() => {
    return (
        overdueTasks.value.length > 0 ||
        newTasks.value.length > 0 ||
        upcomingTasks.value.length > 0
    )
})
</script>
