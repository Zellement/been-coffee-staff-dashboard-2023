<template>
    <div class="flex flex-col w-full max-w-screen-md px-10 pt-0 pb-32 mx-auto">
        <h1 class="mb-8 h1">
            Day Dot Helper
        </h1>

        <div class="grid grid-cols-2 space-y-4">
            <day-dot
                :date="today"
                class="col-span-2"
            />
            <day-dot
                :date="plus3days"
                title="+ 3 Days"
            />
            <day-dot
                :date="plus5days"
                title="+ 5 Days"
            />
            <day-dot
                :date="plus7days"
                title="+ 7 Days"
            />
            <day-dot
                :date="plus14days"
                title="+ 14 Days"
            />
            <day-dot
                :date="plus21days"
                title="+ 21 Days"
            />
            <day-dot
                :date="plus28days"
                title="+ 28 Days"
            />
        </div>
    </div>
</template>
<script setup>

const today = new Date()
const plus3days = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000))
const plus5days = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000))
const plus7days = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
const plus14days = new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000))
const plus21days = new Date(new Date().getTime() + (21 * 24 * 60 * 60 * 1000))
const plus28days = new Date(new Date().getTime() + (28 * 24 * 60 * 60 * 1000))

</script>
