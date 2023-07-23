<template>
    <div class="relative flex h-screen max-h-screen ml-auto overflow-hidden" v-if="data">
        <section className="py-8">
            <h2>Last 30 Orders</h2>
            <div className="w-full py-8 overflow-x-scroll">
                <div className="flex flex-row w-full pl-4 space-x-4">
                    <div class="flex flex-col flex-shrink-0 w-3/4 p-4 shadow-lg rounded-xl md:w-auto sm:min-w-[250px] sm:w-2/5 bg-seashell-400 dark:bg-navy-400" v-for="item in data.allOrders" :key="item.id">
                        <div class="grid w-full grid-cols-2">
                            <div class="flex flex-col text-xs">
                                <span class="flex flex-row items-center space-x-2 text-tuscany">
                                    <Icon name="clarity:truck-solid" />
                                    <span>{{ item.expectedDeliveryDate }}</span>
                                </span>
                                <span class="flex flex-row items-center space-x-2 opacity-30">
                                    <Icon name="clarity:pound-line" />
                                    <span>{{ item.orderDate }}</span>
                                </span>
                            </div>
                            <img class="block w-12 h-auto my-auto ml-auto" :src="item.supplier.logo.url" />
                        </div>
                        <div class="flex flex-col mt-8">
                            <h3 class="h4">Details</h3>
                            <div v-html="item.details" />
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
        }
        details
    }
  }
`

const { data } = await useGraphqlQuery({ query: QUERY })

console.log(data)
</script>
