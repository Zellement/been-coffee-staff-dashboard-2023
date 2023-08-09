<template>
    <div v-if="uiStore.showSearchResults" class="fixed inset-0 z-10 flex pt-40 bg-red-500">

        <div class="flex">

            <input name="site-search" id="site-search" placeholder="Search..." />

        </div>

    </div>
</template>

<script setup>

import { useUiStore } from '@/stores/uiStore'

const uiStore = useUiStore()

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
    }
  }
`

const { data } = await useGraphqlQuery({ query: QUERY })

</script>
