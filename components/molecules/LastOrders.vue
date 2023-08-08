<template>
    <div class="relative" v-if="data">
        <section className="py-8 ">
            <div class="container">
                <h2 class="h2">Last 30 Orders</h2>
            </div>
            <div class="px-2 overflow-hidden">
                <div className="w-full py-8 overflow-x-scroll">
                    <div className="flex flex-row w-full space-x-4">
                        <div class="flex relative flex-col w-3/4 p-4 shadow-lg rounded-xl md:w-auto min-w-[300px] sm:w-2/5 bg-seashell-400 dark:bg-navy-400" v-for="item in data.allOrders" :key="item.id">
                            <div class="absolute top-0 right-0 uppercase -translate-y-1/2 bg-white text-3xs px-2 dark:text-navy-50 dark:bg-navy-400 rounded-tl-lg py-0.5">{{  item.supplier.name }}</div>
                            <div class="grid w-full grid-cols-7">
                                <div class="flex flex-col col-span-5 text-xs">
                                    <span class="flex flex-row items-center space-x-2 dark:text-butterscotch-500 text-navy-500">
                                        <Icon class="w-5 h-5 p-1 rounded-full bg-butterscotch-500 dark:bg-navy-700 " name="clarity:truck-solid" />
                                        <span>
                                            {{ dateConverter(item.expectedDeliveryDate) }}
                                        </span>
                                    </span>
                                    <span class="flex flex-row items-center space-x-2 ">
                                        <Icon class="w-5 h-5 p-1 rounded-full bg-butterscotch-100 dark:text-butterscotch-500 text-butterscotch-800 dark:bg-navy-300 "  name="clarity:pound-line" />
                                        <span class="opacity-50">
                                            {{ dateConverter(item.orderDate) }}
                                        </span>
                                    </span>
                                </div>
                                <div class="flex col-span-2 p-1 overflow-hidden bg-white rounded-full">
                                    <img class="w-auto h-auto m-auto max-h-12" :src="item.supplier.logo.url" />
                                </div>
                            </div>
                            <div class="flex flex-col mt-8">
                                <h3 class="h4">Details</h3>
                                <div v-html="item.details" />
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
    }
  }
`

const { data } = await useGraphqlQuery({ query: QUERY })

const dateConverter = (value) => {
    const event = new Date(value)
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    return event.toLocaleDateString('en-UK', options)
}

</script>
