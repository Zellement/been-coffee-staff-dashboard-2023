<template>
    <section v-if="allWinners">
        <div class="container relative flex flex-row items-center justify-between mb-6 md:justify-start md:gap-4">
            <h2 class="h1">
                Been Awesome Winners
            </h2>
            <nuxt-link
                class="transition-opacity duration-300 opacity-50 hover:opacity-100"
                to="/article/been-awesome-award"
            >
                <Icon
                    name="ic:baseline-help"
                    class="w-6 h-6"
                />
            </nuxt-link>
        </div>
        <div class="px-2 overflow-hidden md:px-4">
            <div class="w-full pb-4 overflow-x-scroll ">
                <div class="relative flex flex-row w-full space-x-4">
                    <div class="relative  flex flex-col items-center p-8 shadow-lg min-w-[20rem] w-[20rem] bg-gradient-to-br from-neutral-800 to-black text-white dark:bg-neutral-900 dark:text-gray-200">
                        <img
                            src="@/assets/images/beenawesome.png"
                            alt="You've Been Awesome logo"
                            class="max-w-[10rem] w-full mb-4 contrast-200 invert brightness-75"
                        >
                        <h3 class="text-2xl font-krete">
                            {{ currentWinner.winner?.name }}
                        </h3>

                        <div class="flex flex-col items-center mb-4 opacity-80">
                            <span class="flex flex-row items-center gap-1">
                                <Icon
                                    name="pepicons-pop:calendar-circle"
                                    class="w-4 h-4 "
                                />
                                <span><em>Since</em> {{ dateConverter(currentWinner?.from) }}</span>
                            </span>
                            <span class="text-xs italic">{{ Math.round(duration(new Date(), currentWinner.from)) }} days</span>
                        </div>

                        <div class="flex w-auto overflow-hidden ">
                            <img
                                :src="$urlFor(currentWinner.winner.image).width(300).height(400).url()"
                                height="500"
                                width="300"
                                loading="lazy"
                            >
                        </div>
                    </div>

                    <div
                        v-for="winner in previousWinners"
                        :key="winner.id"
                        class="relative flex flex-col justify-center items-center my-16 p-8 card  w-[16rem] min-w-[16rem]  "
                    >
                        <h3 class="text-xl font-krete">
                            {{ winner.winner?.name }}
                        </h3>

                        <div class="flex flex-col items-center mb-4 opacity-60">
                            <span><strong>From</strong> {{ dateConverter(winner?.from) }}</span>
                            <span><strong>To</strong> {{ dateConverter(winner?.to) }}</span>
                            <span class="text-xs italic">{{ duration(winner.to, winner.from) }} days</span>
                        </div>

                        <div class="flex w-auto overflow-hidden ">
                            <img
                                :src="$urlFor(winner.winner.image).width(300).height(450).url()"
                                width="300"
                                height="450"
                                loading="lazy"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

const { data } = await useAsyncData('beenAwesomeWinners', () => sanity.fetch(query))

const allWinners = computed(() => {
    return data.value
})

const duration = (to, from) => {
    const startDate = new Date(from)
    const endDate = new Date(to)
    const months = ((endDate.getTime() - startDate.getTime()) / 1000) / 86400
    return months
}

const currentWinner = computed(() => {
    return allWinners?.value[0]
})
const previousWinners = computed(() => {
    return allWinners?.value.slice(1)
})

</script>
