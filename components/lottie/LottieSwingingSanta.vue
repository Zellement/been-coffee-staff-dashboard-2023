<template>
    <client-only>
        <div
            class="pointer-events-none absolute right-0 top-0 flex h-auto w-1/2 overflow-hidden"
        >
            <Vue3Lottie
                :animation-data="SwingingSanta"
                :height="300"
                :width="300"
                class="-translate-y-10 translate-x-1/4"
            />
        </div>
    </client-only>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import SwingingSanta from '@/assets/lottie/swinging-santa'
</script>
