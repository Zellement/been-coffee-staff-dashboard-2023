import { defineNuxtConfig } from 'nuxt/config'
import eslintVitePlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        DATO_CMA_TOKEN: process.env.DATO_CMA_TOKEN,
        public: {
            DATO_CMS_TOKEN: process.env.DATO_CMS_TOKEN,
            MC_CLIENT: process.env.MC_CLIENT,
            MC_API: process.env.MC_API
        }
    },
    image: {
        domains: ['https://www.datocms-assets.com']
    },
    target: 'static',
    devServerHandlers: [],
    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],
    modules: ['@nuxtjs/color-mode', 'nuxt-icon', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image-edge'],
    colorMode: {
        classSuffix: '',
        preference: 'dark'
    },
    tailwindcss: {
        cssPath: '~/assets/scss/app.scss'
    },
    css: [
        '@/assets/scss/app.scss'
    ],
    build: {
        extractCSS: true
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
                    content: 'Zellement'
                },
                { hid: 'og-type', property: 'og:type', content: 'website' }
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
        },
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    vite: {
        plugins: [
            eslintVitePlugin({
                include: ['./**/*.vue']
            })
        ]
    }
})
