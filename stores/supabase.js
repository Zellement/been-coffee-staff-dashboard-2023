import { defineStore } from 'pinia'

export const useSupabaseStore = defineStore('supabase', {
    state: () => ({
        loading: false,
        daily_temperatures: null
    }),
    actions: {
        async fetchAllChecks () {
            this.loading = true
            const client = useSupabaseClient()
            const { data } = await client.from('checks').select('*')
            this.daily_temperatures = data[0].daily_temperatures
            this.loading = false
            return data
        },
        async setCheck (check, value) {
            this.loading = true
            this[check] = value
            const client = useSupabaseClient()
            const { data, error } = await client
                .from('checks')
                .update({ [check]: value })
                .eq('id', 1)

            this.loading = false
        }
    }
})
