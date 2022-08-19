import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
    ],
    content: {
        // https://content.nuxtjs.org/api/configuration
    },
    css: [
        'vuetify/lib/styles/main.sass',
        'mdi/css/materialdesignicons.min.css',
    ],
    build: {
        transpile: ['vuetify'],
    },
})
