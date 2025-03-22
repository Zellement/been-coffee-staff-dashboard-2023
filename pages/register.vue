<template>
    <div class="container mx-auto w-full max-w-[600px] p-4">
        <h1 class="mb-4 text-2xl font-bold">Register New User</h1>
        <form class="mx-auto flex flex-col" @submit.prevent="handleRegister">
            <div
                v-for="field in fields"
                :key="field.id"
                class="mb-4 grid grid-cols-2"
            >
                <label :for="field.id">{{ field.label }}</label>
                <input
                    :id="field.id"
                    v-model="field.model.value"
                    :type="field.type"
                    class="p-2 dark:bg-navy-200 dark:text-white"
                    :required="field.required"
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
import { ref } from 'vue'

// Form fields as refs
const name = ref('')
const email = ref('')
const password = ref('')
const slug = ref('')
const role = ref('')
const start_date = ref('')

// Fields configuration for the form
const fields = [
    {
        id: 'name',
        label: 'Name',
        type: 'text',
        model: name, // Use ref here directly
        required: true
    },
    {
        id: 'email',
        label: 'Email',
        type: 'email',
        model: email, // Use ref here directly
        required: true
    },
    {
        id: 'role',
        label: 'Role',
        type: 'text',
        model: role, // Use ref here directly
        required: true
    },
    {
        id: 'slug',
        label: 'Slug',
        type: 'text',
        model: slug, // Use ref here directly
        required: true
    },
    {
        id: 'start_date',
        label: 'Start Date',
        type: 'date',
        model: start_date, // Use ref here directly
        required: true
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        model: password, // Use ref here directly
        required: true
    }
]

// Handle the form submission
const handleRegister = async () => {
    try {
        const response = await $fetch('/api/create-user', {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value,
                password: password.value,
                slug: slug.value,
                role: role.value, // Include role and start_date in the payload
                start_date: start_date.value
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
