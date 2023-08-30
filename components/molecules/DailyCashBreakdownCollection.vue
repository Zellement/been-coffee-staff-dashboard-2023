<template>
    <div>
        <div class="sticky top-0 flex flex-row items-center gap-2 p-5 bg-seashell dark:bg-navy">
            <div class="w-6 h-6 bg-black rounded-full" />
            <h3>Banking (Black tin)</h3>
        </div>
        <div class="">
            <label
                v-for="item in denominations"
                :key="`black-tin__${item}`"
                class="flex flex-row"
            >
                <span>{{ item }}</span>
                <span>Value total</span>
                <input
                    :name="`${item}_amount`"
                    type="text"
                >
            </label>
        </div>
    </div>
</template>

<script setup>

const denominations = [
    '5p', '10p', '20p'
]

</script>
