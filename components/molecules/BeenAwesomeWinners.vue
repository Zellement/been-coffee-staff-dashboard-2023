<template>
    <section>
        <div class="container mb-6 ">
            <h2 class="h2">
                Been Awesome Winners
            </h2>
        </div>
        <div class="px-2 overflow-hidden">
            <div class="w-full pb-4 overflow-x-scroll ">
                <div class="relative flex flex-row w-full space-x-4">
                    <div class="relative  flex flex-col items-center p-8 border-2 border-gray-400 border-dashed min-w-[20rem] w-[20rem] bg-neutral-50 dark:bg-neutral-900 dark:text-gray-200">
                        <img
                            src="@/assets/images/beenawesome.png"
                            alt="You've Been Awesome logo"
                            class="max-w-[10rem] w-full mb-4 dark:contrast-200 dark:invert dark:brightness-0"
                        >
                        <a
                            class="absolute top-0 transition-opacity duration-300 opacity-50 right-1 hover:opacity-100"
                            target="_blank"
                            href="https://mailchi.mp/745f4973215e/welcome-to-whats-been-happening-12011162"
                        >
                            <Icon
                                name="ph:info-bold"
                                class="w-5 h-5 "
                            />
                        </a>
                        <h3 class=" h3">
                            {{ currentWinner.winner?.name }}
                        </h3>

                        <div class="flex flex-row items-center gap-2 mb-4">
                            <Icon
                                name="pepicons-pop:calendar-circle"
                                class="w-4 h-4 opacity-50"
                            />
                            <span><em>Since</em> {{ dateConverter(currentWinner?.from) }}</span>
                        </div>

                        <div class="flex w-auto overflow-hidden aspect-square">
                            <img
                                :alt="currentWinner.winner.name"
                                :src="`${currentWinner.winner?.picture?.url}?w=300`"
                                class="object-cover w-full h-full"
                            >
                        </div>
                    </div>

                    <div
                        v-for="winner in previousWinners"
                        :key="winner.id"
                        class="relative flex flex-col items-center p-8 my-16 bg-transparent border-2 border-gray-400 border-dotted w-[16rem] min-w-[16rem] dark:text-gray-200 "
                    >
                        <h3 class=" h3">
                            {{ winner.winner?.name }}
                        </h3>

                        <div class="flex flex-col items-center mb-4">
                            <span><strong>From</strong> {{ dateConverter(winner?.from) }}</span>
                            <span><strong>To</strong> {{ dateConverter(winner?.to) }}</span>
                        </div>

                        <div class="flex w-auto overflow-hidden aspect-square">
                            <img
                                :alt="winner.winner.name"
                                :src="`${winner.winner?.picture?.url}?w=220`"
                                class="object-cover w-full h-full"
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
const QUERY = `
query BeenAwesomeWinners {
  allBeenAwesomeWinners(orderBy: from_DESC) {
    id
    winner {
      name
      picture {
        url
      }
    }
    from
    to
  }
}
`

const { data } = await useGraphqlQuery({ query: QUERY })

const allWinners = computed(() => {
    return data.value?.allBeenAwesomeWinners
})

const currentWinner = computed(() => {
    return allWinners.value[0]
})

const previousWinners = computed(() => {
    return allWinners.value.slice(1)
})

// const previousWinners = computed(() => {
//     return allWinners.value
// })

</script>
