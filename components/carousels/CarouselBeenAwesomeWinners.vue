<template>
    <section v-if="allWinners">
        <div
            class="container relative flex flex-row items-center justify-between md:gap-4"
        >
            <h2 class="h1">Been Awesome</h2>

            <nuxt-link
                class="button flex-shrink-0 self-end"
                target="_blank"
                to="/article/been-awesome-award"
            >
                What's this?
            </nuxt-link>
        </div>
        <carousel-wrapper>
            <li
                class="relative flex w-[20rem] min-w-[20rem] flex-col items-center rounded-lg bg-gradient-to-br from-neutral-800 to-black p-8 text-white shadow-lg dark:bg-gradient-to-b dark:from-white dark:to-gray-100 dark:text-gray-800"
            >
                <img
                    src="@/assets/images/beenawesome.png"
                    alt="You've Been Awesome logo"
                    class="mb-4 w-full max-w-[10rem] brightness-75 contrast-200 invert dark:invert-0"
                />
                <h3 class="font-krete text-2xl">
                    {{ currentWinner.winner?.name }}
                </h3>

                <div class="mb-4 flex flex-col items-center opacity-80">
                    <span class="flex flex-row items-center gap-1">
                        <Icon
                            name="pepicons-pop:calendar-circle"
                            class="h-4 w-4"
                        />
                        <span
                            ><em>Since</em>
                            {{ dateConverter(currentWinner?.from) }}</span
                        >
                    </span>
                    <span class="text-xs italic"
                        >{{
                            Math.round(duration(new Date(), currentWinner.from))
                        }}
                        days</span
                    >
                </div>

                <div class="flex w-auto overflow-hidden">
                    <img
                        :src="
                            $urlFor(currentWinner.winner.image)
                                .width(300)
                                .height(400)
                                .url()
                        "
                        height="500"
                        width="300"
                        loading="lazy"
                    />
                </div>
            </li>

            <li
                v-for="winner in previousWinners"
                :key="winner.id"
                class="relative my-16 w-[16rem] min-w-[16rem] items-center justify-center rounded-lg bg-white p-8 text-center shadow-lg dark:bg-navy-500"
            >
                <h3 class="font-krete text-xl">
                    {{ winner.winner?.name }}
                </h3>

                <div class="mb-4 flex flex-col items-center opacity-60">
                    <span
                        ><strong>From</strong>
                        {{ dateConverter(winner?.from) }}</span
                    >
                    <span
                        ><strong>To</strong>
                        {{ dateConverter(winner?.to) }}</span
                    >
                    <span class="text-xs italic"
                        >{{ duration(winner.to, winner.from) }} days</span
                    >
                </div>

                <div class="flex w-auto overflow-hidden">
                    <img
                        :src="
                            $urlFor(winner.winner.image)
                                .width(300)
                                .height(450)
                                .url()
                        "
                        width="300"
                        height="450"
                        loading="lazy"
                    />
                </div>
            </li>
        </carousel-wrapper>
    </section>
</template>

<script setup>
import { dateConverter } from '~/scripts/helpers'

const query = groq`*[_type == "beenAwesomeWinner"] | order(from desc) {
  winner->{
    name,
    image
  },
    from,
    to
}
`
const sanity = useSanity()

const { data } = await useAsyncData('beenAwesomeWinners', () =>
    sanity.fetch(query)
)

const allWinners = computed(() => {
    return data.value
})

const duration = (to, from) => {
    const startDate = new Date(from)
    const endDate = new Date(to)
    const months = (endDate.getTime() - startDate.getTime()) / 1000 / 86400
    return months
}

const currentWinner = computed(() => {
    return allWinners?.value[0]
})
const previousWinners = computed(() => {
    return allWinners?.value.slice(1)
})
</script>
