import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: null,
        keyholderLayout: null
    }),
    actions: {
        async setUserData() {
            const client = useSupabaseClient()
            const { data } = await client
                .from('profiles')
                .select('display_name, till_pin, payslip_dir, keyholder')
            this.userData = data[0]
            console.log(data)
            this.keyholderLayout = data[0].keyholder
        },
        toggleKeyholderLayout(value) {
            this.keyholderLayout = value ?? !this.keyholderLayout
        }
    }
})
