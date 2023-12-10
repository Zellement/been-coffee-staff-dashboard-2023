<template>
    <div class="relative">
        <section class="pb-8">
            <div class="container ">
                <h2 class="h1">
                    Last {{ orderTotal }} Orders
                </h2>
            </div>
            <div class="px-2 overflow-hidden md:px-4">
                <div class="w-full py-8 overflow-x-scroll ">
                    <div class="flex flex-row w-full space-x-4">
                        <div
                            v-for="item in allOrders"
                            :key="item.id"
                            class="flex relative flex-col w-3/4 p-4 shadow-lg rounded-xl  min-w-[300px] bg-seashell-400 dark:bg-navy-400"
                        >
                            <div class="absolute top-0 right-0 uppercase -translate-y-1/2 bg-white text-3xs px-2 dark:text-navy-50 dark:bg-navy-400 text-gray-400 rounded-tl-lg py-0.5 tracking-wider">
                                {{ item.supplier.name }}
                            </div>
                            <div class="flex flex-col w-full">
                                <div class="flex h-16 p-1 overflow-hidden bg-white rounded-full">
                                    <img
                                        class="w-auto h-auto m-auto max-w-[8rem] dark:m-auto max-h-12"
                                        :src="item.supplier.logo.url"
                                    >
                                </div>
                                <div class="flex flex-col text-sm dark:mt-4 lg:text-xs">
                                    <span class="flex flex-row items-center justify-center space-x-2 dark:text-butterscotch-500 text-navy-500">
                                        <Icon
                                            class="w-6 h-6 p-1 rounded-full bg-butterscotch-500 dark:bg-navy-700 "
                                            name="clarity:truck-solid"
                                        />
                                        <span>
                                            {{ dateConverterWithDay(item.expectedDeliveryDate) }}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div
                                class="mt-4 text-xs italic text-center opacity-50"
                            >
                                <p>
                                    Ordered by {{ getOrderedBy(item) }} on
                                    {{ dateConverterWithDay(item.orderDate) }}
                                </p>
                            </div>
                            <div class="flex flex-col mt-4">
                                <h3 class="h4">
                                    Details
                                </h3>
                                <template v-if="item.details || item.standard">
                                    <p
                                        v-if="item.standard"
                                        class="italic opacity-50"
                                    >
                                        Standard order for this supplier
                                    </p>
                                    <div
                                        class="content"
                                        v-html="item.details"
                                    />
                                </template>
                                <p
                                    v-else
                                    class="italic opacity-50"
                                >
                                    No details
                                </p>
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
import { dateConverterWithDay } from '@/scripts/helpers'
const QUERY = `
  query {
    allOrders(orderBy: expectedDeliveryDate_DESC) {
        id
        expectedDeliveryDate
        orderDate
        standard
        supplier {
            logo {
                url
            }
            name
        }
        details
        notes
        orderedBy {
            name
        }
    }
  }
`

const orderTotal = 15

const allOrders = computed(() => {
    return data.value.allOrders.slice(0, orderTotal)
})

const { data } = await useGraphqlQuery({ query: QUERY })

const getOrderedBy = (item) => {
    return item.orderedBy?.name ?? 'Sarah'
}

</script>
