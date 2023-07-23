<template>
    <header class="fixed top-0 left-0 flex items-center justify-between w-full h-12 p-2 dark:bg-navy-600 bg-butterscotch-600">
        <site-logo />

        <div class="flex flex-row items-center gap-2">

            <button aria-label="Enable dark mode" v-if="$colorMode.preference === 'light'" class="flex items-center" @click="$colorMode.preference = 'dark'">

                <Icon name="clarity:moon-solid" />
            </button>

            <button aria-label="Enable light mode" v-else class="flex items-center" @click="$colorMode.preference = 'light'">
                <Icon name="clarity:sun-solid" />
            </button>
            <span>Welcome, {name}</span>
            <Icon name="clarity:sign-out-line" class="text-white" />
        </div>
    </header>
</template>

<script setup>
</script>
