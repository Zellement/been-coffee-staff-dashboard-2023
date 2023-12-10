<template>
    <div>
        <nuxt-layout name="login">
            <auth-login />
        </nuxt-layout>
    </div>
</template>

<script setup>

useHead({
    title: 'Login to the Been Staff Dashboard'
})

definePageMeta({
    layout: false
})

</script>
