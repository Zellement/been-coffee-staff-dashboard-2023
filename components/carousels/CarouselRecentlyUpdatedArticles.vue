<template>
    <div class="relative">
        <div class="container">
            <h2 class="h1">
                Recently Updated Articles
            </h2>
        </div>
        <carousel-wrapper>
            <li
                v-for="item in data"
                :key="item._id"
                class="w-40 min-w-40 card"
            >
                <nuxt-link
                    class="flex flex-col flex-grow transition-colors duration-300  hover:bg-butterscotch-200 dark:hover:bg-navy-600 border-current/40"
                    :to="`/article/${item.slug?.current}`"
                >
                    <span class="krete-title !text-sm">{{ item.title }}</span>
                    <span class="mt-auto text-2xs opacity-50">Updated: {{ inputDate(item._updatedAt) }}</span>
                </nuxt-link>
            </li>
        </carousel-wrapper>

        <div class="container flex w-full">
            <button-site-search
                display-text="See all articles"
                class=" ml-auto button"
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
