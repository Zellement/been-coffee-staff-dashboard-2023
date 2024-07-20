<template>
    <div>
        <nuxt-layout name="locations">
            <div class="flex flex-col gap-8 w-full -mt-8">
                <homebase-shifts-today />
                <carousel-checks basic />
                <homebase-shifts-tomorrow />
            </div>
        </nuxt-layout>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false
})
</script>
