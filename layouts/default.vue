<template>
    <div
        v-if="user"
        class=""
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

</script>
