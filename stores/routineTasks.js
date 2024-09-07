import { defineStore } from 'pinia'

export const useRoutineTasksStore = defineStore('routineTasks', {
    state: () => ({
    }),
    getters: {
    },
    actions: {
        async setRoutineTask (check) {
            this.loading = true
            const dateTime = new Date()
            const client = useSupabaseClient()
            await client
                .from('routine_tasks')
                .update({ [check]: dateTime })
                .eq('id', 1)
            this.loading = false
        }
    }
})
