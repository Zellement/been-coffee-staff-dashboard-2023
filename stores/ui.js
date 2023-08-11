import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => ({
        showSearchResults: false,
        showProfileData: true
    }),
    actions: {
        toggleSearchResults () {
            this.showSearchResults = !this.showSearchResults
        },
        toggleProfileData () {
            this.showProfileData = !this.showProfileData
        }
    }
})
