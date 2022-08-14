import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
    ],
    content: {
        // https://content.nuxtjs.org/api/configuration
    },
    css: [
        '@fortawesome/fontawesome-free/css/all.min.css',
        'mdb-ui-kit/css/mdb.min.css',
        '~/assets/main.scss'
    ],
    plugins: [
        { src: 'mdb-ui-kit/js/mdb.min.js', mode: 'client' }
    ]
})
