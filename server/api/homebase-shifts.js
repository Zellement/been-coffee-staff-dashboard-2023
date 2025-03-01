export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    try {
        const response = await fetch(
            `https://app.joinhomebase.com/api/public/locations/${process.env.HOMEBASE_LOCATION_WILLINGTON_ID}/shifts?start_date=${query.date}&end_date=${query.date}`,
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
        console.error('Failed to fetch Homebase locations:', error)
    }
})
