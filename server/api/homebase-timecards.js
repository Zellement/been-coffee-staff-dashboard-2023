export default defineEventHandler(async () => {
    const getTodaysDateInUrlEncodedFormat = () => {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
        const yyyy = today.getFullYear()

        return `${mm}%2F${dd}%2F${yyyy}`
    }

    const today = getTodaysDateInUrlEncodedFormat()
    try {
        const response = await fetch(
            `https://app.joinhomebase.com/api/public/locations/${process.env.HOMEBASE_LOCATION_WILLINGTON_ID}/timecards?start_date=${today}&end_date=${today}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.HOMEBASE_API_KEY}`,
                    Accept: 'application/vnd.homebase-v1+json'
                }
            }
        )

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()

        return data
        // Process the data as needed
    } catch (error) {
        console.error('Failed to fetch Homebase timecards:', error)
    }
})
