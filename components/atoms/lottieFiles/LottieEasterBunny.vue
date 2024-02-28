<template>
    <div
        class="absolute top-0 right-0 flex w-[150px] h-auto overflow-hidden pointer-events-none"
    >
        <client-only>
            <Vue3Lottie
                :animation-data="EasterBunny"
                :height="300"
                :width="300"
                class="object-contain w-full h-auto"
            />
        </client-only>
    </div>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import EasterBunny from '@/assets/lottie/easter-bunny'

</script>
