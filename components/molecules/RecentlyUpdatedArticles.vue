<template>
    <div class="relative">
        <div class="container">
            <h2 class="mb-6 h1">
                Recently Updated Articles
            </h2>
            <ul class="grid gap-2 md:grid-cols-2 md:gap-4 lg:gap-8 lg:grid-cols-4">
                <li
                    v-for="item in data"
                    :key="item._id"
                    class="flex flex-grow w-full shadow-lg "
                >
                    <nuxt-link
                        class="flex flex-col flex-grow p-2 transition-colors duration-300 bg-white lg:p-4 dark:bg-navy-400 hover:bg-butterscotch-200 dark:hover:bg-navy-600 border-current/40"
                        :to="`/article/${item.slug.current}`"
                    >
                        <span class="krete-title">{{ item.title }}</span>
                        <span class="mb-4 text-xs">{{ item.subtitle }}</span>
                        <span class="mt-auto text-2xs">Updated: {{ inputDate(item._updatedAt) }}</span>
                    </nuxt-link>
                </li>
            </ul>

            <site-search
                display-text="See all articles"
                class="mt-8 button"
            />
        </div>
    </div>
</template>

<script setup>

const query = groq`*[_type == "article"][0..3]{
    title,
    subtitle,
    publishedAt,
    _updatedAt,
    slug,
}
`

const sanity = useSanity()

const { data } = await useAsyncData('latestUpdatedArticles', () => sanity.fetch(query))

const inputDate = (date) => {
    const theDate = new Date(date)
    return theDate.toLocaleString('en-GB', {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'short',
        day: 'numeric'

    })
}

</script>
