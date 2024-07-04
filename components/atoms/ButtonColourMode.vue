<template>
    <button
        :aria-label="colorModeLabel"
        class=" "
        @click="toggleColorMode"
    >
        <Icon
            :name="colorModeIcon"
            class="w-6 h-6"
        />
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
