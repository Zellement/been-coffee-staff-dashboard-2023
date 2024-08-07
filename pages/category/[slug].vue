<template>
    <div
        class="container flex flex-col space-y-8"
    >
        <page-hero
            :title="catTitle"
            subtitle="Category"
        />
        <div
            v-if="data"
            class="grid grid-cols-1 gap-4 pb-16 md:grid-cols-2 xl:grid-cols-4"
        >
            <template
                v-for="article in data"
            >
                <nuxt-link
                    v-if="article.sticky"
                    :key="article._id"
                    :to="`/article/${article.slug.current}`"
                    class="flex flex-col w-full p-4 transition-all duration-300 relative shadow-lg bg-butterscotch-500 dark:bg-navy-400 bg-opacity-10 hover:bg-opacity-80 dark:hover:text-butterscotch-200"
                >
                    <div class="flex flex-col text-xs absolute top-2 right-2 items-center opacity-50">
                        <Icon
                            class="w-6 h-6"
                            name="ph:paperclip-bold"
                        />
                        Sticky
                    </div>
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
            </template>
            <template
                v-for="article in data"
            >
                <nuxt-link
                    v-if="!article.sticky"
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

const { data } = await useLazyAsyncData('catArticles', () => sanity.fetch(query))

const catTitle = computed(() => toPascalCase(route.params.slug))

useHead({
    title: catTitle.value
})

// onMounted(() => {
//     console.log(data)
// })

</script>
