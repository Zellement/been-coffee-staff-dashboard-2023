<template>
    <ul v-if="mailchimpCampaigns" class="mb-16 flex flex-col gap-2">
        <li v-for="campaign in data.campaigns" :key="campaign.id">
            <nuxt-link
                :to="campaign.long_archive_url"
                target="_blank"
                class="grid grid-cols-12 items-center justify-between bg-butterscotch p-2 dark:bg-navy-400"
            >
                <span class="col-span-full opacity-60 lg:col-span-2">{{
                    dateConverter(campaign.send_time)
                }}</span>
                <span
                    class="col-span-10 row-start-2 lg:col-span-8 lg:col-start-3 lg:row-start-1"
                    >{{ campaign.settings.title }}</span
                >
                <div class="col-span-2 flex">
                    <Icon name="ic:round-open-in-new" class="ml-auto h-4 w-4" />
                </div>
            </nuxt-link>
        </li>
    </ul>
    <div v-else class="p-4">Loading ...</div>
</template>

<script setup>
import { dateConverter } from '@/scripts/helpers'

const { data } = await useFetch('/api/mailchimp')

const mailchimpCampaigns = computed(() => {
    return data
})
</script>
