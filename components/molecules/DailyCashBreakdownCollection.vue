<template>
    <div>
        <div class="sticky top-0 flex flex-row items-center justify-between gap-2 py-1.5 bg-seashell dark:bg-navy">
            <div class="flex flex-row items-center gap-3">
                <div
                    class="w-4 h-4 rounded-full"
                    :class="style"
                />
                <h3 class="h3">
                    {{ title }}
                </h3>
            </div>
            <p>{{ totalValue }}</p>
        </div>
        <div class="flex flex-col gap-2">
            <div class="grid grid-cols-3">
                <span class="font-bold">Denomination</span>
                <span class="font-bold">Value</span>
                <span class="font-bold">Count</span>
            </div>
            <label
                v-for="(item) in state.denominations"
                :key="`black-tin__${item}`"
                class="grid grid-cols-3 gap-2"
            >
                <span>{{ item.denomination }}</span>
                <span>{{ getValue(item) }}</span>
                <input
                    v-model="item.value"
                    :name="`${item}_amount`"
                    type="number"
                >
            </label>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    collection: {
        type: String,
        required: true
    },
    collectionStyle: {
        type: String,
        required: true
    }
})

const title = computed(() => {
    return props.collection
})

const style = computed(() => {
    return props.collectionStyle
})
const state = reactive({
    denominations: [
        { denomination: '5p', value: 0, multiple: 0.05 },
        { denomination: '10p', value: 0, multiple: 0.1 },
        { denomination: '20p', value: 0, multiple: 0.2 },
        { denomination: '50p', value: 0, multiple: 0.5 },
        { denomination: '£1', value: 0, multiple: 1 },
        { denomination: '£2', value: 0, multiple: 2 },
        { denomination: '£5', value: 0, multiple: 5 },
        { denomination: '£10', value: 0, multiple: 10 },
        { denomination: '£20', value: 0, multiple: 20 }
    ],
    totalValue: 0
})

// const denominations = reactive(() => {
//         { denomination: '5p', value: 0 },
//         { denomination: '10p', value: 0 },
//         { denomination: '20p', value: 0 },
//         { denomination: '50p', value: 0 }
// })

const formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP'
})

const getValue = (item) => {
    return formatter.format(item.value * item.multiple)
}

const totalValue = computed(() => {
    let value = 0
    state.denominations.forEach(element => {
        value = value + (element.value * element.multiple)
    }
    )
    return formatter.format(value)
})

</script>
