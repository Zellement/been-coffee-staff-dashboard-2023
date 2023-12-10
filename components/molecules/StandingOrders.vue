<template>
    <div class="relative">
        <section class="py-8">
            <div class="container ">
                <h2 class="h1">
                    Standing Orders
                </h2>
            </div>
            <div class="px-2 overflow-hidden md:px-4">
                <div class="w-full py-8 overflow-x-scroll ">
                    <div class="flex flex-row w-full space-x-4">
                        <div
                            v-for="item in data.allStandingOrders"
                            :key="item.id"
                            class="flex relative flex-col w-3/4 p-4 shadow-lg rounded-xl md:w-auto min-w-[300px] sm:w-2/5 bg-seashell-400 dark:bg-navy-400"
                        >
                            <div class="absolute top-0 right-0 uppercase -translate-y-1/2 bg-white text-3xs px-2 dark:text-navy-50 dark:bg-navy-400 text-gray-400 rounded-tl-lg py-0.5 tracking-wider">
                                {{ item.supplier.name }}
                            </div>
                            <div class="grid w-full grid-cols-7 gap-2">
                                <div class="flex flex-col col-span-5 text-xs">
                                    <span class="flex flex-row items-center my-auto space-x-2 dark:text-butterscotch-500 text-navy-500">
                                        <Icon
                                            class="w-5 h-5 p-1 rounded-full bg-butterscotch-500 dark:bg-navy-700 "
                                            name="clarity:truck-solid"
                                        />
                                        <span>{{ item.deliverySchedule }}
                                        </span>
                                    </span>
                                </div>
                                <div class="flex col-span-2 p-1 overflow-hidden bg-white rounded-full">
                                    <img
                                        class="w-auto h-auto my-auto ml-auto dark:m-auto max-h-12"
                                        :src="item.supplier.logo.url"
                                    >
                                </div>
                            </div>
                            <div class="flex flex-col mt-4">
                                <h3 class="h4">
                                    Details
                                </h3>
                                <p
                                    v-if="item.standard"
                                    class="italic opacity-50"
                                >
                                    Standard order for this supplier.
                                </p>
                                <div
                                    class="content"
                                    v-html="item.details"
                                />
                            </div>
                            <div
                                v-if="item.notes"
                                class="flex flex-col mt-4"
                            >
                                <h3 class="h4">
                                    Notes
                                </h3>
                                <div
                                    class="content"
                                    v-html="item.notes"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const QUERY = `
query {
    allStandingOrders {
    id
    deliverySchedule
    details
     supplier {
        logo {
            url
        }
        name
        }
    }
}
`

const { data } = await useGraphqlQuery({ query: QUERY })

</script>
