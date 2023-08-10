<template>
    <div v-if="uiStore.showSearchResults" class="fixed inset-0 z-50 flex bg-butterscotch dark:bg-navy-500">

        <button class="fixed top-2 right-2" @click="uiStore.toggleSearchResults">

            <Icon name="ri:close-circle-line" class="w-8 h-8 transition-all duration-300 hover:rotate-90" />

        </button>

        <div class="flex flex-col w-full gap-8 mx-auto md:grid md:grid-cols-2">

            <div class="flex py-8 md:justify-center">
                <input v-model="searchInput" class="w-full max-w-[20rem] p-2 my-auto rounded dark:bg-navy-300" name="site-search" id="site-search" placeholder="Search..." />
            </div>

            <div class="flex h-screen overflow-hidden">

                <ul class="flex flex-col overflow-y-auto md:justify-center ">

                    <li v-for="item in filteredItems" :key="item.id">

                        <nuxt-link @click="uiStore.toggleSearchResults" :to="`/article/${item.slug}`"
                                   class="inline-flex flex-row items-end self-start generic-link">
                            <span>{{ item.title }}</span>
                            <span class="ml-4 text-2xs opacity-60">{{ dateConverter(item._updatedAt) }}</span>
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
    }
`

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
