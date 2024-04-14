<template>
    <div>
        <nuxt-layout name="login">
            <div class="flex flex-col gap-4 mb-8">
                <h1 class="h1">
                    Been Coffee Dashboard
                </h1>
                <h2 class="h2">
                    Login
                </h2>
            </div>
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
