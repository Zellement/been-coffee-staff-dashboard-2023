<template>
    <div class="bg-red-400">
        <div
            class="overflow-clip"
        >
            <div class="w-full py-4 flex overflow-x-scroll">
                <ul class="flex flex-row w-full mx-2 lg:mx-4 gap-4">
                    <slot />
                    <div class="w-40 h-8 bg-blue-300 flex" />
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>
