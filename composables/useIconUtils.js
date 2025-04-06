export const useIconUtils = () => {
    /**
     * Returns the weather icon name based on the WMO weather code.
     * @param {number} code - The WMO weather code.
     * @returns {string} - The icon name.
     */
    const getWeatherIcon = (code) => {
        switch (true) {
            case code === 0:
                return 'bx:sun'
            case [1, 2, 3].includes(code):
                return 'bx:cloud'
            case [45, 48].includes(code):
                return 'bx:fog'
            case [51, 53, 55].includes(code):
                return 'bx:cloud-drizzle'
            case [56, 57].includes(code):
                return 'bx:cloud-drizzle'
            case [61, 63, 65].includes(code):
                return 'bx:cloud-rain'
            case [66, 67].includes(code):
                return 'bx:cloud-drizzle'
            case [71, 73, 75].includes(code):
                return 'bx:cloud-snow'
            case code === 77:
                return 'bx:cloud-snow'
            case [80, 81, 82].includes(code):
                return 'bx:cloud-rain'
            case [85, 86].includes(code):
                return 'bx:cloud-snow'
            case code === 95:
                return 'bx:cloud-lightning'
            case [96, 99].includes(code):
                return 'bx:cloud-lightning'
            default:
                return 'bx:question-mark'
        }
    }

    return {
        getWeatherIcon
    }
}
