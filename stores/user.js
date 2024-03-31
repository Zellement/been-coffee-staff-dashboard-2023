import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: null,
        userSanityData: null,
        userMeta: null,
        keyholderLayout: null
    }),
    actions: {
        async setUserData () {
            const client = useSupabaseClient()
            const { data } = await client
                .from('profiles')
                .select('display_name, till_pin, payslip_dir, keyholder, sanity_slug')

            const user = useSupabaseUser()

            this.userMeta = user.value
            this.userData = data[0]
            this.keyholderLayout = data[0].keyholder
            if (this.userData.sanity_slug) {
                const query = groq`*[_type == "teamMember" && slug.current == 'dan'][0] {
                    name,
                    role,
                    startDate,
                    birthday,
                  image
                }`

                const sanity = useSanity()

                const data = await sanity.fetch(query)

                this.userSanityData = data
            }
        },
        toggleKeyholderLayout (value) {
            this.keyholderLayout = value ?? !this.keyholderLayout
        }
    }
})
