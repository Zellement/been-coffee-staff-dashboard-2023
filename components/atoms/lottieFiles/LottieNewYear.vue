<template>
    <div
        class="absolute top-20 right-0 flex w-[150px] h-auto overflow-hidden pointer-events-none"
    >
        <client-only>
            <Vue3Lottie
                :animation-data="NewYear"
                :height="150"
                :width="150"
                class="object-contain w-full h-auto"
            />
        </client-only>
    </div>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import NewYear from '@/assets/lottie/new-year'

</script>
