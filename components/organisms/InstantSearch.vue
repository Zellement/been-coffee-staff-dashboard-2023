<template>
    <div
        v-if="uiStore.showSearchResults"
        class="fixed inset-0 z-50 flex bg-butterscotch dark:bg-navy-500"
    >
        <button
            class="fixed top-2 right-2"
            @click="uiStore.toggleSearchResults"
        >
            <Icon
                name="ri:close-circle-line"
                class="w-8 h-8 transition-all duration-300 hover:rotate-90"
            />
        </button>

        <div class="flex flex-col w-full gap-8 mx-auto md:grid md:grid-cols-2">
            <div class="flex flex-col items-center gap-8 p-8 md:justify-center">
                <input
                    id="site-search"
                    v-model="searchInput"
                    class="w-full max-w-[20rem] p-2 rounded dark:bg-navy-300"
                    name="site-search"
                    placeholder="Search..."
                >
                <div
                    v-if="cats"
                    class="flex flex-col w-full  max-w-[20rem]"
                >
                    <h2 class="mb-2 h4">
                        Categories
                    </h2>
                    <ul
                        class="flex flex-col overflow-y-auto md:justify-center "
                    >
                        <li
                            v-for="item in cats"
                            :key="item.id"
                        >
                            <nuxt-link
                                :to="`/category/${item.slug}`"
                                class="inline-flex flex-row items-end self-start generic-link"
                                @click="uiStore.toggleSearchResults"
                            >
                                <span>{{ item.title }}</span>
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="flex flex-col h-screen p-8 overflow-hidden lg:py-16">
                <div class="flex flex-row justify-between">
                    <h2 class="mb-2 h4">
                        Article
                    </h2>
                    <span>Last updated</span>
                </div>
                <ul class="flex flex-col overflow-y-auto md:justify-center ">
                    <li
                        v-for="item in filteredItems"
                        :key="item.id"
                        class="flex"
                    >
                        <nuxt-link
                            :to="`/article/${item.slug}`"
                            class="flex flex-row items-center self-start justify-between w-full py-1 shadow-sm"
                            @click="uiStore.toggleSearchResults"
                        >
                            <span>{{ item.title }}</span>
                            <span class="text-right whitespace-nowrap text-2xs opacity-60">{{ dateConverter(item._updatedAt) }}</span>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'
import { dateConverter } from '@/scripts/helpers'

const uiStore = useUiStore()

const searchInput = ref()

const QUERY = `
    query MyQuery {
       allArticles(orderBy: title_ASC) {
            id
            title
            slug
            _updatedAt
        }
        allCategories {
            id
            title
            slug
        }
    }
`

const cats = computed(() => {
    return data.value.allCategories
})

const { data } = await useGraphqlQuery({ query: QUERY })

const filteredItems = computed(() => {
    if (searchInput.value) {
        console.log(searchInput.value)
        return data.value.allArticles.filter(item => {
            return item.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) > -1
        })
    } return data.value.allArticles
})

</script>
