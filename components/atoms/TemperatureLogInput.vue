<template>
    <label class="grid justify-between w-full grid-cols-12 gap-2 lg:items-center">
        <span class="mb-2 font-bold col-span-full lg:col-span-2">{{ item }}</span>
        <span class="relative grid items-center justify-center grid-cols-2 col-span-5 gap-1 lg:col-span-3 lg:col-start-3">
            <button
                type="button"
                :class="[plusMinusClasses, dynamicMinusClasses, 'ml-auto']"
                @click="togglePlusMinus('minus')"
            >Below 0&deg;</button>
            <button
                type="button"
                :class="[plusMinusClasses, dynamicPlusClasses, 'mr-auto']"
                @click="togglePlusMinus('plus')"
            >
                Above 0&deg;</button>
        </span>
        <input
            v-model="input"
            class="col-span-4 col-start-6 text-center dark:bg-navy-400 lg:col-span-3 lg:col-start-6"
            min="0"
            :name="`${item} raw`"
            type="number"
            placeholder="Temp"
            required
        >
        <input
            :name="item"
            readonly
            class="col-span-3 col-start-10 bg-transparent"
            :value="valueString"
        >
    </label>
</template>

<script setup>

const props = defineProps({
    item: {
        type: String,
        required: true
    },
    plusOrMinus: {
        type: String,
        required: false,
        default: 'plus'
    }
})

console.log(props)

const plusMinusClasses = computed(() => {
    return 'px-1 flex items-center justify-center bg-gradient-to-b col-span-1 whitespace-no-wrap text-2xs'
})

const dynamicPlusClasses = computed(() => {
    return state.plusOrMinus === 'plus' ? 'from-red-500 to-red-800 text-white' : 'from-transparent'
})

const dynamicMinusClasses = computed(() => {
    return state.plusOrMinus === 'minus' ? 'from-blue-500 to-blue-400 text-white' : 'from-transparent'
})

const input = ref()

const state = reactive({
    plusOrMinus: props.plusOrMinus
})

const togglePlusMinus = (value) => {
    state.plusOrMinus = value
}

const isAboveZero = computed(() => { return state.plusOrMinus === 'plus' ? '+' : '-' })

const valueString = computed(() => {
    return input.value ? `${isAboveZero.value}${input.value}°C` : '- -'
})

</script>
