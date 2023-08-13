import mailchimp from '@mailchimp/mailchimp_marketing'
// const mailchimp = require('@mailchimp/mailchimp_marketing')

export default defineEventHandler((event) => {
    // const runtime = useRuntimeConfig()

    console.log('hello')

    mailchimp.setConfig({
        apiKey: process.env.MC_KEY,
        server: process.env.MC_CLIENT
    })

    async function callPing () {
        return await mailchimp.ping.get()
    }

    const data = callPing()
    return data
})
