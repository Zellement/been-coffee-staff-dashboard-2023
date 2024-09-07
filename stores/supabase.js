import { defineStore } from 'pinia'

export const useSupabaseStore = defineStore('supabase', {
    state: () => ({
        loading: false,
        daily_temperatures: null,
        daily_temperatures_time: null,
        daily_cash_breakdown: null,
        daily_cash_breakdown_time: null
    }),
    getters: {
        getDailyTemperaturesTime () {
            return new Date(this.daily_temperatures_time).toTimeString().slice(0, 5)
        },
        getDailyCashBreakdownTime () {
            return new Date(this.daily_cash_breakdown_time).toTimeString().slice(0, 5)
        },
        getTotalIncompleteChecks () {
            let total = 0
            if (!this.daily_temperatures) { total++ }
            if (!this.daily_cash_breakdown) { total++ }
            return total
        }
    },
    actions: {
        async fetchAllChecks () {
            this.loading = true
            const client = useSupabaseClient()
            const { data } = await client.from('checks').select('*')
            this.daily_temperatures = data[0].daily_temperatures
            this.daily_temperatures_time = data[0].daily_temperatures_time
            this.daily_cash_breakdown = data[0].daily_cash_breakdown
            this.daily_cash_breakdown_time = data[0].daily_cash_breakdown_time
            this.loading = false
            return data
        },
        async setCheck (check, value) {
            this.loading = true
            this[check] = value
            const client = useSupabaseClient()
            await client
                .from('checks')
                .update({ [check]: value })
                .eq('id', 1)
            this.loading = false
        },
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
