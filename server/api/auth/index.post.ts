import { CREATE_DOC } from "@/server/lib/firestore";

export default defineEventHandler(async (event) => {
    try {
        const body = await useBody(event);
        return CREATE_DOC('auth', body);
    } catch (error) {
        return error;
    }
})