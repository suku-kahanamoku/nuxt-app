import { createI18n } from 'vue-i18n';

import en from '@/assets/locales/en.json';
import cs from '@/assets/locales/cs.json';

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'en',
        messages: {
            en: en,
            cs: cs
        },
    })

    vueApp.use(i18n)
});