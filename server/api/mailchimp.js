import mailchimp from '@mailchimp/mailchimp_marketing'
// const mailchimp = require('@mailchimp/mailchimp_marketing')

export default defineEventHandler((event) => {
    // const runtime = useRuntimeConfig()

    mailchimp.setConfig({
        apiKey: process.env.MC_KEY,
        server: process.env.MC_CLIENT
    })

    async function getAllCampaigns () {
        return await mailchimp.campaigns.list({ sort_field: 'send_time', sort_dir: 'DESC', count: 100, status: 'sent' })
    }

    const data = getAllCampaigns()

    return data
})
