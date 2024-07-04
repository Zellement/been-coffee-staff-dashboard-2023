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
                .select('display_name, sanity_slug')

            const user = useSupabaseUser()

            this.userMeta = user.value
            this.userData = data[0]
            const params = {
                sanitySlug: this.userData.sanity_slug
            }
            if (this.userData.sanity_slug) {
                const query = groq`*[_type == "teamMember" && slug.current == $sanitySlug][0] {
                    name,
                    role,
                    managerKeyHolder,
                    startDate,
                    birthday,
                    image
                }`

                const sanity = useSanity()

                const data = await sanity.fetch(query, params)
                console.log(data)
                this.userSanityData = data
                this.keyholderLayout = data.managerKeyholder
            }
        },
        toggleKeyholderLayout (value) {
            this.keyholderLayout = value ?? !this.keyholderLayout
        }
    }
})
