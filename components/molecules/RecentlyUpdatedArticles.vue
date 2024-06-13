<template>
    <div class="relative">
        <div class="container">
            <h2 class="mb-6 h1">
                Recently Updated Articles
            </h2>
            <ul
                v-if="data"
                class="grid gap-2 grid-cols-2 md:gap-4 lg:gap-8 lg:grid-cols-4"
            >
                <li
                    v-for="item in data"
                    :key="item._id"
                    class="flex flex-grow w-full card"
                >
                    <nuxt-link
                        class="flex flex-col flex-grow p-3 transition-colors duration-300  lg:p-4  hover:bg-butterscotch-200 dark:hover:bg-navy-600 border-current/40"
                        :to="`/article/${item.slug?.current}`"
                    >
                        <span class="krete-title !text-sm">{{ item.title }}</span>
                        <span class="mt-auto text-2xs opacity-50">Updated: {{ inputDate(item._updatedAt) }}</span>
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

const query = groq`*[_type == "article"]|order(_updatedAt desc)[0..3]{  
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
