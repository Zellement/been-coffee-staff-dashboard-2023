<template>
    <header class="container fixed top-0 left-0 z-50 flex items-center justify-between w-full h-12 dark:bg-navy-600 bg-butterscotch-600">
        <site-logo />

        <div class="flex flex-row items-center gap-2">

            <button :aria-label="colorModeLabel" class="flex items-center" @click="toggleColorMode">
                <Icon :name="colorModeIcon" />
            </button>

            <span>Welcome, {name}</span>
            <Icon name="clarity:sign-out-line" class="" />
        </div>
    </header>
</template>

<script setup>

const colorMode = useColorMode()

const colorModeIcon = computed(() => {
    return colorMode.preference === 'dark' ? 'clarity:sun-solid' : 'clarity:moon-solid'
})

const colorModeLabel = computed(() => {
    return colorMode.preference === 'dark' ? 'Enable light mode' : 'Enable dark mode'
})

const toggleColorMode = () => {
    if (colorMode.preference === 'light') {
        colorMode.preference = 'dark'
    } else (colorMode.preference = 'light')
}

</script>
