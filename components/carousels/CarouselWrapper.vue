<template>
    <div class="relative after:content-[''] after:absolute after:top-0 after:right-0 after:w-4 after:h-full after:bg-gradient-to-l after:from-seashell-500 dark:after:from-navy-500">
        <div
            class="overflow-clip"
        >
            <div class="w-full py-4 flex overflow-x-scroll">
                <ul class="flex flex-row w-full mx-2 lg:mx-4 gap-2">
                    <slot />
                    <div class="w-40 h-8 bg-blue-300 flex" />
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>
