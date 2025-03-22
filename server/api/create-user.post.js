import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, email, password, sanity_slug } = body

    try {
        // Step 1: Create the user in Supabase Auth
        const { data: user, error: authError } =
            await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true
            })

        if (authError) {
            throw new Error(`Auth Error: ${authError.message}`)
        }

        const userId = user.user.id
        console.log('✅ New Auth User ID:', userId)

        // Step 2: Since Supabase trigger automatically creates a profile, update it instead of inserting
        const { error: updateError } = await supabaseAdmin
            .from('profiles')
            .update({
                display_name: name,
                sanity_slug: sanity_slug
            })
            .eq('id', userId)

        if (updateError) {
            throw new Error(`Profile Update Error: ${updateError.message}`)
        }

        console.log('✅ Profile updated successfully!')

        return { success: true }
    } catch (err) {
        console.error('🚨 Error:', err.message)
        return { error: err.message }
    }
})
