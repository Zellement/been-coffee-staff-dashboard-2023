<template>
    <div class="container flex flex-col space-y-8">
        <page-hero :title="catTitle" subtitle="Category" />
        <div
            v-if="data"
            class="grid grid-cols-1 gap-4 pb-16 md:grid-cols-2 xl:grid-cols-4"
        >
            <template v-for="article in data">
                <nuxt-link
                    v-if="article.sticky"
                    :key="article._id"
                    :to="`/article/${article.slug.current}`"
                    class="relative flex w-full flex-col bg-butterscotch-500 bg-opacity-10 p-4 shadow-lg transition-all duration-300 hover:bg-opacity-80 dark:bg-navy-400 dark:hover:text-butterscotch-200"
                >
                    <div
                        class="absolute right-2 top-2 flex flex-col items-center text-xs opacity-50"
                    >
                        <Icon class="h-6 w-6" name="ph:paperclip-bold" />
                        Sticky
                    </div>
                    <h2 class="h4">
                        {{ article.title }}
                    </h2>
                    <h3 class="italic">
                        {{ article.subtitle }}
                    </h3>
                    <span
                        class="flex flex-row items-center gap-1 text-2xs opacity-50"
                    >
                        <Icon class="h-4 w-4" name="ri:calendar-2-fill" />
                        <span>{{
                            dateConverter(article.publishedAt)
                        }}</span></span
                    >
                </nuxt-link>
            </template>
            <template v-for="article in data">
                <nuxt-link
                    v-if="!article.sticky"
                    :key="article._id"
                    :to="`/article/${article.slug.current}`"
                    class="flex w-full flex-col bg-butterscotch-500 bg-opacity-10 p-4 shadow-lg transition-all duration-300 hover:bg-opacity-80 dark:bg-navy-400 dark:hover:text-butterscotch-200"
                >
                    <h2 class="h4">
                        {{ article.title }}
                    </h2>
                    <h3 class="italic">
                        {{ article.subtitle }}
                    </h3>
                    <span
                        class="flex flex-row items-center gap-1 text-2xs opacity-50"
                    >
                        <Icon class="h-4 w-4" name="ri:calendar-2-fill" />
                        <span>{{
                            dateConverter(article.publishedAt)
                        }}</span></span
                    >
                </nuxt-link>
            </template>
        </div>
    </div>
</template>

<script setup>
import { dateConverter } from '@/scripts/helpers'
const { toPascalCase } = useStringUtils()
const route = useRoute()

const query = groq`*[_type == "article" && references(*[ slug.current == "${route.params.slug}"]._id)]{
  title,
  subtitle,
  sticky,
    slug,
    _id,
    publishedAt,
    categories[]->{
      slug
    }
}
`

const sanity = useSanity()

const { data } = await useLazyAsyncData('catArticles', () =>
    sanity.fetch(query)
)

const catTitle = computed(() => toPascalCase(route.params.slug))

useHead({
    title: catTitle.value
})
</script>
