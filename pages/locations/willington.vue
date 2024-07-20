<template>
    <div>
        <nuxt-layout name="locations">
            <div class="container -mt-8">
                <!-- <homebase-timecards /> -->
                <homebase-shifts />
            </div>
        </nuxt-layout>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false
})
</script>
