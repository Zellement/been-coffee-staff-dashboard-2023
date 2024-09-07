import { defineStore } from 'pinia'
import routineTasksFixedData from '@/data/routine_tasks.json'

export const useRoutineTasksStore = defineStore('routineTasks', {
    state: () => ({
        routineTasks: {},
        loading: false
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
        },
        async fetchAllRoutineTasks () {
            this.loading = true
            const client = useSupabaseClient()
            const { data, error } = await client
                .from('routine_tasks')
                .select('*')
                .eq('id', 1)
            if (error) {
                console.error(error)
                this.loading = false
                return
            }

            const supabaseData = data[0]

            const finalData = []

            routineTasksFixedData.forEach((task) => {
                let lastCompletedDate = null
                if (supabaseData[task.value] !== null) {
                    lastCompletedDate = new Date(supabaseData[task.value])
                }
                let nextDueDate = null
                if (lastCompletedDate !== null) {
                    nextDueDate = new Date(lastCompletedDate)
                    nextDueDate.setDate(nextDueDate.getDate() + task.frequency)
                }

                const data = {
                    ...task,
                    next_due_date: nextDueDate,
                    last_completed_date: supabaseData[task.value]
                }

                finalData.push(data)
            })

            finalData.sort((a, b) => { return a.next_due_date - b.next_due_date })

            this.routineTasks = finalData
            this.loading = false
        }
    }
})
