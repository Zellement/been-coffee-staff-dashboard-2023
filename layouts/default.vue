<template>
    <div
        v-if="userLoggedIn"
        class="overflow-hidden"
    >
        <site-header />
        <div class="layout">
            <main>
                <slot />
            </main>
        </div>
        <site-footer />
    </div>
    <auth-login v-else />
</template>

<script setup>

const user = useSupabaseUser()

const userLoggedIn = computed(() => {
    return user?.value?.aud === 'authenticated'
})

</script>
