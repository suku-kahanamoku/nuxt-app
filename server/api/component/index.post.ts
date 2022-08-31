export default defineEventHandler(async (event) => {
    try {
        const body = await useBody(event);
        return body;
    } catch (error) {
        return error;
    }
})