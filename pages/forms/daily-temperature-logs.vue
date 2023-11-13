<template>
    <div class="flex flex-col w-full max-w-screen-md px-10 pt-0 pb-32 mx-auto">
        <h1 class="mb-8 h1">
            Daily Temperature Logs
        </h1>

        <div
            v-if="state.hasSent"
            class="flex flex-row items-center gap-6 p-4 mb-8 border border-green-500"
        >
            <Icon
                name="ph:snowflake-bold"
                class="w-12 h-12 animate-pulse"
            />
            <div>
                <h2 class="h2">
                    Yeah, we <span class="text-blue-500">cool</span>!
                </h2>
                <p> All sent, thanks.</p>
                <p class="text-xs">
                    To see the form again, please refresh this page.
                </p>
            </div>
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

            <div class="flex flex-row items-center justify-end gap-2 italic">
                <p>Freezers: -18&deg;C or lower</p>
                <p>
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
                item="Freezer One"
                plus-or-minus="minus"
            />
            <temperature-log-input
                item="Freezer Two"
                plus-or-minus="minus"
            />
            <temperature-log-input
                item="Fridge"
            />
            <temperature-log-input
                item="Stella Fridge"
            />
            <textarea
                placeholder="Notes and comments"
                class="h-40 p-2 dark:bg-navy-400"
                name="Comments"
            />
            <button
                type="submit"
                class="button"
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

const dailyTemperatureLogs = ref()

const runtimeConfig = useRuntimeConfig()

const scriptURL = runtimeConfig.public.GOOGLE_SHEETS_SCRIPT_DAILY_TEMPERATURE_LOGS

const submitToGoogleSheets = () => {
    const formData = new FormData(dailyTemperatureLogs.value)
    state.isSending = true
    state.hasSent = false
    fetch(scriptURL, { method: 'POST', body: formData })
        .then((response) => {
            console.log('Success!', response)
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
