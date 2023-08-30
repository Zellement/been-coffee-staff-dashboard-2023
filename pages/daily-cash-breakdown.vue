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
                <h2 class="h5">
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
                <h2 class="h6">
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
            <div />
            <div>
                <div class="sticky top-0 flex flex-row items-center gap-2 p-5 bg-seashell dark:bg-navy">
                    <div class="w-6 h-6 bg-red-500 rounded-full" />
                    <h3>Safe (Red tin)</h3>
                </div>
                <div class="">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut tincidunt lectus. Suspendisse aliquet dapibus vulputate. Integer odio massa, volutpat a viverra quis, scelerisque quis lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc laoreet sapien at ligula volutpat volutpat. Integer malesuada ipsum vel neque viverra, ac tincidunt ligula iaculis. Pellentesque et luctus augue, vitae blandit sapien. Proin nec tortor ac tortor porttitor pretium. Proin tempor enim ut dignissim pharetra.

                    Pellentesque vitae arcu eu est accumsan convallis feugiat id mi. Donec quis scelerisque augue, rutrum rhoncus tellus. Sed dignissim bibendum turpis ac tincidunt. Phasellus cursus dapibus nulla eget viverra. Morbi eu faucibus velit. Nulla egestas, erat eu molestie commodo, nulla massa malesuada diam, vel mattis risus lorem id dolor. Sed maximus tellus sit amet lorem interdum, vel congue enim gravida. Fusce maximus pellentesque neque, eget gravida sapien placerat nec. Quisque metus ex, elementum quis mi ac, varius vulputate quam. Pellentesque luctus imperdiet lectus, ut malesuada libero blandit nec. Nulla non convallis orci. Aenean nec tortor sed risus volutpat pulvinar a a erat.

                    Fusce feugiat metus urna, et varius orci accumsan id. Quisque eu nisi vitae ex posuere mattis non convallis nunc. Praesent congue, ipsum id sollicitudin luctus, dui nulla ornare sapien, eget tempor justo lorem quis nibh. Cras bibendum interdum libero quis vestibulum. Nam accumsan dui in volutpat suscipit. Integer consectetur arcu at dui varius, quis finibus mi vestibulum. Proin ultricies eros cursus mauris varius elementum eu ac quam. Fusce id metus suscipit, fermentum ante et, vestibulum augue. Nullam quis erat et orci aliquam consequat. Curabitur quis ex at velit efficitur pulvinar. Praesent aliquet quam ullamcorper metus consectetur venenatis. Proin dui neque, pulvinar at sodales vitae, fringilla ut nibh. Donec iaculis purus non venenatis scelerisque.
                </div>
            </div>
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
