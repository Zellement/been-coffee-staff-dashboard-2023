export default defineEventHandler(async (event) => {
    const data = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m',
        {
            method: 'GET'
        }
    )

    console.log(data)
    return data
})
