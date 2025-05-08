<template>
    <div class="relative">
        <div class="container">
            <h2 class="h1">Recent 15 Orders</h2>
        </div>
        <div v-if="allOrders">
            <carousel-wrapper class="pt-2" track-classes="pt-6">
                <li
                    v-for="item in allOrders"
                    :key="item._id"
                    class="card relative w-64 min-w-64 !rounded-tl-none !rounded-tr-none pt-4"
                >
                    <div
                        class="absolute -top-px left-0 -translate-y-full border border-b-0 bg-white px-2 py-0.5 text-3xs uppercase tracking-wider text-gray-400 dark:border-navy-500 dark:bg-navy-700 dark:text-navy-50"
                    >
                        {{ item.supplier.title }}
                    </div>
                    <div
                        class="absolute right-0 top-0 -translate-y-full border border-b-0 px-2 py-0.5 text-3xs uppercase tracking-wider text-gray-400 dark:border-navy-500 dark:bg-navy-500/50 dark:text-navy-50"
                    >
                        {{ dateConverterWithDay(item.orderDate) }}
                    </div>
                    <div class="flex w-full flex-col">
                        <div
                            class="mb-2 flex h-16 justify-between overflow-hidden p-1"
                        >
                            <div
                                class="flex h-full flex-grow-0 overflow-hidden rounded-full bg-white shadow"
                            >
                                <img
                                    :src="
                                        $urlFor(item.supplier.logo)
                                            .height(50)
                                            .fit('clip')
                                            .url()
                                    "
                                    class="my-auto w-20 bg-white px-4"
                                    height="60"
                                    loading="lazy"
                                />
                            </div>
                            <img
                                v-if="item.orderedBy?.image"
                                :src="
                                    $urlFor(item.orderedBy.image)
                                        .width(54)
                                        .height(54)
                                        .url()
                                "
                                :alt="item.orderedBy?.name"
                                class="aspect-square rounded-full"
                                width="54"
                                height="54"
                                loading="lazy"
                            />
                        </div>
                        <div class="flex flex-col text-sm">
                            <span
                                class="flex flex-row items-center justify-center space-x-1 text-navy-500 dark:text-butterscotch-500"
                            >
                                <Icon
                                    class="h-6 w-6 p-1"
                                    name="clarity:truck-solid"
                                />
                                <span
                                    >Delivery
                                    {{
                                        dateConverterWithDay(
                                            item.expectedDeliveryDate
                                        )
                                    }}
                                </span>
                            </span>
                        </div>
                    </div>
                    <template v-if="item.usualOrder">
                        <div class="mt-4 flex flex-col">
                            <p class="text-center italic opacity-50">
                                Usual order for this supplier.
                            </p>
                        </div>
                    </template>
                    <template v-if="item.orderDetails">
                        <div class="mt-4 flex flex-col">
                            <card-order-details :details="item.orderDetails" />
                        </div>
                    </template>
                </li>
            </carousel-wrapper>
        </div>
    </div>
</template>

<script setup>
import { dateConverterWithDay } from '@/scripts/helpers'

const query = groq`
*[_type == "order"]|order(expectedDeliveryDate desc)[0..14]{
  supplier->{
    logo,
    title
  },
  orderDate,
  expectedDeliveryDate,
  orderedBy->{
     image,
    name
  },
    _id,
  usualOrder,
  orderDetails
}

`

const sanity = useSanity()

const { data } = await useAsyncData('orders', () => sanity.fetch(query))

const allOrders = computed(() => {
    return data.value
})
// const getOrderedBy = (item) => {
//     return item.orderedBy?.name ?? 'Sarah'
// }
</script>
