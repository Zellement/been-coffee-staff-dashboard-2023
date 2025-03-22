<template>
    <div class="relative">
        <div class="container">
            <h2 class="h1">Welcome to the Been Coffee Dashboard</h2>
            <p>
                You can find all relevant details for Been Coffee here,
                including
                <nuxt-link class="generic-link" to="/category/onboarding">
                    onboarding </nuxt-link
                >,
                <nuxt-link class="generic-link" to="/category/policies">
                    policies
                </nuxt-link>
                and
                <nuxt-link class="generic-link" to="/category/general">
                    general documentation
                </nuxt-link>
            </p>
            <button-site-search
                display-text="Launch navigation"
                class="button mt-8"
            />
        </div>
    </div>
</template>
