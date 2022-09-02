import { GET_DOCS, GET_STORAGE } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
    try {
        const query = useQuery(event.req);
        const where = query.where ? JSON.parse(query.where as any) : null;
        return {
            result: await GET_STORAGE()
        }
    } catch (error) {
        return error;
    }
})