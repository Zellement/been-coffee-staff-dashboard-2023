import { defineStore } from 'pinia'

export const useSiteSearchStore = defineStore('siteSearch', {
    state: () => ({
        allArticles: null
    }),
    actions: {
        toggleSearchResults () {
            this.showSearchResults = !this.showSearchResults
        }
    }
})
