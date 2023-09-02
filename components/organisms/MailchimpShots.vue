<template>
    <ul
        v-if="mailchimpCampaigns"
        class="flex flex-col gap-2 mb-16"
    >
        <li
            v-for="campaign in data.campaigns"
            :key="campaign.id"
        >
            <nuxt-link
                :to="campaign.long_archive_url"
                target="_blank"
                class="grid items-center justify-between grid-cols-12 p-2 bg-butterscotch dark:bg-navy-400"
            >
                <span class="col-span-full opacity-60 lg:col-span-2">{{ dateConverter(campaign.send_time) }}</span>
                <span class="col-span-10 row-start-2 lg:col-span-8 lg:row-start-1 lg:col-start-3">{{ campaign.settings.title }}</span>
                <div class="flex col-span-2">
                    <Icon
                        name="ic:round-open-in-new"
                        class="w-4 h-4 ml-auto"
                    />
                </div>
            </nuxt-link>
        </li>
    </ul>
    <div
        v-else
        class="p-4"
    >
        Loading ...
    </div>
</template>

<script setup>

import { dateConverter } from '@/scripts/helpers'

const { data } = await useFetch('/api/mailchimp')

const mailchimpCampaigns = computed(() => {
    return data
})

</script>
