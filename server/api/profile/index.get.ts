import { GET_PROFILE } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
    try {
        const query = useQuery(event.req);
        const docs = await GET_PROFILE();
        return { result: docs };
    } catch (error) {
        return { result: [], error: error.message };
    }
})