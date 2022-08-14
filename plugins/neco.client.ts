import data from 'mdb-ui-kit/src/js/free/alert';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            hello: {
                data
            }
        }
    }
})