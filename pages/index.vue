<template>
    <div class="relative">
        <div class="flex flex-col">
            <button>
                Hello
            </button>
            <!-- {{ connect }} -->
            <div class="flex flex-col pb-32">
                <last-orders />
                <standing-orders />
                <team-members />
            </div>
        </div>
    </div>
</template>

<script setup>

// import { run } from '@/server/api/dato-cma'

// const { data } = await useFetch('/api/dato-cma')

// const connect = computed(() => {
//     return data

useHead({
    title: 'Been Staff Dashboard'
})

</script>
