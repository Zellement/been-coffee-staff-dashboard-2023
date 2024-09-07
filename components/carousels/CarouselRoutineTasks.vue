<template>
    <div
        v-if="routineTasks && routineTasks.length > 0"
        class="relative"
    >
        <div class="container flex flex-row justify-between">
            <h2 class="h1">
                Routine Tasks
                <span class="text-[0.6em] block -mt-4">due in next two weeks</span>
            </h2>
            <nuxt-link
                class="button mt-auto"
                to="/forms/routine-tasks"
            >
                Complete a task
            </nuxt-link>
        </div>
        <div class="container ">
            <div
                class="overflow-hidden md:px-4 pt-4 xl:px-6"
            >
                <div class="w-full pt-4 overflow-x-scroll pb-8">
                    <ul class="flex flex-row w-full">
                        <template
                            v-for="task in routineTasks"
                            :key="task.value"
                        >
                            <card-routine-task :task="task" />
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const routineTasksStore = useRoutineTasksStore()

const today = new Date()

const nextTwoWeeks = new Date(today)
nextTwoWeeks.setDate(nextTwoWeeks.getDate() + 14)

const routineTasks = computed(() => {
    return routineTasksStore.routineTasks.filter(task => {
        const dueDate = new Date(task.next_due_date)
        return dueDate > today && dueDate < nextTwoWeeks
    })
})

</script>
