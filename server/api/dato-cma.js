import { buildClient } from '@datocms/cma-client-node'

export default defineEventHandler(() => {
    const client = buildClient({ apiToken: process.env.DATO_CMA_TOKEN })
    // this only returns the first page of results:

    async function listAllEntries () {
        return await client.items.list()
    }

    const data = listAllEntries()

    console.log(data)

    return data
    // this iterates over every page of results:
    // for await (const record of client.items.listPagedIterator()) {
    //     console.log(record)
    // }
})

// export default defineEventHandler(() => {
//     const client = buildClient({ apiToken: process.env.DATO_CMA_TOKEN })
//     // this only returns the first page of results:

//     async function listAllEntries () {
//         return await client.items.list()
//     }

//     const data = listAllEntries()

//     console.log(data)

//     return data
//     // this iterates over every page of results:
//     // for await (const record of client.items.listPagedIterator()) {
//     //     console.log(record)
//     // }
// })
