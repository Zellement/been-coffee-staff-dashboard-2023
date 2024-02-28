<template>
    <div
        class="fixed bottom-20 left-4 flex w-[120px] h-[120px]  overflow-hidden pointer-events-none"
    >
        <client-only>
            <Vue3Lottie
                :animation-data="EasterEgg"
                :height="120"
                :width="120"
                class="object-contain w-full h-auto"
            />
        </client-only>
    </div>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import EasterEgg from '@/assets/lottie/easter-egg'

</script>
