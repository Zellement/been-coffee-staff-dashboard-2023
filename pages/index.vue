<template>
    <div class="relative">
        <div class="flex flex-col">
            <button>
                Hello
            </button>
            {{ connect }}
            <last-orders />
            <standing-orders />
            <team-members />
        </div>
    </div>
</template>

<script setup>

// import { run } from '@/server/api/dato-cma'

const { data } = await useFetch('/api/dato-cma')

const connect = computed(() => {
    return data
})

</script>
