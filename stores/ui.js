import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => ({
        showSearchResults: false,
        showProfileData: false,
        isXmasThemed: false,
        showBahHumbug: false,
        isNewYearThemed: false,
        originalUrl: null,
        currentUrl: null,
        theme: 'standard',
        showDisableTheme: false
    }),
    getters: {
        fixBody () {
            return this.showSearchResults || this.showProfileData
        },
        isXmasTheme () {
            return this.theme === 'xmas'
        },
        isNewYearTheme () {
            return this.theme === 'newyear'
        },
        isEasterTheme () {
            return this.theme === 'easter'
        },
        showDisableTheme () {
            return this.showDisableTheme
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
        setTheme (theme) {
            if (theme) {
                this.theme = theme
                return
            }
            const thisMonth = new Date().toLocaleDateString('en-GB', {
                month: 'short'
            })
            const thisDay = today.toLocaleDateString('en-GB', {
                day: '2-digit'
            })

            switch (thisMonth) {
            case 'Dec':
                this.theme = 'xmas'
                this.showDisableTheme = true
                break
            case 'Jan':
                if (thisDay < 8) {
                    this.theme = 'newyear'
                }
                break
            case 'Mar':
                if (thisDay > 15) {
                    this.theme = 'easter'
                }
                break
            case 'Apr':
                if (thisDay < 15) {
                    this.theme = 'easter'
                }
                break
            default: this.theme = 'standard'
            }
        }
        // setXmasMonth () {
        //     const today = new Date()
        //     const thisMonth = today.toLocaleDateString('en-GB', {
        //         month: 'short'
        //     })
        //     const thisDay = today.toLocaleDateString('en-GB', {
        //         day: '2-digit'
        //     })

        //     if (thisMonth === 'Dec') {
        //         this.isXmasThemed = true
        //         this.showBahHumbug = true
        //     }
        // },
        // setNewYearTheme () {
        //     const thisMonth = new Date().toLocaleDateString('en-GB', {
        //         month: 'short'
        //     })
        //     const thisDay = new Date().toLocaleDateString('en-GB', {
        //         day: '2-digit'
        //     })
        //     if (thisMonth === 'Jan') {
        //         if (thisDay < 8) {
        //             this.isNewYearThemed = true
        //         }
        //     } else {
        //         this.isNewYearThemed = false
        //     }
        // }
    }
})
