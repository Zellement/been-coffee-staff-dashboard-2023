import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', {
    state: () => ({
        currentTeam: null
    }),
    actions: {
        async fetchCurrentTeam () {
            const QUERY = `
              query {
                  allTeams(filter: {formerEmployee: {eq: "false"}}) {
                        id
                        name
                        position
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
                        role
                        managerKeyHolder
                        startDate
                        birthday
                    }
                }
              `
            const { data } = await useGraphqlQuery({ query: QUERY })
            this.currentTeam = data.value.allTeams
        }
    }
})
