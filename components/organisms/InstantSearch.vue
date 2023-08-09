<template>
    <div v-if="uiStore.showSearchResults" class="fixed inset-0 z-50 flex bg-butterscotch dark:bg-navy-500">

        <div class="flex flex-row mx-auto">
            <div class="flex">
                <input class="my-auto" name="site-search" id="site-search" placeholder="Search..." />
            </div>

            <div class="flex h-full">

                <ul class="h-full my-auto overflow-y-auto">

                    <li v-for="item in data.allArticles" :key="item.id">

                        {{ item.title }}

                    </li>
                </ul>
            </div>

        </div>

    </div>
</template>

<script setup>

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const QUERY = `
    query MyQuery {
       allArticles {
            id
            title
            slug
        }
    }
`

const { data } = await useGraphqlQuery({ query: QUERY })

</script>
