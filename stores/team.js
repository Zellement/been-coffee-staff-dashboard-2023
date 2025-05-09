import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', {
    state: () => ({
        currentTeam: null
    }),
    actions: {
        async fetchCurrentTeam() {
            const sanity = useSanity()

            const query =
                '*[_type == "teamMember" && formerEmployee != true]|order(orderRank)'

            try {
                const data = await sanity.fetch(query)
                this.currentTeam = data
            } catch (error) {
                console.error('Failed to fetch data:', error)
                throw error
            }
        },
        getUserByHomebaseId(userId) {
            return this.currentTeam?.find(
                (user) => user.homebaseUserId === userId
            )
        }
    }
})
