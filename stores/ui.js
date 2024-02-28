import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => ({
        showSearchResults: false,
        showProfileData: false,
        originalUrl: null,
        currentUrl: null,
        theme: 'standard',
        themeToggleBtn: {
            show: false,
            text: null,
            icon: null
        }
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
        setTheme (theme) {
            if (theme) {
                this.theme = theme
                return
            }
            const thisMonth = new Date().toLocaleDateString('en-GB', {
                month: 'short'
            })
            const thisDay = new Date().toLocaleDateString('en-GB', {
                day: '2-digit'
            })

            switch (thisMonth) {
            case 'Dec':
                this.theme = 'xmas'
                this.themeToggleBtn = {
                    show: true,
                    text: 'Bah Humbug',
                    icon: 'tabler:christmas-tree'
                }
                break
            case 'Jan':
                if (thisDay < 8) {
                    this.theme = 'newyear'
                    this.themeToggleBtn = {
                        show: true,
                        text: 'Hide the fireworks!',
                        icon: 'mingcute:firework-fill'
                    }
                }
                break
            case 'Mar':
                if (thisDay > 10) {
                    this.theme = 'easter'
                    this.themeToggleBtn = {
                        show: true,
                        text: 'Bunnies give me nightmares',
                        icon: 'mdi:rabbit'
                    }
                }
                break
            case 'Apr':
                this.theme = 'easter'
                this.themeToggleBtn = {
                    show: true,
                    text: 'Bunnies give me nightmares'
                }
                break
            default:
                this.theme = 'standard'
                this.themeToggleBtn = {
                    show: false,
                    text: null
                }
            }
        }

    }
})
