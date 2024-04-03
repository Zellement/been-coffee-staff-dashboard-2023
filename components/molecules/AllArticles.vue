<template>
    <div class="flex flex-grow-0 p-4 md:col-span-2">
        <input
            id="site-search"
            v-model="searchInput"
            class="w-full max-w-[20rem] max-h-10 mx-auto p-2  dark:bg-navy-300"
            name="site-search"
            placeholder="Search articles..."
        >
    </div>
    <div class="flex flex-col w-full p-4 overflow-hidden h-max-h-screen xl:p-16 xl:pt-0">
        <div class="flex flex-row items-center justify-between">
            <h2 class="mb-2 h4">
                Article
            </h2>
            <span class="text-xs">Last updated</span>
        </div>
        <div class="h-full overflow-y-scroll">
            <ul class="relative z-10 flex flex-col pb-8 lg:pb-32 md:justify-center">
                <li
                    v-for="item in filteredItems"
                    :key="item.id"
                    class="flex"
                >
                    <nuxt-link
                        :to="`/article/${item.slug.current}`"
                        class="flex flex-row items-center self-start justify-between w-full py-1 transition-all duration-300 border-b border-transparent shadow-sm hover:border-current"
                        @click="uiStore.toggleSearchResults"
                    >
                        <span>{{ item.title }}</span>
                        <span class="text-right whitespace-nowrap text-2xs opacity-60">{{ dateConverter(item._updatedAt) }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { dateConverter } from '@/scripts/helpers'
import { useUiStore } from '@/stores/ui'
const uiStore = useUiStore()

const queryArticle = groq`
*[_type == "article"]|order(title)
`

const searchInput = ref()

const sanity = useSanity()

const { data } = await useAsyncData('allArticles', () => sanity.fetch(queryArticle))

const allArticles = computed(() => {
    return data.value
})

const filteredItems = computed(() => {
    if (searchInput.value) {
        return allArticles.value.filter(item => {
            return item.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) > -1
        })
    } return allArticles.value
})

</script>
