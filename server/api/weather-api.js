export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    console.log(query)
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=52.9228&longitude=-1.4766&${query.params}&timezone=auto`
        )
        const data = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
})
