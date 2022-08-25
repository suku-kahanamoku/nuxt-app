import { GET_DOC, GET_STORAGE } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
    try {
        const query = useQuery(event.req);
        const where = query.where ? JSON.parse(query.where as any) : null;
        const docs = await GET_STORAGE();
        return docs;
    } catch (error) {
        return error;
    }
})