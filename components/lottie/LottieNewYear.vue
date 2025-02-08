<template>
    <div
        class="pointer-events-none absolute right-0 top-20 flex h-auto w-[150px] overflow-hidden"
    >
        <client-only>
            <Vue3Lottie
                :animation-data="NewYear"
                :height="150"
                :width="150"
                class="h-auto w-full object-contain"
            />
        </client-only>
    </div>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import NewYear from '@/assets/lottie/new-year'
</script>
