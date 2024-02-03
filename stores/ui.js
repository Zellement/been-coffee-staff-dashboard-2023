import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => ({
        showSearchResults: false,
        showProfileData: false,
        isXmasThemed: false,
        showBahHumbug: false,
        isNewYearThemed: false,
        originalUrl: null
    }),
    getters: {
        fixBody () {
            return this.showSearchResults || this.showProfileData
        }
    },
    actions: {
        setOriginalUrl (url) {
            this.originalUrl = url
        },
        toggleSearchResults () {
            this.showSearchResults = !this.showSearchResults
        },
        toggleProfileData () {
            this.showProfileData = !this.showProfileData
        },
        toggleXmasTheme () {
            this.isXmasThemed = !this.isXmasThemed
        },
        setXmasMonth () {
            const thisMonth = new Date().toLocaleDateString('en-GB', {
                month: 'short'
            })

            if (thisMonth === 'Dec') {
                this.isXmasThemed = true
                this.showBahHumbug = true
            }
        },
        setNewYearTheme () {
            const thisMonth = new Date().toLocaleDateString('en-GB', {
                month: 'short'
            })
            const thisDay = new Date().toLocaleDateString('en-GB', {
                day: '2-digit'
            })
            if (thisMonth === 'Jan') {
                if (thisDay < 8) {
                    this.isNewYearThemed = true
                }
            } else {
                this.isNewYearThemed = false
            }
        }
    }
})
