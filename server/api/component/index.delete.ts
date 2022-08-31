import { DELETE_DOC } from "@/server/lib/firestore";

export default defineEventHandler(async event => {
    try {
        const query = useQuery(event.req);
        const where = query.where ? JSON.parse(query.where as any) : null;
        await DELETE_DOC('component', where.id);
        return { status: 'OK' };
    } catch (error) {
        return error;
    }
})