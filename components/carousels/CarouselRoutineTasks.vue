<template>
    <div
        v-if="hasTasks"
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
                            v-for="task in overdueTasks"
                            :key="task.value"
                        >
                            <card-routine-task
                                type="overdue"
                                :task="task"
                            />
                        </template>
                        <template
                            v-for="task in newTasks"
                            :key="task.value"
                        >
                            <card-routine-task
                                type="new"
                                :task="task"
                            />
                        </template>
                        <template
                            v-for="task in upcomingTasks"
                            :key="task.value"
                        >
                            <card-routine-task
                                type="upcoming"
                                :task="task"
                            />
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

const futureDate = new Date(today)
futureDate.setDate(futureDate.getDate() + 7)

const newTasks = computed(() => {
    return routineTasksStore.routineTasks.filter(task => {
        return task.next_due_date === null
    })
})

const upcomingTasks = computed(() => {
    return routineTasksStore.routineTasks.filter(task => {
        const dueDate = task.next_due_date ? new Date(task.next_due_date) : null
        return dueDate !== null && dueDate > today && dueDate <= futureDate
    })
})

const overdueTasks = computed(() => {
    return routineTasksStore.routineTasks.filter(task => {
        const dueDate = task.next_due_date ? new Date(task.next_due_date) : null
        return dueDate !== null && dueDate < today
    })
})

const hasTasks = computed(() => {
    return overdueTasks.value.length > 0 || newTasks.value.length > 0 || upcomingTasks.value.length > 0
})

// const routineTasks = computed(() => {
//     return routineTasksStore.routineTasks.filter(task => {
//         const dueDate = task.next_due_date ? new Date(task.next_due_date) : null
//         return dueDate === null || (dueDate > today && dueDate < upcomingTasksDate)
//     })
// })

</script>
