<template>
    <div class="flex flex-col w-full max-w-screen-md px-10 pt-0 pb-32 mx-auto">
        <h1 class="mb-8 h1">
            Daily Temperature Logs
        </h1>

        <div
            v-if="state.hasSent"
            class="flex flex-col items-center gap-4 p-4 border border-green-500"
        >
            <div class="flex flex-row gap-4">
                <Icon
                    name="ph:snowflake-bold"
                    class="w-12 h-12 animate-pulse"
                />
                <div>
                    <h2 class="h2">
                        Yeah, we <span class="text-blue-500">cool</span>, but just to make sure...
                    </h2>
                </div>
            </div>
            <nuxt-link
                class="flex items-center gap-2 button bg-butterscotch !text-black hover:!text-white"
                to="https://docs.google.com/spreadsheets/d/1Bh5vjjW7wU8HaMsP7-R0M0XTlx1Ohd9uh25AK3ZZrIY/edit#gid=0"
                target="_blank"
            >
                <Icon
                    name="ph:warning-fill"
                    class="flex-shrink-0 w-4 h-4 text-red-500 transition-all duration-300 pointer-events-none hover:rotate-90 "
                />
                Please check your submission was logged. Click here...
                <Icon
                    name="iconamoon:link-external-fill"
                    class="flex-shrink-0 w-4 h-4 transition-all duration-300 pointer-events-none hover:rotate-90"
                />
            </nuxt-link>
            <p class="text-xs">
                To see the form again, please refresh this page.
            </p>
        </div>

        <div
            v-if="state.hasErrored"
            class="flex flex-row items-center gap-6 p-4 mb-8 border border-red-500"
        >
            <Icon
                name="noto:skull-and-crossbones"
                class="w-12 h-12 animate-ping"
            />
            <div>
                <h2 class="h2">
                    Hmmm...
                </h2>
                <p> Looks like something isn't behaving. Please let Dan know pronto.</p>
                <p class="text-xs">
                    To see the form again, please refresh this page.
                </p>
            </div>
        </div>

        <form
            v-if="!state.isSending && !state.hasSent && !state.hasErrored"
            id="daily-temperature-logs"
            ref="dailyTemperatureLogs"
            class="flex flex-col gap-8 daily-temperature-logs-form"
            name="daily-temperature-logs"
            @submit.prevent="submitToGoogleSheets"
        >
            <shift-leads />

            <div class="flex flex-row items-center justify-start gap-2 text-xs italic">
                <p>
                    Freezers: -18&deg;C or lower &bull;
                    Fridges: 1&deg;C - 7&deg;C
                </p>
            </div>
            <h2 class="h4">
                Bar Area
            </h2>
            <temperature-log-input
                item="Milk Fridge"
            />
            <temperature-log-input
                item="Blender Fridge"
            />
            <temperature-log-input
                item="Savoury Fridge"
            />
            <temperature-log-input
                item="Savoury Display"
            />
            <temperature-log-input
                item="Bar Freezer"
                plus-or-minus="minus"
            />
            <h2 class="h4">
                Back of House
            </h2>
            <temperature-log-input
                item="Double Freezer"
                plus-or-minus="minus"
            />
            <temperature-log-input
                item="Single Freezer"
                plus-or-minus="minus"
            />
            <temperature-log-input
                item="Fridge"
            />
            <textarea
                placeholder="Notes and comments"
                class="h-40 p-2 dark:bg-navy-400"
                name="Comments"
            />
            <button
                type="submit"
                class="button self-start"
            >
                I'm done, submit!
            </button>
        </form>
        <div
            v-else-if="state.isSending"
            class=""
        >
            Sending, please wait...
        </div>
    </div>
</template>
<script setup>
import { useSupabaseStore } from '@/stores/supabase'

const supabaseStore = useSupabaseStore()

const dailyTemperatureLogs = ref()

const runtimeConfig = useRuntimeConfig()

const scriptURL = runtimeConfig.public.GOOGLE_SHEETS_SCRIPT_DAILY_TEMPERATURE_LOGS

const submitToGoogleSheets = () => {
    const formData = new FormData(dailyTemperatureLogs.value)
    const user = formData.get('Team member')
    const dateTime = new Date()
    state.isSending = true
    state.hasSent = false
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(async () => {
            await supabaseStore.setCheck('daily_temperatures', user)
            await supabaseStore.setCheck('daily_temperatures_time', dateTime)
            state.isSending = false
            state.hasSent = true
        })
        .catch(error => console.error('Error!', error.message))
}

useHead({
    title: 'Daily Temperature Logs'
})

const state = reactive({
    isSending: false,
    hasSent: false,
    hasErrored: false
})

</script>
