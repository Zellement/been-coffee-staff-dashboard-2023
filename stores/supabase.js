import { defineStore } from 'pinia'

export const useSupabaseStore = defineStore('supabase', {
    state: () => ({
        temperatureChecks: null
    }),
    actions: {
        async fetchAllChecks () {
            const client = useSupabaseClient()
            const { data } = await client.from('checks').select()

            this.temperatureChecks = data[0].daily_temperatures
            return data
        }
    }
})
