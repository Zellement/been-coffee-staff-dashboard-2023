<template>
    <div class="flex flex-col pb-32">
        <h1 class="px-4 text-center h1">
            Daily Cash Breakdown
        </h1>

        <form
            id="daily-cash-breakdown"
            class="flex flex-col gap-8 p-8"
            name="daily-cash-breakdown"
        >
            <div class="flex flex-col">
                <h2 class="h4">
                    Close lead
                </h2>
                <label
                    v-for="member in team"
                    :key="member.id"
                    class="flex flex-row items-center gap-2"
                >
                    <input
                        type="radio"
                        name="team-member"
                        :value="member.name"
                    >
                    {{ member.name }}
                </label>
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
                collection="Banking (Black tin)"
                collection-style="bg-black"
            />
            <daily-cash-breakdown-collection
                collection="Till float"
                collection-style="bg-white"
            />
            <daily-cash-breakdown-collection
                collection="Safe (Red tin)"
                collection-style="bg-red-500"
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
        }
    }
`
const { data } = await useGraphqlQuery({ query: QUERY })

const team = computed(() => {
    return data.value?.allTeams
})

</script>
