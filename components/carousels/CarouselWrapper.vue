<template>
    <div class="relative">
        <div class="overflow-clip">
            <div
                class="flex w-full overflow-x-scroll py-4"
                :class="trackClasses"
            >
                <ul class="mx-2 flex w-full flex-row gap-2 lg:mx-4">
                    <slot />
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    trackClasses: {
        type: String,
        default: null
    }
})
</script>
