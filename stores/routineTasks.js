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
                console.log(supabaseData[task.value])
                const data = {
                    ...task,
                    last_completed_date: supabaseData[task.value]
                }

                finalData.push(data)
            })

            this.routineTasks = finalData
            this.loading = false
        }
    }
})
