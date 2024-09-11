<template>
    <div class="flex flex-col w-full container  mx-auto pb-20">
        <h1 class="mb-8 h1">
            All Routine Tasks
        </h1>
        <ul class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <li
                v-for="task in routineTasksOrdered"
                :key="task.id"
                class="card"
            >
                <span class="dark:text-butterscotch-500 text-lg font-krete">{{ task.name }}</span>
                <span class="text-2xs opacity-70">Estimated: {{ task.estimate }} mins</span>
                <div class="">
                    <Icon
                        name="material-symbols:info"
                        class="w-4 h-4"
                    /> {{ task.description }}
                </div>
                <nuxt-link
                    v-if="task.ref_link"
                    :to="task.ref_link"
                    class=" underline text-tuscany-500"
                >
                    Read more &raquo;
                </nuxt-link>

                <div class="flex gap-1 items-center">
                    <Icon
                        name="mdi:repeat"
                        class="w-4 h-4"
                    />
                    <span>Every {{ task.frequency }} days</span>
                </div>
                <div
                    v-if="task.last_completed_date"
                    class=" flex flex-col"
                >
                    <strong>Last completed</strong> {{ shortDateConverter(task.last_completed_date) }}
                </div>
                <div
                    v-else
                    class="flex flex-col"
                >
                    <strong class="text-green-500">New task</strong>
                </div>
                <div
                    v-if="task.next_due_date"
                    class=" flex flex-col"
                >
                    <strong>Next due</strong> {{ shortDateConverter(task.next_due_date) }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
const routineTasksStore = useRoutineTasksStore()

const routineTasks = computed(() => Array.isArray(routineTasksStore.routineTasks) ? routineTasksStore.routineTasks : [])

const routineTasksOrdered = computed(() => {
    return routineTasks.value.slice().sort((a, b) => {
        console.log(a.name, b.name)
        return a.name.localeCompare(b.name)
    })
})

useHead({
    title: 'All Routine Tasks'
})

</script>
