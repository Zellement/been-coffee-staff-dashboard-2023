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
                class="flex flex-row items-center justify-between p-2 button"
            >
                <div class="flex flex-row items-center gap-8">
                    <span class="w-24">{{ dateConverter(campaign.send_time) }}</span>
                    <span>{{ campaign.settings.title }}</span>
                </div>
                <Icon
                    name="ic:round-open-in-new"
                    class="w-4 h-4"
                />
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
