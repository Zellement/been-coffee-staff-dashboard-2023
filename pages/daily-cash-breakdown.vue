<template>
    <div class="flex flex-col px-10 pt-0 pb-32">
        <h1 class="mb-8 h1">
            Daily Cash Breakdown
        </h1>

        <form
            id="daily-cash-breakdown"
            class="flex flex-col gap-8 daily-cash-breakdown-form"
            name="daily-cash-breakdown"
        >
            <div class="flex flex-col">
                <h2 class="h4">
                    Close lead
                </h2>
                <div class="flex flex-col md:flex-row md:flex-wrap md:gap-8">
                    <label
                        v-for="member in team"
                        :key="member.id"
                        class="relative flex flex-row items-center gap-2 py-3"
                    >
                        <input
                            type="radio"
                            name="team-member"
                            :value="member.name"
                            class="ml-2"
                        >

                        <div class="absolute left-0 flex w-12 h-12 p-1 overflow-hidden -translate-y-1/2 rounded-full daily-cash-breakdown-form__img-wrapper aspect-square top-1/2">
                            <img
                                :alt="member.name"
                                :src="`${member?.picture?.url}?w=50`"
                                class="object-cover w-full h-full rounded-full"
                            >
                        </div>
                        <span class="pl-8">{{ member.name }}</span>
                    </label>
                </div>
            </div>
            <div>
                <h2 class="h4">
                    Waste
                </h2>
                <label
                    class="flex flex-row items-center gap-2"
                >
                    <input
                        type="checkbox"
                        required
                        name="team-member"
                        value="waste_added_to_till"
                    >
                    Have you put waste through the till?
                </label>
            </div>
            <daily-cash-breakdown-collection
                collection-brow="(Black tin)"
                collection="Banking"
                collection-style="bg-black"
            />
            <daily-cash-breakdown-collection
                collection="Till float"
                collection-style="bg-white"
            />
            <daily-cash-breakdown-collection
                collection-brow="(Red tin)"
                collection="Safe"
                collection-style="bg-red-500"
            />
            <textarea
                placeholder="Notes and comments"
                class="h-40"
            />
            <button
                type="submit"
                class="button"
            >
                I'm done, submit!
            </button>
        </form>
    </div>
</template>
<script setup>

useHead({
    title: 'Daily Cash Breakdown'
})

const QUERY = `
query {
    allTeams(orderBy: name_ASC, filter: {managerKeyHolder: {eq: "true"}}) {
        id
        name
        picture {
            responsiveImage {
                alt
                base64
                bgColor
                title
                srcSet
                }
            url
        }
        }
    }
`
const { data } = await useGraphqlQuery({ query: QUERY })

const team = computed(() => {
    return data.value?.allTeams
})

</script>
