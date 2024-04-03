<template>
    <div
        class="container flex flex-col space-y-8"
    >
        <content-hero
            :title="catTitle"
            subtitle="Category"
        />
        <div
            v-if="data"
            class="grid grid-cols-1 gap-4 pb-16 md:grid-cols-2 xl:grid-cols-4"
        >
            <nuxt-link
                v-for="article in data"
                :key="article._id"
                :to="`/article/${article.slug.current}`"
                class="flex flex-col w-full p-4 transition-all duration-300 shadow-lg bg-butterscotch-500 dark:bg-navy-400 bg-opacity-10 hover:bg-opacity-80 dark:hover:text-butterscotch-200"
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
                    <span>{{ dateConverter(article.publishedAt) }}</span></span>
            </nuxt-link>
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
    slug,
    _id,
    publishedAt,
    categories[]->{
      slug
    }
}
`

const sanity = useSanity()

const { data } = await useLazyAsyncData('catArticles', () => sanity.fetch(query))

const catTitle = computed(() => toPascalCase(route.params.slug))

useHead({
    title: catTitle.value
})

</script>
