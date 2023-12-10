import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => ({
        showSearchResults: false,
        showProfileData: false,
        isXmasThemed: false,
        showBahHumbug: false
    }),
    actions: {
        toggleSearchResults() {
            this.showSearchResults = !this.showSearchResults
        },
        toggleProfileData() {
            this.showProfileData = !this.showProfileData
        },
        toggleXmasTheme() {
            this.isXmasThemed = !this.isXmasThemed
        },
        setXmasMonth() {
            const thisMonth = new Date().toLocaleDateString('en-GB', {
                month: 'short'
            })

            if (thisMonth === 'Dec') {
                this.isXmasThemed = true
                this.showBahHumbug = true
            } else {
                this.isXmasThemed = false
                this.showBahHumbug = false
            }
        }
    }
})
