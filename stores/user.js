import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: null
    }),
    actions: {
        async setUserData () {
            const client = useSupabaseClient()
            const { data } = await client
                .from('profiles')
                .select('display_name, till_pin, payslip_dir')
            this.userData = data[0]
        }
    }
})
