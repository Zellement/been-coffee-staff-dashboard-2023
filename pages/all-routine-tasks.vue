<template>
    <div class="container mx-auto flex w-full flex-col pb-20">
        <h1 class="h1 mb-8">All Routine Tasks</h1>
        <ul
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
            <li v-for="task in routineTasksOrdered" :key="task.id" class="card">
                <span class="font-krete text-lg dark:text-butterscotch-500">{{
                    task.title
                }}</span>
                <span class="text-2xs opacity-70"
                    >Estimated: {{ task.estimate }} mins</span
                >
                <div class="">
                    <Icon name="material-symbols:info" class="h-4 w-4" />
                    {{ task.description }}
                </div>
                <nuxt-link
                    v-if="task.ref_link"
                    :to="task.ref_link"
                    class="text-tuscany-500 underline"
                >
                    Read more &raquo;
                </nuxt-link>

                <div class="flex items-center gap-1">
                    <Icon name="mdi:repeat" class="h-4 w-4" />
                    <span>Every {{ task.frequency }} days</span>
                </div>
                <div v-if="task.last_completed_date" class="flex flex-col">
                    <strong class="text-tuscany-500">Last completed</strong>
                    {{ fullDateConverter(task.last_completed_date) }}
                </div>
                <div v-else class="flex flex-col">
                    <strong class="text-green-500">New task</strong>
                </div>
                <div v-if="task.next_due_date" class="flex flex-col">
                    <strong class="text-tuscany-500">Next due</strong>
                    {{ fullDateConverter(task.next_due_date) }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
const routineTasksStore = useRoutineTasksStore()

const { fullDateConverter } = useDateUtils()

const routineTasks = computed(() =>
    Array.isArray(routineTasksStore.routineTasks)
        ? routineTasksStore.routineTasks
        : []
)

const routineTasksOrdered = computed(() => {
    return routineTasks.value?.slice().sort((a, b) => {
        return a.title.localeCompare(b.title)
    })
})

useHead({
    title: 'All Routine Tasks'
})
</script>
