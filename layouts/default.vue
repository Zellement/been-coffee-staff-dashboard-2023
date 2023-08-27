<template>
    <div
        v-if="user"
        class="overflow-hidden"
    >
        <site-header />
        <div class="layout">
            <main>
                <slot />
            </main>
        </div>
    </div>
    <auth-login v-else />
</template>

<script setup>

const user = useSupabaseUser()

</script>
