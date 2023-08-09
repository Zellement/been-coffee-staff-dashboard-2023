import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => ({
        showSearchResults: false
    }),
    actions: {
        toggleSearchResults () {
            this.showSearchResults = !this.showSearchResults
        }
    }
})
