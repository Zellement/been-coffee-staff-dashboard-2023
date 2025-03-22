<template>
    <div
        v-if="allArticleCats"
        class="flex w-full flex-col p-4 xl:max-w-[20rem] xl:p-16 xl:pt-0"
    >
        <h2 class="h4 mb-2">Categories</h2>
        <ul class="flex flex-col overflow-y-auto md:justify-center">
            <li v-for="item in allArticleCats" :key="item.id">
                <nuxt-link
                    :to="`/category/${item.slug.current}`"
                    class="inline-flex flex-row items-end self-start border-b border-transparent transition-all duration-300 hover:border-current"
                    @click="uiStore.toggleSearchResults()"
                >
                    <span>{{ item.title }}</span>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const queryArticleCats = groq`
*[_type == "articleCategory"]|order(title)
`

const sanity = useSanity()

const { data } = await useAsyncData('allArticleCats', () =>
    sanity.fetch(queryArticleCats)
)

const allArticleCats = computed(() => {
    return data.value
})
</script>
