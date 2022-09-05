import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['nuxt-jsoneditor'],
	jsoneditor: {
		componentName: 'vue-jsoneditor',
		includeCss: true,
	},
	/* ssr: false, */
	build: {
		extractCSS: false,
		transpile: ['vuetify', 'ol'],
	},
	css: ['@/assets/scss/style.scss'],
	vite: {
		define: {
			'process.env.DEBUG': false,
		},
	},
});
