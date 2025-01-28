import { defineNuxtConfig } from 'nuxt/config'
import eslintVitePlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            SITE_URL: process.env.SITE_URL,
            GOOGLE_SHEETS_SCRIPT_DAILY_CASH_BREAKDOWN: process.env.GOOGLE_SHEETS_SCRIPT_DAILY_CASH_BREAKDOWN,
            GOOGLE_SHEETS_SCRIPT_ROUTINE_TASKS: process.env.GOOGLE_SHEETS_SCRIPT_ROUTINE_TASKS,
            GOOGLE_SHEETS_SCRIPT_DAILY_TEMPERATURE_LOGS: process.env.GOOGLE_SHEETS_SCRIPT_DAILY_TEMPERATURE_LOGS,
            HOMEBASE_LOCATION_WILLINGTON_ID: process.env.HOMEBASE_LOCATION_WILLINGTON_ID
        }
    },

    ssr: false,
    devServerHandlers: [],

    devServer: {
        port: 3000, // default: 3000
        host: '0.0.0.0' // default: localhost
    },

    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],

    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            exclude: ['/login', '/register', '/forgot-password', '/update-password', '/locations/**']
        }
    },

    image: {
        sanity: {
            projectId: 'mxklvbih'
            // Defaults to 'production'
            // dataset: 'development'
        }
    },

    modules: ['@nuxtjs/color-mode', 'nuxt-icon', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/supabase', '@vite-pwa/nuxt', '@nuxtjs/sanity'],

    sanity: {
        projectId: 'mxklvbih'
    },

    tailwindcss: {
        cssPath: '~/assets/scss/app.scss'
    },

    colorMode: {
        classSuffix: '',
        preference: 'dark'
    },

    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Been Coffee Dashboard',
            description: 'Staff dashboard for Been Coffee',
            short_name: 'Been Dash',
            theme_color: '#FAB944',
            background_color: '#1B1D3C',
            icons: [
                {
                    src: '/icons/android-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any'
                },
                {
                    src: '/icons/android-chrome-192x192.png',
                    sizes: '180x180',
                    type: 'image/png',
                    purpose: 'any'
                },
                {
                    src: '/icons/android-chrome-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable'
                }
            ],
            display: 'standalone'
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico}']
        },
        devOptions: {
            enabled: true,
            suppressWarnings: true,
            navigateFallbackAllowlist: [/^\/$/]
        }
    },

    css: [
        '@/assets/scss/app.scss'
    ],

    typescript: {
        typeCheck: true,
        strict: false,
        tsConfig: {
            compilerOptions: {
                strict: false
            },
            include: [
                '@pinia/nuxt',
                '@types/node',
                '@nuxt/image',
                '@nuxt/types',
                '**/*.d.ts'
            ]
        }
    },

    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                }, {
                    name: 'description',
                    content: 'Been Coffee Staff Dashboard'
                },
                { hid: 'og-type', property: 'og:type', content: 'website' }
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/been-staff-dashboard.png' }]
        },
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' }

    },

    vite: {
        plugins: [
            eslintVitePlugin({
                fix: true,
                include: ['./**/*.vue']
            })
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern'
                }
            }
        }
    },

    compatibilityDate: '2024-10-02'
})
