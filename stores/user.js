import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: null,
        userDatoData: null,
        keyholderLayout: null
    }),
    actions: {
        async setUserData () {
            const client = useSupabaseClient()
            const { data } = await client
                .from('profiles')
                .select('display_name, till_pin, payslip_dir, keyholder, dato_id')
            this.userData = data[0]
            this.keyholderLayout = data[0].keyholder
            if (this.userData.dato_id) {
                const QUERY = `
                    query getDatoData {
                        team(filter: {id: {eq: ${this.userData.dato_id}}}) {
                        id
                        name
                        startDate
                        birthday
                        picture {
                            responsiveImage {
                                alt
                                base64
                                bgColor
                                title
                                srcSet
                            }
                            url
                        }
                        }
                    }
              `
                const { data } = await useGraphqlQuery({ query: QUERY })
                this.userDatoData = data.value.team
            }
        },
        toggleKeyholderLayout (value) {
            this.keyholderLayout = value ?? !this.keyholderLayout
        }
    }
})
