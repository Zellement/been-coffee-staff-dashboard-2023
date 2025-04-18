<template>
    <template v-if="findTodaysData">({{ findTodaysData.title }})</template>
</template>

<script setup>
// Reactive data reference
const data = ref(null)

const props = defineProps({
    date: {
        type: String,
        default: ''
    }
})

// Computed property to find today's bank holiday
const findTodaysData = computed(() => {
    if (data.value && data.value['england-and-wales']?.events) {
        return data.value['england-and-wales'].events.find((event) => {
            return event?.date === props.date
        })
    }
    console.warn('No events found or data structure is incorrect')
    return null
})

try {
    const { data: fetchedData } = await useFetch(
        'https://www.gov.uk/bank-holidays.json'
    )
    data.value = fetchedData.value // Assign the resolved data to `data.value`
    console.log('Fetched Data:', data.value) // Log the fetched data
} catch (error) {
    console.error('Error fetching data:', error)
}
</script>
