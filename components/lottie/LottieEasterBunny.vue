<template>
    <div
        class="pointer-events-none absolute right-0 top-0 flex h-auto w-[150px] overflow-hidden"
    >
        <client-only>
            <Vue3Lottie
                :animation-data="EasterBunny"
                :height="300"
                :width="300"
                class="h-auto w-full object-contain"
            />
        </client-only>
    </div>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import EasterBunny from '@/assets/lottie/easter-bunny'
</script>
