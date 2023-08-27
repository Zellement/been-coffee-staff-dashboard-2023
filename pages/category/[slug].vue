<template>
    <div
        class="container flex flex-col items-center space-y-8"
    >
        <content-hero
            v-if="categoryData"
            :title="categoryData.title"
            subtitle="Category"
        />
        <div
            v-if="allArticles"
            class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
            <nuxt-link
                v-for="article in allArticles"
                :key="article.id"
                :to="`/article/${article.slug}`"
                class="flex flex-col p-4 transition-all duration-300 rounded bg-butterscotch-500 dark:bg-navy-600 bg-opacity-10 hover:bg-opacity-80 dark:hover:text-butterscotch-200"
            >
                <h2 class="h4">
                    {{ article.title }}
                </h2>
                <h3 class="italic">
                    {{ article.subtitle }}
                </h3>
                <span class="flex flex-row items-center gap-1 opacity-50 text-2xs">
                    <Icon
                        class="w-4 h-4"
                        name="ri:calendar-2-fill"
                    />
                    <span>{{ dateConverter(article._updatedAt) }}</span></span>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
import { dateConverter } from '@/scripts/helpers'

const QUERY = `query CatQuery ($slug: String!) {
    category(filter: {slug: {eq: $slug}})  {
        id
        title
        slug
        _allReferencingArticles {
            id
            slug
            title
            subtitle
            _updatedAt
        }
    }
}
`
const route = useRoute()
const { data } = await useGraphqlQuery({ query: QUERY, variables: { slug: route.params.slug } })

const categoryData = computed(() => {
    return data?.value?.category
})

const allArticles = computed(() => {
    return data?.value?.category._allReferencingArticles
})

useHead({
    title: categoryData.value?.title
})

</script>
