<template>
    <section>
        <div class="container mb-6 ">
            <h2 class="h2">
                Been Awesome Winners
            </h2>
        </div>
        <div class="container flex w-full">
            <div class="relative flex flex-col items-center w-full p-8 border-2 border-gray-400 border-dashed max-w-screen-xs bg-gray-50 dark:bg-gray-800 dark:text-gray-200">
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
            <!-- <div>
                <div
                    v-for="winner in previousWinners"
                    key="winner.id"
                >
                    {{ winner }}
                </div>
            </div> -->
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

// const previousWinners = computed(() => {
//     return allWinners.value
// })

</script>
