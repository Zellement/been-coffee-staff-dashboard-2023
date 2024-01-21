export const dateConverterWithDay = (value) => {
    const event = new Date(value)
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    return event.toLocaleDateString('en-UK', options)
}
export const dateConverter = (value) => {
    const event = new Date(value)
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return event.toLocaleDateString('en-UK', options)
}
export const dateConverterWithDayNoYear = (value) => {
    const event = new Date(value)
    const options = { weekday: 'short', month: 'short', day: 'numeric' }
    return event.toLocaleDateString('en-UK', options)
}
export const dateConverterNoYear = (value) => {
    const event = new Date(value)
    const options = { month: 'long', day: 'numeric' }
    return event.toLocaleDateString('en-UK', options)
}
