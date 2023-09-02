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

import { buildClient } from '@datocms/cma-client-node';
async function run() {
  const client = buildClient({ apiToken: '<YOUR_API_TOKEN>' });
  const records = await client.items.list({
    filter: {
      // you can also use models IDs instead of API keys!
      type: 'order',
    },
  });
  console.log(records);
}


// const connect = computed(() => {
//     return data

onMounted(() => {
    run()
}

useHead({
    title: 'Been Staff Dashboard'
})

</script>
