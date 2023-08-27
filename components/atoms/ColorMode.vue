<template>
    <button
        :aria-label="colorModeLabel"
        class="flex p-2 transition-all duration-300 dark:hover:text-butterscotch-500 hover:text-white"
        @click="toggleColorMode"
    >
        <Icon :name="colorModeIcon" />
    </button>
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
