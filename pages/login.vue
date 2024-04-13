<template>
    <div>
        <nuxt-layout name="login">
            <auth-login />
            <nuxt-link
                to="/forgot-password"
                class="block mt-4 text-xs text-right"
            >
                Forgot your password?
            </nuxt-link>
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
