<template>
    <div class="relative">
        <div
            class="overflow-clip"
        >
            <div class="w-full py-4 flex overflow-x-scroll">
                <ul class="flex flex-row w-full mx-2 lg:mx-4 gap-2">
                    <slot />
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>
