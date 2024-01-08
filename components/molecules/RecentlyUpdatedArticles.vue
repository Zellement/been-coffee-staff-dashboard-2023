<template>
    <div class="relative">
        <div class="container">
            <h2 class="mb-6 h1">
                Recently Updated Articles
            </h2>
            <ul class="grid grid-cols-2 gap-2 md:gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-4">
                <li
                    v-for="item in data.allArticles"
                    :key="item.id"
                    class="flex flex-grow w-full"
                >
                    <nuxt-link
                        class="flex flex-col flex-grow p-2 transition-colors duration-300 border rounded-lg lg:p-4 bg-white/50 dark:bg-navy/60 hover:bg-white dark:hover:bg-navy-600 border-current/40"
                        :to="`/article/${item.slug}`"
                    >
                        <span class="text-lg font-bold font-riverside">{{ item.title }}</span>
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

const QUERY = `
query MyQuery {
  allArticles(orderBy: _updatedAt_DESC, first: "4") {
    slug
    id
    title
    subtitle
    _updatedAt
  }
}
`

const { data } = await useGraphqlQuery({ query: QUERY })

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
