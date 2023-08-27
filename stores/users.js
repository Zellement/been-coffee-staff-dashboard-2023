import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        userCapitalised: null,
        userUpper: null,
        userTillPin: null
    }),
    actions: {
        setUser (user) {
            this.user = user
            this.userCapitalised = user

            const firstLetter = user.charAt(0)
            const firstLetterCap = firstLetter.toUpperCase()
            const remainingLetters = user.slice(1)
            this.userCapitalised = firstLetterCap + remainingLetters

            this.userUpper = user.toUpperCase()
        },
        setUserEnvs (data) {
            this.userTillPin = data.tillPin
        }
    }
})
