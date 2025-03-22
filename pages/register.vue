<template>
    <div class="container mx-auto w-full max-w-[600px] p-4">
        <h1 class="mb-4 text-2xl font-bold">Register New User</h1>
        <form class="flexflex-col mx-auto" @submit.prevent="handleRegister">
            <div class="mb-4 grid grid-cols-2">
                <label for="name" class="">Name</label>
                <input
                    id="name"
                    v-model="name"
                    type="text"
                    class="p-2 dark:bg-navy-200 dark:text-white"
                    required
                />
            </div>

            <div class="mb-4 grid grid-cols-2">
                <label for="email" class="">Email</label>
                <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="p-2 dark:bg-navy-200 dark:text-white"
                    required
                />
            </div>

            <div class="mb-4 grid grid-cols-2">
                <label for="sanity_slug" class="">Sanity Slug</label>
                <input
                    id="sanity_slug"
                    v-model="sanity_slug"
                    type="text"
                    class="p-2 dark:bg-navy-200 dark:text-white"
                    required
                />
            </div>

            <div class="mb-4 grid grid-cols-2">
                <label for="password" class="">Password</label>
                <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="p-2 dark:bg-navy-200 dark:text-white"
                    required
                />
            </div>

            <button
                type="submit"
                class="rounded bg-blue-500 px-4 py-2 text-white"
            >
                Register
            </button>
        </form>
    </div>
</template>

<script setup>
// Form fields
const name = ref('')
const email = ref('')
const password = ref('')
const sanity_slug = ref('')

// Handle the form submission
const handleRegister = async () => {
    try {
        const response = await $fetch('/api/create-user', {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value,
                password: password.value,
                sanity_slug: sanity_slug.value
            }
        })

        if (response.error) {
            throw new Error(response.error)
        }

        alert('User and profile created successfully!')
    } catch (err) {
        alert(err.message)
    }
}
useHead({
    title: 'Register User'
})
</script>
