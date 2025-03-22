<template>
    <div class="mx-auto flex w-full max-w-screen-md flex-col px-10 pb-32 pt-0">
        <h1 class="h1 mb-8">Day Dot Helper</h1>

        <div class="grid grid-cols-2 space-y-4">
            <single-day-dot :date="today" class="col-span-2" />
            <single-day-dot :date="plus3days" title="+ 3 Days" />
            <single-day-dot :date="plus5days" title="+ 5 Days" />
            <single-day-dot :date="plus7days" title="+ 7 Days" />
            <single-day-dot :date="plus14days" title="+ 14 Days" />
            <single-day-dot :date="plus21days" title="+ 21 Days" />
            <single-day-dot :date="plus28days" title="+ 28 Days" />
        </div>
    </div>
</template>
<script setup>
const today = new Date()
const plus3days = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
const plus5days = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000)
const plus7days = new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000)
const plus14days = new Date(new Date().getTime() + 13 * 24 * 60 * 60 * 1000)
const plus21days = new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000)
const plus28days = new Date(new Date().getTime() + 27 * 24 * 60 * 60 * 1000)

useHead({
    title: 'Day Dot Helper'
})
</script>
