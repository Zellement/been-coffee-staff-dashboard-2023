<template>
    <section class="my-16 ">
        <div class="container">
            <h2 class="mb-6 h1">
                Advent Calendar Winners
            </h2>
            <div class="relative grid w-full grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
                <div
                    v-for="i in 24"
                    :key="i"
                    class="relative grid flex-shrink-0 w-full grid-cols-1 text-center aspect-square font-riverside bg-black/20"
                >
                    <template
                        v-for="winner in winners"
                        :key="winner.id"
                    >
                        <div
                            v-if="winner.date === i.toString().padStart(2,'0')"
                            class="flex flex-shrink-0 w-full col-span-1 col-start-1 row-start-1 aspect-square"
                        >
                            <div
                                v-for="singleWinner in winner.winner"
                                :key="`${singleWinner.name}${singleWinner.id}`"
                                class="relative flex flex-col w-full text-right "
                            >
                                <div class="absolute bottom-0 right-0 z-10 px-2 text-2xs bg-navy-500">
                                    {{ singleWinner.name }}
                                </div>

                                <div class="flex items-center w-full h-full ">
                                    <Image
                                        :data="singleWinner?.picture?.responsiveImage"
                                        :class="winner.winner.length > 1 ? '' : 'object-cover w-full h-full'"
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            class="absolute top-0 left-0 block p-1 text-sm leading-none bg-navy-500 aspect-square"
                        >
                            {{ i.toString().padStart(2,'0') }}
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

import { Image } from 'vue-datocms'

const QUERY = `
query MyQuery {
  adventCalendar {
    id
    winners {
      id
      date
      winner {
        name
        picture {
            url
            responsiveImage(
                imgixParams: { fit: crop, w: 300, h: 300, auto: format }
                ) {
            src
            width
            height
            }
        }
      }
    }
  }
}
`

const { data } = await useGraphqlQuery({ query: QUERY })

const winners = computed(() => {
    return data?.value?.adventCalendar?.winners
})

</script>
