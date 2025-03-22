import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Sanity API credentials
const SANITY_PROJECT_ID = 'mxklvbih'
const SANITY_DATASET = process.env.SANITY_DATASET || 'production'
const SANITY_API = process.env.SANITY_API

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, email, password, slug, start_date, role } = body

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

        // Step 2: Update the Supabase profile (since trigger already inserts a blank profile)
        const { error: updateError } = await supabaseAdmin
            .from('profiles')
            .update({
                display_name: name,
                sanity_slug: slug
            })
            .eq('id', userId)

        if (updateError) {
            throw new Error(`Profile Update Error: ${updateError.message}`)
        }

        console.log('✅ Profile updated in Supabase!')

        // Step 3: Create a "teamMember" in Sanity instead of a "user"
        const teamMember = {
            _id: `teamMember-${userId}`, // Use a unique ID with a prefix
            _type: 'teamMember', // Set the correct Sanity schema type
            email: email,
            slug: slug,
            startDate: start_date,
            role: role
        }

        const sanityResponse = await fetch(
            `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${SANITY_DATASET}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${SANITY_API}`
                },
                body: JSON.stringify({
                    mutations: [{ createOrReplace: teamMember }]
                })
            }
        )

        const sanityResult = await sanityResponse.json()

        if (sanityResult.error) {
            throw new Error(`Sanity Error: ${sanityResult.error.message}`)
        }

        console.log('✅ teamMember created in Sanity!')

        return { success: true }
    } catch (err) {
        console.error('🚨 Error:', err.message)
        return { error: err.message }
    }
})
