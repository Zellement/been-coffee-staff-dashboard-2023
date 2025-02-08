<template>
    <header
        class="container fixed left-0 top-0 z-50 flex w-full flex-row items-center justify-between gap-2 pt-2"
    >
        <site-logo />
        <button
            class="button button--sm relative overflow-hidden"
            @click.prevent="shareBtn()"
        >
            <span
                v-if="copied"
                class="pointer-events-none absolute inset-0 flex bg-green-500 text-green-900"
            >
                <span class="flex h-full w-full items-center justify-center">
                    <Icon name="material-symbols-light:check-small-rounded" />
                    <span class="text-2xs">Copied</span>
                </span>
            </span>

            <Icon name="material-symbols:share" /> Share
        </button>
    </header>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const copied = ref(false)

const currentUrl = computed(() => uiStore.currentUrl)

const shareData = computed(() => {
    return {
        url: currentUrl.value
    }
})

const shareBtn = async () => {
    if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
    } else {
        navigator.clipboard.writeText(shareData.value.url)
    }
    copied.value = true
    changeBack()
}

const changeBack = () => {
    setTimeout(() => {
        copied.value = false
    }, 3000)
}
</script>
