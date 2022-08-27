import { GET_DOCS } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
    try {
        const query = useQuery(event.req);
        const where = query.where ? JSON.parse(query.where as any) : null;
        const docs = await GET_DOCS('profile', where);
        return docs;
    } catch (error) {
        return error;
    }
})