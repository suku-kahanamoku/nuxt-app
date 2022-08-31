import { UPDATE_DOC } from "@/server/lib/firestore";

export default defineEventHandler(async (event) => {
    try {
        const query = useQuery(event.req);
        const body = await useBody(event);
        const where = query.where ? JSON.parse(query.where as any) : null;
        return UPDATE_DOC('auth', where.id, body);
    } catch (error) {
        return error;
    }
})