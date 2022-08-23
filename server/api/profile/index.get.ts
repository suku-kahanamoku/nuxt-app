import { GET_DOC } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
    try {
        const query = useQuery(event.req);
        const where = JSON.parse(query.where as any);
        const docs = await GET_DOC('profile', where?.property, where?.value, where?.operator);
        return { result: docs };
    } catch (error) {
        return { result: [], error: error.message };
    }
})