import { CREATE_PROFILE } from "@/server/lib/firestore"

export default defineEventHandler(async (event) => {
    const body = await useBody(event);
    return CREATE_PROFILE(body.email, body.password);
})