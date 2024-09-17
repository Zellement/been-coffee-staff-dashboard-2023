export const useDateUtils = () => {
    /**
     * Returns the ordinal suffix for a given date (e.g., 1st, 2nd, 3rd).
     * @param {number} d - The date as a number.
     * @returns {string} - The ordinal suffix (e.g., 'st', 'nd', 'rd', or 'th').
     */
    const nth = (d: number): string => {
        if (d > 3 && d < 21) return 'th'
        switch (d % 10) {
            case 1:
                return 'st'
            case 2:
                return 'nd'
            case 3:
                return 'rd'
            default:
                return 'th'
        }
    }

    /**
     * Return a long user-friendly date.
     * @function
     * @param {Date} date - The date.
     * @returns {string} - Thursday, 04 January 2024
     */
    const fullDateConverter = (passedDate: Date): string => {

        const date = new Date(passedDate)
        const monthArray: string[] = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
        const dayArray: string[] = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]
        const day: string = dayArray[date.getDay()]
        const d: number = date.getDate()
        const dSuffix: string = nth(date.getDate())
        const m: string = monthArray[date.getMonth()]
        const y: number = date.getFullYear()
        return `${day}, ${d}${dSuffix} ${m} ${y}`
    }

    const extractHourAndMinute = (dateString: Date): string => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        // Format hours and minutes to ensure they are always two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes}`;
    }

    const getTodaysDateInUrlEncodedFormat = (date: Date) => {
        // const today = new Date()
        const dd = String(date.getDate()).padStart(2, '0')
        const mm = String(date.getMonth() + 1).padStart(2, '0') // January is 0!
        const yyyy = date.getFullYear()

        return `${mm}%2F${dd}%2F${yyyy}`
    }

    /**
     * Return a short user-friendly date.
     * @function
     * @param {Date} date - The date.
     * @returns {string} - 04/01/2024
     */
    const shortDateConverter = (date: Date | string): string => {
        const parsedDate: Date = date instanceof Date ? date : new Date(date)

        const d: number = parsedDate.getDate()
        const m: number = parsedDate.getMonth()
        const y: number = parsedDate.getFullYear()

        return `${d <= 9 ? '0' + d : d}/${m <= 8 ? '0' + (m + 1) : m + 1}/${y}`
    }

    return {
        extractHourAndMinute,
        getTodaysDateInUrlEncodedFormat,
        fullDateConverter,
        shortDateConverter
    }
}
