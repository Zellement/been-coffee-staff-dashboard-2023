<template>
    <div class="flex flex-col max-w-screen-md px-10 pt-0 pb-32 mx-auto">
        <h1 class="mb-8 h1">
            Daily Cash Breakdown
        </h1>

        <form
            id="daily-cash-breakdown"
            ref="dailyCashBreakdown"
            class="flex flex-col gap-8 daily-cash-breakdown-form"
            name="daily-cash-breakdown"
            @submit.prevent="submitToGoogleSheets"
        >
            <input
                name="hello"
                type="text"
                placeholder="anything"
            >
            <!-- <div class="flex flex-col">
                <h2 class="mb-4 h4">
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
                            name="team_member"
                            :value="member.name"
                            class="ml-2 opacity-0"
                            @click="toggleIsOtherSelected(false)"
                        >

                        <div class="absolute left-0 flex w-12 h-12 p-1 overflow-hidden -translate-y-1/2 rounded-full daily-cash-breakdown-form__img-wrapper aspect-square top-1/2">
                            <img
                                :alt="member.name"
                                :src="`${member?.picture?.url}?w=50`"
                                class="object-cover w-full h-full rounded-full"
                            >
                        </div>
                        <span class="pl-8 daily-cash-breakdown-form__member-name">{{ member.name }}</span>
                    </label>
                    <label
                        class="relative flex flex-row items-center gap-2 py-3"
                    >
                        <input
                            type="radio"
                            name="team-member"
                            value="Other"
                            class="ml-2 opacity-0"
                            @click="toggleIsOtherSelected(true)"
                        >

                        <div class="absolute left-0 flex w-12 h-12 p-1 overflow-hidden -translate-y-1/2 rounded-full daily-cash-breakdown-form__img-wrapper aspect-square top-1/2">
                            <img
                                alt="Placeholder"
                                src="@/assets/images/been-staff-dashboard.png"
                                class="object-cover w-full h-full rounded-full"
                            >
                        </div>
                        <span class="pl-8">Other</span>
                    </label>
                    <label v-if="otherSelected">
                        <input
                            class="w-full mt-4 lg:mt-2"
                            type="text"
                            placeholder="Hello, who are you?"
                            name="other_team_member"
                        >
                    </label>
                </div>
            </div> -->
            <!-- <div>
                <h2 class="mb-4 h4">
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
            </div> -->
            <!-- <daily-cash-breakdown-collection
                collection-brow="(Black tin)"
                collection="Banking"
                collection-style="bg-black"
            />
            <daily-cash-breakdown-collection
                collection="Till float"
                collection-style="bg-butterscotch-500"
            />
            <daily-cash-breakdown-collection
                collection-brow="(Red tin)"
                collection="Safe"
                collection-style="bg-red-500"
            />
            <textarea
                placeholder="Notes and comments"
                class="h-40"
            /> -->
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

const dailyCashBreakdown = ref()

const scriptURL = 'https://script.google.com/macros/s/AKfycbxpUGdmbjZTldL8lntdL7tN2Te23CH-OeCv_jjS_3MEACqu0mAbLr-TntKC-YAECE1C/exec'
// const form = document.forms['submit-to-google-sheet']

const submitToGoogleSheets = () => {
    console.log(dailyCashBreakdown.value)
    const formData = new FormData(dailyCashBreakdown.value)
    console.log(formData)
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
}

useHead({
    title: 'Daily Cash Breakdown'
})

// const toggleIsOtherSelected = (value) => {
//     state.isOtherSelected = value ?? !state.isOtherSelected
// }

// const state = reactive({
//     isOtherSelected: false
// })

// const otherSelected = computed(() => {
//     return state.isOtherSelected
// })

// const QUERY = `
// query {
//     allTeams(orderBy: name_ASC, filter: {managerKeyHolder: {eq: "true"}}) {
//         id
//         name
//         picture {
//             responsiveImage {
//                 alt
//                 base64
//                 bgColor
//                 title
//                 srcSet
//                 }
//             url
//         }
//         }
//     }
// `
// const { data } = await useGraphqlQuery({ query: QUERY })

// const team = computed(() => {
//     return data.value?.allTeams
// })

</script>
