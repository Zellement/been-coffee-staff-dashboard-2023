<template>
    <div class="flex flex-grow-0 p-4 md:col-span-2">
        <input
            id="button-site-search"
            v-model="searchInput"
            class="mx-auto max-h-10 w-full max-w-[20rem] p-2 dark:bg-navy-300"
            name="button-site-search"
            placeholder="Search articles..."
        />
    </div>
    <div class="flex w-full flex-col overflow-hidden p-4 xl:p-16 xl:pt-0">
        <div class="flex flex-row items-center justify-between">
            <h2 class="h4 mb-2">Article</h2>
            <span class="text-xs">Last updated</span>
        </div>
        <div class="h-full overflow-y-scroll">
            <ul
                class="relative z-10 flex flex-col pb-8 md:justify-center lg:pb-32"
            >
                <li v-for="item in filteredItems" :key="item.id" class="flex">
                    <nuxt-link
                        :to="`/article/${item.slug.current}`"
                        class="flex w-full flex-row items-center justify-between self-start border-b border-transparent py-1 shadow-sm transition-all duration-300 hover:border-current"
                        @click="uiStore.toggleSearchResults()"
                    >
                        <span>{{ item.title }}</span>
                        <span
                            class="whitespace-nowrap text-right text-2xs opacity-60"
                            >{{ dateConverter(item._updatedAt) }}</span
                        >
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

const { data } = await useAsyncData('allArticles', () =>
    sanity.fetch(queryArticle)
)

const allArticles = computed(() => {
    return data.value
})

const filteredItems = computed(() => {
    if (searchInput.value) {
        return allArticles.value.filter((item) => {
            return (
                item.title
                    .toLowerCase()
                    .indexOf(searchInput.value.toLowerCase()) > -1
            )
        })
    }
    return allArticles.value
})
</script>
