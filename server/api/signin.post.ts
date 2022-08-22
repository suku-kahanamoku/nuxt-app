import { LOGIN } from "@/server/lib/firestore"

export default defineEventHandler(async (event) => {
    try {
        const body = await useBody(event);
        return LOGIN(body.email, body.password);
    } catch (error) {
        return error;
    }
})